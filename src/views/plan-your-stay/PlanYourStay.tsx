"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import campusAerial from "@/assets/campus-aerial.jpg";
import {
  ChevronRight, Calculator, BedDouble, Clock3, Backpack,
  MapPin, Calendar, Phone, Leaf, Sun, Heart, HeartHandshake
} from "lucide-react";
import { useGeoPricing, formatRegionPrice } from "@/hooks/useGeoPricing";

const QUICK_LINKS = [
  {
    href: "/plan-your-stay/tariff",
    icon: Calculator,
    title: "Tariff & Packages",
    desc: "Interactive cost calculator. Choose accommodation, duration, and therapies to get your personalised quote.",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.08)",
  },
  {
    href: "/plan-your-stay/accommodation",
    icon: BedDouble,
    title: "Accommodation",
    desc: "From dormitories to suites — explore every room type with amenities and pricing at Prashanti Kutiram.",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--maroon) / 0.08)",
  },
  {
    href: "/plan-your-stay/schedule",
    icon: Clock3,
    title: "Daily Schedule",
    desc: "A beautiful visual timeline of your day — from 5:30 AM Om Meditation to 8:15 PM Happy Assembly.",
    color: "hsl(var(--sage))",
    bg: "hsl(var(--maroon-muted) / 0.08)",
  },
  {
    href: "/plan-your-stay/what-to-bring",
    icon: Backpack,
    title: "What to Bring",
    desc: "An interactive checklist of documents, personal items, clothing, and medications to pack.",
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.08)",
  },
  {
    href: "/plan-your-stay/how-to-reach",
    icon: MapPin,
    title: "How to Reach",
    desc: "Directions from Bengaluru Airport, City Station, and Majestic — with cab contacts and campus map.",
    color: "hsl(200 60% 35%)",
    bg: "hsl(200 60% 35% / 0.08)",
  },
  {
    href: "/plan-your-stay/after-care",
    icon: HeartHandshake,
    title: "After Care",
    desc: "The Arogyadhama Aftercare Program — stay connected to the doctors, therapists and practices that helped you heal.",
    color: "hsl(258 50% 35%)",
    bg: "hsl(258 50% 35% / 0.08)",
  },
];

const INCLUSIONS = [
  { icon: BedDouble, label: "Accommodation" },
  { icon: Leaf, label: "Sattvic Meals (3/day)" },
  { icon: Heart, label: "Medical Consultations" },
  { icon: Sun, label: "All Therapies Included" },
  { icon: Calendar, label: "Yoga Kit Provided" },
  { icon: Phone, label: "24/7 Nursing Support" },
];

