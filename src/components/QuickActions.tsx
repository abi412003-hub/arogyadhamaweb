"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { CalendarCheck, IndianRupee, Video } from "lucide-react";

const cards = [
  {
    icon: CalendarCheck,
    title: "Book Appointment",
    desc: "IPD & OPD scheduling",
    href: "/book-now",
    color: "text-forest",
  },
  {
    icon: IndianRupee,
    title: "Check Tariff & Plans",
    desc: "Accommodation & treatment costs",
    href: "/plan-your-stay/tariff",
    color: "text-sage",
  },
  {
    icon: Video,
    title: "Virtual Consultation",
    desc: "Consult from anywhere",
    href: "/book-now",
    color: "text-terracotta",
  },
];

export default function QuickActions() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 -mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
          >
            <Link
              to={card.href}
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-l-4 border-gold"
            >
              <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <card.icon size={22} className={card.color} />
              </div>
              <div>
                <div className="font-display font-semibold text-forest text-base leading-tight">
                  {card.title}
                </div>
                <div className="font-body text-sage text-sm mt-0.5">{card.desc}</div>
              </div>
              <span className="ml-auto text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all text-lg">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}