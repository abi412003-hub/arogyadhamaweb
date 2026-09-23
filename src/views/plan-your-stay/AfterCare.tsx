"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import {
  ChevronRight, Users, User, Video, Leaf, Library, MessageCircle,
  Stethoscope, Phone, Check, Send, Loader2, ArrowRight, CalendarDays,
} from "lucide-react";

// next.config.mjs sets `disableStaticImages` + an asset/resource rule, so this
// resolves to a plain URL string for a normal <img src>, not a next/image object.
import heroImg from "@/assets/anuvartana-hero.jpg";

/* =========================================================
   Anuvartana — Continuing Care Programme
   Copy on this page is condensed from the client's
   "Arogyadhama Anuvartana" brochure. Please keep it in sync
   with that source.
   ========================================================= */

const PHONE_DISPLAY = "+91 85904 90955";
const PHONE_RAW = "+918590490955";

const HERO_CHIPS = ["Online · Live", "4–12 weeks", "6 days a week", "English · Hindi · Kannada"];

const INCLUDED = [
  {
    icon: Stethoscope,
    title: "Doctor consultations",
    variant: "pulse",
    desc: "Ayurveda and Naturopathy consultations review your case and guide your lifestyle, diet and yoga therapy practice.",
    color: "hsl(258 50% 35%)",
  },
  {
    icon: Leaf,
    title: "Personalised diet guidance",
    variant: "botanical",
    desc: "A practical diet chart and food guidance to carry the healthy habits from your stay into daily life.",
    color: "hsl(var(--forest))",
  },
  {
    icon: Video,
    title: "Yoga therapy practice modules",
    variant: "screen",
    desc: "Modules and practice lists planned for your condition, so you can practise independently alongside live sessions.",
    color: "hsl(var(--sage))",
  },
  {
    icon: Library,
    title: "Recorded lectures & classes",
    variant: "library",
    desc: "Revisit educational sessions, expert talks and recorded classes at your convenience.",
    color: "hsl(var(--gold))",
  },
  {
    icon: MessageCircle,
    title: "Counsellor support",
    variant: "community",
    desc: "Your Yoga Counsellor offers emotional and motivational support, follows your progress and keeps you on track.",
    color: "hsl(var(--terracotta))",
  },
];

const PLANS = [
  {
    icon: Users,
    name: "Group",
    lines: ["Guided yoga therapy in a group.", "Fixed session timings."],
  },
  {
    icon: User,
    name: "1-to-1",
    lines: ["Personalised individual yoga therapy.", "Flexible session timings."],
  },
];

const BOTH_PLANS = [
  "Ayurveda and Naturopathy consultations",
  "Diet chart and practical food guidance",
  "Structured modules and practice lists",
  "Lectures, expert talks and recorded classes",
  "Progress tracking, follow-ups and guidance",
];

const COUNSELLOR_POINTS = [
  "Track progress and regularity",
  "Address queries and challenges",
  "Coordinate with doctors and the care team",
  "Manage scheduling and reminders",
];

/* ─────────────────────────────────────────────────────────
   Hero backdrop — layered decorative artwork over the maroon
   gradient. Purely ornamental: pointer-events-none, and the
   heavier layers are hidden below md.
   ───────────────────────────────────────────────────────── */
/**
 * Point on a circle centred at (300,300), rounded to 2dp.
 * Rounding matters: unrounded floats serialise differently on the server and
 * the client, which React reports as a hydration mismatch.
 */
function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: +(300 + Math.cos(rad) * radius).toFixed(2),
    y: +(300 + Math.sin(rad) * radius).toFixed(2),
  };
}

/* ─────────────────────────────────────────────────────────
   Card backdrops — each "What's Included" card gets its own
   motif drawn to match its wording. Ornamental only.

   Two things matter here:
   · every gradient/pattern id is suffixed with the card's uid,
     otherwise all five cards reuse the first card's <defs>;
   · coordinates are literal or rounded, so SSR and client
     markup match exactly (see polar() above).
   ───────────────────────────────────────────────────────── */
