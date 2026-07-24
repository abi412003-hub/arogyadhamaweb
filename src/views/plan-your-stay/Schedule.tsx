"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ChevronRight, Moon, Sunrise, Sun, Sunset, Star } from "lucide-react";

const SCHEDULE = [
  {
    time: "5:20 – 5:50 AM",
    label: "Om Meditation",
    desc: "Start your day with the sacred sound vibration. The Om resonates through the meditation hall as the campus awakens in the pre-dawn stillness.",
    icon: "🕉️",
    category: "meditation",
    period: "dawn",
  },
  {
    time: "6:00 – 6:55 AM",
    label: "Special Technique 1",
    desc: "Guided therapeutic yoga practice specific to your condition. Carefully prescribed asana sequences with individual attention from yoga therapists.",
    icon: "🧘",
    category: "yoga",
    period: "dawn",
  },
  {
    time: "7:00 – 8:00 AM",
    label: "Maitri Milan",
    desc: "Community gathering and sharing — a circle of patients sharing their healing journey. One of the most powerful therapeutic elements of the Arogyadhama programme.",
    icon: "🤝",
    category: "community",
    period: "morning",
  },
  {
    time: "8:00 – 8:50 AM",
    label: "Breakfast",
    desc: "Sattvic, nutritious meals prepared fresh in our therapeutic kitchen — designed by clinical nutritionists to complement your treatment protocol.",
    icon: "🍛",
    category: "meal",
    period: "morning",
  },
  {
    time: "9:00 – 9:45 AM",
    label: "Parameters & Consultation",
    desc: "Daily health check-up and doctor visit. Vital parameters are recorded, progress assessed, and treatment protocols adjusted as needed.",
    icon: "🩺",
    category: "therapy",
    period: "morning",
  },
  {
    time: "9:45 – 10:15 AM",
    label: "Health Drinks",
    desc: "Therapeutic herbal and fruit-based drinks to nourish and hydrate — formulated to support your treatment protocol.",
    icon: "🥤",
    category: "diet",
    period: "morning",
  },
  {
    time: "10:15 – 11:00 AM",
    label: "Lecture",
    desc: "Educational session on health, yoga philosophy, and the science of integrative medicine. Topics include stress management, diet, and disease understanding.",
    icon: "📚",
    category: "education",
    period: "morning",
  },
  {
    time: "11:10 AM – 12:00 PM",
    label: "Pranayama",
    desc: "Breathing exercises for vital energy balance. From Nadi Shodhana to Bhastrika — pranayama sessions are adapted to each patient's respiratory capacity and condition.",
    icon: "🌬️",
    category: "yoga",
    period: "morning",
  },
  {
    time: "12:05 – 12:55 PM",
    label: "Special Technique 2",
    desc: "Condition-specific yoga therapy — the second dedicated therapeutic session of the day, often focused on specific organ systems or pain management.",
    icon: "✨",
    category: "yoga",
    period: "afternoon",
  },
  {
    time: "1:00 PM",
    label: "Lunch",
    desc: "Balanced vegetarian meal — the main meal of the day. Prepared according to therapeutic dietary guidelines with fresh, locally sourced ingredients.",
    icon: "🥗",
    category: "meal",
    period: "afternoon",
  },
  {
    time: "2:30 PM",
    label: "MSRT",
    desc: "Mind Sound Resonance Technique — a guided meditation using the vibration of sound to induce deep mental relaxation and calm the nervous system.",
    icon: "🌀",
    category: "meditation",
    period: "afternoon",
  },
  {
    time: "3:00 PM",
    label: "Cyclic Meditation",
    desc: "Arogyadhama's signature deep relaxation technique — alternating movement and stillness to create states of profound physiological rest. Scientifically shown to be more restorative than sleep.",
    icon: "🌀",
    category: "meditation",
    period: "afternoon",
  },
  {
    time: "3:20 PM",
    label: "Pranayama-II",
    desc: "The second pranayama session of the day — breathing practices to balance vital energy (prana), adapted to each patient's respiratory capacity and condition.",
    icon: "🌬️",
    category: "yoga",
    period: "afternoon",
  },
  {
    time: "4:00 – 5:00 PM",
    label: "Special Technique 3",
    desc: "Therapeutic practice tailored to your specific condition — may include Naturopathy treatments, Acupuncture, Physiotherapy, or Ayurvedic procedures.",
    icon: "💆",
    category: "therapy",
    period: "afternoon",
  },
  {
    time: "5:00 PM",
    label: "Kashaya",
    desc: "Herbal medicinal drink — a therapeutic decoction of Ayurvedic herbs specifically chosen for your condition. A sacred Arogyadhama tradition at the golden hour.",
    icon: "🍵",
    category: "therapy",
    period: "evening",
  },
  {
    time: "5:15 – 6:00 PM",
    label: "Tuning to Nature",
    desc: "Outdoor mindfulness walk along the nature paths of Prashanti Kutiram — with the Bannerghatta hills on the horizon and birdsong as your soundtrack.",
    icon: "🌿",
    category: "nature",
    period: "evening",
  },
  {
    time: "6:00 – 6:30 PM",
    label: "Bhajan",
    desc: "Devotional singing for mental peace. The community gathers to sing sacred songs — the vibration of group singing has profound effects on the nervous system and group cohesion.",
    icon: "🎵",
    category: "community",
    period: "evening",
  },
  {
    time: "6:40 – 7:40 PM",
    label: "Trataka & MSRT",
    desc: "Candle gazing meditation (Trataka) followed by Mind Sound Resonance Technique (MSRT) — a powerful combination for stress reduction and deep mental relaxation.",
    icon: "🕯️",
    category: "meditation",
    period: "evening",
  },
  {
    time: "7:40 – 8:30 PM",
    label: "Dinner",
    desc: "Light, easy-to-digest evening meal. Designed to not burden the digestive system overnight, supporting the body's natural nocturnal healing processes.",
    icon: "🫕",
    category: "meal",
    period: "evening",
  },
  {
    time: "8:15 – 9:15 PM",
    label: "Happy Assembly",
    desc: "Community celebration on Wednesday, Friday & Sunday evenings — cultural programs, patient sharing, music, and joyful connection. One of the most cherished aspects of the Arogyadhama experience.",
    icon: "🎉",
    category: "community",
    period: "night",
    special: "Wed, Fri & Sun only",
  },
];

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  meditation: { bg: "hsl(258 50% 97%)", text: "hsl(258 50% 35%)", border: "hsl(258 50% 75%)", dot: "hsl(258 50% 45%)" },
  yoga: { bg: "hsl(var(--maroon) / 0.06)", text: "hsl(var(--maroon))", border: "hsl(var(--maroon) / 0.25)", dot: "hsl(var(--maroon))" },
  meal: { bg: "hsl(var(--gold) / 0.07)", text: "hsl(43 70% 28%)", border: "hsl(var(--gold) / 0.3)", dot: "hsl(var(--gold))" },
  diet: { bg: "hsl(345 40% 96%)", text: "hsl(345 50% 25%)", border: "hsl(345 40% 65%)", dot: "hsl(345 50% 38%)" },
  therapy: { bg: "hsl(var(--maroon-muted) / 0.1)", text: "hsl(var(--maroon-muted))", border: "hsl(var(--maroon-muted) / 0.3)", dot: "hsl(var(--maroon-muted))" },
  community: { bg: "hsl(var(--terracotta) / 0.08)", text: "hsl(27 45% 38%)", border: "hsl(var(--terracotta) / 0.3)", dot: "hsl(var(--terracotta))" },
  education: { bg: "hsl(200 55% 96%)", text: "hsl(200 55% 28%)", border: "hsl(200 55% 70%)", dot: "hsl(200 55% 40%)" },
  nature: { bg: "hsl(90 40% 96%)", text: "hsl(90 40% 28%)", border: "hsl(90 40% 65%)", dot: "hsl(90 40% 38%)" },
};

