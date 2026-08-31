"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import {
  ChevronRight, Users, Video, ClipboardList, TrendingUp,
  Leaf, Library, MessageCircle, Activity, Phone, Check,
  Send, Loader2, HeartHandshake,
} from "lucide-react";

/* =========================================================
   Anuvartana — The Arogyadhama Aftercare Program
   Copy on this page is taken from the client's "Website Content"
   document. Please keep it in sync with that source.
   ========================================================= */

const PHONE_DISPLAY = "+91 85904 90955";
const PHONE_RAW = "+918590490955";

const HERO_CHIPS = ["Online or In-person", "Monthly Consultations", "Personalised Plans"];

const WHY_CHOOSE = [
  {
    icon: Users,
    title: "The same expert team",
    desc: "Stay connected to the Yoga Therapists, Counsellors, BNYS and Ayurveda Doctors who know your journey.",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.07)",
  },
  {
    icon: Video,
    title: "Flexible, wherever you are",
    desc: "Support that fits your life, with sessions available online (via Skype or Zoom) or in person at our facility.",
    color: "hsl(var(--sage))",
    bg: "hsl(var(--maroon-muted) / 0.07)",
  },
  {
    icon: ClipboardList,
    title: "A plan built around you",
    desc: "A personalised wellness plan tailored to your condition, your goals and your progress.",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.07)",
  },
  {
    icon: TrendingUp,
    title: "Motivation that lasts",
    desc: "Ongoing motivation and accountability to help healthy habits become lasting ones.",
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.07)",
  },
];

const INCLUDED = [
  {
    icon: Leaf,
    title: "Personalised Wellness Plans",
    desc: "Covering yoga, Ayurvedic diet and naturopathic practices for home.",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.08)",
  },
  {
    icon: Video,
    title: "Monthly Virtual Consultations",
    desc: "To monitor your progress and fine-tune your plan.",
    color: "hsl(var(--sage))",
    bg: "hsl(var(--maroon-muted) / 0.08)",
  },
  {
    icon: Library,
    title: "A Digital Library",
    desc: "Guided yoga, meditation and pranayama tutorials, available whenever you need them.",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.08)",
  },
  {
    icon: MessageCircle,
    title: "Community & Newsletters",
    desc: "A supportive online community and regular wellness newsletters.",
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.08)",
  },
  {
    icon: Activity,
    title: "Health Monitoring",
    desc: "Simple self-assessment tools backed by expert guidance.",
    color: "hsl(258 50% 35%)",
    bg: "hsl(258 50% 35% / 0.08)",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Express your interest",
    desc: "Fill in the form below and our team will reach out to you.",
  },
  {
    n: 2,
    title: "Enrol in the programme that suits you",
    desc: "Choose between the Maintenance Program and the Early Recovery Program.",
  },
  {
    n: 3,
    title: "Receive your personalised plan",
    desc: "Along with a calendar of scheduled online or in-person sessions.",
  },
  {
    n: 4,
    title: "Stay supported",
    desc: "With monthly follow-ups, progress reviews, and a caring community by your side.",
  },
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

