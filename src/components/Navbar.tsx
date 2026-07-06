"use client";
import { useState, useEffect } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logoMark from "@/assets/arogyadhama-logo.png";

const navItems = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about/history" },
      { label: "Founders", href: "/about/founders" },
    ],
  },
  {
    label: "Therapies",
    href: "/therapies",
    children: [
      { label: "Yoga Therapy", href: "/therapies/yoga" },
      { label: "Ayurveda", href: "/therapies/ayurveda" },
      { label: "Naturopathy", href: "/therapies/naturopathy" },
      { label: "Acupuncture", href: "/therapies/acupuncture" },
      { label: "Physiotherapy", href: "/therapies/physiotherapy" },
      { label: "Diet & Nutrition", href: "/therapies/diet-and-nutrition" },
    ],
  },
  {
    label: "Departments",
    href: "/departments",
    children: [],
  },
  {
    label: "Plan Your Stay",
    href: "/plan-your-stay",
    children: [
      { label: "Tariff & Plans", href: "/plan-your-stay/tariff" },
      { label: "Daily Schedule", href: "/plan-your-stay/schedule" },
      { label: "Accommodation", href: "/plan-your-stay/accommodation" },
    ],
  },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Patient Stories", href: "/patient-stories" },
  { label: "Contact", href: "/contact" },
];

// Lotus Leaf SVG icon
function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="20" cy="28" rx="8" ry="5" fill="currentColor" opacity="0.4" />
      <path
        d="M20 30 C20 30 10 22 10 14 C10 8 15 4 20 6 C25 4 30 8 30 14 C30 22 20 30 20 30Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M20 30 C20 30 4 24 2 14 C1 8 7 5 12 8 C14 9 17 14 20 30Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M20 30 C20 30 36 24 38 14 C39 8 33 5 28 8 C26 9 23 14 20 30Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isTransparent ? "nav-transparent" : "nav-scrolled"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logoMark}
              alt="Arogyadhama"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span
                className={`font-display font-bold text-xl transition-colors duration-300 ${
                  isTransparent ? "text-cream" : "text-forest"
                }`}
              >
                Arogyadhama
              </span>
              <span
                className={`font-body text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                  isTransparent ? "text-gold/80" : "text-sage"
                }`}
              >
                S-VYASA · Prashanti Kutiram
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children?.length && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-0.5 px-3 py-2 rounded text-sm font-body font-semibold tracking-wide transition-colors duration-200 ${
                    isTransparent
                      ? "text-cream hover:text-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                      : "text-forest/80 hover:text-forest"
                  }`}
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <ChevronDown size={13} className="opacity-60" />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && item.children.length > 0 && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-card-hover border border-border py-2 min-w-44 z-50"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2 text-sm font-body text-forest/70 hover:text-forest hover:bg-cream/60 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/book-now"
              className="hidden lg:block bg-gold text-forest-dark font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-gold-light transition-colors shadow-gold"
            >
              Book Now
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isTransparent ? "text-cream hover:bg-white/10" : "text-forest hover:bg-forest/5"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay (outside header so it covers viewport) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-forest-dark z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-forest-light/30">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <img src={logoMark} alt="Arogyadhama" className="w-14 h-14 object-contain" />
                <span className="font-display font-bold text-xl text-cream">Arogyadhama</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-cream/70 hover:text-cream p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 border-b border-forest-light/30 font-display text-xl text-cream hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>


            <div className="p-6 border-t border-forest-light/30">
              <Link
                to="/book-now"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-gold text-forest-dark font-body font-semibold py-3 rounded-xl hover:bg-gold-light transition-colors"
              >
                Book Your Stay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}