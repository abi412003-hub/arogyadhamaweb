"use client";
import { useEffect, useState, useRef, ReactNode } from "react";
import { Link } from "@/lib/router-compat";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { ChevronRight, Calendar, Phone } from "lucide-react";

/* ─── Types ─── */
export interface TherapySection {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TherapyPageConfig {
  therapyKey: "yoga" | "ayurveda" | "naturopathy" | "acupuncture" | "physiotherapy" | "yogic-counselling" | "ozone" | "diet-and-nutrition";
  breadcrumbLabel: string;
  heroGradient: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroImage?: string;
  heroImagePosition?: string;
  heroImageFit?: "cover" | "contain";
  sections: TherapySection[];
}

/* ─── Breadcrumb ─── */
function Breadcrumb({ label }: { label: string }) {
  return (
    <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60">
      {[
        { l: "Home", h: "/" },
        { l: "Therapies", h: "/therapies" },
        { l: label, h: undefined },
      ].map((item, i, arr) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.h ? (
            <Link to={item.h} className="hover:text-gold transition-colors">{item.l}</Link>
          ) : (
            <span className="text-cream/90">{item.l}</span>
          )}
          {i < arr.length - 1 && <ChevronRight size={12} />}
        </span>
      ))}
    </nav>
  );
}

/* ─── Scroll Spy Hook ─── */
function useSectionSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join(",")]);
  return active;
}

/* ─── Related Therapies ─── */
const ALL_THERAPIES = [
  { key: "yoga", label: "Yoga Therapy", href: "/therapies/yoga", desc: "Mind-body harmony through ancient practices", color: "bg-forest/8" },
  { key: "ayurveda", label: "Ayurveda", href: "/therapies/ayurveda", desc: "Time-tested herbal science for balance", color: "bg-sage/10" },
  { key: "naturopathy", label: "Naturopathy", href: "/therapies/naturopathy", desc: "Nature's healing through water, mud & diet", color: "bg-blue-50" },
  { key: "acupuncture", label: "Acupuncture", href: "/therapies/acupuncture", desc: "Meridian therapy for pain & energy flow", color: "bg-terracotta/10" },
  { key: "physiotherapy", label: "Physiotherapy", href: "/therapies/physiotherapy", desc: "Rehabilitative movement science", color: "bg-gold/10" },
  { key: "yogic-counselling", label: "Yogic Counselling & Psychotherapy", href: "/therapies/yogic-counselling", desc: "Mind-centred dialogue rooted in yoga psychology", color: "bg-forest/8" },
  { key: "ozone", label: "Ozone Therapy", href: "/therapies/ozone", desc: "Medical oxygen-ozone for oxygenation & detox", color: "bg-blue-50" },
  { key: "diet-and-nutrition", label: "Diet & Nutrition", href: "/therapies/diet-and-nutrition", desc: "Personalized nutrition for holistic wellness", color: "bg-green-500/10" },
];

