import { NextResponse } from "next/server";
import { PATIENT_APP_URL, accessState, findParticipant } from "@/lib/participants";
import { patientAppHandoffUrl } from "@/lib/patient-handoff";
import { clearSessionCookie, getSession } from "@/lib/session";

// GET /api/auth/patient-app — "Open Patient App" on the dashboard.
//
// With one-click hand-off switched on (see src/lib/patient-handoff.ts), an approved participant
// whose registration is linked to a Patient is redirected into the patient app already signed in.
// Otherwise this is the plain link it always was: the patient app's sign-in page.
//
// A GET that only ever signs the *visitor* into *their own* patient record, so a cross-site link
// to it can do nothing an attacker would want. Never cached, never sends a Referer onward.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_LEAK = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };

function go(url: string | URL): NextResponse {
  const res = NextResponse.redirect(url, 302);
  for (const [k, v] of Object.entries(NO_LEAK)) res.headers.set(k, v);
  return res;
}

export async function GET(req: Request) {
  const account = new URL("/account", req.url);
  const session = getSession(req);
  if (!session) return go(account);

  let doc: Record<string, any> | null;
  try {
    doc = await findParticipant(session.name);
  } catch (e) {
    console.error("auth/patient-app: registration lookup failed:", e);
    return go(`${PATIENT_APP_URL.replace(/\/$/, "")}/login`);
  }
  if (!doc || accessState(doc) !== "approved") return clearSessionCookie(go(account));

  const signedIn = doc.patient
    ? patientAppHandoffUrl(PATIENT_APP_URL, { sub: String(doc.patient), wru: String(doc.name) })
    : null;
  return go(signedIn ?? `${PATIENT_APP_URL.replace(/\/$/, "")}/login`);
}
