"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";

import {
  ChevronRight, Brain, Heart, Wind, Smile, Bone, Activity,
  TestTube, Syringe, Zap, Sun, Microscope, ArrowRight
} from "lucide-react";

import neurologyImg from "@/assets/departments/neurology-hero.jpg";
import oncologyImg from "@/assets/departments/oncology-hero.jpg";
import cardiologyImg from "@/assets/departments/cardiology-hero.jpg";
import pulmonologyImg from "@/assets/departments/pulmonology-hero.jpg";
import psychiatryImg from "@/assets/departments/psychiatry-hero.jpg";
import rheumatologyImg from "@/assets/departments/rheumatology-hero-1.jpg";
import spinalImg from "@/assets/departments/spinal-hero.jpg";
import diabetesImg from "@/assets/departments/diabetes-hero.jpg";
import gastroImg from "@/assets/departments/gastroenterology-hero.jpg";
import endocrinologyImg from "@/assets/departments/endocrinology-hero.jpg";
import endocrinologyImg2 from "@/assets/departments/endocrinology-hero-2.png";
import positiveHealthImg from "@/assets/departments/positive-health-hero.jpg";

// "hsl(258 60% 30%)" -> "hsl(258 60% 30% / a)" for department-tinted scrims
const tint = (c: string, a: number) => c.replace(/\)$/, ` / ${a})`);

const DEPT_FILTERS = ["All", "Chronic Conditions", "Lifestyle Diseases", "Mental Health", "Pain & Mobility"];

