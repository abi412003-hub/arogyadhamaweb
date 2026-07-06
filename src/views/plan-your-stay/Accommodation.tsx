"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import {
  ChevronRight, Wifi, Wind, Coffee, Utensils, ShowerHead, BedDouble,
  Star, Users, Check, X
} from "lucide-react";
import { ACCOMMODATION_PHOTOS } from "@/lib/accommodation-photos";

// Maps each room to its real photo folder in public/accommodation
const PHOTO_SLUG: Record<string, string> = {
  dormitory: "dormitory",
  single: "ashirwad",
  "double-sharing": "maitri",
  "single-deluxe": "sheshadri",
  "double-deluxe": "semi-deluxe",
  suite: "suites",
};

/* ── Data ── */
const ROOMS = [
  {
    key: "dormitory",
    name: "Dormitory",
    subName: "Pushpa / Ashwini Ward",
    weeklyRate: 250,
    capacity: "Shared (8–12 beds)",
    desc: "A warm, community-oriented dormitory for patients who want the full Arogyadhama healing experience in a budget-friendly setting. The shared environment fosters camaraderie and the spirit of Maitri (friendship).",
    amenities: [
      { icon: BedDouble, label: "Single beds with mattress & linen" },
      { icon: ShowerHead, label: "Shared bathrooms (clean, well-maintained)" },
      { icon: Utensils, label: "Dining hall meals (3/day)" },
      { icon: Coffee, label: "Common lounge area" },
    ],
    highlights: ["Yoga kit provided", "Lockers available", "Nursing call facility"],
    color: "hsl(168 30% 28%)",
    accentBg: "hsl(168 30% 28% / 0.06)",
    svgPrimary: "hsl(168 30% 28%)",
    svgSecondary: "hsl(168 20% 55%)",
    perPerson: false,
    tier: "Essential",
    tierBg: "hsl(168 30% 28%)",
  },
  {
    key: "single",
    name: "Single Room",
    subName: "Ashirwad Block",
    weeklyRate: 500,
    capacity: "Single occupancy",
    desc: "A private, peaceful room with attached bathroom — ideal for patients who value solitude for rest and recovery. The Ashirwad block is situated close to the main therapy centres.",
    amenities: [
      { icon: BedDouble, label: "Comfortable single bed with quality linen" },
      { icon: ShowerHead, label: "Private attached bathroom" },
      { icon: Utensils, label: "In-room meal service" },
      { icon: Coffee, label: "Study table & chair" },
    ],
    highlights: ["Wardrobe storage", "Window with natural light", "Reading lamp"],
    color: "hsl(var(--forest))",
    accentBg: "hsl(var(--forest) / 0.06)",
    svgPrimary: "hsl(150 43% 16%)",
    svgSecondary: "hsl(150 35% 35%)",
    perPerson: false,
    tier: "Standard",
    tierBg: "hsl(150 43% 16%)",
  },
  {
    key: "double-sharing",
    name: "Double Sharing",
    subName: "Maitri Block",
    weeklyRate: 450,
    capacity: "2 persons (per person rate)",
    desc: "Designed for couples or companions healing together, the Maitri Block's double rooms offer the benefits of privacy with the warmth of a shared experience. Named after the Sanskrit concept of compassionate friendship.",
    amenities: [
      { icon: BedDouble, label: "Two single beds with full linen" },
      { icon: ShowerHead, label: "Shared attached bathroom" },
      { icon: Utensils, label: "In-room meal service" },
      { icon: Users, label: "Ideal for travelling companions" },
    ],
    highlights: ["Wardrobe for each person", "Good natural ventilation", "Community location"],
    color: "hsl(var(--terracotta))",
    accentBg: "hsl(var(--terracotta) / 0.07)",
    svgPrimary: "hsl(27 55% 50%)",
    svgSecondary: "hsl(27 45% 70%)",
    perPerson: true,
    tier: "Companion",
    tierBg: "hsl(27 50% 40%)",
  },
  {
    key: "single-deluxe",
    name: "Single Deluxe",
    subName: "Sheshadri Bhavan",
    weeklyRate: 850,
    capacity: "Single occupancy (Premium)",
    desc: "Premium private accommodation in the flagship Sheshadri Bhavan — Arogyadhama's most refined residential block. Upgraded furnishings, garden views, and priority access to all facilities.",
    amenities: [
      { icon: BedDouble, label: "Deluxe king-size bed & premium linen" },
      { icon: ShowerHead, label: "Luxury attached bathroom" },
      { icon: Wind, label: "Air conditioning" },
      { icon: Utensils, label: "Priority in-room meals" },
    ],
    highlights: ["Garden / nature view", "Premium furnishings", "Priority consultations", "Daily housekeeping"],
    color: "hsl(var(--gold))",
    accentBg: "hsl(var(--gold) / 0.07)",
    svgPrimary: "hsl(43 70% 28%)",
    svgSecondary: "hsl(43 70% 55%)",
    perPerson: false,
    tier: "Deluxe",
    tierBg: "hsl(43 70% 28%)",
  },
  {
    key: "double-deluxe",
    name: "Double Deluxe",
    subName: "Sheshadri Bhavan",
    weeklyRate: 750,
    capacity: "2 persons (per person rate)",
    desc: "The deluxe shared option — all the premium amenities of Sheshadri Bhavan at a per-person rate for two. Spacious enough for two to heal comfortably without compromise.",
    amenities: [
      { icon: BedDouble, label: "Two deluxe beds with premium linen" },
      { icon: ShowerHead, label: "Luxury attached bathroom" },
      { icon: Wind, label: "Air conditioning" },
      { icon: Utensils, label: "Priority in-room meals" },
    ],
    highlights: ["Garden / nature view", "Upgraded décor", "Priority consultations"],
    color: "hsl(200 55% 32%)",
    accentBg: "hsl(200 55% 32% / 0.06)",
    svgPrimary: "hsl(200 55% 25%)",
    svgSecondary: "hsl(200 45% 55%)",
    perPerson: true,
    tier: "Deluxe+",
    tierBg: "hsl(200 55% 32%)",
  },
  {
    key: "suite",
    name: "Suite Sharing",
    subName: "Premium Block",
    weeklyRate: 1000,
    capacity: "2 persons (per person rate)",
    desc: "The pinnacle of comfort at Arogyadhama — a suite shared between two, offering the highest quality accommodation, services, and attention available on campus.",
    amenities: [
      { icon: BedDouble, label: "Suite-grade beds & luxury linen" },
      { icon: ShowerHead, label: "Premium en-suite bathroom" },
      { icon: Wind, label: "Air conditioning + fan" },
      { icon: Star, label: "Concierge support" },
    ],
    highlights: ["Separate sitting area", "Premium furnishings", "Priority everything", "VIP scheduling", "Complimentary yoga kit upgrade"],
    color: "hsl(258 50% 35%)",
    accentBg: "hsl(258 50% 35% / 0.06)",
    svgPrimary: "hsl(258 45% 28%)",
    svgSecondary: "hsl(258 40% 60%)",
    perPerson: true,
    tier: "Suite",
    tierBg: "hsl(258 50% 35%)",
  },
];

