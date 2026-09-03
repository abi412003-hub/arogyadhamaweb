"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { ChevronDown } from "lucide-react";

// The hero clip plays a little fast; slow it so visitors can take in the opening.
const HERO_PLAYBACK_RATE = 0.7;

// Shared entrance for every item in the intro block below the video.
const riseIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stats = [
  { value: "50+", label: "Years of Excellence", sub: "Since 1984" },
  { value: "10,00,000+", label: "Patients Treated", sub: "From 50+ countries" },
  { value: "600", label: "Bed Capacity", sub: "Inpatient facility" },
  { value: "1,500+", label: "Research Papers", sub: "PubMed indexed" },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // The SSR video autoplays before React hydrates, so its loadedmetadata/play
  // events fire too early — set the rate on mount (and keep it across loops).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = HERO_PLAYBACK_RATE;
    const apply = () => { v.playbackRate = HERO_PLAYBACK_RATE; };
    v.addEventListener("play", apply);
    return () => v.removeEventListener("play", apply);
  }, []);

  return (
    <>
      {/* Full-screen video, kept clear of copy so the footage reads brightly */}
      <section className="relative min-h-screen overflow-hidden bg-maroon-dark">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            backgroundImage: "url(/hero-poster.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(1.1) saturate(1.06)",
          }}
        />

        {/* Thin top gradient only — keeps the transparent navbar legible over bright frames */}
        <div
          className="absolute inset-x-0 top-0 h-1/4 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--maroon-dark) / 0.45) 0%, transparent 100%)",
          }}
        />

        {/* Scroll indicator — now the only cue to scroll past the video */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="font-body text-cream/80 text-xs tracking-widest uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            Discover
          </span>
          <ChevronDown size={20} className="text-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]" />
        </motion.div>
      </section>

      {/* Intro block — moved off the video so the footage stays unobstructed.
          Extra bottom padding absorbs the -mt-16 overlap from QuickActions. */}
      <section className="relative bg-maroon-dark">
        <motion.div
          className="relative z-10 text-center max-w-5xl mx-auto px-5 sm:px-6 pt-16 sm:pt-20 pb-28 sm:pb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Pre-heading */}
          <motion.div variants={riseIn} className="mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-3 font-body tracking-[0.45em] uppercase text-gold">
              <span className="h-px w-6 sm:w-8 bg-gold/50" />
              <span className="font-display italic text-cream/90 normal-case tracking-wide text-xs sm:text-sm">Est. 1984</span>
              <span className="h-px w-6 sm:w-8 bg-gold/50" />
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={riseIn}
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
            variants={riseIn}
            className="font-body text-cream/75 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
            style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)" }}
          >
            Combining Yoga, Ayurveda, Naturopathy & modern science for holistic healing
            since 1984 — at Prashanti Kutiram, Bengaluru
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={riseIn}
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
            variants={riseIn}
            className="mt-10 sm:mt-16 mx-auto w-full max-w-3xl rounded-2xl border border-gold/15 px-6 py-6 sm:px-10 sm:py-7"
            style={{ background: "hsl(var(--maroon) / 0.45)" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center px-2">
                  <div className="font-display text-gold font-bold text-2xl sm:text-3xl md:text-4xl">{stat.value}</div>
                  <div className="font-body font-semibold text-cream/90 text-xs sm:text-sm tracking-wide mt-1">{stat.label}</div>
                  <div className="font-body text-cream/50 text-[10px] sm:text-xs mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
