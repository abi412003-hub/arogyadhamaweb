"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import {
  Activity, Wind, Brain, Heart, Bone, Leaf, Ribbon,
  Zap, Utensils, Flame, Star, ChevronRight, X, Clock, Stethoscope
} from "lucide-react";

const CONDITIONS = [
  {
    key: "diabetes",
    label: "Diabetes",
    icon: Activity,
    color: "hsl(200 55% 32%)",
    bg: "hsl(200 55% 32% / 0.08)",
    tagline: "Type 2 DM, pre-diabetes & insulin resistance",
    department: "Diabetes & Metabolic Disorders",
    deptHref: "/departments/diabetes",
    therapies: ["Yoga Therapy", "Naturopathy", "Ayurveda", "Diet Protocol"],
    duration: "2–3 weeks recommended",
    description: "Our integrative diabetes protocol has been validated across 56,000+ patients. Yoga practices, dietary changes, and Ayurvedic support often reduce medication dependence significantly.",
  },
  {
    key: "back-pain",
    label: "Back Pain",
    icon: Bone,
    color: "hsl(27 50% 38%)",
    bg: "hsl(27 50% 38% / 0.08)",
    tagline: "Chronic low back pain, disc problems, sciatica",
    department: "Spinal Disorders",
    deptHref: "/departments/spinal",
    therapies: ["Yoga Therapy", "Physiotherapy", "Acupuncture", "Naturopathy"],
    duration: "2–3 weeks recommended",
    description: "Chronic back pain responds exceptionally well to our combined approach — yoga addresses muscular imbalances while physiotherapy and acupuncture target the pain pathways directly.",
  },
  {
    key: "anxiety",
    label: "Anxiety",
    icon: Brain,
    color: "hsl(258 50% 35%)",
    bg: "hsl(258 50% 35% / 0.08)",
    tagline: "Anxiety disorders, panic attacks, insomnia",
    department: "Psychiatry & Mental Health",
    deptHref: "/departments/psychiatry",
    therapies: ["Cyclic Meditation", "MSRT", "Pranayama", "Yoga Nidra"],
    duration: "2 weeks minimum",
    description: "Mind-body medicine at its most effective — MSRT and Cyclic Meditation create measurable reductions in cortisol and HAM-A scores, with effects lasting well beyond the stay.",
  },
  {
    key: "hypertension",
    label: "Hypertension",
    icon: Heart,
    color: "hsl(0 55% 38%)",
    bg: "hsl(0 55% 38% / 0.08)",
    tagline: "High blood pressure, pre-hypertension",
    department: "Cardiology",
    deptHref: "/departments/cardiology",
    therapies: ["Yoga Therapy", "Naturopathy", "Diet Therapy", "Pranayama"],
    duration: "1–2 weeks",
    description: "Validated yoga programmes reduce systolic BP by an average of 8–12 mmHg. Combined with naturopathic interventions and dietary guidance, results are often dramatic.",
  },
  {
    key: "arthritis",
    label: "Arthritis",
    icon: Bone,
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.08)",
    tagline: "Osteoarthritis, rheumatoid arthritis, gout",
    department: "Rheumatology",
    deptHref: "/departments/rheumatology",
    therapies: ["Yoga Therapy", "Physiotherapy", "Ayurveda", "Naturopathy"],
    duration: "2–3 weeks",
    description: "Our rheumatology programme reduces inflammation through Ayurvedic preparations and targeted yoga, while physiotherapy maintains joint mobility and prevents further degeneration.",
  },
  {
    key: "asthma",
    label: "Asthma & COPD",
    icon: Wind,
    color: "hsl(168 30% 30%)",
    bg: "hsl(168 30% 30% / 0.08)",
    tagline: "Asthma, COPD, bronchitis, sinusitis",
    department: "Pulmonology",
    deptHref: "/departments/pulmonology",
    therapies: ["Pranayama", "Yoga Therapy", "Naturopathy", "Acupuncture"],
    duration: "1–2 weeks",
    description: "Pranayama practices like Bhastrika and Anuloma Viloma have documented effects on pulmonary function. Naturopathy steam and packs complement the respiratory protocol.",
  },
  {
    key: "cancer-support",
    label: "Cancer Support",
    icon: Ribbon,
    color: "hsl(340 55% 35%)",
    bg: "hsl(340 55% 35% / 0.08)",
    tagline: "Chemo-radiotherapy side effects, immunity support",
    department: "Oncology",
    deptHref: "/departments/oncology",
    therapies: ["Yoga Therapy", "Naturopathy", "Ayurveda", "Nutrition"],
    duration: "2–3 weeks",
    description: "Integrative oncology support focuses on reducing treatment side effects, improving immunity, managing fatigue and nausea, and restoring quality of life during and after cancer treatment.",
  },
  {
    key: "neurological",
    label: "Neurological",
    icon: Zap,
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.08)",
    tagline: "Stroke, paralysis, Parkinson's, epilepsy",
    department: "Neurology",
    deptHref: "/departments/neurology",
    therapies: ["Yoga Therapy", "Physiotherapy", "Acupuncture", "Naturopathy"],
    duration: "3–4 weeks",
    description: "Neurological rehabilitation at Arogyadhama has achieved outcomes that defy conventional prognosis. Our multidisciplinary team of neurologists, yoga therapists, and physiotherapists work as one.",
  },
  {
    key: "digestive",
    label: "Digestive Issues",
    icon: Utensils,
    color: "hsl(150 40% 28%)",
    bg: "hsl(150 40% 28% / 0.08)",
    tagline: "IBS, GERD, fatty liver, constipation",
    department: "Gastroenterology",
    deptHref: "/departments/gastroenterology",
    therapies: ["Naturopathy", "Ayurveda", "Yoga Therapy", "Diet Therapy"],
    duration: "1–2 weeks",
    description: "Gut health is central to our integrative model. Therapeutic fasting, mud pack therapy, and Ayurvedic gut protocols restore digestive fire (Agni) and microbiome balance.",
  },
  {
    key: "stress-burnout",
    label: "Stress & Burnout",
    icon: Flame,
    color: "hsl(27 55% 40%)",
    bg: "hsl(27 55% 40% / 0.08)",
    tagline: "Corporate burnout, chronic stress, exhaustion",
    department: "Psychiatry & Mental Health",
    deptHref: "/departments/psychiatry",
    therapies: ["Cyclic Meditation", "Yoga Nidra", "Pranayama", "MSRT"],
    duration: "1–2 weeks",
    description: "Stress and burnout respond powerfully to Arogyadhama's daily programme. The structured schedule, Maitri Milan community, and deep relaxation techniques create transformation that no holiday can.",
  },
  {
    key: "wellness",
    label: "General Wellness",
    icon: Star,
    color: "hsl(var(--forest))",
    bg: "hsl(var(--forest) / 0.08)",
    tagline: "Prevention, vitality & positive health",
    department: "Positive Health",
    deptHref: "/departments/positive-health",
    therapies: ["Yoga Therapy", "Ayurveda", "Naturopathy", "All Therapies"],
    duration: "1–2 weeks",
    description: "You don't need to be ill to benefit from Arogyadhama. Our positive health programme is for those who want to understand their body, build resilience, and experience life at full vitality.",
  },
];

