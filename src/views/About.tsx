"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import campusSaraswati from "@/assets/campus/saraswati.jpg";
import campusChariot from "@/assets/campus/chariot.jpg";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import FoundersSection from "@/components/FoundersSection";
import {
  ChevronRight,
  BookOpen,
  FlaskConical,
  TreePine,
  BarChart3,
} from "lucide-react";

/* ─── Breadcrumb ─── */
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.href ? (
            <Link to={item.href} className="hover:text-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-cream/90">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={12} />}
        </span>
      ))}
    </nav>
  );
}

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section
      className="relative pt-28 pb-14 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-light)) 100%)" }}
    >
      {/* Mandala watermark */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-72 h-72 opacity-[0.07] mr-8" fill="none">
          {[180, 140, 100, 60].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} stroke="hsl(51 97% 94%)" strokeWidth="0.8" />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <ellipse
              key={a}
              cx={200 + Math.cos((a * Math.PI) / 180) * 120}
              cy={200 + Math.sin((a * Math.PI) / 180) * 120}
              rx="28" ry="56"
              transform={`rotate(${a}, ${200 + Math.cos((a * Math.PI) / 180) * 120}, ${200 + Math.sin((a * Math.PI) / 180) * 120})`}
              stroke="hsl(51 97% 94%)" strokeWidth="0.6"
            />
          ))}
        </svg>
      </div>

      {/* Gold accent bar */}
      <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Arogyadhama" }]} />
          <h1 className="font-display text-cream mt-5 font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
            About Arogyadhama
          </h1>
          <p className="font-body text-cream/70 mt-4 max-w-xl" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
            A 40-year journey of healing, research, and scientific validation of India's ancient wellness traditions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Count-up hook ─── */
