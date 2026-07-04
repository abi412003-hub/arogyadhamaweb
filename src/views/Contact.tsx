"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import {
  ChevronRight, Phone, Mail, MapPin, Clock, Calendar,
  Video, Send, CheckCircle2
} from "lucide-react";

const SUBJECTS = [
  "General Inquiry",
  "IPD Booking",
  "OPD Appointment",
  "Virtual Consultation",
  "Other",
];

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Call Us",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--forest) / 0.07)",
    lines: [
      { label: "General Enquiry", value: "080-2263-9963", href: "tel:08022639963" },
      { label: "IPD Booking", value: "961-134-4691", href: "tel:+919611344691" },
      { label: "IPD (Alternate)", value: "961-134-4691", href: "tel:+919611344691" },
      { label: "OPD / Virtual", value: "997-287-1777", href: "tel:+919972871777" },
    ],
  },
  {
    icon: Mail,
    title: "Email Us",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.07)",
    lines: [
      { label: "General", value: "arogyadhama@svyasa.edu.in", href: "mailto:arogyadhama@svyasa.edu.in" },
    ],
  },
  {
    icon: MapPin,
    title: "Find Us",
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.07)",
    lines: [
      { label: "Address", value: "Prashanti Kutiram, Vivekananda Road, Kalluballu Post, Jigani, Anekal, Bengaluru – 560105", href: undefined },
    ],
  },
];

const HOURS = [
  { icon: Clock, label: "OPD Hours", detail: "10:30 AM – 12:00 PM · 2:00 PM – 3:30 PM", note: "Closed: 2nd Saturdays, Sundays & Government Holidays" },
  { icon: Calendar, label: "IPD Admissions", detail: "Tuesdays only", note: "Advance booking required · Minimum 6-night stay" },
  { icon: Video, label: "Virtual Consultations", detail: "By appointment", note: "Call 997-287-1777 to schedule" },
];

