"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FELICITATIONS } from "@/lib/felicitations";

// Duplicate the list so the row can loop seamlessly during auto-scroll.
const ITEMS = [...FELICITATIONS, ...FELICITATIONS];

export default function FelicitationsGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  function scroll(dir: number) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    }
  }

  // Continuous auto-scroll (marquee) driven by requestAnimationFrame so the
  // native scrollLeft — and therefore the arrows and manual scroll — keep working.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const speed = 0.6; // px per frame (~36px/s at 60fps)
    let raf = 0;
    const step = () => {
      if (!pausedRef.current) {
        const half = el.scrollWidth / 2; // width of one copy of the list
        el.scrollLeft += speed;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half; // seamless wrap (both halves are identical)
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Notable Visitors</span>
          <h2 className="font-display text-display-md text-forest mt-4">
            Distinguished Guests &amp;{" "}
            <em className="not-italic text-gold">Felicitations</em>
          </h2>
          <p className="font-body text-sage text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Presidents, spiritual masters, industrialists, and policymakers who have
            graced Prashanti Kutiram and honoured the healing mission of Arogyadhama.
          </p>
        </motion.div>

        {/* Scroll controls */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 rounded-full border border-forest/20 flex items-center justify-center text-forest/60 hover:text-forest hover:border-forest/50 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 rounded-full border border-forest/20 flex items-center justify-center text-forest/60 hover:text-forest hover:border-forest/50 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Horizontal auto-scrolling row (pauses on hover) */}
        <div
          ref={scrollRef}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ITEMS.map((f, i) => (
            <div
              key={`${f.src}-${i}`}
              className="flex-shrink-0 w-72 rounded-2xl bg-white shadow-card border border-forest/10 overflow-hidden flex flex-col hover:shadow-card-hover transition-shadow"
            >
              <div className="w-full h-52 bg-forest-dark/5 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt={f.caption}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex items-start">
                <p className="font-body text-forest font-medium text-sm leading-snug">
                  {f.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <p className="font-body text-xs text-sage/60 text-center mt-4">
          Hover to pause · use the arrows to browse
        </p>
      </div>
    </section>
  );
}
