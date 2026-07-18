"use client";
import { Link, useLocation } from "@/lib/router-compat";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

export default function PlaceholderPage() {
  const location = useLocation();
  const pathLabel = location.pathname
    .split("/")
    .filter(Boolean)
    .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(" › ");

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
        <motion.div
          className="text-center max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 rounded-full bg-maroon/8 flex items-center justify-center mx-auto mb-6" style={{ background: "hsl(var(--maroon) / 0.08)" }}>
            <Flower2 size={36} className="text-forest" />
          </div>
          <span className="section-label text-sm mb-4 block">{pathLabel || "Page"}</span>
          <h1 className="font-display text-3xl md:text-4xl text-forest font-bold mb-4">
            Coming Soon
          </h1>
          <p className="font-body text-forest/60 leading-relaxed mb-8">
            This page is being crafted with the same care and intention we bring to every healing journey. Please check back soon, or explore our home page to learn more about Arogyadhama.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-maroon text-cream font-body font-semibold px-6 py-3 rounded-xl hover:bg-maroon-light transition-colors"
          >
            ← Return to Home
          </Link>
        </motion.div>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}