function RelatedTherapies({ current }: { current: string }) {
  const related = ALL_THERAPIES.filter((t) => t.key !== current);
  return (
    <section className="py-20" style={{ background: "hsl(168 15% 97%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Explore Further</span>
          <h2 className="font-display text-display-md text-forest mt-4">Related Therapies</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                to={t.href}
                className="group block bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <h3 className="font-display font-semibold text-forest text-base mb-1.5">{t.label}</h3>
                <p className="font-body text-forest/55 text-xs leading-relaxed">{t.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold font-body text-gold group-hover:gap-2 transition-all">
                  <span>Explore</span><span>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Book CTA Banner ─── */
function BookCTABanner() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 60%, hsl(var(--sage)) 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">
            Ready to Begin Your Healing?
          </h2>
          <p className="font-body text-cream/70 mb-8 leading-relaxed">
            Speak with our integrative medicine specialists and receive a personalised treatment protocol designed for your specific condition and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-now"
              className="flex items-center justify-center gap-2 bg-gold text-forest-dark font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-gold-light transition-colors shadow-gold"
            >
              <Calendar size={16} />
              Book a Consultation
            </Link>
            <a
              href="tel:+919972871777"
              className="flex items-center justify-center gap-2 border-2 border-cream/40 text-cream font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-cream/10 transition-colors"
            >
              <Phone size={16} />
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Sticky Sidebar ─── */
function StickySidebar({ sections, active }: { sections: TherapySection[]; active: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-4">
        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-border shadow-card p-5">
          <div className="font-body text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-4 pb-3 border-b border-border">
            On This Page
          </div>
          <nav className="space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-body text-sm transition-all duration-200"
                style={{
                  background: active === s.id ? "hsl(var(--forest) / 0.08)" : "transparent",
                  color: active === s.id ? "hsl(var(--forest))" : "hsl(var(--forest) / 0.55)",
                  fontWeight: active === s.id ? "600" : "400",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                  style={{ background: active === s.id ? "hsl(var(--gold))" : "hsl(var(--forest) / 0.2)" }}
                />
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Compact Book CTA */}
        <div
          className="rounded-2xl p-5 text-center"
          style={{ background: "linear-gradient(135deg, hsl(var(--forest)), hsl(var(--sage)))" }}
        >
          <div className="font-display font-bold text-cream text-base mb-1">Ready to Heal?</div>
          <p className="font-body text-cream/70 text-xs mb-4 leading-relaxed">
            Get a personalised protocol from our specialists.
          </p>
          <Link
            to="/book-now"
            className="block w-full text-center bg-gold text-forest-dark font-body font-semibold text-sm py-2.5 rounded-xl hover:bg-gold-light transition-colors"
          >
            Book Consultation
          </Link>
          <a
            href="tel:+919972871777"
            className="block w-full text-center text-cream/70 font-body text-xs mt-2 hover:text-gold transition-colors"
          >
            or call 997-287-1777
          </a>
        </div>
      </div>
    </aside>
  );
}

/* ─── Main Template ─── */
export default function TherapyPageTemplate({ config }: { config: TherapyPageConfig }) {
  const sectionIds = config.sections.map((s) => s.id);
  const active = useSectionSpy(sectionIds);

  return (
    <Layout>
      {/* Hero */}
      <section
        className={`relative ${config.heroImage ? "pt-28 pb-32 md:pb-48 lg:pb-56 min-h-[640px] xl:min-h-[740px] 2xl:min-h-[820px]" : "pt-28 pb-14"} overflow-hidden bg-forest-dark`}
      >
        {/* Background photo */}
        {config.heroImage && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Fill background (only when the image fills the hero) */}
            {config.heroImageFit !== "contain" && (
              <img
                src={config.heroImage}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: config.heroImagePosition ?? "center" }}
              />
            )}
            {/* Foreground image (contained when requested) */}
            {config.heroImageFit === "contain" && (
              <img
                src={config.heroImage}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-contain"
                style={{ objectPosition: config.heroImagePosition ?? "center" }}
              />
            )}
            {/* Legibility scrim. The photo is unblurred, so this is what carries the
                text -- but the headline sits top-LEFT while the subjects sit centre,
                so a flat or top-weighted wash would dim the very faces it should show.
                Narrow screens: text spans the full width, so scrim evenly.
                Wide screens: weight it left, behind the text, leaving the subject clear. */}
            <div className="absolute inset-0 bg-forest-dark/60 lg:hidden" />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, hsl(var(--forest-dark) / 0.85) 0%, hsl(var(--forest-dark) / 0.55) 38%, hsl(var(--forest-dark) / 0.18) 68%, hsl(var(--forest-dark) / 0.08) 100%)",
              }}
            />
          </div>
        )}

        <div className="absolute left-0 top-0 h-1 w-full z-10" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        {config.heroImage && (
          <div className="absolute left-0 bottom-0 h-1 w-full z-10" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--terracotta)), hsl(var(--gold)))" }} />
        )}

        {/* Mandala watermark */}
        {!config.heroImage && (
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-64 h-64 opacity-[0.08] mr-8" fill="none">
              {[180, 140, 100].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} stroke="hsl(51 97% 94%)" strokeWidth="0.8" />
              ))}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <ellipse key={a} cx={200 + Math.cos((a * Math.PI) / 180) * 120} cy={200 + Math.sin((a * Math.PI) / 180) * 120}
                  rx="26" ry="52" transform={`rotate(${a}, ${200 + Math.cos((a * Math.PI) / 180) * 120}, ${200 + Math.sin((a * Math.PI) / 180) * 120})`}
                  stroke="hsl(51 97% 94%)" strokeWidth="0.5" />
              ))}
            </svg>
          </div>
        )}

        <div className="absolute left-0 top-0 h-1 w-full z-10" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        {config.heroImage && (
          <div className="absolute left-0 bottom-0 h-1 w-full z-10" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--terracotta)), hsl(var(--gold)))" }} />
        )}

        {/* Mandala watermark */}
        {!config.heroImage && (
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-64 h-64 opacity-[0.08] mr-8" fill="none">
              {[180, 140, 100].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} stroke="hsl(51 97% 94%)" strokeWidth="0.8" />
              ))}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <ellipse key={a} cx={200 + Math.cos((a * Math.PI) / 180) * 120} cy={200 + Math.sin((a * Math.PI) / 180) * 120}
                  rx="26" ry="52" transform={`rotate(${a}, ${200 + Math.cos((a * Math.PI) / 180) * 120}, ${200 + Math.sin((a * Math.PI) / 180) * 120})`}
                  stroke="hsl(51 97% 94%)" strokeWidth="0.5" />
              ))}
            </svg>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Breadcrumb label={config.breadcrumbLabel} />
            <div className="mt-5 inline-block font-body text-xs tracking-[0.3em] uppercase text-gold/80 border border-gold/30 rounded-full px-3 py-1 mb-4">
              {config.heroTagline}
            </div>
            <h1 className="font-display text-cream font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              {config.heroTitle}
            </h1>
            <p className="font-body text-cream/85 mt-4 max-w-xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
              {config.heroSubtitle}
            </p>
            <div className="flex gap-3 mt-8 lg:hidden">
              <Link to="/book-now" className="bg-gold text-forest-dark font-body font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-gold-light transition-colors">
                Book Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content + sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
          {/* Content sections */}
          <div className="space-y-0">
            {config.sections.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 pb-16 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <div
                  className="w-8 h-0.5 rounded-full mb-5"
                  style={{ background: "hsl(var(--gold))" }}
                />
                {section.content}
              </motion.section>
            ))}
          </div>

          {/* Sticky sidebar */}
          <StickySidebar sections={config.sections} active={active} />
        </div>
      </div>

      <RelatedTherapies current={config.therapyKey} />
      <BookCTABanner />
    </Layout>
  );
}