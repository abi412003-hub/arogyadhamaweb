import { NextResponse } from "next/server";
import { createDoc, FrappeError } from "@/lib/erpnext";
import { verifyOtp } from "@/lib/otp";
import {
  PARTICIPANT_DOCTYPE,
  findParticipant,
  frappeNow,
  parseMobile,
  toProfile,
} from "@/lib/participants";
import { setSessionCookie } from "@/lib/session";

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
    source: "Website",
    last_login: frappeNow(),
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

    const created = await createDoc(PARTICIPANT_DOCTYPE, doc);
    const res = NextResponse.json({ success: true, profile: toProfile(created) });
    return setSessionCookie(res, String(created.name ?? m.loginId));
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