/* ── SVG Room Illustrations ── */
function RoomIllustration({ room }: { room: typeof ROOMS[0] }) {
  const p = room.svgPrimary;
  const s = room.svgSecondary;
  const isSuite = room.key === "suite";
  const isDeluxe = room.key === "single-deluxe" || room.key === "double-deluxe";

  return (
    <svg viewBox="0 0 480 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`wallGrad-${room.key}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={s} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p} stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id={`lightGrad-${room.key}`} cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="hsl(43 89% 70%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Room background */}
      <rect width="480" height="280" fill={`url(#wallGrad-${room.key})`} />
      <rect width="480" height="280" fill={`url(#lightGrad-${room.key})`} />

      {/* Floor */}
      <rect x="0" y="220" width="480" height="60" fill={p} opacity="0.12" />
      {/* Floor boards */}
      {[0, 80, 160, 240, 320, 400].map((x) => (
        <line key={x} x1={x} y1="220" x2={x} y2="280" stroke={p} strokeWidth="0.5" opacity="0.2" />
      ))}

      {/* Back wall */}
      <line x1="0" y1="220" x2="480" y2="220" stroke={p} strokeWidth="0.8" opacity="0.2" />

      {/* Window */}
      <rect x="350" y="60" width="90" height="100" rx="4" fill="hsl(200 60% 80%)" opacity="0.6" />
      <rect x="350" y="60" width="90" height="100" rx="4" fill="none" stroke={p} strokeWidth="1.5" opacity="0.4" />
      <line x1="395" y1="60" x2="395" y2="160" stroke={p} strokeWidth="1" opacity="0.3" />
      <line x1="350" y1="110" x2="440" y2="110" stroke={p} strokeWidth="1" opacity="0.3" />
      {/* Curtains */}
      <path d={`M350,60 Q340,100 345,160`} stroke={p} strokeWidth="8" fill="none" opacity="0.15" />
      <path d={`M440,60 Q450,100 445,160`} stroke={p} strokeWidth="8" fill="none" opacity="0.15" />

      {/* BED(S) */}
      {(room.key === "dormitory") ? (
        // Multiple small beds
        [80, 175, 270].map((x, i) => (
          <g key={i}>
            <rect x={x} y="145" width="65" height="75" rx="4" fill="hsl(0 0% 98%)" stroke={p} strokeWidth="1" opacity="0.7" />
            <rect x={x} y="145" width="65" height="22" rx="4" fill={p} opacity="0.25" />
            <rect x={x + 5} y="155" width="55" height="12" rx="2" fill="hsl(0 0% 90%)" opacity="0.6" />
          </g>
        ))
      ) : room.perPerson ? (
        // Two beds
        <>
          <rect x="80" y="130" width="110" height="90" rx="5" fill="hsl(0 0% 98%)" stroke={p} strokeWidth="1.5" opacity="0.8" />
          <rect x="80" y="130" width="110" height="30" rx="5" fill={p} opacity="0.3" />
          <rect x="88" y="140" width="94" height="16" rx="3" fill="hsl(0 0% 90%)" opacity="0.7" />
          {/* pillow */}
          <rect x="88" y="143" width="42" height="12" rx="3" fill="hsl(0 0% 96%)" opacity="0.9" />
          <rect x="136" y="143" width="42" height="12" rx="3" fill="hsl(0 0% 96%)" opacity="0.9" />

          <rect x="220" y="130" width="110" height="90" rx="5" fill="hsl(0 0% 98%)" stroke={p} strokeWidth="1.5" opacity="0.8" />
          <rect x="220" y="130" width="110" height="30" rx="5" fill={p} opacity="0.3" />
          <rect x="228" y="140" width="94" height="16" rx="3" fill="hsl(0 0% 90%)" opacity="0.7" />
          <rect x="228" y="143" width="42" height="12" rx="3" fill="hsl(0 0% 96%)" opacity="0.9" />
          <rect x="276" y="143" width="42" height="12" rx="3" fill="hsl(0 0% 96%)" opacity="0.9" />
        </>
      ) : (
        // Single bed (larger for deluxe/suite)
        <>
          <rect x={isSuite ? 100 : isDeluxe ? 110 : 120}
            y={isSuite ? 110 : 125}
            width={isSuite ? 230 : isDeluxe ? 210 : 200}
            height={isSuite ? 110 : isDeluxe ? 100 : 95}
            rx="6" fill="hsl(0 0% 98%)" stroke={p} strokeWidth="1.5" opacity="0.85" />
          <rect x={isSuite ? 100 : isDeluxe ? 110 : 120}
            y={isSuite ? 110 : 125}
            width={isSuite ? 230 : isDeluxe ? 210 : 200}
            height="32"
            rx="6" fill={p} opacity={isSuite ? 0.4 : 0.28} />
          {/* Pillows */}
          <rect x={isSuite ? 115 : 130} y={isSuite ? 120 : 133} width="72" height="18" rx="4" fill="hsl(0 0% 96%)" opacity="0.95" />
          {(isSuite || isDeluxe) && (
            <rect x={isSuite ? 240 : 250} y={isSuite ? 120 : 133} width="72" height="18" rx="4" fill="hsl(0 0% 96%)" opacity="0.95" />
          )}
          {!isSuite && !isDeluxe && (
            <rect x="200" y="133" width="72" height="18" rx="4" fill="hsl(0 0% 96%)" opacity="0.95" />
          )}
        </>
      )}

      {/* Side table */}
      <rect x="42" y="165" width="28" height="45" rx="3" fill={p} opacity="0.18" />
      <circle cx="56" cy="160" r="8" fill="hsl(43 89% 65%)" opacity="0.5" /> {/* lamp */}

      {/* Plant */}
      <rect x="26" y="195" width="10" height="25" fill={p} opacity="0.25" />
      <ellipse cx="31" cy="192" rx="16" ry="20" fill={p} opacity="0.3" />
      <ellipse cx="25" cy="188" rx="10" ry="13" fill={p} opacity="0.2" />

      {/* AC unit for deluxe/suite */}
      {(isDeluxe || isSuite) && (
        <rect x="160" y="30" width="80" height="20" rx="3" fill={p} opacity="0.2" />
      )}

      {/* Tier label */}
      <rect x="20" y="20" width="80" height="24" rx="12" fill={p} opacity="0.8" />
      <text x="60" y="36" textAnchor="middle" fontFamily="sans-serif" fontSize="10"
        fill="hsl(51 97% 94%)" fontWeight="600">{room.tier}</text>
    </svg>
  );
}