const GOLD = "hsl(43 89% 62%)";
const CREAM = "hsl(51 97% 94%)";

function Motif({ variant, uid }: { variant: string; uid: string }) {
  const s = { fill: "none", stroke: GOLD, strokeWidth: 1.4 } as const;

  if (variant === "botanical") {
    // Leaf fronds + herb sprigs + mortar-bowl arc
    return (
      <g opacity="0.5">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${230 + i * 62} ${70 + i * 34}) rotate(${-24 + i * 20})`} opacity={0.9 - i * 0.2}>
            <path d="M0 0 C 26 -34, 26 -86, 0 -116 C -26 -86, -26 -34, 0 0 Z" {...s} />
            <line x1="0" y1="0" x2="0" y2="-116" stroke={CREAM} strokeWidth="0.8" opacity="0.7" />
            {[-24, -48, -72, -96].map((y) => (
              <g key={y}>
                <line x1="0" y1={y} x2="14" y2={y - 12} stroke={CREAM} strokeWidth="0.6" opacity="0.6" />
                <line x1="0" y1={y} x2="-14" y2={y - 12} stroke={CREAM} strokeWidth="0.6" opacity="0.6" />
              </g>
            ))}
          </g>
        ))}
        <path d="M96 176 A 54 54 0 0 0 204 176" {...s} stroke={CREAM} opacity="0.55" />
        <line x1="88" y1="176" x2="212" y2="176" stroke={CREAM} strokeWidth="1.2" opacity="0.55" />
      </g>
    );
  }

  if (variant === "screen") {
    // Video frame + soundwave + radiating signal arcs
    const bars = [16, 34, 22, 48, 30, 58, 26, 40, 18];
    return (
      <g opacity="0.55">
        <rect x="186" y="52" width="176" height="112" rx="12" {...s} />
        <path d="M362 84 L 402 62 L 402 154 L 362 132 Z" {...s} opacity="0.8" />
        {bars.map((h, i) => (
          <line key={i} x1={208 + i * 17} y1={108 - h / 2} x2={208 + i * 17} y2={108 + h / 2}
            stroke={CREAM} strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
        ))}
        {[34, 56, 78].map((r, i) => (
          <path key={r} d={`M96 ${196 - r} A ${r} ${r} 0 0 0 96 ${196 + r}`} {...s} opacity={0.5 - i * 0.12} />
        ))}
      </g>
    );
  }

  if (variant === "library") {
    // Stacked page bars + play triangle + lotus glyph
    const rows = [172, 214, 138, 196, 156];
    return (
      <g opacity="0.55">
        {rows.map((w, i) => (
          <rect key={i} x="196" y={44 + i * 30} width={w} height="16" rx="4" {...s}
            opacity={0.85 - i * 0.1} />
        ))}
        <circle cx="118" cy="150" r="42" {...s} opacity="0.6" />
        <path d="M106 130 L 140 150 L 106 170 Z" fill={CREAM} opacity="0.28" stroke="none" />
        <g transform="translate(392 196)" opacity="0.7">
          <path d="M0 8 C0 8 -18 -2 -18 -18 C-18 -30 -8 -36 0 -30 C8 -36 18 -30 18 -18 C18 -2 0 8 0 8Z" {...s} />
        </g>
      </g>
    );
  }

  if (variant === "community") {
    // Linked-node constellation + folded envelope
    const nodes = [[112, 66], [196, 44], [268, 92], [148, 132], [232, 168], [318, 140], [86, 176]];
    const links = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 5], [4, 5], [3, 6], [0, 6]];
    return (
      <g opacity="0.55">
        {links.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
            stroke={CREAM} strokeWidth="0.9" opacity="0.5" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 9 : 6} {...s} opacity="0.9" />
        ))}
        <g transform="translate(322 176)" opacity="0.8">
          <rect x="0" y="0" width="92" height="60" rx="6" {...s} />
          <path d="M0 6 L 46 40 L 92 6" {...s} stroke={CREAM} opacity="0.7" />
        </g>
      </g>
    );
  }

  // pulse — ECG line + ring gauge + tick marks
  return (
    <g opacity="0.55">
      <path
        d="M40 132 L 118 132 L 136 92 L 158 176 L 182 60 L 204 132 L 268 132"
        {...s}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="352" cy="112" r="52" {...s} stroke={CREAM} opacity="0.35" />
      <path d="M352 60 A 52 52 0 0 1 396 138" {...s} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="352" cy="112" r="7" fill={GOLD} opacity="0.5" stroke="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={64 + i * 44} y1="204" x2={64 + i * 44} y2={i % 2 === 0 ? 186 : 194}
          stroke={CREAM} strokeWidth="1.2" opacity="0.45" />
      ))}
    </g>
  );
}

function CardBackdrop({ variant, uid, color }: { variant: string; uid: string; color: string }) {
  // Glow nudged per card so the five don't look stamped from one template.
  const glow = { botanical: ["74%", "26%"], screen: ["24%", "22%"], library: ["70%", "74%"], community: ["30%", "76%"], pulse: ["82%", "44%"] }[variant] ?? ["50%", "50%"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(145deg, ${color} 0%, hsl(var(--maroon-dark)) 130%)` }}
      />
      <svg viewBox="0 0 460 230" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`acg-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(43 89% 60%)" stopOpacity="0.30" />
            <stop offset="100%" stopColor="hsl(43 89% 60%)" stopOpacity="0" />
          </radialGradient>
          <pattern id={`acd-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="0.9" fill={CREAM} opacity="0.18" />
          </pattern>
        </defs>
        <ellipse cx={glow[0]} cy={glow[1]} rx="210" ry="170" fill={`url(#acg-${uid})`} />
        <rect width="100%" height="100%" fill={`url(#acd-${uid})`} opacity="0.5" />
        <Motif variant={variant} uid={uid} />
      </svg>
      {/* Bottom-weighted scrim keeps the white text legible over the busiest artwork */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--maroon-dark) / 0.88) 0%, hsl(var(--maroon-dark) / 0.55) 45%, hsl(var(--maroon-dark) / 0.12) 100%)",
        }}
      />
    </div>
  );
}

