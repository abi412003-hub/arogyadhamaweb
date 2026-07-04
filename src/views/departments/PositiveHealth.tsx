"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard } from "@/components/DepartmentPageTemplate";
import positiveHealthHero from "@/assets/departments/positive-health-hero.jpg";
import { motion } from "framer-motion";
import { CheckCircle2, Sun, Heart, Brain, Activity, Zap } from "lucide-react";

const CONDITIONS = [
  { name: "Immune System Strengthening", icon: "🛡️", desc: "Yoga-based immunomodulation" },
  { name: "Stamina & Energy Optimisation", icon: "🔋", desc: "Vitality restoration protocols" },
  { name: "Mental Wellness & Resilience", icon: "🧠", desc: "Psychological resilience building" },
  { name: "Preventive Health Assessment", icon: "🩺", desc: "Early risk identification" },
  { name: "Stress Management", icon: "🧘", desc: "HPA axis optimisation" },
  { name: "Weight Management", icon: "⚖️", desc: "Healthy weight maintenance" },
  { name: "Sleep Optimisation", icon: "😴", desc: "Deep restorative sleep" },
  { name: "Spiritual Wellbeing", icon: "✨", desc: "Inner peace & purpose" },
  { name: "Anti-Ageing & Longevity", icon: "🌿", desc: "Rasayana (Ayurvedic rejuvenation)" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Promotion of <em className="not-italic text-gold">Positive Health</em></>}
        subtitle="Most medicine treats disease. The Department of Positive Health at Arogyadhama goes further — creating optimal, radiant health for those who choose to thrive rather than merely survive." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>The WHO defines health not as the absence of disease, but as "a state of complete physical, mental, and social wellbeing." The Department of Positive Health at Arogyadhama is dedicated to achieving this highest standard of health for every person who walks through our doors.</p>
        <p>This department serves two types of patients: those who are healthy and want to optimise their wellbeing and prevent future disease, and those recovering from illness who want to move beyond mere recovery to achieve vibrant positive health.</p>
        <p>The positive health programme integrates all five therapeutic modalities — Yoga, Ayurveda, Naturopathy, Acupuncture, and Physiotherapy — not to treat disease, but to build reserves of physical vitality, mental resilience, immune strength, and spiritual wellbeing that protect against future illness.</p>
      </div>

      {/* Pillars */}
      <h3 className="font-display font-semibold text-forest text-xl mb-5">Five Pillars of Positive Health</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: Activity, label: "Physical Vitality", desc: "Optimal body composition, cardiovascular fitness, flexibility, and muscular strength." },
          { icon: Brain, label: "Mental Wellness", desc: "Emotional resilience, stress tolerance, cognitive clarity, and psychological balance." },
          { icon: Zap, label: "Immune Strength", desc: "Robust immune function that protects against infections and autoimmune activation." },
          { icon: Heart, label: "Social Connection", desc: "Meaningful relationships and community — the most powerful predictor of longevity." },
          { icon: Sun, label: "Spiritual Wellbeing", desc: "Sense of purpose, inner peace, and connection to something larger than oneself." },
          { icon: CheckCircle2, label: "Preventive Health", desc: "Early identification and reversal of health risks before they become disease." },
        ].map((p, i) => (
          <motion.div key={p.label} className="bg-white rounded-xl p-5 border border-border shadow-card"
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "hsl(var(--forest) / 0.08)" }}>
              <p.icon size={18} className="text-forest" />
            </div>
            <h4 className="font-display font-semibold text-forest text-sm mb-1.5">{p.label}</h4>
            <p className="font-body text-forest/60 text-xs leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Building <em className="not-italic text-gold">Optimal Wellbeing</em></>}
        subtitle="The positive health programme combines all five therapeutic systems in a preventive and promotive protocol — for people who want to be not just healthy, but truly vital." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="Complete yoga practice including asana for physical vitality, pranayama for energy optimisation, meditation for mental resilience, and Karma Yoga philosophy for spiritual wellbeing." />
        <IntegrativeCard therapy="Ayurvedic Rasayana" color="hsl(var(--sage))"
          desc="Rasayana therapy — the Ayurvedic science of rejuvenation — uses specific herbs and protocols to nourish all body tissues, enhance ojas (vitality essence), and promote longevity. Chyawanprash, Ashwagandha, Amalaki." />
        <IntegrativeCard therapy="Naturopathic Optimisation" color="hsl(200 60% 35%)"
          desc="Optimal whole-food diet. Periodic therapeutic fasting for cellular autophagy. Hydrotherapy for circulation. Sunlight therapy for Vitamin D. Air therapy — deep outdoor breathing practices." />
        <IntegrativeCard therapy="Preventive Assessment" color="hsl(var(--gold))"
          desc="Comprehensive health assessment including metabolic markers, HRV analysis, biological age estimation, and functional capacity testing — creating a personalised prevention roadmap." />
      </div>
      <div className="bg-forest rounded-2xl p-8">
        <p className="font-quote italic text-cream/85 text-xl leading-relaxed text-center">
          "True health is not the absence of disease. It is an abundance of vitality, clarity, joy, and purpose — a state that each human being is capable of, given the right conditions and guidance."
        </p>
        <div className="mt-4 font-body text-gold/70 text-sm text-center">— Dr. H. R. Nagendra, Chancellor, S-VYASA</div>
      </div>
    </div>
  );
}