function ContactCard({ card }: { card: typeof CONTACT_CARDS[0] }) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-border shadow-card p-6"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: card.bg }}>
        <card.icon size={20} style={{ color: card.color }} />
      </div>
      <h3 className="font-display font-bold text-forest text-lg mb-4">{card.title}</h3>
      <div className="space-y-3">
        {card.lines.map((l) => (
          <div key={l.value}>
            <div className="font-body text-[10px] uppercase tracking-widest text-sage font-semibold mb-0.5">{l.label}</div>
            {l.href ? (
              <a href={l.href} className="font-body font-semibold text-forest hover:text-gold transition-colors text-base md:text-lg leading-relaxed break-all">
                {l.value}
              </a>
            ) : (
              <p className="font-body text-forest/70 text-base md:text-lg leading-relaxed">{l.value}</p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function EnquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length > 100) e.name = "Name is required (max 100 chars)";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.phone && !/^[\d\s\+\-\(\)]{7,20}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message is required (min 10 chars)";
    if (form.message.length > 2000) e.message = "Message must be under 2000 characters";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  function field(key: keyof typeof form, label: string, extra?: React.ReactNode) {
    return (
      <div>
        <label className="font-body text-xs font-semibold uppercase tracking-widest text-sage block mb-1.5">{label}</label>
        {extra ?? (
          <input
            type="text" value={form[key]} maxLength={key === "message" ? 2000 : 255}
            onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
            className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-forest outline-none transition-colors ${errors[key] ? "border-red-400 bg-red-50" : "border-border focus:border-gold"}`}
          />
        )}
        {errors[key] && <p className="font-body text-xs text-red-500 mt-1">{errors[key]}</p>}
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 size={48} className="text-gold mb-4" />
        <h3 className="font-display font-bold text-forest text-2xl mb-2">Message Received!</h3>
        <p className="font-body text-sage max-w-sm">Thank you for contacting Arogyadhama. Our team has received your enquiry and will get in touch with you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {field("name", "Full Name *")}
        {field("email", "Email Address *")}
        {field("phone", "Phone Number")}
        <div>
          <label className="font-body text-xs font-semibold uppercase tracking-widest text-sage block mb-1.5">Subject *</label>
          <select
            value={form.subject}
            onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
            className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-forest outline-none transition-colors bg-white ${errors.subject ? "border-red-400 bg-red-50" : "border-border focus:border-gold"}`}
          >
            <option value="">Select a subject…</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.subject && <p className="font-body text-xs text-red-500 mt-1">{errors.subject}</p>}
        </div>
      </div>
      <div>
        <label className="font-body text-xs font-semibold uppercase tracking-widest text-sage block mb-1.5">Message *</label>
        <textarea
          value={form.message} maxLength={2000} rows={5}
          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
          className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-forest outline-none resize-none transition-colors ${errors.message ? "border-red-400 bg-red-50" : "border-border focus:border-gold"}`}
          placeholder="Tell us about your condition or what you're looking for…"
        />
        <div className="flex justify-between mt-1">
          {errors.message ? <p className="font-body text-xs text-red-500">{errors.message}</p> : <span />}
          <span className="font-body text-xs text-sage">{form.message.length}/2000</span>
        </div>
      </div>
      {submitError && (
        <p className="font-body text-sm text-red-500 rounded-xl border border-red-200 bg-red-50 px-4 py-3">{submitError}</p>
      )}
      <button type="submit" disabled={submitting}
        className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-body font-semibold text-sm transition-colors disabled:opacity-60"
        style={{ background: "hsl(var(--forest))", color: "hsl(var(--cream))" }}>
        <Send size={15} /> {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export default function Contact() {
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
              <span className="text-cream/90">Contact</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.08 }}>
              Get in Touch
            </h1>
            <p className="font-body text-cream/75 mt-4 max-w-lg leading-relaxed">
              Our team is here to answer your questions, help you plan your stay, and guide you towards the right healing programme for your needs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTACT_CARDS.map((c) => <ContactCard key={c.title} card={c} />)}
        </div>

        {/* Working Hours */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Working Hours</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOURS.map((h, i) => (
              <motion.div key={h.label}
                className="bg-white rounded-2xl border border-border shadow-card p-6"
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(var(--forest) / 0.07)" }}>
                  <h.icon size={18} className="text-forest" />
                </div>
                <h4 className="font-display font-bold text-forest text-base mb-1">{h.label}</h4>
                <p className="font-body font-semibold text-gold text-sm mb-1">{h.detail}</p>
                <p className="font-body text-sage text-xs leading-relaxed">{h.note}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enquiry Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
          <motion.div
            className="bg-white rounded-3xl border border-border shadow-card p-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mb-6">
              <div className="w-6 h-0.5 rounded mb-3" style={{ background: "hsl(var(--gold))" }} />
              <h2 className="font-display font-bold text-forest text-2xl">Send an Enquiry</h2>
              <p className="font-body text-sage text-sm mt-1">We respond within 24 hours.</p>
            </div>
            <EnquiryForm />
          </motion.div>

          {/* Map + Directions */}
          <div className="space-y-5">
            {/* Google Map embed */}
            <motion.div
              className="rounded-3xl overflow-hidden border border-border shadow-card h-72"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <iframe
                title="Arogyadhama Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.734!2d77.6522!3d12.7825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6bfd4b5e5555%3A0x0!2sPrashanti+Kutiram%2C+Vivekananda+Road%2C+Kalluballu%2C+Anekal%2C+Karnataka+560105!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>

            {/* Directions */}
            <motion.div
              className="bg-white rounded-2xl border border-border shadow-card p-6"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="font-display font-bold text-forest text-lg mb-4">How to Reach Us</h3>
              <div className="space-y-4">
                {[
                  { from: "Bengaluru Airport (KIA)", dist: "~35 km", time: "~55 min", via: "NH 44 → Bannerghatta Road → Anekal" },
                  { from: "City Railway Station", dist: "~35 km", time: "~60 min", via: "Bannerghatta Road → Jigani → Kalluballu" },
                  { from: "Majestic Bus Stand (KSRTC)", dist: "~33 km", time: "~50 min", via: "Kanakapura Road / Bannerghatta Road" },
                ].map((d) => (
                  <div key={d.from} className="flex gap-3">
                    <MapPin size={14} className="text-gold flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-body font-semibold text-forest text-sm">{d.from}</div>
                      <div className="font-body text-sage text-xs">{d.dist} · {d.time} · {d.via}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-border">
                  <div className="font-body text-xs text-sage font-semibold uppercase tracking-widest mb-2">Cab Services</div>
                  <div className="flex gap-4">
                    <a href="tel:9902180006" className="font-body text-forest text-sm font-semibold hover:text-gold transition-colors">990-218-0006</a>
                    <a href="tel:7349029157" className="font-body text-forest text-sm font-semibold hover:text-gold transition-colors">734-902-9157</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}