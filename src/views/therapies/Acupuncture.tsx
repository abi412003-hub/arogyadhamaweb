"use client";
import TherapyPageTemplate from "@/components/TherapyPageTemplate";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import acupunctureHero from "@/assets/therapies/acupuncture-hero.jpg";

function SectionHeading({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">{label}</span>
      <h2 className="font-display text-display-md text-forest mt-2 mb-3">{title}</h2>
      {subtitle && <p className="font-body text-forest/65 leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

/* ─── Approach ─── */
function ApproachSection() {
  const meridians = [
    { name: "Lung Meridian", organs: "Lungs, skin, large intestine", conditions: "Asthma, skin disorders, grief" },
    { name: "Heart Meridian", organs: "Heart, small intestine, tongue", conditions: "Anxiety, palpitations, insomnia" },
    { name: "Kidney Meridian", organs: "Kidneys, bladder, bones", conditions: "Lower back pain, fear, fatigue" },
    { name: "Liver Meridian", organs: "Liver, gallbladder, eyes", conditions: "Anger, headaches, vision problems" },
    { name: "Stomach Meridian", organs: "Stomach, spleen, pancreas", conditions: "Digestive disorders, worry, obsession" },
    { name: "Large Intestine", organs: "Colon, lungs, skin", conditions: "Constipation, grief, skin issues" },
  ];

  return (
    <div>
      <SectionHeading label="Meridian Theory" title={<>The Art of <em className="not-italic text-gold">Energy Medicine</em></>}
        subtitle="Acupuncture works on the body's energy highways — 12 primary meridians that carry Qi (life force) through every organ and tissue. When this flow is disrupted, disease follows."
      />
      <div className="space-y-5 font-body text-forest/70 leading-relaxed mb-8">
        <p>
          Traditional Chinese Medicine posits that the body contains a network of invisible channels — meridians — through which vital energy (Qi) flows. Acupuncture needles, placed at specific points along these meridians, regulate the flow of Qi, removing blockages and restoring balance.
        </p>
        <p>
          At Arogyadhama, our trained acupuncturists integrate this ancient framework with modern neurophysiological understanding. We know that acupuncture points correspond to areas of high electrical conductivity and rich nerve density — stimulating them releases endorphins, modulates pain signals, and triggers anti-inflammatory responses.
        </p>
      </div>
      <h3 className="font-display font-semibold text-forest text-xl mb-5">Key Meridian Pathways</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {meridians.map((m, i) => (
          <motion.div key={m.name}
            className="bg-white rounded-xl p-5 border border-border shadow-card"
            initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--terracotta) / 0.15)" }}>
                <span className="font-display font-bold text-terracotta text-xs">{m.name[0]}</span>
              </div>
              <div>
                <h4 className="font-display font-semibold text-forest text-sm mb-0.5">{m.name}</h4>
                <p className="font-body text-sage text-xs mb-1">{m.organs}</p>
                <p className="font-body text-terracotta text-xs">{m.conditions}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Techniques ─── */
const techniques = [
  { name: "Classical Acupuncture", icon: "✦", desc: "Stainless steel fine needles inserted at precise meridian points. Disposable, sterile, virtually painless. The gold standard for most conditions." },
  { name: "Auricular Acupuncture", icon: "👂", desc: "The ear contains a microsystem reflecting the entire body. Ear points are used for addiction, weight management, anxiety, and chronic pain." },
  { name: "Electro-Acupuncture", icon: "⚡", desc: "Mild electrical stimulation through needles amplifies the therapeutic effect — particularly useful for chronic pain, paralysis, and neurological conditions." },
  { name: "Moxibustion", icon: "🔥", desc: "Burning of the herb Mugwort near acupuncture points to warm and invigorate Qi flow — used for cold conditions, deficiency, and immune support." },
  { name: "Acupressure", icon: "👋", desc: "Thumb and finger pressure on acupuncture points — no needles required. Taught to patients for self-management between sessions." },
  { name: "Cupping Therapy", icon: "🫙", desc: "Suction cups placed on the skin to improve circulation, relieve muscle tension, and enhance the flow of Qi through superficial meridians." },
];

function TechniquesSection() {
  return (
    <div>
      <SectionHeading label="Techniques We Use" title={<>The Acupuncture <em className="not-italic text-gold">Toolkit</em></>}
        subtitle="Our acupuncturists hold formal qualifications in Traditional Chinese Medicine and are trained in multiple specialised protocols."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {techniques.map((t, i) => (
          <motion.div key={t.name}
            className="bg-white rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}>
            
            <h4 className="font-display font-semibold text-forest text-base mb-2">{t.name}</h4>
            <p className="font-body text-forest/60 text-sm leading-relaxed">{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Conditions ─── */
const conditions = [
  { n: "Chronic Back Pain", i: "🦴" }, { n: "Migraine & Headache", i: "💆" }, { n: "Fibromyalgia", i: "⚡" },
  { n: "Neuropathy", i: "🔌" }, { n: "Post-Stroke Rehabilitation", i: "🧠" }, { n: "Cervical Spondylosis", i: "🪬" },
  { n: "Knee Osteoarthritis", i: "🦿" }, { n: "Insomnia", i: "😴" }, { n: "Anxiety", i: "💙" },
  { n: "IBS & Digestive Disorders", i: "🫃" }, { n: "Facial Palsy (Bell's Palsy)", i: "😮" }, { n: "Frozen Shoulder", i: "💪" },
];

function ConditionsSection() {
  return (
    <div>
      <SectionHeading label="Conditions Treated" title={<>What Acupuncture <em className="not-italic text-gold">Heals</em></>}
        subtitle="Acupuncture's evidence base is strongest for pain management and neurological support — though its scope extends across many body systems."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {conditions.map((c, i) => (
          <motion.div key={c.n}
            className="bg-white rounded-xl p-4 border border-border shadow-card text-center"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.3 }}>
            <div className="font-display font-semibold text-forest text-sm">{c.n}</div>
          </motion.div>
        ))}
      </div>
      <div className="bg-terracotta/10 rounded-2xl p-6 border border-terracotta/20">
        <h4 className="font-display font-semibold text-forest text-lg mb-3">WHO-Endorsed Conditions</h4>
        <p className="font-body text-forest/65 text-sm leading-relaxed">
          The World Health Organization (WHO) endorses acupuncture for over 40 conditions, including chronic pain, neurological disorders, musculoskeletal conditions, and certain mental health conditions. Arogyadhama's acupuncture protocols align with WHO evidence-based guidelines.
        </p>
      </div>
    </div>
  );
}

/* ─── Research ─── */
function ResearchSection() {
  return (
    <div>
      <SectionHeading label="Research & Evidence" title={<>The Science Behind <em className="not-italic text-gold">the Needles</em></>}
        subtitle="Modern research has begun to decode Acupuncture's mechanisms — validating what Traditional Chinese Medicine has practiced for millennia."
      />
      <div className="space-y-5">
        {[
          { t: "Endorphin Release", d: "Multiple studies using PET scans show acupuncture stimulates the release of endogenous opioids — the body's natural pain killers — in the brain. This explains its efficacy for chronic pain conditions." },
          { t: "Anti-Inflammatory Effects", d: "Acupuncture activates cholinergic anti-inflammatory pathways, reducing systemic inflammation. Studies demonstrate significant reduction in inflammatory markers like CRP and TNF-α." },
          { t: "Autonomic Nervous System Modulation", d: "Electroacupuncture at specific points shifts the autonomic balance from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest), benefiting anxiety, IBS, and hypertension." },
          { t: "Neuroplasticity", d: "fMRI studies show acupuncture produces specific, reproducible changes in brain activity — particularly in limbic regions involved in pain, emotion, and cognition — distinct from placebo effects." },
        ].map((p) => (
          <div key={p.t} className="flex gap-4">
            <CheckCircle2 size={20} className="text-gold mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-display font-semibold text-forest text-base mb-1">{p.t}</h4>
              <p className="font-body text-forest/65 text-sm leading-relaxed">{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Acupuncture() {
  return (
    <TherapyPageTemplate
      config={{
        therapyKey: "acupuncture",
        breadcrumbLabel: "Acupuncture",
        heroGradient: "linear-gradient(135deg, hsl(27 40% 25%) 0%, hsl(27 45% 32%) 50%, hsl(43 50% 30%) 100%)",
        heroTagline: "Meridian Therapy · WHO Endorsed",
        heroTitle: "Acupuncture",
        heroSubtitle: "Ancient Chinese medicine meets modern neuroscience — precise energy point therapy for pain relief, neurological healing, and systemic wellness restoration.",
        heroImage: acupunctureHero,
        // Keeps her face and the needles clear of the top crop on wide screens.
        heroImagePosition: "center 30%",
        sections: [
          { id: "approach", label: "Meridian Theory", content: <ApproachSection /> },
          { id: "techniques", label: "Techniques", content: <TechniquesSection /> },
          { id: "conditions", label: "Conditions Treated", content: <ConditionsSection /> },
          { id: "research", label: "Research Evidence", content: <ResearchSection /> },
        ],
      }}
    />
  );
}