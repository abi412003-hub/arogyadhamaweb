"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import {
  ChevronRight, ChevronDown, Sunrise, Salad, PhoneCall, CalendarCheck,
  Pill, Users, Home, HeartPulse, LineChart, Sun, Moon, Sparkles,
  Check, RotateCcw, Download, Calendar, MessageCircle,
} from "lucide-react";

/* =========================================================
   TODO(content): All copy on this page is a first draft written
   in the Arogyadhama house voice. Durations, review intervals,
   tapering guidance and contact details must be verified and
   signed off by the clinical team before publishing.
   ========================================================= */

const HIGHLIGHTS = [
  { stat: "12 weeks", label: "Structured follow-up" },
  { stat: "3", label: "Tele-review consultations" },
  { stat: "45 min", label: "Daily home protocol" },
  { stat: "Lifelong", label: "Alumni support" },
];

/* ── Why after care matters ── */
const INSIGHTS = [
  {
    icon: HeartPulse,
    title: "Gains fade without practice",
    desc: "The improvements built over a residential stay — in blood pressure, glycaemic control, mobility, sleep and mood — depend on the practice continuing. After care exists so the curve keeps rising instead of flattening at home.",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.07)",
  },
  {
    icon: Home,
    title: "Home is a different environment",
    desc: "Prashanti Kutiram removes the triggers. Home brings them back — work, family routines, restaurant food, disturbed sleep. The protocol you leave with is designed for that reality, not for the campus.",
    color: "hsl(var(--sage))",
    bg: "hsl(var(--maroon-muted) / 0.07)",
  },
  {
    icon: LineChart,
    title: "Tapering needs supervision",
    desc: "Reducing medication is a clinical decision, never a personal one. Scheduled reviews let your physician read your home readings and adjust safely, in step with your own treating doctor.",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.07)",
  },
];

/* ── Four phases ── */
const PHASES = [
  {
    key: "discharge",
    tag: "Phase 1",
    when: "Discharge Day",
    title: "Handover & Home Protocol",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.07)",
    summary:
      "Before you leave campus, your therapy team converts everything you practised here into a written protocol you can actually run at home.",
    points: [
      "A one-to-one discharge consultation with your treating physician and yoga therapist.",
      "A printed After Care booklet: your personalised asana, pranayama and relaxation sequence with timings.",
      "A diet sheet keyed to your prakriti and condition — what continues, what returns gradually, what does not return.",
      "A medication chart showing current doses and which parameters your doctor will review before any change.",
      "Your review calendar, with the first tele-consultation already booked.",
    ],
  },
  {
    key: "first30",
    tag: "Phase 2",
    when: "Days 1–30",
    title: "Establishing the Rhythm",
    color: "hsl(var(--sage))",
    bg: "hsl(var(--maroon-muted) / 0.07)",
    summary:
      "The first month decides everything. The goal is not intensity — it is the same practice, at the same hour, every single day.",
    points: [
      "Daily home protocol, ideally between 5:30 and 7:00 AM, before the household wakes.",
      "Sattvic diet continued at roughly 80% of campus discipline; one relaxed meal a week is planned, not accidental.",
      "Daily log of the two or three parameters relevant to you — BP, fasting sugar, weight, peak flow, pain score.",
      "First tele-review consultation at the end of week two.",
      "A named therapist you can message on WhatsApp when a posture or a symptom is unclear.",
    ],
  },
  {
    key: "consolidate",
    tag: "Phase 3",
    when: "Days 31–90",
    title: "Consolidation & Tapering",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.07)",
    summary:
      "With the rhythm holding, the protocol deepens and — where your readings support it — medication is reviewed in consultation with your own physician.",
    points: [
      "Protocol progressed: longer holds, added pranayama, and condition-specific kriyas introduced under guidance.",
      "Second and third tele-reviews, at roughly day 45 and day 90.",
      "Investigations repeated locally and shared before each review.",
      "Any dose reduction is proposed by our physician and confirmed with your treating doctor — never started on your own.",
      "Optional short refresher stay (three to seven nights) if progress has stalled.",
    ],
  },
  {
    key: "lifelong",
    tag: "Phase 4",
    when: "Beyond 90 Days",
    title: "Lifelong Sadhana",
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.07)",
    summary:
      "After care stops being a programme and becomes a way of living. Arogyadhama stays available, but the practice is now yours.",
    points: [
      "Annual or half-yearly review stay to reassess and re-prescribe.",
      "Access to the alumni circle — online satsangs, group practice sessions and festival camps.",
      "Standing invitation to refresher camps at Prashanti Kutiram.",
      "Continued OPD access for any flare-up, with your full history already on file.",
      "Priority booking should you or a family member need a residential stay again.",
    ],
  },
];

