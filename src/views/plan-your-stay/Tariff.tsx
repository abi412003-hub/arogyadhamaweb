"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ChevronRight, CheckCircle2, Info, Table2, Calculator } from "lucide-react";
import { useGeoPricing, formatRegionPrice, type PriceCurrency } from "@/hooks/useGeoPricing";
import RegionPriceGate from "@/components/RegionPriceGate";

/* ── Data ── */
// Two independent per-person price lists (not conversions): INR shown inside India,
// USD shown outside India. Each is [1 week, 2 weeks, 3 weeks, 4 weeks], cumulative and
// non-linear (longer stays discounted). Every tariff is fully inclusive — Yoga, Ayurveda,
// Naturopathy, Physiotherapy, Acupuncture & Acupressure are all included.
const ROOMS = [
  {
    key: "dormitory",
    name: "Dormitory",
    subName: "Pushpa / Ashwini Ward",
    pricesINR: [6600, 12200, 17800, 23400],
    pricesUSD: [250, 490, 730, 970],
    emoji: "🏨",
    desc: "Shared dormitory accommodation with basic amenities. Ideal for budget-conscious patients seeking the full healing experience.",
    amenities: ["Shared bathroom", "Basic furnishings", "Common lounge", "Yoga kit provided"],
  },
  {
    key: "single",
    name: "Single Room",
    subName: "Ashirwad Block",
    pricesINR: [13200, 25400, 37600, 49800],
    pricesUSD: [500, 900, 1300, 1600],
    emoji: "🛏️",
    desc: "Private single room with attached bathroom. Comfortable, quiet, and well-suited for solo travellers requiring privacy.",
    amenities: ["Attached bathroom", "Study table", "Wardrobe", "Room service meals"],
  },
  {
    key: "double-sharing",
    name: "Double / Triple Sharing",
    subName: "Maitri Block",
    pricesINR: [11000, 21000, 31000, 41000],
    pricesUSD: [450, 800, 1150, 1450],
    emoji: "👥",
    desc: "Shared double room per person. Perfect for couples or companions travelling together for healing.",
    amenities: ["Shared attached bathroom", "Two beds", "Wardrobe", "Room service meals"],
    perPerson: true,
  },
  {
    key: "semi-deluxe",
    name: "Double Deluxe",
    subName: "Sheshadri",
    pricesINR: [22000, 43000, 64000, 85000],
    pricesUSD: [750, 1350, 1900, 2400],
    emoji: "✨",
    desc: "An air-conditioned double bedroom shared between two — a step up from standard sharing, with climate control for cooler comfort.",
    amenities: ["Attached bathroom", "AC room", "Two beds", "Wardrobe for each person"],
    perPerson: true,
  },
  {
    key: "single-deluxe",
    name: "Single Deluxe",
    subName: "Sheshadri",
    pricesINR: [27500, 54000, 80500, 107000],
    pricesUSD: [750, 1350, 1900, 2400],
    emoji: "⭐",
    desc: "Premium single room in the flagship Sheshadri block with upgraded furnishings and garden views.",
    amenities: ["Deluxe attached bathroom", "AC room", "Garden view", "Premium furnishings", "Priority consultations"],
  },
  {
    key: "suite",
    name: "Suite Sharing",
    subName: "Premium Block",
    pricesINR: [30800, 60600, 90400, 120200],
    pricesUSD: [1000, 1800, 2550, 3200],
    emoji: "👑",
    desc: "The most luxurious option — a suite shared between two, offering the highest comfort level at Arogyadhama.",
    amenities: ["Luxury bathroom", "AC suite", "Sitting area", "Priority everything", "Concierge support"],
    perPerson: true,
  },
];

const DURATIONS = [1, 2, 3, 4];

// The Double / Triple Sharing card offers an AC option. Non-AC uses the room's base
// prices; AC uses this per-person progression (1/2/3/4 weeks), INR and USD lists.
const DOUBLE_SHARING_AC = {
  INR: [17600, 34200, 50800, 67400],
  USD: [500, 900, 1300, 1600],
};

