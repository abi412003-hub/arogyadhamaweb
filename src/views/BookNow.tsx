"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ACCOMMODATION_PHOTOS } from "@/lib/accommodation-photos";
import {
  ChevronRight, ChevronLeft, Building2, Stethoscope, Video,
  CheckCircle2, User, Phone, Calendar, BedDouble, ClipboardList, Send
} from "lucide-react";

/* ── Types ── */
type BookingType = "ipd" | "opd" | "virtual" | null;
type Gender = "male" | "female" | "other" | "";

interface PersonalDetails { name: string; age: string; gender: Gender; phone: string; email: string; city: string; }
interface MedicalDetails { condition: string; duration: string; previousTreatments: string; medications: string; }
interface StayDetails { preferredDate: string; weeks: string; roomPreference: string; }

const ROOM_OPTIONS = [
  { slug: "dormitory", name: "Dormitory", sub: "Pushpa / Ashwini Ward", price: "₹6,600 / week", label: "Dormitory (Pushpa/Ashwini) — from ₹6,600/week" },
  { slug: "ashirwad", name: "Single Room", sub: "Ashirwad Block", price: "₹13,200 / week", label: "Single Room (Ashirwad) — from ₹13,200/week" },
  { slug: "maitri", name: "Double Sharing", sub: "Maitri Block", price: "₹11,000 / week · pp", label: "Double Sharing (Maitri) — from ₹11,000/week per person" },
  { slug: "sheshadri", name: "Single Deluxe", sub: "Sheshadri Bhavan", price: "₹27,500 / week", label: "Single Deluxe (Sheshadri Bhavan) — from ₹27,500/week" },
  { slug: "semi-deluxe", name: "Double Deluxe", sub: "Sheshadri Bhavan", price: "₹22,000 / week · pp", label: "Double Deluxe (Sheshadri Bhavan) — from ₹22,000/week per person" },
  { slug: "suites", name: "Suite Sharing", sub: "Premium Block", price: "₹30,800 / week · pp", label: "Suite Sharing — from ₹30,800/week per person" },
];

const STEP_TITLES = ["Choose Type", "Personal Details", "Medical Details", "Stay Details", "Confirm"];

