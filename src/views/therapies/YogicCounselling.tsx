"use client";
import { Brain, HeartHandshake, Sparkles, BookOpen, Users, CheckCircle2 } from "lucide-react";
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

/* ─── Approach ─── */
function ApproachSection() {
  return (
    <div>
      <SectionHeading
        label="Our Approach"
        title={<>Where Yoga Psychology meets <em className="not-italic text-gold">Modern Therapy</em></>}
        subtitle="At Arogyadhama, counselling is not a conversation about symptoms — it is a structured journey into self-understanding, guided by Patanjali's Yoga Sutras and informed by contemporary clinical psychology."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-border shadow-card">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(var(--forest) / 0.08)" }}>
            <Brain size={20} className="text-forest" />
          </div>
          <h4 className="font-display font-semibold text-forest text-base mb-2">Yogic Framework</h4>
          <p className="font-body text-forest/60 text-sm leading-relaxed">
            Rooted in the Pancha Kosha model — addressing the physical, energetic, mental, intellectual, and blissful layers of the human being — for healing that touches every dimension of self.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border shadow-card">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
            <HeartHandshake size={20} className="text-gold" />
          </div>
          <h4 className="font-display font-semibold text-forest text-base mb-2">Evidence-Based Psychotherapy</h4>
          <p className="font-body text-forest/60 text-sm leading-relaxed">
            Integrates Cognitive Behavioural Therapy (CBT), mindfulness-based interventions, and supportive counselling with yogic concepts of Vairagya (detachment) and Abhyasa (consistent practice).
          </p>
        </div>
      </div>
      <div className="bg-forest rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "hsl(var(--gold))", transform: "translate(30%, -30%)" }} />
        <p className="font-quote italic text-cream/85 text-lg md:text-xl leading-relaxed">
          "The mind is the cause of bondage and the mind is the cause of liberation. Yogic counselling helps the patient see this — and gently, scientifically, choose freedom."
        </p>
        <div className="mt-4 font-body text-gold/80 text-sm">— Amrita Bindu Upanishad</div>
      </div>
    </div>
  );
}

/* ─── Modalities ─── */
const modalities = [
  {
    name: "Individual Counselling",
    abbr: "IC",
    desc: "Confidential one-to-one sessions with trained yoga psychologists. Sessions focus on understanding root causes, building coping skills, and aligning daily life with yogic values.",
    benefit: "Stress · Anxiety · Self-discovery",
  },
  {
    name: "Mindfulness-Based Therapy",
    abbr: "MBT",
    desc: "Structured mindfulness training drawn from MBSR and MBCT, taught alongside Vipassana-style awareness practices for sustainable emotional regulation.",
    benefit: "Depression · Rumination · Focus",
  },
  {
    name: "Cognitive Restructuring",
    abbr: "CBT",
    desc: "Identifying and reframing distorted thinking patterns using CBT techniques, complemented by Patanjali's Pratipaksha Bhavana — cultivating opposite, wholesome thoughts.",
    benefit: "Anxiety · Phobia · Negative thinking",
  },
  {
    name: "Group Therapy",
    abbr: "GT",
    desc: "Small-group sharing circles where patients heal through shared experience, mutual support, and witnessing — grounded in the yogic principle of Sangha (community).",
    benefit: "Loneliness · Grief · Belonging",
  },
  {
    name: "Family Counselling",
    abbr: "FC",
    desc: "Sessions with patient and family together to repair communication, resolve conflict, and build a supportive home environment for the patient's healing journey.",
    benefit: "Relationships · Conflict · Support",
  },
  {
    name: "Spiritual Counselling",
    abbr: "SC",
    desc: "For patients seeking meaning, purpose or peace amidst chronic illness — drawing on the Bhagavad Gita, Upanishads, and timeless wisdom traditions.",
    benefit: "Meaning · Acceptance · Inner peace",
  },
];

