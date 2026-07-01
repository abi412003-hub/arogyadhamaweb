"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const testimonials = [
  {
    quote:
      "My experience at Arogyadhama has been nothing short of transformative. Coming from New York with chronic fatigue and anxiety, the integrated combination of Yoga Therapy, Ayurveda, and Naturopathy gave me tools I use every single day. The science behind each practice is what convinced me — this is not superstition, it is healing rooted in research.",
    name: "Ms. Naina",
    location: "New York, USA",
    condition: "Yoga Therapy, Ayurveda & Naturopathy",
    initials: "MN",
  },
  {
    quote:
      "After three weeks at Arogyadhama, my Vitamin B12 levels normalized, blood pressure came down to 118/78, and the burning sensations I'd suffered for two years disappeared completely. The doctors here understood my body holistically — not just my symptoms. I am eternally grateful.",
    name: "Mr. Pishu",
    location: "Bengaluru, India",
    condition: "Metabolic Disorder & Neuropathy",
    initials: "MP",
  },
  {
    quote:
      "After my paralytic stroke, doctors gave me little hope of walking again. Arogyadhama's rehabilitation programme combined Yoga, Physiotherapy, and Ayurveda in ways I had never imagined. Within 40 days, I walked out of this campus. The word miracle doesn't capture it — it was methodical, compassionate medicine.",
    name: "Ranganath Desai",
    location: "Mysuru, India",
    condition: "Stroke Rehabilitation & Diabetes",
    initials: "RD",
  },
  {
    quote:
      "As a healthcare professional myself, I was initially skeptical about integrative medicine. What changed my mind was the clinical protocols — everything at Arogyadhama is measured, documented, and evidence-based. Flying from Singapore was absolutely worth it. The integrated approach healed my autoimmune condition where conventional medicine had failed.",
    name: "Ms. Vidya Krishnan",
    location: "Singapore",
    condition: "Autoimmune Condition",
    initials: "VK",
  },
  {
    quote:
      "My husband and I came with severe back pain, neck stiffness, and foot pain — years of accumulated stress. The therapists here treated us as whole human beings, not just a collection of symptoms. After 21 days, we returned home not just pain-free, but with a completely new philosophy of health. Arogyadhama is not a hospital — it is a school of life.",
    name: "Padmanabhan Ji & Revati Ji",
    location: "Chennai, India",
    condition: "Chronic Pain & Musculoskeletal",
    initials: "PR",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "hsl(168 15% 97%)" }}>
      {/* Background tint */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, hsl(var(--sage) / 0.2) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Voices of Healing</span>
          <h2 className="font-display text-display-md text-forest mt-4">
            Real Stories, Real <em className="not-italic text-gold">Transformations</em>
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-card"
            >
              {/* Quote mark */}
              <div
                className="font-quote text-8xl leading-none mb-4 select-none"
                style={{ color: "hsl(var(--gold) / 0.2)" }}
              >
                "
              </div>

              {/* Quote text */}
              <blockquote
                className="font-quote text-forest/80 leading-relaxed mb-8"
                style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)", fontStyle: "italic" }}
              >
                {t.quote}
              </blockquote>

              {/* Patient info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-forest-gradient flex items-center justify-center text-cream font-display font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-forest text-base">{t.name}</div>
                    <div className="font-body text-sage text-xs">{t.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-gold/10 text-gold font-body text-xs font-semibold px-3 py-1.5 rounded-full">
                    {t.condition}
                  </span>
                  <button className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-cream hover:bg-forest-light transition-colors">
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border-2 border-forest/20 flex items-center justify-center text-forest hover:border-gold hover:text-gold transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === current ? "hsl(var(--gold))" : "hsl(var(--sage) / 0.3)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border-2 border-forest/20 flex items-center justify-center text-forest hover:border-gold hover:text-gold transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}