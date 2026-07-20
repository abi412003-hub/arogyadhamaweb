import { NextResponse } from "next/server";
import { createDoc, erpnextConfigured } from "@/lib/erpnext";
import { mailConfigured, sendMail, renderRows } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

// Website enquiries land in the custom "Website Enquiry" doctype in ERPNext.
const DOCTYPE = process.env.ERPNEXT_ENQUIRY_DOCTYPE || "Website Enquiry";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name || name.length > 255)
    return NextResponse.json({ success: false, error: "Invalid name" }, { status: 400 });

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 255)
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message.length < 10 || message.length > 2000)
    return NextResponse.json({ success: false, error: "Invalid message" }, { status: 400 });

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!PHONE_RE.test(phone))
    return NextResponse.json({ success: false, error: "Invalid phone" }, { status: 400 });

  const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 100) : "";

  const enquiryType = /ipd/i.test(subject)
    ? "IPD"
    : /opd/i.test(subject)
      ? "OPD"
      : /virtual/i.test(subject)
        ? "Virtual"
        : "Enquiry";

  // Map to the "Website Enquiry" doctype fields.
  const doc: Record<string, unknown> = {
    enquiry_type: enquiryType,
    status: "New",
    source: "Website",
    full_name: name.slice(0, 255),
    email: email.slice(0, 255),
    phone: phone || undefined,
    subject: subject || "General Inquiry",
    message,
  };

  // Primary delivery: email the enquiry to the Arogyadhama inbox.
  if (mailConfigured()) {
    const { html, text } = renderRows([
      ["Full Name", name],
      ["Email", email],
      ["Phone", phone],
      ["Subject", subject || "General Inquiry"],
      ["Message", message],
      ["Received", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
    ]);
    try {
      await sendMail({
        subject: `New Website Enquiry — ${name}${subject ? ` (${subject})` : ""}`,
        html: `<p style="font-family:Arial,sans-serif;font-size:14px">A new enquiry was submitted on the Arogyadhama website:</p>${html}`,
        text: `New website enquiry:\n\n${text}`,
        replyTo: email,
      });
    } catch (e) {
      console.error("enquiry → email failed:", e);
      return NextResponse.json(
        { success: false, error: "Could not send your enquiry. Please try again or call us." },
        { status: 502 },
      );
    }
    // Best-effort: also record in ERPNext, but don't fail the request if it errors.
    try {
      if (erpnextConfigured()) await createDoc(DOCTYPE, doc);
    } catch (e) {
      console.error("enquiry → ERPNext failed (non-fatal):", e);
    }
    return NextResponse.json({ success: true });
  }

  // Mail not configured → fall back to the original ERPNext-only behavior.
  try {
    await createDoc(DOCTYPE, doc);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("enquiry → ERPNext failed:", e);
    if (!erpnextConfigured())
      return NextResponse.json(
        { success: false, error: "Backend is not configured yet." },
        { status: 503 },
      );
    return NextResponse.json(
      { success: false, error: "Submission failed. Please try again." },
      { status: 502 },
    );
  }
}
