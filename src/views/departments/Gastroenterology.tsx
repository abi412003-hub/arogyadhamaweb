"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";

const CONDITIONS = [
  { name: "Irritable Bowel Syndrome (IBS)", icon: "🫃", desc: "Gut-brain axis therapy" },
  { name: "Inflammatory Bowel Disease", icon: "🔴", desc: "Anti-inflammatory protocol" },
  { name: "GERD & Acid Reflux", icon: "🔥", desc: "Lifestyle & yoga management" },
  { name: "Peptic Ulcer Disease", icon: "💊", desc: "Stress reduction & diet therapy" },
  { name: "Non-Alcoholic Fatty Liver", icon: "🫀", desc: "Liver detox & yoga" },
  { name: "Hepatitis (chronic)", icon: "🔬", desc: "Liver function support" },
  { name: "Constipation", icon: "🌿", desc: "Triphala & yoga protocol" },
  { name: "Haemorrhoids", icon: "💆", desc: "Naturopathic & yoga relief" },
  { name: "Gallbladder Disorders", icon: "🍋", desc: "Diet & Ayurveda management" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Integrative <em className="not-italic text-gold">Gastroenterology</em></>}
        subtitle="The gut is the seat of immunity, mood, and metabolic health. Arogyadhama's gastroenterology department treats digestive conditions through the twin lenses of conventional gastroenterology and the Ayurvedic Agni (digestive fire) framework." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>In Ayurveda, <em>Agni</em> — digestive fire — is the cornerstone of all health. When Agni is impaired, Ama (metabolic toxins) accumulate, leading to systemic disease. This ancient concept maps precisely onto conventional understanding of gut microbiome health, intestinal permeability ('leaky gut'), and the gut-brain axis.</p>
        <p>Our gastroenterology protocols combine endoscopic diagnostics with comprehensive Ayurvedic digestive assessment, naturopathic fasting and diet therapy, specific yoga asanas for abdominal organ stimulation, and Ayurvedic formulations that are among the world's most researched digestive medicines.</p>
        <p>IBS — the most common functional gut disorder — responds particularly well to our integrative approach. The gut-brain axis connection means that yoga-based stress reduction directly reduces IBS symptom severity, while Ayurvedic herbs address the local gut inflammation and motility issues simultaneously.</p>
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Healing from the <em className="not-italic text-gold">Inside Out</em></>}
        subtitle="The digestive system is uniquely responsive to integrative interventions — every modality at Arogyadhama influences gut health through different and complementary pathways." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="Abdominal yoga asanas — Pavanamuktasana, Nauli, Agnisar Kriya — directly stimulate intestinal peristalsis, strengthen abdominal muscles, and improve portal circulation to the liver and digestive organs." />
        <IntegrativeCard therapy="Ayurveda" color="hsl(var(--sage))"
          desc="Triphala — the world's most studied gut herb — regulates bowel function, reduces intestinal inflammation, and acts as a prebiotic. Hingwastaka churna for IBS. Basti (therapeutic enema) for large intestine disorders." />
        <IntegrativeCard therapy="Naturopathy" color="hsl(200 60% 35%)"
          desc="Therapeutic fasting to rest the digestive system and allow gut healing. Enema therapy. High-fibre raw food diet. Abdominal mud packs reduce intestinal inflammation. Juice therapy for liver detoxification." />
        <IntegrativeCard therapy="Diet Therapy" color="hsl(var(--gold))"
          desc="Elimination diets to identify food sensitivities. Sattvic therapeutic diet rich in prebiotics and digestive enzymes. Specific foods as medicine: bitter gourd for liver, papaya for digestion, flaxseed for IBS." />
      </div>
    </div>
  );
}

export default function Gastroenterology() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "gastroenterology",
      breadcrumbLabel: "Gastroenterology",
      heroGradient: "linear-gradient(135deg, hsl(150 50% 12%) 0%, hsl(150 45% 19%) 50%, hsl(168 35% 24%) 100%)",
      heroTagline: "Gut Health · Agni Framework · Digestive Medicine",
      heroTitle: "Department of Gastroenterology",
      heroSubtitle: "Integrative gut health — healing IBS, liver conditions, and digestive disorders through the Ayurvedic Agni framework, therapeutic fasting, and yoga-based abdominal therapies.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Treat" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
      ],
    }} />
  );
}