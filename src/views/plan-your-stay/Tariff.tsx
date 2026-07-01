"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ChevronRight, CheckCircle2, Info, Calendar, Table2, Calculator } from "lucide-react";

/* ── Data ── */
const ROOMS = [
  {
    key: "dormitory",
    name: "Dormitory",
    subName: "Pushpa / Ashwini Ward",
    baseWeekly: 6600,
    emoji: "🏨",
    desc: "Shared dormitory accommodation with basic amenities. Ideal for budget-conscious patients seeking the full healing experience.",
    amenities: ["Shared bathroom", "Basic furnishings", "Common lounge", "Yoga kit provided"],
  },
  {
    key: "single",
    name: "Single Room",
    subName: "Ashirwad Block",
    baseWeekly: 13200,
    emoji: "🛏️",
    desc: "Private single room with attached bathroom. Comfortable, quiet, and well-suited for solo travellers requiring privacy.",
    amenities: ["Attached bathroom", "Study table", "Wardrobe", "Room service meals"],
  },
  {
    key: "double-sharing",
    name: "Double Sharing",
    subName: "Maitri Block",
    baseWeekly: 11000,
    emoji: "👥",
    desc: "Shared double room per person. Perfect for couples or companions travelling together for healing.",
    amenities: ["Shared attached bathroom", "Two beds", "Wardrobe", "Room service meals"],
    perPerson: true,
  },
  {
    key: "single-deluxe",
    name: "Single Deluxe",
    subName: "Sheshadri Bhavan",
    baseWeekly: 27500,
    emoji: "⭐",
    desc: "Premium single room in the flagship Sheshadri Bhavan block with upgraded furnishings and garden views.",
    amenities: ["Deluxe attached bathroom", "AC room", "Garden view", "Premium furnishings", "Priority consultations"],
  },
  {
    key: "double-deluxe",
    name: "Double Deluxe",
    subName: "Sheshadri Bhavan",
    baseWeekly: 22000,
    emoji: "🌟",
    desc: "Premium shared double room in Sheshadri Bhavan. Superior comfort with all deluxe amenities per person.",
    amenities: ["Deluxe attached bathroom", "AC room", "Upgraded décor", "Premium furnishings"],
    perPerson: true,
  },
  {
    key: "suite",
    name: "Suite Sharing",
    subName: "Premium Block",
    baseWeekly: 30800,
    emoji: "👑",
    desc: "The most luxurious option — a suite shared between two, offering the highest comfort level at Arogyadhama.",
    amenities: ["Luxury bathroom", "AC suite", "Sitting area", "Priority everything", "Concierge support"],
    perPerson: true,
  },
];

const DURATIONS = [1, 2, 3, 4];

