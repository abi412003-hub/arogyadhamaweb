"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { BookOpen, Award, FlaskConical, Star } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ResearchSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "hsl(345 15% 97%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="section-label">Research & Recognition</span>
          <h2 className="font-display text-display-md text-forest mt-4">
            Where Healing Meets{" "}
            <em className="not-italic text-gold">Scientific Rigour</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Research Impact */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-5" style={{ background: "hsl(var(--maroon))", transform: "translate(30%, -30%)" }} />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "hsl(var(--maroon) / 0.1)" }}>
                <FlaskConical size={22} className="text-forest" />
              </div>
              <h3 className="font-display font-bold text-forest text-2xl">Research Impact</h3>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: BookOpen,
                  title: "1,000+ PubMed-Indexed Papers",
                  desc: "Our research on Yoga, Ayurveda, and integrative therapies is published in leading international peer-reviewed journals, establishing Arogyadhama as a global authority in traditional medicine science.",
                },
                {
                  icon: FlaskConical,
                  title: "ICMR Recognised Centre",
                  desc: "Recognised by the Indian Council of Medical Research for our contributions to evidence-based integrative medicine — a distinction held by very few institutions in India.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-forest text-base mb-1">{item.title}</h4>
                    <p className="font-body text-forest/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/knowledge-hub"
              className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-forest hover:text-gold transition-colors group"
            >
              Explore Our Research
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Recognition */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-maroon rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
              style={{ background: "hsl(var(--gold))", transform: "translate(30%, -30%)" }}
            />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center">
                <Award size={22} className="text-gold" />
              </div>
              <h3 className="font-display font-bold text-cream text-2xl">Recognition</h3>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Star,
                  title: "Padma Shri — Dr. H.R. Nagendra (2016)",
                  desc: "Our Chancellor and Yoga luminary, Dr. H.R. Nagendra, was honoured with India's fourth highest civilian award — the Padma Shri — for his life's work in advancing Yoga science.",
                },
                {
                  icon: Award,
                  title: "International Yoga Day Leadership",
                  desc: "S-VYASA and Arogyadhama have been central to establishing June 21st as International Yoga Day globally, reflecting our pivotal role in Yoga's worldwide recognition.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-cream text-base mb-1">{item.title}</h4>
                    <p className="font-body text-cream/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-gold hover:text-gold-light transition-colors group"
            >
              Learn About Our Legacy
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}