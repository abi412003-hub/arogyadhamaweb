"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";

const CONDITIONS = [
  { name: "Hypertension", icon: "❤️", desc: "Yoga proven to reduce BP by 10-15 mmHg" },
  { name: "Coronary Artery Disease", icon: "🫀", desc: "Lifestyle reversal programme" },
  { name: "Cardiac Rehabilitation", icon: "🏥", desc: "Post-MI & post-surgery recovery" },
  { name: "Heart Failure (stable)", icon: "💙", desc: "Quality of life improvement" },
  { name: "Arrhythmias", icon: "📈", desc: "Vagal tone & HRV improvement" },
  { name: "High Cholesterol", icon: "🔬", desc: "Diet & yoga lipid management" },
  { name: "Metabolic Syndrome", icon: "⚖️", desc: "Comprehensive lifestyle reversal" },
  { name: "Peripheral Vascular Disease", icon: "🩸", desc: "Circulation improvement protocols" },
  { name: "Stress-Related Cardiac Risk", icon: "🧠", desc: "HPA axis regulation" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Integrative <em className="not-italic text-gold">Cardiology</em></>}
        subtitle="Arogyadhama's cardiology department specialises in lifestyle-based cardiovascular medicine — using the power of Yoga, Ayurveda, and therapeutic diet to reverse, manage, and rehabilitate heart conditions." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>Cardiovascular disease is the world's leading cause of mortality — and the majority of risk factors are lifestyle-modifiable. At Arogyadhama, we treat hypertension, CAD, and cardiac risk factors as conditions that can be profoundly influenced by the integrative medicine approach.</p>
        <p>S-VYASA's landmark research on Yoga's cardiovascular effects demonstrates statistically significant reductions in blood pressure, heart rate, and sympathetic nervous activity. Specific pranayama practices like Bhramari have been shown to lower blood pressure within minutes — effects confirmed by clinical trials.</p>
        <p>Our cardiac rehabilitation programme combines gentle yoga therapy, progressive physiotherapy, Ayurvedic cardioprotective herbs (Arjuna, Guggul), and a comprehensive therapeutic diet to support complete cardiac recovery.</p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[{ n: "10-15", l: "mmHg BP reduction with Yoga" }, { n: "40%", l: "Cardiac risk reduction with lifestyle changes" }, { n: "30%", l: "Improved HRV with pranayama" }].map((s) => (
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
      <SectionHeading label="Our Integrative Approach" title={<>Healing the <em className="not-italic text-gold">Heart</em></>}
        subtitle="Cardiovascular health is profoundly influenced by lifestyle, stress, diet, and nervous system balance — all areas where integrative medicine excels." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="Slow pranayama (Bhramari, Nadi Shodhana) activates the parasympathetic nervous system, reducing heart rate and blood pressure. Cyclic Meditation reduces cortisol and improves cardiac autonomic balance." />
        <IntegrativeCard therapy="Ayurveda" color="hsl(var(--sage))"
          desc="Arjuna (Terminalia arjuna) — the heart herb — is the cornerstone of Ayurvedic cardiac care. Guggul manages cholesterol. Punarnava addresses fluid retention. All integrated with conventional lipid management." />
        <IntegrativeCard therapy="Naturopathy" color="hsl(200 60% 35%)"
          desc="Therapeutic diet: low-fat, high-fibre, plant-based with therapeutic fasting protocols. Garlic therapy. Hydrotherapy improves peripheral circulation and cardiac efficiency." />
        <IntegrativeCard therapy="Physiotherapy" color="hsl(var(--gold))"
          desc="Graded cardiac rehabilitation exercise programme — carefully monitored and progressively intensified. ECG monitoring during early rehabilitation phases ensures safety." />
      </div>
    </div>
  );
}

export default function Cardiology() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "cardiology",
      breadcrumbLabel: "Cardiology",
      heroGradient: "linear-gradient(135deg, hsl(0 60% 15%) 0%, hsl(0 55% 22%) 50%, hsl(27 40% 25%) 100%)",
      heroTagline: "Heart Health · Cardiac Rehabilitation",
      heroTitle: "Department of Cardiology",
      heroSubtitle: "Lifestyle-based cardiovascular medicine — using Yoga therapy, Ayurvedic cardioprotective herbs, and therapeutic diet to manage, rehabilitate, and reverse heart disease.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Treat" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
      ],
    }} />
  );
}