export default function PlanYourStay() {
  // Starting-price stat follows the visitor's region (India ₹6,600 / outside $250),
  // hidden as "—" until the live location resolves.
  const { currency } = useGeoPricing();
  const HIGHLIGHTS = [
    { stat: "600+", label: "Bed Hospital" },
    { stat: formatRegionPrice(6600, 250, currency) ?? "—", label: "Starting from / week" },
    { stat: "6 nights", label: "Minimum stay" },
    { stat: "50+", label: "Years of healing" },
  ];
  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative pt-28 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(150 35% 28%) 100%)" }}
      >
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        {/* Decorative mandala */}
        <div className="absolute right-0 top-0 h-full flex items-center pointer-events-none opacity-[0.06]">
          <svg viewBox="0 0 500 500" className="w-96 h-96 mr-[-4rem]" fill="none">
            {[220, 175, 130, 85, 40].map((r) => (
              <circle key={r} cx="250" cy="250" r={r} stroke="hsl(51 97% 94%)" strokeWidth="0.8" />
            ))}
            {Array.from({ length: 16 }, (_, i) => i * 22.5).map((a) => (
              <line key={a} x1="250" y1="250"
                x2={250 + Math.cos(a * Math.PI / 180) * 220}
                y2={250 + Math.sin(a * Math.PI / 180) * 220}
                stroke="hsl(51 97% 94%)" strokeWidth="0.4" />
            ))}
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Plan Your Stay</span>
            </nav>
            <div className="inline-block font-body text-xs tracking-[0.3em] uppercase text-gold/80 border border-gold/30 rounded-full px-3 py-1 mb-4">
              Your Healing Journey Awaits
            </div>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.08 }}>
              Plan Your<br />Healing Journey
            </h1>
            <p className="font-body text-cream/75 mt-5 max-w-xl leading-relaxed" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
              Everything you need for a transformative stay at Arogyadhama — from tariff and accommodation to daily schedules and travel directions.
            </p>
            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mt-10">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div key={h.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
                  <div className="font-display font-bold text-gold text-2xl">{h.stat}</div>
                  <div className="font-body text-cream/60 text-xs">{h.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inclusions banner */}
      <section className="py-8 border-b border-border" style={{ background: "hsl(var(--cream-dark))" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="font-body text-xs tracking-[0.2em] uppercase font-semibold text-gold">All packages include:</div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {INCLUSIONS.map((inc) => (
                <div key={inc.label} className="flex items-center gap-2">
                  <inc.icon size={14} className="text-forest" />
                  <span className="font-body text-sm text-forest/70">{inc.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Navigation</span>
            <h2 className="font-display text-display-md text-forest mt-3">Everything You Need to Know</h2>
            <p className="font-body text-sage mt-3 max-w-xl mx-auto">Select any section to explore detailed information about your stay at Prashanti Kutiram.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {QUICK_LINKS.map((ql, i) => (
              <motion.div key={ql.href}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={ql.href}
                  className="group flex flex-col h-full bg-white rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: ql.bg }}>
                    <ql.icon size={22} style={{ color: ql.color }} />
                  </div>
                  <h3 className="font-display font-bold text-forest text-xl mb-2">{ql.title}</h3>
                  <p className="font-body text-forest/60 text-sm leading-relaxed flex-1">{ql.desc}</p>
                  <div className="flex items-center gap-1.5 mt-5 font-body text-sm font-semibold" style={{ color: ql.color }}>
                    Explore <ChevronRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Highlight */}
      <section className="py-20" style={{ background: "hsl(345 15% 97%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="section-label">Our Campus</span>
              <h2 className="font-display text-display-md text-forest mt-3 mb-5">Prashanti Kutiram<br /><em className="not-italic text-gold">Abode of Peace</em></h2>
              <div className="space-y-4 font-body text-forest/65 leading-relaxed">
                <p>Nestled in the serene suburbs of Bengaluru, adjacent to the Bannerghatta hills, Prashanti Kutiram is a 35km sanctuary from the city's chaos — yet accessible when you need it.</p>
                <p>The campus is a self-contained healing village: 600-bed hospital, treatment centres, vegetable gardens, meditation halls, yoga shala, nature walking paths, and the gentle presence of Bannerghatta wildlife reserve on the boundary.</p>
                <p>Patients describe the campus itself as therapeutic — the birdsong, the clean air, the green canopy, and the profound silence of early morning meditation create conditions for healing that no urban hospital can replicate.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 font-body text-sm text-sage">
                  <MapPin size={14} className="text-gold" />
                  Kalluballu, Anekal, Bengaluru 560105
                </div>
                <div className="flex items-center gap-2 font-body text-sm text-sage">
                  <Phone size={14} className="text-gold" />
                  35km from Bengaluru Central
                </div>
              </div>
            </motion.div>
            {/* Campus aerial photo */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative h-72 lg:h-96 rounded-3xl overflow-hidden shadow-card-hover">
              <img src={campusAerial} alt="Aerial view of Prashanti Kutiram campus" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-muted)) 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">Ready to Begin?</h2>
            <p className="font-body text-cream/70 mb-8">Use our interactive tariff calculator to plan your stay, then book directly with our team.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/plan-your-stay/tariff"
                className="flex items-center justify-center gap-2 bg-gold text-forest-dark font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-gold-light transition-colors shadow-gold">
                <Calculator size={16} /> Calculate Your Cost
              </Link>
              <Link to="/book-now"
                className="flex items-center justify-center gap-2 border-2 border-cream/40 text-cream font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-cream/10 transition-colors">
                <Calendar size={16} /> Book Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}