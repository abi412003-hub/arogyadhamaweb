import { NextResponse } from "next/server";
import { createDoc, erpnextConfigured } from "@/lib/erpnext";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+\-()]{7,20}$/;
const ALLOWED_BOOKING_TYPES = ["ipd", "opd", "virtual"];

// Website bookings land in the custom "Website Enquiry" doctype in ERPNext.
const DOCTYPE = process.env.ERPNEXT_BOOKING_DOCTYPE || "Website Enquiry";

const TYPE_MAP: Record<string, string> = { ipd: "IPD", opd: "OPD", virtual: "Virtual" };

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const bookingType = typeof body.bookingType === "string" ? body.bookingType.toLowerCase() : "";
  if (!ALLOWED_BOOKING_TYPES.includes(bookingType))
    return NextResponse.json({ success: false, error: "Invalid booking type" }, { status: 400 });

  const name = str(body.name, 255);
  if (name.length < 2)
    return NextResponse.json({ success: false, error: "Invalid name" }, { status: 400 });

  const email = str(body.email, 255);
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });

  const phone = str(body.phone, 30);
  if (!PHONE_RE.test(phone))
    return NextResponse.json({ success: false, error: "Invalid phone" }, { status: 400 });

  const details = {
    age: str(body.age, 10),
    gender: str(body.gender, 30),
    city: str(body.city, 100),
    condition: str(body.condition, 500),
    duration: str(body.duration, 100),
    previousTreatments: str(body.previousTreatments, 2000),
    medications: str(body.medications, 2000),
    preferredDate: str(body.preferredDate, 50),
    weeks: str(body.weeks, 20),
    roomPreference: str(body.roomPreference, 100),
  };

  // Map to the "Website Enquiry" doctype fields.
  const doc: Record<string, unknown> = {
    enquiry_type: TYPE_MAP[bookingType] || "Enquiry",
    status: "New",
    source: "Website",
    full_name: name,
    email,
    phone,
    age: details.age || undefined,
    gender: details.gender || undefined,
    city: details.city || undefined,
    condition: details.condition || undefined,
    duration: details.duration || undefined,
    previous_treatments: details.previousTreatments || undefined,
    medications: details.medications || undefined,
    preferred_date: details.preferredDate || undefined,
    weeks: details.weeks || undefined,
    room_preference: details.roomPreference || undefined,
    subject: `${TYPE_MAP[bookingType] || "Enquiry"} Booking Request`,
  };

  try {
    await createDoc(DOCTYPE, doc);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("booking → ERPNext failed:", e);
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