/* ── What's included ── */
const INCLUDED = [
  {
    icon: Sunrise,
    title: "Personalised Home Yoga Protocol",
    desc: "Not a generic sequence. A written 45-minute practice built around your condition, your mobility and the hour you can realistically keep.",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.08)",
  },
  {
    icon: Salad,
    title: "Diet & Nutrition Plan",
    desc: "A sattvic plan you can cook in a normal kitchen — with substitutions for travel, festivals and eating out, so the plan survives real life.",
    color: "hsl(var(--sage))",
    bg: "hsl(var(--maroon-muted) / 0.08)",
  },
  {
    icon: PhoneCall,
    title: "Tele-Follow-Up Consultations",
    desc: "Three scheduled video reviews across twelve weeks with the physician who treated you here — not a call centre, and not a stranger.",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.08)",
  },
  {
    icon: CalendarCheck,
    title: "Review Visits & Refresher Camps",
    desc: "Short residential refreshers to reset the practice, plus periodic camps at Prashanti Kutiram open to every past patient.",
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.08)",
  },
  {
    icon: Pill,
    title: "Medication Tapering Guidance",
    desc: "Structured, evidence-led review of your prescription — always in writing, always in coordination with your own treating physician.",
    color: "hsl(200 55% 32%)",
    bg: "hsl(200 55% 32% / 0.08)",
  },
  {
    icon: Users,
    title: "Alumni Support Circle",
    desc: "A community of patients walking the same path — online satsangs, shared practice, and the quiet accountability of not practising alone.",
    color: "hsl(258 50% 35%)",
    bg: "hsl(258 50% 35% / 0.08)",
  },
];

/* ── A day at home ── */
const DAY_BLOCKS = [
  {
    icon: Sunrise,
    time: "5:30 – 6:45 AM",
    label: "Early Morning",
    color: "hsl(var(--gold))",
    items: [
      "Wake before sunrise; warm water on rising",
      "Kriya as prescribed (jala neti and others, if advised)",
      "Loosening practices, sun salutation variant, prescribed asanas",
      "Pranayama and 10 minutes of deep relaxation",
    ],
  },
  {
    icon: Sun,
    time: "8:00 AM – 1:00 PM",
    label: "Forenoon",
    color: "hsl(var(--sage))",
    items: [
      "Sattvic breakfast within an hour of practice",
      "Record the day's readings in your log",
      "Work as usual — a short standing or walking break every 90 minutes",
      "Lunch as the largest meal of the day, unhurried and screen-free",
    ],
  },
  {
    icon: Moon,
    time: "5:30 – 7:00 PM",
    label: "Evening",
    color: "hsl(var(--terracotta))",
    items: [
      "20–30 minute walk, ideally outdoors",
      "Short evening practice: gentle asanas and nadi shuddhi pranayama",
      "Light early dinner, finished by 7:30 PM",
    ],
  },
  {
    icon: Sparkles,
    time: "9:00 – 10:00 PM",
    label: "Night",
    color: "hsl(var(--forest))",
    items: [
      "Screens off an hour before bed",
      "Yoga nidra or a short meditation as prescribed",
      "Lights out by 10:00 PM — sleep is part of the protocol, not a leftover",
    ],
  },
];

