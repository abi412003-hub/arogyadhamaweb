"use client";
import TherapyPageTemplate from "@/components/TherapyPageTemplate";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item} className="flex gap-3">
          <CheckCircle2 size={20} className="text-gold mt-0.5 flex-shrink-0" />
          <p className="font-body text-forest/70 text-sm leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Approach ─── */
function ApproachSection() {
  return (
    <div>
      <SectionHeading
        label="Food as Medicine"
        title={<>Personalised <em className="not-italic text-gold">Nutrition for Healing</em></>}
        subtitle="At Arogyadhama, diet is not an afterthought — it is a therapy in its own right. Every meal is designed to support your body's return to balance, guided by both Ayurvedic wisdom and modern clinical nutrition."
      />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>
          What you eat shapes how you heal. Non-communicable diseases — diabetes, hypertension, obesity, digestive and metabolic disorders — are deeply influenced by nutrition. Our dietitians work alongside the clinical team to translate your diagnosis into a practical, sustainable eating plan.
        </p>
        <p>
          Each plan begins with an assessment of your constitution (Prakriti), current condition, and lifestyle. From there we build a sattvic, wholesome diet — light, nourishing, and tailored to your therapy protocol — that complements your Yoga, Ayurveda, and Naturopathy treatments rather than working against them.
        </p>
      </div>
    </div>
  );
}

/* ─── What We Offer ─── */
function OfferingsSection() {
  return (
    <div>
      <SectionHeading
        label="What We Offer"
        title={<>A Complete <em className="not-italic text-gold">Nutrition Programme</em></>}
        subtitle="From individual diet charts to hands-on guidance, our nutrition support covers every stage of your healing journey."
      />
      <BulletList
        items={[
          "Individualised diet charts based on your body constitution and diagnosis",
          "Therapeutic, sattvic meal planning — three balanced meals prepared daily",
          "Nutrition counselling for diabetes, hypertension, obesity and thyroid disorders",
          "Gut-health and digestion support through easily assimilated, seasonal foods",
          "Weight-management and detox nutrition aligned with your treatment protocol",
          "Practical guidance to carry the diet forward at home after discharge",
        ]}
      />
    </div>
  );
}

/* ─── Conditions Supported ─── */
const conditions = [
  "Type 2 Diabetes",
  "Hypertension",
  "Obesity & Weight Management",
  "Thyroid Disorders",
  "Digestive & Gut Issues",
  "High Cholesterol",
  "PCOS",
  "Fatty Liver",
  "General Wellness & Detox",
];

function ConditionsSection() {
  return (
    <div>
      <SectionHeading
        label="Conditions Supported"
        title={<>Nutrition for <em className="not-italic text-gold">Everyday Healing</em></>}
        subtitle="Dietary therapy plays a central role in managing and reversing many lifestyle and metabolic conditions."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {conditions.map((c, i) => (
          <motion.div
            key={c}
            className="bg-white rounded-xl p-4 border border-border shadow-card text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <div className="font-display font-semibold text-forest text-sm">{c}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Integration ─── */
function IntegrationSection() {
  return (
    <div>
      <SectionHeading
        label="Integrative Advantage"
        title={<>Nutrition + <em className="not-italic text-gold">Every Other Therapy</em></>}
        subtitle="Diet is the thread that ties every modality together — the right food makes every other treatment work better."
      />
      <div className="space-y-5">
        {[
          { t: "Fuels Yoga & Physiotherapy", d: "A light, sattvic diet keeps the body agile and energised, so asana practice and rehabilitation exercises are more effective and recovery is faster." },
          { t: "Completes Ayurvedic Treatment", d: "Ayurveda considers diet (Ahara) the first medicine. Our nutrition plans are built on Tridosha principles so they reinforce your Ayurvedic protocol." },
          { t: "Amplifies Naturopathy & Detox", d: "Therapeutic foods and fasting protocols support the body's own cleansing processes, deepening the benefit of naturopathic treatments." },
          { t: "Sustains Results at Home", d: "Healing doesn't end at discharge. We equip you with a practical eating plan so the progress you make here continues in daily life." },
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

export default function DietAndNutrition() {
  return (
    <TherapyPageTemplate
      config={{
        therapyKey: "diet-and-nutrition",
        breadcrumbLabel: "Diet & Nutrition",
        heroGradient: "linear-gradient(135deg, hsl(105 45% 18%) 0%, hsl(120 40% 26%) 50%, hsl(150 35% 30%) 100%)",
        heroTagline: "Food as Medicine · Clinical Nutrition",
        heroTitle: "Diet & Nutrition",
        heroSubtitle: "Personalized nutrition plans for holistic health and wellness — sattvic, therapeutic meals designed around your constitution and condition to support every stage of healing.",
        sections: [
          { id: "approach", label: "Our Approach", content: <ApproachSection /> },
          { id: "offerings", label: "What We Offer", content: <OfferingsSection /> },
          { id: "conditions", label: "Conditions Supported", content: <ConditionsSection /> },
          { id: "integration", label: "Integration", content: <IntegrationSection /> },
        ],
      }}
    />
  );
}
