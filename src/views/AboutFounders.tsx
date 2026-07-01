"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ChevronRight } from "lucide-react";
import FoundersSection from "@/components/FoundersSection";

/* ─── Breadcrumb ─── */
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.href ? (
            <Link to={item.href} className="hover:text-gold transition-colors">{item.label}</Link>
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
      style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 55%, hsl(var(--forest-light)) 100%)" }}
    >
      <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
      {/* Gold decorative circle */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-gold/15 hidden lg:block" />
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-gold/10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Founders" }]} />
          <h1 className="font-display text-cream mt-5 font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
            Founders & Leadership
          </h1>
          <p className="font-body text-cream/70 mt-4 max-w-xl">
            The visionary minds whose dedication, scholarship, and compassion gave birth to India's most respected integrative medicine institution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function AboutFounders() {
  return (
    <Layout>
      <PageHero />
      <FoundersSection />

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-display-md text-forest mb-4">
              Continue Your Journey
            </h2>
            <p className="font-body text-forest/60 mb-8">
              Read our full institutional history or explore how we can help you heal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about/history"
                className="bg-forest text-cream font-body font-semibold px-7 py-3 rounded-xl hover:bg-forest-light transition-colors"
              >
                Our History →
              </Link>
              <Link
                to="/book-now"
                className="bg-gold text-forest-dark font-body font-semibold px-7 py-3 rounded-xl hover:bg-gold-light transition-colors shadow-gold"
              >
                Book Your Stay
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}