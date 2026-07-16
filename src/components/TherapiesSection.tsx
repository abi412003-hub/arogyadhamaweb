"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";

import yogaImg from "@/assets/therapies/yoga-card.jpg";
import ayurvedaImg from "@/assets/therapies/ayurveda-card.jpg";
import naturopathyImg from "@/assets/therapies/naturopathy-card.jpg";
import acupunctureImg from "@/assets/therapies/acupuncture-card.jpg";
import physiotherapyImg from "@/assets/therapies/physiotherapy-card.jpg";

// Darken #rrggbb toward black, optionally with alpha.
// These brand hexes are vivid, so tinting a photo with them at full strength
// washes it out; the scrim uses a darkened cast to keep white text readable.
const shade = (hex: string, pct: number, alpha?: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (sh: number) => Math.round(((n >> sh) & 255) * (1 - pct));
  const rgb = `${c(16)} ${c(8)} ${c(0)}`;
  return alpha === undefined ? `rgb(${rgb})` : `rgb(${rgb} / ${alpha})`;
};

const therapies = [
  {
    name: "Yoga Therapy",
    href: "/therapies/yoga",
    tagline: "Ancient practices backed by modern research for mind-body harmony",
    hex: "#2D5A3D",
    image: yogaImg,
  },
  {
    name: "Ayurveda",
    href: "/therapies/ayurveda",
    tagline: "Time-tested herbal healing science for restoring natural balance",
    hex: "#52796F",
    image: ayurvedaImg,
  },
  {
    name: "Naturopathy",
    href: "/therapies/naturopathy",
    tagline: "Nature's healing through mud therapy, hydrotherapy & therapeutic diet",
    hex: "#1D9E75",
    image: naturopathyImg,
  },
  {
    name: "Acupuncture",
    href: "/therapies/acupuncture",
    tagline: "Precise energy point therapy for pain relief & systemic healing",
    hex: "#C2703E",
    image: acupunctureImg,
    focal: "60% center",
  },
  {
    name: "Physiotherapy",
    href: "/therapies/physiotherapy",
    tagline: "Rehabilitative exercises for mobility & strength restoration",
    hex: "#C9A961",
    image: physiotherapyImg,
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
  {
    name: "Diet & Nutrition",
    href: "/therapies/diet-and-nutrition",
    tagline: "Personalized nutrition plans for holistic health and wellness",
    hex: "#5FA83E",
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
                className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-2xl border border-black/5 p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                {/* Backdrop: photo where we have one, brand gradient otherwise */}
                {therapy.image ? (
                  <img
                    src={therapy.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ objectPosition: therapy.focal ?? "center" }}
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(145deg, ${therapy.hex} 0%, ${shade(therapy.hex, 0.45)} 100%)` }}
                  />
                )}

                {/* Bottom-weighted black scrim keeps the text legible over any photo,
                    then a brand-tinted gradient carries each therapy's colour. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${shade(therapy.hex, 0.45, 0.82)} 0%, ${shade(therapy.hex, 0.45, 0.35)} 45%, ${shade(therapy.hex, 0.45, 0)} 100%)`,
                  }}
                />

                {/* top color accent */}
                <span
                  className="absolute left-0 top-0 h-1 w-full"
                  style={{ background: therapy.hex }}
                />

                <div className="relative">
                  <h3 className="font-display text-xl font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                    {therapy.name}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                    {therapy.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] transition-all group-hover:gap-3">
                    Learn More <span>→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
