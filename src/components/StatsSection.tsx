"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, inView: boolean, duration = 2200) {
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

// Subtle lotus tile pattern SVG
function LotusPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="lotus-tile" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="30" stroke="hsl(51 97% 94%)" strokeWidth="0.5" fill="none" />
          <circle cx="40" cy="40" r="18" stroke="hsl(51 97% 94%)" strokeWidth="0.5" fill="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <ellipse
              key={a}
              cx={40 + Math.cos((a * Math.PI) / 180) * 24}
              cy={40 + Math.sin((a * Math.PI) / 180) * 24}
              rx="7"
              ry="14"
              transform={`rotate(${a}, ${40 + Math.cos((a * Math.PI) / 180) * 24}, ${40 + Math.sin((a * Math.PI) / 180) * 24})`}
              stroke="hsl(51 97% 94%)"
              strokeWidth="0.4"
              fill="none"
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lotus-tile)" />
    </svg>
  );
}

const stats = [
  { value: 40, suffix: "+", label: "Years of Excellence", sub: "Since 1984" },
  { value: 45000, suffix: "+", label: "Patients Treated", sub: "From 50+ countries" },
  { value: 350, suffix: "", label: "Bed Capacity", sub: "Inpatient facility" },
  { value: 400, suffix: "+", label: "Research Papers", sub: "PubMed indexed" },
  { value: 11, suffix: "", label: "Departments", sub: "Clinical specialisations" },
  { value: 5, suffix: "+", label: "Therapy Systems", sub: "Integrated healing" },
];

function StatItem({ stat, inView, i }: { stat: typeof stats[0]; inView: boolean; i: number }) {
  const count = useCountUp(stat.value, inView);
  return (
    <motion.div
      className="text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
    >
      <div
        className="font-display font-bold mb-1"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "hsl(var(--gold))" }}
      >
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="font-body font-semibold text-cream/90 text-sm tracking-wide">{stat.label}</div>
      <div className="font-body text-cream/50 text-xs mt-0.5">{stat.sub}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: "hsl(var(--forest-dark))" }}
    >
      <LotusPattern />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <StatItem stat={stat} inView={inView} i={i} />
              {i < stats.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -translate-y-1/2 w-px h-12 opacity-20"
                  style={{
                    background: "hsl(var(--gold))",
                    left: `calc(${((i + 1) / stats.length) * 100}%)`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}