/* ── Room Photo Gallery ── */
function RoomGallery({ photos, alt, tier, tierBg, accentBg }: {
  photos: string[]; alt: string; tier: string; tierBg: string; accentBg: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col" style={{ background: accentBg, minHeight: "240px" }}>
      <div className="relative flex-1 overflow-hidden" style={{ minHeight: "240px" }}>
        {photos.length > 0 && (
          <img
            src={photos[active]}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full text-cream"
            style={{ background: tierBg }}>
            {tier}
          </span>
        </div>
        {photos.length > 1 && (
          <div className="absolute bottom-3 left-3 font-body text-[10px] text-white/90 px-2 py-0.5 rounded-full bg-black/40">
            {active + 1} / {photos.length}
          </div>
        )}
      </div>
      {photos.length > 1 && (
        <div className="flex gap-1.5 p-2 overflow-x-auto bg-white/85">
          {photos.map((p, i) => (
            <button
              key={p}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className="h-11 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors"
              style={{ borderColor: i === active ? "hsl(var(--gold))" : "transparent" }}
            >
              <img src={p} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Room Card ── */
function RoomCard({ room, i }: { room: typeof ROOMS[0]; i: number }) {
  function fmt(n: number) { return "$" + n.toLocaleString("en-US"); }

  return (
    <motion.div
      id={room.key}
      className="bg-white rounded-3xl border border-border shadow-card overflow-hidden"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.07 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]">
        {/* Photo gallery */}
        <RoomGallery
          photos={ACCOMMODATION_PHOTOS[PHOTO_SLUG[room.key]] || []}
          alt={`${room.name} – ${room.subName}`}
          tier={room.tier}
          tierBg={room.tierBg}
          accentBg={room.accentBg}
        />

        {/* Content */}
        <div className="p-7 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-display font-bold text-forest text-2xl leading-tight">{room.name}</h3>
              <div className="font-body text-xs text-sage mt-0.5">{room.subName} · {room.capacity}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-display font-bold text-2xl" style={{ color: room.color }}>
                {fmt(room.weeklyRate)}
              </div>
              <div className="font-body text-xs text-sage">per week{room.perPerson ? " / person" : ""}</div>
            </div>
          </div>

          <p className="font-body text-forest/65 text-sm leading-relaxed mb-5">{room.desc}</p>

          {/* Amenities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
            {room.amenities.map((a) => (
              <div key={a.label} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: room.accentBg }}>
                  <a.icon size={13} style={{ color: room.color }} />
                </div>
                <span className="font-body text-xs text-forest/70 leading-tight">{a.label}</span>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-6">
            {room.highlights.map((h) => (
              <span key={h} className="font-body text-[10px] px-2.5 py-1 rounded-full border font-medium"
                style={{ borderColor: `${room.color}40`, color: room.color, background: room.accentBg }}>
                {h}
              </span>
            ))}
          </div>

          <div className="mt-auto">
            <Link to="/book-now"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-colors"
              style={{ background: room.color, color: "hsl(var(--cream))" }}>
              Book This Room <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Comparison Table ── */
function ComparisonTable() {
  const features = [
    "Private room",
    "Attached bathroom",
    "Air conditioning",
    "Garden view",
    "Priority consultations",
    "Sitting area",
  ];
  const roomFeatures: Record<string, boolean[]> = {
    dormitory: [false, false, false, false, false, false],
    single: [true, true, false, false, false, false],
    "double-sharing": [false, true, false, false, false, false],
    "single-deluxe": [true, true, true, true, true, false],
    "double-deluxe": [false, true, true, true, true, false],
    suite: [false, true, true, true, true, true],
  };

  function fmt(n: number) { return "$" + n.toLocaleString("en-US"); }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
      <table className="w-full" style={{ minWidth: "720px" }}>
        <thead>
          <tr style={{ background: "hsl(var(--forest))" }}>
            <th className="font-body font-semibold text-cream text-sm px-5 py-4 text-left w-44">Feature</th>
            {ROOMS.map((r) => (
              <th key={r.key} className="font-body font-semibold text-cream text-xs px-4 py-4 text-center">
                <div>{r.name}</div>
                <div className="text-gold/80 font-normal mt-0.5">{fmt(r.weeklyRate)}/wk</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feat, fi) => (
            <tr key={feat} className={fi % 2 === 0 ? "bg-white" : "bg-cream/40"}>
              <td className="font-body text-sm text-forest px-5 py-3.5">{feat}</td>
              {ROOMS.map((r) => (
                <td key={r.key} className="px-4 py-3.5 text-center">
                  {roomFeatures[r.key][fi]
                    ? <Check size={16} className="text-gold mx-auto" />
                    : <X size={16} className="text-forest/20 mx-auto" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-white px-5 py-3 border-t border-border">
        <p className="font-body text-xs text-sage">All rooms include: Yoga kit, 3 sattvic meals/day, medical consultations, yoga therapy sessions. Rates are Tuesday–Monday. Per person charges apply where indicated.</p>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function Accommodation() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 60%, hsl(150 35% 24%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/plan-your-stay" className="hover:text-gold transition-colors">Plan Your Stay</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Accommodation</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              Accommodation
            </h1>
            <p className="font-body text-cream/70 mt-4 max-w-xl leading-relaxed">
              From peaceful dormitories to premium suites — find the accommodation that matches your comfort needs and budget at Prashanti Kutiram.
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              {[["6 Types", "of rooms"], ["$250", "starting / week"], ["All inclusive", "meals & yoga"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-gold text-xl">{n}</div>
                  <div className="font-body text-cream/60 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Jump */}
      <div className="sticky top-16 z-20 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 py-2.5 overflow-x-auto">
          <span className="font-body text-xs text-sage uppercase tracking-widest font-semibold whitespace-nowrap mr-2">Jump to:</span>
          {ROOMS.map((r) => (
            <a key={r.key} href={`#${r.key}`}
              className="font-body text-sm px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors hover:bg-cream text-forest/60 hover:text-forest">
              {r.name}
            </a>
          ))}
        </div>
      </div>

      {/* Room Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        {ROOMS.map((r, i) => <RoomCard key={r.key} room={r} i={i} />)}
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
          <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">Room Comparison</span>
        </div>
        <ComparisonTable />
      </div>

      {/* CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 60%, hsl(var(--sage)) 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl text-cream font-bold mb-3">Ready to Reserve?</h2>
            <p className="font-body text-cream/70 mb-8">Use the tariff calculator to confirm your total cost, then book with our team.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/plan-your-stay/tariff"
                className="flex items-center justify-center gap-2 font-body font-semibold px-6 py-3 rounded-xl transition-colors"
                style={{ background: "hsl(var(--gold))", color: "hsl(var(--forest-dark))" }}>
                Calculate My Cost
              </Link>
              <Link to="/book-now"
                className="flex items-center justify-center gap-2 border-2 border-cream/30 text-cream font-body font-semibold px-6 py-3 rounded-xl hover:bg-cream/10 transition-colors">
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}