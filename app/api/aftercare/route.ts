import { NextResponse } from "next/server";
import { mailConfigured, sendMail, renderRows } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

// Google Apps Script Web App that appends a row to the
// "Arogyadhama — Anuvartana Aftercare EOI" sheet. Optional: when unset the
// submission still reaches the team by email.
const SHEET_URL = process.env.ANUVARTANA_SHEET_WEBHOOK_URL;
const SHEET_SECRET = process.env.ANUVARTANA_SHEET_SECRET;

/** Trim + hard-cap a free-text field. */
function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  // ── Required ──
  const name = str(body.name, 255);
  if (!name)
    return NextResponse.json({ success: false, error: "Invalid name" }, { status: 400 });

  const email = str(body.email, 255);
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });

  const phone = str(body.phone, 20);
  if (!PHONE_RE.test(phone))
    return NextResponse.json({ success: false, error: "Invalid phone" }, { status: 400 });

  if (body.consent !== true)
    return NextResponse.json(
      { success: false, error: "Consent is required to submit this form." },
      { status: 400 },
    );

  // ── Optional ──
  const age = str(body.age, 10);
  const gender = str(body.gender, 40);
  const city = str(body.city, 120);
  const completedProgram = str(body.completedProgram, 10);
  const datesOfStay = str(body.datesOfStay, 120);
  const condition = str(body.condition, 1000);
  const mode = str(body.mode, 40);
  const program = str(body.program, 60);
  const timing = str(body.timing, 200);
  const hearAbout = str(body.hearAbout, 200);
  const notes = str(body.notes, 2000);

  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // Column order must match the sheet header exactly (A–R).
  const row = [
    submittedAt,
    name,
    age,
    gender,
    phone,
    email,
    city,
    completedProgram,
    datesOfStay,
    condition,
    mode,
    program,
    timing,
    hearAbout,
    notes,
    "Yes",
    "Website — Anuvartana EOI",
    "", // Status — left for the team
  ];

  // ── 1. Append to the Google Sheet (best effort — never fails the request) ──
  let sheetOk = false;
  if (SHEET_URL) {
    try {
      const res = await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: SHEET_SECRET, row }),
        cache: "no-store",
      });
      sheetOk = res.ok;
      if (!res.ok) console.error("aftercare → sheet HTTP", res.status);
    } catch (e) {
      console.error("aftercare → sheet failed (non-fatal):", e);
    }
  }

  // ── 2. Email the Arogyadhama inbox ──
  if (mailConfigured()) {
    const { html, text } = renderRows([
      ["Full Name", name],
      ["Age", age],
      ["Gender", gender],
      ["Contact Number", phone],
      ["Email Address", email],
      ["City / Location", city],
      ["Completed Programme at Arogyadhama", completedProgram],
      ["Approximate Dates of Stay", datesOfStay],
      ["Primary Health Concern / Condition", condition],
      ["Preferred Mode of Sessions", mode],
      ["Preferred Programme", program],
      ["Preferred Days & Timing", timing],
      ["How Did You Hear About Us", hearAbout],
      ["Additional Notes / Questions", notes],
      ["Consent Given", "Yes"],
      ["Saved to Sheet", sheetOk ? "Yes" : "No"],
      ["Received", submittedAt],
    ]);
    try {
      await sendMail({
        subject: `Anuvartana Aftercare — Expression of Interest — ${name}`,
        html: `<p style="font-family:Arial,sans-serif;font-size:14px">A new Anuvartana Aftercare enquiry was submitted on the Arogyadhama website:</p>${html}`,
        text: `New Anuvartana Aftercare expression of interest:\n\n${text}`,
        replyTo: email,
      });
      return NextResponse.json({ success: true });
    } catch (e) {
      console.error("aftercare → email failed:", e);
      // The row is already in the sheet — don't make the visitor resubmit.
      if (sheetOk) return NextResponse.json({ success: true });
      return NextResponse.json(
        { success: false, error: "Could not send your details. Please try again or call us." },
        { status: 502 },
      );
    }
  }

  // Mail not configured — the sheet is the only sink.
  if (sheetOk) return NextResponse.json({ success: true });

  return NextResponse.json(
    { success: false, error: "Backend is not configured yet. Please call or WhatsApp us instead." },
    { status: 503 },
  );
}
