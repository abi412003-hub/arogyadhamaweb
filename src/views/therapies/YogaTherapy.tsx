"use client";
import { Flower2, Brain, Heart, Zap, BookOpen, FlaskConical, CheckCircle2 } from "lucide-react";
import TherapyPageTemplate from "@/components/TherapyPageTemplate";
import { motion } from "framer-motion";
import yogaHero from "@/assets/therapy-yoga.jpg";

/* ─── Shared section sub-components ─── */
function SectionHeading({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">{label}</span>
      <h2 className="font-display text-display-md text-forest mt-2 mb-3">{title}</h2>
      {subtitle && <p className="font-body text-forest/65 leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 font-body text-forest/70 text-sm leading-relaxed">
          <CheckCircle2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ─── Section: Science ─── */
function ScienceSection() {
  return (
    <div>
      <SectionHeading
        label="Evidence-Based Healing"
        title={<>The Science of <em className="not-italic text-gold">Yoga Therapy</em></>}
        subtitle="At Arogyadhama, Yoga is not fitness. It is precision medicine — each technique prescribed based on your diagnosis, condition severity, and physiological parameters."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-border shadow-card">
          <div className="w-10 h-10 rounded-xl bg-maroon/8 flex items-center justify-center mb-4" style={{ background: "hsl(var(--maroon) / 0.08)" }}>
            <FlaskConical size={20} className="text-forest" />
          </div>
          <h4 className="font-display font-semibold text-forest text-base mb-2">Research-Backed Protocols</h4>
          <p className="font-body text-forest/60 text-sm leading-relaxed">
            S-VYASA has published over 400 papers in PubMed-indexed journals demonstrating the measurable physiological and psychological effects of specific Yoga techniques. Every protocol at Arogyadhama is drawn from this evidence base.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border shadow-card">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
            <Brain size={20} className="text-gold" />
          </div>
          <h4 className="font-display font-semibold text-forest text-base mb-2">Psychoneuroimmunology</h4>
          <p className="font-body text-forest/60 text-sm leading-relaxed">
            Yoga therapy works through the mind-body axis — modulating the hypothalamic-pituitary-adrenal (HPA) axis, reducing cortisol, improving heart rate variability, and activating the parasympathetic nervous system.
          </p>
        </div>
      </div>
      <div className="bg-maroon rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "hsl(var(--gold))", transform: "translate(30%, -30%)" }} />
        <p className="font-quote italic text-cream/85 text-lg md:text-xl leading-relaxed">
          "Yoga therapy at Arogyadhama is not about touching your toes. It's about understanding what your nervous system needs to heal — and giving it exactly that, systematically, scientifically."
        </p>
        <div className="mt-4 font-body text-gold/80 text-sm">— Dr. R. Nagarathna, Medical Director</div>
      </div>
    </div>
  );
}

/* ─── Section: Techniques ─── */
const techniques = [
  {
    name: "Cyclic Meditation",
    abbr: "CM",
    desc: "A deeply restorative practice alternating between postures and relaxation in cycles. Studies show it reduces oxygen consumption more than simple supine rest, inducing profound physiological rest.",
    benefit: "Deep recovery · Stress reduction · Sleep improvement",
  },
  {
    name: "Pranayama",
    abbr: "PR",
    desc: "Scientific breathing exercises — from Bhramari (humming breath) to Nadi Shodhana (alternate nostril) — that directly regulate the autonomic nervous system and improve lung function.",
    benefit: "Respiratory health · ANS regulation · Energy balance",
  },
  {
    name: "Om Meditation",
    abbr: "OM",
    desc: "Chanting of the primordial sound 'Om' has been shown in neuroimaging studies to deactivate the limbic system — the brain's emotional centre — inducing measurable calm and mental clarity.",
    benefit: "Mental clarity · Emotional regulation · Cognitive health",
  },
  {
    name: "MSRT",
    abbr: "MSRT",
    desc: "Mind Sound Resonance Technique — a structured meditation using specific Sanskrit sounds to induce progressive states of mental relaxation, measured by EEG as increased alpha brainwaves.",
    benefit: "Advanced relaxation · Anxiety reduction · Sleep disorders",
  },
  {
    name: "Trataka",
    abbr: "TR",
    desc: "Focused candle-gazing meditation that strengthens the optic nerve, improves concentration, and is clinically prescribed for eye disorders, attention issues, and insomnia.",
    benefit: "Eye health · Concentration · Insomnia management",
  },
  {
    name: "Maitri Milan",
    abbr: "MM",
    desc: "A unique Arogyadhama group sharing practice — patients share their healing journeys each morning, creating social support, hope, and the evidence-based benefits of group belonging.",
    benefit: "Emotional healing · Community · Social wellbeing",
  },
  {
    name: "Special Techniques",
    abbr: "ST",
    desc: "Individualised Yoga protocols prescribed by the doctor based on your specific diagnosis — from Pawanmuktasana series for diabetes to back-care Yoga for spinal disorders.",
    benefit: "Condition-specific · Doctor-prescribed · Evidence-based",
  },
];

function TechniquesSection() {
  return (
    <div>
      <SectionHeading
        label="Techniques We Practice"
        title={<>Seven Pathways to <em className="not-italic text-gold">Healing</em></>}
        subtitle="Each technique is a clinical tool — prescribed specifically, practiced under supervision, and measured for outcome."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {techniques.map((t, i) => (
          <motion.div
            key={t.name}
            className="bg-white rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-maroon flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-cream text-[10px] text-center leading-none">{t.abbr}</span>
              </div>
              <div>
                <h4 className="font-display font-semibold text-forest text-base mb-1.5">{t.name}</h4>
                <p className="font-body text-forest/60 text-xs leading-relaxed mb-2.5">{t.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {t.benefit.split(" · ").map((b) => (
                    <span key={b} className="font-body text-[10px] font-semibold bg-gold/10 text-gold px-2 py-0.5 rounded-full">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section: Conditions ─── */
const conditions = [
  { name: "Type 2 Diabetes", icon: "🔬", dept: "Diabetes & Metabolic" },
  { name: "Hypertension", icon: "❤️", dept: "Cardiology" },
  { name: "Anxiety & Depression", icon: "🧠", dept: "Psychiatry" },
  { name: "Back Pain & Spondylosis", icon: "🦴", dept: "Spinal Disorders" },
  { name: "Asthma & COPD", icon: "🌬️", dept: "Pulmonology" },
  { name: "Cancer Support", icon: "🎗️", dept: "Oncology" },
  { name: "Rheumatoid Arthritis", icon: "🦱", dept: "Rheumatology" },
  { name: "Neurological Disorders", icon: "⚡", dept: "Neurology" },
  { name: "Obesity & Metabolic Syndrome", icon: "⚖️", dept: "Diabetes & Metabolic" },
  { name: "Insomnia & Sleep Disorders", icon: "😴", dept: "Psychiatry" },
  { name: "Thyroid Disorders", icon: "🔄", dept: "Endocrinology" },
  { name: "PCOS", icon: "🌸", dept: "Endocrinology" },
];

function ConditionsSection() {
  return (
    <div>
      <SectionHeading
        label="Conditions Treated"
        title={<>Where Yoga Therapy <em className="not-italic text-gold">Heals</em></>}
        subtitle="Yoga therapy at Arogyadhama is applied across all 11 clinical departments. These are some of the primary conditions where research evidence is strongest."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {conditions.map((c, i) => (
          <motion.div
            key={c.name}
            className="bg-white rounded-xl p-4 border border-border shadow-card text-center hover:border-gold/30 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <div className="font-display font-semibold text-forest text-sm leading-tight mb-1">{c.name}</div>
            <div className="font-body text-sage text-[10px]">{c.dept}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section: Research ─── */
function ResearchSection() {
  const papers = [
    { title: "Yoga reduces HbA1c in Type 2 Diabetes", journal: "Diabetes Care, 2015", impact: "Landmark RCT with 120 patients" },
    { title: "Pranayama improves lung function in COPD", journal: "Journal of Respiratory Medicine", impact: "Significant FEV1 improvement" },
    { title: "MSRT reduces anxiety scores by 40%", journal: "International Journal of Yoga", impact: "S-VYASA authored study" },
    { title: "Cyclic Meditation lowers cortisol levels", journal: "Indian Journal of Physiology", impact: "Objective biomarker study" },
  ];

  return (
    <div>
      <SectionHeading
        label="Research Evidence"
        title={<>Published in <em className="not-italic text-gold">PubMed</em></>}
        subtitle="Every claim we make is backed by peer-reviewed science. Here are some landmark studies from the Arogyadhama research portfolio."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {papers.map((p, i) => (
          <div key={p.title} className="bg-white rounded-2xl p-5 border border-border shadow-card flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-maroon flex items-center justify-center flex-shrink-0">
              <BookOpen size={14} className="text-cream" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-forest text-sm mb-1">{p.title}</h4>
              <p className="font-body text-sage text-xs italic">{p.journal}</p>
              <p className="font-body text-gold text-xs font-semibold mt-1">{p.impact}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[{ n: "400+", l: "PubMed Papers" }, { n: "40+", l: "Years of Research" }, { n: "ICMR", l: "Recognised Centre" }].map((s) => (
          <div key={s.l} className="bg-maroon rounded-xl p-4">
            <div className="font-display font-bold text-gold text-xl">{s.n}</div>
            <div className="font-body text-cream/70 text-xs mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page Export ─── */
export default function YogaTherapy() {
  return (
    <TherapyPageTemplate
      config={{
        therapyKey: "yoga",
        breadcrumbLabel: "Yoga Therapy",
        heroGradient: "linear-gradient(135deg, hsl(345 43% 12%) 0%, hsl(345 43% 18%) 50%, hsl(345 19% 30%) 100%)",
        heroTagline: "S-VYASA · 400+ Research Papers",
        heroTitle: "Yoga Therapy",
        heroSubtitle: "Ancient mind-body science applied with clinical precision — backed by decades of peer-reviewed research for Non-Communicable Disease management.",
        heroImage: yogaHero,
        sections: [
          { id: "science", label: "The Science", content: <ScienceSection /> },
          { id: "techniques", label: "Techniques", content: <TechniquesSection /> },
          { id: "conditions", label: "Conditions Treated", content: <ConditionsSection /> },
          { id: "research", label: "Research Evidence", content: <ResearchSection /> },
        ],
      }}
    />
  );
}