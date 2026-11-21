// Server-only: one-click hand-off from the website dashboard into the patient app.
//
// An approved participant whose registration reception has linked to a Patient can press
// "Open Patient App" and land on their patient-app dashboard already signed in. The website signs
// a 90-second token naming that Patient; the patient app's /api/handoff verifies it
// (arogya-patient-app `src/lib/handoff-token.ts`) and starts its own session.
//
// Format — both repos must agree byte for byte; scripts/check-handoff.mjs pins a shared vector:
//
//   v1.<base64url(JSON {aud, sub, wru, iat, exp, jti})>.<base64url(HMAC-SHA256(secret, "patient-app-handoff.v1." + payload))>
//
// Switched OFF unless PATIENT_HANDOFF_ENABLED=1 *and* PATIENT_HANDOFF_SECRET is set. It must stay
// off while website sign-in uses the fixed demo OTP (src/lib/otp.ts): until a real SMS OTP proves
// the person holds the phone, knowing a mobile number would be enough to open someone's records.
//
// Pure (node:crypto only) so the check script can import it directly.
import { createHmac, randomBytes } from "node:crypto";

export const HANDOFF_AUDIENCE = "patient-app-handoff";
const CONTEXT = "patient-app-handoff.v1.";
export const HANDOFF_TTL_SECONDS = 90;

/** The signing secret, or null when it is missing or too short to be one. No fallback. */
export function handoffSecret(env: NodeJS.ProcessEnv = process.env): string | null {
  const s = env.PATIENT_HANDOFF_SECRET?.trim();
  return s && s.length >= 32 ? s : null;
}

/** One-click is on only when explicitly enabled and a secret is configured. */
export function handoffEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.PATIENT_HANDOFF_ENABLED?.trim() === "1" && handoffSecret(env) !== null;
}

export function signHandoffToken(
  claims: { sub: string; wru: string },
  secret: string,
  opts: { now?: number; jti?: string } = {},
): string {
  const iat = opts.now ?? Math.floor(Date.now() / 1000);
  const payload = {
    aud: HANDOFF_AUDIENCE,
    sub: claims.sub,
    wru: claims.wru,
    iat,
    exp: iat + HANDOFF_TTL_SECONDS,
    jti: opts.jti ?? randomBytes(16).toString("base64url"),
  };
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(CONTEXT + body).digest("base64url");
  return `v1.${body}.${sig}`;
}

/**
 * The patient-app URL that signs this Patient in, or null when one-click is off. `appUrl` is the
 * patient app's origin (PATIENT_APP_URL).
 */
export function patientAppHandoffUrl(
  appUrl: string,
  claims: { sub: string; wru: string },
  env: NodeJS.ProcessEnv = process.env,
): string | null {
  const secret = handoffSecret(env);
  if (!secret || !handoffEnabled(env)) return null;
  const token = signHandoffToken(claims, secret);
  return `${appUrl.replace(/\/$/, "")}/api/handoff?token=${encodeURIComponent(token)}`;
}
