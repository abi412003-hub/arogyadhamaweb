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

/** The signed-in participant's profile (and linked Patient record), read fresh from Frappe. */
export async function GET(req: Request) {
  const session = getSession(req);
  // Signed out is a normal state (every page asks), so answer 200 rather than 401.
  if (!session) return NextResponse.json({ success: true, profile: null });

  try {
    const doc = await findParticipant(session.name);
    // Deleted, deactivated or no-longer-approved accounts lose their session.
    if (!doc || accessState(doc) !== "approved")
      return clearSessionCookie(NextResponse.json({ success: true, profile: null }));

    let patient: PatientProfile | null = null;
    if (doc.patient) {
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
      patientAppHandoff: handoffEnabled() && Boolean(doc.patient),
    });
  } catch (e) {
    console.error("auth/me failed:", e);
    return NextResponse.json(
      { success: false, error: "Could not load your profile." },
      { status: 502 },
    );
  }
}
