"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BadgeCheck, BedDouble, ChevronRight, ClipboardList, Droplet, ExternalLink, HeartPulse, Hourglass,
  Loader2, Lock, LogOut, Mail, MapPin, Phone, ShieldAlert, Smartphone, Stethoscope, UserRound,
} from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Link } from "@/lib/router-compat";
import { initials, useParticipant, type LinkedPatient } from "@/hooks/useParticipant";
import { BookingRequested, StayBookingForm, StayConfirmed } from "@/components/stay/StayBooking";

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

/**
 * The participant dashboard.
 *
 *  - Registered, not yet approved, no stay request: the stay-booking form.
 *  - Request sent: "awaiting reception confirmation" (it can still be changed).
 *  - Approved by reception (in the Reception Suite): "please visit our campus on <date>", the
 *    linked Patient record, and the Patient App button, which stays locked until then.
 */
export default function Profile() {
  const router = useRouter();
  const { profile, patient, patientAppUrl, patientAppHandoff, loading, error, logout, refresh } = useParticipant();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!loading && !profile && !error) router.replace("/account?tab=login");
  }, [loading, profile, error, router]);

  async function onLogout() {
    await logout();
    router.push("/account?tab=login");
  }

  const approved = profile?.access === "approved";
  const booking = profile?.booking ?? null;
  const showForm = Boolean(profile && !approved && (!booking || editing));
  const displayName = patient?.name || profile?.fullName || "";

  return (
    <Layout>
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 min-h-[70vh]" style={{ background: TINT }}>
        <div className={`${showForm ? "max-w-6xl" : "max-w-4xl"} mx-auto px-4 sm:px-6`}>
          <nav className="flex items-center gap-1.5 font-body text-xs text-forest/50 mb-5">
            <Link to="/" className="hover:text-maroon transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-forest/80">My Dashboard</span>
          </nav>

          {loading || (!profile && !error) ? (
            <div className="flex items-center justify-center gap-3 py-24 font-body text-sage">
              <Loader2 className="animate-spin" size={20} /> Loading your dashboard…
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-white border border-maroon/10 p-8 text-center font-body text-forest/70">
              We couldn&apos;t load your dashboard right now. Please refresh the page or try again later.
            </div>
          ) : profile ? (
            <div className="space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-[28px] overflow-hidden bg-white border border-maroon/10 shadow-forest"
              >
                <div className="relative px-6 sm:px-8 pt-8 pb-16 text-cream" style={{ background: MAROON_GRADIENT }}>
                  <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
                  <div className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full border border-gold/15" />
                  <p className="section-label text-gold-light">Participant Dashboard</p>
                  <p className="mt-1 font-body text-sm text-cream/70">S-VYASA Arogyadhama · Prashanti Kutiram</p>
                </div>
                <div className="relative z-10 px-6 sm:px-8 -mt-8 pb-7">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                    <div className="w-24 h-24 rounded-3xl bg-gold text-forest-dark font-display font-bold text-3xl flex items-center justify-center ring-4 ring-white shadow-gold shrink-0">
                      {initials(displayName)}
                    </div>
                    <div className="flex-1 min-w-0 sm:pb-0.5">
                      <h1 className="font-display font-bold text-forest text-2xl sm:text-3xl leading-tight break-words">{displayName}</h1>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 font-body text-sm">
                        {patient && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-maroon text-cream text-xs font-semibold">
                            <ClipboardList size={12} /> {patient.id}
                          </span>
                        )}
                        <span className="text-forest/70">{profile.countryCode} {profile.mobile}</span>
                        {approved ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-maroon/[0.06] text-maroon text-xs font-semibold">
                            <BadgeCheck size={13} /> Approved by reception
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-pale text-forest text-xs font-semibold">
                            <Hourglass size={12} /> {booking ? "Awaiting reception confirmation" : "Registered · stay not yet requested"}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={onLogout}
                      className="self-start sm:self-end inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-maroon/15 font-body text-sm font-semibold text-maroon hover:bg-maroon/5 transition-colors"
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Stat label="Member since" value={formatDate(profile.memberSince) || "—"} />
                    <Stat label="Last sign-in" value={formatDate(profile.lastLogin) || "—"} />
                  </div>
                </div>
              </motion.div>

              {/* Stay: request form / awaiting confirmation / confirmed */}
              {showForm ? (
                <>
                  {!booking && (
                    <div className="px-1">
                      <p className="section-label text-gold">Book your stay</p>
                      <h2 className="mt-1 font-display font-bold text-forest text-2xl sm:text-3xl">Request your residential programme</h2>
                      <p className="mt-1 font-body text-sm text-forest/60 max-w-2xl">
                        Choose a programme, accommodation and admission Tuesday. Reception reviews your registration and request
                        together; once confirmed, we will ask you to visit the campus on your date.
                      </p>
                    </div>
                  )}
                  <StayBookingForm
                    profile={profile}
                    existing={booking}
                    onCancel={booking ? () => setEditing(false) : undefined}
                    onSubmitted={async () => {
                      setEditing(false);
                      toast.success("Booking request sent to reception");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      await refresh().catch(() => null);
                    }}
                  />
                </>
              ) : approved && booking ? (
                <StayConfirmed booking={booking} email={profile.email} />
              ) : booking ? (
                <BookingRequested booking={booking} onChange={() => setEditing(true)} />
              ) : null}

              {/* Patient record (approved only) */}
              {approved && (
                <div className="rounded-[28px] bg-white border border-maroon/10 shadow-card p-6 sm:p-8">
                  {patient ? (
                    <PatientCard patient={patient} />
                  ) : (
                    <p className="flex gap-3 font-body text-sm text-forest/70">
                      <Stethoscope size={18} className="text-maroon shrink-0" />
                      Your patient record will appear here once reception links it to your registration.
                    </p>
                  )}
                </div>
              )}

              {/* Patient App: unlocked by reception approval */}
              {!showForm && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6 rounded-[24px] bg-white border border-maroon/10 shadow-card">
                  <span
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${approved ? "text-cream" : "bg-maroon/[0.06] text-forest/35"}`}
                    style={approved ? { background: MAROON_GRADIENT } : undefined}
                  >
                    {approved ? <Smartphone size={22} /> : <Lock size={20} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-bold text-forest">Arogyadhama Patient App</p>
                    <p className="font-body text-sm text-forest/60">
                      {!approved
                        ? "Unlocks once reception confirms your stay. Your login (email and password) is emailed to you then."
                        : patientAppHandoff
                          ? "Therapy schedule, diet, vitals and reports. Opens signed in to your patient record."
                          : "Therapy schedule, diet, vitals and reports. Sign in with the email and password we emailed you."}
                    </p>
                  </div>
                  {approved ? (
                    // A plain <a>, not next/link: nothing may prefetch the hand-off and mint tokens.
                    <a
                      href={patientAppHandoff ? "/api/auth/patient-app" : `${patientAppUrl.replace(/\/$/, "")}/login`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl font-body font-semibold text-cream hover:brightness-110 transition-all shrink-0"
                      style={{ background: MAROON_GRADIENT }}
                    >
                      Open Patient App <ExternalLink size={15} />
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl font-body font-semibold bg-maroon/[0.06] text-forest/40 shrink-0 cursor-not-allowed"
                    >
                      <Lock size={14} /> Open Patient App
                    </span>
                  )}
                </div>
              )}

              {/* Registration details */}
              <div className="rounded-[28px] bg-white border border-maroon/10 shadow-card p-6 sm:p-8">
                <p className="section-label text-gold mb-3">Your registration details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Section icon={<UserRound size={16} />} title="Contact">
                    <Row label="Mobile" value={`${profile.countryCode} ${profile.mobile}`} icon={<Phone size={13} />} />
                    <Row label="Email" value={profile.email} icon={<Mail size={13} />} />
                    <Row label="Date of birth" value={dobWithAge(profile.dateOfBirth)} />
                  </Section>
                  <Section icon={<MapPin size={16} />} title="Address">
                    <Row label="City" value={profile.city} />
                    <Row label="State" value={profile.state} />
                    <Row label="Country" value={profile.country} />
                  </Section>
                  <Section icon={<ShieldAlert size={16} />} title="Emergency contact">
                    <Row label="Name" value={profile.emergencyContactName} />
                    <Row label="Phone" value={profile.emergencyContactPhone} icon={<Phone size={13} />} />
                  </Section>
                  <Section icon={<HeartPulse size={16} />} title="Health concern">
                    <p className="font-body text-sm text-forest/80 whitespace-pre-line">
                      {profile.healthConcern || <span className="text-forest/40">Not provided</span>}
                    </p>
                  </Section>
                </div>
                <p className="mt-5 font-body text-xs text-forest/50">
                  To update these details, please contact the help desk at{" "}
                  <a href="mailto:info@arogyadhama.org" className="underline hover:text-maroon">info@arogyadhama.org</a>.
                </p>
              </div>
            </div>
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
