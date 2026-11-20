// Server-only OTP check for website sign-in / registration.
//
// TEMPORARY: no SMS gateway is wired up yet, so every mobile number uses one
// fixed code (DEMO_OTP env, default "12345"). The code is never sent to the
// browser. To go live, replace `sendOtp` with a real SMS send and `verifyOtp`
// with a check against the code that was sent.

const DEMO_OTP = process.env.DEMO_OTP || "12345";

export const OTP_LENGTH = 5;

/** Would send the OTP by SMS. Currently a no-op (fixed demo code). */
export async function sendOtp(_loginId: string): Promise<void> {
  // Intentionally empty until an SMS provider is configured.
}

export function verifyOtp(_loginId: string, code: unknown): boolean {
  return typeof code === "string" && code.trim() === DEMO_OTP;
}
