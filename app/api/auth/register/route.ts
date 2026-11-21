import { NextResponse } from "next/server";
import { createDoc, FrappeError } from "@/lib/erpnext";
import { mailConfigured, renderRows, sendMail } from "@/lib/mail";
import { verifyOtp } from "@/lib/otp";
import {
  PARTICIPANT_DOCTYPE,
  findParticipant,
  findPatientByMobile,
  parseMobile,
} from "@/lib/participants";

// A new registration is stored as "Pending Approval" and does NOT sign the person
// in: reception approves it in Frappe (Website Registered User → Approval Status)
// before the website dashboard opens for them.

/** Best-effort heads-up to the reception inbox so the registration gets approved. */
async function notifyReception(doc: Record<string, unknown>, docName: string) {
  if (!mailConfigured()) return;
  const deskBase = (process.env.ERPNEXT_URL || "").replace(/\/$/, "");
  const deskLink = deskBase
    ? `${deskBase}/app/website-registered-user/${encodeURIComponent(docName)}`
    : "";
  // The Reception Suite's Registrations page approves in one step (links the Patient and sets up
  // the patient-app login too), so point reception there when its URL is configured.
  const suiteBase = (process.env.RECEPTION_SUITE_URL || "").trim().replace(/\/$/, "");
  const suiteLink = suiteBase ? `${suiteBase}/registrations` : "";
  const { html, text } = renderRows([
    ["Full Name", String(doc.full_name ?? "")],
    ["Mobile", `${doc.country_code ?? ""} ${doc.mobile ?? ""}`],
    ["Email", String(doc.email ?? "")],
    ["City", String(doc.city ?? "")],
    ["Health concern", String(doc.health_concern ?? "")],
    ["Matched Patient", doc.patient ? String(doc.patient) : "None found — please link one"],
    ["Received", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ]);
  try {
    await sendMail({
      subject: `Website registration awaiting approval — ${doc.full_name}`,
      html: `<p style="font-family:Arial,sans-serif;font-size:14px">A new participant registered on the Arogyadhama website and is waiting for reception approval.</p>${html}${
        suiteLink
          ? `<p style="font-family:Arial,sans-serif;font-size:14px">Approve it in the Reception Suite: <a href="${suiteLink}">${suiteLink}</a> (Registrations).</p>`
          : deskLink
            ? `<p style="font-family:Arial,sans-serif;font-size:14px">Approve it in Frappe: <a href="${deskLink}">${deskLink}</a> (set <b>Approval Status</b> to <b>Approved</b> and check the <b>Patient</b> link).</p>`
            : ""
      }`,
      text: `New website registration awaiting approval:\n\n${text}${
        suiteLink
          ? `\n\nApprove in the Reception Suite: ${suiteLink}`
          : deskLink
            ? `\n\nApprove in Frappe: ${deskLink}`
            : ""
      }`,
    });
  } catch (e) {
    console.error("auth/register → reception email failed (non-fatal):", e);
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENDERS = ["Male", "Female", "Other"];

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const m = parseMobile(body.countryCode, body.mobile);
  if (!m)
    return NextResponse.json(
      { success: false, error: "Please enter a valid mobile number." },
      { status: 400 },
    );
  if (!verifyOtp(m.loginId, body.otp))
    return NextResponse.json(
      { success: false, code: "bad_otp", error: "Incorrect OTP. Please try again." },
      { status: 401 },
    );

  const fullName = str(body.fullName, 140);
  if (fullName.length < 2)
    return NextResponse.json({ success: false, error: "Please enter your full name." }, { status: 400 });

  const email = str(body.email, 140);
  if (email && !EMAIL_RE.test(email))
    return NextResponse.json({ success: false, error: "Please enter a valid email." }, { status: 400 });

  const gender = str(body.gender, 10);
  if (gender && !GENDERS.includes(gender))
    return NextResponse.json({ success: false, error: "Invalid gender." }, { status: 400 });

  const dob = str(body.dateOfBirth, 10);
  if (dob) {
    const d = new Date(`${dob}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob) || isNaN(d.getTime()) || d > new Date() || d.getUTCFullYear() < 1900)
      return NextResponse.json({ success: false, error: "Invalid date of birth." }, { status: 400 });
  }

  const emergencyPhone = str(body.emergencyContactPhone, 20);
  if (emergencyPhone && !/^\+?[\d\s-]{6,20}$/.test(emergencyPhone))
    return NextResponse.json(
      { success: false, error: "Invalid emergency contact phone." },
      { status: 400 },
    );

  const doc: Record<string, unknown> = {
    login_id: m.loginId,
    full_name: fullName,
    country_code: m.countryCode,
    mobile: m.mobile,
    mobile_verified: 1,
    status: "Active",
    approval_status: "Pending Approval",
    source: "Website",
    email: email || undefined,
    gender: gender || undefined,
    date_of_birth: dob || undefined,
    city: str(body.city, 80) || undefined,
    state: str(body.state, 80) || undefined,
    country: str(body.country, 80) || undefined,
    health_concern: str(body.healthConcern, 1000) || undefined,
    emergency_contact_name: str(body.emergencyContactName, 140) || undefined,
    emergency_contact_phone: emergencyPhone || undefined,
  };

  try {
    if (await findParticipant(m.loginId))
      return NextResponse.json(
        {
          success: false,
          code: "exists",
          error: "This mobile number is already registered. Please sign in instead.",
        },
        { status: 409 },
      );

    // Pre-link the Patient record when exactly one has this mobile; reception checks it.
    const patient = await findPatientByMobile(m.mobile);
    if (patient) doc.patient = patient;

    const created = await createDoc(PARTICIPANT_DOCTYPE, doc);
    await notifyReception(doc, String(created.name ?? m.loginId));

    // No session: the dashboard opens only after reception approves.
    return NextResponse.json({ success: true, pending: true, fullName });
  } catch (e) {
    console.error("auth/register failed:", e);
    if (e instanceof FrappeError && e.status === 409)
      return NextResponse.json(
        { success: false, code: "exists", error: "This mobile number is already registered." },
        { status: 409 },
      );
    return NextResponse.json(
      { success: false, error: "Could not complete registration. Please try again." },
      { status: 502 },
    );
  }
}
