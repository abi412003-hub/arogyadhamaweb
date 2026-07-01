"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

const VISITORS = [
  {
    year: "2016",
    name: "Padma Shri to Dr. H R Nagendra",
    title: "Padma Shri Award — India's 4th Highest Civilian Honour",
    context: "Conferred by the Government of India for distinguished service to Yoga and Integrative Medicine. Dr. Nagendra, founder of S-VYASA, received this honour at Rashtrapati Bhavan.",
    isAward: true,
    color: "hsl(43 89% 38%)",
  },
  {
    year: "2019",
    name: "Shri Ram Nath Kovind",
    title: "Hon'ble President of India",
    context: "The 14th President of India visited Prashanti Kutiram — a testament to the national significance of Arogyadhama's integrative medicine work and its contribution to India's health heritage.",
    isAward: false,
    color: "hsl(200 55% 40%)",
  },
  {
    year: "2017",
    name: "Shri Ratan Tata",
    title: "Chairman Emeritus, Tata Sons",
    context: "Visited Prashanti Kutiram and interacted with the healing community. Shri Tata's interest in Arogyadhama reflects the institution's standing among India's foremost thought leaders.",
    isAward: false,
    color: "hsl(168 30% 28%)",
  },
  {
    year: "2017",
    name: "Sri Sri Ravi Shankar",
    title: "Spiritual Leader & Founder, Art of Living",
    context: "The renowned spiritual teacher and humanitarian visited the campus, acknowledging the shared mission of bringing the healing wisdom of yoga to every human being on the planet.",
    isAward: false,
    color: "hsl(258 45% 35%)",
  },
  {
    year: "2016",
    name: "Sadhguru Jaggi Vasudev",
    title: "Yogi, Mystic & Founder, Isha Foundation",
    context: "Sadhguru's visit to Arogyadhama was an acknowledgment of the institution's serious scientific approach to yogic healing — where ancient wisdom meets clinical rigour.",
    isAward: false,
    color: "hsl(var(--terracotta))",
  },
  {
    year: "2014",
    name: "Dr. Harsh Vardhan",
    title: "Union Health Minister, Government of India",
    context: "The former Union Health Minister visited Prashanti Kutiram, underscoring the government's recognition of Arogyadhama's contribution to India's integrative healthcare ecosystem.",
    isAward: false,
    color: "hsl(150 43% 20%)",
  },
  {
    year: "2014",
    name: "Ms. Tulsi Gabbard",
    title: "U.S. House of Representatives",
    context: "The U.S. Congresswoman and yoga practitioner visited Arogyadhama, reflecting the institution's growing international recognition as a centre of yogic science and healing.",
    isAward: false,
    color: "hsl(200 60% 30%)",
  },
  {
    year: "Ongoing",
    name: "Didi Janki Ji",
    title: "Spiritual Head, Brahma Kumaris World Spiritual University",
    context: "The centenarian spiritual leader and global ambassador of Raja Yoga has graced Prashanti Kutiram with her presence — bridging the shared vision of spiritual and physical wellness.",
    isAward: false,
    color: "hsl(340 45% 32%)",
  },
];

export default function NotableVisitors() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: number) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    }
  }

  return (
    <section className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 55%, hsl(150 35% 20%) 100%)" }}>
      {/* Mandala watermark */}
      <div className="absolute right-0 top-0 h-full flex items-center pointer-events-none opacity-[0.04]">
        <svg viewBox="0 0 500 500" className="w-96 h-96 mr-[-3rem]" fill="none">
          {[220, 175, 130, 85, 40].map((r) => (
            <circle key={r} cx="250" cy="250" r={r} stroke="hsl(51 97% 94%)" strokeWidth="0.8" />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div className="flex items-end justify-between gap-6 mb-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold/70 font-semibold">Distinguished Guests</span>
            <h2 className="font-display font-bold mt-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "hsl(var(--cream))" }}>
              Notable Visitors &<br />
              <em className="not-italic" style={{ color: "hsl(var(--gold))" }}>Recognitions</em>
            </h2>
            <p className="font-body text-cream/60 text-sm mt-3 max-w-lg">
              Presidents, spiritual masters, industrialists, and policymakers — all drawn to the healing mission of Prashanti Kutiram.
            </p>
          </div>
          {/* Scroll controls */}
          <div className="flex items-center gap-2">
            <button onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/50 transition-all"
              aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/50 transition-all"
              aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Horizontal scroll */}
        <div ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {VISITORS.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06 }}
              className="flex-shrink-0 w-72 rounded-2xl border flex flex-col"
              style={{
                borderColor: `${v.color}40`,
                background: "hsl(150 43% 10% / 0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Year badge */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <span className="font-body text-[10px] tracking-[0.25em] uppercase font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${v.color}25`, color: v.color }}>
                  {v.year}
                </span>
                {v.isAward ? (
                  <Award size={14} style={{ color: "hsl(var(--gold))" }} />
                ) : (
                  <div className="w-2 h-2 rounded-full" style={{ background: v.color }} />
                )}
              </div>

              {/* Content */}
              <div className="px-5 pb-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold leading-tight mb-1" style={{ color: "hsl(var(--cream))", fontSize: "1.05rem" }}>
                  {v.name}
                </h3>
                <p className="font-body text-xs mb-3" style={{ color: v.color }}>
                  {v.title}
                </p>
                <p className="font-body text-xs text-cream/50 leading-relaxed flex-1">
                  {v.context}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="h-0.5 w-full rounded-b-2xl" style={{ background: `linear-gradient(90deg, ${v.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <p className="font-body text-xs text-cream/30 text-center mt-4">
          ← Scroll to see all distinguished visitors →
        </p>
      </div>
    </section>
  );
}