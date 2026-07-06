"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ChevronRight } from "lucide-react";

/* ─── Breadcrumb ─── */
function Breadcrumb() {
  return (
    <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60">
      <Link to="/" className="hover:text-gold transition-colors">Home</Link>
      <ChevronRight size={12} />
      <span className="text-cream/90">Therapies</span>
    </nav>
  );
}

/* ─── Healing Wheel ─── */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSegmentPath(cx: number, cy: number, innerR: number, outerR: number, a1: number, a2: number) {
  const p1 = polarToCartesian(cx, cy, outerR, a1);
  const p2 = polarToCartesian(cx, cy, outerR, a2);
  const p3 = polarToCartesian(cx, cy, innerR, a2);
  const p4 = polarToCartesian(cx, cy, innerR, a1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${outerR} ${outerR} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${innerR} ${innerR} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
}

const CX = 220, CY = 220;
const INNER_R = 62, OUTER_R = 155, OUTER_HOVER_R = 162;
const LABEL_R = 182;
const GAP = 3;

const SEG_SIZE = 360 / 8; // 45° per segment (8 therapies)
const HALF = SEG_SIZE / 2;
const START_MID = -90; // first segment centered at top

const SEGMENTS = [
  {
    key: "yoga",
    label: "Yoga\nTherapy",
    href: "/therapies/yoga",
    a1: START_MID - HALF + GAP / 2,
    a2: START_MID + HALF - GAP / 2,
    mid: START_MID,
    fill: "#1B4332",
    hoverFill: "#2D6A4F",
  },
  {
    key: "ayurveda",
    label: "Ayurveda",
    href: "/therapies/ayurveda",
    a1: START_MID + SEG_SIZE - HALF + GAP / 2,
    a2: START_MID + SEG_SIZE + HALF - GAP / 2,
    mid: START_MID + SEG_SIZE,
    fill: "#52796F",
    hoverFill: "#6A9E94",
  },
  {
    key: "naturopathy",
    label: "Naturo-\npathy",
    href: "/therapies/naturopathy",
    a1: START_MID + 2 * SEG_SIZE - HALF + GAP / 2,
    a2: START_MID + 2 * SEG_SIZE + HALF - GAP / 2,
    mid: START_MID + 2 * SEG_SIZE,
    fill: "#2C6E49",
    hoverFill: "#3D9966",
  },
  {
    key: "acupuncture",
    label: "Acupunc-\nture",
    href: "/therapies/acupuncture",
    a1: START_MID + 3 * SEG_SIZE - HALF + GAP / 2,
    a2: START_MID + 3 * SEG_SIZE + HALF - GAP / 2,
    mid: START_MID + 3 * SEG_SIZE,
    fill: "#B8860B",
    hoverFill: "#D4A820",
  },
  {
    key: "physiotherapy",
    label: "Physio-\ntherapy",
    href: "/therapies/physiotherapy",
    a1: START_MID + 4 * SEG_SIZE - HALF + GAP / 2,
    a2: START_MID + 4 * SEG_SIZE + HALF - GAP / 2,
    mid: START_MID + 4 * SEG_SIZE,
    fill: "#D4A574",
    hoverFill: "#E8C9A0",
  },
  {
    key: "yogic-counselling",
    label: "Yogic\nCounselling",
    href: "/therapies/yogic-counselling",
    a1: START_MID + 5 * SEG_SIZE - HALF + GAP / 2,
    a2: START_MID + 5 * SEG_SIZE + HALF - GAP / 2,
    mid: START_MID + 5 * SEG_SIZE,
    fill: "#3D5A4A",
    hoverFill: "#5A8070",
  },
  {
    key: "ozone",
    label: "Ozone\nTherapy",
    href: "/therapies/ozone",
    a1: START_MID + 6 * SEG_SIZE - HALF + GAP / 2,
    a2: START_MID + 6 * SEG_SIZE + HALF - GAP / 2,
    mid: START_MID + 6 * SEG_SIZE,
    fill: "#3A7CA5",
    hoverFill: "#5BA0CC",
  },
  {
    key: "diet-and-nutrition",
    label: "Diet &\nNutrition",
    href: "/therapies/diet-and-nutrition",
    a1: START_MID + 7 * SEG_SIZE - HALF + GAP / 2,
    a2: START_MID + 7 * SEG_SIZE + HALF - GAP / 2,
    mid: START_MID + 7 * SEG_SIZE,
    fill: "#5FA83E",
    hoverFill: "#7CC65A",
  },
];

function HealingWheel() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 440 440"
        className="w-full max-w-[500px]"
        style={{ overflow: "visible" }}
      >
        {/* Subtle outer ring decoration */}
        <circle cx={CX} cy={CY} r={OUTER_R + 30} stroke="hsl(var(--sage) / 0.15)" strokeWidth="1" fill="none" strokeDasharray="4 6" />
        <circle cx={CX} cy={CY} r={OUTER_R + 48} stroke="hsl(var(--gold) / 0.08)" strokeWidth="1" fill="none" strokeDasharray="2 8" />

        {/* Connecting spokes */}
        {SEGMENTS.map((s) => {
          const spokeEnd = polarToCartesian(CX, CY, INNER_R + 8, s.mid);
          const spokeStart = polarToCartesian(CX, CY, OUTER_R - 8, s.mid);
          return (
            <line
              key={s.key + "-spoke"}
              x1={spokeStart.x} y1={spokeStart.y}
              x2={spokeEnd.x} y2={spokeEnd.y}
              stroke="hsl(51 97% 94% / 0.15)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          );
        })}

        {/* Segments */}
        {SEGMENTS.map((s) => {
          const isHov = hovered === s.key;
          const outerR = isHov ? OUTER_HOVER_R : OUTER_R;
          const path = donutSegmentPath(CX, CY, INNER_R, outerR, s.a1, s.a2);
          const labelPos = polarToCartesian(CX, CY, LABEL_R + (isHov ? 14 : 8), s.mid);
          const lines = s.label.split("\n");

          return (
            <g key={s.key}>
              <Link to={s.href}>
                <path
                  d={path}
                  fill={isHov ? s.hoverFill : s.fill}
                  stroke="hsl(51 97% 94% / 0.1)"
                  strokeWidth="1"
                  style={{
                    transition: "all 0.3s ease",
                    filter: isHov ? `drop-shadow(0 4px 12px ${s.fill}80)` : "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHovered(s.key)}
                  onMouseLeave={() => setHovered(null)}
                />
              </Link>

              {/* Icon removed */}

              {/* Outer label */}
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                fill={isHov ? s.hoverFill : "hsl(var(--forest))"}
                fontSize="10.5"
                fontFamily="'Playfair Display', serif"
                fontWeight="600"
                style={{ transition: "all 0.3s", pointerEvents: "none" }}
              >
                {lines.map((line, i) => (
                  <tspan key={i} x={labelPos.x} dy={i === 0 ? -((lines.length - 1) * 6) : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {/* Center circle */}
        <circle cx={CX} cy={CY} r={INNER_R - 4} fill="white" stroke="hsl(var(--gold))" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r={INNER_R - 12} fill="hsl(var(--cream))" stroke="hsl(var(--gold) / 0.3)" strokeWidth="1" />

        {/* Center text */}
        <text x={CX} y={CY - 8} textAnchor="middle" fill="hsl(var(--forest))" fontSize="20" fontFamily="'Playfair Display', serif">
          🧑
        </text>
        <text x={CX} y={CY + 8} textAnchor="middle" fill="hsl(var(--forest))" fontSize="9" fontFamily="'Source Sans 3', sans-serif" fontWeight="600">
          YOU
        </text>
        <text x={CX} y={CY + 19} textAnchor="middle" fill="hsl(var(--sage))" fontSize="7.5" fontFamily="'Source Sans 3', sans-serif">
          Patient
        </text>

        {/* Hover tooltip connector */}
        {hovered && (() => {
          const seg = SEGMENTS.find((s) => s.key === hovered)!;
          const tipR = OUTER_R + 68;
          const pos = polarToCartesian(CX, CY, tipR, seg.mid);
          return (
            <g style={{ pointerEvents: "none" }}>
              <rect
                x={pos.x - 55}
                y={pos.y - 15}
                width="110"
                height="28"
                rx="6"
                fill={seg.fill}
                opacity="0.92"
              />
              <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="white" fontSize="9" fontFamily="'Source Sans 3', sans-serif" fontWeight="600">
                Click to explore →
              </text>
            </g>
          );
        })()}
      </svg>

      <p className="font-body text-sage text-sm mt-2 text-center">
        Hover each segment · Click to explore
      </p>
    </div>
  );
}

/* ─── Therapy Cards ─── */
const therapyCards = [
  {
    key: "yoga",
    title: "Yoga Therapy",
    href: "/therapies/yoga",
    color: "text-forest",
    iconBg: "hsl(var(--forest) / 0.08)",
    tagline: "Ancient mind-body science backed by modern research",
    details: [
      "Cyclic Meditation & MSRT for deep relaxation",
      "Pranayama for nervous system regulation",
      "Om Meditation & Trataka for mental clarity",
      "400+ PubMed-indexed research papers",
    ],
    borderColor: "hsl(var(--forest))",
  },
  {
    key: "ayurveda",
    title: "Ayurveda",
    href: "/therapies/ayurveda",
    color: "text-sage",
    iconBg: "hsl(var(--sage) / 0.1)",
    tagline: "Personalised herbal healing for complete systemic balance",
    details: [
      "Panchakarma detoxification protocols",
      "Individualised Prakriti assessment",
      "Herbal formulations from licensed pharmacy",
      "Dietary guidance based on Tridosha theory",
    ],
    borderColor: "hsl(var(--sage))",
  },
  {
    key: "naturopathy",
    title: "Naturopathy",
    href: "/therapies/naturopathy",
    color: "text-blue-600",
    iconBg: "hsl(210 80% 50% / 0.08)",
    tagline: "Healing through nature's own medicine — water, mud, and sunlight",
    details: [
      "Hydrotherapy: baths, packs, and immersions",
      "Mud therapy for pain and skin conditions",
      "Therapeutic fasting and detox protocols",
      "Chromotherapy and sunlight treatments",
    ],
    borderColor: "hsl(210 60% 45%)",
  },
  {
    key: "acupuncture",
    title: "Acupuncture",
    href: "/therapies/acupuncture",
    color: "text-terracotta",
    iconBg: "hsl(var(--terracotta) / 0.1)",
    tagline: "Ancient Chinese meridian therapy for pain relief and energy restoration",
    details: [
      "Traditional acupuncture at precise meridian points",
      "Auricular (ear) acupuncture protocols",
      "Acupressure for self-management",
      "Evidence-based pain and neurological support",
    ],
    borderColor: "hsl(var(--terracotta))",
  },
  {
    key: "physiotherapy",
    title: "Physiotherapy",
    href: "/therapies/physiotherapy",
    color: "text-gold",
    iconBg: "hsl(var(--gold) / 0.1)",
    tagline: "Movement science for rehabilitation, mobility and strength",
    details: [
      "Post-surgical rehabilitation protocols",
      "Neurological rehabilitation for stroke recovery",
      "Manual therapy and joint mobilisation",
      "Electrotherapy and ultrasound treatments",
    ],
    borderColor: "hsl(var(--gold))",
  },
  {
    key: "yogic-counselling",
    title: "Yogic Counselling & Psychotherapy",
    href: "/therapies/yogic-counselling",
    color: "text-forest",
    iconBg: "hsl(var(--forest) / 0.08)",
    tagline: "Mind-centred dialogue rooted in yoga psychology and modern therapeutic science",
    details: [
      "One-to-one counselling guided by yogic principles",
      "Stress, anxiety & depression management protocols",
      "Mindfulness, self-awareness & emotional regulation",
      "Integrates CBT with Patanjali's Yoga Sutras",
    ],
    borderColor: "hsl(var(--forest))",
  },
  {
    key: "ozone",
    title: "Ozone Therapy",
    href: "/therapies/ozone",
    color: "text-blue-600",
    iconBg: "hsl(200 80% 50% / 0.08)",
    tagline: "Medical oxygen-ozone therapy for oxygenation, detox and immune support",
    details: [
      "Major & minor autohaemotherapy protocols",
      "Rectal & topical insufflation techniques",
      "Boosts cellular oxygenation & metabolism",
      "Supports chronic infections & inflammation",
    ],
    borderColor: "hsl(200 60% 45%)",
  },
  {
    key: "diet-and-nutrition",
    title: "Diet & Nutrition",
    href: "/therapies/diet-and-nutrition",
    color: "text-green-600",
    iconBg: "hsl(105 46% 45% / 0.1)",
    tagline: "Personalized nutrition plans for holistic health and wellness",
    details: [
      "Individualised diet charts based on your constitution",
      "Therapeutic & sattvic meal planning",
      "Nutrition support for chronic-disease management",
      "Guidance rooted in Ayurveda and modern dietetics",
    ],
    borderColor: "hsl(105 46% 45%)",
  },
];

/* ─── Main Therapies Overview Page ─── */
export default function Therapies() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden bg-forest-dark">
        {/* Subtle gradient accent */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top right, hsl(var(--forest) / 0.4), transparent 60%)" }} />

        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Breadcrumb />
            <h1 className="font-display text-cream font-bold mt-5" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              Our Integrative<br />Healing Modalities
            </h1>
            <p className="font-body text-cream/85 mt-4 max-w-xl" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
              Eight integrative sciences, one modern approach to complete wellness — united around the patient at the centre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Healing Wheel */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">The Integration Model</span>
            <h2 className="font-display text-display-md text-forest mt-4">
              The Arogyadhama <em className="not-italic text-gold">Healing Wheel</em>
            </h2>
            <p className="font-body text-forest/60 mt-4 max-w-xl mx-auto">
              Every therapy is interconnected. No single modality works in isolation — together they create a healing ecosystem uniquely designed around <em>you</em>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <HealingWheel />
            </motion.div>

            {/* Integration explanation */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-display font-bold text-forest text-2xl">
                Why Integration Works
              </h3>
              <p className="font-body text-forest/65 leading-relaxed">
                Non-Communicable Diseases are multi-factorial — they arise from complex interactions between genetics, lifestyle, stress, nutrition, and environment. A single-modality approach addresses only one dimension of this complexity.
              </p>
              <p className="font-body text-forest/65 leading-relaxed">
                At Arogyadhama, your treatment protocol combines therapies that reinforce each other: Yoga calms the nervous system, Ayurveda rebalances the constitution, Naturopathy eliminates toxins, Acupuncture restores energy flow, and Physiotherapy rebuilds structural integrity.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { n: "400+", l: "Research Papers" },
                  { n: "40+", l: "Years of Practice" },
                  { n: "45,000+", l: "Patients Treated" },
                  { n: "11", l: "Departments" },
                ].map((s) => (
                  <div key={s.l} className="bg-white rounded-xl p-4 border border-border shadow-card text-center">
                    <div className="font-display font-bold text-gold text-xl">{s.n}</div>
                    <div className="font-body text-sage text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Therapy Cards */}
      <section className="py-20" style={{ background: "hsl(168 15% 97%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Explore Each Modality</span>
            <h2 className="font-display text-display-md text-forest mt-4">
              Eight Paths to <em className="not-italic text-gold">Wholeness</em>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {therapyCards.map((card, i) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div
                  className="bg-white rounded-2xl p-7 md:p-8 shadow-card border border-border hover:shadow-card-hover transition-all duration-300 group"
                  style={{ borderLeft: `4px solid ${card.borderColor}` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                    {/* Content */}
                    <div>
                      <h3 className="font-display font-bold text-forest text-xl md:text-2xl">{card.title}</h3>
                    </div>

                    {/* CTA */}
                    <div className="flex-shrink-0">
                      <Link
                        to={card.href}
                        className="block font-body font-semibold text-sm px-5 py-2.5 rounded-xl border-2 transition-all duration-300 whitespace-nowrap hover:-translate-y-0.5"
                        style={{ borderColor: card.borderColor, color: card.borderColor }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = card.borderColor;
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = card.borderColor;
                        }}
                      >
                        Learn More →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 60%, hsl(var(--sage)) 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">
              Not Sure Which Therapy Is Right for You?
            </h2>
            <p className="font-body text-cream/70 mb-8">
              Our integrative medicine specialists will assess your condition and design a personalised multi-therapy protocol — at no extra charge during your first consultation.
            </p>
            <Link
              to="/book-now"
              className="inline-block bg-gold text-forest-dark font-body font-semibold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors shadow-gold"
            >
              Book Your Assessment →
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}