function ModalitiesSection() {
  return (
    <div>
      <SectionHeading
        label="Therapeutic Modalities"
        title={<>Six Pathways to <em className="not-italic text-gold">Inner Healing</em></>}
        subtitle="Each modality is selected and combined based on a thorough psychological assessment by our counselling team."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {modalities.map((t, i) => (
          <motion.div
            key={t.name}
            className="bg-white rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center flex-shrink-0">
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
  { name: "Anxiety Disorders", icon: "😰", dept: "Psychiatry" },
  { name: "Depression", icon: "🌧️", dept: "Psychiatry" },
  { name: "Chronic Stress & Burnout", icon: "🔥", dept: "Positive Health" },
  { name: "Insomnia", icon: "😴", dept: "Psychiatry" },
  { name: "Grief & Bereavement", icon: "🕊️", dept: "Counselling" },
  { name: "Relationship Issues", icon: "💞", dept: "Family Therapy" },
  { name: "Addiction Recovery", icon: "🧘", dept: "Psychiatry" },
  { name: "Coping with Chronic Illness", icon: "🤝", dept: "All Departments" },
  { name: "Self-Esteem & Identity", icon: "🌱", dept: "Counselling" },
];

function ConditionsSection() {
  return (
    <div>
      <SectionHeading
        label="Who We Help"
        title={<>Mental & Emotional <em className="not-italic text-gold">Wellbeing</em></>}
        subtitle="Yogic counselling supports patients across the spectrum — from clinical mental health concerns to existential questions of meaning and purpose."
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

/* ─── Journey ─── */
function JourneySection() {
  const steps = [
    { icon: Users, title: "Initial Assessment", desc: "A 60-minute intake session to understand your history, current concerns, and therapeutic goals." },
    { icon: BookOpen, title: "Personalised Plan", desc: "Your counsellor designs a tailored programme combining therapy modalities, yogic practices, and homework." },
    { icon: Sparkles, title: "Ongoing Sessions", desc: "Regular sessions — individual, group, or family — track progress and adjust the plan as you grow." },
    { icon: HeartHandshake, title: "Integration & Maintenance", desc: "Tools and practices for lifelong wellbeing, with optional follow-up sessions and refresher retreats." },
  ];
  return (
    <div>
      <SectionHeading
        label="Your Journey"
        title={<>From <em className="not-italic text-gold">Suffering</em> to Self-Mastery</>}
        subtitle="Healing the mind takes time. Our counselling pathway is structured, gentle, and patient-led."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {steps.map((s, i) => (
          <div key={s.title} className="bg-white rounded-2xl p-6 border border-border shadow-card">
            <div>
              <div className="font-body text-[10px] tracking-[0.2em] uppercase text-gold font-semibold mb-1">Step {i + 1}</div>
              <h4 className="font-display font-semibold text-forest text-base mb-1">{s.title}</h4>
              <p className="font-body text-forest/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-cream rounded-2xl p-6 border border-gold/20 flex items-start gap-4">
        <CheckCircle2 size={22} className="text-gold flex-shrink-0 mt-0.5" />
        <p className="font-body text-forest/75 text-sm leading-relaxed">
          <strong className="text-forest">Confidentiality is sacred.</strong> All sessions are private and protected. Our counsellors are bound by professional ethics and the yogic vow of Ahimsa — non-harm to mind, body, and spirit.
        </p>
      </div>
    </div>
  );
}

/* ─── Page Export ─── */
export default function YogicCounselling() {
  return (
    <TherapyPageTemplate
      config={{
        therapyKey: "yogic-counselling",
        breadcrumbLabel: "Yogic Counselling & Psychotherapy",
        heroGradient: "linear-gradient(135deg, hsl(150 43% 12%) 0%, hsl(150 43% 20%) 50%, hsl(168 25% 32%) 100%)",
        heroTagline: "Mind · Emotion · Spirit",
        heroTitle: "Yogic Counselling & Psychotherapy",
        heroSubtitle: "A unique integration of timeless yoga psychology with evidence-based modern psychotherapy — for healing that goes beyond symptom relief to self-realisation.",
        sections: [
          { id: "approach", label: "Our Approach", content: <ApproachSection /> },
          { id: "modalities", label: "Modalities", content: <ModalitiesSection /> },
          { id: "conditions", label: "Who We Help", content: <ConditionsSection /> },
          { id: "journey", label: "Your Journey", content: <JourneySection /> },
        ],
      }}
    />
  );
}