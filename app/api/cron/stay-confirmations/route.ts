import { NextResponse } from "next/server";
import { runStayConfirmations } from "@/lib/stay-confirmation";

// Emails each participant whose stay reception has approved: "please visit our campus on
// <admission date>". Sent once per registration (stamped with confirmation_emailed_on).
//
// POST {loginId} — the Reception Suite calls this the moment reception approves, so the mail
//   goes out straight away (not after the desk finishes the booking at the cashier).
// GET — Vercel Cron (vercel.json, every 5 minutes), a backstop for anything the POST missed.
//
// Both are protected by CRON_SECRET (`Authorization: Bearer …`); the Reception Suite holds the
// same value as STAY_CONFIRMATION_SECRET.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  return Boolean(secret) && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await runStayConfirmations());
  } catch (e) {
    console.error("cron/stay-confirmations failed:", e);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}

export async function POST(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let loginId = "";
  try {
    const body = (await req.json()) as { loginId?: unknown };
    loginId = typeof body.loginId === "string" ? body.loginId.trim() : "";
  } catch {
    /* fall through to the 400 below */
  }
  if (!/^\+\d{6,16}$/.test(loginId))
    return NextResponse.json({ error: "loginId required" }, { status: 400 });
  try {
    return NextResponse.json(await runStayConfirmations(1, loginId));
  } catch (e) {
    console.error(`stay-confirmations ${loginId} failed:`, e);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
