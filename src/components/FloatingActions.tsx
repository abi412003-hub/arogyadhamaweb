"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.131.558 4.13 1.534 5.866L.05 23.95a.5.5 0 0 0 .613.614l6.127-1.49A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.372l-.36-.213-3.724.905.929-3.653-.235-.375A9.818 9.818 0 1 1 12 21.818z" />
    </svg>
  );
}

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showWATooltip, setShowWATooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Show after 50% scroll
      setShowBackToTop(window.scrollY > totalHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-50 flex flex-col gap-3 items-end">
      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-colors"
            style={{ background: "hsl(var(--maroon))", color: "hsl(var(--cream))" }}
            aria-label="Scroll to top"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <div className="relative"
        onMouseEnter={() => setShowWATooltip(true)}
        onMouseLeave={() => setShowWATooltip(false)}>
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "#25D366", opacity: 0.3 }} />
        <span className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "#25D366", opacity: 0.15, animationDelay: "0.5s" }} />

        <a
          href="https://wa.me/919972871777"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp — 919972871777"
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-400/50"
          style={{ background: "#25D366" }}
        >
          <WhatsAppIcon />
        </a>

        {/* Tooltip */}
        <AnimatePresence>
          {showWATooltip && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl px-3 py-2 shadow-lg pointer-events-none"
              style={{ background: "hsl(var(--maroon-dark))" }}>
              <p className="font-body text-xs text-cream font-semibold">Chat on WhatsApp</p>
              <p className="font-body text-[10px] text-cream/60">+91 997-287-1777</p>
              {/* Arrow */}
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0"
                style={{ borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "6px solid hsl(var(--maroon-dark))" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}