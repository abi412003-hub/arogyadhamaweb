"use client";
import TherapyPageTemplate from "@/components/TherapyPageTemplate";
import { motion } from "framer-motion";
import { CheckCircle2, Leaf, FlaskConical } from "lucide-react";
import ayurvedaHero from "@/assets/therapies/ayurveda-hero.jpg";

function SectionHeading({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">{label}</span>
      <h2 className="font-display text-display-md text-forest mt-2 mb-3">{title}</h2>
      {subtitle && <p className="font-body text-forest/65 leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

/* ─── Approach Section ─── */
function ApproachSection() {
  const doshas = [
    { name: "Vata", element: "Air + Space", qualities: "Movement, communication, creativity", imbalance: "Anxiety, insomnia, dryness, pain" },
    { name: "Pitta", element: "Fire + Water", qualities: "Transformation, digestion, intelligence", imbalance: "Inflammation, acidity, anger, skin issues" },
    { name: "Kapha", element: "Earth + Water", qualities: "Stability, lubrication, immunity", imbalance: "Obesity, lethargy, congestion, depression" },
  ];

  return (
    <div>
      <SectionHeading
        label="Our Ayurvedic Approach"
        title={<>Healing Through <em className="not-italic text-gold">Constitutional Balance</em></>}
        subtitle="Ayurveda's genius lies in recognising that no two people are alike. Your Prakriti (constitution) determines your unique healing pathway."
      />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>
          At Arogyadhama, Ayurveda is practised not as folk medicine but as a sophisticated clinical system. Every patient begins with a comprehensive Prakriti assessment — a detailed analysis of their mind-body constitution using the Tridosha framework.
        </p>
        <p>
          Based on this assessment, our Ayurvedic physicians design an individualised protocol of herbal formulations, Panchakarma treatments, dietary guidance, and lifestyle modifications that address the root cause of imbalance — not merely its symptoms.
        </p>
      </div>
      <h3 className="font-display font-semibold text-forest text-xl mb-5">Understanding the Three Doshas</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {doshas.map((d, i) => (
          <motion.div key={d.name}
            className="bg-white rounded-2xl p-6 border border-border shadow-card"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
            <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center mb-4">
              <Leaf size={18} className="text-sage" />
            </div>
            <h4 className="font-display font-bold text-forest text-lg mb-1">{d.name}</h4>
            <p className="font-body text-gold text-xs font-semibold mb-3">{d.element}</p>
            <p className="font-body text-forest/60 text-xs leading-relaxed mb-2"><strong>Qualities:</strong> {d.qualities}</p>
            <p className="font-body text-terracotta text-xs leading-relaxed"><strong>Imbalance signs:</strong> {d.imbalance}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-sage rounded-2xl p-6">
        <p className="font-quote italic text-cream/90 text-lg">
          "Ayurveda at Arogyadhama is the foundation of healing. Before any Yoga technique is prescribed, before any naturopathic treatment begins, we must understand the patient's constitution."
        </p>
        <div className="mt-3 font-body text-cream/60 text-sm">— Ayurvedic Department, Arogyadhama</div>
      </div>
    </div>
  );
}

/* ─── Treatments Section ─── */
const pancha = [
  { name: "Abhyanga", desc: "Full-body warm oil massage using medicated oils chosen for your Prakriti. Deeply nourishing, relieves vata imbalances, promotes circulation and tissue health." },
  { name: "Shirodhara", desc: "Continuous warm oil stream on the forehead — one of Ayurveda's most calming treatments. Clinically prescribed for anxiety, insomnia, neurological conditions." },
  { name: "Swedana", desc: "Herbal steam therapy that opens channels, eliminates toxins through sweat, and relieves stiffness. Always follows Abhyanga for maximum benefit." },
  { name: "Basti", desc: "Medicated enema therapy — the most powerful of the Panchakarma treatments for Vata disorders. Prescribed for constipation, neurological conditions, and joint disorders." },
  { name: "Nasya", desc: "Nasal administration of medicated oils for sinus, neurological, and head disorders. Cleanses and nourishes the upper respiratory tract and brain." },
  { name: "Virechana", desc: "Therapeutic purgation using specific Ayurvedic herbs to eliminate Pitta dosha. Prescribed for inflammatory conditions, liver disorders, and skin diseases." },
];

const herbals = [
  { name: "Triphala", use: "Digestive health, antioxidant, gentle detox" },
  { name: "Ashwagandha", use: "Adaptogen, stress management, strength" },
  { name: "Brahmi", use: "Brain tonic, memory, anxiety, insomnia" },
  { name: "Turmeric (Haridra)", use: "Anti-inflammatory, liver support, immunity" },
  { name: "Guduchi", use: "Immunity, liver detox, anti-diabetic" },
  { name: "Shatavari", use: "Women's health, hormonal balance, digestion" },
];

function TreatmentsSection() {
  return (
    <div>
      <SectionHeading label="Treatments Available" title={<>Panchakarma & <em className="not-italic text-gold">Herbal Medicine</em></>}
        subtitle="Our in-house Ayurvedic pharmacy compounds hundreds of classical formulations. Our Panchakarma treatments are administered by trained therapists under physician supervision."
      />
      <h3 className="font-display font-semibold text-forest text-lg mb-5">Panchakarma Procedures</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {pancha.map((p, i) => (
          <motion.div key={p.name}
            className="bg-white rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover transition-all"
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>
            <h4 className="font-display font-semibold text-forest text-base mb-2">{p.name}</h4>
            <p className="font-body text-forest/60 text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
      <h3 className="font-display font-semibold text-forest text-lg mb-5">Key Herbal Formulations</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {herbals.map((h) => (
          <div key={h.name} className="bg-sage/5 rounded-xl p-4 border border-sage/20">
            <div className="font-display font-semibold text-forest text-sm mb-1">{h.name}</div>
            <div className="font-body text-sage text-xs leading-relaxed">{h.use}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Conditions ─── */
const conditions = [
  { name: "Arthritis & Joint Disorders", icon: "🦴" },
  { name: "Digestive Disorders (IBS, Colitis)", icon: "🫃" },
  { name: "Skin Diseases (Psoriasis, Eczema)", icon: "🌿" },
  { name: "Liver & Kidney Conditions", icon: "🔬" },
  { name: "Respiratory Disorders", icon: "🌬️" },
  { name: "Hormonal Imbalances (PCOS, Thyroid)", icon: "⚖️" },
  { name: "Neurological Disorders", icon: "⚡" },
  { name: "Chronic Fatigue Syndrome", icon: "🔋" },
  { name: "Obesity & Metabolic Issues", icon: "🏃" },
  { name: "Anxiety & Depression", icon: "🧠" },
  { name: "Cardiovascular Conditions", icon: "❤️" },
  { name: "Autoimmune Conditions", icon: "🛡️" },
];

function ConditionsSection() {
  return (
    <div>
      <SectionHeading label="Conditions Treated" title={<>Ayurveda's <em className="not-italic text-gold">Scope of Healing</em></>}
        subtitle="Ayurveda at Arogyadhama is integrated with modern diagnostics — combining ancient assessment with lab tests for maximum precision."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {conditions.map((c, i) => (
          <motion.div key={c.name}
            className="bg-white rounded-xl p-4 border border-border shadow-card text-center hover:border-sage/30 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.3 }}>
            <div className="font-display font-semibold text-forest text-sm leading-tight">{c.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Integration Section ─── */
function IntegrationSection() {
  return (
    <div>
      <SectionHeading label="Integration with Yoga" title={<>Ayurveda + Yoga: <em className="not-italic text-gold">Sister Sciences</em></>}
        subtitle="Ayurveda and Yoga are twin pillars of India's healing tradition — designed to work together. At Arogyadhama, they are never separated."
      />
      <div className="space-y-5">
        {[
          { t: "Ayurveda Prepares the Body, Yoga Works the Mind", d: "Panchakarma treatments clear physical obstructions and toxins, creating the physiological conditions for Yoga therapy to work most effectively. A body in Ama (toxic buildup) cannot fully benefit from asana or pranayama." },
          { t: "Complementary Doshas", d: "Yoga's specific techniques are chosen based on Ayurvedic Prakriti — Vata types receive grounding asanas, Pitta types receive cooling pranayama, Kapha types receive stimulating practices." },
          { t: "Shared Dietary Principles", d: "The therapeutic diet at Arogyadhama is simultaneously Sattvic (Yoga-aligned) and Ayurvedically appropriate for the patient's constitution — a seamless integration that reinforces both systems." },
        ].map((p, i) => (
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

export default function Ayurveda() {
  return (
    <TherapyPageTemplate
      config={{
        therapyKey: "ayurveda",
        breadcrumbLabel: "Ayurveda",
        heroGradient: "linear-gradient(135deg, hsl(168 25% 18%) 0%, hsl(168 25% 28%) 50%, hsl(168 19% 35%) 100%)",
        heroImage: ayurvedaHero,
        // Keeps his head and the therapist's hands clear of the top crop on wide screens.
        heroImagePosition: "center 30%",
        
        heroTagline: "Tridosha · Panchakarma · Prakriti",
        heroTitle: "Ayurveda",
        heroSubtitle: "India's 5,000-year-old science of life — practised at Arogyadhama as personalised constitutional medicine with modern integration.",
        sections: [
          { id: "approach", label: "Our Approach", content: <ApproachSection /> },
          { id: "treatments", label: "Treatments", content: <TreatmentsSection /> },
          { id: "conditions", label: "Conditions Treated", content: <ConditionsSection /> },
          { id: "integration", label: "Yoga Integration", content: <IntegrationSection /> },
        ],
      }}
    />
  );
}