function ProgramSection() {
  const programmes = [
    { name: "Weekend Wellness Retreat", dur: "2–3 days", ideal: "Corporate professionals, first-time visitors", includes: "Health assessment, yoga, Ayurvedic consultation, naturopathic meals" },
    { name: "7-Day Positive Health Programme", dur: "1 week", ideal: "Those seeking a deep reboot", includes: "Full IPD experience, complete assessment, 5-modality protocol" },
    { name: "Corporate Wellness Package", dur: "1 day", ideal: "Company teams and groups", includes: "Yoga, meditation, stress management workshop, Ayurvedic consultation" },
    { name: "Anti-Ageing Rasayana Programme", dur: "2–4 weeks", ideal: "Those above 45 years", includes: "Panchakarma, Rasayana herbs, rejuvenation yoga, complete metabolic reset" },
  ];
  return (
    <div>
      <SectionHeading label="Wellness Programmes" title={<>Choose Your <em className="not-italic text-gold">Path to Wellness</em></>}
        subtitle="Positive health programmes range from weekend introductions to comprehensive month-long transformations." />
      <div className="space-y-4">
        {programmes.map((p, i) => (
          <motion.div key={p.name} className="bg-white rounded-2xl p-6 border border-border shadow-card"
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div className="flex flex-wrap gap-3 items-start justify-between mb-3">
              <h4 className="font-display font-bold text-forest text-lg">{p.name}</h4>
              <span className="font-body text-xs bg-gold/10 text-gold px-3 py-1 rounded-full font-semibold">{p.dur}</span>
            </div>
            <p className="font-body text-sage text-sm mb-2"><strong>Ideal for:</strong> {p.ideal}</p>
            <p className="font-body text-forest/65 text-sm"><strong>Includes:</strong> {p.includes}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function PositiveHealth() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "positive-health",
      breadcrumbLabel: "Positive Health",
      heroGradient: "linear-gradient(135deg, hsl(150 43% 11%) 0%, hsl(150 40% 18%) 50%, hsl(168 35% 24%) 100%)",
      heroImage: positiveHealthHero,
      heroImageAlt: "Hands holding a smiling yellow ball",
      heroImageBlend: "150 43% 11%",
      heroTagline: "Holistic Wellness · Prevention · Thriving",
      heroTitle: "Promotion of Positive Health",
      heroSubtitle: "Beyond the absence of disease — building radiant physical health, mental resilience, immune strength, and spiritual wellbeing for a life truly lived at its fullest.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "focus", label: "Focus Areas", content: <div><SectionHeading label="Focus Areas" title={<>What We <em className="not-italic text-gold">Address</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
        { id: "programmes", label: "Wellness Programmes", content: <ProgramSection /> },
      ],
    }} />
  );
}