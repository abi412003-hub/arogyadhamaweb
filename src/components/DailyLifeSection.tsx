"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { Clock } from "lucide-react";

const schedule = [
  { time: "5:20 – 5:50 AM", activity: "Om Meditation", desc: "Start your day with the sacred sound vibration. The Om resonates through the meditation hall as the campus awakens in the pre-dawn stillness." },
  { time: "6:00 – 6:55 AM", activity: "Special Technique 1", desc: "Guided therapeutic yoga practice specific to your condition. Carefully prescribed asana sequences with individual attention from yoga therapists." },
  { time: "7:00 – 8:00 AM", activity: "Maitri Milan", desc: "Community gathering and sharing — a circle of patients sharing their healing journey. One of the most powerful therapeutic elements of the Arogyadhama programme." },
  { time: "8:00 – 8:50 AM", activity: "Breakfast", desc: "Sattvic, nutritious meals prepared fresh in our therapeutic kitchen — designed by clinical nutritionists to complement your treatment protocol." },
  { time: "9:00 – 9:45 AM", activity: "Parameters & Consultation", desc: "Daily health check-up and doctor visit. Vital parameters are recorded, progress assessed, and treatment protocols adjusted as needed." },
  { time: "9:45 – 10:15 AM", activity: "Health Drinks", desc: "Therapeutic herbal and fruit-based drinks to nourish and hydrate — formulated to support your treatment protocol." },
  { time: "10:15 – 11:00 AM", activity: "Lecture", desc: "Educational session on health, yoga philosophy, and the science of integrative medicine. Topics include stress management, diet, and disease understanding." },
  { time: "11:10 AM – 12:00 PM", activity: "Pranayama", desc: "Breathing exercises for vital energy balance. From Nadi Shodhana to Bhastrika — pranayama sessions are adapted to each patient's respiratory capacity and condition." },
  { time: "12:05 – 12:55 PM", activity: "Special Technique 2", desc: "Condition-specific yoga therapy — the second dedicated therapeutic session of the day, often focused on specific organ systems or pain management." },
];

export default function DailyLifeSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">A Day at Arogyadhama</span>
          <h2 className="font-display text-display-md text-forest mt-4">
            Your Healing Journey,{" "}
            <em className="not-italic text-gold">Hour by Hour</em>
          </h2>
          <p className="font-body text-forest/60 mt-4 max-w-xl mx-auto">
            Every moment at Arogyadhama is designed with intention — a rhythm of ancient practices and modern therapies that transforms from the inside out.
          </p>
        </motion.div>

        {/* Timeline grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedule.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              className="relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="rounded-xl p-4 border transition-all duration-300 cursor-default h-full"
                style={{
                  background: hoveredIndex === i ? "hsl(var(--maroon))" : "hsl(0 0% 100%)",
                  borderColor: hoveredIndex === i ? "hsl(var(--gold))" : "hsl(var(--border))",
                  boxShadow: hoveredIndex === i ? "0 8px 30px hsl(var(--maroon) / 0.2)" : "none",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center gap-1.5 flex-shrink-0 rounded-lg px-2.5 py-1.5 mt-0.5"
                    style={{
                      background: hoveredIndex === i ? "hsl(var(--gold) / 0.2)" : "hsl(var(--cream-dark))",
                    }}
                  >
                    <Clock
                      size={11}
                      style={{ color: hoveredIndex === i ? "hsl(var(--gold))" : "hsl(var(--maroon-muted))" }}
                    />
                    <span
                      className="font-body font-semibold text-xs tracking-wide"
                      style={{ color: hoveredIndex === i ? "hsl(var(--gold))" : "hsl(var(--maroon-muted))" }}
                    >
                      {item.time}
                    </span>
                  </div>
                </div>

                <h4
                  className="font-display font-semibold text-base mt-3 mb-1.5"
                  style={{ color: hoveredIndex === i ? "hsl(var(--cream))" : "hsl(var(--maroon))" }}
                >
                  {item.activity}
                </h4>
                <p
                  className="font-body text-xs leading-relaxed"
                  style={{ color: hoveredIndex === i ? "hsl(var(--cream) / 0.7)" : "hsl(var(--maroon) / 0.55)" }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            to="/plan-your-stay/schedule"
            className="inline-flex items-center gap-2 font-body font-semibold text-forest hover:text-gold transition-colors"
          >
            View Full Schedule →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}