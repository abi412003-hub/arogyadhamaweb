// Server-only: signed session cookie for website participants.
// Cookie value = base64url(JSON payload) + "." + HMAC-SHA256 signature.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "ag_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface Session {
  /** Frappe document name of the Website Registered User (= login id, e.g. "+919876543210"). */
  name: string;
  exp: number;
}

function secret(): string {
  const s =
    process.env.SESSION_SECRET ||
    (process.env.ERPNEXT_API_SECRET
      ? createHash("sha256").update(`ag-session:${process.env.ERPNEXT_API_SECRET}`).digest("hex")
      : "");
  if (!s) throw new Error("No SESSION_SECRET (or ERPNEXT_API_SECRET) configured");
  return s;
}

const sign = (data: string) => createHmac("sha256", secret()).update(data).digest("base64url");

export function encodeSession(name: string): string {
  const payload: Session = { name, exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function decodeSession(value: string | undefined | null): Session | null {
  if (!value) return null;
  const [data, sig] = value.split(".");
  if (!data || !sig) return null;
  const expected = Buffer.from(sign(data));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const s = JSON.parse(Buffer.from(data, "base64url").toString()) as Session;
    if (typeof s.name !== "string" || typeof s.exp !== "number") return null;
    if (s.exp < Date.now() / 1000) return null;
    return s;
  } catch {
    return null;
  }
}

/** Read the session from a request's Cookie header. */
export function getSession(req: Request): Session | null {
  const cookie = req.headers.get("cookie") || "";
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  return decodeSession(m ? decodeURIComponent(m[1]) : null);
}

export function setSessionCookie(res: NextResponse, name: string): NextResponse {
  res.cookies.set(SESSION_COOKIE, encodeSession(name), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  return res;
}

export function clearSessionCookie(res: NextResponse): NextResponse {
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
