"use client";
import { Phone, Globe } from "lucide-react";
import { Link } from "@/lib/router-compat";

export default function TopBar() {
  return (
    <div className="w-full bg-maroon-dark py-2 px-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 text-cream/90 text-sm font-body">
          <a
            href="tel:08022639963"
            className="flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            <Phone size={13} />
            <span>080-2263-9963</span>
          </a>
          <span className="text-cream/30">|</span>
          <a
            href="tel:+919972871777"
            className="flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            <Phone size={13} />
            <span>997-287-1777 / 961-134-4691</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-cream/70 hover:text-cream text-xs font-body transition-colors">
            <Globe size={13} />
            <span>EN</span>
          </button>
          <Link
            to="/book-now"
            className="bg-gold text-forest-dark text-xs font-semibold font-body px-4 py-1.5 rounded hover:bg-gold-light transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}