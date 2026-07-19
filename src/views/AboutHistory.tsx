"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ChevronRight } from "lucide-react";

/* ─── Breadcrumb ─── */
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.href ? (
            <Link to={item.href} className="hover:text-gold transition-colors">{item.label}</Link>
          ) : (
            <span className="text-cream/90">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={12} />}
        </span>
      ))}
    </nav>
  );
}

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section
      className="relative pt-28 pb-14 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-muted)) 100%)" }}
    >
      <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Our History" }]} />
          <h1 className="font-display text-cream mt-5 font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
            Our History
          </h1>
          <p className="font-body text-cream/70 mt-4 max-w-xl">
            From a humble yoga research unit in 1981 to India's premier integrative medicine university — a chronicle of vision, perseverance, and healing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Timeline data ─── */
const milestones = [
  {
    year: "1981",
    title: "VK YOCTAS Founded",
    subtitle: "The Seed is Planted",
    content:
      "Under the visionary leadership of Dr. H.R. Nagendra and Dr. R. Nagarathna, the Vivekananda Kendra Yoga Therapy, Research & Training Centre (VK YOCTAS) was established in Bengaluru. This marked the beginning of a systematic, scientific exploration of Yoga's therapeutic applications — a bold departure from prevailing medical orthodoxy.",
    accent: "hsl(var(--maroon-muted))",
    right: false,
  },
  {
    year: "1986",
    title: "Renamed VKYOGAS",
    subtitle: "Research Deepens",
    content:
      "The organisation expanded its research mandate and was renamed the Vivekananda Kendra Yoga and Gitayana Samsthana (VKYOGAS). Clinical research programmes in Yoga therapy for chronic diseases began in earnest, laying the empirical foundation that would eventually attract international scientific attention.",
    accent: "hsl(var(--maroon-light))",
    right: true,
  },
  {
    year: "2000",
    title: "Renamed VYASA",
    subtitle: "National Recognition Grows",
    content:
      "As the institution's scope expanded far beyond Yoga alone — encompassing Ayurveda, Naturopathy, and integrative medicine — it was renamed VYASA (Vivekananda Yoga Anusandhana Samsthana). By now, Arogyadhama was treating thousands of patients annually and publishing research in peer-reviewed journals worldwide.",
    accent: "hsl(var(--maroon))",
    right: false,
  },
  {
    year: "2002",
    title: "S-VYASA Deemed University",
    subtitle: "A Historic Milestone",
    content:
      "The University Grants Commission (UGC) of India conferred Deemed University status upon S-VYASA — making it the world's first and only university dedicated entirely to Yoga science. Arogyadhama became its hospital division, where research and healing were practiced as one unified mission.",
    accent: "hsl(var(--gold))",
    right: true,
  },
  {
    year: "2007–2012",
    title: "ICMR Advanced Research Centre",
    subtitle: "Scientific Validation",
    content:
      "The Indian Council of Medical Research (ICMR) recognised Arogyadhama's research excellence by designating it a Centre of Advanced Research in Yoga and Neurophysiology — one of only a handful of institutions in India to receive this distinction. Landmark studies on Yoga's effect on diabetes, hypertension, and psychiatric disorders were conducted during this period.",
    accent: "hsl(var(--terracotta))",
    right: false,
  },
  {
    year: "2015",
    title: "International Yoga Day — Global Leadership",
    subtitle: "56,000 Patients, 7,500 Camps",
    content:
      "When Prime Minister Narendra Modi proposed International Yoga Day to the United Nations — and the UN adopted June 21st unanimously — S-VYASA and Arogyadhama played a pivotal role in designing the official protocol. In a single year, the team conducted 7,500 yoga camps across India, treating over 56,000 diabetic patients — a world record in healthcare outreach.",
    accent: "hsl(var(--maroon-muted))",
    right: true,
  },
  {
    year: "2016",
    title: "Padma Shri — Dr. H.R. Nagendra",
    subtitle: "National Honour",
    content:
      "India's fourth-highest civilian honour, the Padma Shri, was conferred upon Dr. H.R. Nagendra for his decades of contributions to Yoga science and integrative medicine. This recognition brought the institution global visibility and validated four decades of quiet, dedicated work.",
    accent: "hsl(var(--gold))",
    right: false,
  },
  {
    year: "Present",
    title: "600 Beds · 1,000+ Research Papers · 10,00,000+ Patients",
    subtitle: "The Journey Continues",
    content:
      "Today, Arogyadhama stands as a 600-bed inpatient hospital treating patients from over 50 countries, with a clinical team of specialists across 11 departments. The research legacy continues: over 1,000 papers in PubMed, ongoing clinical trials, and a new generation of scientists and healers being trained within the walls of Prashanti Kutiram.",
    accent: "hsl(var(--maroon-dark))",
    right: true,
  },
];

