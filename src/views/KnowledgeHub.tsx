"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import {
  ChevronRight, FlaskConical, ArrowRight, Mail, ExternalLink, Clock
} from "lucide-react";
import researchBanner from "@/assets/research-papers-banner.jpg";

/* ── Data ── */

const ARTICLES = [
  {
    category: "research",
    title: "Yoga for Bronchial Asthma — A Controlled Clinical Study",
    excerpt:
      "A controlled study of 106 asthma patients — half trained in integrated yoga (breathing, asanas, pranayama and meditation), half continuing usual treatment. The yoga group showed significantly fewer weekly asthma attacks, reduced reliance on medication, and improved peak expiratory flow, supporting yoga as an effective long-term therapy for bronchial asthma.",
    readTime: "8 min read",
    tags: ["Asthma", "Research", "Controlled Study"],
    featured: true,
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.06)",
  },
  {
    category: "yoga",
    title: "The Science Behind Cyclic Meditation",
    excerpt:
      "Cyclic Meditation (CM) — Arogyadhama's signature technique — alternates stimulating asanas with supine relaxation to create states of physiological rest deeper than sleep. EEG and HRV studies reveal the mechanism behind its profound healing effects.",
    readTime: "6 min read",
    tags: ["Cyclic Meditation", "EEG", "Sleep"],
    featured: false,
    color: "hsl(258 50% 40%)",
    bg: "hsl(258 50% 40% / 0.06)",
  },
  {
    category: "ayurveda",
    title: "Understanding Ayurvedic Body Constitution (Prakriti)",
    excerpt:
      "Your Prakriti — Vata, Pitta, or Kapha dominant — determines your innate susceptibility to certain diseases, your optimal diet, and your ideal therapeutic approach. A guide to understanding your constitutional type and its health implications.",
    readTime: "7 min read",
    tags: ["Prakriti", "Ayurveda", "Constitution"],
    featured: false,
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.07)",
  },
  {
    category: "yoga",
    title: "5 Pranayama Techniques for Stress Relief",
    excerpt:
      "Nadi Shodhana, Bhramari, Sheetali, Ujjayi, and Anuloma Viloma — five evidence-based pranayama practices with clinically validated effects on cortisol, blood pressure, and autonomic nervous system balance. Step-by-step guidance included.",
    readTime: "5 min read",
    tags: ["Pranayama", "Stress", "Breathing"],
    featured: false,
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.06)",
  },
  {
    category: "research",
    title: "Integrative Approach to Cardiac Rehabilitation",
    excerpt:
      "Post-MI and post-CABG patients at Arogyadhama follow a carefully graduated yoga-physiotherapy protocol. A 12-month follow-up study demonstrates 30% improvement in 6-minute walk distance and significant reduction in cardiac event recurrence.",
    readTime: "10 min read",
    tags: ["Cardiology", "Rehabilitation", "Research"],
    featured: false,
    color: "hsl(0 55% 38%)",
    bg: "hsl(0 55% 38% / 0.06)",
  },
  {
    category: "naturopathy",
    title: "Naturopathy for Digestive Health",
    excerpt:
      "From therapeutic fasting and mud pack therapy to the Ayurvedic Agni framework — understanding how naturopathic interventions heal IBS, GERD, fatty liver, and chronic constipation by restoring the digestive fire rather than suppressing symptoms.",
    readTime: "6 min read",
    tags: ["Naturopathy", "Gut Health", "IBS"],
    featured: false,
    color: "hsl(345 45% 28%)",
    bg: "hsl(345 45% 28% / 0.06)",
  },
  {
    category: "case-studies",
    title: "From Paralysis to Independence — A Stroke Recovery Story",
    excerpt:
      "A 58-year-old stroke patient with left-sided hemiplegia arrived with 20% motor function. After 8 weeks of combined yoga therapy, acupuncture, and physiotherapy at Arogyadhama, he walked unassisted and resumed daily activities.",
    readTime: "5 min read",
    tags: ["Neurology", "Stroke", "Recovery"],
    featured: false,
    color: "hsl(258 50% 35%)",
    bg: "hsl(258 50% 35% / 0.06)",
  },
  {
    category: "wellness",
    title: "Dinacharya — The Ayurvedic Daily Routine for Optimal Health",
    excerpt:
      "Ancient Ayurvedic texts prescribe an optimal daily routine — from tongue scraping and oil pulling at dawn to light dinners before sunset. Modern chronobiology is now validating these practices. Your practical guide to Dinacharya.",
    readTime: "7 min read",
    tags: ["Ayurveda", "Daily Routine", "Prevention"],
    featured: false,
    color: "hsl(43 70% 28%)",
    bg: "hsl(43 70% 28% / 0.06)",
  },
  {
    category: "research",
    title: "MSRT for Anxiety — A Randomised Controlled Trial",
    excerpt:
      "Mind Sound Resonance Technique (MSRT) versus diaphragmatic breathing in generalised anxiety disorder: a double-blind RCT demonstrating 42% reduction in HAM-A scores vs 18% in controls, with effects sustained at 3-month follow-up.",
    readTime: "9 min read",
    tags: ["MSRT", "Anxiety", "RCT"],
    featured: false,
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.06)",
  },
];

const RESEARCH_PAPERS = [
  {
    title: "Effect of yoga-based lifestyle modification on diabetes risk factors in overweight adults",
    journal: "Diabetes Care",
    year: "2015",
    authors: "Nagarathna R, Nagendra HR, et al.",
  },
  {
    title: "Yoga's effect on blood pressure: A systematic review and meta-analysis",
    journal: "Journal of Clinical Hypertension",
    year: "2019",
    authors: "S-VYASA Research Team",
  },
  {
    title: "Cyclic Meditation increases the occurrence of theta EEG bursts",
    journal: "International Journal of Yoga",
    year: "2010",
    authors: "Sarang SP, Telles S",
  },
  {
    title: "MSRT reduces anxiety and improves quality of sleep in healthy adults",
    journal: "Asian Journal of Psychiatry",
    year: "2018",
    authors: "Bhargav H, Nagendra HR, et al.",
  },
];

