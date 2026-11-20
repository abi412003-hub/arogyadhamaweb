import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";
import { parseMobile } from "@/lib/participants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Registration step 2: confirm the OTP before showing the details form.
// (The OTP is checked again when the registration is submitted.)
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
  return NextResponse.json({ success: true });
}
