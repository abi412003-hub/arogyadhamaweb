"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";
import pulmonologyHero from "@/assets/departments/pulmonology-hero.jpg";

const CONDITIONS = [
  { name: "Bronchial Asthma", icon: "🌬️", desc: "Pranayama-based asthma reversal" },
  { name: "COPD", icon: "🫁", desc: "Breathing capacity improvement" },
  { name: "Chronic Bronchitis", icon: "🔴", desc: "Mucus clearance protocols" },
  { name: "Sinusitis", icon: "👃", desc: "Jala Neti & steam therapy" },
  { name: "Nasal Allergies", icon: "🤧", desc: "Immune desensitisation" },
  { name: "Pleural Conditions", icon: "🫧", desc: "Respiratory support therapy" },
  { name: "Pulmonary Fibrosis", icon: "🔬", desc: "Quality of life improvement" },
  { name: "Breathing Disorders", icon: "😮‍💨", desc: "Breathing retraining" },
  { name: "Sleep Apnoea", icon: "😴", desc: "Yoga & weight management" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Integrative <em className="not-italic text-gold">Respiratory Care</em></>}
        subtitle="The Pulmonology department at Arogyadhama has pioneered the use of pranayama and yoga-based breathing therapy for respiratory conditions — with research evidence spanning three decades." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>Asthma, COPD, and chronic bronchitis are conditions where the integrative medicine advantage is particularly compelling. Specific pranayama techniques — Bhastrika, Kapalbhati, Ujjayi, and slow breathing practices — have been clinically demonstrated to improve FEV1 (lung function), reduce bronchospasm, and decrease inhaler dependence.</p>
        <p>Jala Neti (nasal irrigation), a classical Hatha Yoga Shatkarma technique, has been shown in clinical trials to significantly reduce nasal allergy symptoms and sinusitis — as effective as nasal corticosteroid sprays for many patients.</p>
        <p>Our pulmonology team combines these yoga-based interventions with Ayurvedic bronchodilator herbs (Vasaka, Kantakari, Pippali), naturopathic steam inhalation, and conventional pulmonological assessment for a truly comprehensive respiratory care programme.</p>
      </div>
      <div className="bg-maroon rounded-2xl p-6">
        <p className="font-quote italic text-cream/85 text-lg leading-relaxed">
          "Every breath is medicine. Pranayama teaches the respiratory system to work more efficiently — expanding lung capacity, reducing hypersensitivity, and calming the airway smooth muscle that drives bronchospasm."
        </p>
        <div className="mt-3 font-body text-gold/70 text-sm">— Pulmonology Department, Arogyadhama</div>
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Breathing New <em className="not-italic text-gold">Life</em></>}
        subtitle="The lungs respond more readily to integrative interventions than almost any other organ system — making pulmonology one of our strongest departments." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IntegrativeCard therapy="Yoga Therapy (Pranayama)" color="hsl(var(--forest))"
          desc="Bhastrika purifies the bronchi. Slow pranayama reduces airway hypersensitivity. Jala Neti clears sinuses and reduces nasal allergy. Kapalbhati strengthens respiratory muscles." />
        <IntegrativeCard therapy="Ayurveda" color="hsl(var(--sage))"
          desc="Vasaka (Malabar nut) is the premier Ayurvedic bronchodilator. Kantakari and Pippali reduce airway inflammation. Sitopaladi Churna for chronic cough. Vyaghri Haritaki for COPD." />
        <IntegrativeCard therapy="Naturopathy" color="hsl(200 60% 35%)"
          desc="Steam inhalation with eucalyptus and camphor loosens mucus. Chest packs reduce inflammation. Hydrotherapy contrast treatments improve bronchial circulation." />
        <IntegrativeCard therapy="Diet Therapy" color="hsl(var(--gold))"
          desc="Anti-inflammatory, mucus-reducing therapeutic diet. Avoidance of dairy, refined foods, and cold items. Honey, ginger, and turmeric incorporated therapeutically." />
      </div>
    </div>
  );
}

export default function Pulmonology() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "pulmonology",
      breadcrumbLabel: "Pulmonology",
      heroGradient: "linear-gradient(135deg, hsl(200 60% 14%) 0%, hsl(200 50% 20%) 50%, hsl(180 35% 25%) 100%)",
      heroImage: pulmonologyHero,
      heroImageAlt: "Glowing lungs inside a translucent human body",
      heroImageBlend: "200 60% 14%",
      heroTagline: "Respiratory Health · Pranayama Therapy",
      heroTitle: "Department of Pulmonology",
      heroSubtitle: "Breathing new life — integrative respiratory medicine using pranayama, Ayurvedic herbs, and naturopathic therapies to heal asthma, COPD, and chronic respiratory conditions.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Treat" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
      ],
    }} />
  );
}