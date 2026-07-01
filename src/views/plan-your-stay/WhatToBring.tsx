"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import {
  ChevronRight, FileText, ShoppingBag, Shirt, Zap, Pill,
  CheckSquare, Square, RotateCcw, Download, Check
} from "lucide-react";

/* ── Data ── */
const CATEGORIES = [
  {
    key: "documents",
    icon: FileText,
    label: "Documents",
    color: "hsl(200 55% 32%)",
    bg: "hsl(200 55% 32% / 0.07)",
    items: [
      "Aadhaar Card (or other government-issued photo ID)",
      "Previous medical reports and investigation results",
      "Doctor's prescriptions and medical history summary",
      "Insurance documents (if applicable)",
      "Emergency contact details (written copy)",
    ],
  },
  {
    key: "personal",
    icon: ShoppingBag,
    label: "Personal Items",
    color: "hsl(var(--sage))",
    bg: "hsl(var(--sage) / 0.07)",
    items: [
      "Toiletries (toothbrush, toothpaste, soap, shampoo)",
      "Towels (2–3 sets — laundry available on campus)",
      "Cup, tumbler or flask for herbal drinks",
      "Spoon and plate (optional — dining hall provided)",
      "Hair comb and personal grooming items",
      "Small mirror",
    ],
  },
  {
    key: "clothing",
    icon: Shirt,
    label: "Clothing",
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.07)",
    items: [
      "Seasonal clothing (Bengaluru is mild; evenings can be cool)",
      "Comfortable, loose-fitting yoga wear (2–3 sets)",
      "Cotton pyjamas or nightwear",
      "Socks (mornings and evenings can be cool)",
      "Sandals or slip-on footwear for campus",
      "Walking shoes for nature trails",
      "Light jacket or shawl for early morning sessions",
    ],
  },
  {
    key: "essentials",
    icon: Zap,
    label: "Essentials",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.07)",
    items: [
      "Umbrella or raincoat (monsoon season: June–September)",
      "Mobile phone and charger",
      "Power bank",
      "Notebook and pen (for lectures and personal journalling)",
      "Reading glasses if required",
      "Ear plugs (for light sleepers in dormitory)",
    ],
  },
  {
    key: "medications",
    icon: Pill,
    label: "Medications",
    color: "hsl(258 50% 35%)",
    bg: "hsl(258 50% 35% / 0.07)",
    items: [
      "All current medications (sufficient supply for your entire stay)",
      "Written list of medications with dosages",
      "Any supplements or vitamins currently taken",
      "Glucose monitor if diabetic",
      "Blood pressure monitor if hypertensive",
    ],
  },
];

type CheckState = Record<string, boolean>;

function buildInitialState(): CheckState {
  const state: CheckState = {};
  CATEGORIES.forEach((cat) => {
    cat.items.forEach((item) => {
      state[`${cat.key}::${item}`] = false;
    });
  });
  return state;
}

