import { NextResponse } from "next/server";
import {
  PATIENT_APP_URL,
  accessState,
  findParticipant,
  getPatientProfile,
  type PatientProfile,
  toProfile,
} from "@/lib/participants";
import { handoffEnabled } from "@/lib/patient-handoff";
import { clearSessionCookie, getSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The signed-in participant's profile, read fresh from Frappe.
 *
 * Pending registrations get their profile and stay request (the dashboard shows the booking form
 * or "awaiting confirmation"). The linked Patient record and the Patient App only open once
 * reception has approved.
 */
export async function GET(req: Request) {
  const session = getSession(req);
  // Signed out is a normal state (every page asks), so answer 200 rather than 401.
  if (!session) return NextResponse.json({ success: true, profile: null });

  try {
    const doc = await findParticipant(session.name);
    // Deleted, deactivated or rejected accounts lose their session.
    const state = doc ? accessState(doc) : null;
    if (!doc || (state !== "approved" && state !== "pending"))
      return clearSessionCookie(NextResponse.json({ success: true, profile: null }));

    const approved = state === "approved";
    let patient: PatientProfile | null = null;
    if (approved && doc.patient) {
      try {
        patient = await getPatientProfile(doc.patient);
      } catch (e) {
        console.error("auth/me: Patient lookup failed (non-fatal):", e);
      }
    }

    return NextResponse.json({
      success: true,
      profile: toProfile(doc),
      patient,
      patientAppUrl: PATIENT_APP_URL,
      // True when "Open Patient App" signs them straight in (see src/lib/patient-handoff.ts).
      patientAppHandoff: approved && handoffEnabled() && Boolean(doc.patient),
    });
  } catch (e) {
    console.error("auth/me failed:", e);
    return NextResponse.json(
      { success: false, error: "Could not load your profile." },
      { status: 502 },
    );
  }
}
