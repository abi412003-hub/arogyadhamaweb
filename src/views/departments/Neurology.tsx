"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";
import neurologyHero from "@/assets/departments/neurology-hero.jpg";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const CONDITIONS = [
  { name: "Epilepsy & Seizure Disorders", icon: "⚡", desc: "Yoga-based seizure reduction protocols" },
  { name: "Stroke & Paralysis", icon: "🧠", desc: "Comprehensive rehabilitation" },
  { name: "Parkinson's Disease", icon: "🤝", desc: "Movement & tremor management" },
  { name: "Multiple Sclerosis", icon: "🔄", desc: "Immune & neurological support" },
  { name: "Alzheimer's & Dementias", icon: "💭", desc: "Cognitive support therapy" },
  { name: "Brain Tumours (supportive)", icon: "🎗️", desc: "Quality of life improvement" },
  { name: "Headache & Migraine", icon: "💆", desc: "Trigger management & prevention" },
  { name: "Neuropathy & Nerve Pain", icon: "🔌", desc: "Acupuncture & yoga relief" },
  { name: "Sleep Disorders", icon: "😴", desc: "MSRT & sleep hygiene protocols" },
  { name: "Speech Disorders", icon: "🗣️", desc: "Chanting & vocal rehabilitation" },
  { name: "Neuromuscular Diseases", icon: "💪", desc: "Physio & yoga combined" },
  { name: "Movement Disorders", icon: "🏃", desc: "Coordination & balance therapy" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Integrative <em className="not-italic text-gold">Neurological Care</em></>}
        subtitle="The Department of Neurology at Arogyadhama offers a comprehensive integrative approach to brain and nervous system disorders — combining conventional neurodiagnostics with the healing power of Yoga, Ayurveda, and Naturopathy." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>Our neurologists treat the full spectrum of neurological conditions — from epilepsy and movement disorders to dementias, stroke, brain tumors, multiple sclerosis, headache, neuromuscular diseases, paralysis, nerve pain, sleep disorders, and speech disorders.</p>
        <p>What makes Arogyadhama's approach unique is the recognition that the nervous system responds profoundly to integrative interventions. Research from S-VYASA demonstrates measurable changes in brain activity, autonomic nervous system function, and neuroplasticity through specific yoga techniques — changes that complement and enhance conventional neurological care.</p>
        <p>The department also specialises in neurological rehabilitation — improving quality of life, functional independence, and cognitive performance for patients living with chronic neurological conditions.</p>
      </div>
      <div className="bg-maroon rounded-2xl p-6">
        <p className="font-quote italic text-cream/85 text-lg leading-relaxed">
          "The nervous system is more plastic than medicine once believed. Yoga therapy, practised with precision and intention, rewires the brain's response to disease and stress — creating healing from within."
        </p>
        <div className="mt-3 font-body text-gold/70 text-sm">— Department of Neurology, Arogyadhama</div>
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Healing the <em className="not-italic text-gold">Nervous System</em></>}
        subtitle="Every neurological patient receives a multi-modality protocol combining the best of conventional neurology with evidence-based integrative therapies." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="Cyclic Meditation and MSRT reduce epileptic frequency. Om meditation activates vagal tone. Pranayama improves cerebral oxygenation. Tailored asana sequences restore motor function after stroke." />
        <IntegrativeCard therapy="Ayurveda" color="hsl(var(--sage))"
          desc="Medhya Rasayana (brain tonics) — Brahmi, Shankhpushpi, Ashwagandha — are prescribed for cognitive decline. Shirodhara (warm oil stream on forehead) is deeply calming for anxiety and insomnia." />
        <IntegrativeCard therapy="Acupuncture" color="hsl(var(--terracotta))"
          desc="Electroacupuncture at scalp and body points stimulates neuroplasticity. Proven effective for post-stroke rehabilitation, facial palsy, and neuropathic pain management." />
        <IntegrativeCard therapy="Naturopathy" color="hsl(200 60% 35%)"
          desc="Spinal cold packs reduce neuroinflammation. Therapeutic diet rich in Omega-3 and antioxidants supports myelin health. Hydrotherapy improves peripheral circulation and nerve function." />
        <IntegrativeCard therapy="Physiotherapy" color="hsl(var(--gold))"
          desc="Neurological rehabilitation using task-specific training, balance exercises, and gait retraining. Coordination with yoga therapy creates synergistic recovery outcomes for stroke and Parkinson's." />
        <IntegrativeCard therapy="Psychotherapy" color="hsl(270 50% 40%)"
          desc="Cognitive-behavioural therapy and group Maitri Milan sessions address the psychological burden of chronic neurological conditions — depression, anxiety, and adjustment disorders." />
      </div>
      <div className="space-y-4">
        {[
          { t: "ICMR-Recognised Research", d: "S-VYASA's neurology research includes studies on EEG changes in meditators, yoga's effect on seizure frequency, and pranayama's influence on cerebral blood flow — published in international peer-reviewed journals." },
          { t: "Multidisciplinary Team", d: "Neurologists, Yoga therapists, physiotherapists, Ayurvedic physicians, and psychologists collaborate in weekly case conferences to design each patient's individualised protocol." },
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

function TeamSection() {
  const team = [
    { name: "Dr. Consultant Neurologist", qual: "MD, DM (Neurology)", role: "Senior Consultant" },
    { name: "Yoga Therapist (Neuro)", qual: "MSc Yoga, PhD Neuroscience", role: "Yoga Therapy Lead" },
    { name: "Physiotherapist", qual: "BPT, MPT (Neurology)", role: "Neuro-Rehabilitation" },
  ];
  return (
    <div>
      <SectionHeading label="Our Team" title={<>Expert <em className="not-italic text-gold">Specialists</em></>}
        subtitle="Our neurological care team brings together specialists from conventional neurology and integrative medicine — a truly unique combination." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {team.map((m) => <TeamCard key={m.name} {...m} />)}
      </div>
    </div>
  );
}

function CaseStudiesSection() {
  const cases = [
    { condition: "Post-Stroke Paralysis", outcome: "60% motor function recovery", duration: "6-week IPD stay", therapy: "Yoga + Physiotherapy + Acupuncture" },
    { condition: "Drug-Resistant Epilepsy", outcome: "Significant seizure frequency reduction", duration: "4-week IPD protocol", therapy: "Cyclic Meditation + Ayurveda" },
    { condition: "Parkinson's Disease", outcome: "Improved gait and reduced tremor", duration: "Ongoing OPD protocol", therapy: "Yoga + Physiotherapy" },
  ];
  return (
    <div>
      <SectionHeading label="Case Studies" title={<>Real <em className="not-italic text-gold">Transformations</em></>} />
      <div className="space-y-4">
        {cases.map((c, i) => (
          <motion.div key={c.condition} className="bg-white rounded-2xl p-6 border border-border shadow-card"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="font-body text-xs bg-maroon/8 text-forest px-3 py-1 rounded-full font-semibold">{c.condition}</span>
              <span className="font-body text-xs bg-gold/10 text-gold px-3 py-1 rounded-full font-semibold">{c.duration}</span>
            </div>
            <p className="font-body text-sage text-sm mb-2">Therapies: <span className="text-forest font-semibold">{c.therapy}</span></p>
            <p className="font-display font-semibold text-forest text-base">Outcome: <span className="text-gold">{c.outcome}</span></p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Neurology() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "neurology",
      breadcrumbLabel: "Neurology",
      heroGradient: "linear-gradient(135deg, hsl(258 60% 15%) 0%, hsl(258 50% 22%) 50%, hsl(220 40% 25%) 100%)",
      heroImage: neurologyHero,
      heroImageAlt: "Doctor holding a model of the human brain",
      heroImageBlend: "258 60% 15%",
      heroTagline: "Brain & Nervous System · Integrative Neurology",
      heroTitle: "Department of Neurology",
      heroSubtitle: "Comprehensive integrative care for epilepsy, stroke rehabilitation, Parkinson's, dementias, and the full spectrum of neurological conditions — combining Yoga therapy, Ayurveda, and conventional diagnostics.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Treat" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
        { id: "cases", label: "Case Studies", content: <CaseStudiesSection /> },
      ],
    }} />
  );
}