/* ── Featured Article ── */
function FeaturedArticle() {
  const article = ARTICLES[0];
  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden border border-border shadow-card-hover"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Illustration */}
        {/* The banner asset is pre-extended to 1:1 — its own top/bottom edge rows are stretched
            outward, so the filler is part of the same continuous image (no seam is possible).
            Its 1:1 aspect is <= every panel aspect (1.0 at lg, ~1.44+ above), so object-cover
            only ever crops that filler, never the microscope/text/icons. */}
        <div className="relative h-56 lg:h-auto overflow-hidden">
          {/* absolute so the square asset doesn't drive the row height — the panel keeps
              matching the article column, and cover crops only the extended filler */}
          <img
            src={researchBanner}
            alt="1,000+ research papers published"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full"
              style={{ background: "hsl(var(--maroon))", color: "hsl(var(--cream))" }}>
              Featured
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-8 lg:p-10 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: article.color }}>
                Research
              </span>
              <span className="text-border">·</span>
              <span className="font-body text-xs text-sage flex items-center gap-1">
                <Clock size={11} /> {article.readTime}
              </span>
            </div>
            <h2 className="font-display font-bold text-forest text-2xl md:text-3xl leading-tight mb-4">
              {article.title}
            </h2>
            <p className="font-body text-forest/65 leading-relaxed mb-6">{article.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((t) => (
                <span key={t} className="font-body text-xs px-2.5 py-1 rounded-full bg-muted text-sage">{t}</span>
              ))}
            </div>
          </div>
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC1417003/" target="_blank" rel="noopener noreferrer"
            className="self-start flex items-center gap-2 font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
            style={{ background: "hsl(var(--maroon))", color: "hsl(var(--cream))" }}>
            Read Article <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Newsletter ── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;
    setSubmitted(true);
  }

  return (
    <section className="py-20" style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-muted)) 100%)" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Mail size={32} className="text-gold mx-auto mb-4" />
          <h2 className="font-display text-3xl text-cream font-bold mb-3">Stay Informed</h2>
          <p className="font-body text-cream/70 mb-8">
            Receive evidence-based insights on integrative healing, Arogyadhama research updates, and wellness tips — directly in your inbox.
          </p>
          {submitted ? (
            <div className="font-body text-gold text-lg font-semibold">✓ Thank you! You're subscribed.</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                maxLength={255}
                className="flex-1 px-4 py-3 rounded-xl font-body text-sm text-forest outline-none border-2 border-transparent focus:border-gold transition-colors"
                required
              />
              <button type="submit"
                className="px-6 py-3 rounded-xl font-body font-semibold text-sm transition-colors whitespace-nowrap"
                style={{ background: "hsl(var(--gold))", color: "hsl(var(--forest-dark))" }}>
                Subscribe
              </button>
            </form>
          )}
          <p className="font-body text-cream/40 text-xs mt-4">No spam. Unsubscribe any time.</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main ── */
export default function KnowledgeHub() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 55%, hsl(345 35% 24%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-end">
          <svg viewBox="0 0 500 500" className="w-80 h-80 mr-4" fill="none">
            {[200, 155, 110, 65].map((r) => <circle key={r} cx="250" cy="250" r={r} stroke="hsl(51 97% 94%)" strokeWidth="0.8" />)}
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Knowledge Hub</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.08 }}>
              Knowledge Hub
            </h1>
            <p className="font-body text-cream/75 mt-4 max-w-xl leading-relaxed" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
              Evidence-based insights on integrative healing — drawing from 1,000+ research papers, decades of clinical experience, and the ancient wisdom of Yoga and Ayurveda.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Featured */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Featured Article</span>
          </div>
          <FeaturedArticle />
        </div>

        {/* Research Publications */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Research Publications</span>
          </div>
          <div className="rounded-3xl overflow-hidden border border-border shadow-card">
            <div className="p-8" style={{ background: "hsl(var(--maroon))" }}>
              <div className="grid grid-cols-3 gap-6 text-center mb-6">
                {[["1,000+", "Papers in PubMed"], ["50+", "Years of Research"], ["30+", "International Journals"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display font-bold text-gold text-3xl">{n}</div>
                    <div className="font-body text-cream/65 text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
              <p className="font-body text-cream/70 text-sm text-center">
                S-VYASA University and Arogyadhama have built one of the world's largest evidence bases for integrative and yoga-based medicine.
              </p>
            </div>
            <div className="bg-white divide-y divide-border">
              {RESEARCH_PAPERS.map((p) => (
                <div key={p.title} className="p-6 flex items-start gap-4 hover:bg-cream/30 transition-colors group">
                  <FlaskConical size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body font-semibold text-forest text-sm leading-snug mb-1 group-hover:text-gold transition-colors">
                      {p.title}
                    </h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                      <span className="font-body text-xs text-gold">{p.journal}</span>
                      <span className="font-body text-xs text-sage">{p.authors}</span>
                      <span className="font-body text-xs text-sage">{p.year}</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-sage flex-shrink-0 group-hover:text-gold transition-colors mt-0.5" />
                </div>
              ))}
              <div className="p-6 bg-cream/20 text-center">
                <Link to="/knowledge-hub/research-papers"
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-forest hover:text-gold transition-colors">
                  View all papers <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </Layout>
  );
}