const DEPARTMENTS = [
  {
    key: "neurology",
    href: "/departments/neurology",
    icon: Brain,
    image: neurologyImg,
    name: "Neurology",
    tag: "Brain & Nervous System",
    filters: ["Chronic Conditions"],
    color: "hsl(258 60% 30%)",
    bg: "hsl(258 60% 30% / 0.08)",
    conditions: ["Epilepsy & Seizure disorders", "Stroke rehabilitation & Paralysis", "Parkinson's & Movement disorders"],
    description: "Integrative neurological care combining yoga nidra, pranayama, and naturopathic interventions with modern neurodiagnostics to support recovery and quality of life for brain and nervous system disorders.",
  },
  {
    key: "oncology",
    href: "/departments/oncology",
    icon: Microscope,
    image: oncologyImg,
    name: "Oncology",
    tag: "Cancer Care & Support",
    filters: ["Chronic Conditions"],
    color: "hsl(340 60% 30%)",
    bg: "hsl(340 60% 30% / 0.08)",
    conditions: ["Cancer supportive care", "Chemo-radiotherapy side effects", "Lifestyle modification for prevention"],
    description: "Complementary oncology care using yoga therapy, Ayurvedic immunomodulation, and naturopathic detox to reduce treatment side effects, improve quality of life, and support recovery.",
  },
  {
    key: "cardiology",
    href: "/departments/cardiology",
    icon: Heart,
    image: cardiologyImg,
    name: "Cardiology",
    tag: "Heart Health",
    filters: ["Lifestyle Diseases", "Chronic Conditions"],
    color: "hsl(0 60% 35%)",
    bg: "hsl(0 60% 35% / 0.08)",
    conditions: ["Hypertension management", "Coronary artery disease", "Cardiac rehabilitation"],
    description: "Integrative cardiac care combining yoga therapy (proven to reduce blood pressure), Ayurvedic cardioprotective herbs, and naturopathic diet therapy for comprehensive heart health.",
  },
  {
    key: "pulmonology",
    href: "/departments/pulmonology",
    icon: Wind,
    image: pulmonologyImg,
    name: "Pulmonology",
    tag: "Respiratory Health",
    filters: ["Chronic Conditions", "Lifestyle Diseases"],
    color: "hsl(200 60% 25%)",
    bg: "hsl(200 60% 25% / 0.08)",
    conditions: ["Asthma & COPD management", "Bronchitis & Sinusitis", "Nasal allergy & breathing disorders"],
    description: "Respiratory healing through pranayama, steam inhalation, Ayurvedic formulations, and naturopathic therapies to reduce airway inflammation and improve lung function.",
  },
  {
    key: "psychiatry",
    href: "/departments/psychiatry",
    icon: Smile,
    image: psychiatryImg,
    name: "Psychiatry",
    tag: "Mind & Emotional Wellness",
    filters: ["Mental Health"],
    color: "hsl(270 50% 30%)",
    bg: "hsl(270 50% 30% / 0.08)",
    conditions: ["Anxiety & Depression", "Insomnia & sleep disorders", "Psychosomatic disorders (Adhi-Vyadhi)"],
    description: "Mind-body psychiatry grounded in the ancient Adhi (psychic) and Vyadhi (somatic) framework — integrating meditation, Ayurvedic nervines, and modern psychotherapy.",
  },
  {
    key: "rheumatology",
    href: "/departments/rheumatology",
    icon: Bone,
    image: rheumatologyImg,
    name: "Rheumatology",
    tag: "Joints & Musculoskeletal",
    filters: ["Pain & Mobility", "Chronic Conditions"],
    color: "hsl(345 40% 22%)",
    bg: "hsl(345 40% 22% / 0.08)",
    conditions: ["Osteoarthritis & Rheumatoid arthritis", "Gouty arthritis", "Autoimmune musculoskeletal conditions"],
    description: "Integrative rheumatology using anti-inflammatory Ayurvedic Panchakarma, specific yoga therapy for joint mobility, and naturopathic diet to reduce systemic inflammation.",
  },
  {
    key: "spinal",
    href: "/departments/spinal",
    icon: Activity,
    image: spinalImg,
    name: "Spinal Disorders",
    tag: "Spine & Back",
    filters: ["Pain & Mobility"],
    color: "hsl(27 60% 30%)",
    bg: "hsl(27 60% 30% / 0.08)",
    conditions: ["Chronic low back pain (CLBP)", "Cervical spondylosis", "Disc herniation & Sciatica"],
    description: "Specialised spinal care combining back-care yoga asanas, physiotherapy, Ayurvedic Basti therapy, and naturopathic treatments for lasting spine health and pain relief.",
  },
  {
    key: "diabetes",
    href: "/departments/diabetes",
    icon: TestTube,
    image: diabetesImg,
    name: "Diabetes & Metabolic",
    tag: "Metabolic Health",
    filters: ["Lifestyle Diseases"],
    color: "hsl(43 70% 25%)",
    bg: "hsl(43 70% 25% / 0.08)",
    conditions: ["Type 2 Diabetes mellitus", "Insulin resistance & Pre-diabetes", "Metabolic syndrome & Obesity"],
    description: "S-VYASA's landmark research on Yoga for diabetes — including 56,000 patients in 7,500 camps — forms the evidence base for our comprehensive metabolic management protocol.",
  },
  {
    key: "gastroenterology",
    href: "/departments/gastroenterology",
    icon: Syringe,
    image: gastroImg,
    name: "Gastroenterology",
    tag: "Gut & Digestive Health",
    filters: ["Lifestyle Diseases", "Chronic Conditions"],
    color: "hsl(345 50% 22%)",
    bg: "hsl(345 50% 22% / 0.08)",
    conditions: ["IBS, IBD & functional gut disorders", "Fatty liver & hepatic conditions", "GERD & peptic disorders"],
    description: "Gut health through the Ayurvedic Agni (digestive fire) framework — combining therapeutic fasting, Triphala protocols, abdominal yoga practices, and naturopathic diet.",
  },
  {
    key: "endocrinology",
    href: "/departments/endocrinology",
    icon: Zap,
    image: [endocrinologyImg, endocrinologyImg2],
    name: "Endocrinology & Obesity",
    tag: "Hormonal Health",
    filters: ["Lifestyle Diseases"],
    color: "hsl(43 55% 28%)",
    bg: "hsl(43 55% 28% / 0.08)",
    conditions: ["Thyroid disorders (hypo/hyper)", "PCOS & hormonal imbalances", "Adrenal fatigue & stress hormones"],
    description: "Lifestyle-based endocrine management through yoga's effect on the HPA axis, Ayurvedic adaptogenic herbs like Ashwagandha, and naturopathic micronutrient protocols.",
  },
  {
    key: "positive-health",
    href: "/departments/positive-health",
    icon: Sun,
    image: positiveHealthImg,
    name: "Positive Health",
    tag: "Holistic Wellness",
    filters: ["Lifestyle Diseases", "Mental Health"],
    color: "hsl(345 43% 20%)",
    bg: "hsl(345 43% 20% / 0.08)",
    conditions: ["Immune system strengthening", "Stamina & vitality optimisation", "Mental wellness & resilience"],
    description: "Preventive and promotive health — building positive physical health, emotional resilience, and spiritual wellbeing for those who seek to thrive, not merely survive.",
  },
];

