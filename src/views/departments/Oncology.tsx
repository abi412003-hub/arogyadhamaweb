"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";
import oncologyHero from "@/assets/departments/oncology-hero.jpg";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const CONDITIONS = [
  { name: "Cancer Supportive Care", icon: "🎗️", desc: "Improving quality of life during treatment" },
  { name: "Chemo Side-Effect Management", icon: "💊", desc: "Nausea, fatigue, neuropathy relief" },
  { name: "Radiotherapy Support", icon: "⚡", desc: "Reducing radiation-related fatigue" },
  { name: "Immune System Restoration", icon: "🛡️", desc: "Post-treatment immune rebuild" },
  { name: "Cancer-Related Fatigue", icon: "🔋", desc: "Yoga-based energy restoration" },
  { name: "Anxiety & Depression (Cancer)", icon: "🧠", desc: "Psycho-oncology support" },
  { name: "Lymphedema Management", icon: "💧", desc: "Lymphatic drainage & yoga" },
  { name: "Lifestyle Modification", icon: "🌿", desc: "Prevention & recurrence reduction" },
  { name: "Pain Management", icon: "🩺", desc: "Integrative pain protocols" },
  { name: "Nutritional Support", icon: "🥗", desc: "Anti-cancer dietary guidance" },
  { name: "Sleep Disturbances", icon: "😴", desc: "MSRT for cancer-related insomnia" },
  { name: "Post-Surgery Rehabilitation", icon: "🏥", desc: "Recovery & mobility restoration" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Integrative <em className="not-italic text-gold">Oncology Care</em></>}
        subtitle="Arogyadhama's oncology department provides comprehensive complementary care alongside conventional cancer treatment — improving quality of life, reducing treatment side effects, and supporting the whole patient through the cancer journey." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>Cancer treatment — chemotherapy, radiotherapy, surgery — is powerful but often accompanied by debilitating side effects: severe fatigue, nausea, peripheral neuropathy, immune suppression, anxiety, and depression. Arogyadhama's integrative oncology approach addresses all these dimensions simultaneously.</p>
        <p>Our approach does not replace conventional oncology. Instead, it powerfully complements it — using yoga therapy to reduce treatment-related fatigue, Ayurvedic immunomodulators to support the immune system, naturopathic detoxification protocols to assist the body's recovery, and psycho-oncology interventions to address the profound emotional impact of cancer.</p>
        <p>Research from S-VYASA demonstrates significant improvements in quality of life, immune markers, and psychological wellbeing in cancer patients who integrate yoga therapy with conventional treatment.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{ n: "Supportive", l: "Role — alongside conventional treatment" }, { n: "Evidence", l: "Based — yoga for cancer research" }, { n: "Holistic", l: "Care — body, mind & spirit" }].map((s) => (
          <div key={s.n} className="bg-white rounded-xl p-4 border border-border shadow-card text-center">
            <div className="font-display font-bold text-gold text-xl mb-1">{s.n}</div>
            <div className="font-body text-sage text-xs">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Caring for the <em className="not-italic text-gold">Whole Patient</em></>}
        subtitle="In oncology, quality of life is as important as clinical outcomes. Our integrative protocol addresses every dimension of the cancer experience." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="Gentle, cancer-adapted yoga reduces fatigue, improves sleep, and significantly lowers anxiety. MSRT and Yoga Nidra are specifically prescribed for chemo-related insomnia and anxiety." />
        <IntegrativeCard therapy="Ayurveda" color="hsl(var(--sage))"
          desc="Immunomodulatory herbs — Guduchi, Ashwagandha, Tulsi — support immune function during and after treatment. Panchakarma protocols assist post-treatment detoxification under physician supervision." />
        <IntegrativeCard therapy="Naturopathy" color="hsl(200 60% 35%)"
          desc="Anti-cancer diet rich in phytonutrients, antioxidants, and immune-supporting foods. Juice therapy and controlled fasting protocols support detoxification during recovery periods." />
        <IntegrativeCard therapy="Psycho-Oncology" color="hsl(270 50% 40%)"
          desc="Group therapy sessions using Maitri Milan create powerful social support networks. Individual counselling addresses fear, existential distress, and family communication challenges." />
      </div>
      <div className="bg-forest rounded-2xl p-6">
        <p className="font-quote italic text-cream/85 text-lg leading-relaxed">
          "Our cancer patients do not just survive treatment — they reclaim their quality of life. Yoga gives them agency in their healing journey at a time when they can feel utterly powerless."
        </p>
        <div className="mt-3 font-body text-gold/70 text-sm">— Oncology Department, Arogyadhama</div>
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <div>
      <SectionHeading label="Our Team" title={<>Expert <em className="not-italic text-gold">Care Team</em></>} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <TeamCard name="Oncology Consultant" qual="MD, DM (Oncology)" role="Senior Consultant" />
        <TeamCard name="Yoga Therapist (Onco)" qual="MSc Yoga Therapy" role="Cancer-Adapted Yoga Lead" />
        <TeamCard name="Psycho-Oncologist" qual="MSc Psychology, PhD" role="Psycho-Oncology Support" />
      </div>
    </div>
  );
}

export default function Oncology() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "oncology",
      breadcrumbLabel: "Oncology",
      heroGradient: "linear-gradient(135deg, hsl(340 60% 15%) 0%, hsl(340 50% 22%) 50%, hsl(300 30% 25%) 100%)",
      heroImage: oncologyHero,
      heroImageAlt: "Cancer cells and DNA strands",
      heroImageBlend: "340 60% 15%",
      heroTagline: "Cancer Care & Support · Integrative Oncology",
      heroTitle: "Department of Oncology",
      heroSubtitle: "Comprehensive complementary cancer care — reducing treatment side effects, restoring quality of life, and supporting the complete cancer journey through integrative medicine.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Support" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
      ],
    }} />
  );
}