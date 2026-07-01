"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Leaf } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--sage)) 0%, hsl(168 22% 42%) 50%, hsl(var(--forest-light)) 100%)",
      }}
    >
      {/* Decorative leaves */}
      <div className="absolute top-0 left-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-48 h-48">
          <ellipse cx="100" cy="100" rx="90" ry="60" stroke="hsl(51 97% 94%)" strokeWidth="1" fill="none" transform="rotate(-45 100 100)" />
          <ellipse cx="100" cy="100" rx="60" ry="40" stroke="hsl(51 97% 94%)" strokeWidth="0.7" fill="none" transform="rotate(-45 100 100)" />
          <line x1="100" y1="40" x2="100" y2="160" stroke="hsl(51 97% 94%)" strokeWidth="0.8" transform="rotate(-45 100 100)" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 200 200" className="w-64 h-64">
          <ellipse cx="100" cy="100" rx="90" ry="60" stroke="hsl(51 97% 94%)" strokeWidth="1" fill="none" transform="rotate(-45 100 100)" />
          <ellipse cx="100" cy="100" rx="60" ry="40" stroke="hsl(51 97% 94%)" strokeWidth="0.7" fill="none" transform="rotate(-45 100 100)" />
          <line x1="100" y1="40" x2="100" y2="160" stroke="hsl(51 97% 94%)" strokeWidth="0.8" transform="rotate(-45 100 100)" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf size={18} className="text-cream/70" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-cream/70">
              Wellness Insights
            </span>
            <Leaf size={18} className="text-cream/70 scale-x-[-1]" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">
            Begin Your Wellness Journey
          </h2>
          <p className="font-body text-cream/80 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Subscribe for weekly Ayurveda tips, Yoga guides, healing insights, and exclusive wellness wisdom from our doctors and researchers.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur rounded-2xl px-8 py-6 inline-block"
            >
              <p className="font-display text-cream text-xl font-semibold">🙏 Namaste!</p>
              <p className="font-body text-cream/80 mt-1">You're now part of our healing community.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-white text-forest font-body text-sm px-4 py-3.5 pl-10 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-gold/50 placeholder:text-forest/40"
                />
              </div>
              <button
                type="submit"
                className="bg-gold text-forest-dark font-body font-semibold px-6 py-3.5 rounded-xl hover:bg-gold-light transition-colors shadow-gold whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
          )}

          <p className="font-body text-cream/50 text-xs mt-4">
            No spam, ever. Unsubscribe anytime. Join 12,000+ wellness seekers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}