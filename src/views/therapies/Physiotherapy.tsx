"use client";
import TherapyPageTemplate from "@/components/TherapyPageTemplate";
import { motion } from "framer-motion";
import { CheckCircle2, Activity } from "lucide-react";
import physiotherapyHero from "@/assets/therapy-physiotherapy.jpg";

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
  return (
    <div>
      <SectionHeading label="Movement as Medicine" title={<>The <em className="not-italic text-gold">Science of Rehabilitation</em></>}
        subtitle="Physiotherapy at Arogyadhama goes beyond conventional rehab — it's integrated with Yoga, Ayurveda, and naturopathic principles for comprehensive physical restoration."
      />
      <div className="space-y-4 font-body text-forest/70 leading-relaxed mb-8">
        <p>
          The human body is designed to move. When movement is disrupted — by injury, surgery, neurological damage, or chronic disease — the physiotherapy department at Arogyadhama creates the pathway back to functional freedom.
        </p>
        <p>
          Our physiotherapists hold advanced qualifications and work as part of the integrated clinical team, collaborating with Yoga therapists and Ayurvedic physicians to design protocols that address not just biomechanical restoration, but the complete physical wellbeing of the patient.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { icon: "🏃", title: "Movement Analysis", desc: "Detailed gait and posture assessment forms the foundation of every physiotherapy protocol at Arogyadhama." },
          { icon: "⚡", title: "Electrotherapy", desc: "TENS, ultrasound, IFT, and other electrophysical agents for pain management and tissue healing." },
          { icon: "🤝", title: "Manual Therapy", desc: "Hands-on techniques including joint mobilisation, manipulation, and soft tissue release." },
        ].map((c) => (
          <div key={c.title} className="bg-white rounded-2xl p-5 border border-border shadow-card text-center">
            
            <h4 className="font-display font-semibold text-forest text-base mb-2">{c.title}</h4>
            <p className="font-body text-forest/60 text-sm leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-6" style={{ background: "hsl(var(--gold) / 0.08)", border: "1px solid hsl(var(--gold) / 0.2)" }}>
        <p className="font-quote italic text-forest text-lg">
          "Physiotherapy at Arogyadhama is not about pain management alone — it's about restoring the patient's confidence in their own body. When movement returns, hope returns."
        </p>
        <div className="mt-3 font-body text-sage text-sm">— Physiotherapy Department, Arogyadhama</div>
      </div>
    </div>
  );
}

/* ─── Techniques ─── */
const techniques = [
  {
    category: "Exercise Therapy",
    items: [
      { name: "Therapeutic Exercise", desc: "Structured, graded exercise programmes to restore strength, endurance, and functional capacity after injury or illness." },
      { name: "Neurological Rehabilitation", desc: "Specialised exercises for stroke, Parkinson's, and other neurological conditions — using neuroplasticity principles." },
      { name: "Balance & Proprioception Training", desc: "Rebuilding the body's sense of position and balance, particularly important for elderly patients and post-stroke rehabilitation." },
      { name: "Breathing Exercises", desc: "Diaphragmatic and pursed-lip breathing coordinated with movement — essential for pulmonary and cardiac rehabilitation." },
    ],
  },
  {
    category: "Electrotherapy",
    items: [
      { name: "TENS (Transcutaneous Electrical Nerve Stimulation)", desc: "Pain-blocking electrical current for chronic musculoskeletal pain, neuropathy, and post-surgical pain." },
      { name: "Ultrasound Therapy", desc: "High-frequency sound waves for deep tissue healing, calcific deposits, and joint conditions." },
      { name: "Interferential Therapy (IFT)", desc: "Medium-frequency electrical current that penetrates deeper than TENS — for deep muscular pain and circulatory stimulation." },
      { name: "Shortwave Diathermy", desc: "Deep heating treatment for chronic joint conditions, sinusitis, and sub-acute musculoskeletal disorders." },
    ],
  },
  {
    category: "Manual & Other Therapy",
    items: [
      { name: "Joint Mobilisation", desc: "Graded oscillatory movements applied to joints to restore range of motion, reduce pain, and improve joint nutrition." },
      { name: "Soft Tissue Mobilisation", desc: "Techniques including myofascial release, trigger point therapy, and deep friction massage for muscle and fascia conditions." },
      { name: "Taping (Kinesio & Rigid)", desc: "Supportive taping for acute injuries, postural correction, and support during activity — widely used in sports rehabilitation." },
      { name: "Hydrotherapy (Physio)", desc: "Pool-based exercises that use water's buoyancy to allow pain-free movement — particularly valuable for arthritis and obesity." },
    ],
  },
];