function HeroArtwork() {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

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

      {/* Mandala — right side, desktop only */}
      <div className="hidden md:block absolute right-[-7rem] top-1/2 -translate-y-1/2">
        <motion.svg
          viewBox="0 0 600 600"
          className="w-[34rem] h-[34rem] lg:w-[42rem] lg:h-[42rem]"
          fill="none"
          initial={{ opacity: 0, rotate: -8, scale: 0.94 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {/* Concentric rings */}
          {[275, 232, 189, 146, 103, 60].map((r, i) => (
            <circle
              key={r}
              cx="300"
              cy="300"
              r={r}
              stroke="hsl(51 97% 94%)"
              strokeWidth={i % 2 === 0 ? 1 : 0.6}
              opacity={0.10 - i * 0.008}
            />
          ))}
          {/* Radiating spokes — coordinates rounded so SSR and client markup match exactly */}
          {spokes.map((a) => (
            <line
              key={`s${a}`}
              x1={polar(a, 60).x}
              y1={polar(a, 60).y}
              x2={polar(a, 275).x}
              y2={polar(a, 275).y}
              stroke="hsl(43 89% 60%)"
              strokeWidth="0.5"
              opacity="0.10"
            />
          ))}
          {/* Outer petal ring */}
          {petals.map((a) => (
            <path
              key={`p1${a}`}
              d="M300 300 C 268 236, 268 168, 300 118 C 332 168, 332 236, 300 300 Z"
              transform={`rotate(${a} 300 300)`}
              stroke="hsl(51 97% 94%)"
              strokeWidth="0.9"
              opacity="0.085"
            />
          ))}
          {/* Inner petal ring, counter-rotated */}
          {petals.map((a) => (
            <path
              key={`p2${a}`}
              d="M300 300 C 282 264, 282 226, 300 198 C 318 226, 318 264, 300 300 Z"
              transform={`rotate(${a + 15} 300 300)`}
              stroke="hsl(43 89% 60%)"
              strokeWidth="0.8"
              opacity="0.11"
            />
          ))}
          {/* Lotus buds around the rim */}
          {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => {
            const { x, y } = polar(a, 275);
            return (
              <g key={`b${a}`} transform={`translate(${x} ${y}) rotate(${a + 90}) scale(0.62)`} opacity="0.16">
                <path
                  d="M0 10 C0 10 -10 2 -10 -6 C-10 -12 -5 -16 0 -14 C5 -16 10 -12 10 -6 C10 2 0 10 0 10Z"
                  fill="hsl(43 89% 62%)"
                />
                <path
                  d="M0 10 C0 10 -16 4 -18 -6 C-19 -12 -13 -15 -8 -12 C-6 -11 -3 -6 0 10Z"
                  fill="hsl(51 97% 94%)"
                  opacity="0.55"
                />
                <path
                  d="M0 10 C0 10 16 4 18 -6 C19 -12 13 -15 8 -12 C6 -11 3 -6 0 10Z"
                  fill="hsl(51 97% 94%)"
                  opacity="0.55"
                />
              </g>
            );
          })}
          <circle cx="300" cy="300" r="26" fill="hsl(43 89% 60%)" opacity="0.10" />
        </motion.svg>
      </div>

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
  completedProgram: "", datesOfStay: "", condition: "", mode: "",
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
          A member of our Aftercare team will contact you shortly to discuss the right programme for you.
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
        {text("age", "Age", { max: 10 })}
        {select("gender", "Gender", ["Female", "Male", "Other", "Prefer not to say"])}
        {text("phone", "Contact Number *", { max: 10, placeholder: "10-digit mobile number" })}
        {text("email", "Email Address *")}
        {text("city", "City / Location", { max: 120 })}
        {select("completedProgram", "Programme Completed at Arogyadhama", ["Yes", "No"])}
        {text("datesOfStay", "Approximate Dates of Stay", { max: 120, placeholder: "e.g. March 2026" })}
        {area("condition", "Primary Health Concern / Condition", 2)}
        {select("mode", "Preferred Mode of Sessions", ["Online", "In-person"])}
        {select("program", "Preferred Programme", ["Maintenance Program", "Early Recovery Program"])}
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
            I consent to Arogyadhama contacting me regarding the Aftercare Program and to the use of my
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
export default function AfterCare() {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        className="relative pt-28 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(345 35% 24%) 100%)" }}
      >
        <div
          className="absolute left-0 top-0 h-1 w-full z-10"
          style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }}
        />
        <HeroArtwork />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/plan-your-stay" className="hover:text-gold transition-colors">Plan Your Stay</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Anuvartana</span>
            </nav>

            <div className="inline-block font-body text-xs tracking-[0.3em] uppercase text-gold/80 border border-gold/30 rounded-full px-3 py-1 mb-5">
              Continuing the Journey
            </div>

            <h1
              className="font-display text-cream font-bold"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", lineHeight: 1.05 }}
            >
              Anuvartana
            </h1>
            <p className="font-display text-gold mt-2" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.7rem)" }}>
              The Arogyadhama Aftercare Program
            </p>

            <p className="font-body text-cream/75 mt-6 max-w-2xl leading-relaxed" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
              The journey to lasting wellness continues long after your stay at Arogyadhama. Anuvartana
              keeps you connected to the doctors, therapists and practices that helped you heal — through
              personalised online and in-person support designed around your life.
            </p>

            <div className="flex flex-wrap gap-3 mt-9">
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
          </motion.div>
        </div>
      </section>

      {/* ── Your Healing Doesn't End at Discharge ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Anuvartana</span>
            <h2 className="font-display text-display-md text-forest mt-3 mb-6">
              Your Healing Doesn&rsquo;t End at Discharge<br />
              <em className="not-italic text-gold">It Continues With Us</em>
            </h2>
            <p className="font-quote text-2xl text-forest/80 italic leading-relaxed">
              Anuvartana &mdash; &ldquo;continuing the journey&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Anuvartana ── */}
      <section className="py-20" style={{ background: "hsl(345 15% 97%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Why It Matters</span>
            <h2 className="font-display text-display-md text-forest mt-3">Why Choose Anuvartana</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl border border-border shadow-card p-7 flex gap-4"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, border: `1.5px solid ${item.color}25` }}
                >
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-forest text-lg mb-1.5">{item.title}</h3>
                  <p className="font-body text-sm text-forest/65 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">The Programme</span>
            <h2 className="font-display text-display-md text-forest mt-3">What&rsquo;s Included</h2>
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
                <div className="group flex flex-col h-full bg-white rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                    style={{ background: item.bg }}
                  >
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

      {/* ── Who Can Join ── */}
      <section className="py-16" style={{ background: "hsl(var(--cream-dark))" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="bg-white rounded-3xl border border-border shadow-card p-8 md:p-11 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-5"
              style={{ background: "hsl(var(--maroon) / 0.08)" }}
            >
              <HeartHandshake size={24} style={{ color: "hsl(var(--forest))" }} />
            </div>
            <h2 className="font-display font-bold text-forest text-2xl md:text-3xl mb-4">Who Can Join</h2>
            <p className="font-body text-forest/65 leading-relaxed max-w-2xl mx-auto">
              The Aftercare Program is open to anyone who has completed a yoga therapy or wellness programme
              at Arogyadhama and wishes to sustain their progress with continued expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20" style={{ background: "hsl(345 15% 97%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Getting Started</span>
            <h2 className="font-display text-display-md text-forest mt-3">How It Works</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-px hidden sm:block" style={{ background: "hsl(var(--border))" }} />
            <div className="space-y-5">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  className="relative flex gap-5 items-start bg-white rounded-2xl border border-border shadow-card p-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-display font-bold text-xl"
                    style={{ background: "hsl(var(--maroon))", color: "hsl(var(--cream))" }}
                  >
                    {s.n}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display font-bold text-forest text-lg mb-1">{s.title}</h3>
                    <p className="font-body text-sm text-forest/65 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Register Your Interest ── */}
      <section id="register" className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Expression of Interest</span>
            <h2 className="font-display text-display-md text-forest mt-3 mb-4">Register Your Interest</h2>
            <p className="font-body text-sage max-w-xl mx-auto leading-relaxed">
              Ready to continue your wellness journey? Complete the form below and a member of our Aftercare
              team will contact you to discuss the right programme for you.
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">How to Reach Us</h2>
            <p className="font-body text-cream/70 mb-8">
              Prefer to speak with us directly? Our Aftercare team is happy to help.
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
            <p className="font-quote text-xl text-cream/70 italic mt-10 leading-relaxed">
              Arogyadhama &mdash; where recovery is an ongoing journey, and so is our care.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
