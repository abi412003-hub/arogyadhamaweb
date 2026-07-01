"use client";
import { Link } from "@/lib/router-compat";
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram, Twitter } from "lucide-react";
import logoMark from "@/assets/arogyadhama-logo.png";

function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <ellipse cx="20" cy="28" rx="8" ry="5" fill="currentColor" opacity="0.4" />
      <path d="M20 30 C20 30 10 22 10 14 C10 8 15 4 20 6 C25 4 30 8 30 14 C30 22 20 30 20 30Z" fill="currentColor" opacity="0.7" />
      <path d="M20 30 C20 30 4 24 2 14 C1 8 7 5 12 8 C14 9 17 14 20 30Z" fill="currentColor" opacity="0.5" />
      <path d="M20 30 C20 30 36 24 38 14 C39 8 33 5 28 8 C26 9 23 14 20 30Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Arogyadhama", href: "/about" },
  { label: "Our Therapies", href: "/therapies" },
  { label: "Departments", href: "/departments" },
  { label: "Plan Your Stay", href: "/plan-your-stay" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Our Team", href: "/our-team" },
];

const patientResources = [
  { label: "Book Appointment", href: "/book-now" },
  { label: "Tariff & Plans", href: "/plan-your-stay/tariff" },
  { label: "Daily Schedule", href: "/plan-your-stay/schedule" },
  { label: "Accommodation", href: "/plan-your-stay/accommodation" },
  { label: "Patient Stories", href: "/patient-stories" },
  { label: "FAQs", href: "/knowledge-hub" },
];

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoMark} alt="Arogyadhama" className="w-20 h-20 object-contain" />
              <div>
                <div className="font-display font-bold text-xl text-cream">Arogyadhama</div>
                <div className="text-xs text-gold/70 font-body tracking-wider uppercase">S-VYASA, Bengaluru</div>
              </div>
            </div>
            <p className="font-body text-sm text-cream/60 leading-relaxed mb-5">
              Integrative medicine hospital at Prashanti Kutiram, blending ancient healing wisdom with modern scientific research for holistic health transformation.
            </p>
            <div className="space-y-2.5 text-sm font-body">
              <div className="flex items-start gap-2.5 text-cream/70">
                <MapPin size={14} className="mt-0.5 text-gold flex-shrink-0" />
                <span>Vivekananda Road, Kalluballu Post, Jigani, Anekal, Bengaluru – 560105</span>
              </div>
              <a href="tel:08022639963" className="flex items-center gap-2.5 text-cream/70 hover:text-gold transition-colors">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <span>080-2263-9963 | 997-287-1777</span>
              </a>
              <a href="mailto:info@arogyadhama.org" className="flex items-center gap-2.5 text-cream/70 hover:text-gold transition-colors">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <span>info@arogyadhama.org</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-5 pb-2 border-b border-forest-light/40">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-cream/60 hover:text-gold transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/40 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Patient Resources */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-5 pb-2 border-b border-forest-light/40">
              Patient Resources
            </h4>
            <ul className="space-y-2.5">
              {patientResources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-cream/60 hover:text-gold transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/40 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-5 pb-2 border-b border-forest-light/40">
              Connect
            </h4>
            <div className="space-y-3 mb-6">
              <Link to="/contact" className="block font-body text-sm text-cream/60 hover:text-gold transition-colors">Contact Us</Link>
              <Link to="/contact" className="block font-body text-sm text-cream/60 hover:text-gold transition-colors">Get Directions</Link>
            </div>
            <div className="flex gap-3 mb-6">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-forest-light/40 flex items-center justify-center text-cream/60 hover:text-gold hover:bg-forest-light transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="bg-forest-light/30 rounded-xl p-4">
              <p className="font-body text-xs text-cream/60 mb-2">Subscribe for wellness insights</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-forest-light/40 text-cream text-xs font-body px-3 py-2 rounded-lg border border-forest-light/50 focus:outline-none focus:border-gold/50 placeholder:text-cream/30"
                />
                <button className="bg-gold text-forest-dark text-xs font-semibold font-body px-3 py-2 rounded-lg hover:bg-gold-light transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-12 sm:pb-14 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/40 text-center">
            © 2026 Arogyadhama, S-VYASA, Bengaluru. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="font-body text-xs text-cream/40 hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="font-body text-xs text-cream/40 hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}