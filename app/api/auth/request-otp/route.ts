import { NextResponse } from "next/server";
import { erpnextConfigured } from "@/lib/erpnext";
import { sendOtp } from "@/lib/otp";
import { NOT_REGISTERED, accessDenied, findParticipant, parseMobile } from "@/lib/participants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Step 1 of sign-in / registration: check the number and "send" the OTP.
// The OTP itself is never returned to the browser.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const mode = body.mode === "login" ? "login" : body.mode === "register" ? "register" : null;
  if (!mode)
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });

  const m = parseMobile(body.countryCode, body.mobile);
  if (!m)
    return NextResponse.json(
      { success: false, error: "Please enter a valid mobile number." },
      { status: 400 },
    );

  if (!erpnextConfigured())
    return NextResponse.json(
      { success: false, error: "Registration is temporarily unavailable." },
      { status: 503 },
    );

  try {
    const existing = await findParticipant(m.loginId);

    if (mode === "register" && existing) {
      const pending = existing.approval_status !== "Approved" && existing.approval_status !== "Rejected";
      return NextResponse.json(
        {
          success: false,
          code: "exists",
          error: pending
            ? "This mobile number is already registered and is awaiting approval from reception."
            : "This mobile number is already registered. Please sign in instead.",
        },
        { status: 409 },
      );
    }

    if (mode === "login") {
      if (!existing)
        return NextResponse.json(
          { success: false, code: NOT_REGISTERED.code, error: NOT_REGISTERED.error },
          { status: NOT_REGISTERED.status },
        );
      const denied = accessDenied(existing);
      if (denied)
        return NextResponse.json(
          { success: false, code: denied.code, error: denied.error },
          { status: denied.status },
        );
    }

    await sendOtp(m.loginId);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("auth/request-otp failed:", e);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }
}
