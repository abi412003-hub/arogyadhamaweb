"use client";
import TherapyPageTemplate from "@/components/TherapyPageTemplate";
import { motion } from "framer-motion";
import { CheckCircle2, Droplets } from "lucide-react";
import naturopathyHero from "@/assets/therapies/naturopathy-hero.jpg";

function SectionHeading({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">{label}</span>
      <h2 className="font-display text-display-md text-forest mt-2 mb-3">{title}</h2>
      {subtitle && <p className="font-body text-forest/65 leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

/* ─── Approach ─── */
function ApproachSection() {
  const principles = [
    { n: "Vis Medicatrix Naturae", d: "The healing power of nature — the body has an innate intelligence to heal itself when given the right conditions." },
    { n: "Tolle Causam", d: "Treat the cause — not just symptoms. Naturopathy seeks the root factors: diet, toxins, stress, lifestyle." },
    { n: "First Do No Harm", d: "Gentle, non-invasive treatments that support the body's own healing mechanisms without side effects." },
    { n: "Treat the Whole Person", d: "Physical, mental, emotional, and spiritual health are inseparable. All must be addressed for lasting healing." },
  ];

  return (
    <div>
      <SectionHeading label="The Naturopathic Way" title={<>Healing Through <em className="not-italic text-gold">Nature's Power</em></>}
        subtitle="Naturopathy is the art of using nature's medicines — water, earth, sunlight, air, and therapeutic fasting — to activate the body's profound capacity for self-healing."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {principles.map((p, i) => (
          <motion.div key={p.n}
            className="bg-white rounded-2xl p-5 border border-border shadow-card"
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <Droplets size={16} className="text-blue-600" />
            </div>
            <h4 className="font-display font-semibold text-forest text-base mb-1.5">{p.n}</h4>
            <p className="font-body text-forest/60 text-sm leading-relaxed">{p.d}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-blue-900 rounded-2xl p-6">
        <p className="font-quote italic text-cream/90 text-lg">
          "The greatest medicine is the body's own intelligence. Naturopathy at Arogyadhama simply creates the conditions for that intelligence to express itself fully."
        </p>
        <div className="mt-3 font-body text-cream/60 text-sm">— Naturopathy Department, Arogyadhama</div>
      </div>
    </div>
  );
}

/* ─── Treatments ─── */
const treatments = [
  {
    category: "Hydrotherapy",
    icon: "💧",
    items: [
      { name: "Immersion Baths", desc: "Hot, cold, or contrast baths to improve circulation, relieve pain, and support detoxification." },
      { name: "Hot & Cold Packs", desc: "Alternating temperature packs applied to specific body regions for pain, inflammation, and injury healing." },
      { name: "Steam Bath (Sauna)", desc: "Whole-body hyperthermia to eliminate toxins, improve skin, and support immune function." },
      { name: "Hip Bath & Sitz Bath", desc: "Targeted water therapy for urogenital, digestive, and pelvic conditions." },
    ],
  },
  {
    category: "Mud Therapy",
    icon: "🌍",
    items: [
      { name: "Mud Pack (Local)", desc: "Application of therapeutic clay mud to specific areas for pain relief, inflammation reduction, and skin healing." },
      { name: "Mud Bath (Full Body)", desc: "Immersion in natural therapeutic mud rich in minerals for detoxification and rejuvenation." },
      { name: "Abdominal Mud Pack", desc: "Specifically prescribed for digestive disorders, liver conditions, and constipation." },
    ],
  },
  {
    category: "Fasting Therapy",
    icon: "🌿",
    items: [
      { name: "Fruit Fast", desc: "Supervised fruit-only diet to rest the digestive system and reduce toxic load." },
      { name: "Juice Fasting", desc: "Fresh vegetable and fruit juices provide nutrition while allowing cellular detoxification." },
      { name: "Complete Therapeutic Fasting", desc: "Medically supervised water fasting for specific conditions — maximum detoxification." },
    ],
  },
  {
    category: "Other Modalities",
    icon: "☀️",
    items: [
      { name: "Chromotherapy (Colour Therapy)", desc: "Using specific wavelengths of coloured light for skin conditions, neurological support, and mood disorders." },
      { name: "Sunlight Therapy (Heliotherapy)", desc: "Controlled sunlight exposure for Vitamin D, skin conditions, and immune support." },
      { name: "Therapeutic Diet", desc: "Sattvic, high-fibre, low-fat therapeutic diets customised per condition by our nutritionists." },
    ],
  },
];

function TreatmentsSection() {
  return (
    <div>
      <SectionHeading label="Treatments Available" title={<>Nature's <em className="not-italic text-gold">Healing Arsenal</em></>}
        subtitle="At Arogyadhama, naturopathic treatments are prescribed by qualified physicians and administered by trained therapists in purpose-built treatment centres."
      />
      <div className="space-y-8">
        {treatments.map((cat, ci) => (
          <div key={cat.category}>
            <div className="mb-4">
              <h3 className="font-display font-semibold text-forest text-xl">{cat.category}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.items.map((item, i) => (
                <motion.div key={item.name}
                  className="bg-white rounded-xl p-5 border border-border shadow-card"
                  initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}>
                  <h4 className="font-display font-semibold text-forest text-sm mb-1.5">{item.name}</h4>
                  <p className="font-body text-forest/60 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Conditions ─── */
const conditions = [
  { n: "Hypertension", i: "❤️" }, { n: "Diabetes", i: "🔬" }, { n: "Obesity", i: "⚖️" },
  { n: "Digestive Disorders", i: "🫃" }, { n: "Skin Diseases", i: "🌿" }, { n: "Arthritis", i: "🦴" },
  { n: "Respiratory Conditions", i: "🌬️" }, { n: "Liver Disorders", i: "🔴" }, { n: "Kidney Conditions", i: "💧" },
  { n: "Stress & Anxiety", i: "🧠" }, { n: "Headaches & Migraine", i: "💆" }, { n: "Insomnia", i: "😴" },
];

function ConditionsSection() {
  return (
    <div>
      <SectionHeading label="Conditions Treated" title={<>The <em className="not-italic text-gold">Healing Range</em></>}
        subtitle="Naturopathy is particularly effective for chronic lifestyle diseases where conventional medicine manages symptoms but doesn't address root causes."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {conditions.map((c, i) => (
          <motion.div key={c.n}
            className="bg-white rounded-xl p-4 border border-border shadow-card text-center"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.3 }}>
            <div className="font-display font-semibold text-forest text-sm">{c.n}</div>
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
      <SectionHeading label="Therapeutic Synergy" title={<>Naturopathy & <em className="not-italic text-gold">Yoga: Nature Meets Mind</em></>}
        subtitle="Naturopathy and Yoga therapy are complementary sciences that together address the full spectrum of healing — external body and internal mind."
      />
      <div className="space-y-5">
        {[
          { t: "Detox Prepares for Deeper Yoga Practice", d: "Naturopathic fasting and hydrotherapy remove toxins that otherwise inhibit the neurophysiological changes Yoga induces. A cleaner system responds more readily to pranayama and meditation." },
          { t: "Diet Is Medicine in Both Systems", d: "Naturopathy's emphasis on whole foods and therapeutic diet aligns with Yoga's Sattvic dietary principles — together creating a nutritional environment that supports healing." },
          { t: "Water Therapy Complements Breathwork", d: "Hydrotherapy improves circulation and oxygenation, directly enhancing the outcomes of pranayama practice. The two modalities reinforce each other physiologically." },
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

export default function Naturopathy() {
  return (
    <TherapyPageTemplate
      config={{
        therapyKey: "naturopathy",
        breadcrumbLabel: "Naturopathy",
        heroGradient: "linear-gradient(135deg, hsl(200 50% 15%) 0%, hsl(200 40% 22%) 50%, hsl(168 25% 30%) 100%)",
        heroTagline: "Hydrotherapy · Mud Therapy · Fasting",
        heroTitle: "Naturopathy",
        heroSubtitle: "Healing through nature's own medicines — water, earth, sunlight, and therapeutic diet — activating the body's profound innate capacity for self-healing.",
        heroImage: naturopathyHero,
        sections: [
          { id: "approach", label: "Our Approach", content: <ApproachSection /> },
          { id: "treatments", label: "Treatments", content: <TreatmentsSection /> },
          { id: "conditions", label: "Conditions Treated", content: <ConditionsSection /> },
          { id: "integration", label: "Yoga Synergy", content: <IntegrationSection /> },
        ],
      }}
    />
  );
}