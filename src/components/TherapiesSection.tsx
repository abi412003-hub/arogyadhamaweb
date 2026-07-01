"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Link } from "@/lib/router-compat";

const ModalitiesBlob = dynamic(() => import("@/components/three/ModalitiesBlob"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

const therapies = [
  {
    name: "Yoga Therapy",
    href: "/therapies/yoga",
    tagline: "Ancient practices backed by modern research for mind-body harmony",
    hex: "#2D5A3D",
  },
  {
    name: "Ayurveda",
    href: "/therapies/ayurveda",
    tagline: "Time-tested herbal healing science for restoring natural balance",
    hex: "#52796F",
  },
  {
    name: "Naturopathy",
    href: "/therapies/naturopathy",
    tagline: "Nature's healing through mud therapy, hydrotherapy & therapeutic diet",
    hex: "#1D9E75",
  },
  {
    name: "Acupuncture",
    href: "/therapies/acupuncture",
    tagline: "Precise energy point therapy for pain relief & systemic healing",
    hex: "#C2703E",
  },
  {
    name: "Physiotherapy",
    href: "/therapies/physiotherapy",
    tagline: "Rehabilitative exercises for mobility & strength restoration",
    hex: "#C9A961",
  },
  {
    name: "Yogic Counselling & Psychotherapy",
    href: "/therapies/yogic-counselling",
    tagline: "Mind-centred dialogue rooted in yoga psychology and modern therapeutic science",
    hex: "#7F77DD",
  },
  {
    name: "Ozone Therapy",
    href: "/therapies/ozone",
    tagline: "Medical oxygen-ozone therapy for oxygenation, detox and immune support",
    hex: "#378ADD",
  },
];

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-40 h-40 rounded-full animate-float"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, hsl(150 35% 30%), hsl(150 50% 11%))",
          boxShadow: "0 0 80px hsl(43 89% 38% / 0.25)",
        }}
      />
    </div>
  );
}

export default function TherapiesSection() {
  return (
    <section
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ background: "hsl(168 15% 97%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Healing Modalities</span>
          <h2 className="font-display text-display-md text-forest mt-4 max-w-2xl mx-auto">
            Seven Paths, One Destination —{" "}
            <em className="not-italic text-gold">Your Wellness</em>
          </h2>
          <p className="font-body text-forest/60 mt-4 max-w-xl mx-auto text-base">
            Hover a glowing orb to explore each modality. Every path is practiced by trained
            specialists and woven into a personalized, research-backed protocol.
          </p>
        </motion.div>

        {/* 3D scene — carries the seven modalities (desktop / tablet) */}
        <div className="relative mx-auto hidden md:block h-[440px] lg:h-[520px] w-full max-w-4xl">
          <ModalitiesBlob
            modalities={therapies.map((t) => ({ name: t.name, href: t.href, color: t.hex }))}
          />
        </div>

        {/* Secondary list — always present (mobile primary + accessible/crawlable) */}
        <div className="mt-6 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {therapies.map((therapy, i) => (
            <motion.div
              key={therapy.name}
              className={i === therapies.length - 1 ? "lg:col-start-2" : ""}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={therapy.href}
                className="group flex items-start gap-3 rounded-xl border border-border bg-white p-4 hover:shadow-card-hover transition-all"
              >
                <span
                  className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                  style={{ background: therapy.hex }}
                />
                <span className="min-w-0">
                  <span className="block font-display font-semibold text-forest text-base leading-snug">
                    {therapy.name}
                  </span>
                  <span className="block font-body text-forest/55 text-xs mt-0.5 leading-relaxed">
                    {therapy.tagline}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold font-body text-gold group-hover:gap-2.5 transition-all">
                    Learn More <span>→</span>
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