export default function ConditionNavigator() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = CONDITIONS.find((c) => c.key === selected) ?? null;

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "hsl(168 15% 97%)" }}>
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--forest)) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Heading */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-label">Your Healing Path</span>
          <h2 className="font-display text-display-md text-forest mt-4">
            Find Your <em className="not-italic text-gold">Condition's Treatment</em>
          </h2>
          <p className="font-body text-sage mt-3 max-w-xl mx-auto">
            Click on your condition below to see the recommended department, therapies, and suggested duration at Arogyadhama.
          </p>
        </motion.div>

        {/* Condition Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 mb-8">
          {CONDITIONS.map((c, i) => {
            const isSelected = selected === c.key;
            return (
              <motion.button
                key={c.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelected(isSelected ? null : c.key)}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 text-center transition-all duration-200 min-h-[44px]"
                style={{
                  borderColor: isSelected ? c.color : "hsl(var(--border))",
                  background: isSelected ? c.bg : "white",
                  boxShadow: isSelected ? `0 0 0 3px ${c.color}20` : undefined,
                }}
                aria-pressed={isSelected}
                aria-label={`Show treatment for ${c.label}`}
              >
                <span className="font-body text-xs font-semibold leading-tight"
                  style={{ color: isSelected ? c.color : "hsl(var(--forest))" }}>
                  {c.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Expanded panel */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-3xl border-2 overflow-hidden"
              style={{ borderColor: active.color + "40" }}
            >
              <div className="p-1.5" style={{ background: active.color }}>
                <div className="flex items-center justify-between px-3 py-1">
                  <span className="font-body text-xs tracking-[0.2em] uppercase font-semibold text-cream/80">
                    Treatment Guide — {active.label}
                  </span>
                  <button onClick={() => setSelected(null)}
                    className="text-cream/60 hover:text-cream transition-colors p-1 rounded"
                    aria-label="Close">
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
                  {/* Left: info */}
                  <div>
                    <div className="mb-4">
                      <h3 className="font-display font-bold text-forest text-xl">{active.label}</h3>
                      <p className="font-body text-sm text-sage">{active.tagline}</p>
                    </div>
                    <p className="font-body text-forest/70 text-sm leading-relaxed mb-5">{active.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Department */}
                      <div className="rounded-xl p-4" style={{ background: active.bg }}>
                        <div className="mb-2">
                          <span className="font-body text-[10px] uppercase tracking-widest font-semibold" style={{ color: active.color }}>Department</span>
                        </div>
                        <p className="font-body text-sm font-semibold text-forest">{active.department}</p>
                      </div>

                      {/* Therapies */}
                      <div className="rounded-xl p-4 bg-muted">
                        <div className="mb-2">
                          <span className="font-body text-[10px] uppercase tracking-widest font-semibold text-sage">Therapies</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {active.therapies.map((t) => (
                            <span key={t} className="font-body text-[10px] bg-white text-forest/70 px-2 py-0.5 rounded-full border border-border">{t}</span>
                          ))}
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="rounded-xl p-4 bg-muted">
                        <div className="mb-2">
                          <span className="font-body text-[10px] uppercase tracking-widest font-semibold text-sage">Duration</span>
                        </div>
                        <p className="font-body text-sm font-semibold text-forest">{active.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: CTAs */}
                  <div className="flex flex-row md:flex-col gap-3 md:min-w-[160px]">
                    <Link to={active.deptHref}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-body text-sm font-semibold text-center transition-colors"
                      style={{ background: active.color, color: "hsl(var(--cream))" }}>
                      View Department <ChevronRight size={14} />
                    </Link>
                    <Link to="/book-now"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-body text-sm font-semibold border-2 text-center transition-colors"
                      style={{ borderColor: active.color, color: active.color }}>
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <p className="text-center font-body text-xs text-sage mt-2">
            ↑ Select a condition above to see your personalised healing path
          </p>
        )}
      </div>
    </section>
  );
}