/* ── PDF Download (text-based) ── */
function downloadChecklist(checked: CheckState) {
  const lines: string[] = [
    "AROGYADHAMA — WHAT TO BRING CHECKLIST",
    "Prashanti Kutiram, Vivekananda Road, Kalluballu Post, Jigani, Anekal, Bengaluru – 560105",
    "Tel: 080-2263-9963 | arogyadhama@svyasa.edu.in",
    "",
    "=".repeat(50),
    "",
  ];

  CATEGORIES.forEach((cat) => {
    lines.push(`${cat.label.toUpperCase()}`);
    lines.push("-".repeat(30));
    cat.items.forEach((item) => {
      const isDone = checked[`${cat.key}::${item}`];
      lines.push(`${isDone ? "[✓]" : "[ ]"} ${item}`);
    });
    lines.push("");
  });

  lines.push("=".repeat(50));
  lines.push("Printed from: arogyadhama.svyasa.edu.in");

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Arogyadhama-WhatToBring-Checklist.txt";
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Category Card ── */
function CategoryCard({
  cat, checked, onToggle, i
}: {
  cat: typeof CATEGORIES[0];
  checked: CheckState;
  onToggle: (key: string) => void;
  i: number;
}) {
  const total = cat.items.length;
  const done = cat.items.filter((item) => checked[`${cat.key}::${item}`]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <motion.div
      className="bg-white rounded-2xl border border-border shadow-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.06 }}
    >
      {/* Header */}
      <div className="p-5 border-b border-border flex items-center gap-3" style={{ background: cat.bg }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: cat.bg, border: `1.5px solid ${cat.color}30` }}>
          <cat.icon size={18} style={{ color: cat.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-forest text-lg">{cat.label}</h3>
          <div className="font-body text-xs text-sage mt-0.5">{done}/{total} packed</div>
        </div>
        {/* Progress ring */}
        <div className="relative w-10 h-10 flex-shrink-0">
          <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
            <circle cx="20" cy="20" r="16" fill="none" strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 16}`}
              strokeDashoffset={`${2 * Math.PI * 16 * (1 - pct / 100)}`}
              stroke={cat.color}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.5s ease" }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-body text-[9px] font-bold"
            style={{ color: cat.color }}>{pct}%</div>
        </div>
      </div>

      {/* Items */}
      <div className="p-2">
        {cat.items.map((item) => {
          const key = `${cat.key}::${item}`;
          const isChecked = checked[key];
          return (
            <button key={item} onClick={() => onToggle(key)}
              className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-cream/50 transition-colors group">
              <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                style={{
                  borderColor: isChecked ? cat.color : "hsl(var(--border))",
                  background: isChecked ? cat.color : "transparent",
                }}>
                {isChecked && <Check size={11} className="text-cream" />}
              </div>
              <span className={`font-body text-sm leading-relaxed transition-all ${isChecked ? "line-through opacity-50" : "text-forest/80"}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── Overall Progress ── */
function OverallProgress({ checked }: { checked: CheckState }) {
  const total = Object.keys(checked).length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const colors =
    pct === 100 ? "hsl(var(--gold))" :
    pct >= 50 ? "hsl(var(--forest))" :
    "hsl(var(--sage))";

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5 sticky top-24">
      <div className="font-body text-xs uppercase tracking-widest text-sage font-semibold mb-3">Overall Progress</div>
      <div className="font-display font-bold text-3xl mb-1" style={{ color: colors }}>{pct}%</div>
      <div className="font-body text-sm text-sage mb-3">{done} of {total} items packed</div>
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: colors }} />
      </div>
      {pct === 100 && (
        <motion.div className="rounded-xl p-3 text-center mb-3" style={{ background: "hsl(var(--gold) / 0.1)" }}
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-xl mb-1">🎉</div>
          <p className="font-body text-xs text-gold font-semibold">You're fully packed!</p>
        </motion.div>
      )}
      <div className="font-body text-xs text-sage text-center">
        {pct < 100 ? `${total - done} items remaining` : "Ready for Arogyadhama!"}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function WhatToBring() {
  const [checked, setChecked] = useState<CheckState>(buildInitialState);

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function resetAll() {
    setChecked(buildInitialState());
  }

  const allChecked = Object.values(checked).every(Boolean);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(27 50% 14%) 0%, hsl(27 45% 18%) 55%, hsl(27 40% 22%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/plan-your-stay" className="hover:text-gold transition-colors">Plan Your Stay</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">What to Bring</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              What to Bring
            </h1>
            <p className="font-body text-cream/70 mt-4 max-w-lg leading-relaxed">
              An interactive packing checklist for your stay at Arogyadhama. Tick items as you pack — and download a copy to carry along.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Packing Checklist</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={resetAll}
              className="flex items-center gap-2 font-body text-sm text-sage hover:text-forest transition-colors">
              <RotateCcw size={14} /> Reset
            </button>
            <button
              onClick={() => downloadChecklist(checked)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm font-semibold transition-colors"
              style={{ background: "hsl(var(--forest))", color: "hsl(var(--cream))" }}>
              <Download size={14} /> Download Checklist
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start">
          {/* Checklist categories */}
          <div className="space-y-6">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.key} cat={cat} checked={checked} onToggle={toggle} i={i} />
            ))}
          </div>

          {/* Sticky progress */}
          <OverallProgress checked={checked} />
        </div>

        {/* Tips */}
        <motion.div className="mt-12 bg-white rounded-2xl border border-border shadow-card p-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="font-display font-bold text-forest text-xl mb-4">Packing Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: "Bring a separate bag for therapy sessions — you'll want easy access to your yoga mat and water bottle." },
              { tip: "Bengaluru's elevation means cool nights — a light jacket is essential even in summer." },
              { tip: "Yoga kit (mat, belt, block) is provided by Arogyadhama — you don't need to bring your own." },
              { tip: "Laundry service is available on campus. 3–4 sets of clothing are sufficient for most stays." },
              { tip: "Leave laptops at home if possible. The programme works best with digital minimalism." },
              { tip: "Bring a small thermos — the morning kashaya (herbal drink) is best enjoyed warm." },
            ].map((t, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-bold"
                  style={{ background: "hsl(var(--gold) / 0.15)", color: "hsl(var(--gold))" }}>
                  {i + 1}
                </span>
                <p className="font-body text-sm text-forest/70 leading-relaxed">{t.tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}