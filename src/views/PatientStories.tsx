"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ChevronRight, ChevronLeft, Star, Quote, MapPin, Heart, Play, ArrowRight } from "lucide-react";

/* ── Data ── */
const CONDITION_FILTERS = [
  { key: "all", label: "All" },
  { key: "diabetes", label: "Diabetes" },
  { key: "pain", label: "Pain" },
  { key: "neurological", label: "Neurological" },
  { key: "cardiac", label: "Cardiac" },
  { key: "wellness", label: "General Wellness" },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ms. Naina",
    location: "New York, USA",
    conditions: ["wellness"],
    conditionLabel: "General Wellness",
    rating: 5,
    quote:
      "The integrated healing approach at Arogyadhama — combining Yoga Therapy, Ayurveda, and Naturopathy — is unlike anything I have experienced in the West. In just two weeks I felt a transformation that years of conventional treatment had not achieved. I now recommend a 2-week visit at Arogyadhama to everybody seeking true healing. The peace of Prashanti Kutiram, the compassion of the staff, and the depth of knowledge here is extraordinary.",
    shortQuote: "Benefits from Yoga Therapy, Ayurveda and Naturopathy. Recommends a 2-week visit to everybody.",
    therapies: ["Yoga Therapy", "Ayurveda", "Naturopathy"],
    highlight: "2-week stay · Complete transformation",
    avatar: "N",
    avatarBg: "hsl(340 55% 35%)",
  },
  {
    id: 2,
    name: "Mr. Pishu",
    location: "India",
    conditions: ["wellness", "cardiac"],
    conditionLabel: "Multiple Conditions",
    rating: 5,
    quote:
      "I came with low Vitamin B12, body imbalance, a burning sensation in my feet, and high blood pressure. Through the integrated approach at Arogyadhama — yoga, Ayurvedic medicines, and the therapeutic diet — all conditions have shown remarkable improvement. The doctors here look at you as a whole person, not as a collection of separate problems. That is what makes the difference.",
    shortQuote: "Improvement in low Vit B12, body balancing, burning sensation in feet, high Blood Pressure through integrated approach.",
    therapies: ["Yoga", "Ayurveda", "Diet Therapy"],
    highlight: "Multiple conditions resolved",
    avatar: "P",
    avatarBg: "hsl(200 55% 30%)",
  },
  {
    id: 3,
    name: "Ranganath Desai",
    location: "Karnataka, India",
    conditions: ["neurological", "diabetes"],
    conditionLabel: "Paralysis & Diabetes",
    rating: 5,
    quote:
      "I arrived at Arogyadhama with both paralytic and diabetic conditions that had severely limited my daily life. The team here — neurologists, yoga therapists, physiotherapists — worked together on a plan specifically for me. The improvement has been tremendous. My blood sugar is now controlled, and my mobility has returned to a level I had given up hope of regaining. I am deeply grateful.",
    shortQuote: "Tremendous improvement in Paralytic and Diabetic condition.",
    therapies: ["Neurology", "Yoga Therapy", "Physiotherapy", "Diabetes Protocol"],
    highlight: "Paralysis & Diabetes — both improved",
    avatar: "R",
    avatarBg: "hsl(258 45% 35%)",
  },
  {
    id: 4,
    name: "Ms. Vidya",
    location: "Singapore",
    conditions: ["wellness"],
    conditionLabel: "Holistic Healing",
    rating: 5,
    quote:
      "I am simply overwhelmed with the integrated approach experience at Arogyadhama. From the moment I arrived, every element of the day — the meditations, the meals, the consultations, the Maitri Milan sharing circles — worked together in a way that created healing on every level. The campus itself, nestled in the Bannerghatta hills, feels like medicine. Singapore has everything, but this — this depth of healing — I could not find anywhere else.",
    shortQuote: "Overwhelmed with the integrated approach experience at Arogyadhama.",
    therapies: ["Integrated Programme", "Cyclic Meditation", "Ayurveda"],
    highlight: "Healing on every level",
    avatar: "V",
    avatarBg: "hsl(345 40% 28%)",
  },
  {
    id: 5,
    name: "Padmanabhan Ji & Revati Ji",
    location: "Tamil Nadu, India",
    conditions: ["pain"],
    conditionLabel: "Pain Management",
    rating: 5,
    quote:
      "We came as a couple, both suffering — back pain, neck pain, foot pain that had made daily life a struggle. After three weeks at Arogyadhama, all of these have been relieved. We feel completely rejuvenated. The Cyclic Meditation practice has particularly changed us — the depth of rest it provides is beyond description. We will return every year. This place has become our annual pilgrimage for health.",
    shortQuote: "Back pain, neck pain, foot pain — all relieved, feel rejuvenated. Benefited greatly from Cyclic Meditation.",
    therapies: ["Cyclic Meditation", "Physiotherapy", "Yoga Therapy", "Ayurveda"],
    highlight: "Back, neck & foot pain all resolved",
    avatar: "PR",
    avatarBg: "hsl(27 50% 35%)",
  },
];

/* ── Stars ── */
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="hsl(var(--gold))" className="text-gold" />
      ))}
    </div>
  );
}

