"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ACCOMMODATION_PHOTOS } from "@/lib/accommodation-photos";
import {
  ChevronRight, ChevronLeft,
  CheckCircle2, Phone, Send
} from "lucide-react";

/* ── Types ── */
type Gender = "male" | "female" | "other" | "";

// Booking type is fixed to IPD — the type chooser was removed, but the booking
// API still requires a valid type and the ERPNext mapping keys off it.
const BOOKING_TYPE = "ipd";

interface PersonalDetails { name: string; age: string; gender: Gender; phone: string; email: string; city: string; }
interface MedicalDetails { condition: string; }
interface StayDetails { preferredDate: string; weeks: string; roomPreference: string; }

// usd = weekly price (used for the live currency conversion on the card); pp = per person.
// `inr` is the official chart rate (per person, per week); `label` is the value
// stored/submitted. `slug` also indexes ACCOMMODATION_PHOTOS — note the Double
// Deluxe card is the semi-deluxe room, hence that slug.
const ROOM_OPTIONS = [
  { slug: "dormitory", name: "Dormitory", sub: "Pushpa / Ashwini Ward", inr: 6600, pp: false, label: "Dormitory (Pushpa/Ashwini) — from ₹6,600/week" },
  { slug: "ashirwad", name: "Single Room", sub: "Ashirwad Block", inr: 13200, pp: false, label: "Single Room (Ashirwad) — from ₹13,200/week" },
  { slug: "maitri", name: "Double Sharing", sub: "Maitri Block", inr: 11000, pp: true, label: "Double Sharing (Maitri) — from ₹11,000/week per person" },
  { slug: "sheshadri", name: "Single Deluxe", sub: "Anugraha", inr: 27500, pp: false, label: "Single Deluxe (Anugraha) — from ₹27,500/week" },
  { slug: "semi-deluxe", name: "Semi Deluxe", sub: "Anugraha", inr: 17600, pp: true, label: "Semi Deluxe (Anugraha) — from ₹17,600/week per person" },
  { slug: "suites", name: "Suite Sharing", sub: "Premium Block", inr: 30800, pp: true, label: "Suite Sharing — from ₹30,800/week per person" },
];

// Room prices are the official INR chart; USD is derived from a live daily rate.
type Currency = "USD" | "INR";
const FALLBACK_RATE = 90; // used only before the live rate loads / if the source is down
function fmtPrice(inr: number, currency: Currency, rate: number | null) {
  return currency === "INR"
    ? "₹" + inr.toLocaleString("en-IN")
    : "$" + Math.round(inr / (rate ?? FALLBACK_RATE)).toLocaleString("en-US"); // 6,600 ÷ 95 → $69
}

const STEP_TITLES = ["Personal Details", "Stay Details", "Confirm"];

