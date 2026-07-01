"use client";
import { motion } from "framer-motion";
import { Stethoscope, BookOpen, CreditCard, Library, FlaskConical } from "lucide-react";

const facilities = [
  {
    icon: Stethoscope,
    title: "Dispensary",
    desc: "On-campus healthcare and first aid support for all visitors and residents.",
    tint: "bg-forest/5 text-forest",
    glow: "hover:shadow-[0_0_40px_-10px_hsl(var(--forest)/0.35)]",
  },
  {
    icon: BookOpen,
    title: "Stationery",
    desc: "Easy access to essential academic and office supplies.",
    tint: "bg-saffron/10 text-saffron",
    glow: "hover:shadow-[0_0_40px_-10px_hsl(var(--saffron)/0.4)]",
  },
  {
    icon: CreditCard,
    title: "ATM",
    desc: "Convenient banking and cash withdrawal facility within the campus.",
    tint: "bg-blue-50 text-blue-600",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.35)]",
  },
  {
    icon: Library,
    title: "Library",
    desc: "Peaceful learning space with digital and physical knowledge resources.",
    tint: "bg-emerald-50 text-emerald-600",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.35)]",
  },
  {
    icon: FlaskConical,
    title: "Laboratory",
    desc: "Advanced laboratory and research facilities for practical learning.",
    tint: "bg-amber-50 text-amber-600",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(217,119,6,0.35)]",
  },
];

export default function FacilitiesSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-cream">
      {/* Animated gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 20%, hsl(var(--forest)/0.08), transparent 60%), radial-gradient(50% 45% at 85% 30%, hsl(var(--saffron)/0.10), transparent 60%), radial-gradient(55% 50% at 50% 90%, rgba(37,99,235,0.08), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ background: "hsl(var(--forest)/0.2)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ background: "hsl(var(--saffron)/0.25)", animationDelay: "1.5s" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Campus Amenities</span>
          <h2 className="font-display text-display-md text-forest mt-4">
            Facilities Available
          </h2>
          <p className="text-forest/70 mt-4 max-w-2xl mx-auto">
            Essential campus services for patients, students, and visitors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {facilities.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative rounded-2xl p-6 backdrop-blur-xl bg-white/60 border border-white/60 shadow-sm transition-all duration-300 ${f.glow} hover:border-forest/20`}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${f.tint} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-forest mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-forest/70 leading-relaxed">
                  {f.desc}
                </p>
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--forest)/0.04), transparent 60%)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}