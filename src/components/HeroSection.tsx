"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { ChevronDown } from "lucide-react";

// SVG Mandala/Lotus decorative pattern
function MandalaSVG() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="absolute inset-0 w-full h-full opacity-[0.06]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="300" cy="300" r="280" stroke="hsl(51 97% 94%)" strokeWidth="1" />
      <circle cx="300" cy="300" r="240" stroke="hsl(51 97% 94%)" strokeWidth="0.5" />
      <circle cx="300" cy="300" r="180" stroke="hsl(51 97% 94%)" strokeWidth="1" />
      <circle cx="300" cy="300" r="120" stroke="hsl(51 97% 94%)" strokeWidth="0.5" />
      <circle cx="300" cy="300" r="60" stroke="hsl(51 97% 94%)" strokeWidth="1" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx={300 + Math.cos((angle * Math.PI) / 180) * 160}
          cy={300 + Math.sin((angle * Math.PI) / 180) * 160}
          rx="40"
          ry="80"
          transform={`rotate(${angle}, ${300 + Math.cos((angle * Math.PI) / 180) * 160}, ${300 + Math.sin((angle * Math.PI) / 180) * 160})`}
          stroke="hsl(51 97% 94%)"
          strokeWidth="0.8"
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <ellipse
          key={angle}
          cx={300 + Math.cos((angle * Math.PI) / 180) * 90}
          cy={300 + Math.sin((angle * Math.PI) / 180) * 90}
          rx="22"
          ry="45"
          transform={`rotate(${angle}, ${300 + Math.cos((angle * Math.PI) / 180) * 90}, ${300 + Math.sin((angle * Math.PI) / 180) * 90})`}
          stroke="hsl(51 97% 94%)"
          strokeWidth="0.8"
        />
      ))}
      {[0, 45, 90, 135].map((angle) => (
        <line
          key={angle}
          x1={300 + Math.cos((angle * Math.PI) / 180) * 280}
          y1={300 + Math.sin((angle * Math.PI) / 180) * 280}
          x2={300 - Math.cos((angle * Math.PI) / 180) * 280}
          y2={300 - Math.sin((angle * Math.PI) / 180) * 280}
          stroke="hsl(51 97% 94%)"
          strokeWidth="0.4"
        />
      ))}
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-maroon-dark">
      {/* Background video */}
      <video
        src="/hero-video.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ backgroundImage: "url(/hero-poster.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-maroon-dark/50" />
      {/* Centered scrim so the headline stays legible over bright video frames */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 42%, hsl(345 50% 6% / 0.62) 0%, transparent 70%)",
        }}
      />

      {/* Mesh gradient overlays */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, hsl(345 25% 30% / 0.15) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, hsl(345 50% 8% / 0.25) 0%, transparent 55%), radial-gradient(ellipse at 60% 20%, hsl(43 89% 38% / 0.05) 0%, transparent 40%)",
          }}
        />
      </div>



      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
        }}
      >
        {/* Pre-heading */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="mb-5 sm:mb-6"
        >
          <span className="inline-flex items-center gap-3 font-body tracking-[0.45em] uppercase text-gold">
            <span className="h-px w-6 sm:w-8 bg-gold/50" />
            <span className="font-display italic text-cream/90 normal-case tracking-wide text-xs sm:text-sm">Est. 1984</span>
            <span className="h-px w-6 sm:w-8 bg-gold/50" />
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="font-display text-cream leading-[1.2] mb-5 sm:mb-6 mx-auto"
          style={{
            fontSize: "clamp(1.6rem, 4.4vw, 2.6rem)",
            textShadow: "0 2px 28px hsl(345 50% 6% / 0.6)",
          }}
        >
          India&apos;s Premier{" "}
          <em className="not-italic" style={{ color: "hsl(var(--gold))" }}>
            Integrative Medicine
          </em>{" "}
          Hospital
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="font-body text-cream/75 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
          style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)" }}
        >
          Combining Yoga, Ayurveda, Naturopathy & modern science for holistic healing
          since 1984 — at Prashanti Kutiram, Bengaluru
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-sm sm:max-w-none mx-auto"
        >
          <Link
            to="/therapies"
            className="group relative overflow-hidden bg-gold text-forest-dark font-body font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base hover:bg-gold-light transition-all duration-300 shadow-gold flex items-center justify-center gap-2"
          >
            Explore Our Therapies
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            to="/book-now"
            className="font-body font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base border-2 border-cream/50 text-cream hover:bg-cream/10 hover:border-cream/80 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Book Your Stay
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="mt-10 sm:mt-16 mx-auto w-full max-w-3xl rounded-2xl border border-gold/15 px-6 py-6 sm:px-10 sm:py-7"
          style={{ background: "hsl(var(--maroon-dark) / 0.82)", backdropFilter: "blur(8px)" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
            {[
              { value: "50+", label: "Years of Excellence", sub: "Since 1984" },
              { value: "1,000,000+", label: "Patients Treated", sub: "From 50+ countries" },
              { value: "600", label: "Bed Capacity", sub: "Inpatient facility" },
              { value: "1,000+", label: "Research Papers", sub: "PubMed indexed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-2">
                <div className="font-display text-gold font-bold text-2xl sm:text-3xl md:text-4xl">{stat.value}</div>
                <div className="font-body font-semibold text-cream/90 text-xs sm:text-sm tracking-wide mt-1">{stat.label}</div>
                <div className="font-body text-cream/50 text-[10px] sm:text-xs mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="font-body text-cream/40 text-xs tracking-widest uppercase">Discover</span>
        <ChevronDown size={20} className="text-gold/60" />
      </motion.div>
    </section>
  );
}