/* ── Validators (mirror app/api/booking/route.ts) ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (v: string) => EMAIL_RE.test(v.trim());
const isValidPhone = (v: string) => v.replace(/\D/g, "").length === 10;

/* ── Helpers ── */
function Label({ children }: { children: React.ReactNode }) {
  return <label className="block font-body text-xs font-semibold uppercase tracking-widest text-sage mb-1.5">{children}</label>;
}
function Input({ value, onChange, placeholder, type = "text", maxLength = 255, required = false, invalid = false }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; maxLength?: number; required?: boolean; invalid?: boolean;
}) {
  return (
    <input
      type={type} value={value} placeholder={placeholder} maxLength={maxLength} required={required}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-forest outline-none transition-colors bg-white ${invalid ? "border-red-400 focus:border-red-500" : "border-border focus:border-gold"}`}
    />
  );
}
function Textarea({ value, onChange, placeholder, maxLength = 1000 }: { value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number }) {
  return (
    <div>
      <textarea value={value} placeholder={placeholder} maxLength={maxLength} rows={3}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-border font-body text-sm text-forest outline-none focus:border-gold transition-colors resize-none bg-white"
      />
      <div className="text-right font-body text-xs text-sage mt-0.5">{value.length}/{maxLength}</div>
    </div>
  );
}

/* ── Steps ── */
function StepTwo({ data, onChange }: { data: PersonalDetails; onChange: (d: PersonalDetails) => void }) {
  function set<K extends keyof PersonalDetails>(k: K, v: PersonalDetails[K]) { onChange({ ...data, [k]: v }); }
  const phoneInvalid = data.phone.length > 0 && !isValidPhone(data.phone);
  const emailInvalid = data.email.length > 0 && !isValidEmail(data.email);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="sm:col-span-2"><Label>Full Name *</Label><Input value={data.name} onChange={(v) => set("name", v)} required /></div>
      <div><Label>Age *</Label><Input value={data.age} onChange={(v) => set("age", v)} type="number" maxLength={3} required /></div>
      <div>
        <Label>Gender *</Label>
        <select value={data.gender} onChange={(e) => set("gender", e.target.value as Gender)}
          className="w-full px-4 py-3 rounded-xl border border-border font-body text-sm text-forest outline-none focus:border-gold transition-colors bg-white">
          <option value="">Select…</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <Label>Phone Number *</Label>
        <Input value={data.phone} onChange={(v) => set("phone", v.replace(/\D/g, "").slice(0, 10))} type="tel" maxLength={10} required invalid={phoneInvalid} />
        {phoneInvalid && <p className="mt-1 font-body text-xs text-red-500">Enter a valid 10-digit phone number.</p>}
      </div>
      <div>
        <Label>Email Address *</Label>
        <Input value={data.email} onChange={(v) => set("email", v)} type="email" required invalid={emailInvalid} />
        {emailInvalid && <p className="mt-1 font-body text-xs text-red-500">Enter a valid email address.</p>}
      </div>
      <div className="sm:col-span-2"><Label>City / Country *</Label><Input value={data.city} onChange={(v) => set("city", v)} required /></div>
    </div>
  );
}

function StepThree({ data, onChange }: { data: MedicalDetails; onChange: (d: MedicalDetails) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Reason for Visit *</Label>
        <Textarea
          value={data.condition}
          onChange={(v) => onChange({ condition: v })}
          placeholder="Describe the reason for your visit — your condition, symptoms, or what you'd like help with…"
        />
      </div>
    </div>
  );
}

// Thumbnail that cross-fades through a room's photos while the card is hovered.
function RoomThumb({ photos, alt, active }: { photos: string[]; alt: string; active: boolean }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active || photos.length <= 1) { setIdx(0); return; }
    const id = setInterval(() => setIdx((i) => (i + 1) % photos.length), 900);
    return () => clearInterval(id);
  }, [active, photos.length]);

  return (
    <div className="relative h-28 w-36 flex-shrink-0 overflow-hidden rounded-lg bg-maroon/5">
      {photos.map((p, i) => (
        <img
          key={p}
          src={p}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
          style={{ opacity: i === idx ? 1 : 0, transform: active ? "scale(1.15)" : "scale(1)" }}
        />
      ))}
    </div>
  );
}

function StepFour({ data, onChange, currency, setCurrency, rate }: {
  data: StayDetails; onChange: (d: StayDetails) => void;
  currency: Currency; setCurrency: (c: Currency) => void; rate: number | null;
}) {
  function set<K extends keyof StayDetails>(k: K, v: string) { onChange({ ...data, [k]: v }); }
  const [hovered, setHovered] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-5">
      <div>
        <Label>Preferred Admission Date (Tuesdays preferred)</Label>
        <Input value={data.preferredDate} onChange={(v) => set("preferredDate", v)} type="date" />
        <p className="font-body text-xs text-sage mt-1">IPD admissions are on Tuesdays. Minimum 6-night stay required.</p>
      </div>
      <div>
        <div className="flex items-center justify-between gap-3 flex-wrap mb-1.5">
          <Label>Preferred Duration</Label>
          {/* Currency selector — converts the room-preference card prices below */}
          <label className="flex items-center gap-2 font-body text-xs text-forest/70">
            {currency === "USD" && (
              <span className="hidden sm:inline text-sage">
                1 USD = ₹{(rate ?? FALLBACK_RATE).toLocaleString("en-IN", { maximumFractionDigits: 2 })}{rate ? "" : " (approx.)"}
              </span>
            )}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              aria-label="Display currency"
              className="rounded-lg border border-border bg-white px-2.5 py-1.5 font-body text-xs font-semibold text-forest focus:outline-none focus:ring-2 focus:ring-maroon/30 cursor-pointer"
            >
              <option value="USD">$ US Dollar</option>
              <option value="INR">₹ Indian Rupee</option>
            </select>
          </label>
        </div>
        <div className="flex gap-3 flex-wrap">
          {["1 Week", "2 Weeks", "3 Weeks", "4 Weeks"].map((w) => (
            <button key={w} onClick={() => set("weeks", w)}
              className="px-5 py-2.5 rounded-xl border-2 font-body text-sm transition-all"
              style={{
                borderColor: data.weeks === w ? "hsl(var(--maroon))" : "hsl(var(--border))",
                background: data.weeks === w ? "hsl(var(--maroon))" : "white",
                color: data.weeks === w ? "hsl(var(--cream))" : "hsl(var(--maroon))",
                fontWeight: data.weeks === w ? "600" : "400",
              }}>
              {w}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Room Preference</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ROOM_OPTIONS.map((r) => {
            const selected = data.roomPreference === r.label;
            return (
              <button
                key={r.slug}
                type="button"
                onClick={() => set("roomPreference", r.label)}
                onMouseEnter={() => setHovered(r.slug)}
                onMouseLeave={() => setHovered((h) => (h === r.slug ? null : h))}
                className="relative flex gap-4 items-center text-left rounded-xl border-2 p-3.5 bg-white transition-all duration-200 hover:shadow-card-hover"
                style={{ borderColor: selected ? "hsl(var(--gold))" : "hsl(var(--border))" }}
              >
                <RoomThumb photos={ACCOMMODATION_PHOTOS[r.slug] || []} alt={r.name} active={hovered === r.slug} />
                <div className="min-w-0 flex-1">
                  <div className="font-display font-semibold text-forest text-sm leading-tight">{r.name}</div>
                  <div className="font-body text-[11px] text-sage leading-tight">{r.sub}</div>
                  <div className="font-body text-xs font-semibold text-gold mt-1">{fmtPrice(r.inr, currency, rate)} / week{r.pp ? " · pp" : ""}</div>
                </div>
                {selected && <CheckCircle2 size={18} className="absolute top-2 right-2 text-gold" />}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => set("roomPreference", "No preference")}
            className="rounded-xl border-2 p-3 text-left bg-white transition-all hover:shadow-card"
            style={{ borderColor: data.roomPreference === "No preference" ? "hsl(var(--gold))" : "hsl(var(--border))" }}
          >
            <div className="font-display font-semibold text-forest text-sm">No preference</div>
            <div className="font-body text-[11px] text-sage mt-0.5">Let our team recommend the best room for you</div>
          </button>
        </div>
        <p className="font-body text-xs text-sage mt-2">Tap a room to select it. Photos and full details are on the Accommodation page. Room allocation is subject to availability at confirmation.</p>
      </div>
    </div>
  );
}

function StepFive({ personal, medical, stay, currency, rate }: {
  personal: PersonalDetails; medical: MedicalDetails; stay: StayDetails;
  currency: Currency; rate: number | null;
}) {
  // Show the room-preference price in the currency chosen on the Stay Details step.
  const room = ROOM_OPTIONS.find((o) => o.label === stay.roomPreference);
  const roomPreferenceDisplay = room
    ? `${room.label.split(" — from ")[0]} — from ${fmtPrice(room.inr, currency, rate)}/week${room.pp ? " per person" : ""}`
    : stay.roomPreference; // e.g. "No preference"

  const rows = [
    { label: "Name", value: personal.name },
    { label: "Age / Gender", value: `${personal.age} / ${personal.gender}` },
    { label: "Phone", value: personal.phone },
    { label: "Email", value: personal.email },
    { label: "City / Country", value: personal.city },
    { label: "Reason for Visit", value: medical.condition },
    { label: "Preferred Date", value: stay.preferredDate },
    { label: "Duration", value: stay.weeks },
    { label: "Room Preference", value: roomPreferenceDisplay },
  ].filter((r) => r.value);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="p-4 font-body text-xs font-semibold uppercase tracking-widest text-gold border-b border-border"
          style={{ background: "hsl(var(--maroon) / 0.04)" }}>
          Booking Summary
        </div>
        <div className="divide-y divide-border">
          {rows.map((r) => (
            <div key={r.label} className="flex gap-4 px-5 py-3">
              <span className="font-body text-xs text-sage w-36 flex-shrink-0">{r.label}</span>
              <span className="font-body text-sm text-forest font-medium">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl p-5 border border-gold/25" style={{ background: "hsl(var(--gold) / 0.06)" }}>
        <div className="flex items-start gap-3">
          <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="font-body text-sm text-forest/75 leading-relaxed">
            We have received your request and are processing your reservation. Expect a confirmation shortly!
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Progress Bar ── */
function ProgressBar({ current }: { current: number }) {
  const steps = STEP_TITLES;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-center gap-0">
        {steps.map((title, i) => {
          const isDone = i < current;
          const isActive = i === current;
          return (
            <div key={title} className="flex items-center">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold transition-all duration-300"
                  style={{
                    background: isDone || isActive ? "hsl(var(--maroon))" : "white",
                    color: isDone || isActive ? "hsl(var(--cream))" : "hsl(var(--maroon) / 0.4)",
                    border: isDone || isActive ? "none" : "2px solid hsl(var(--border))",
                  }}>
                  {isDone ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <div className="font-body text-[10px] mt-1 text-center hidden sm:block whitespace-nowrap"
                  style={{ color: isActive ? "hsl(var(--maroon))" : "hsl(var(--maroon-muted))", fontWeight: isActive ? "600" : "400" }}>
                  {title}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="h-0.5 w-10 sm:w-16 mx-2 transition-all duration-300"
                  style={{ background: isDone ? "hsl(var(--maroon))" : "hsl(var(--border))" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function BookNow() {
  // Steps (0-indexed): 0 Personal (incl. Reason for Visit) · 1 Stay Details · 2 Confirm
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState<PersonalDetails>({ name: "", age: "", gender: "", phone: "", email: "", city: "" });
  const [medical, setMedical] = useState<MedicalDetails>({ condition: "" });
  const [stay, setStay] = useState<StayDetails>({ preferredDate: "", weeks: "", roomPreference: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Currency lives here (not inside StepFour) so the choice persists to the Confirm step.
  const [currency, setCurrency] = useState<Currency>("INR"); // INR is the official chart figure
  const [rate, setRate] = useState<number | null>(null); // live USD -> INR, null until fetched

  // Fetch today's USD -> INR rate once on mount (cached daily server-side).
  useEffect(() => {
    let active = true;
    fetch("/api/exchange-rate")
      .then((r) => r.json())
      .then((d) => {
        if (active && typeof d?.rate === "number" && d.rate > 0) setRate(d.rate);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const CONFIRM_STEP = STEP_TITLES.length - 1; // 3

  function canProceed() {
    if (step === 0) return !!(personal.name.trim() && personal.age && personal.gender && isValidPhone(personal.phone) && isValidEmail(personal.email) && personal.city.trim() && medical.condition.trim());
    return true;
  }

  function nextStep() {
    if (!canProceed()) return;
    setStep((s) => Math.min(s + 1, CONFIRM_STEP));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingType: BOOKING_TYPE,
          ...personal,
          ...medical,
          ...stay,
        }),
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

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(345 35% 24%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Book Now</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              Begin Your Healing Journey
            </h1>
            <p className="font-body text-cream/70 mt-4 max-w-lg">
              Complete the form below and our team will contact you shortly to confirm and discuss your personalised treatment plan.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a href="tel:+919972871777" className="flex items-center gap-2 font-body text-cream/80 text-sm hover:text-gold transition-colors">
                <Phone size={14} /> IPD: 997-287-1777 / 961-134-4691
              </a>
              <a href="tel:+919972871777" className="flex items-center gap-2 font-body text-cream/80 text-sm hover:text-gold transition-colors">
                <Phone size={14} /> OPD/Virtual: 997-287-1777 / 961-134-4691
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {submitted ? (
          <motion.div className="text-center py-16" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "hsl(var(--maroon) / 0.1)" }}>
              <CheckCircle2 size={40} className="text-gold" />
            </div>
            <h2 className="font-display font-bold text-forest text-3xl mb-3">Request Submitted!</h2>
            <p className="font-body text-sage max-w-md mx-auto leading-relaxed">
              Thank you. Our team will contact you shortly to confirm your booking and discuss your personalised treatment plan.
            </p>
            <Link to="/" className="inline-block mt-8 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-colors"
              style={{ background: "hsl(var(--maroon))", color: "hsl(var(--cream))" }}>
              Return to Home
            </Link>
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl border border-border shadow-card-hover p-8">
            <ProgressBar current={step} />

            <AnimatePresence mode="wait">
              <motion.div key={step}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>

                {/* Step heading */}
                <div className="mb-6">
                  <div className="w-6 h-0.5 rounded mb-2" style={{ background: "hsl(var(--gold))" }} />
                  <h2 className="font-display font-bold text-forest text-2xl">
                    {step === 0 && "Your Personal Details"}
                    {step === 1 && "Plan Your Inpatient Stay"}
                    {step === 2 && "Review & Confirm"}
                  </h2>
                </div>

                {step === 0 && (
                  <div className="space-y-6">
                    <StepTwo data={personal} onChange={setPersonal} />
                    <StepThree data={medical} onChange={setMedical} />
                  </div>
                )}
                {step === 1 && <StepFour data={stay} onChange={setStay} currency={currency} setCurrency={setCurrency} rate={rate} />}
                {step === 2 && <StepFive personal={personal} medical={medical} stay={stay} currency={currency} rate={rate} />}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {step > 0 ? (
                <button onClick={prevStep}
                  className="flex items-center gap-2 font-body text-sm font-semibold text-forest/60 hover:text-forest transition-colors">
                  <ChevronLeft size={16} /> Back
                </button>
              ) : <div />}

              {step < CONFIRM_STEP ? (
                <button onClick={nextStep} disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all"
                  style={{
                    background: canProceed() ? "hsl(var(--maroon))" : "hsl(var(--border))",
                    color: canProceed() ? "hsl(var(--cream))" : "hsl(var(--maroon-muted))",
                    cursor: canProceed() ? "pointer" : "not-allowed",
                  }}>
                  {step === 1 ? "Review Booking" : "Next Step"} <ChevronRight size={16} />
                </button>
              ) : (
                <div className="flex flex-col items-end gap-2">
                  {submitError && (
                    <p className="font-body text-xs text-red-500 max-w-xs text-right">{submitError}</p>
                  )}
                  <button onClick={handleSubmit} disabled={submitting}
                    className="flex items-center gap-2 px-7 py-3 rounded-xl font-body font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "hsl(var(--gold))", color: "hsl(var(--forest-dark))" }}>
                    {submitting ? (
                      <><span className="w-4 h-4 border-2 border-maroon-dark/30 border-t-forest-dark rounded-full animate-spin" /> Submitting…</>
                    ) : (
                      <><Send size={15} /> Submit Booking Request</>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Help note */}
        <div className="text-center mt-8">
          <p className="font-body text-sage text-sm">
            Prefer to speak with someone?{" "}
            <a href="tel:+919972871777" className="text-forest font-semibold hover:text-gold transition-colors">Call 997-287-1777 / 961-134-4691</a>
            {" "}(IPD) or{" "}
            <a href="tel:+919972871777" className="text-forest font-semibold hover:text-gold transition-colors">997-287-1777 / 961-134-4691</a>
            {" "}(OPD/Virtual)
          </p>
        </div>
      </div>
    </Layout>
  );
}