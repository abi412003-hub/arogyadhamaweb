"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";

const CONDITIONS = [
  { name: "Chronic Low Back Pain", icon: "🦴", desc: "CLBP — yoga-based relief" },
  { name: "Cervical Spondylosis", icon: "🪬", desc: "Neck pain & stiffness" },
  { name: "Lumbar Disc Herniation", icon: "💊", desc: "Non-surgical disc management" },
  { name: "Sciatica", icon: "⚡", desc: "Nerve pain relief" },
  { name: "Scoliosis", icon: "〰️", desc: "Postural correction" },
  { name: "Ankylosing Spondylitis", icon: "🏃", desc: "Mobility preservation" },
  { name: "Spinal Stenosis", icon: "🔍", desc: "Decompression & pain relief" },
  { name: "Postural Disorders", icon: "🧍", desc: "Alignment correction" },
  { name: "Piriformis Syndrome", icon: "💪", desc: "Hip & sciatic relief" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Integrative <em className="not-italic text-gold">Spinal Care</em></>}
        subtitle="Chronic low back pain is the world's leading cause of disability. Arogyadhama's spinal disorders department has developed some of the most evidence-based yoga protocols for spinal conditions — with S-VYASA research to support every intervention." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>The Department of Spinal Disorders at Arogyadhama specialises in the management of chronic low back pain (CLBP), spinal flexibility restoration, and comprehensive pain management for spinal conditions — without surgery where possible.</p>
        <p>Our approach is grounded in two key principles: (1) the spine heals through movement, not rest — specific, therapeutically designed Yoga asanas restore intervertebral disc hydration, spinal flexibility, and core muscle strength; (2) pain is a biopsychosocial phenomenon — the pain experience is profoundly influenced by stress, catastrophising, and mood, all of which Yoga therapy addresses directly.</p>
        <p>S-VYASA's published research on Yoga for CLBP demonstrates significant reductions in pain scores, disability indices, and analgesic requirements — with improvements maintained at long-term follow-up.</p>
      </div>
      <div className="bg-forest rounded-2xl p-6">
        <p className="font-quote italic text-cream/85 text-lg leading-relaxed">
          "The spine does not benefit from bed rest. It benefits from intelligent movement — carefully designed yoga asanas that restore disc health, strengthen supporting muscles, and retrain movement patterns."
        </p>
        <div className="mt-3 font-body text-gold/70 text-sm">— Spinal Disorders Department, Arogyadhama</div>
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Restoring <em className="not-italic text-gold">Spinal Health</em></>}
        subtitle="The spinal disorders protocol at Arogyadhama integrates back-care yoga, Ayurvedic Basti therapy, physiotherapy, and pain psychology for comprehensive spinal rehabilitation." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="Back-care yoga asanas: Makarasana, Bhujangasana, Shalabhasana — prescribed in progressive sequences based on MRI findings and functional assessment. Core strengthening with Navasana and Paripurna Navasana variations." />
        <IntegrativeCard therapy="Ayurveda" color="hsl(var(--sage))"
          desc="Kati Basti (warm oil pool on lower back) is the definitive Ayurvedic treatment for CLBP — reducing inflammation and nourishing the lumbar vertebrae. Basti (medicated enema) for Vata-driven spinal disorders." />
        <IntegrativeCard therapy="Physiotherapy" color="hsl(var(--gold))"
          desc="McKenzie Method for disc conditions. IFT and ultrasound for acute pain. Core stabilisation programme. Postural correction and ergonomic education — essential for preventing recurrence." />
        <IntegrativeCard therapy="Naturopathy" color="hsl(200 60% 35%)"
          desc="Mud packs on the lumbar spine reduce inflammation. Cold packs for acute flares. Anti-inflammatory diet reduces systemic inflammation that drives discogenic pain." />
      </div>
    </div>
  );
}

export default function SpinalDisorders() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "spinal",
      breadcrumbLabel: "Spinal Disorders",
      heroGradient: "linear-gradient(135deg, hsl(27 60% 15%) 0%, hsl(27 55% 22%) 50%, hsl(43 40% 25%) 100%)",
      heroTagline: "Spine & Back · CLBP · Pain Management",
      heroTitle: "Department of Spinal Disorders",
      heroSubtitle: "Evidence-based integrative spinal care — yoga therapy, Ayurvedic Kati Basti, and physiotherapy for chronic low back pain, disc disorders, and complete spinal rehabilitation.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Treat" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
      ],
    }} />
  );
}