const ADD_ONS = [
  { key: "nat-cat1", label: "Naturopathy / Ayurveda Category 1", weeklyRate: 4000, color: "hsl(var(--sage))" },
  { key: "nat-cat2", label: "Naturopathy / Ayurveda Category 2", weeklyRate: 6000, color: "hsl(var(--sage))" },
  { key: "physio-cat1", label: "Physiotherapy / Acupuncture Category 1", weeklyRate: 3000, color: "hsl(var(--terracotta))" },
  { key: "physio-cat2", label: "Physiotherapy / Acupuncture Category 2", weeklyRate: 4000, color: "hsl(var(--terracotta))" },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

/* ── Table View ── */
function TableView() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr style={{ background: "hsl(var(--forest))" }}>
            {["Accommodation Type", "Per Week", "2 Weeks", "3 Weeks", "4 Weeks"].map((h) => (
              <th key={h} className="font-body font-semibold text-cream text-sm px-5 py-4 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROOMS.map((r, i) => (
            <tr key={r.key} className={i % 2 === 0 ? "bg-white" : "bg-cream/40"}>
              <td className="px-5 py-4">
                <div className="font-display font-semibold text-forest text-sm">{r.name}</div>
                <div className="font-body text-sage text-xs">{r.subName}{r.perPerson ? " · per person" : ""}</div>
              </td>
              {DURATIONS.map((w) => (
                <td key={w} className="px-5 py-4 font-body text-forest text-sm font-medium">{fmt(r.baseWeekly * w)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-white px-5 py-4 border-t border-border">
        <div className="font-body text-xs text-sage space-y-1">
          <p>• Tariff is from Tuesday to Monday (minimum 6 nights). • All prices include accommodation, three sattvic meals daily, yoga therapy sessions, medical consultations, and yoga kit.</p>
          <p>• Additional therapies (Naturopathy/Ayurveda: ₹4,000–6,000/week · Physiotherapy/Acupuncture: ₹3,000–4,000/week) charged separately.</p>
          <p>• Bill settlement required one day before discharge.</p>
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
  const [addOns, setAddOns] = useState<Set<string>>(new Set());

  const room = ROOMS.find((r) => r.key === selectedRoom);
  const accomTotal = room ? room.baseWeekly * weeks : 0;
  const addOnTotal = Array.from(addOns).reduce((sum, key) => {
    const ao = ADD_ONS.find((a) => a.key === key);
    return sum + (ao ? ao.weeklyRate * weeks : 0);
  }, 0);
  const grandTotal = accomTotal + addOnTotal;

  function toggleAddOn(key: string) {
    setAddOns((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

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
            Yoga therapy includes food and accommodation only. Charges for external therapies such as Ayurveda, Naturopathy, Acupuncture, Physiotherapy, and Ozone Therapy will be applicable if advised by the consulting doctor.
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
                background: view === v ? "hsl(var(--forest))" : "transparent",
                color: view === v ? "hsl(var(--cream))" : "hsl(var(--forest) / 0.6)",
                fontWeight: view === v ? "600" : "400",
              }}>
              <Icon size={15} /> {label}
            </button>
          ))}
          {view === "calculator" && selectedRoom && (
            <div className="ml-auto font-display font-bold text-gold text-lg">
              Total: {fmt(grandTotal)}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <AnimatePresence mode="wait">
          {view === "table" ? (
            <motion.div key="table" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <TableView />
            </motion.div>
          ) : (
            <motion.div key="calc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

              {/* Steps */}
              <div className="space-y-10">

                {/* Step 1: Accommodation */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-body font-bold text-sm text-cream"
                      style={{ background: "hsl(var(--forest))" }}>1</div>
                    <h2 className="font-display font-bold text-forest text-xl">Choose Your Accommodation</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ROOMS.map((r) => (
                      <button key={r.key} onClick={() => { setSelectedRoom(r.key); setStep(Math.max(step, 2)); }}
                        className="text-left rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-card"
                        style={{
                          borderColor: selectedRoom === r.key ? "hsl(var(--forest))" : "hsl(var(--border))",
                          background: selectedRoom === r.key ? "hsl(var(--forest) / 0.04)" : "white",
                        }}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-2xl mb-1">{r.emoji}</div>
                            <div className="font-display font-bold text-forest text-base">{r.name}</div>
                            <div className="font-body text-sage text-xs">{r.subName}{r.perPerson ? " · per person" : ""}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-display font-bold text-gold text-lg">{fmt(r.baseWeekly)}</div>
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
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Duration */}
                <AnimatePresence>
                  {step >= 2 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-body font-bold text-sm text-cream"
                          style={{ background: "hsl(var(--forest))" }}>2</div>
                        <h2 className="font-display font-bold text-forest text-xl">Choose Your Duration</h2>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {DURATIONS.map((w) => (
                          <button key={w} onClick={() => { setWeeks(w); setStep(Math.max(step, 3)); }}
                            className="rounded-xl border-2 px-6 py-4 text-center transition-all duration-200 min-w-[120px]"
                            style={{
                              borderColor: weeks === w ? "hsl(var(--forest))" : "hsl(var(--border))",
                              background: weeks === w ? "hsl(var(--forest))" : "white",
                              color: weeks === w ? "hsl(var(--cream))" : "hsl(var(--forest))",
                            }}>
                            <div className="font-display font-bold text-xl">{w}</div>
                            <div className="font-body text-sm">{w === 1 ? "Week" : "Weeks"}</div>
                            {selectedRoom && (
                              <div className="font-body text-xs mt-1 opacity-70">
                                {fmt(ROOMS.find(r => r.key === selectedRoom)!.baseWeekly * w)}
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

                {/* Step 3: Add-ons */}
                <AnimatePresence>
                  {step >= 3 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-body font-bold text-sm text-cream"
                          style={{ background: "hsl(var(--forest))" }}>3</div>
                        <h2 className="font-display font-bold text-forest text-xl">Add Therapies <span className="font-body font-normal text-sage text-base">(Optional)</span></h2>
                      </div>
                      <div className="space-y-3">
                        {ADD_ONS.map((ao) => (
                          <button key={ao.key} onClick={() => toggleAddOn(ao.key)}
                            className="w-full text-left flex items-center gap-4 rounded-xl border-2 p-5 transition-all duration-200"
                            style={{
                              borderColor: addOns.has(ao.key) ? ao.color : "hsl(var(--border))",
                              background: addOns.has(ao.key) ? `${ao.color.replace(")", " / 0.05)")}` : "white",
                            }}>
                            <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                              style={{
                                borderColor: addOns.has(ao.key) ? ao.color : "hsl(var(--border))",
                                background: addOns.has(ao.key) ? ao.color : "transparent",
                              }}>
                              {addOns.has(ao.key) && <CheckCircle2 size={12} className="text-white" />}
                            </div>
                            <div className="flex-1">
                              <div className="font-body font-semibold text-forest text-sm">{ao.label}</div>
                              <div className="font-body text-sage text-xs">{fmt(ao.weeklyRate)}/week</div>
                            </div>
                            <div className="text-right font-display font-bold" style={{ color: ao.color }}>
                              {fmt(ao.weeklyRate * weeks)}
                              <div className="font-body font-normal text-xs text-sage">for {weeks} wk{weeks > 1 ? "s" : ""}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sticky Summary */}
              <div>
                <div className="sticky top-28">
                  <div className="rounded-2xl overflow-hidden shadow-card-hover border border-border">
                    <div className="p-5" style={{ background: "hsl(var(--forest))" }}>
                      <div className="font-body text-xs tracking-[0.2em] uppercase text-gold/70 mb-1">Your Estimate</div>
                      <div className="font-display font-bold text-cream text-4xl">{fmt(grandTotal)}</div>
                      {weeks > 0 && <div className="font-body text-cream/60 text-xs mt-1">for {weeks} week{weeks > 1 ? "s" : ""}</div>}
                    </div>
                    <div className="bg-white p-5 space-y-3">
                      {room ? (
                        <>
                          <div className="flex justify-between font-body text-sm">
                            <span className="text-forest/60">{room.name} × {weeks}wk{weeks > 1 ? "s" : ""}</span>
                            <span className="font-semibold text-forest">{fmt(accomTotal)}</span>
                          </div>
                          {Array.from(addOns).map((key) => {
                            const ao = ADD_ONS.find((a) => a.key === key);
                            return ao ? (
                              <div key={key} className="flex justify-between font-body text-sm">
                                <span className="text-forest/60 text-xs leading-tight max-w-[200px]">{ao.label} × {weeks}wk</span>
                                <span className="font-semibold text-forest">{fmt(ao.weeklyRate * weeks)}</span>
                              </div>
                            ) : null;
                          })}
                          {addOns.size > 0 && (
                            <div className="border-t border-border pt-3 flex justify-between font-body font-bold">
                              <span className="text-forest">Grand Total</span>
                              <span className="text-gold">{fmt(grandTotal)}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="font-body text-sage text-sm text-center py-2">Select an accommodation above to begin.</p>
                      )}
                    </div>

                    {/* What's included */}
                    <div className="bg-cream/40 px-5 pb-5">
                      <div className="font-body text-xs tracking-widest uppercase text-sage font-semibold mb-3 pt-4">Included in all packages</div>
                      {["Accommodation", "3 Sattvic meals daily", "Medical consultations", "Yoga therapy sessions", "Yoga kit"].map((inc) => (
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
                    <div className="bg-forest/5 px-5 py-4">
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