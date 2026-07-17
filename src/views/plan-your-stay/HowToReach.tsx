"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { MAPS_EMBED_SRC, MAPS_PLACE_URL, WAZE_URL } from "@/lib/location";
import {
  ChevronRight, MapPin, Car, Train, Bus, Phone,
  Navigation, Clock, Info
} from "lucide-react";

const DIRECTIONS = [
  {
    from: "Kempegowda International Airport (BLR)",
    icon: Navigation,
    distance: "~35 km",
    duration: "~55–70 min",
    color: "hsl(200 55% 32%)",
    bg: "hsl(200 55% 32% / 0.07)",
    steps: [
      "Exit airport and head towards NH 44 (Bengaluru–Chennai Highway) southbound.",
      "Take NH 44 south to Hosur Road / Sarjapur Road junction (~20 km).",
      "From Sarjapur Road, take Electronic City Flyover southbound.",
      "Continue on Hosur Road towards Anekal (~10 km).",
      "At Anekal town, take the road towards Jigani / Kalluballu (~4 km).",
      "Turn right at 'Prashanti Kutiram' signboard on Vivekananda Road. The main gate is visible from the road.",
    ],
    tip: "Cab from airport: Use Ola/Uber or the campus cab service (see below). Pre-booked cabs recommended.",
  },
  {
    from: "Bengaluru City Railway Station (KSR)",
    icon: Train,
    distance: "~33 km",
    duration: "~55–65 min",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--forest) / 0.07)",
    steps: [
      "Exit Bengaluru City Station and head south on Krishnarajendra Road.",
      "Take Bannerghatta Road (one of the main south arteries of Bengaluru).",
      "Continue on Bannerghatta Road all the way south, past Jayadeva Hospital and Bannerghatta Junction (~18 km).",
      "After Bannerghatta, take Jigani Link Road towards Anekal.",
      "Follow signs to Kalluballu Post and turn onto Vivekananda Road.",
      "Prashanti Kutiram is on the right — look for the S-VYASA / Arogyadhama signboard.",
    ],
    tip: "Auto-rickshaws go up to Bannerghatta; a cab is recommended for the final stretch to Kalluballu.",
  },
  {
    from: "Majestic Bus Stand (KSRTC / Satellite)",
    icon: Bus,
    distance: "~33 km",
    duration: "~50–65 min",
    color: "hsl(var(--terracotta))",
    bg: "hsl(var(--terracotta) / 0.07)",
    steps: [
      "From Majestic, board a Volvo or KSRTC bus towards Anekal / Chandapura (available from Platform 14–18).",
      "Alight at Jigani Cross or Anekal Town stop (journey: ~45–50 min).",
      "From Jigani Cross / Anekal: take an auto-rickshaw towards Kalluballu village (~4 km).",
      "Ask for 'Prashanti Kutiram' or 'S-VYASA' — all local auto drivers know the campus.",
      "Alternatively, book a campus cab from Majestic directly — recommended for elderly or group travel.",
    ],
    tip: "BMTC buses 500-series serve this route. Confirm the latest schedule at the stand.",
  },
];