const PERIOD_ICONS: Record<string, typeof Moon> = {
  dawn: Moon,
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
  night: Star,
};

const PERIOD_LABELS: Record<string, string> = {
  dawn: "Pre-Dawn",
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Night",
};

const LEGEND = [
  { key: "yoga", label: "Yoga / Asana" },
  { key: "meditation", label: "Meditation" },
  { key: "meal", label: "Meals" },
  { key: "therapy", label: "Therapy" },
  { key: "community", label: "Community" },
  { key: "nature", label: "Nature" },
  { key: "education", label: "Education" },
];

let lastPeriod = "";

export default function Schedule() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(345 56% 12%) 0%, hsl(345 50% 20%) 55%, hsl(345 30% 30%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/plan-your-stay" className="hover:text-gold transition-colors">Plan Your Stay</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Daily Schedule</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              A Day at Arogyadhama
            </h1>
            <p className="font-body text-cream/70 mt-4 max-w-lg leading-relaxed">
              From the sacred stillness of pre-dawn Om Meditation to the joyful community of Happy Assembly — experience a day designed entirely for healing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legend */}
      <div className="border-b border-border bg-white py-4 sticky top-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap gap-3 items-center">
          <span className="font-body text-xs font-semibold text-sage uppercase tracking-widest mr-2">Activity Types:</span>
          {LEGEND.map((l) => {
            const s = CATEGORY_STYLES[l.key];
            return (
              <div key={l.key} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.dot }} />
                <span className="font-body text-xs text-forest/70">{l.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-[88px] sm:left-[100px] top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, hsl(var(--gold) / 0.5), hsl(var(--maroon) / 0.15))" }} />

          {SCHEDULE.map((item, i) => {
            const styles = CATEGORY_STYLES[item.category];
            const isNewPeriod = item.period !== lastPeriod;
            lastPeriod = item.period;
            const PeriodIcon = PERIOD_ICONS[item.period];

            return (
              <div key={item.time}>
                {/* Period divider */}
                {isNewPeriod && (
                  <div className="flex items-center gap-3 mb-6 mt-4 pl-[112px] sm:pl-[124px]">
                    <PeriodIcon size={14} className="text-gold" />
                    <span className="font-body text-xs tracking-[0.2em] uppercase text-gold font-semibold">
                      {PERIOD_LABELS[item.period]}
                    </span>
                  </div>
                )}

                <motion.div className="relative flex gap-6 mb-5"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: 0.05 }}>

                  {/* Time */}
                  <div className="w-[88px] sm:w-[100px] flex-shrink-0 text-right pt-4">
                    <span className="font-body text-xs font-semibold text-sage">{item.time}</span>
                  </div>

                  {/* Dot on the line */}
                  <div className="absolute left-[83px] sm:left-[95px] top-4 w-4 h-4 rounded-full border-2 border-white z-10 flex items-center justify-center"
                    style={{ background: styles.dot, boxShadow: `0 0 0 3px ${styles.dot}20` }}>
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border p-5 transition-all hover:shadow-card"
                    style={{ background: styles.bg, borderColor: styles.border }}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3 className="font-display font-bold text-lg" style={{ color: styles.text }}>{item.label}</h3>
                          {item.special && (
                            <span className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--gold) / 0.15)", color: "hsl(43 70% 28%)" }}>
                              {item.special}
                            </span>
                          )}
                        </div>
                        <p className="font-body text-sm leading-relaxed" style={{ color: `${styles.text}BB` }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div className="mt-12 rounded-2xl p-6 border border-border bg-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="font-display font-bold text-forest text-lg mb-3">Notes on the Schedule</h3>
          <ul className="space-y-2">
            {[
              "Schedule is subject to seasonal adjustments and individual patient requirements.",
              "Special Technique sessions are personalised — each patient receives a condition-specific programme.",
              "Happy Assembly occurs on Wednesday, Friday, and Sunday evenings.",
              "Silence is observed between 9:00 PM and 5:30 AM — creating the restful environment essential for healing.",
              "Individual therapy appointments (Naturopathy, Acupuncture, Physiotherapy) are scheduled separately.",
            ].map((n) => (
              <li key={n} className="flex items-start gap-2 font-body text-sm text-forest/65">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                {n}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Layout>
  );
}