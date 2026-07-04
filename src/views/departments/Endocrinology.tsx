"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";
import endocrinologyHero from "@/assets/departments/endocrinology-hero.jpg";

const CONDITIONS = [
  { name: "Hypothyroidism", icon: "🐢", desc: "Thyroid stimulation & hormone balance" },
  { name: "Hyperthyroidism", icon: "⚡", desc: "Calming & regulation protocol" },
  { name: "PCOS / PCOD", icon: "🌸", desc: "Hormonal balance & fertility support" },
  { name: "Adrenal Fatigue", icon: "🔋", desc: "HPA axis restoration" },
  { name: "Cushing's Syndrome", icon: "⚖️", desc: "Cortisol management support" },
  { name: "Insulin Resistance", icon: "🔬", desc: "Metabolic sensitivity restoration" },
  { name: "Male Hypogonadism", icon: "⚕️", desc: "Hormonal support therapy" },
  { name: "Growth Disorders", icon: "📏", desc: "Yoga & nutrition support" },
  { name: "Hormonal Obesity", icon: "🏃", desc: "Endocrine-based weight management" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Integrative <em className="not-italic text-gold">Endocrinology</em></>}
        subtitle="Hormonal imbalances are quintessential lifestyle diseases — shaped by chronic stress, poor nutrition, sleep deprivation, and environmental toxins. Arogyadhama's integrative endocrinology approach addresses all these root causes simultaneously." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>The endocrine system — a network of glands that produce and regulate hormones — is profoundly sensitive to lifestyle factors. Chronic stress dysregulates the HPA (hypothalamic-pituitary-adrenal) axis, suppressing thyroid function, disrupting sex hormones, and driving insulin resistance.</p>
        <p>Yoga therapy is uniquely positioned to address endocrine disorders because it directly modulates the HPA axis — the master regulator of all stress hormones. Research from S-VYASA demonstrates measurable reductions in cortisol, improvements in thyroid function parameters, and restoration of menstrual regularity in PCOS patients through targeted yoga protocols.</p>
        <p>Specific Ayurvedic herbs — Ashwagandha for adrenal health, Shatavari for female hormonal balance, Guggul for thyroid function — are among the world's most extensively researched adaptogenic and endocrine-supportive botanicals.</p>
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Rebalancing the <em className="not-italic text-gold">Hormonal System</em></>}
        subtitle="Endocrine health requires addressing the whole person — the HPA axis that drives cortisol, the gut-thyroid connection, the insulin-ovarian axis in PCOS — all simultaneously." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="Sarvangasana (shoulder stand) directly stimulates the thyroid gland. Bhujangasana activates adrenal function. Cyclic Meditation reduces cortisol — the primary disruptor of hormonal balance. Specific PCOS yoga protocol restores menstrual regularity." />
        <IntegrativeCard therapy="Ayurveda" color="hsl(var(--sage))"
          desc="Ashwagandha — the world's best-studied adaptogen — modulates cortisol and improves thyroid function (T3/T4). Shatavari for PCOS and female hormonal balance. Guggul stimulates thyroid activity in hypothyroid patients." />
        <IntegrativeCard therapy="Naturopathy" color="hsl(200 60% 35%)"
          desc="Elimination of endocrine disruptors from diet. Iodine-rich foods for thyroid support. Specific micronutrient protocols for thyroid (selenium, zinc, iodine). Anti-inflammatory diet for PCOS." />
        <IntegrativeCard therapy="Lifestyle Medicine" color="hsl(var(--gold))"
          desc="Sleep optimisation — growth hormone, thyroid, and sex hormones are all primarily secreted during deep sleep. Circadian rhythm restoration through structured daily routine (Dinacharya)." />
      </div>
    </div>
  );
}

export default function Endocrinology() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "endocrinology",
      breadcrumbLabel: "Endocrinology",
      heroGradient: "linear-gradient(135deg, hsl(43 55% 13%) 0%, hsl(43 50% 20%) 50%, hsl(43 40% 26%) 100%)",
      heroImage: endocrinologyHero,
      heroImageAlt: "Glowing thyroid gland in a translucent human body",
      heroImageBlend: "43 55% 13%",
      heroTagline: "Hormonal Health · HPA Axis · Lifestyle Medicine",
      heroTitle: "Department of Endocrinology",
      heroSubtitle: "Integrative hormonal medicine — addressing thyroid disorders, PCOS, adrenal fatigue, and metabolic endocrine conditions through yoga therapy, Ayurvedic adaptogens, and lifestyle medicine.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Treat" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
      ],
    }} />
  );
}