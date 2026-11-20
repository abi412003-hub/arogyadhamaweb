import { NextResponse } from "next/server";
import { updateDoc } from "@/lib/erpnext";
import { verifyOtp } from "@/lib/otp";
import {
  NOT_REGISTERED,
  PARTICIPANT_DOCTYPE,
  accessDenied,
  findParticipant,
  frappeNow,
  parseMobile,
  toProfile,
} from "@/lib/participants";
import { setSessionCookie } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  try {
    const doc = await findParticipant(m.loginId);
    if (!doc)
      return NextResponse.json(
        { success: false, code: NOT_REGISTERED.code, error: NOT_REGISTERED.error },
        { status: NOT_REGISTERED.status },
      );
    // Only registrations approved by reception may sign in.
    const denied = accessDenied(doc);
    if (denied)
      return NextResponse.json(
        { success: false, code: denied.code, error: denied.error },
        { status: denied.status },
      );

    let current = doc;
    try {
      current = await updateDoc(PARTICIPANT_DOCTYPE, doc.name, { last_login: frappeNow() });
    } catch (e) {
      console.error("auth/login: last_login update failed (non-fatal):", e);
    }

    const res = NextResponse.json({ success: true, profile: toProfile(current) });
    return setSessionCookie(res, doc.name);
  } catch (e) {
    console.error("auth/login failed:", e);
    return NextResponse.json(
      { success: false, error: "Could not sign you in. Please try again." },
      { status: 502 },
    );
  }
}
