"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { Leaf, Droplets, Zap, Activity, Brain, Wind, Flower2, Salad } from "lucide-react";

const therapies = [
  {
    name: "Yoga Therapy",
    href: "/therapies/yoga",
    tagline: "Ancient practices backed by modern research for mind-body harmony",
    hex: "#2D5A3D",
    Icon: Flower2,
  },
  {
    name: "Ayurveda",
    href: "/therapies/ayurveda",
    tagline: "Time-tested herbal healing science for restoring natural balance",
    hex: "#52796F",
    Icon: Leaf,
  },
  {
    name: "Naturopathy",
    href: "/therapies/naturopathy",
    tagline: "Nature's healing through mud therapy, hydrotherapy & therapeutic diet",
    hex: "#1D9E75",
    Icon: Droplets,
  },
  {
    name: "Acupuncture",
    href: "/therapies/acupuncture",
    tagline: "Precise energy point therapy for pain relief & systemic healing",
    hex: "#C2703E",
    Icon: Zap,
  },
  {
    name: "Physiotherapy",
    href: "/therapies/physiotherapy",
    tagline: "Rehabilitative exercises for mobility & strength restoration",
    hex: "#C9A961",
    Icon: Activity,
  },
  {
    name: "Yogic Counselling & Psychotherapy",
    href: "/therapies/yogic-counselling",
    tagline: "Mind-centred dialogue rooted in yoga psychology and modern therapeutic science",
    hex: "#7F77DD",
    Icon: Brain,
  },
  {
    name: "Ozone Therapy",
    href: "/therapies/ozone",
    tagline: "Medical oxygen-ozone therapy for oxygenation, detox and immune support",
    hex: "#378ADD",
    Icon: Wind,
  },
  {
    name: "Diet & Nutrition",
    href: "/therapies/diet-and-nutrition",
    tagline: "Personalized nutrition plans for holistic health and wellness",
    hex: "#5FA83E",
    Icon: Salad,
  },
];

export default function TherapiesSection() {
  return (
    <section
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ background: "hsl(168 15% 97%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          className="text-center mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Healing Modalities</span>
          <h2 className="font-display text-display-md text-forest mt-4 max-w-2xl mx-auto">
            Eight Paths, One Destination —{" "}
            <em className="not-italic text-gold">Your Wellness</em>
          </h2>
          <p className="font-body text-forest/60 mt-4 max-w-xl mx-auto text-base">
            Each modality is practiced by trained specialists and integrated into a
            personalized treatment protocol backed by decades of research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {therapies.map((therapy, i) => (
            <motion.div
              key={therapy.name}
              className={therapies.length % 3 === 1 && i === therapies.length - 1 ? "lg:col-start-2" : ""}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link
                to={therapy.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                {/* top color accent */}
                <span
                  className="absolute left-0 top-0 h-1 w-full"
                  style={{ background: therapy.hex }}
                />
                <span
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `${therapy.hex}1A`, color: therapy.hex }}
                >
                  <therapy.Icon size={26} strokeWidth={1.6} />
                </span>
                <h3 className="font-display text-xl font-semibold text-forest">
                  {therapy.name}
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-forest/60">
                  {therapy.tagline}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gold transition-all group-hover:gap-3">
                  Learn More <span>→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
