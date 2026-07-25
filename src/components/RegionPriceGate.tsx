"use client";
import { MapPin, Loader2, RefreshCw } from "lucide-react";
import type { GeoStatus, Region } from "@/hooks/useGeoPricing";

/**
 * Location-gate banner shown on every price surface. Prices stay hidden until
 * the region resolves; while unresolved this explains why and (on failure)
 * offers a Retry button that re-requests the browser location.
 */
export default function RegionPriceGate({
  status,
  region,
  onRetry,
}: {
  status: GeoStatus;
  region: Region | null;
  onRetry: () => void;
}) {
  // Resolved — show a small confirmation of which price list is in effect.
  if (status === "resolved" && region) {
    return (
      <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-xs"
        style={{ background: "hsl(var(--sage) / 0.12)", color: "hsl(var(--forest))" }}>
        <MapPin size={14} className="text-sage flex-shrink-0" />
        <span>
          Showing prices for{" "}
          <strong>{region === "IN" ? "India (₹)" : "International ($)"}</strong>, based on your location.
        </span>
      </div>
    );
  }

  // Locating — waiting on the browser / lookup.
  if (status === "locating" || status === "idle") {
    return (
      <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 font-body text-sm"
        style={{ background: "hsl(var(--gold-pale))", color: "hsl(var(--forest))" }}>
        <Loader2 size={16} className="text-gold flex-shrink-0 animate-spin" />
        <span>Detecting your location to show accurate pricing for your region…</span>
      </div>
    );
  }

  // Denied / error / unsupported — prices remain hidden; offer a retry.
  const message =
    status === "denied"
      ? "Location access is blocked, so we can't show region pricing yet. Please allow location for this site, then retry."
      : status === "unsupported"
      ? "Your browser doesn't support location. We can't show region pricing here."
      : "We couldn't detect your location. Please retry to view pricing for your region.";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl px-4 py-3.5"
      style={{ background: "hsl(var(--maroon) / 0.06)", border: "1px solid hsl(var(--maroon) / 0.15)" }}>
      <div className="flex items-start gap-2.5 flex-1">
        <MapPin size={16} className="text-maroon flex-shrink-0 mt-0.5" />
        <span className="font-body text-sm" style={{ color: "hsl(var(--forest))" }}>{message}</span>
      </div>
      {status !== "unsupported" && (
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-semibold text-cream transition-colors flex-shrink-0"
          style={{ background: "hsl(var(--maroon))" }}
        >
          <RefreshCw size={14} /> Enable location
        </button>
      )}
    </div>
  );
}
