"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";
import rheumaHero1 from "@/assets/departments/rheumatology-hero-1.jpg";
import rheumaHero2 from "@/assets/departments/rheumatology-hero-2.jpg";
import rheumaHero3 from "@/assets/departments/rheumatology-hero-3.jpg";

const CONDITIONS = [
  { name: "Osteoarthritis", icon: "🦴", desc: "Joint mobility & pain relief" },
  { name: "Rheumatoid Arthritis", icon: "🤝", desc: "Inflammation reduction protocol" },
  { name: "Gouty Arthritis", icon: "🔴", desc: "Diet & uric acid management" },
  { name: "Psoriatic Arthritis", icon: "🌿", desc: "Skin & joint combined care" },
  { name: "Lupus (SLE)", icon: "🦋", desc: "Immune modulation therapy" },
  { name: "Fibromyalgia", icon: "⚡", desc: "Pain sensitisation management" },
  { name: "Ankylosing Spondylitis", icon: "🏃", desc: "Spinal mobility preservation" },
  { name: "Polymyalgia Rheumatica", icon: "💪", desc: "Inflammation & function" },
  { name: "Sjogren's Syndrome", icon: "💧", desc: "Symptom management" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Integrative <em className="not-italic text-gold">Rheumatology</em></>}
        subtitle="Rheumatic conditions — characterised by chronic inflammation, joint destruction, and systemic involvement — respond exceptionally well to Arogyadhama's anti-inflammatory integrative protocol." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>Osteoarthritis, rheumatoid arthritis, gouty arthritis, and other rheumatic conditions are among the most prevalent chronic diseases globally — and among the conditions where integrative medicine offers the most powerful complementary interventions.</p>
        <p>Ayurvedic Panchakarma treatments — particularly Basti (medicated enema) and Abhyanga (oil massage) with anti-inflammatory herbal oils — have been shown in clinical trials to significantly reduce joint pain, swelling, and stiffness. Specific yoga asanas, carefully adapted for joint limitation, restore mobility without aggravating inflammation.</p>
        <p>Our naturopathic anti-inflammatory diet, combined with Ayurvedic herbs like Boswellia (Shallaki), Guggul, and Nirgundi, creates a powerful internal anti-inflammatory environment that reduces disease activity and medication requirements over time.</p>
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Reducing <em className="not-italic text-gold">Inflammation Naturally</em></>}
        subtitle="Rheumatic conditions are inflammation-driven — and integrative medicine has powerful tools to reduce systemic and local inflammation without the long-term side effects of chronic immunosuppression." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="Specifically adapted joint-care yoga — Pawanmuktasana series reduces joint stiffness and improves synovial fluid circulation. Pranayama reduces systemic inflammation markers. Cyclic Meditation lowers cortisol that drives autoimmune activity." />
        <IntegrativeCard therapy="Ayurveda (Panchakarma)" color="hsl(var(--sage))"
          desc="Abhyanga with Mahanarayana taila reduces joint inflammation. Janu Basti (oil pooling on knee) for osteoarthritis. Shallaki (Boswellia), Guggul, and Nirgundi for systemic anti-inflammatory effect." />
        <IntegrativeCard therapy="Naturopathy" color="hsl(200 60% 35%)"
          desc="Anti-inflammatory diet: Mediterranean-style with turmeric, ginger, omega-3 emphasis. Mud packs on affected joints reduce local inflammation. Contrast hydrotherapy improves joint circulation." />
        <IntegrativeCard therapy="Physiotherapy" color="hsl(var(--gold))"
          desc="Joint-specific exercise programmes to maintain mobility, prevent contractures, and strengthen supporting musculature. Thermotherapy and electrotherapy for acute pain management." />
      </div>
    </div>
  );
}

export default function Rheumatology() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "rheumatology",
      breadcrumbLabel: "Rheumatology",
      heroGradient: "linear-gradient(135deg, hsl(345 40% 13%) 0%, hsl(345 38% 20%) 50%, hsl(345 35% 25%) 100%)",
      heroImage: [rheumaHero1, rheumaHero2, rheumaHero3],
      heroImageAlt: "Glowing inflamed joints — elbow, knee and ankle",
      heroImageBlend: "168 40% 13%",
      heroTagline: "Joints & Musculoskeletal · Anti-Inflammatory Medicine",
      heroTitle: "Department of Rheumatology",
      heroSubtitle: "Integrative rheumatology — reducing joint inflammation, restoring mobility, and managing autoimmune conditions through Yoga therapy, Ayurvedic Panchakarma, and naturopathic anti-inflammatory protocols.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Treat" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
      ],
    }} />
  );
}