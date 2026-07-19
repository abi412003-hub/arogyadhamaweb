"use client";
import { useEffect, useState, ReactNode } from "react";
import { Link } from "@/lib/router-compat";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import {
  ChevronRight, Calendar, Phone, Zap, Activity,
  Brain, Heart, Wind, Smile, Bone, Syringe, Microscope, TestTube, Sun, User2
} from "lucide-react";
import drRNagarathna from "@/assets/team/dr-r-nagarathna.jpg";
import drAmitSingh from "@/assets/team/dr-amit-singh.jpg";

/* ─── Types ─── */
export interface DeptSection {
  id: string;
  label: string;
  content: ReactNode;
}

export interface DeptPageConfig {
  deptKey: string;
  breadcrumbLabel: string;
  heroGradient: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  /** One image, or several — multiple images crossfade in a slow slideshow. */
  heroImage?: string | string[];
  heroImageAlt?: string;
  /** HSL components (e.g. "258 60% 15%") the hero image fades into — should match the heroGradient's start colour. */
  heroImageBlend?: string;
  sections: DeptSection[];
}

/* ─── Scroll Spy ─── */
function useSectionSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [ids.join(",")]);
  return active;
}

/* ─── Breadcrumb ─── */
function Breadcrumb({ label }: { label: string }) {
  return (
    <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60">
      {[
        { l: "Home", h: "/" },
        { l: "Departments", h: "/departments" },
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

/* ─── Related Departments ─── */
export const ALL_DEPTS = [
  { key: "neurology", label: "Neurology", href: "/departments/neurology", icon: Brain, tag: "Brain & Nerves" },
  { key: "oncology", label: "Oncology", href: "/departments/oncology", icon: Microscope, tag: "Cancer Care" },
  { key: "cardiology", label: "Cardiology", href: "/departments/cardiology", icon: Heart, tag: "Heart Health" },
  { key: "pulmonology", label: "Pulmonology", href: "/departments/pulmonology", icon: Wind, tag: "Respiratory" },
  { key: "psychiatry", label: "Psychiatry", href: "/departments/psychiatry", icon: Smile, tag: "Mind & Emotions" },
  { key: "rheumatology", label: "Rheumatology", href: "/departments/rheumatology", icon: Bone, tag: "Joints & Muscles" },
  { key: "spinal", label: "Spinal Disorders", href: "/departments/spinal", icon: Activity, tag: "Spine & Back" },
  { key: "diabetes", label: "Diabetes & Metabolic", href: "/departments/diabetes", icon: TestTube, tag: "Metabolic Health" },
  { key: "gastroenterology", label: "Gastroenterology", href: "/departments/gastroenterology", icon: Syringe, tag: "Gut Health" },
  { key: "endocrinology", label: "Endocrinology", href: "/departments/endocrinology", icon: Zap, tag: "Hormones" },
  { key: "positive-health", label: "Positive Health", href: "/departments/positive-health", icon: Sun, tag: "Wellness" },
];

function RelatedDepts({ current }: { current: string }) {
  const related = ALL_DEPTS.filter((d) => d.key !== current).slice(0, 4);
  return (
    <section className="py-20" style={{ background: "hsl(345 15% 97%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-label">Explore Further</span>
          <h2 className="font-display text-display-md text-forest mt-4">Related Departments</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((d, i) => (
            <motion.div key={d.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link to={d.href} className="group block bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="font-body text-[10px] tracking-widest uppercase text-gold font-semibold mb-1">{d.tag}</div>
                <h3 className="font-display font-semibold text-forest text-base mb-2">{d.label}</h3>
                <div className="flex items-center gap-1 text-xs font-semibold font-body text-gold group-hover:gap-2 transition-all">
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

/* ─── Book CTA ─── */
function BookCTABanner() {
  return (
    <section className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 60%, hsl(var(--maroon-muted)) 100%)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">Ready to Begin Your Healing?</h2>
          <p className="font-body text-cream/70 mb-8 leading-relaxed">
            Speak with our integrative specialists and receive a personalised protocol designed for your specific condition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-now" className="flex items-center justify-center gap-2 bg-gold text-forest-dark font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-gold-light transition-colors shadow-gold">
              <Calendar size={16} /> Book a Consultation
            </Link>
            <a href="tel:+919972871777" className="flex items-center justify-center gap-2 border-2 border-cream/40 text-cream font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-cream/10 transition-colors">
              <Phone size={16} /> Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Sticky Sidebar ─── */
function StickySidebar({ sections, active }: { sections: DeptSection[]; active: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-4">
        <div className="bg-white rounded-2xl border border-border shadow-card p-5">
          <div className="font-body text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-4 pb-3 border-b border-border">On This Page</div>
          <nav className="space-y-1">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-body text-sm transition-all duration-200"
                style={{
                  background: active === s.id ? "hsl(var(--maroon) / 0.08)" : "transparent",
                  color: active === s.id ? "hsl(var(--maroon))" : "hsl(var(--maroon) / 0.55)",
                  fontWeight: active === s.id ? "600" : "400",
                }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                  style={{ background: active === s.id ? "hsl(var(--gold))" : "hsl(var(--maroon) / 0.2)" }} />
                {s.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, hsl(var(--maroon)), hsl(var(--maroon-muted)))" }}>
          <div className="font-display font-bold text-cream text-base mb-1">Ready to Heal?</div>
          <p className="font-body text-cream/70 text-xs mb-4 leading-relaxed">Get a personalised protocol from our specialists.</p>
          <Link to="/book-now" className="block w-full text-center bg-gold text-forest-dark font-body font-semibold text-sm py-2.5 rounded-xl hover:bg-gold-light transition-colors">
            Book Consultation
          </Link>
          <a href="tel:+919972871777" className="block w-full text-center text-cream/70 font-body text-xs mt-2 hover:text-gold transition-colors">
            or call 997-287-1777 / 961-134-4691
          </a>
        </div>
      </div>
    </aside>
  );
}

/* ─── Clinical Team (Dr. Nagarathna + supporting doctors) ─── */
import { DepartmentDoctorsGrid, hasDeptDoctors } from "@/components/DepartmentDoctors";

const FALLBACK_SUPPORTING_DOCTORS = [
  { name: "Dr. R. Nagendra Prasad", qual: "MD (Ayurveda)", role: "Senior Ayurvedic Physician" },
  { name: "Dr. Apar Saoji", qual: "MD (Yoga & Rehabilitation)", role: "Consultant — Yoga Therapy" },
  { name: "Dr. Suchitra Patil", qual: "MBBS, MD", role: "Consultant Physician" },
  { name: "Dr. Amit Singh", qual: "MD (Naturopathy)", role: "Consultant Naturopath" },
  { name: "Dr. Latha Satish", qual: "PhD (Psychology)", role: "Clinical Psychologist" },
];

function ClinicalTeamSection({ deptKey }: { deptKey: string }) {
  const useDeptDoctors = hasDeptDoctors(deptKey);
  return (
    <motion.section id="clinical-team" className="scroll-mt-28 pb-8"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
      <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: "hsl(var(--gold))" }} />
      <SectionHeading
        label="Clinical Team"
        title={<>Led by <em className="not-italic text-gold">Dr. R. Nagarathna</em> &amp; <em className="not-italic text-gold">Dr. Amit Singh</em></>}
        subtitle="Every department at Arogyadhama is anchored by Dr. Nagarathna's clinical leadership alongside Dr. Amit Singh, supported by a team of consulting physicians from across our integrative disciplines."
      />

      {/* Lead — Dr. Nagarathna */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold/30 shadow-card mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)))" }} />
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30" style={{ background: "linear-gradient(135deg, hsl(var(--maroon)), hsl(var(--maroon-muted)))" }}>
            <img src={drRNagarathna} alt="Dr R Nagarathna" className="w-full h-full object-cover scale-[1.15]" />
          </div>
          <div className="flex-1">
            <div className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-1">Director — Clinical Services</div>
            <h3 className="font-display font-bold text-forest text-2xl mb-1">Dr R Nagarathna</h3>
            <p className="font-body text-sage text-sm mb-2">MBBS, MD, FRCP · Founder Director, Arogyadhama</p>
            <p className="font-body text-forest/70 text-sm leading-relaxed">
              A pioneering integrative physician with over four decades of clinical experience, Dr. Nagarathna oversees protocols across every department — combining conventional medicine with Yoga, Ayurveda, and Naturopathy.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Superintendent — Dr. Amit Singh */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold/30 shadow-card mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)))" }} />
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30" style={{ background: "linear-gradient(135deg, hsl(var(--maroon)), hsl(var(--maroon-muted)))" }}>
            <img src={drAmitSingh} alt="Dr Amit Singh" className="w-full h-full object-cover" style={{ objectPosition: "45% 22%" }} />
          </div>
          <div className="flex-1">
            <div className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-1">Medical Superintendent</div>
            <h3 className="font-display font-bold text-forest text-2xl mb-1">Dr Amit Singh</h3>
            <p className="font-body text-sage text-sm mb-2">BAMS, MD, PhD</p>
            <p className="font-body text-forest/70 text-sm leading-relaxed">
              Medical Superintendent at Arogyadhama, Dr. Amit Singh leads day-to-day clinical operations and works closely with department heads to ensure seamless integrative care for every patient.
            </p>
          </div>
        </div>
      </div>

      {/* Consulting Doctors */}
      <div className="mb-8">
        <h4 className="font-display font-semibold text-forest text-lg mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-gold" /> Consulting Doctors
        </h4>
        {useDeptDoctors ? (
          <DepartmentDoctorsGrid deptKey={deptKey} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FALLBACK_SUPPORTING_DOCTORS.map((d) => (
              <TeamCard key={d.name} name={d.name} qual={d.qual} role={d.role} />
            ))}
          </div>
        )}
      </div>

    </motion.section>
  );
}


/* ─── Main Template ─── */
export default function DepartmentPageTemplate({ config }: { config: DeptPageConfig }) {
  const sectionIds = config.sections.map((s) => s.id);
  const active = useSectionSpy(sectionIds);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ background: config.heroGradient }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        {config.heroImage ? (
          /* Hero photo — blended into the gradient on its left edge */
          (() => {
            const blend = config.heroImageBlend ?? "var(--maroon-dark)";
            // Mask fade (not a painted overlay) so the photo dissolves into the hero
            // gradient without a visible seam at the panel's left edge.
            const mask = "linear-gradient(90deg, transparent 0%, black 55%)";
            const images = Array.isArray(config.heroImage) ? config.heroImage : [config.heroImage!];
            const slot = 5; // seconds each image is shown
            const cycle = images.length * slot;
            const slotPct = 100 / images.length;
            return (
              <div className="absolute inset-y-0 right-0 w-[48%] hidden md:block pointer-events-none"
                style={{ WebkitMaskImage: mask, maskImage: mask }}>
                {images.length > 1 && (
                  <style>{`@keyframes deptHeroFade { 0% { opacity: 0; } 4% { opacity: 1; } ${slotPct.toFixed(2)}% { opacity: 1; } ${(slotPct + 4).toFixed(2)}% { opacity: 0; } 100% { opacity: 0; } }`}</style>
                )}
                <img src={images[0]} alt={config.heroImageAlt ?? ""} className="w-full h-full object-cover" />
                {images.slice(1).map((src, i) => (
                  <img key={src} src={src} alt="" className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0, animation: `deptHeroFade ${cycle}s linear infinite`, animationDelay: `${(i + 1) * slot}s` }} />
                ))}
                <div className="absolute inset-0" style={{ background: `hsl(${blend} / 0.25)` }} />
              </div>
            );
          })()
        ) : (
          /* Mandala watermark */
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-64 h-64 opacity-[0.07] mr-8" fill="none">
              {[180, 140, 100, 60].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} stroke="hsl(51 97% 94%)" strokeWidth="0.7" />
              ))}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <line key={a} x1="200" y1="200"
                  x2={200 + Math.cos((a * Math.PI) / 180) * 185}
                  y2={200 + Math.sin((a * Math.PI) / 180) * 185}
                  stroke="hsl(51 97% 94%)" strokeWidth="0.4" />
              ))}
            </svg>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Breadcrumb label={config.breadcrumbLabel} />
            <div className="mt-5 inline-block font-body text-xs tracking-[0.3em] uppercase text-gold/80 border border-gold/30 rounded-full px-3 py-1 mb-4">
              {config.heroTagline}
            </div>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              {config.heroTitle}
            </h1>
            <p className="font-body text-cream/75 mt-4 max-w-xl leading-relaxed" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
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

      {/* Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
          <div className="space-y-0">
            {config.sections.map((section, i) => (
              <motion.section key={section.id} id={section.id} className="scroll-mt-28 pb-16 mb-4"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.05 }}>
                <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: "hsl(var(--gold))" }} />
                {section.content}
              </motion.section>
            ))}
            <ClinicalTeamSection deptKey={config.deptKey} />
          </div>
          <StickySidebar sections={config.sections} active={active} />
        </div>
      </div>

      <RelatedDepts current={config.deptKey} />
      <BookCTABanner />
    </Layout>
  );
}

/* ─── Shared sub-components exported for dept pages ─── */
export function SectionHeading({ label, title, subtitle }: { label: string; title: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-gold">{label}</span>
      <h2 className="font-display text-display-md text-forest mt-2 mb-3">{title}</h2>
      {subtitle && <p className="font-body text-forest/65 leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

export function ConditionGrid({ conditions }: { conditions: { name: string; icon: string; desc?: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {conditions.map((c, i) => (
        <motion.div key={c.name} className="bg-white rounded-xl p-4 border border-border shadow-card hover:border-gold/30 transition-colors"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
          <div className="font-display font-semibold text-forest text-sm leading-tight">{c.name}</div>
          {c.desc && <div className="font-body text-sage text-xs mt-1 leading-relaxed">{c.desc}</div>}
        </motion.div>
      ))}
    </div>
  );
}

export function IntegrativeCard({ therapy, color, desc }: { therapy: string; color: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-border shadow-card">
      <div className="font-body text-xs tracking-widest uppercase font-semibold mb-2" style={{ color }}>{therapy}</div>
      <p className="font-body text-forest/65 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export function TeamCard({ name, qual, role }: { name: string; qual: string; role: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-card text-center hover:shadow-card-hover transition-all">
      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "hsl(var(--maroon) / 0.08)" }}>
        <User2 size={28} className="text-forest" />
      </div>
      <h4 className="font-display font-bold text-forest text-base mb-0.5">{name}</h4>
      <p className="font-body text-gold text-xs font-semibold mb-1">{qual}</p>
      <p className="font-body text-sage text-xs">{role}</p>
    </div>
  );
}