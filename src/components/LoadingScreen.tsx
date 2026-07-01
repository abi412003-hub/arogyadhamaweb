"use client";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: "hsl(var(--forest-dark))" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Lotus animation */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6"
      >
        <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
          {/* Outer petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.ellipse
              key={angle}
              cx={40 + Math.cos(((angle - 90) * Math.PI) / 180) * 20}
              cy={40 + Math.sin(((angle - 90) * Math.PI) / 180) * 20}
              rx="8"
              ry="18"
              transform={`rotate(${angle}, ${40 + Math.cos(((angle - 90) * Math.PI) / 180) * 20}, ${40 + Math.sin(((angle - 90) * Math.PI) / 180) * 20})`}
              fill="hsl(43 89% 50%)"
              opacity="0"
              animate={{ opacity: [0, 0.7, 0.4] }}
              transition={{ duration: 1.5, delay: i * 0.12, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
          {/* Inner petals */}
          {[30, 90, 150, 210, 270, 330].map((angle, i) => (
            <motion.ellipse
              key={angle}
              cx={40 + Math.cos(((angle - 90) * Math.PI) / 180) * 10}
              cy={40 + Math.sin(((angle - 90) * Math.PI) / 180) * 10}
              rx="5"
              ry="12"
              transform={`rotate(${angle}, ${40 + Math.cos(((angle - 90) * Math.PI) / 180) * 10}, ${40 + Math.sin(((angle - 90) * Math.PI) / 180) * 10})`}
              fill="hsl(51 97% 85%)"
              opacity="0"
              animate={{ opacity: [0, 0.6, 0.3] }}
              transition={{ duration: 1.5, delay: 0.06 + i * 0.12, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
          {/* Centre */}
          <motion.circle cx="40" cy="40" r="7" fill="hsl(43 89% 60%)"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <div className="font-display font-bold text-cream text-xl mb-1">Arogyadhama</div>
        <div className="font-body text-gold/70 text-xs tracking-[0.3em] uppercase">Prashanti Kutiram</div>
      </motion.div>

      {/* Subtle progress bar */}
      <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gold"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }} />
    </motion.div>
  );
}