function TechniquesSection() {
  return (
    <div>
      <SectionHeading label="Techniques We Use" title={<>Rehabilitation <em className="not-italic text-gold">Methods</em></>}
        subtitle="Our physiotherapy department is equipped with modern technology while maintaining the integrative philosophy that defines Arogyadhama."
      />
      <div className="space-y-8">
        {techniques.map((cat) => (
          <div key={cat.category}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center">
                <Activity size={16} className="text-gold" />
              </div>
              <h3 className="font-display font-semibold text-forest text-xl">{cat.category}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.items.map((item, i) => (
                <motion.div key={item.name}
                  className="bg-white rounded-xl p-5 border border-border shadow-card"
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}>
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
  { n: "Post-Stroke Rehabilitation", i: "🧠" }, { n: "Back & Neck Pain", i: "🦴" }, { n: "Knee Osteoarthritis", i: "🦿" },
  { n: "Post-Surgical Recovery", i: "🏥" }, { n: "Frozen Shoulder", i: "💪" }, { n: "Sports Injuries", i: "⚽" },
  { n: "Parkinson's Disease", i: "⚡" }, { n: "Cerebral Palsy", i: "🌟" }, { n: "Scoliosis & Postural Disorders", i: "🪄" },
  { n: "Fibromyalgia", i: "🌿" }, { n: "Cardiac Rehabilitation", i: "❤️" }, { n: "Pulmonary Rehabilitation", i: "🌬️" },
];

function ConditionsSection() {
  return (
    <div>
      <SectionHeading label="Conditions Treated" title={<>Restoring <em className="not-italic text-gold">Functional Freedom</em></>}
        subtitle="From post-stroke paralysis to post-surgical recovery, our physiotherapy department addresses a wide spectrum of musculoskeletal and neurological conditions."
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
      <SectionHeading label="Integrative Advantage" title={<>Physiotherapy + <em className="not-italic text-gold">Yoga: Stronger Together</em></>}
        subtitle="At Arogyadhama, physiotherapy and Yoga therapy are practiced as complementary sciences — each enhancing the other's effectiveness."
      />
      <div className="space-y-5">
        {[
          { t: "Yoga Enhances Proprioception", d: "Yoga asanas develop body awareness and proprioceptive sensitivity that complements physiotherapy balance training — patients who practice both show faster recovery of coordination after neurological injury." },
          { t: "Physiotherapy Builds the Foundation for Yoga", d: "For patients with structural limitations, physiotherapy first restores joint mobility and muscular balance — creating the physical prerequisites for safe, therapeutic Yoga practice." },
          { t: "Pranayama Supports Physical Rehabilitation", d: "Breathing exercises from Yoga directly improve exercise tolerance and respiratory efficiency — critical for cardiac and pulmonary rehabilitation patients." },
          { t: "Shared Goal: Functional Independence", d: "Both Yoga therapy and physiotherapy ultimately aim to restore the patient's capacity for independent, pain-free movement — making their combination more powerful than either alone." },
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

export default function Physiotherapy() {
  return (
    <TherapyPageTemplate
      config={{
        therapyKey: "physiotherapy",
        breadcrumbLabel: "Physiotherapy",
        heroGradient: "linear-gradient(135deg, hsl(43 60% 20%) 0%, hsl(43 55% 28%) 50%, hsl(27 45% 32%) 100%)",
        heroTagline: "Rehabilitation · Movement Science",
        heroTitle: "Physiotherapy",
        heroSubtitle: "Evidence-based movement medicine for rehabilitation, mobility restoration, and post-surgical recovery — integrated with Yoga therapy for complete physical healing.",
        heroImage: physiotherapyHero,
        sections: [
          { id: "approach", label: "Our Approach", content: <ApproachSection /> },
          { id: "techniques", label: "Techniques", content: <TechniquesSection /> },
          { id: "conditions", label: "Conditions Treated", content: <ConditionsSection /> },
          { id: "integration", label: "Yoga Integration", content: <IntegrationSection /> },
        ],
      }}
    />
  );
}