function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ─── Legacy Section ─── */
function LegacySection() {
  const milestones = [
    { year: "1981", label: "VK YOCTAS Founded", color: "bg-maroon-muted" },
    { year: "1986", label: "Renamed VKYOGAS", color: "bg-maroon-light" },
    { year: "2000", label: "Renamed VYASA", color: "bg-maroon" },
    { year: "2002", label: "S-VYASA, Bengaluru", color: "bg-maroon-dark" },
  ];

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Our Legacy</span>
            <h2 className="font-display text-display-md text-forest mt-4 mb-6">
              Four Decades of Purpose
            </h2>
            <div className="space-y-4 font-body text-forest/70 leading-relaxed">
              <p>
                Arogyadhama's story is inseparable from the visionary journey of S-VYASA — Swami Vivekananda Yoga Anusandhana Samsthana. What began in 1981 as a humble yoga therapy research unit called <strong className="text-forest">VK YOCTAS</strong> has grown into India's most respected integrative medicine institution.
              </p>
              <p>
                In 1986, the organisation expanded its scope and was renamed <strong className="text-forest">VKYOGAS</strong>, deepening its research into the therapeutic applications of Yoga. By 2000, under the name <strong className="text-forest">VYASA</strong>, it had become synonymous with rigorous, peer-reviewed Yoga science in India.
              </p>
              <p>
                The pivotal moment came in 2002, when the University Grants Commission (UGC) conferred the status — making S-VYASA, Bengaluru the world's first and only university dedicated entirely to Yoga science and integrative medicine. Arogyadhama, its hospital arm, became the clinical laboratory where research met real healing.
              </p>
            </div>
            <Link to="/about/history" className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-forest hover:text-gold transition-colors group">
              Explore Full History <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Mini timeline */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-card border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className={`w-16 h-16 rounded-2xl ${m.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="font-display font-bold text-cream text-sm">{m.year}</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-forest text-base">{m.label}</p>
                  <div className="h-0.5 w-8 mt-2 rounded-full" style={{ background: "hsl(var(--gold))" }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Approach Section ─── */
function ApproachSection() {
  const pillars = [
    { name: "Yoga Therapy", desc: "Scientific application of asana, pranayama, meditation for disease management" },
    { name: "Ayurveda", desc: "Personalized herbal formulations, Panchakarma detox, dietary guidelines" },
    { name: "Naturopathy", desc: "Mud therapy, hydrotherapy, fasting, sunlight therapy, water treatments" },
    { name: "Acupuncture", desc: "Traditional Chinese meridian therapy for pain and systemic healing" },
    { name: "Physiotherapy", desc: "Movement science and rehabilitation for mobility restoration" },
    { name: "Psychotherapy", desc: "Mind-body counseling, cognitive behavioral tools, and group therapy" },
    { name: "Diet & Nutrition", desc: "Therapeutic sattvic diet plans designed around individual conditions" },
    { name: "Modern Diagnostics", desc: "Full lab, ECG, echo, pulmonary function tests — all under one roof" },
  ];

  return (
    <section className="py-20" style={{ background: "hsl(345 15% 97%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Approach</span>
          <h2 className="font-display text-display-md text-forest mt-4 max-w-2xl mx-auto">
            Not Alternative. <em className="not-italic text-gold">Integrative.</em>
          </h2>
          <p className="font-body text-forest/60 mt-4 max-w-2xl mx-auto leading-relaxed">
            At Arogyadhama, we don't choose between ancient wisdom and modern science — we unite them. Every patient receives a personalised protocol combining multiple healing modalities, all grounded in peer-reviewed research and guided by experienced physicians.
          </p>
        </motion.div>

        {/* Central diagram */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center text-center"
              style={{ borderColor: "hsl(var(--gold) / 0.3)", background: "hsl(var(--gold) / 0.05)" }}>
              <div>
                <p className="font-display font-bold text-forest text-xs leading-tight">Integrative</p>
                <p className="font-display font-bold text-gold text-xs">Medicine</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {pillars.map((p, i) => (
              <motion.div
                key={p.name}
                className="bg-white rounded-2xl p-5 shadow-card border border-border text-center group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <div className="w-2 h-2 rounded-full mx-auto mb-3" style={{ background: "hsl(var(--gold))" }} />
                <h4 className="font-display font-semibold text-forest text-sm mb-1.5">{p.name}</h4>
                <p className="font-body text-forest/50 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Campus Section ─── */
function CampusSection() {
  const campusImages = [
    { src: campusSaraswati, alt: "Saraswati statue at Prashanti Kutiram" },
    { src: campusChariot, alt: "Arjuna's chariot sculpture on campus" },
  ];
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setImgIdx((i) => (i + 1) % campusImages.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Campus photo carousel with cross-fade transition */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-maroon-dark shadow-elegant">
              <AnimatePresence mode="sync">
                <motion.img
                  key={imgIdx}
                  src={campusImages[imgIdx].src}
                  alt={campusImages[imgIdx].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </AnimatePresence>
              {/* Gradient overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/85 via-maroon-dark/20 to-transparent pointer-events-none" />
              {/* Overlay text */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="bg-maroon-dark/70 backdrop-blur-sm rounded-2xl p-5 border border-gold/20">
                  <div className="font-body text-xs tracking-widest uppercase text-gold/80 mb-1">Prashanti Kutiram</div>
                  <div className="font-display text-cream font-semibold text-lg">Abode of Peace &amp; Spiritual Serenity</div>
                  <div className="font-body text-cream/60 text-xs mt-1">35 km from Bengaluru Central · Adjacent to Bannerghatta Hills</div>
                </div>
              </div>
              {/* Dots */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                {campusImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-6 bg-gold" : "w-1.5 bg-cream/60 hover:bg-cream"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Our Campus</span>
            <h2 className="font-display text-display-md text-forest mt-4 mb-6">
              Prashanti Kutiram —<br />
              <em className="not-italic text-gold">Where Healing Begins</em>
            </h2>
            <div className="space-y-4 font-body text-forest/70 leading-relaxed">
              <p>
                Prashanti Kutiram — the "Abode of Supreme Peace" — is not merely a campus. It is an experience. Located on the outskirts of Bengaluru, tucked against the serene Bannerghatta hills, about 35 kilometres from the city centre, this rural sanctuary was chosen with deep intentionality.
              </p>
              <p>
                The healing environment itself is therapeutic. Fresh air, birdsong, open skies, and the proximity of a biodiverse forest create the conditions that Ayurveda and Naturopathy have long prescribed: reconnection with nature as medicine.
              </p>
              <p>
                Within this 100-acre campus, our 350-bed hospital, yoga halls, meditation gardens, Ayurvedic pharmacy, research laboratories, and residences for faculty and students coexist in harmony. The architectural philosophy reflects the integration we practice — traditional Indian design principles merged with functional modern infrastructure.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "100+ Acres", sub: "Lush green campus" },
                { label: "350 Beds", sub: "Inpatient capacity" },
                { label: "35 km", sub: "From Bengaluru city" },
                { label: "24/7", sub: "Medical support" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-border shadow-card text-center">
                  <div className="font-display font-bold text-forest text-xl">{s.label}</div>
                  <div className="font-body text-sage text-xs mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Numbers Section ─── */
function NumbersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: 40, suffix: "+", label: "Years of Excellence", sub: "Since 1981" },
    { value: 45000, suffix: "+", label: "Patients Treated", sub: "From across the world" },
    { value: 350, suffix: "", label: "Inpatient Beds", sub: "Full-facility hospital" },
    { value: 400, suffix: "+", label: "Research Papers", sub: "PubMed indexed" },
    { value: 11, suffix: "", label: "Clinical Depts", sub: "Specialised care" },
    { value: 7500, suffix: "+", label: "Yoga Camps", sub: "Across India" },
  ];

  function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
    const count = useCountUp(value, inView);
    return <>{count.toLocaleString()}{suffix}</>;
  }

  return (
    <section ref={ref} className="py-20" style={{ background: "hsl(var(--maroon-dark))" }}>
      {/* Lotus tile overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="about-lotus" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="30" stroke="hsl(51 97% 94%)" strokeWidth="0.5" fill="none" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <ellipse key={a} cx={40 + Math.cos((a * Math.PI) / 180) * 20} cy={40 + Math.sin((a * Math.PI) / 180) * 20}
                  rx="6" ry="12" transform={`rotate(${a}, ${40 + Math.cos((a * Math.PI) / 180) * 20}, ${40 + Math.sin((a * Math.PI) / 180) * 20})`}
                  stroke="hsl(51 97% 94%)" strokeWidth="0.4" fill="none" />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-lotus)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold/70">By The Numbers</span>
          <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mt-3">
            A Legacy Written in <em className="not-italic text-gold">Lives Transformed</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="font-display font-bold mb-1.5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "hsl(var(--gold))" }}>
                <Counter value={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div className="font-body font-semibold text-cream/85 text-sm">{s.label}</div>
              <div className="font-body text-cream/45 text-xs mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function About() {
  return (
    <Layout>
      <PageHero />
      <LegacySection />
      <FoundersSection />
      <ApproachSection />
      <CampusSection />
      <NumbersSection />
    </Layout>
  );
}