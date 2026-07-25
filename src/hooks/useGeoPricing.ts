"use client";
import { useCallback, useEffect, useState } from "react";

/**
 * Region-based pricing. Instead of a manual ₹/$ toggle, the visitor's live
 * location decides the currency:
 *   - India      → INR price list
 *   - Outside IN → USD price list
 * Prices stay hidden until the region resolves. Location is requested on every
 * mount (nothing is persisted); browsers that already granted permission resolve
 * silently, others re-prompt.
 */
export type Region = "IN" | "INTL";
export type GeoStatus =
  | "idle"
  | "locating"
  | "resolved"
  | "denied"
  | "error"
  | "unsupported";

export type PriceCurrency = "INR" | "USD";

// Approximate India bounding box — offline fallback if reverse-geocoding is
// unreachable. Deliberately generous; only used when the network lookup fails.
function inIndiaBox(lat: number, lng: number): boolean {
  return lat >= 6.5 && lat <= 35.7 && lng >= 68.0 && lng <= 97.5;
}

// Coordinates → region. Prefer an accurate country lookup (BigDataCloud's free,
// no-key client endpoint); fall back to the bounding box on any failure.
async function coordsToRegion(lat: number, lng: number): Promise<Region> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.countryCode === "string") {
        return data.countryCode.toUpperCase() === "IN" ? "IN" : "INTL";
      }
    }
  } catch {
    /* fall through to bounding box */
  }
  return inIndiaBox(lat, lng) ? "IN" : "INTL";
}

export function useGeoPricing() {
  const [region, setRegion] = useState<Region | null>(null);
  const [status, setStatus] = useState<GeoStatus>("idle");

  const locate = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const reg = await coordsToRegion(pos.coords.latitude, pos.coords.longitude);
        setRegion(reg);
        setStatus("resolved");
      },
      (err) => {
        setRegion(null);
        setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // Ask on every visit — request a fresh location as soon as the page mounts.
  useEffect(() => {
    locate();
  }, [locate]);

  const currency: PriceCurrency | null =
    region === "IN" ? "INR" : region === "INTL" ? "USD" : null;

  return { region, status, currency, locate };
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
