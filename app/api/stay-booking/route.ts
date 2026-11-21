import { NextResponse } from "next/server";
import { updateDoc } from "@/lib/erpnext";
import {
  PARTICIPANT_DOCTYPE,
  accessState,
  findParticipant,
  frappeNow,
  toBooking,
} from "@/lib/participants";
import { notifyReceptionOfBooking } from "@/lib/reception-notify";
import { getSession } from "@/lib/session";
import { findProgramme, findRoom, formatMoney, validateStayRequest } from "@/lib/stay-booking";

// POST /api/stay-booking — a registered (not yet approved) participant requests a residential stay
// from their dashboard. The request is saved on their "Website Registered User" record and goes to
// reception with the registration; approval in the Reception Suite confirms both.
//
// Dates, duration and tariff are re-derived here from src/lib/stay-booking.ts — the browser's
// numbers are never trusted. A request can be changed until reception decides on it.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = getSession(req);
  if (!session)
    return NextResponse.json({ success: false, error: "Please sign in again." }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  try {
    const doc = await findParticipant(session.name);
    if (!doc) return NextResponse.json({ success: false, error: "Please sign in again." }, { status: 401 });

    const state = accessState(doc);
    if (state === "approved")
      return NextResponse.json(
        {
          success: false,
          code: "confirmed",
          error: "Your stay is already confirmed. To change it, please contact the help desk.",
        },
        { status: 409 },
      );
    if (state !== "pending")
      return NextResponse.json(
        { success: false, error: "This account cannot request a booking. Please contact the help desk." },
        { status: 403 },
      );

    const check = validateStayRequest(
      {
        programme: body.programme,
        room: body.room,
        weeks: body.weeks,
        admissionDate: body.admissionDate,
        email: body.email,
        notes: body.notes,
      },
      String(doc.country ?? ""),
    );
    if (!check.ok) return NextResponse.json({ success: false, error: check.error }, { status: 400 });

    const v = check.value;
    const room = findRoom(v.room)!;
    const patch: Record<string, unknown> = {
      booking_programme: findProgramme(v.programme)!.name,
      booking_room: `${room.name} — ${room.block}${room.perPerson ? " (per person)" : ""}`,
      booking_weeks: v.weeks,
      admission_date: v.admissionDate,
      checkout_date: v.checkoutDate,
      booking_tariff: `${formatMoney(v.tariff, v.currency)} (${v.currency}, ${v.weeks} week${v.weeks > 1 ? "s" : ""}, all-inclusive)`,
      booking_notes: v.notes || "",
      booking_requested_on: frappeNow(),
      // The patient-app login is by email, so the request always carries one.
      email: v.email,
    };

    const updated = await updateDoc(PARTICIPANT_DOCTYPE, doc.name, patch);
    await notifyReceptionOfBooking({ ...doc, ...patch }, String(doc.name));

    return NextResponse.json({ success: true, booking: toBooking({ ...doc, ...updated, ...patch }) });
  } catch (e) {
    console.error("stay-booking failed:", e);
    return NextResponse.json(
      { success: false, error: "We couldn't send your booking request. Please try again." },
      { status: 502 },
    );
  }
}
