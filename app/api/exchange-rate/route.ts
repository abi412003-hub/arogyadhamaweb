import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 43200; // re-fetch the daily rate at most twice a day

// Fallback USD -> INR rate used only if the live source is unreachable, so the
// tariff page never breaks. open.er-api.com is free, needs no API key, and
// refreshes daily.
const FALLBACK = 90;

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 43200 },
    });
    if (res.ok) {
      const d = await res.json();
      const inr = d?.rates?.INR;
      if (typeof inr === "number" && inr > 0) {
        return NextResponse.json({
          rate: inr,
          date: d?.time_last_update_utc ?? null,
          source: "open.er-api.com",
        });
      }
    }
  } catch {
    // fall through to fallback
  }
  return NextResponse.json({ rate: FALLBACK, source: "fallback" });
}