export default function HowToReach() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(200 50% 12%) 0%, hsl(200 45% 18%) 55%, hsl(168 35% 20%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/plan-your-stay" className="hover:text-gold transition-colors">Plan Your Stay</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">How to Reach</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              How to Reach
            </h1>
            <p className="font-body text-cream/70 mt-4 max-w-xl leading-relaxed">
              Prashanti Kutiram is located 35 km south of Bengaluru — close enough to reach with ease, yet far enough to be truly away.
            </p>
            <div className="mt-5 flex items-start gap-2 font-body text-sm text-gold/80">
              <MapPin size={15} className="flex-shrink-0 mt-0.5" />
              <span>Prashanti Kutiram, Vivekananda Road, Kalluballu Post, Jigani, Anekal, Bengaluru – 560105</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-14">

        {/* Google Map */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Campus Location</span>
          </div>
          <motion.div className="rounded-3xl overflow-hidden border border-border shadow-card-hover"
            style={{ height: "420px" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <iframe
              title="Prashanti Kutiram – Arogyadhama Location"
              src={MAPS_EMBED_SRC}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
          <div className="mt-3 flex flex-wrap gap-4">
            <a href={MAPS_PLACE_URL}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm font-semibold transition-colors"
              style={{ color: "hsl(var(--forest))" }}>
              <Navigation size={14} /> Open in Google Maps
            </a>
            <a href={WAZE_URL}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm font-semibold transition-colors text-sage">
              <Car size={14} /> Open in Waze
            </a>
          </div>
        </div>

        {/* Directions */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
            <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Getting Here</span>
          </div>
          <div className="space-y-6">
            {DIRECTIONS.map((d, i) => (
              <motion.div key={d.from}
                className="bg-white rounded-2xl border border-border shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                {/* Header */}
                <div className="flex items-center gap-4 p-5 border-b border-border" style={{ background: d.bg }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: d.bg, border: `1.5px solid ${d.color}30` }}>
                    <d.icon size={20} style={{ color: d.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-forest text-lg leading-tight">From {d.from}</h3>
                    <div className="flex items-center gap-4 mt-0.5">
                      <span className="flex items-center gap-1 font-body text-xs text-sage">
                        <MapPin size={10} /> {d.distance}
                      </span>
                      <span className="flex items-center gap-1 font-body text-xs text-sage">
                        <Clock size={10} /> {d.duration}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Steps */}
                <div className="p-5">
                  <ol className="space-y-3 mb-4">
                    {d.steps.map((step, si) => (
                      <li key={si} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-body text-xs font-bold text-cream mt-0.5"
                          style={{ background: d.color }}>
                          {si + 1}
                        </div>
                        <p className="font-body text-sm text-forest/75 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="flex items-start gap-2 rounded-xl p-3" style={{ background: d.bg }}>
                    <Info size={13} style={{ color: d.color }} className="flex-shrink-0 mt-0.5" />
                    <p className="font-body text-xs leading-relaxed" style={{ color: d.color }}>{d.tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cab Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div className="bg-white rounded-2xl border border-border shadow-card p-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "hsl(var(--gold) / 0.1)" }}>
              <Car size={20} className="text-gold" />
            </div>
            <h3 className="font-display font-bold text-forest text-xl mb-2">Campus Cab Service</h3>
            <p className="font-body text-sm text-sage leading-relaxed mb-4">
              Arogyadhama-associated cab services can arrange pick-up from the airport, railway station, or bus stand. Advance booking recommended.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <a href="tel:9902180006" className="font-body font-semibold text-forest hover:text-gold transition-colors">
                  9902180006
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <a href="tel:7349029157" className="font-body font-semibold text-forest hover:text-gold transition-colors">
                  7349029157
                </a>
              </div>
            </div>
            <p className="font-body text-xs text-sage mt-3">Please call 1 day in advance to arrange pickup.</p>
          </motion.div>

          {/* Campus Entry */}
          <motion.div className="bg-white rounded-2xl border border-border shadow-card p-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "hsl(var(--forest) / 0.08)" }}>
              <MapPin size={20} className="text-forest" />
            </div>
            <h3 className="font-display font-bold text-forest text-xl mb-2">Campus Entry</h3>
            <div className="space-y-3">
              {[
                { label: "Gate", detail: "Main gate is on Vivekananda Road — clearly signboarded 'S-VYASA / Prashanti Kutiram'." },
                { label: "Security", detail: "ID is required at entry. Please carry your admission confirmation and a government-issued photo ID." },
                { label: "Vehicles", detail: "Visitor vehicles may be parked at the designated area near the main gate. Campus is pedestrian-friendly." },
                { label: "Check-in", detail: "IPD admission check-in is on Tuesdays. Please arrive before 11:00 AM for smooth processing." },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="font-body text-xs font-semibold uppercase tracking-widest text-gold w-16 flex-shrink-0 pt-0.5">{item.label}</span>
                  <p className="font-body text-sm text-forest/70 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Landmark illustration */}
        <motion.div className="rounded-3xl overflow-hidden border border-border shadow-card"
          style={{ background: "hsl(var(--forest) / 0.04)", padding: "1.5rem" }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-4">
            <Info size={15} className="text-gold" />
            <h3 className="font-display font-bold text-forest text-lg">Useful Landmarks</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Bannerghatta National Park", dist: "~3 km north" },
              { name: "Jigani Industrial Area", dist: "~4 km northwest" },
              { name: "Anekal Town", dist: "~6 km southeast" },
              { name: "Electronic City", dist: "~12 km north" },
              { name: "Begur Fort", dist: "~15 km north" },
              { name: "Attibele", dist: "~10 km south (TN border)" },
            ].map((l) => (
              <div key={l.name} className="flex gap-2">
                <MapPin size={13} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-body text-sm font-semibold text-forest">{l.name}</div>
                  <div className="font-body text-xs text-sage">{l.dist}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* CTA */}
      <section className="py-14" style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 60%, hsl(var(--sage)) 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl text-cream font-bold mb-3">Any Questions?</h2>
            <p className="font-body text-cream/70 mb-8">Our team is happy to help with travel directions and arrange cab services.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:08022639963"
                className="flex items-center justify-center gap-2 font-body font-semibold px-6 py-3 rounded-xl transition-colors"
                style={{ background: "hsl(var(--gold))", color: "hsl(var(--forest-dark))" }}>
                <Phone size={15} /> Call: 080-2263-9963
              </a>
              <Link to="/contact"
                className="flex items-center justify-center gap-2 border-2 border-cream/30 text-cream font-body font-semibold px-6 py-3 rounded-xl hover:bg-cream/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}