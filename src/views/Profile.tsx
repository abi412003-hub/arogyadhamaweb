"use client";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BadgeCheck, BedDouble, CalendarDays, ChevronRight, ClipboardList, Clock, Droplet,
  ExternalLink, HeartPulse, Loader2, LogOut, Mail, MapPin, Phone, ShieldAlert,
  Smartphone, Stethoscope, UserRound,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Link } from "@/lib/router-compat";
import { initials, useParticipant, type LinkedPatient } from "@/hooks/useParticipant";

const TINT = "hsl(345 15% 97%)";
const MAROON_GRADIENT =
  "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 55%, hsl(345 40% 26%) 100%)";

function formatDate(v: string, withYear = true) {
  if (!v) return "";
  const d = new Date(v.includes(" ") ? v.replace(" ", "T") : `${v}T00:00:00`);
  if (isNaN(d.getTime())) return v;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", ...(withYear ? { year: "numeric" } : {}) });
}

function age(dob: string) {
  if (!dob) return "";
  const d = new Date(`${dob}T00:00:00`);
  if (isNaN(d.getTime())) return "";
  const now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) a--;
  return a >= 0 ? `${a} yrs` : "";
}

const dobWithAge = (dob: string) =>
  dob ? `${formatDate(dob)}${age(dob) ? ` · ${age(dob)}` : ""}` : "";