function HeroArtwork() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Soft depth glows */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="ac-glow-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(43 89% 55%)" stopOpacity="0.20" />
            <stop offset="100%" stopColor="hsl(43 89% 55%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ac-glow-cream" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(51 97% 94%)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(51 97% 94%)" stopOpacity="0" />
          </radialGradient>
          <pattern id="ac-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.1" fill="hsl(51 97% 94%)" opacity="0.16" />
          </pattern>
        </defs>
        <ellipse cx="78%" cy="34%" rx="420" ry="360" fill="url(#ac-glow-gold)" />
        <ellipse cx="16%" cy="88%" rx="380" ry="300" fill="url(#ac-glow-cream)" />
        <rect width="100%" height="100%" fill="url(#ac-dots)" opacity="0.35" />
      </svg>

      {/* The mandala that used to sit here is gone: the hero photo now occupies
          the same right-hand region and the two would collide. The glows and dot
          texture above stay — they are full-bleed and sit quietly under the text. */}

      {/* Bottom fade into the page */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--maroon-dark) / 0.45))" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Expression of Interest form
   ───────────────────────────────────────────────────────── */
const EMPTY = {
  name: "", age: "", gender: "", phone: "", email: "", city: "",
  completedProgram: "", datesOfStay: "", condition: "",
  // Anuvartana is online-only; kept as a fixed value so the API and sheet columns are unchanged.
  mode: "Online",
  program: "", timing: "", hearAbout: "", notes: "",
};

type FormState = typeof EMPTY;

function EOIForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your full name";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Enter a 10-digit contact number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address";
    // A required Age that accepts "abc" is no gate — check it's a plausible number.
    const age = Number(form.age.trim());
    if (!/^\d{1,3}$/.test(form.age.trim()) || age < 1 || age > 120) e.age = "Enter a valid age";
    if (!form.gender) e.gender = "Please select an option";
    if (!form.completedProgram) e.completedProgram = "Please select Yes or No";
    if (!form.program) e.program = "Please select a plan";
    if (!consent) e.consent = "Please give your consent to continue";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/aftercare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls = (key: string) =>
    `w-full px-4 py-3 rounded-xl border font-body text-sm text-forest outline-none transition-colors bg-white ${
      errors[key] ? "border-red-400 bg-red-50" : "border-border focus:border-gold"
    }`;

  const labelCls = "font-body text-xs font-semibold uppercase tracking-widest text-sage block mb-1.5";

  function text(key: keyof FormState, label: string, opts?: { max?: number; placeholder?: string }) {
    return (
      <div>
        <label className={labelCls} htmlFor={`eoi-${key}`}>{label}</label>
        <input
          id={`eoi-${key}`}
          type="text"
          value={form[key]}
          maxLength={opts?.max ?? 255}
          placeholder={opts?.placeholder}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className={inputCls(key)}
        />
        {errors[key] && <p className="font-body text-xs text-red-500 mt-1">{errors[key]}</p>}
      </div>
    );
  }

  function select(key: keyof FormState, label: string, options: string[]) {
    return (
      <div>
        <label className={labelCls} htmlFor={`eoi-${key}`}>{label}</label>
        <select
          id={`eoi-${key}`}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className={inputCls(key)}
        >
          <option value="">Select…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {errors[key] && <p className="font-body text-xs text-red-500 mt-1">{errors[key]}</p>}
      </div>
    );
  }

  function area(key: keyof FormState, label: string, rows = 3) {
    return (
      <div className="md:col-span-2">
        <label className={labelCls} htmlFor={`eoi-${key}`}>{label}</label>
        <textarea
          id={`eoi-${key}`}
          rows={rows}
          value={form[key]}
          maxLength={2000}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className={inputCls(key)}
        />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-border shadow-card p-10 text-center">
        <div
          className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-5"
          style={{ background: "hsl(var(--gold) / 0.15)" }}
        >
          <Check size={26} className="text-gold" />
        </div>
        <h3 className="font-display font-bold text-forest text-2xl mb-3">Thank you — we have your details.</h3>
        <p className="font-body text-forest/65 leading-relaxed max-w-md mx-auto">
          A member of our care team will contact you shortly to discuss the right programme for you.
          If you would rather speak to us now, call or WhatsApp {PHONE_DISPLAY}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-border shadow-card p-6 md:p-9"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {text("name", "Full Name *")}
        {text("age", "Age *", { max: 10 })}
        {select("gender", "Gender *", ["Female", "Male", "Other", "Prefer not to say"])}
        {text("phone", "Contact Number *", { max: 10, placeholder: "10-digit mobile number" })}
        {text("email", "Email Address *")}
        {text("city", "City / Location", { max: 120 })}
        {select("completedProgram", "Programme Completed at Arogyadhama *", ["Yes", "No"])}
        {text("datesOfStay", "Approximate Dates of Stay", { max: 120, placeholder: "e.g. March 2026" })}
        {area("condition", "Primary Health Concern / Condition", 2)}
        {select("program", "Preferred Plan *", ["Group", "1-to-1"])}
        {text("timing", "Preferred Days & Timing for Sessions", { max: 200 })}
        {text("hearAbout", "How Did You Hear About Us?", { max: 200 })}
        {area("notes", "Additional Notes / Questions")}
      </div>

      {/* Consent */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => { setConsent((c) => !c); setErrors((e) => ({ ...e, consent: "" })); }}
          className="flex items-start gap-3 text-left w-full"
        >
          <span
            className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
            style={{
              borderColor: consent ? "hsl(var(--maroon))" : errors.consent ? "hsl(0 70% 60%)" : "hsl(var(--border))",
              background: consent ? "hsl(var(--maroon))" : "transparent",
            }}
          >
            {consent && <Check size={11} className="text-cream" />}
          </span>
          <span className="font-body text-sm text-forest/70 leading-relaxed">
            I consent to Arogyadhama contacting me regarding the Anuvartana programme and to the use of my
            details for this purpose.
          </span>
        </button>
        {errors.consent && <p className="font-body text-xs text-red-500 mt-1.5 ml-8">{errors.consent}</p>}
      </div>

      {submitError && (
        <p className="font-body text-sm text-red-600 mt-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {submitError}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-body font-semibold transition-colors disabled:opacity-60"
          style={{ background: "hsl(var(--maroon))", color: "hsl(var(--cream))" }}
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {submitting ? "Sending…" : "Submit Expression of Interest"}
        </button>
        <span className="font-body text-xs text-sage">* Required fields</span>
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

function StepBadge({ n }: { n: string }) {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-display font-bold text-xl"
      style={{ background: "hsl(var(--maroon))", color: "hsl(var(--cream))" }}
    >
      {n}
    </div>
  );
}

export default function AfterCare() {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        className="relative pt-28 pb-16 md:pb-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(345 35% 24%) 100%)" }}
      >
        <div
          className="absolute left-0 top-0 h-1 w-full z-10"
          style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }}
        />
        <HeroArtwork />

        {/* Hero photo — right-hand panel whose left edge is dissolved by a mask
            so it melts into the maroon gradient. The couple sits left of centre
            in the source image, so it is anchored left and the fade kept short. */}
        {(() => {
          const mask = "linear-gradient(90deg, transparent 0%, black 30%)";
          return (
            <div
              className="absolute inset-y-0 right-0 w-[52%] hidden md:block pointer-events-none"
              style={{ WebkitMaskImage: mask, maskImage: mask }}
            >
              <img
                src={heroImg}
                alt=""
                aria-hidden
                className="w-full h-full object-cover"
                style={{ objectPosition: "30% center" }}
              />
              <div className="absolute inset-0" style={{ background: "hsl(var(--maroon-dark) / 0.15)" }} />
            </div>
          );
        })()}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="md:max-w-[46%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/plan-your-stay" className="hover:text-gold transition-colors">Plan Your Stay</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Anuvartana</span>
            </nav>

            <div className="inline-block font-body text-xs tracking-[0.3em] uppercase text-gold/80 border border-gold/30 rounded-full px-3 py-1 mb-5">
              Continuing Care Programme
            </div>

            <h1
              className="font-display text-cream font-bold"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", lineHeight: 1.05 }}
            >
              Anuvartana
            </h1>
            <p className="font-display text-gold mt-2" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.7rem)" }}>
              Your Arogyadhama practice, continued at home.
            </p>

            <p className="font-body text-cream/75 mt-6 leading-relaxed" style={{ fontSize: "clamp(1rem, 1.8vw, 1.1rem)" }}>
              Returning home brings a change in routine. Anuvartana helps you continue the practices
              introduced during your stay at Arogyadhama, with professional guidance, live sessions and
              support from your care team.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-8">
              {HERO_CHIPS.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.09 }}
                  className="font-body text-sm text-cream/85 border border-cream/25 rounded-full px-4 py-1.5"
                  style={{ background: "hsl(51 97% 94% / 0.06)" }}
                >
                  {c}
                </motion.span>
              ))}
            </div>

            <a
              href="#register"
              className="inline-flex items-center gap-2 mt-9 bg-gold text-forest-dark font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-gold-light transition-colors shadow-gold"
            >
              Register your interest <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Mobile: the photo panel is hidden, so show it as a banner instead */}
          <img
            src={heroImg}
            alt="A couple practising yoga at home, following a live online session on a laptop"
            className="md:hidden mt-10 w-full aspect-[4/3] object-cover rounded-2xl border border-cream/15"
            style={{ objectPosition: "30% center" }}
          />
        </div>
      </section>

      {/* ── Intro band ── */}
      <section className="py-16 md:py-20 bg-cream">
        <motion.div className="max-w-3xl mx-auto px-4 sm:px-6 text-center" {...fadeUp}>
          <span className="section-label">Anuvartana</span>
          <h2 className="font-display text-display-md text-forest mt-3 mb-5">
            Structured holistic care.<br />
            <em className="not-italic text-gold">Continued at home.</em>
          </h2>
          <p className="font-body text-forest/65 leading-relaxed max-w-2xl mx-auto">
            Sessions led by Doctors and Yoga Therapists, with a dedicated counsellor and care team to help
            you keep a consistent routine in the weeks after your stay.
          </p>
        </motion.div>
      </section>

      {/* ── What the programme includes ── */}
      <section className="py-20" style={{ background: "hsl(345 15% 97%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <span className="section-label">The Programme</span>
            <h2 className="font-display text-display-md text-forest mt-3">What the Programme Includes</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {INCLUDED.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="group relative flex h-full min-h-[17rem] flex-col justify-end overflow-hidden rounded-2xl p-7 border border-black/5 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300">
                  <CardBackdrop variant={item.variant} uid={item.variant} color={item.color} />

                  <span className="absolute left-0 top-0 h-1 w-full z-10" style={{ background: item.color }} />
                  <span className="absolute right-6 top-5 z-10 font-display font-bold text-cream/40 text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-cream/25 group-hover:scale-110 transition-transform"
                      style={{ background: "hsl(51 97% 94% / 0.14)" }}>
                      <item.icon size={22} className="text-cream" />
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      {item.title}
                    </h3>
                    <p className="font-body text-white/85 text-sm leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Choose your plan ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <span className="section-label">Two Plans</span>
            <h2 className="font-display text-display-md text-forest mt-3 mb-4">Choose Your Plan</h2>
            <p className="font-body text-sage max-w-xl mx-auto leading-relaxed">
              Two ways to continue your care at home, with continuing-care support included in both.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLANS.map((p, i) => (
              <motion.div
                key={p.name}
                className="relative bg-white rounded-2xl border border-border shadow-card p-8 overflow-hidden"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="absolute left-0 top-0 h-1 w-full" style={{ background: "hsl(var(--maroon))" }} />
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "hsl(var(--maroon) / 0.08)" }}
                  >
                    <p.icon size={22} style={{ color: "hsl(var(--forest))" }} />
                  </div>
                  <h3 className="font-display font-bold text-forest text-3xl">{p.name}</h3>
                </div>
                {p.lines.map((l) => (
                  <p key={l} className="font-body text-forest/70 leading-relaxed">{l}</p>
                ))}
                <div className="flex items-center gap-2 mt-6 pt-5 border-t border-border font-body text-sm text-sage">
                  <CalendarDays size={16} className="text-gold" />
                  Package duration: 1 month or 3 months
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-6 rounded-2xl p-8 md:p-10"
            style={{ background: "hsl(345 15% 97%)", border: "1px solid hsl(var(--border))" }}
            {...fadeUp}
          >
            <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-5">
              Included in both plans
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {BOTH_PLANS.map((b) => (
                <li key={b} className="flex items-start gap-3 font-body text-forest/80">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "hsl(var(--maroon))" }}
                  >
                    <Check size={11} className="text-cream" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-forest/60 leading-relaxed mt-7 pt-6 border-t border-border">
              <strong className="text-forest">Choosing a plan:</strong> Doctors determine programme allocation
              based on your condition, severity and preference for group or one-to-one practice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── How your programme works ── */}
      <section className="py-20" style={{ background: "hsl(345 15% 97%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <span className="section-label">Your Care Journey</span>
            <h2 className="font-display text-display-md text-forest mt-3">How Your Programme Works</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-px hidden sm:block" style={{ background: "hsl(var(--border))" }} />
            <div className="space-y-5">
              {/* 01 */}
              <motion.div className="relative flex flex-col sm:flex-row gap-5 items-start bg-white rounded-2xl border border-border shadow-card p-6" {...fadeUp}>
                <StepBadge n="01" />
                <div className="pt-1.5 flex-1 w-full">
                  <h3 className="font-display font-bold text-forest text-lg mb-1">Medical onboarding</h3>
                  <p className="font-body text-sm text-forest/65 leading-relaxed">
                    Your continuing-care journey begins with doctor consultations.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {[
                      { who: "BNYS Doctor", what: "Naturopathy consultation", desc: "Case review, discharge summary, diet outline and clearance on the intensity of yoga therapy practices." },
                      { who: "BAMS Doctor", what: "Ayurveda consultation", desc: "Guidance related to medicines and lifestyle." },
                    ].map((d) => (
                      <div key={d.who} className="rounded-xl p-4" style={{ background: "hsl(var(--maroon) / 0.05)" }}>
                        <div className="font-body text-xs font-semibold uppercase tracking-widest text-gold">{d.who}</div>
                        <div className="font-display font-bold text-forest mt-1">{d.what}</div>
                        <p className="font-body text-sm text-forest/65 leading-relaxed mt-1">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 02 */}
              <motion.div className="relative flex flex-col sm:flex-row gap-5 items-start bg-white rounded-2xl border border-border shadow-card p-6" {...fadeUp}>
                <StepBadge n="02" />
                <div className="pt-1.5">
                  <h3 className="font-display font-bold text-forest text-lg mb-1">Programme allocation</h3>
                  <p className="font-body text-sm text-forest/65 leading-relaxed">
                    Doctors determine the appropriate mode of continuing care based on your condition and severity
                    (mild, moderate or severe), taking into account your preference for group or one-to-one practice.
                  </p>
                </div>
              </motion.div>

              {/* 03 */}
              <motion.div className="relative flex flex-col sm:flex-row gap-5 items-start bg-white rounded-2xl border border-border shadow-card p-6" {...fadeUp}>
                <StepBadge n="03" />
                <div className="pt-1.5">
                  <h3 className="font-display font-bold text-forest text-lg mb-1">Care coordinator &amp; counsellor support</h3>
                  <p className="font-body text-sm text-forest/65 leading-relaxed">
                    Your Yoga Counsellor offers emotional and motivational support and stays connected throughout
                    your programme to:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-3">
                    {COUNSELLOR_POINTS.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 font-body text-sm text-forest/75">
                        <Check size={15} className="text-gold flex-shrink-0 mt-0.5" /> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* 04 */}
              <motion.div className="relative flex flex-col sm:flex-row gap-5 items-start bg-white rounded-2xl border border-border shadow-card p-6" {...fadeUp}>
                <StepBadge n="04" />
                <div className="pt-1.5">
                  <h3 className="font-display font-bold text-forest text-lg mb-1">Recorded learning</h3>
                  <p className="font-body text-sm text-forest/65 leading-relaxed">
                    Access recorded lectures, expert talks and classes beyond live sessions, and revisit important
                    teachings on yoga therapy, lifestyle and related practices.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Register Your Interest ── */}
      <section id="register" className="py-20 bg-cream scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <span className="section-label">Expression of Interest</span>
            <h2 className="font-display text-display-md text-forest mt-3 mb-4">Register Your Interest</h2>
            <p className="font-body text-sage max-w-xl mx-auto leading-relaxed">
              Ready to continue your practice at home? Complete the form below and a member of our care
              team will contact you to discuss the right plan for you.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EOIForm />
          </motion.div>
        </div>
      </section>

      {/* ── How to Reach Us ── */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-muted)) 100%)" }}
      >
        <motion.div className="max-w-3xl mx-auto px-4 sm:px-6 text-center" {...fadeUp}>
          <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">Guidance for the weeks ahead</h2>
          <p className="font-body text-cream/70 mb-8">
            Professional guidance, structured practice and ongoing support to help you maintain a consistent
            routine at home. Prefer to speak with us directly?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE_RAW}`}
              className="flex items-center justify-center gap-2 bg-gold text-forest-dark font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-gold-light transition-colors shadow-gold"
            >
              <Phone size={16} /> {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${PHONE_RAW.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-cream/40 text-cream font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-cream/10 transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