/* ── Helpers ── */
function Label({ children }: { children: React.ReactNode }) {
  return <label className="block font-body text-xs font-semibold uppercase tracking-widest text-sage mb-1.5">{children}</label>;
}
function Input({ value, onChange, placeholder, type = "text", maxLength = 255, required = false }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; maxLength?: number; required?: boolean;
}) {
  return (
    <input
      type={type} value={value} placeholder={placeholder} maxLength={maxLength} required={required}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl border border-border font-body text-sm text-forest outline-none focus:border-gold transition-colors bg-white"
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
function StepOne({ selected, onSelect }: { selected: BookingType; onSelect: (t: BookingType) => void }) {
  const types = [
    { key: "ipd" as const, icon: Building2, title: "IPD — Inpatient", subtitle: "Residential healing programme", desc: "Stay at Prashanti Kutiram for 1–4 weeks. Includes accommodation, meals, daily yoga, medical consultations, and personalised therapy protocol.", color: "hsl(var(--forest))", bg: "hsl(var(--forest) / 0.06)" },
    { key: "opd" as const, icon: Stethoscope, title: "OPD — Outpatient", subtitle: "Day visit consultations", desc: "Visit for OPD consultations without residential stay. Morning hours: 10:30 AM – 12:00 PM & 2:00 PM – 3:30 PM.", color: "hsl(var(--gold))", bg: "hsl(var(--gold) / 0.06)" },
    { key: "virtual" as const, icon: Video, title: "Virtual Consultation", subtitle: "Online with our doctors", desc: "Speak with Arogyadhama's integrative physicians from anywhere in the world. By appointment via 997-287-1777.", color: "hsl(200 55% 35%)", bg: "hsl(200 55% 35% / 0.06)" },
  ];
  return (
    <div className="space-y-4">
      {types.map((t) => (
        <button key={t.key} onClick={() => onSelect(t.key)}
          className="w-full text-left rounded-2xl border-2 p-6 flex gap-5 items-start transition-all duration-200 hover:shadow-card"
          style={{
            borderColor: selected === t.key ? t.color : "hsl(var(--border))",
            background: selected === t.key ? t.bg : "white",
          }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: t.bg }}>
            <t.icon size={22} style={{ color: t.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-forest text-lg leading-tight">{t.title}</div>
            <div className="font-body text-xs font-semibold uppercase tracking-widest mt-0.5 mb-2" style={{ color: t.color }}>{t.subtitle}</div>
            <p className="font-body text-forest/60 text-sm leading-relaxed">{t.desc}</p>
          </div>
          {selected === t.key && <CheckCircle2 size={20} className="flex-shrink-0 mt-1" style={{ color: t.color }} />}
        </button>
      ))}
    </div>
  );
}

function StepTwo({ data, onChange }: { data: PersonalDetails; onChange: (d: PersonalDetails) => void }) {
  function set<K extends keyof PersonalDetails>(k: K, v: PersonalDetails[K]) { onChange({ ...data, [k]: v }); }
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
      <div><Label>Phone Number *</Label><Input value={data.phone} onChange={(v) => set("phone", v)} type="tel" maxLength={20} required /></div>
      <div><Label>Email Address *</Label><Input value={data.email} onChange={(v) => set("email", v)} type="email" required /></div>
      <div className="sm:col-span-2"><Label>City / Country *</Label><Input value={data.city} onChange={(v) => set("city", v)} required /></div>
    </div>
  );
}

function StepThree({ data, onChange }: { data: MedicalDetails; onChange: (d: MedicalDetails) => void }) {
  function set<K extends keyof MedicalDetails>(k: K, v: string) { onChange({ ...data, [k]: v }); }
  return (
    <div className="space-y-5">
      <div>
        <Label>Primary Condition / Reason for Visit *</Label>
        <Input value={data.condition} onChange={(v) => set("condition", v)} placeholder="e.g. Diabetes, Chronic Back Pain, Anxiety…" required />
      </div>
      <div>
        <Label>Duration of Illness</Label>
        <Input value={data.duration} onChange={(v) => set("duration", v)} placeholder="e.g. 2 years, since 2018…" />
      </div>
      <div>
        <Label>Previous Treatments / Surgeries</Label>
        <Textarea value={data.previousTreatments} onChange={(v) => set("previousTreatments", v)} placeholder="Briefly describe any previous treatments, medications, surgeries…" />
      </div>
      <div>
        <Label>Current Medications</Label>
        <Textarea value={data.medications} onChange={(v) => set("medications", v)} placeholder="List any medications you are currently taking…" />
      </div>
    </div>
  );
}

function StepFour({ data, onChange }: { data: StayDetails; onChange: (d: StayDetails) => void }) {
  function set<K extends keyof StayDetails>(k: K, v: string) { onChange({ ...data, [k]: v }); }
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="space-y-5">
      <div>
        <Label>Preferred Admission Date (Tuesdays preferred)</Label>
        <Input value={data.preferredDate} onChange={(v) => set("preferredDate", v)} type="date" />
        <p className="font-body text-xs text-sage mt-1">IPD admissions are on Tuesdays. Minimum 6-night stay required.</p>
      </div>
      <div>
        <Label>Preferred Duration</Label>
        <div className="flex gap-3 flex-wrap">
          {["1 Week", "2 Weeks", "3 Weeks", "4 Weeks"].map((w) => (
            <button key={w} onClick={() => set("weeks", w)}
              className="px-5 py-2.5 rounded-xl border-2 font-body text-sm transition-all"
              style={{
                borderColor: data.weeks === w ? "hsl(var(--forest))" : "hsl(var(--border))",
                background: data.weeks === w ? "hsl(var(--forest))" : "white",
                color: data.weeks === w ? "hsl(var(--cream))" : "hsl(var(--forest))",
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
            const photo = ACCOMMODATION_PHOTOS[r.slug]?.[0];
            return (
              <button
                key={r.slug}
                type="button"
                onClick={() => set("roomPreference", r.label)}
                className="relative flex gap-3 text-left rounded-xl border-2 p-2.5 bg-white transition-all hover:shadow-card"
                style={{ borderColor: selected ? "hsl(var(--gold))" : "hsl(var(--border))" }}
              >
                <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-forest/5">
                  {photo && <img src={photo} alt={r.name} className="h-full w-full object-cover" loading="lazy" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-semibold text-forest text-sm leading-tight">{r.name}</div>
                  <div className="font-body text-[11px] text-sage leading-tight">{r.sub}</div>
                  <div className="font-body text-xs font-semibold text-gold mt-1">{r.price}</div>
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

function StepFive({ bookingType, personal, medical, stay }: {
  bookingType: BookingType; personal: PersonalDetails; medical: MedicalDetails; stay: StayDetails;
}) {
  const label: Record<string, string> = { ipd: "IPD — Inpatient", opd: "OPD — Outpatient", virtual: "Virtual Consultation" };
  const rows = [
    { label: "Booking Type", value: bookingType ? label[bookingType] : "" },
    { label: "Name", value: personal.name },
    { label: "Age / Gender", value: `${personal.age} / ${personal.gender}` },
    { label: "Phone", value: personal.phone },
    { label: "Email", value: personal.email },
    { label: "City / Country", value: personal.city },
    { label: "Primary Condition", value: medical.condition },
    ...(bookingType === "ipd" ? [
      { label: "Preferred Date", value: stay.preferredDate },
      { label: "Duration", value: stay.weeks },
      { label: "Room Preference", value: stay.roomPreference },
    ] : []),
  ].filter((r) => r.value);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="p-4 font-body text-xs font-semibold uppercase tracking-widest text-gold border-b border-border"
          style={{ background: "hsl(var(--forest) / 0.04)" }}>
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
            Our team will contact you within <strong className="text-forest">24 hours</strong> to confirm your booking and discuss your personalised treatment plan. For urgent enquiries, call <a href="tel:+919972871777" className="text-gold font-semibold hover:underline">997-287-1777</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Progress Bar ── */
function ProgressBar({ current, total, bookingType }: { current: number; total: number; bookingType: BookingType }) {
  const steps = bookingType === "ipd"
    ? STEP_TITLES
    : STEP_TITLES.filter((_, i) => i !== 3);
  const totalSteps = steps.length;
  const currentStep = bookingType === "ipd" ? current : (current >= 4 ? current - 1 : current);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-0">
        {steps.map((title, i) => {
          const stepNum = bookingType === "ipd" ? i + 1 : (i >= 3 ? i + 2 : i + 1);
          const isDone = stepNum < current + 1;
          const isActive = stepNum === current + 1 || (bookingType !== "ipd" && stepNum === 5 && current === 4);
          return (
            <div key={title} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold transition-all duration-300"
                  style={{
                    background: isDone || isActive ? "hsl(var(--forest))" : "white",
                    color: isDone || isActive ? "hsl(var(--cream))" : "hsl(var(--forest) / 0.4)",
                    border: isDone || isActive ? "none" : "2px solid hsl(var(--border))",
                  }}>
                  {isDone ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <div className="font-body text-[10px] mt-1 text-center hidden sm:block whitespace-nowrap"
                  style={{ color: isActive ? "hsl(var(--forest))" : "hsl(var(--sage))", fontWeight: isActive ? "600" : "400" }}>
                  {title}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="h-0.5 flex-1 mx-1 transition-all duration-300"
                  style={{ background: isDone ? "hsl(var(--forest))" : "hsl(var(--border))" }} />
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
  const [step, setStep] = useState(0); // 0-indexed
  const [bookingType, setBookingType] = useState<BookingType>(null);
  const [personal, setPersonal] = useState<PersonalDetails>({ name: "", age: "", gender: "", phone: "", email: "", city: "" });
  const [medical, setMedical] = useState<MedicalDetails>({ condition: "", duration: "", previousTreatments: "", medications: "" });
  const [stay, setStay] = useState<StayDetails>({ preferredDate: "", weeks: "", roomPreference: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const maxStep = bookingType === "ipd" ? 4 : 3; // last step index (confirm)

  // For non-IPD, step 3 = Medical, step 4 = Confirm (skip Stay)
  const displayStep = step; // 0=type,1=personal,2=medical,3=stay(IPD only)/confirm,4=confirm(IPD)

  function canProceed() {
    if (step === 0) return !!bookingType;
    if (step === 1) return !!(personal.name.trim() && personal.age && personal.gender && personal.phone.trim() && personal.email.trim() && personal.city.trim());
    if (step === 2) return !!medical.condition.trim();
    return true;
  }

  function nextStep() {
    if (step === 0 && !bookingType) return;
    if (bookingType !== "ipd" && step === 2) { setStep(4); return; } // skip stay details
    setStep((s) => Math.min(s + 1, 4));
  }

  function prevStep() {
    if (bookingType !== "ipd" && step === 4) { setStep(2); return; }
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
          bookingType,
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

  const isConfirmStep = step === 4 || (bookingType !== "ipd" && step === 4);
  const isStayStep = step === 3 && bookingType === "ipd";

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 60%, hsl(168 35% 24%) 100%)" }}>
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
              Complete the form below and our team will contact you within 24 hours to confirm and discuss your personalised treatment plan.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a href="tel:+919972871777" className="flex items-center gap-2 font-body text-cream/80 text-sm hover:text-gold transition-colors">
                <Phone size={14} /> IPD: 997-287-1777
              </a>
              <a href="tel:+919880598017" className="flex items-center gap-2 font-body text-cream/80 text-sm hover:text-gold transition-colors">
                <Phone size={14} /> OPD/Virtual: 988-059-8017
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {submitted ? (
          <motion.div className="text-center py-16" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "hsl(var(--forest) / 0.1)" }}>
              <CheckCircle2 size={40} className="text-gold" />
            </div>
            <h2 className="font-display font-bold text-forest text-3xl mb-3">Request Submitted!</h2>
            <p className="font-body text-sage max-w-sm mx-auto mb-4 leading-relaxed">
              Thank you. Our team will contact you within <strong className="text-forest">24 hours</strong> to confirm your booking and discuss your personalised treatment plan.
            </p>
            <p className="font-body text-sm text-sage">For urgent enquiries, please call us directly:</p>
            <div className="flex justify-center gap-4 mt-3">
              <a href="tel:+919972871777" className="font-body font-semibold text-forest hover:text-gold transition-colors">997-287-1777</a>
              <a href="tel:+919880598017" className="font-body font-semibold text-forest hover:text-gold transition-colors">988-059-8017</a>
            </div>
            <Link to="/" className="inline-block mt-8 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-colors"
              style={{ background: "hsl(var(--forest))", color: "hsl(var(--cream))" }}>
              Return to Home
            </Link>
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl border border-border shadow-card-hover p-8">
            <ProgressBar current={step} total={5} bookingType={bookingType} />

            <AnimatePresence mode="wait">
              <motion.div key={step}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>

                {/* Step heading */}
                <div className="mb-6">
                  <div className="w-6 h-0.5 rounded mb-2" style={{ background: "hsl(var(--gold))" }} />
                  <h2 className="font-display font-bold text-forest text-2xl">
                    {step === 0 && "What type of consultation are you looking for?"}
                    {step === 1 && "Your Personal Details"}
                    {step === 2 && "About Your Health"}
                    {step === 3 && bookingType === "ipd" && "Plan Your Inpatient Stay"}
                    {(step === 4 || (step === 3 && bookingType !== "ipd")) && "Review & Confirm"}
                  </h2>
                </div>

                {step === 0 && <StepOne selected={bookingType} onSelect={setBookingType} />}
                {step === 1 && <StepTwo data={personal} onChange={setPersonal} />}
                {step === 2 && <StepThree data={medical} onChange={setMedical} />}
                {step === 3 && bookingType === "ipd" && <StepFour data={stay} onChange={setStay} />}
                {(step === 4 || (step === 3 && bookingType !== "ipd" && false)) && (
                  <StepFive bookingType={bookingType} personal={personal} medical={medical} stay={stay} />
                )}
                {/* Non-IPD confirm */}
                {step === 4 && bookingType !== "ipd" && (
                  <StepFive bookingType={bookingType} personal={personal} medical={medical} stay={stay} />
                )}
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

              {step < 4 && !(bookingType !== "ipd" && step === 4) ? (
                <button onClick={nextStep} disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all"
                  style={{
                    background: canProceed() ? "hsl(var(--forest))" : "hsl(var(--border))",
                    color: canProceed() ? "hsl(var(--cream))" : "hsl(var(--sage))",
                    cursor: canProceed() ? "pointer" : "not-allowed",
                  }}>
                  {step === 0 ? "Continue" : step === 3 ? "Review Booking" : "Next Step"} <ChevronRight size={16} />
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
                      <><span className="w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" /> Submitting…</>
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
            <a href="tel:+919972871777" className="text-forest font-semibold hover:text-gold transition-colors">Call 997-287-1777</a>
            {" "}(IPD) or{" "}
            <a href="tel:+919880598017" className="text-forest font-semibold hover:text-gold transition-colors">988-059-8017</a>
            {" "}(OPD/Virtual)
          </p>
        </div>
      </div>
    </Layout>
  );
}