export default function Profile() {
  const router = useRouter();
  const { profile, patient, patientAppUrl, loading, error, logout } = useParticipant();

  useEffect(() => {
    if (!loading && !profile && !error) router.replace("/account?tab=login");
  }, [loading, profile, error, router]);

  async function onLogout() {
    await logout();
    router.push("/account?tab=login");
  }

  const displayName = patient?.name || profile?.fullName || "";

  return (
    <Layout>
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 min-h-[70vh]" style={{ background: TINT }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 font-body text-xs text-forest/50 mb-5">
            <Link to="/" className="hover:text-maroon transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-forest/80">My Dashboard</span>
          </nav>

          {loading || (!profile && !error) ? (
            <div className="flex items-center justify-center gap-3 py-24 font-body text-sage">
              <Loader2 className="animate-spin" size={20} /> Loading your profile…
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-white border border-maroon/10 p-8 text-center font-body text-forest/70">
              We couldn't load your profile right now. Please refresh the page or try again later.
            </div>
          ) : profile ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[28px] overflow-hidden bg-white border border-maroon/10 shadow-forest"
            >
              {/* Header band */}
              <div className="relative px-6 sm:px-8 pt-8 pb-16 text-cream" style={{ background: MAROON_GRADIENT }}>
                <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
                <div className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full border border-gold/15" />
                <p className="section-label text-gold-light">Participant Dashboard</p>
                <p className="mt-1 font-body text-sm text-cream/70">S-VYASA Arogyadhama · Prashanti Kutiram</p>
              </div>

              <div className="relative z-10 px-6 sm:px-8 -mt-8">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                  <div className="w-24 h-24 rounded-3xl bg-gold text-forest-dark font-display font-bold text-3xl flex items-center justify-center ring-4 ring-white shadow-gold shrink-0">
                    {initials(displayName)}
                  </div>
                  <div className="flex-1 min-w-0 sm:pb-0.5">
                    <h1 className="font-display font-bold text-forest text-2xl sm:text-3xl leading-tight break-words">
                      {displayName}
                    </h1>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 font-body text-sm">
                      {patient && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-maroon text-cream text-xs font-semibold">
                          <ClipboardList size={12} /> {patient.id}
                        </span>
                      )}
                      <span className="text-forest/70">{profile.countryCode} {profile.mobile}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-maroon/[0.06] text-maroon text-xs font-semibold">
                        <BadgeCheck size={13} /> Approved by reception
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Stat label="Member since" value={formatDate(profile.memberSince) || "—"} />
                  <Stat label="Last sign-in" value={formatDate(profile.lastLogin) || "—"} />
                </div>
              </div>

              {/* Patient record */}
              <div className="px-6 sm:px-8 pt-8">
                {patient ? (
                  <PatientCard patient={patient} />
                ) : (
                  <div className="flex gap-3 p-4 rounded-2xl bg-gold-pale/50 border border-gold/30 font-body text-sm text-forest">
                    <Clock size={18} className="text-gold shrink-0 mt-0.5" />
                    <p>
                      Your patient record will appear here once reception links it to your registration.
                      For help, contact the help desk at{" "}
                      <a href="tel:+919972871777" className="font-semibold underline hover:text-maroon">997-287-1777</a>.
                    </p>
                  </div>
                )}
              </div>

              {/* Patient App */}
              <div className="px-6 sm:px-8 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-maroon/10" style={{ background: TINT }}>
                  <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-cream shrink-0" style={{ background: MAROON_GRADIENT }}>
                    <Smartphone size={22} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-bold text-forest">Arogyadhama Patient App</p>
                    <p className="font-body text-sm text-forest/60">
                      Therapy schedule, diet, vitals and reports. Sign in with the email and password given by reception.
                    </p>
                  </div>
                  <a
                    href={patientAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl font-body font-semibold text-cream hover:brightness-110 transition-all shrink-0"
                    style={{ background: MAROON_GRADIENT }}
                  >
                    Open Patient App <ExternalLink size={15} />
                  </a>
                </div>
              </div>

              {/* Website registration details */}
              <div className="px-6 sm:px-8 pt-8">
                <p className="section-label text-gold mb-3">Your registration details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Section icon={<MapPin size={16} />} title="Address">
                    <Row label="City" value={profile.city} />
                    <Row label="State" value={profile.state} />
                    <Row label="Country" value={profile.country} />
                  </Section>
                  <Section icon={<ShieldAlert size={16} />} title="Emergency contact">
                    <Row label="Name" value={profile.emergencyContactName} />
                    <Row label="Phone" value={profile.emergencyContactPhone} icon={<Phone size={13} />} />
                  </Section>
                  <Section icon={<HeartPulse size={16} />} title="Health concern" className="sm:col-span-2">
                    <p className="font-body text-sm text-forest/80 whitespace-pre-line">
                      {profile.healthConcern || <span className="text-forest/40">Not provided</span>}
                    </p>
                  </Section>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/book-now"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl font-body font-semibold bg-gold text-forest-dark hover:bg-gold-light transition-colors"
                >
                  <CalendarDays size={17} /> Book your stay
                </Link>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-maroon/15 font-body font-semibold text-maroon hover:bg-maroon/5 transition-colors"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>

              <p className="px-6 sm:px-8 pb-7 -mt-2 font-body text-xs text-forest/50">
                To update these details, please contact the help desk at{" "}
                <a href="mailto:info@arogyadhama.org" className="underline hover:text-maroon">info@arogyadhama.org</a>.
              </p>
            </motion.div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}

function PatientCard({ patient: p }: { patient: LinkedPatient }) {
  const stay = [p.accommodation, p.room && `Room ${p.room}`].filter(Boolean).join(" · ");
  return (
    <div className="rounded-2xl border border-maroon/15 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-maroon/10" style={{ background: TINT }}>
        <h2 className="flex items-center gap-2 font-body text-xs font-bold tracking-[0.16em] uppercase text-gold">
          <Stethoscope size={16} className="text-maroon" /> Patient record
        </h2>
        {p.status && (
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-body ${p.status === "Active" ? "bg-maroon/10 text-maroon" : "bg-forest/5 text-forest/50"}`}>
            {p.status}
          </span>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 p-5">
        <Row label="Patient ID" value={p.id} />
        <Row label="Name" value={p.name} />
        <Row label="Gender" value={p.gender} icon={<UserRound size={13} />} />
        <Row label="Date of birth" value={dobWithAge(p.dob)} />
        <Row label="Blood group" value={p.bloodGroup} icon={<Droplet size={13} />} />
        <Row label="Mobile" value={p.mobile} icon={<Phone size={13} />} />
        <Row label="Email" value={p.email} icon={<Mail size={13} />} />
        <Row label="Department" value={p.department} />
        <Row label="Stay" value={stay} icon={<BedDouble size={13} />} />
        <Row label="OP / IP No." value={[p.opNo, p.ipNo].filter(Boolean).join(" / ")} />
        <Row label="Admitted on" value={formatDate(p.admissionDate)} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl px-4 py-3 border border-maroon/10" style={{ background: TINT }}>
      <p className="font-body text-[11px] font-bold tracking-[0.14em] uppercase text-forest/45">{label}</p>
      <p className="mt-0.5 font-body font-semibold text-forest">{value}</p>
    </div>
  );
}

function Section({ icon, title, children, className = "" }: { icon: ReactNode; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-maroon/10 p-5 ${className}`}>
      <h2 className="flex items-center gap-2 font-body text-xs font-bold tracking-[0.16em] uppercase text-gold">
        <span className="text-maroon">{icon}</span> {title}
      </h2>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 font-body text-sm">
      <span className="text-forest/50 shrink-0">{label}</span>
      <span className="text-forest text-right break-all inline-flex items-center gap-1">
        {value ? <>{icon && <span className="text-forest/40">{icon}</span>}{value}</> : <span className="text-forest/35">—</span>}
      </span>
    </div>
  );
}
