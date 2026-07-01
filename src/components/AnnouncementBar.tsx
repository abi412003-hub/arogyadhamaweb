"use client";
import { Calendar } from "lucide-react";

export default function AnnouncementBar() {
  const message = "Admission on every Tuesday · Minimum 6-night IPD stay · Book your slot in advance";
  const items = Array.from({ length: 6 });

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-gold text-forest-dark border-t border-gold-light/40 overflow-hidden z-[55] h-7 flex items-center shadow-forest">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 font-body text-xs sm:text-sm font-semibold tracking-wide px-8 shrink-0"
          >
            <Calendar size={14} className="shrink-0" />
            <span>{message}</span>
            <span className="text-forest-dark/50">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}