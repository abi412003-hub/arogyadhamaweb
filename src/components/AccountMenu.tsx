"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, UserPlus, UserRound, CalendarDays, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Link, useLocation } from "@/lib/router-compat";
import { initials, useParticipant } from "@/hooks/useParticipant";

const MAROON_GRADIENT =
  "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 100%)";

/** Small account button in the header: Login / Register when signed out, profile when signed in. */
export default function AccountMenu({ transparent }: { transparent: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { profile, patient, logout } = useParticipant();
  const name = patient?.name || profile?.fullName || "";
  const location = useLocation();
  const router = useRouter();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={profile ? "Account menu" : "Login or register"}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center justify-center rounded-full transition-all ${
          profile
            ? "w-10 h-10 bg-gold text-forest-dark font-display font-bold text-sm ring-2 ring-white/70 shadow-gold hover:bg-gold-light"
            : `w-10 h-10 border ${
                transparent
                  ? "border-cream/40 text-cream hover:bg-white/10"
                  : "border-maroon/20 text-maroon hover:bg-maroon/5"
              }`
        }`}
      >
        {profile ? initials(name) : <UserRound size={19} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] max-w-[290px] origin-top-right bg-white rounded-2xl shadow-card-hover border border-maroon/10 p-2.5 z-50"
          >
            {profile ? (
              <>
                <div className="flex items-center gap-3 px-2.5 pt-1.5 pb-3 border-b border-maroon/10">
                  <span className="w-10 h-10 rounded-xl bg-gold text-forest-dark font-display font-bold text-sm flex items-center justify-center shrink-0">
                    {initials(name)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-body font-semibold text-forest truncate">{name}</p>
                    <p className="font-body text-xs text-sage">{profile.countryCode} {profile.mobile}</p>
                  </div>
                </div>
                <div className="pt-2 space-y-0.5">
                  <MenuLink to="/profile" icon={<UserRound size={16} />}>My Dashboard</MenuLink>
                  <MenuLink to="/book-now" icon={<CalendarDays size={16} />}>Book your stay</MenuLink>
                  <button
                    role="menuitem"
                    onClick={async () => {
                      setOpen(false);
                      await logout();
                      router.push("/");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-semibold text-maroon hover:bg-maroon/5 transition-colors"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <MenuCard
                  to="/account?tab=login"
                  title="Login"
                  sub="Access your participant account"
                  icon={<LogIn size={19} />}
                  tileStyle={{ background: MAROON_GRADIENT }}
                  cardClass="bg-maroon/[0.04] border-maroon/10 hover:border-maroon/25"
                />
                <MenuCard
                  to="/account?tab=register"
                  title="Register"
                  sub="Create a new account"
                  icon={<UserPlus size={19} />}
                  tileStyle={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--terracotta-dark)))" }}
                  cardClass="bg-gold-pale/40 border-gold/20 hover:border-gold/45"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({ to, icon, children }: { to: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link
      to={to}
      role="menuitem"
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-semibold text-forest/80 hover:text-forest hover:bg-maroon/5 transition-colors"
    >
      <span className="text-maroon">{icon}</span> {children}
    </Link>
  );
}

function MenuCard({
  to, title, sub, icon, tileStyle, cardClass,
}: {
  to: string; title: string; sub: string; icon: ReactNode;
  tileStyle: React.CSSProperties; cardClass: string;
}) {
  return (
    <Link
      to={to}
      role="menuitem"
      className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${cardClass}`}
    >
      <span className="w-11 h-11 rounded-xl flex items-center justify-center text-cream shadow-sm shrink-0" style={tileStyle}>
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-body font-bold text-forest">{title}</span>
        <span className="block font-body text-xs text-forest/60 leading-snug">{sub}</span>
      </span>
      <ChevronRight size={16} className="text-forest/30 group-hover:text-maroon group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