type RoomPrices = { INR: number[]; USD: number[] };
function roomPrices(r: typeof ROOMS[0], acRoom: boolean): RoomPrices {
  if (r.key === "double-sharing" && acRoom) return DOUBLE_SHARING_AC;
  return { INR: r.pricesINR, USD: r.pricesUSD };
}
// Region price at a given week index, or "—" while the location is unresolved.
function priceAt(p: RoomPrices, wi: number, currency: PriceCurrency | null) {
  return formatRegionPrice(p.INR[wi], p.USD[wi], currency) ?? "—";
}

/* ── Table View ── */
function TableView({ currency }: { currency: PriceCurrency | null }) {
  const [tableAC, setTableAC] = useState(false); // Double / Triple Sharing row: false = Non-AC, true = AC
  return (
    <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr style={{ background: "hsl(var(--maroon))" }}>
            {["Accommodation Type", "Per Week", "2 Weeks", "3 Weeks", "4 Weeks"].map((h) => (
              <th key={h} className="font-body font-semibold text-cream text-sm px-5 py-4 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROOMS.map((r, i) => {
            const p = roomPrices(r, tableAC);
            return (
              <tr key={r.key} className={i % 2 === 0 ? "bg-white" : "bg-cream/40"}>
                <td className="px-5 py-4">
                  <div className="font-display font-semibold text-forest text-sm">{r.name}</div>
                  <div className="font-body text-sage text-xs flex items-center gap-1.5 flex-wrap">
                    <span>{r.subName}{r.perPerson ? " · per person" : ""}</span>
                    {r.key === "double-sharing" && (
                      <select
                        value={tableAC ? "ac" : "nonac"}
                        onChange={(e) => setTableAC(e.target.value === "ac")}
                        aria-label="AC or Non-AC"
                        className="rounded-md border border-border bg-white px-1.5 py-0.5 font-body text-[11px] font-semibold text-forest focus:outline-none focus:ring-2 focus:ring-maroon/30 cursor-pointer"
                      >
                        <option value="nonac">Non-AC</option>
                        <option value="ac">AC</option>
                      </select>
                    )}
                  </div>
                </td>
                {DURATIONS.map((w, wi) => (
                  <td key={w} className="px-5 py-4 font-body text-forest text-sm font-medium">{priceAt(p, wi, currency)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bg-white px-5 py-4 border-t border-border">
        <div className="font-body text-xs text-sage space-y-1">
          <p>• Tariff is from Tuesday to Monday (minimum 6 nights). • Every package is fully inclusive — accommodation, three sattvic meals daily, and all therapies (Yoga, Ayurveda, Naturopathy, Physiotherapy, Acupuncture & Acupressure), medical consultations, and yoga kit.</p>
          <p>• Charges are per person. Bill settlement required one day before discharge.</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function Tariff() {
  const [view, setView] = useState<"calculator" | "table">("calculator");
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [weeks, setWeeks] = useState(1);
  const [acRoom, setAcRoom] = useState(false); // Double / Triple Sharing: false = Non-AC, true = AC

  // Location decides the currency: India → INR, outside → USD. Prices stay hidden
  // (rendered as "—" behind the gate) until the region resolves.
  const { region, status, currency, locate } = useGeoPricing();

  const room = ROOMS.find((r) => r.key === selectedRoom);
  const estimate = room ? priceAt(roomPrices(room, acRoom), weeks - 1, currency) : null;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(43 70% 13%) 0%, hsl(43 60% 18%) 55%, hsl(27 50% 22%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/plan-your-stay" className="hover:text-gold transition-colors">Plan Your Stay</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Tariff</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              Tariff & Packages
            </h1>
            <p className="font-body text-cream/70 mt-4 max-w-lg">
              Use our interactive calculator to build your personalised cost estimate — or toggle to a full table view.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Important Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-start gap-3 rounded-2xl border px-5 py-4" style={{ background: "hsl(var(--gold-pale))", borderColor: "hsl(var(--gold) / 0.3)" }}>
          <Info size={18} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="font-body text-sm italic leading-relaxed" style={{ color: "hsl(var(--forest))" }}>
            Every package is fully inclusive — the tariff covers accommodation, three sattvic meals daily, and all therapies (Yoga, Ayurveda, Naturopathy, Physiotherapy, Acupuncture &amp; Acupressure) as advised by the consulting doctor. All charges are per person.
          </p>
        </div>
      </div>

      {/* Toggle */}
      <div className="sticky top-16 z-20 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 py-3">
          {[
            { v: "calculator", icon: Calculator, label: "Interactive Calculator" },
            { v: "table", icon: Table2, label: "Full Table View" },
          ].map(({ v, icon: Icon, label }) => (
            <button key={v} onClick={() => setView(v as "calculator" | "table")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-all"
              style={{
                background: view === v ? "hsl(var(--maroon))" : "transparent",
                color: view === v ? "hsl(var(--cream))" : "hsl(var(--maroon) / 0.6)",
                fontWeight: view === v ? "600" : "400",
              }}>
              <Icon size={15} /> {label}
            </button>
          ))}
          {view === "calculator" && selectedRoom && currency && (
            <div className="ml-auto font-display font-bold text-gold text-lg">
              Total: {estimate}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Location gate — prices stay hidden until the region resolves */}
        <div className="mb-8">
          <RegionPriceGate status={status} region={region} onRetry={locate} />
        </div>

        <AnimatePresence mode="wait">
          {view === "table" ? (
            <motion.div key="table" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <TableView currency={currency} />
            </motion.div>
          ) : (
            <motion.div key="calc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

              {/* Steps */}
              <div className="space-y-10">

                {/* Step 1: Accommodation */}
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-body font-bold text-sm text-cream"
                      style={{ background: "hsl(var(--maroon))" }}>1</div>
                    <h2 className="font-display font-bold text-forest text-xl">Choose Your Accommodation</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ROOMS.map((r) => (
                      <div key={r.key} role="button" tabIndex={0}
                        onClick={() => { setSelectedRoom(r.key); setStep(Math.max(step, 2)); }}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedRoom(r.key); setStep(Math.max(step, 2)); } }}
                        className="cursor-pointer text-left rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-maroon/30"
                        style={{
                          borderColor: selectedRoom === r.key ? "hsl(var(--maroon))" : "hsl(var(--border))",
                          background: selectedRoom === r.key ? "hsl(var(--maroon) / 0.04)" : "white",
                        }}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-2xl mb-1">{r.emoji}</div>
                            <div className="font-display font-bold text-forest text-base">{r.name}</div>
                            <div className="font-body text-sage text-xs flex items-center gap-1.5 flex-wrap">
                              <span>{r.subName}{r.perPerson ? " · per person" : ""}</span>
                              {r.key === "double-sharing" && (
                                <select
                                  value={acRoom ? "ac" : "nonac"}
                                  onClick={(e) => e.stopPropagation()}
                                  onKeyDown={(e) => e.stopPropagation()}
                                  onChange={(e) => { e.stopPropagation(); setAcRoom(e.target.value === "ac"); setSelectedRoom("double-sharing"); setStep(Math.max(step, 2)); }}
                                  aria-label="AC or Non-AC"
                                  className="rounded-md border border-border bg-white px-1.5 py-0.5 font-body text-[11px] font-semibold text-forest focus:outline-none focus:ring-2 focus:ring-maroon/30 cursor-pointer"
                                >
                                  <option value="nonac">Non-AC</option>
                                  <option value="ac">AC</option>
                                </select>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-display font-bold text-gold text-lg">{priceAt(roomPrices(r, acRoom), 0, currency)}</div>
                            <div className="font-body text-sage text-xs">/week</div>
                          </div>
                        </div>
                        <p className="font-body text-forest/60 text-xs leading-relaxed mb-3">{r.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {r.amenities.slice(0, 3).map((a) => (
                            <span key={a} className="font-body text-[10px] text-sage bg-muted px-2 py-0.5 rounded-full">{a}</span>
                          ))}
                        </div>
                        {selectedRoom === r.key && (
                          <div className="mt-3 flex items-center gap-1.5 font-body text-xs text-forest font-semibold">
                            <CheckCircle2 size={13} className="text-gold" /> Selected
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Duration */}
                <AnimatePresence>
                  {step >= 2 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-body font-bold text-sm text-cream"
                          style={{ background: "hsl(var(--maroon))" }}>2</div>
                        <h2 className="font-display font-bold text-forest text-xl">Choose Your Duration</h2>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {DURATIONS.map((w, wi) => (
                          <button key={w} onClick={() => setWeeks(w)}
                            className="rounded-xl border-2 px-6 py-4 text-center transition-all duration-200 min-w-[120px]"
                            style={{
                              borderColor: weeks === w ? "hsl(var(--maroon))" : "hsl(var(--border))",
                              background: weeks === w ? "hsl(var(--maroon))" : "white",
                              color: weeks === w ? "hsl(var(--cream))" : "hsl(var(--maroon))",
                            }}>
                            <div className="font-display font-bold text-xl">{w}</div>
                            <div className="font-body text-sm">{w === 1 ? "Week" : "Weeks"}</div>
                            {selectedRoom && (
                              <div className="font-body text-xs mt-1 opacity-70">
                                {priceAt(roomPrices(ROOMS.find(r => r.key === selectedRoom)!, acRoom), wi, currency)}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      <p className="font-body text-xs text-sage mt-3 flex items-center gap-1.5">
                        <Info size={12} /> Tariff runs Tuesday to Monday. Minimum 6 nights.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sticky Summary */}
              <div>
                <div className="sticky top-28">
                  <div className="rounded-2xl overflow-hidden shadow-card-hover border border-border">
                    <div className="p-5" style={{ background: "hsl(var(--maroon))" }}>
                      <div className="font-body text-xs tracking-[0.2em] uppercase text-gold/70 mb-1">Your Estimate</div>
                      <div className="font-display font-bold text-cream text-4xl">{room ? estimate : (currency ? formatRegionPrice(0, 0, currency) : "—")}</div>
                      {weeks > 0 && <div className="font-body text-cream/60 text-xs mt-1">all-inclusive · for {weeks} week{weeks > 1 ? "s" : ""}</div>}
                    </div>
                    <div className="bg-white p-5 space-y-3">
                      {room ? (
                        <div className="flex justify-between font-body text-sm">
                          <span className="text-forest/60">{room.name} × {weeks}wk{weeks > 1 ? "s" : ""}</span>
                          <span className="font-semibold text-forest">{estimate}</span>
                        </div>
                      ) : (
                        <p className="font-body text-sage text-sm text-center py-2">Select an accommodation above to begin.</p>
                      )}
                    </div>

                    {/* What's included */}
                    <div className="bg-cream/40 px-5 pb-5">
                      <div className="font-body text-xs tracking-widest uppercase text-sage font-semibold mb-3 pt-4">Included in all packages</div>
                      {["Accommodation", "3 Sattvic meals daily", "Yoga, Ayurveda & Naturopathy", "Physiotherapy, Acupuncture & Acupressure", "Medical consultations", "Yoga kit"].map((inc) => (
                        <div key={inc} className="flex items-center gap-2 mb-1.5">
                          <CheckCircle2 size={12} className="text-gold flex-shrink-0" />
                          <span className="font-body text-forest/70 text-xs">{inc}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white p-5 border-t border-border space-y-2">
                      <Link to="/book-now"
                        className="block w-full text-center bg-gold text-forest-dark font-body font-semibold py-3 rounded-xl hover:bg-gold-light transition-colors">
                        Book This Package
                      </Link>
                      <a href="tel:+919972871777"
                        className="block w-full text-center border border-border text-forest font-body text-sm py-2.5 rounded-xl hover:bg-cream/30 transition-colors">
                        Call to Enquire
                      </a>
                    </div>

                    {/* Notes */}
                    <div className="bg-maroon/5 px-5 py-4">
                      <p className="font-body text-[10px] text-sage leading-relaxed">
                        Bill settlement required one day before discharge. Tariff runs Tuesday–Monday.
                        Charges are per person. Minimum stay: 6 nights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
