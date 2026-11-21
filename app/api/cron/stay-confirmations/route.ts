import { NextResponse } from "next/server";
import { runStayConfirmations } from "@/lib/stay-confirmation";

// GET /api/cron/stay-confirmations — Vercel Cron (vercel.json, every 5 minutes) emails each
// participant whose stay reception has approved: "please visit our campus on <admission date>".
// Sent once per registration (stamped with confirmation_emailed_on). Protected by CRON_SECRET,
// which Vercel sends as `Authorization: Bearer …`.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await runStayConfirmations());
  } catch (e) {
    console.error("cron/stay-confirmations failed:", e);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