/* ── Testimonial Card ── */
function TestimonialCard({ t, i }: { t: typeof TESTIMONIALS[0]; i: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.07 }}
    >
      {/* Top accent */}
      <div className="h-1 w-full" style={{ background: t.avatarBg }} />
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-cream text-sm flex-shrink-0"
            style={{ background: t.avatarBg }}>
            {t.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-forest text-base leading-tight">{t.name}</div>
            <div className="flex items-center gap-1.5 font-body text-xs text-sage mt-0.5">
              <MapPin size={10} /> {t.location}
            </div>
          </div>
          <Stars />
        </div>

        {/* Condition & highlight */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="font-body text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: `${t.avatarBg}18`, color: t.avatarBg }}>
            {t.conditionLabel}
          </span>
        </div>

        {/* Quote */}
        <div className="relative flex-1">
          <Quote size={20} className="text-gold/20 absolute -top-1 -left-1" />
          <p className="font-body text-forest/70 text-sm leading-relaxed pl-4">
            {expanded ? t.quote : t.shortQuote}
          </p>
        </div>

        {/* Highlight */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-body text-xs text-gold font-semibold">
            <Heart size={11} /> {t.highlight}
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className="font-body text-xs font-semibold transition-colors flex items-center gap-1"
            style={{ color: t.avatarBg }}>
            {expanded ? "Show less" : "Read full story"} <ArrowRight size={11} />
          </button>
        </div>

        {/* Therapies */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {t.therapies.map((th) => (
            <span key={th} className="font-body text-[10px] px-2 py-0.5 rounded-full bg-muted text-sage">{th}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Featured video carousel ── */
const TESTIMONIAL_VIDEOS = [
  "/testimonials/v1.mp4",
  "/testimonials/v2.mp4",
  "/testimonials/v3.mp4",
  "/testimonials/v4.mp4",
  "/testimonials/v5.mp4",
  "/testimonials/v6.mp4",
  "/testimonials/v7.mp4",
  "/testimonials/v8.mp4",
  "/testimonials/v9.mp4",
  "/testimonials/patient-testimonial.mp4", // original featured testimonial, kept in the carousel
];

function FeaturedVideo() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIAL_VIDEOS.length;
  // Wrap around so "next" past the last video returns to the first, and vice versa.
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <div className="relative">
      <div className="relative rounded-3xl overflow-hidden border border-border shadow-card-hover bg-maroon">
        {/* key forces the <video> to reload its source when the index changes */}
        <video
          key={index}
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto max-h-[560px] bg-maroon"
        >
          <source src={TESTIMONIAL_VIDEOS[index]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous video"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-cream/85 text-maroon shadow-card hover:bg-gold hover:text-forest-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next video"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-cream/85 text-maroon shadow-card hover:bg-gold hover:text-forest-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <ChevronRight size={22} />
            </button>
            {/* Counter badge */}
            <div className="absolute top-3 right-3 font-body text-xs font-semibold text-cream px-2.5 py-1 rounded-full bg-black/45">
              {index + 1} / {total}
            </div>
          </>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {TESTIMONIAL_VIDEOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to video ${i + 1}`}
              className="h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gold"
              style={{
                width: i === index ? 28 : 10,
                background: i === index ? "hsl(var(--gold))" : "hsl(var(--maroon) / 0.25)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Share Story CTA ── */
function ShareStoryCTA() {
  return (
    <section className="py-16" style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-muted)) 100%)" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Heart size={32} className="text-gold mx-auto mb-4" />
          <h2 className="font-display text-3xl text-cream font-bold mb-3">Share Your Story</h2>
          <p className="font-body text-cream/70 mb-8">
            Your healing journey could inspire others who are searching for hope. We welcome stories from all Arogyadhama patients and alumni.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:arogyadhama@svyasa.edu.in?subject=My%20Arogyadhama%20Story"
              className="flex items-center justify-center gap-2 bg-gold text-forest-dark font-body font-semibold px-6 py-3 rounded-xl hover:bg-gold-light transition-colors">
              Email Us Your Story
            </a>
            <a href="tel:+919972871777"
              className="flex items-center justify-center gap-2 border-2 border-cream/30 text-cream font-body font-semibold px-6 py-3 rounded-xl hover:bg-cream/10 transition-colors">
              Call: 997-287-1777 / 961-134-4691
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main ── */
export default function PatientStories() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.conditions.includes(activeFilter));

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(27 40% 18%) 55%, hsl(var(--terracotta-dark)) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Patient Stories</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.08 }}>
              Stories of<br /><em className="not-italic text-gold">Transformation</em>
            </h1>
            <p className="font-body text-cream/75 mt-5 max-w-xl leading-relaxed" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
              Real people, real healing — from New York to Singapore, Arogyadhama's integrative approach has transformed lives across continents.
            </p>
            <div className="flex flex-wrap gap-6 mt-10">
              {[["10,00,000+", "Patients Treated"], ["5 Stars", "Average Rating"], ["40+", "Countries Served"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-gold text-2xl">{n}</div>
                  <div className="font-body text-cream/60 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Featured video */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Featured Testimonial</span>
          </div>
          <FeaturedVideo />
        </div>

        {/* Filter + Grid */}
        <div>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
              <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Patient Stories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CONDITION_FILTERS.map(({ key, label }) => (
                <button key={key} onClick={() => setActiveFilter(key)}
                  className="font-body text-sm px-4 py-1.5 rounded-full transition-all border"
                  style={{
                    background: activeFilter === key ? "hsl(var(--maroon))" : "white",
                    color: activeFilter === key ? "hsl(var(--cream))" : "hsl(var(--maroon) / 0.6)",
                    borderColor: activeFilter === key ? "hsl(var(--maroon))" : "hsl(var(--border))",
                    fontWeight: activeFilter === key ? "600" : "400",
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((t, i) => (
                <motion.div key={t.id} layout
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }} transition={{ delay: i * 0.05 }}>
                  <TestimonialCard t={t} i={i} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ShareStoryCTA />
    </Layout>
  );
}