"use client";
import { Wind, Droplets, ShieldCheck, FlaskConical, BookOpen, CheckCircle2 } from "lucide-react";
import TherapyPageTemplate from "@/components/TherapyPageTemplate";
import { motion } from "framer-motion";

function SectionHeading({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">{label}</span>
      <h2 className="font-display text-display-md text-forest mt-2 mb-3">{title}</h2>
      {subtitle && <p className="font-body text-forest/65 leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

/* ─── Science ─── */
function ScienceSection() {
  return (
    <div>
      <SectionHeading
        label="Evidence-Based Healing"
        title={<>The Science of <em className="not-italic text-gold">Ozone Therapy</em></>}
        subtitle="Medical ozone (O₃) — a precisely measured mixture of oxygen and ozone gas — is used worldwide as an adjunct in integrative medicine. At Arogyadhama, every protocol is administered by trained physicians using calibrated medical-grade equipment."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-border shadow-card">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(200 80% 50% / 0.1)" }}>
            <FlaskConical size={20} className="text-blue-600" />
          </div>
          <h4 className="font-display font-semibold text-forest text-base mb-2">Cellular Oxygenation</h4>
          <p className="font-body text-forest/60 text-sm leading-relaxed">
            Ozone enhances red blood cell flexibility and stimulates 2,3-DPG production, improving oxygen delivery to tissues — particularly valuable in chronic ischaemia and fatigue states.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border shadow-card">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
            <ShieldCheck size={20} className="text-gold" />
          </div>
          <h4 className="font-display font-semibold text-forest text-base mb-2">Immunomodulation & Detox</h4>
          <p className="font-body text-forest/60 text-sm leading-relaxed">
            Activates antioxidant defences (Nrf2 pathway), modulates cytokines, and exerts antimicrobial effects against bacteria, viruses and fungi — without harming healthy tissue.
          </p>
        </div>
      </div>
      <div className="bg-maroon rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "hsl(var(--gold))", transform: "translate(30%, -30%)" }} />
        <p className="font-quote italic text-cream/85 text-lg md:text-xl leading-relaxed">
          "Ozone is not a drug — it is an oxidative stimulus that wakes the body's own healing systems. Used precisely, it is one of integrative medicine's most elegant tools."
        </p>
        <div className="mt-4 font-body text-gold/80 text-sm">— Madrid Declaration on Ozone Therapy, ISCO3</div>
      </div>
    </div>
  );
}

/* ─── Techniques ─── */
const techniques = [
  {
    name: "Major Autohaemotherapy",
    abbr: "MAH",
    desc: "A small volume of the patient's own blood is withdrawn, mixed with medical ozone, and reinfused — systemic oxidative conditioning for chronic disease support.",
    benefit: "Chronic fatigue · Circulation · Immunity",
  },
  {
    name: "Minor Autohaemotherapy",
    abbr: "MIH",
    desc: "A few millilitres of ozonated blood are injected intramuscularly, acting as a gentle systemic immune stimulus and used adjunctively in allergies and skin conditions.",
    benefit: "Allergies · Eczema · Mild infections",
  },
  {
    name: "Rectal Insufflation",
    abbr: "RI",
    desc: "A safe, needle-free administration of medical ozone via the rectum — well-absorbed through the portal circulation, useful for gut and systemic conditions.",
    benefit: "IBD · Gut health · Systemic detox",
  },
  {
    name: "Ozonated Water & Oils",
    abbr: "OW",
    desc: "Topical ozonated water for irrigation and ozonated olive oil for skin conditions, wounds, and oral hygiene — antimicrobial and tissue-regenerative.",
    benefit: "Wounds · Skin · Dental hygiene",
  },
  {
    name: "Bagging & Cupping",
    abbr: "BC",
    desc: "A localised ozone-oxygen mixture is delivered to limbs or wounds inside a closed bag — accelerates healing of chronic ulcers, diabetic foot, and infected wounds.",
    benefit: "Diabetic ulcers · Wound healing",
  },
  {
    name: "Joint Insufflation",
    abbr: "JI",
    desc: "Precision intra-articular ozone injections under medical supervision for osteoarthritis and chronic joint pain — reduces inflammation and improves mobility.",
    benefit: "Knee pain · Arthritis · Joint inflammation",
  },
];

function TechniquesSection() {
  return (
    <div>
      <SectionHeading
        label="How We Apply Ozone"
        title={<>Six Routes of <em className="not-italic text-gold">Administration</em></>}
        subtitle="Each technique is selected based on the condition, with concentrations and dosages strictly within international ISCO3 safety guidelines."
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

/* ─── Conditions ─── */
const conditions = [
  { name: "Chronic Fatigue", icon: "🔋", dept: "Positive Health" },
  { name: "Diabetic Foot Ulcers", icon: "🦶", dept: "Diabetes" },
  { name: "Osteoarthritis", icon: "🦴", dept: "Rheumatology" },
  { name: "Inflammatory Bowel Disease", icon: "🌀", dept: "Gastroenterology" },
  { name: "Chronic Sinusitis", icon: "👃", dept: "Pulmonology" },
  { name: "Herpes & Viral Infections", icon: "🦠", dept: "Integrative" },
  { name: "Skin Conditions", icon: "✨", dept: "Naturopathy" },
  { name: "Peripheral Vascular Disease", icon: "❤️", dept: "Cardiology" },
  { name: "Long COVID Recovery", icon: "🌬️", dept: "Pulmonology" },
];

function ConditionsSection() {
  return (
    <div>
      <SectionHeading
        label="Conditions Treated"
        title={<>Where Ozone Therapy <em className="not-italic text-gold">Helps</em></>}
        subtitle="Used as an adjunct — never a replacement for primary care — ozone therapy supports recovery across many chronic and inflammatory conditions."
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

/* ─── Safety ─── */
function SafetySection() {
  const points = [
    { title: "Medical-Grade Equipment", desc: "Calibrated generators producing precise O₂/O₃ concentrations measured to international standards." },
    { title: "Trained Physicians Only", desc: "All procedures are performed by doctors trained in ISCO3-aligned protocols, never by unsupervised staff." },
    { title: "Single-Use Sterile Materials", desc: "Disposable tubing, syringes and needles for every patient — eliminating cross-contamination risk." },
    { title: "Pre-Treatment Screening", desc: "We screen for G6PD deficiency, hyperthyroidism and other contraindications before any session begins." },
  ];
  return (
    <div>
      <SectionHeading
        label="Safety & Standards"
        title={<>Safety is <em className="not-italic text-gold">Non-Negotiable</em></>}
        subtitle="Ozone is a powerful therapeutic agent and must be administered with precision. Arogyadhama follows ISCO3 (International Scientific Committee on Ozone Therapy) guidelines."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {points.map((p) => (
          <div key={p.title} className="bg-white rounded-2xl p-5 border border-border shadow-card flex gap-4">
            <div className="w-9 h-9 rounded-lg bg-maroon flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={16} className="text-cream" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-forest text-sm mb-1">{p.title}</h4>
              <p className="font-body text-forest/60 text-xs leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-cream rounded-2xl p-6 border border-gold/20 flex items-start gap-4">
        <CheckCircle2 size={22} className="text-gold flex-shrink-0 mt-0.5" />
        <p className="font-body text-forest/75 text-sm leading-relaxed">
          <strong className="text-forest">Important.</strong> Ozone therapy at Arogyadhama is offered as an adjunct to integrative care — not a standalone cure. Your physician will determine suitability based on your full medical history.
        </p>
      </div>
    </div>
  );
}

/* ─── Page Export ─── */
export default function OzoneTherapy() {
  return (
    <TherapyPageTemplate
      config={{
        therapyKey: "ozone",
        breadcrumbLabel: "Ozone Therapy",
        heroGradient: "linear-gradient(135deg, hsl(200 60% 18%) 0%, hsl(200 50% 26%) 50%, hsl(195 40% 38%) 100%)",
        heroTagline: "Oxygenation · Detox · Immunity",
        heroTitle: "Ozone Therapy",
        heroSubtitle: "Medical oxygen-ozone therapy — a precise, physician-administered adjunct that supports cellular oxygenation, immune balance and recovery from chronic conditions.",
        sections: [
          { id: "science", label: "The Science", content: <ScienceSection /> },
          { id: "techniques", label: "How We Apply", content: <TechniquesSection /> },
          { id: "conditions", label: "Conditions Treated", content: <ConditionsSection /> },
          { id: "safety", label: "Safety & Standards", content: <SafetySection /> },
        ],
      }}
    />
  );
}