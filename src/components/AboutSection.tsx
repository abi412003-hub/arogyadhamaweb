"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/lib/router-compat";
import campusAerial from "@/assets/campus-aerial.jpg";
import campusEntrance from "@/assets/campus-entrance.jpg";

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function StatCard({
  value,
  label,
  suffix = "",
  inView,
}: {
  value: number;
  label: string;
  suffix?: string;
  inView: boolean;
}) {
  const count = useCountUp(value, inView);
  return (
    <div className="text-center p-4 bg-white rounded-2xl shadow-card border border-border">
      <div className="font-display text-3xl font-bold text-gold mb-1">
        {count.toLocaleString("en-IN")}{suffix}
      </div>
      <div className="font-body text-xs text-sage font-medium tracking-wide">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About Arogyadhama</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-display-lg text-forest mb-6">
              Four Decades of Integrative Healing
            </h2>
            <div className="space-y-4 font-body text-forest/70 leading-relaxed text-base">
              <p>
                Arogyadhama is the S-VYASA (Swami Vivekananda Yoga Anusandhana Samsthana),
                Health Division of S-VYASA University Bengaluru. Nestled in the serene campus
                of Prashanti Kutiram, Bengaluru, our 600-bed inpatient facility stands as a
                beacon of integrative medicine.
              </p>
              <p>
                For over 50 years, we have been at the frontier of treating Non-Communicable
                Diseases (NCDs) through a powerful confluence of Yoga Therapy, Ayurveda,
                Naturopathy, Acupuncture, Physiotherapy, Psychotherapy, and personalized Diet &
                Nutrition.
              </p>
              <p>
                Our approach is not alternative — it is integrative. Every treatment protocol at
                Arogyadhama is built upon rigorous scientific research. With 1,000+ papers published
                in PubMed-indexed journals and recognition from ICMR, we represent the gold
                standard of evidence-based traditional healing.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-forest hover:text-gold transition-colors group"
            >
              <span>Learn Our Story</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Right: Campus photo collage + stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div
              className="grid grid-cols-5 gap-3 mb-5"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <div className="col-span-3 rounded-2xl overflow-hidden shadow-card border border-border aspect-[4/3]">
                <img src={campusAerial} alt="Aerial view of Prashanti Kutiram campus" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="col-span-2 rounded-2xl overflow-hidden shadow-card border border-border aspect-[4/3]">
                <img src={campusEntrance} alt="S-VYASA University entrance with waterfall" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {[
                { value: 50, label: "Years of Excellence", suffix: "+" },
                { value: 1000000, label: "Patients Healed", suffix: "+" },
                { value: 600, label: "Bed Capacity", suffix: "" },
                { value: 1000, label: "Research Papers", suffix: "+" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                  }}
                >
                  <StatCard
                    value={stat.value}
                    label={stat.label}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}