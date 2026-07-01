"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";

const CONDITIONS = [
  { name: "Type 2 Diabetes Mellitus", icon: "🔬", desc: "Yoga-based blood sugar reversal" },
  { name: "Pre-Diabetes", icon: "📊", desc: "Prevention & reversal" },
  { name: "Insulin Resistance", icon: "⚡", desc: "Metabolic sensitivity restoration" },
  { name: "Metabolic Syndrome", icon: "⚖️", desc: "Comprehensive lifestyle reversal" },
  { name: "Obesity & Overweight", icon: "🏃", desc: "Yoga-based weight management" },
  { name: "Dyslipidaemia", icon: "🩸", desc: "Cholesterol & triglyceride management" },
  { name: "NAFLD (Fatty Liver)", icon: "🫀", desc: "Lifestyle-based liver health" },
  { name: "Hypertriglyceridaemia", icon: "📉", desc: "Diet & yoga management" },
  { name: "Hyperuricaemia (Gout)", icon: "🔴", desc: "Uric acid normalisation" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Integrative <em className="not-italic text-gold">Diabetes & Metabolic Care</em></>}
        subtitle="S-VYASA's work on Yoga for Diabetes is landmark — including 56,000 diabetic patients treated through 7,500 camps. This research legacy forms the foundation of Arogyadhama's world-class metabolic medicine department." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>Arogyadhama's Diabetes & Metabolic Department represents one of the institution's greatest strengths. Under the leadership of Dr. R. Nagarathna and the research vision of Dr. H. R. Nagendra, S-VYASA has built the world's largest evidence base for Yoga's effects on metabolic disorders — including Type 2 Diabetes, obesity, and metabolic syndrome.</p>
        <p>The landmark 2015 <em>Diabetes Care</em> paper demonstrating Yoga's ability to reduce HbA1c, fasting blood glucose, and lipid profiles in Type 2 Diabetics is a cornerstone of this body of work. Our clinical protocol is directly derived from this research — every intervention is evidence-based and outcomes-measured.</p>
        <p>The Yoga for Diabetes protocol combines specific asanas (Pawanmuktasana series, Dhanurasana, Sarvangasana) that stimulate pancreatic function, pranayama that reduces cortisol-driven insulin resistance, and meditation that addresses the psychosocial stress that exacerbates metabolic disorders.</p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { n: "56,000", l: "Diabetic patients in S-VYASA camps" },
          { n: "7,500", l: "Camps conducted across India" },
          { n: "30%", l: "Average HbA1c reduction" },
        ].map((s) => (
          <div key={s.l} className="bg-white rounded-xl p-4 border border-border shadow-card">
            <div className="font-display font-bold text-gold text-xl mb-1">{s.n}</div>
            <div className="font-body text-sage text-xs leading-relaxed">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Reversing Diabetes <em className="not-italic text-gold">Naturally</em></>}
        subtitle="Diabetes is a lifestyle disease — created by lifestyle factors and reversible by lifestyle interventions. Our protocol targets every metabolic pathway simultaneously." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="Pancreatic-stimulating asanas (Dhanurasana, Ardha Matsyendrasana, Paschimottanasana). Pranayama reduces cortisol-driven insulin resistance. Cyclic Meditation activates GLUT-4 receptors — the same mechanism as exercise." />
        <IntegrativeCard therapy="Ayurveda" color="hsl(var(--sage))"
          desc="Karela (bitter gourd), Methi (fenugreek), Gudmar (Gymnema sylvestre) — scientifically validated anti-diabetic herbs prescribed as classical formulations. Panchakarma reduces Ama (metabolic toxins)." />
        <IntegrativeCard therapy="Naturopathy (Diet Therapy)" color="hsl(200 60% 35%)"
          desc="Low-glycaemic, high-fibre therapeutic diet. Intermittent fasting protocols under medical supervision. Raw food therapy. Elimination of refined carbohydrates and inflammatory foods." />
        <IntegrativeCard therapy="Exercise & Physiotherapy" color="hsl(var(--gold))"
          desc="Resistance training and aerobic exercise prescribed as medicine — with heart rate monitoring. Improves insulin sensitivity by a mechanism independent of and complementary to yoga therapy." />
      </div>
    </div>
  );
}

export default function Diabetes() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "diabetes",
      breadcrumbLabel: "Diabetes & Metabolic",
      heroGradient: "linear-gradient(135deg, hsl(43 70% 13%) 0%, hsl(43 65% 20%) 50%, hsl(27 50% 24%) 100%)",
      heroTagline: "Metabolic Health · 56,000 Patients Treated",
      heroTitle: "Diabetes & Metabolic Department",
      heroSubtitle: "India's most researched integrative diabetes programme — S-VYASA's landmark studies, 56,000 patients, and 30+ years of Yoga-based metabolic reversal form the foundation of our care.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Treat" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
      ],
    }} />
  );
}