/* ── First 30 days checklist ── */
const CHECK_CATEGORIES = [
  {
    key: "practice",
    icon: Sunrise,
    label: "Daily Practice",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.07)",
    items: [
      "Fix one practice hour and protect it in your calendar",
      "Set up a clean, quiet corner with your mat and props",
      "Complete the full prescribed sequence six days a week",
      "Do the evening relaxation or yoga nidra before sleep",
      "Note in your log on any day the practice is missed, and why",
    ],
  },
  {
    key: "diet",
    icon: Salad,
    label: "Diet",
    color: "hsl(var(--sage))",
    bg: "hsl(var(--maroon-muted) / 0.07)",
    items: [
      "Share the diet sheet with whoever cooks at home",
      "Stock the pantry from the approved list before week one",
      "Keep dinner light and finished by 7:30 PM",
      "Plan one relaxed meal a week rather than improvising",
      "Continue prescribed herbal preparations as directed",
    ],
  },
  {
    key: "monitoring",
    icon: LineChart,
    label: "Monitoring",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.07)",
    items: [
      "Record your prescribed parameters daily at the same time",
      "Weigh yourself weekly, on the same day",
      "Repeat the investigations your discharge summary lists",
      "Scan reports so they are ready before each review",
      "Flag any new or worsening symptom to your therapist the same day",
    ],
  },
  {
    key: "followup",
    icon: PhoneCall,
    label: "Follow-Up",
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.07)",
    items: [
      "Confirm the date and time of your week-two tele-review",
      "Save your therapist's WhatsApp contact",
      "Send your log and reports 48 hours before each review",
      "Take the discharge summary to your local physician",
      "Book your day-45 review before the first one ends",
    ],
  },
];

type CheckState = Record<string, boolean>;

function buildInitialState(): CheckState {
  const state: CheckState = {};
  CHECK_CATEGORIES.forEach((cat) => {
    cat.items.forEach((item) => {
      state[`${cat.key}::${item}`] = false;
    });
  });
  return state;
}

function downloadPlan(checked: CheckState) {
  const lines: string[] = [
    "AROGYADHAMA — AFTER CARE: YOUR FIRST 30 DAYS",
    "Prashanti Kutiram, Vivekananda Road, Kalluballu Post, Jigani, Anekal, Bengaluru – 560105",
    "Tel: 080-2263-9963 | arogyadhama@svyasa.edu.in",
    "",
    "=".repeat(50),
    "",
  ];

  CHECK_CATEGORIES.forEach((cat) => {
    lines.push(cat.label.toUpperCase());
    lines.push("-".repeat(30));
    cat.items.forEach((item) => {
      const isDone = checked[`${cat.key}::${item}`];
      lines.push(`${isDone ? "[x]" : "[ ]"} ${item}`);
    });
    lines.push("");
  });

  lines.push("=".repeat(50));
  lines.push("Your practice is the prescription. Keep the hour.");

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Arogyadhama-AfterCare-First30Days.txt";
  a.click();
  URL.revokeObjectURL(url);
}

/* ── FAQs ── */
const FAQS = [
  {
    q: "Is the After Care Programme charged separately?",
    a: "The discharge consultation, your written home protocol, the diet sheet and the three scheduled tele-reviews are included with every residential stay. Refresher stays and repeat residential admissions are charged at the standard tariff.",
  },
  {
    q: "What if I cannot manage the full 45-minute practice?",
    a: "Tell your therapist rather than quietly shortening it. A 20-minute sequence done every day is worth far more than a 45-minute one done twice a week, and your protocol can be rewritten around the time you actually have.",
  },
  {
    q: "Can I stop my medication once I feel better?",
    a: "No. Feeling better is not the same as a parameter having normalised, and abrupt withdrawal is genuinely dangerous with several classes of drug. Every reduction is proposed in writing by our physician after reviewing your readings, and confirmed with your own treating doctor.",
  },
  {
    q: "I live outside India. Does after care still work?",
    a: "Yes — the reviews are conducted over video, and your protocol and diet plan are adapted to what is available where you live. Please share investigation reports in advance, as local reference ranges and units sometimes differ.",
  },
  {
    q: "What happens if my symptoms return?",
    a: "Contact your therapist the same day rather than waiting for the next scheduled review. Most flare-ups are handled by adjusting the protocol. Where they are not, we will bring your review forward or advise a short refresher stay.",
  },
  {
    q: "How soon can I come back for a refresher stay?",
    a: "There is no minimum gap. Most patients find a three to seven night refresher useful somewhere between the third and sixth month, or whenever the practice has genuinely lapsed. Admissions remain on Tuesdays, as for any residential stay.",
  },
];