export default function Departments() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? DEPARTMENTS
    : DEPARTMENTS.filter((d) => d.filters.includes(activeFilter));

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative pt-28 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-light)) 100%)" }}
      >
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none opacity-[0.06]">
          <svg viewBox="0 0 500 500" className="w-80 h-80 mr-4" fill="none">
            {[220, 170, 120, 70].map((r) => <circle key={r} cx="250" cy="250" r={r} stroke="hsl(51 97% 94%)" strokeWidth="1" />)}
            {Array.from({ length: 12 }, (_, i) => i * 30).map((a) => (
              <line key={a} x1="250" y1="250" x2={250 + Math.cos(a * Math.PI / 180) * 220} y2={250 + Math.sin(a * Math.PI / 180) * 220} stroke="hsl(51 97% 94%)" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Departments</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              Our Clinical<br />Departments
            </h1>
            <p className="font-body text-cream/75 mt-4 max-w-xl" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
              Specialised integrative care across 11 medical disciplines — each combining ancient wisdom with modern diagnostics for complete healing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Filter Tabs */}
          <motion.div className="flex flex-wrap gap-2 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {DEPT_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="font-body text-sm px-4 py-2 rounded-full transition-all duration-200 border"
                style={{
                  background: activeFilter === f ? "hsl(var(--maroon))" : "white",
                  color: activeFilter === f ? "hsl(var(--cream))" : "hsl(var(--maroon) / 0.6)",
                  borderColor: activeFilter === f ? "hsl(var(--maroon))" : "hsl(var(--border))",
                  fontWeight: activeFilter === f ? "600" : "400",
                }}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto font-body text-sm text-sage self-center">{filtered.length} department{filtered.length !== 1 ? "s" : ""}</span>
          </motion.div>

          {/* Department Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((dept, i) => (
                <motion.div
                  key={dept.key}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={dept.href}
                    className="group relative block rounded-2xl border border-black/5 shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full min-h-[19rem]"
                  >
                    {/* Background photo — a single image, or a slow crossfade slideshow when an array */}
                    {(() => {
                      const imgs = Array.isArray(dept.image) ? dept.image : [dept.image];
                      const imgCls = "absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105";
                      const slot = 5; // seconds each image is shown
                      const cycle = imgs.length * slot;
                      const slotPct = 100 / imgs.length;
                      return (
                        <>
                          {imgs.length > 1 && (
                            <style>{`@keyframes deptCardFade { 0% { opacity: 0; } 4% { opacity: 1; } ${slotPct.toFixed(2)}% { opacity: 1; } ${(slotPct + 4).toFixed(2)}% { opacity: 0; } 100% { opacity: 0; } }`}</style>
                          )}
                          <img src={imgs[0]} alt="" aria-hidden loading="lazy" className={imgCls} />
                          {imgs.slice(1).map((src, k) => (
                            <img
                              key={src}
                              src={src}
                              alt=""
                              aria-hidden
                              className={imgCls}
                              style={{ opacity: 0, animation: `deptCardFade ${cycle}s linear infinite`, animationDelay: `${(k + 1) * slot}s` }}
                            />
                          ))}
                        </>
                      );
                    })()}
                    {/* Base scrim: bottom-weighted black (guarantees text legibility over any photo)
                        + department-tinted gradient (brand identity). Photo stays visible toward the top. */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${tint(dept.color, 0.82)} 0%, ${tint(dept.color, 0.35)} 45%, ${tint(dept.color, 0)} 100%)`,
                      }}
                    />

                    {/* Normal state */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0">
                      <div className="mb-3">
                        <div className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold mb-0.5 text-white/75">
                          {dept.tag}
                        </div>
                        <h3 className="font-display font-bold text-white text-xl drop-shadow-sm">{dept.name}</h3>
                      </div>
                      <ul className="space-y-1.5 mb-4">
                        {dept.conditions.map((c) => (
                          <li key={c} className="flex items-start gap-2 font-body text-[13px] text-white/85">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gold" />
                            {c}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-1.5 font-body text-sm font-semibold text-white">
                        Explore <ArrowRight size={14} />
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `linear-gradient(to top, ${tint(dept.color, 0.97)} 10%, ${tint(dept.color, 0.8)} 100%)` }}
                    >
                      <div>
                        <div className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold text-white/60 mb-3">{dept.tag}</div>
                        <h3 className="font-display font-bold text-white text-2xl mb-3">{dept.name}</h3>
                        <p className="font-body text-white/85 text-sm leading-relaxed">{dept.description}</p>
                      </div>
                      <div className="mt-5 flex items-center gap-1.5 text-white font-body font-semibold text-sm">
                        Explore <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      

      {/* CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-muted)) 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">Not Sure Which Department?</h2>
            <p className="font-body text-cream/70 mb-8">
              Our integrative team will assess your condition holistically and direct you to the right combination of departments and therapies.
            </p>
            <Link to="/book-now" className="inline-block bg-gold text-forest-dark font-body font-semibold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors shadow-gold">
              Book Your Assessment →
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}