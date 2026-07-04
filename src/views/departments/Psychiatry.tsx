"use client";
import DepartmentPageTemplate, { SectionHeading, ConditionGrid, IntegrativeCard, TeamCard } from "@/components/DepartmentPageTemplate";
import psychiatryHero from "@/assets/departments/psychiatry-hero.jpg";

const CONDITIONS = [
  { name: "Anxiety Disorders", icon: "😰", desc: "Pranayama & meditation protocols" },
  { name: "Clinical Depression", icon: "💙", desc: "Yoga & psychotherapy combined" },
  { name: "Insomnia & Sleep Disorders", icon: "😴", desc: "MSRT & sleep hygiene" },
  { name: "OCD & Phobias", icon: "🔄", desc: "Behavioural & yoga therapy" },
  { name: "Stress & Burnout", icon: "🔥", desc: "Comprehensive de-stress protocol" },
  { name: "PTSD", icon: "💭", desc: "Trauma-sensitive yoga" },
  { name: "Psychosomatic Disorders", icon: "🧬", desc: "Adhi-Vyadhi framework" },
  { name: "Bipolar Disorder (stable)", icon: "⚖️", desc: "Mood stabilisation support" },
  { name: "Addiction & Substance Use", icon: "🌿", desc: "Yoga-based de-addiction" },
];

function AboutSection() {
  return (
    <div>
      <SectionHeading label="About This Department" title={<>Mind-Body <em className="not-italic text-gold">Psychiatry</em></>}
        subtitle="Arogyadhama's psychiatry department is rooted in the ancient Indian understanding of the mind-body connection — the Adhi-Vyadhi concept — and applies conventional psychotherapy alongside integrative mind-body interventions." />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>In Ayurvedic and Yogic philosophy, <em>Adhi</em> refers to psychic (mental) disturbances, and <em>Vyadhi</em> to somatic (physical) disease. The Adhi-Vyadhi concept recognises that most chronic physical illness has a psychological root — and conversely, mental illness manifests in the body. This integrated understanding is at the heart of Arogyadhama's psychiatric care.</p>
        <p>Modern psychoneuroimmunology has validated what these ancient texts described: chronic stress, anxiety, and depression alter immune function, hormonal balance, cardiovascular health, and gut microbiome — creating systemic physical disease. Our psychiatric protocols therefore address mind and body simultaneously.</p>
        <p>Specific Yoga interventions — including MSRT, Cyclic Meditation, Yoga Nidra, and group Maitri Milan — have been shown in clinical studies to significantly reduce anxiety and depression scores, improve sleep quality, and enhance overall psychological wellbeing.</p>
      </div>
      <div className="bg-purple-900 rounded-2xl p-6">
        <p className="font-quote italic text-cream/85 text-lg leading-relaxed">
          "Mental illness is not a character weakness — it is a physiological imbalance that responds profoundly to the right combination of ancient mind-body practices and conventional psychological science."
        </p>
        <div className="mt-3 font-body text-gold/70 text-sm">— Department of Psychiatry, Arogyadhama</div>
      </div>
    </div>
  );
}

function IntegrativeSection() {
  return (
    <div>
      <SectionHeading label="Our Integrative Approach" title={<>Healing the <em className="not-italic text-gold">Mind Through the Body</em></>}
        subtitle="The Adhi-Vyadhi model guides every psychiatric protocol at Arogyadhama — addressing mental illness through both psychological and physiological interventions simultaneously." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IntegrativeCard therapy="Yoga Therapy" color="hsl(var(--forest))"
          desc="MSRT (Mind Sound Resonance Technique) for anxiety — shown to reduce HAM-A scores by 40%. Yoga Nidra for insomnia. Cyclic Meditation for depression. Om Meditation for limbic system regulation." />
        <IntegrativeCard therapy="Maitri Milan (Group Therapy)" color="hsl(270 50% 40%)"
          desc="Daily group sharing sessions create the social connection that is one of the most powerful predictors of mental health recovery. Peer support, normalization of experience, and shared hope." />
        <IntegrativeCard therapy="Ayurveda" color="hsl(var(--sage))"
          desc="Brahmi (Bacopa monnieri) for cognitive function and anxiety. Ashwagandha for stress and adrenal support. Jatamansi for insomnia. Shirodhara for deep nervous system calming." />
        <IntegrativeCard therapy="Naturopathy" color="hsl(200 60% 35%)"
          desc="Therapeutic diet: Sattvic foods that support serotonin production. Gut-brain axis optimisation through probiotics and fibre. Eliminating processed foods, caffeine, and sugar that destabilise mood." />
      </div>
    </div>
  );
}

export default function Psychiatry() {
  return (
    <DepartmentPageTemplate config={{
      deptKey: "psychiatry",
      breadcrumbLabel: "Psychiatry",
      heroGradient: "linear-gradient(135deg, hsl(270 50% 13%) 0%, hsl(270 45% 20%) 50%, hsl(240 35% 25%) 100%)",
      heroImage: psychiatryHero,
      heroImageAlt: "Human head profile with glowing brain and nerve pathways",
      heroImageBlend: "270 50% 13%",
      heroTagline: "Mind & Emotions · Adhi-Vyadhi Framework",
      heroTitle: "Department of Psychiatry",
      heroSubtitle: "Mind-body psychiatry rooted in the ancient Adhi-Vyadhi concept — combining yoga therapy, Ayurvedic nervines, and conventional psychotherapy to heal anxiety, depression, and psychosomatic disorders.",
      sections: [
        { id: "about", label: "About", content: <AboutSection /> },
        { id: "conditions", label: "Conditions Treated", content: <div><SectionHeading label="Conditions We Treat" title={<>Our <em className="not-italic text-gold">Specialisations</em></>} /><ConditionGrid conditions={CONDITIONS} /></div> },
        { id: "approach", label: "Integrative Approach", content: <IntegrativeSection /> },
      ],
    }} />
  );
}