/* ── Checklist card ── */
function ChecklistCard({
  cat, checked, onToggle, i,
}: {
  cat: typeof CHECK_CATEGORIES[0];
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
      <div className="p-5 border-b border-border flex items-center gap-3" style={{ background: cat.bg }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: cat.bg, border: `1.5px solid ${cat.color}30` }}>
          <cat.icon size={18} style={{ color: cat.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-forest text-lg">{cat.label}</h3>
          <div className="font-body text-xs text-sage mt-0.5">{done}/{total} done</div>
        </div>
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

      <div className="p-2">
        {cat.items.map((item) => {
          const key = `${cat.key}::${item}`;
          const isChecked = checked[key];
          return (
            <button key={item} onClick={() => onToggle(key)}
              className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-cream/50 transition-colors">
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

/* ── Overall progress ── */
function OverallProgress({ checked }: { checked: CheckState }) {
  const total = Object.keys(checked).length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const colour =
    pct === 100 ? "hsl(var(--gold))" :
    pct >= 50 ? "hsl(var(--maroon))" :
    "hsl(var(--maroon-muted))";

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5 lg:sticky lg:top-24">
      <div className="font-body text-xs uppercase tracking-widest text-sage font-semibold mb-3">Your First 30 Days</div>
      <div className="font-display font-bold text-3xl mb-1" style={{ color: colour }}>{pct}%</div>
      <div className="font-body text-sm text-sage mb-3">{done} of {total} steps in place</div>
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: colour }} />
      </div>
      {pct === 100 && (
        <motion.div className="rounded-xl p-3 text-center mb-3" style={{ background: "hsl(var(--gold) / 0.1)" }}
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-xl mb-1">🪷</div>
          <p className="font-body text-xs text-gold font-semibold">Your after care is fully set up.</p>
        </motion.div>
      )}
      <div className="font-body text-xs text-sage text-center">
        {pct < 100 ? `${total - done} steps remaining` : "Now keep the hour."}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function AfterCare() {
  const [activePhase, setActivePhase] = useState(PHASES[0].key);
  const [checked, setChecked] = useState<CheckState>(buildInitialState);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const phase = PHASES.find((p) => p.key === activePhase) ?? PHASES[0];

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(345 35% 24%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        {/* Decorative mandala */}
        <div className="absolute right-0 top-0 h-full flex items-center pointer-events-none opacity-[0.06]">
          <svg viewBox="0 0 500 500" className="w-96 h-96 mr-[-4rem]" fill="none">
            {[220, 175, 130, 85, 40].map((r) => (
              <circle key={r} cx="250" cy="250" r={r} stroke="hsl(51 97% 94%)" strokeWidth="0.8" />
            ))}
            {Array.from({ length: 16 }, (_, i) => i * 22.5).map((a) => (
              <line key={a} x1="250" y1="250"
                x2={250 + Math.cos(a * Math.PI / 180) * 220}
                y2={250 + Math.sin(a * Math.PI / 180) * 220}
                stroke="hsl(51 97% 94%)" strokeWidth="0.4" />
            ))}
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/plan-your-stay" className="hover:text-gold transition-colors">Plan Your Stay</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">After Care Programme</span>
            </nav>
            <div className="inline-block font-body text-xs tracking-[0.3em] uppercase text-gold/80 border border-gold/30 rounded-full px-3 py-1 mb-4">
              Your Healing Continues at Home
            </div>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              After Care<br /><em className="not-italic text-gold">Programme</em>
            </h1>
            <p className="font-body text-cream/75 mt-5 max-w-xl leading-relaxed" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
              Discharge is not the end of treatment — it is the point at which the practice becomes yours.
              A structured twelve-week programme of home protocol, diet, monitoring and scheduled reviews
              carries the gains of your stay into everyday life.
            </p>
            <div className="flex flex-wrap gap-6 mt-10">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div key={h.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
                  <div className="font-display font-bold text-gold text-2xl">{h.stat}</div>
                  <div className="font-body text-cream/60 text-xs">{h.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why after care matters ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="section-label">Why It Matters</span>
              <h2 className="font-display text-display-md text-forest mt-3 mb-5">
                The stay starts it.<br /><em className="not-italic text-gold">Home decides it.</em>
              </h2>
              <div className="space-y-4 font-body text-forest/65 leading-relaxed">
                <p>
                  Patients leave Prashanti Kutiram lighter, steadier and often on fewer medicines than
                  they arrived with. What happens over the following three months determines whether
                  that becomes a permanent change or a pleasant memory.
                </p>
                <p>
                  The After Care Programme is deliberately unglamorous. It is a fixed practice hour, a
                  diet you can keep, two or three numbers written down each day, and a doctor who reads
                  them with you every few weeks. Nothing about it is dramatic — which is precisely why
                  it works.
                </p>
                <p className="font-quote text-xl text-forest/80 italic border-l-2 border-gold pl-4">
                  Yoga is not the practice you did at the ashram. It is the practice you keep on the
                  morning you do not feel like it.
                </p>
              </div>
            </motion.div>

            <div className="space-y-5">
              {INSIGHTS.map((ins, i) => (
                <motion.div key={ins.title}
                  className="bg-white rounded-2xl border border-border shadow-card p-6 flex gap-4"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: ins.bg, border: `1.5px solid ${ins.color}25` }}>
                    <ins.icon size={19} style={{ color: ins.color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-forest text-lg mb-1.5">{ins.title}</h3>
                    <p className="font-body text-sm text-forest/65 leading-relaxed">{ins.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Four phases ── */}
      <section className="py-20" style={{ background: "hsl(345 15% 97%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">The Journey</span>
            <h2 className="font-display text-display-md text-forest mt-3">Four Phases of After Care</h2>
            <p className="font-body text-sage mt-3 max-w-xl mx-auto">
              From discharge day to lifelong practice. Select a phase to see exactly what it involves.
            </p>
          </motion.div>

          {/* Phase selector */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {PHASES.map((p) => {
              const isActive = p.key === activePhase;
              return (
                <button key={p.key} onClick={() => setActivePhase(p.key)}
                  className="font-body text-sm px-5 py-2.5 rounded-full border transition-all text-left"
                  style={{
                    background: isActive ? p.color : "white",
                    color: isActive ? "hsl(var(--cream))" : "hsl(var(--maroon) / 0.65)",
                    borderColor: isActive ? p.color : "hsl(var(--border))",
                    fontWeight: isActive ? 600 : 400,
                  }}>
                  <span className="opacity-70 text-xs mr-2">{p.tag}</span>
                  {p.when}
                </button>
              );
            })}
          </div>

          {/* Phase detail — keyed so a phase change remounts and replays the fade-in */}
          <div>
            <motion.div key={phase.key}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
              <div className="p-7 md:p-9 border-b border-border" style={{ background: phase.bg }}>
                <div className="font-body text-xs tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: phase.color }}>
                  {phase.tag} · {phase.when}
                </div>
                <h3 className="font-display font-bold text-forest text-2xl md:text-3xl mb-3">{phase.title}</h3>
                <p className="font-body text-forest/65 leading-relaxed max-w-2xl">{phase.summary}</p>
              </div>
              <ul className="p-7 md:p-9 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {phase.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: phase.bg }}>
                      <Check size={11} style={{ color: phase.color }} />
                    </span>
                    <span className="font-body text-sm text-forest/70 leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">What You Receive</span>
            <h2 className="font-display text-display-md text-forest mt-3">Included With Every Stay</h2>
            <p className="font-body text-sage mt-3 max-w-xl mx-auto">
              Six components, handed over before you leave campus and supported for the twelve weeks that follow.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {INCLUDED.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="group flex flex-col h-full bg-white rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: item.bg }}>
                    <item.icon size={22} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-display font-bold text-forest text-xl mb-2">{item.title}</h3>
                  <p className="font-body text-forest/60 text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── A day at home ── */}
      <section className="py-20" style={{ background: "hsl(var(--cream-dark))" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Daily Rhythm</span>
            <h2 className="font-display text-display-md text-forest mt-3">A Day at Home</h2>
            <p className="font-body text-sage mt-3 max-w-xl mx-auto">
              The campus schedule, scaled down to a working life. Your therapist will adapt these timings to yours.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical rail */}
            <div className="absolute left-[19px] md:left-1/2 top-2 bottom-2 w-px md:-translate-x-1/2" style={{ background: "hsl(var(--border))" }} />
            <div className="space-y-8">
              {DAY_BLOCKS.map((block, i) => (
                <motion.div key={block.label}
                  className={`relative flex gap-5 md:gap-0 md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  {/* Dot */}
                  <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-10">
                    <div className="timeline-dot" style={{ background: block.color, borderColor: "hsl(var(--cream))" }} />
                  </div>
                  {/* Card */}
                  <div className="md:w-1/2 md:px-8 ml-10 md:ml-0">
                    <div className="bg-white rounded-2xl border border-border shadow-card p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${block.color.replace(")", " / 0.1)")}` }}>
                          <block.icon size={17} style={{ color: block.color }} />
                        </div>
                        <div>
                          <div className="font-display font-bold text-forest text-lg leading-tight">{block.label}</div>
                          <div className="font-body text-xs text-sage">{block.time}</div>
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {block.items.map((it) => (
                          <li key={it} className="font-body text-sm text-forest/65 leading-relaxed flex gap-2">
                            <span className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ background: block.color }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── First 30 days checklist ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Interactive</span>
            <h2 className="font-display text-display-md text-forest mt-3">Set Up Your First 30 Days</h2>
            <p className="font-body text-sage mt-3 max-w-xl mx-auto">
              Work through this in the week you get home. Tick as you go, then download a copy to keep on the fridge.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
              <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Home Setup Checklist</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setChecked(buildInitialState())}
                className="flex items-center gap-2 font-body text-sm text-sage hover:text-forest transition-colors">
                <RotateCcw size={14} /> Reset
              </button>
              <button onClick={() => downloadPlan(checked)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm font-semibold transition-colors"
                style={{ background: "hsl(var(--maroon))", color: "hsl(var(--cream))" }}>
                <Download size={14} /> Download Plan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CHECK_CATEGORIES.map((cat, i) => (
                <ChecklistCard key={cat.key} cat={cat} checked={checked} onToggle={toggle} i={i} />
              ))}
            </div>
            <OverallProgress checked={checked} />
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20" style={{ background: "hsl(345 15% 97%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Questions</span>
            <h2 className="font-display text-display-md text-forest mt-3">After Care FAQs</h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div key={faq.q}
                  className="bg-white rounded-2xl border border-border shadow-card overflow-hidden"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left p-5 hover:bg-cream/40 transition-colors">
                    <span className="font-display font-semibold text-forest text-base md:text-lg">{faq.q}</span>
                    <ChevronDown size={18}
                      className="text-sage flex-shrink-0 transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden">
                        <p className="font-body text-sm text-forest/65 leading-relaxed px-5 pb-5 border-t border-border pt-4">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-muted)) 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">Already Been With Us?</h2>
            <p className="font-body text-cream/70 mb-8">
              Book a follow-up review or a short refresher stay — or simply talk to the team about
              restarting a practice that has slipped.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-now"
                className="flex items-center justify-center gap-2 bg-gold text-forest-dark font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-gold-light transition-colors shadow-gold">
                <Calendar size={16} /> Book a Follow-Up Review
              </Link>
              <Link to="/contact"
                className="flex items-center justify-center gap-2 border-2 border-cream/40 text-cream font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-cream/10 transition-colors">
                <MessageCircle size={16} /> Talk to Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
