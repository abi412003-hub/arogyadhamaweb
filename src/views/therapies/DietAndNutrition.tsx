"use client";
import TherapyPageTemplate from "@/components/TherapyPageTemplate";
import { motion } from "framer-motion";
import dietHero from "@/assets/therapies/diet-and-nutrition-card.jpg";
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
        title={<>A Dietary Plan Built <em className="not-italic text-gold">Around You</em></>}
        subtitle="An individualized dietary plan designed to support each person's unique body, health needs, and recovery journey."
      />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>
          No two bodies are the same. Your constitution, your diagnosis, your digestion, and the stage of your recovery all shape what nourishment your body actually needs. At Arogyadhama, we treat diet as a personalised prescription — never a fixed, one-size-fits-all menu.
        </p>
        <p>
          Every plan begins with a careful assessment of your body type (Prakriti), current health condition, lifestyle, and where you are on your healing journey. From there, our dietitians and physicians craft a diet that is truly yours — and that keeps evolving, adjusting as your body responds and recovers.
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
        title={<>Nutrition Tailored to <em className="not-italic text-gold">Your Needs</em></>}
        subtitle="Every element of your plan is shaped to your body, your condition, and the stage of your recovery — not a generic template."
      />
      <BulletList
        items={[
          "A one-to-one dietary assessment of your body type, condition, and recovery stage",
          "A fully individualized diet chart — built for your needs, never a generic template",
          "Therapeutic, sattvic meals matched to your diagnosis and prepared fresh each day",
          "Ongoing adjustments as your body responds through the course of your stay",
          "Guidance for special requirements — diabetic, cardiac, renal, and weight-management diets",
          "A practical, personalised plan to continue your recovery diet at home",
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
        title={<>Tailored to <em className="not-italic text-gold">Your Condition</em></>}
        subtitle="Whatever you are healing from, your diet is shaped to your body's specific needs and recovery — a central part of managing and reversing many lifestyle and metabolic conditions."
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
        title={<>One Plan, <em className="not-italic text-gold">Your Whole Recovery</em></>}
        subtitle="Because it is built around your body, your individualized diet supports every other therapy and every stage of your healing journey."
      />
      <div className="space-y-5">
        {[
          { t: "Personalised to Your Body", d: "Built on your constitution and diagnosis, your plan is designed so the food works with your Yoga, Ayurveda, and Naturopathy treatments — reinforcing them rather than working against them." },
          { t: "Matched to Your Recovery Stage", d: "As you progress, your diet is reviewed and adjusted so nourishment always fits exactly where your body is on its healing journey." },
          { t: "Fuels Every Other Therapy", d: "The right food keeps you energised for asana practice, physiotherapy, and detox — making each session more effective and recovery faster." },
          { t: "Sustains Results at Home", d: "Healing doesn't end at discharge. You leave with a plan built for your life and needs, so the recovery you begin here continues long after your stay." },
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
        heroGradient: "linear-gradient(135deg, hsl(345 45% 18%) 0%, hsl(345 40% 26%) 50%, hsl(345 35% 30%) 100%)",
        heroTagline: "Food as Medicine · Clinical Nutrition",
        heroTitle: "Diet & Nutrition",
        heroImage: dietHero,
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
