import { NextResponse } from "next/server";
import { findParticipant, toProfile } from "@/lib/participants";
import { clearSessionCookie, getSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The signed-in participant's profile, read fresh from Frappe. */
export async function GET(req: Request) {
  const session = getSession(req);
  // Signed out is a normal state (every page asks), so answer 200 rather than 401.
  if (!session) return NextResponse.json({ success: true, profile: null });

  try {
    const doc = await findParticipant(session.name);
    if (!doc || doc.status === "Inactive")
      return clearSessionCookie(
        NextResponse.json({ success: true, profile: null }),
      );
    return NextResponse.json({ success: true, profile: toProfile(doc) });
  } catch (e) {
    console.error("auth/me failed:", e);
    return NextResponse.json(
      { success: false, error: "Could not load your profile." },
      { status: 502 },
    );
  }
}
