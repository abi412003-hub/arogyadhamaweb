"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import {
  ChevronRight, BookOpen, FlaskConical, Leaf, Droplets, Heart,
  Lightbulb, Users, ArrowRight, Mail, ExternalLink, Clock, Tag
} from "lucide-react";
import researchBanner from "@/assets/research-papers-banner.jpg";

/* ── Data ── */
const CATEGORIES = [
  { key: "all", label: "All", icon: BookOpen },
  { key: "research", label: "Research", icon: FlaskConical },
  { key: "yoga", label: "Yoga & Meditation", icon: Leaf },
  { key: "ayurveda", label: "Ayurveda", icon: Droplets },
  { key: "naturopathy", label: "Naturopathy", icon: Heart },
  { key: "wellness", label: "Wellness Tips", icon: Lightbulb },
  { key: "case-studies", label: "Case Studies", icon: Users },
];

const ARTICLES = [
  {
    category: "research",
    title: "How Yoga Therapy Helps Manage Diabetes — Clinical Evidence",
    excerpt:
      "A landmark multi-centre study involving 56,000 diabetic patients across 7,500 yoga camps demonstrates significant reductions in fasting blood glucose, HbA1c, and lipid profiles — with effects comparable to first-line oral hypoglycaemic agents.",
    readTime: "8 min read",
    tags: ["Diabetes", "Research", "RCT"],
    featured: true,
    color: "hsl(var(--forest))",
    bg: "hsl(var(--forest) / 0.06)",
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
    bg: "hsl(var(--forest) / 0.06)",
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
    color: "hsl(150 45% 28%)",
    bg: "hsl(150 45% 28% / 0.06)",
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
    bg: "hsl(var(--forest) / 0.06)",
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
            alt="400+ research papers published in PubMed"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full"
              style={{ background: "hsl(var(--forest))", color: "hsl(var(--cream))" }}>
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
          <button className="self-start flex items-center gap-2 font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
            style={{ background: "hsl(var(--forest))", color: "hsl(var(--cream))" }}>
            Read Article <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Article Card ── */
function ArticleCard({ article, i }: { article: typeof ARTICLES[0]; i: number }) {
  return (
    <motion.div
      className="group bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
    >
      {/* Coloured top strip */}
      <div className="h-1.5 w-full" style={{ background: article.color }} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Tag size={11} style={{ color: article.color }} />
          <span className="font-body text-[10px] font-semibold uppercase tracking-widest" style={{ color: article.color }}>
            {CATEGORIES.find(c => c.key === article.category)?.label}
          </span>
          <span className="text-border ml-auto font-body text-xs text-sage flex items-center gap-1">
            <Clock size={10} /> {article.readTime}
          </span>
        </div>
        <h3 className="font-display font-bold text-forest text-lg leading-snug mb-3 group-hover:text-gold transition-colors">
          {article.title}
        </h3>
        <p className="font-body text-forest/60 text-sm leading-relaxed flex-1 line-clamp-3">{article.excerpt}</p>
        <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
          {article.tags.map((t) => (
            <span key={t} className="font-body text-[10px] px-2 py-0.5 rounded-full bg-muted text-sage">{t}</span>
          ))}
        </div>
        <button className="flex items-center gap-1.5 font-body text-sm font-semibold transition-colors"
          style={{ color: article.color }}>
          Read More <ArrowRight size={13} />
        </button>
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
    <section className="py-20" style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 60%, hsl(var(--sage)) 100%)" }}>
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
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? ARTICLES.slice(1)
    : ARTICLES.slice(1).filter((a) => a.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 55%, hsl(168 35% 24%) 100%)" }}>
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
              Evidence-based insights on integrative healing — drawing from 400+ research papers, decades of clinical experience, and the ancient wisdom of Yoga and Ayurveda.
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

        {/* Category Filters */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Browse Articles</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setActiveCategory(key)}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm transition-all duration-200 border"
                style={{
                  background: activeCategory === key ? "hsl(var(--forest))" : "white",
                  color: activeCategory === key ? "hsl(var(--cream))" : "hsl(var(--forest) / 0.6)",
                  borderColor: activeCategory === key ? "hsl(var(--forest))" : "hsl(var(--border))",
                  fontWeight: activeCategory === key ? "600" : "400",
                }}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((a, i) => (
                <motion.div key={a.title} layout
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }} transition={{ delay: i * 0.04 }}>
                  <ArticleCard article={a} i={i} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Research Publications */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Research Publications</span>
          </div>
          <div className="rounded-3xl overflow-hidden border border-border shadow-card">
            <div className="p-8" style={{ background: "hsl(var(--forest))" }}>
              <div className="grid grid-cols-3 gap-6 text-center mb-6">
                {[["400+", "Papers in PubMed"], ["40+", "Years of Research"], ["30+", "International Journals"]].map(([n, l]) => (
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