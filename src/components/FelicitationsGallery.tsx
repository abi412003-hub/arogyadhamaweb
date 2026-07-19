"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FELICITATIONS } from "@/lib/felicitations";

export default function FelicitationsGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: number) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    }
  }

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

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {FELICITATIONS.map((f, i) => (
            <motion.div
              key={f.src}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="flex-shrink-0 w-72 rounded-2xl bg-white shadow-card border border-forest/10 overflow-hidden snap-start flex flex-col hover:shadow-card-hover transition-shadow"
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
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <p className="font-body text-xs text-sage/60 text-center mt-4">
          ← Scroll to see all distinguished guests &amp; felicitations →
        </p>
      </div>
    </section>
  );
}