/* ─── Single milestone block ─── */
function MilestoneBlock({ m, index }: { m: typeof milestones[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex items-start gap-0 md:gap-8">
      {/* For desktop: alternating layout */}
      <div className={`hidden md:flex w-full items-start gap-8 ${m.right ? "flex-row-reverse" : "flex-row"}`}>
        {/* Content card */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: m.right ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl p-7 shadow-card border border-border relative group hover:shadow-card-hover transition-all duration-300">
            {/* Year badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 font-body font-bold text-sm text-cream"
              style={{ background: m.accent }}
            >
              {m.year}
            </div>
            <h3 className="font-display font-bold text-forest text-xl mb-1">{m.title}</h3>
            <p className="font-body text-gold font-semibold text-sm mb-3 italic">{m.subtitle}</p>
            <p className="font-body text-forest/65 leading-relaxed text-sm">{m.content}</p>
            {/* Gold left border on hover */}
            <div
              className="absolute left-0 top-6 bottom-6 w-0.5 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: m.accent }}
            />
          </div>
        </motion.div>

        {/* Spacer for center line */}
        <div className="w-8 flex-shrink-0" />
      </div>

      {/* Mobile layout (always left-aligned) */}
      <motion.div
        className="md:hidden w-full ml-8"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <div className="bg-white rounded-2xl p-5 shadow-card border border-border">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 font-body font-bold text-sm text-cream"
            style={{ background: m.accent }}
          >
            {m.year}
          </div>
          <h3 className="font-display font-bold text-forest text-lg mb-1">{m.title}</h3>
          <p className="font-body text-gold font-semibold text-xs mb-3 italic">{m.subtitle}</p>
          <p className="font-body text-forest/65 leading-relaxed text-sm">{m.content}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Timeline Section ─── */
function TimelineSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative">
          {/* Central vertical line — desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, hsl(var(--gold) / 0.2), hsl(var(--maroon)), hsl(var(--gold) / 0.2))" }}
          />

          {/* Left line — mobile */}
          <div
            className="md:hidden absolute left-3 top-0 bottom-0 w-0.5"
            style={{ background: "linear-gradient(to bottom, hsl(var(--gold) / 0.3), hsl(var(--maroon)), hsl(var(--gold) / 0.3))" }}
          />

          <div className="space-y-12 relative">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative">
                {/* Center dot — desktop */}
                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white shadow-forest z-10 items-center justify-center top-8"
                  style={{ background: m.accent }}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Left dot — mobile */}
                <div
                  className="md:hidden absolute left-1 top-6 w-4 h-4 rounded-full border-2 border-white shadow-forest z-10"
                  style={{ background: m.accent }}
                />

                <MilestoneBlock m={m} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutHistory() {
  return (
    <Layout>
      <PageHero />
      <TimelineSection />
      {/* CTA */}
      <section className="py-16" style={{ background: "hsl(345 15% 97%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-display-md text-forest mb-4">
              Continue Exploring
            </h2>
            <p className="font-body text-forest/60 mb-8">
              Meet the founders who made this journey possible, or return to the full About overview.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about/founders"
                className="bg-maroon text-cream font-body font-semibold px-7 py-3 rounded-xl hover:bg-maroon-light transition-colors"
              >
                Meet Our Founders →
              </Link>
              <Link
                to="/about"
                className="border-2 border-maroon/20 text-forest font-body font-semibold px-7 py-3 rounded-xl hover:border-maroon/50 transition-colors"
              >
                ← About Overview
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}