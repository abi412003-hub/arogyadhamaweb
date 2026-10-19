"use client";
import { useEffect, useState } from "react";

/**
 * Time-zone-based pricing. The device's time zone decides the currency — no
 * location permission, no network lookup:
 *   - India Standard Time (Asia/Kolkata) → INR price list
 *   - Any other time zone                → USD price list
 * Resolved in an effect (not during render) so the server-rendered HTML and the
 * first client render match; prices show "—" for that single frame.
 */
export type Region = "IN" | "INTL";

export type PriceCurrency = "INR" | "USD";

const INDIA_TIME_ZONES = new Set(["Asia/Kolkata", "Asia/Calcutta"]);

function timeZoneToRegion(): Region {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return "IN";
    return INDIA_TIME_ZONES.has(tz) ? "IN" : "INTL";
  } catch {
    return "IN";
  }
}

export function useGeoPricing() {
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    setRegion(timeZoneToRegion());
  }, []);

  const currency: PriceCurrency | null =
    region === "IN" ? "INR" : region === "INTL" ? "USD" : null;

  return { region, currency };
}

// Pure formatter — returns null when the region is unknown so callers can hide
// the price. INR and USD are independent lists, never conversions of each other.
export function formatRegionPrice(
  inr: number,
  usd: number,
  currency: PriceCurrency | null
): string | null {
  if (currency === "INR") return "₹" + inr.toLocaleString("en-IN");
  if (currency === "USD") return "$" + usd.toLocaleString("en-US");
  return null;
}
