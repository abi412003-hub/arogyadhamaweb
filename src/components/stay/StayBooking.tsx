"use client";
// The participant dashboard's stay booking: the request form (Programme & Tariff → Joining Date →
// Confirm), the "awaiting reception confirmation" card, and the "stay confirmed — please visit our
// campus on <date>" card. Rules and prices come from src/lib/stay-booking.ts, which the server
// re-checks; nothing here is trusted on its own.
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BedDouble, CalendarCheck2, CalendarDays, Check, CheckCircle2, Clock,
  Hourglass, Info, Leaf, Loader2, LogIn, Mail, MapPin, Phone, ShieldCheck, Sparkles, Snowflake,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import type { ParticipantProfile, StayBooking } from "@/hooks/useParticipant";
import {
  CAMPUS, STAY_PROGRAMMES, STAY_ROOMS, STAY_WEEKS, admissionDates, checkoutDate, currencyForCountry,
  formatMoney, longDate, nightsFor, shortDate, stayTariff,
} from "@/lib/stay-booking";

const MAROON_GRADIENT =
  "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 55%, hsl(345 40% 26%) 100%)";
const TINT = "hsl(345 15% 97%)";
const STEPS = ["Programme & Tariff", "Joining Date", "Confirm Reservation"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok && data?.success, data };
}

/** "Tue · 2 Dec". */
function chipDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return {
    day: d.toLocaleDateString("en-IN", { weekday: "short", timeZone: "UTC" }),
    date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" }),
  };
}

// ── Request form ─────────────────────────────────────────────────────────────────────────────

export function StayBookingForm({
  profile,
  existing,
  onSubmitted,
  onCancel,
}: {
  profile: ParticipantProfile;
  existing: StayBooking | null;
  onSubmitted: (booking: StayBooking) => void;
  onCancel?: () => void;
}) {
  const currency = currencyForCountry(profile.country);
  const dates = useMemo(() => admissionDates(), []);

  const [step, setStep] = useState(0);
  const [programme, setProgramme] = useState(
    () => STAY_PROGRAMMES.find((p) => p.name === existing?.programme)?.slug ?? "",
  );
  const [room, setRoom] = useState(
    () => STAY_ROOMS.find((r) => existing?.room.startsWith(r.name))?.key ?? "",
  );
  const [weeks, setWeeks] = useState<number>(existing?.weeks || 1);
  const [admission, setAdmission] = useState(
    () => (existing && dates.includes(existing.admissionDate) ? existing.admissionDate : ""),
  );
  const [email, setEmail] = useState(profile.email || "");
  const [notes, setNotes] = useState(existing?.notes || "");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const tariff = room ? stayTariff(room, weeks, currency) : null;
  const checkout = admission ? checkoutDate(admission, weeks) : "";
  const step1Done = Boolean(programme && room && weeks);
  const step2Done = Boolean(admission);

  function next() {
    setError("");
    if (step === 0 && !step1Done) return setError("Please choose a programme, an accommodation and a duration.");
    if (step === 1 && !step2Done) return setError("Please choose your admission date.");
    setStep((s) => Math.min(s + 1, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!EMAIL_RE.test(email.trim())) return setError("Please enter a valid email — your Patient App login is sent there.");
    if (!agree) return setError("Please confirm you have read the booking request policy.");
    setBusy(true);
    const r = await post("/api/stay-booking", { programme, room, weeks, admissionDate: admission, email: email.trim(), notes });
    setBusy(false);
    if (r.ok && r.data.booking) return onSubmitted(r.data.booking as StayBooking);
    setError(r.data?.error || "We couldn't send your booking request. Please try again.");
  }

  return (
    <div className="space-y-6">
      <Stepper step={step} done={[step1Done, step2Done, false]} onGo={(i) => i < step && setStep(i)} />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
        <form
          onSubmit={submit}
          className="rounded-[28px] bg-white border border-maroon/10 shadow-forest p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-3 pb-6 border-b border-maroon/10">
            <div>
              <p className="section-label text-gold">Reservation details</p>
              <h2 className="mt-1 font-display font-bold text-forest text-2xl sm:text-3xl leading-tight">
                {step === 0 ? "Select programme & accommodation" : step === 1 ? "Choose your admission date" : "Review & request booking"}
              </h2>
            </div>
            <span className="shrink-0 px-3 py-1 rounded-full bg-maroon/[0.06] text-maroon text-xs font-semibold font-body">
              Step {step + 1} of 3
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="pt-6 space-y-8"
            >
              {step === 0 && (
                <>
                  <Field n={1} icon={<Leaf size={16} />} title="Wellness programme" required>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {STAY_PROGRAMMES.map((p) => (
                        <Choice key={p.slug} selected={programme === p.slug} onClick={() => setProgramme(p.slug)}>
                          <span className="block font-body font-semibold text-forest text-[15px] leading-snug">{p.name}</span>
                          <span className="block font-body text-xs text-forest/55 mt-0.5">{p.blurb}</span>
                        </Choice>
                      ))}
                    </div>
                  </Field>

                  <Field n={2} icon={<BedDouble size={16} />} title="Accommodation & tariff tier" required>
                    <div className="space-y-2.5">
                      {STAY_ROOMS.map((r) => {
                        const price = stayTariff(r.key, weeks, currency);
                        return (
                          <Choice key={r.key} selected={room === r.key} onClick={() => setRoom(r.key)} row>
                            <span className="flex-1 min-w-0">
                              <span className="flex items-center gap-2 font-body font-semibold text-forest text-[15px]">
                                {r.name}
                                {r.ac && <Snowflake size={13} className="text-maroon/60" aria-label="Air-conditioned" />}
                              </span>
                              <span className="block font-body text-xs text-forest/55">
                                {r.block}{r.perPerson ? " · per person" : ""}
                              </span>
                            </span>
                            <span className="text-right shrink-0">
                              <span className="block font-display font-bold text-maroon text-lg leading-none">
                                {price !== null ? formatMoney(price, currency) : "—"}
                              </span>
                              <span className="block font-body text-[11px] text-forest/50 mt-1">
                                {weeks} week{weeks > 1 ? "s" : ""} · all-inclusive
                              </span>
                            </span>
                          </Choice>
                        );
                      })}
                    </div>
                  </Field>

                  <Field n={3} icon={<Clock size={16} />} title="Duration of stay" required>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {STAY_WEEKS.map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setWeeks(w)}
                          aria-pressed={weeks === w}
                          className={`rounded-2xl border px-3 py-3 text-center transition-all ${
                            weeks === w ? "border-maroon bg-maroon text-cream shadow-forest" : "border-maroon/15 bg-white text-forest hover:border-maroon/40"
                          }`}
                        >
                          <span className="block font-display font-bold text-xl leading-none">{w}</span>
                          <span className="block font-body text-xs mt-1 opacity-80">week{w > 1 ? "s" : ""} · {nightsFor(w)} nights</span>
                        </button>
                      ))}
                    </div>
                  </Field>
                </>
              )}

              {step === 1 && (
                <>
                  <Field n={4} icon={<CalendarDays size={16} />} title="Planned admission date" required>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {dates.map((d) => {
                        const c = chipDate(d);
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setAdmission(d)}
                            aria-pressed={admission === d}
                            className={`rounded-2xl border px-2 py-3 text-center transition-all ${
                              admission === d ? "border-maroon bg-maroon text-cream shadow-forest" : "border-maroon/15 bg-white text-forest hover:border-maroon/40"
                            }`}
                          >
                            <span className="block font-body text-[11px] uppercase tracking-wider opacity-70">{c.day}</span>
                            <span className="block font-display font-bold text-base mt-0.5">{c.date}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 font-body text-xs text-forest/55">
                      Admissions are on Tuesdays. Only dates at least {2} days ahead can be requested; reception confirms the date.
                    </p>
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <ReadOnlyDate label="Admission" value={admission ? longDate(admission) : "Select a Tuesday above"} />
                    <ReadOnlyDate label="Checkout · auto-calculated" value={checkout ? longDate(checkout) : "Follows from your duration"} />
                  </div>

                  <Note icon={<Info size={16} />}>
                    Stays run Tuesday to Monday — {weeks} week{weeks > 1 ? "s" : ""} is {nightsFor(weeks)} nights. Room allotment
                    and the final date are confirmed by reception.
                  </Note>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="rounded-2xl border border-maroon/10 overflow-hidden">
                    <ReviewRow label="Programme" value={STAY_PROGRAMMES.find((p) => p.slug === programme)?.name ?? ""} onEdit={() => setStep(0)} />
                    <ReviewRow label="Accommodation" value={STAY_ROOMS.find((r) => r.key === room)?.name ?? ""} onEdit={() => setStep(0)} />
                    <ReviewRow label="Duration" value={`${weeks} week${weeks > 1 ? "s" : ""} · ${nightsFor(weeks)} nights`} onEdit={() => setStep(0)} />
                    <ReviewRow label="Admission" value={longDate(admission)} onEdit={() => setStep(1)} />
                    <ReviewRow label="Checkout" value={longDate(checkout)} />
                    <ReviewRow label="Guest" value={`${profile.fullName} · ${profile.countryCode} ${profile.mobile}`} />
                  </div>

                  <label className="block">
                    <span className="font-body text-sm font-semibold text-forest">Email <span className="text-maroon">*</span></span>
                    <span className="relative mt-1.5 block">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/35" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-maroon/15 bg-white font-body text-forest focus:outline-none focus:ring-2 focus:ring-maroon/25"
                      />
                    </span>
                    <span className="mt-1 block font-body text-xs text-forest/55">
                      Your confirmation and Patient App login are sent here once reception approves.
                    </span>
                  </label>

                  <label className="block">
                    <span className="font-body text-sm font-semibold text-forest">Notes for reception <span className="font-normal text-forest/45">(optional)</span></span>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      maxLength={500}
                      placeholder="Travel plans, accessibility needs, companions, dietary requirements…"
                      className="mt-1.5 w-full px-4 py-3 rounded-xl border border-maroon/15 bg-white font-body text-forest focus:outline-none focus:ring-2 focus:ring-maroon/25"
                    />
                  </label>

                  <Note icon={<ShieldCheck size={18} />} title="Booking request policy">
                    Dates use Asia/Kolkata time. No advance payment is needed to request a stay. Reception reviews your request
                    and confirms the admission date and accommodation; charges are settled at the campus reception as per the
                    tariff and billing policy.
                  </Note>

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[hsl(var(--maroon))]"
                    />
                    <span className="font-body text-sm text-forest/80">
                      I understand this is a request: my stay is confirmed only after Arogyadhama reception approves it.
                    </span>
                  </label>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <p role="alert" className="mt-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 font-body text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => { setError(""); setStep((s) => s - 1); }}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-maroon/15 font-body font-semibold text-maroon hover:bg-maroon/5 transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-maroon/15 font-body font-semibold text-maroon hover:bg-maroon/5 transition-colors"
              >
                Keep current request
              </button>
            ) : null}
            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl font-body font-semibold text-cream hover:brightness-110 transition-all"
                style={{ background: MAROON_GRADIENT }}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={busy}
                className="flex-1 inline-flex items-center justify-center gap-2 h-14 rounded-xl font-body font-bold text-lg text-cream hover:brightness-110 transition-all disabled:opacity-60"
                style={{ background: MAROON_GRADIENT }}
              >
                {busy ? <Loader2 size={18} className="animate-spin" /> : null}
                {existing ? "Update booking request" : "Request booking"} <ArrowRight size={18} />
              </button>
            )}
          </div>
        </form>

        <StaySummary
          programme={STAY_PROGRAMMES.find((p) => p.slug === programme)?.name ?? ""}
          room={STAY_ROOMS.find((r) => r.key === room)?.name ?? ""}
          weeks={weeks}
          admission={admission}
          checkout={checkout}
          tariff={tariff !== null ? formatMoney(tariff, currency) : ""}
        />
      </div>
    </div>
  );
}

function Stepper({ step, done, onGo }: { step: number; done: boolean[]; onGo: (i: number) => void }) {
  return (
    <div className="rounded-[24px] bg-white border border-maroon/10 shadow-card px-5 sm:px-8 py-5">
      <ol className="flex items-center gap-2 sm:gap-4">
        {STEPS.map((label, i) => {
          const current = i === step;
          const complete = i < step || (done[i] && i < step);
          return (
            <li key={label} className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => onGo(i)}
                disabled={i >= step}
                className="flex items-center gap-2.5 min-w-0 disabled:cursor-default"
              >
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm ${
                    current ? "text-cream shadow-forest" : complete ? "bg-gold text-forest-dark" : "bg-maroon/[0.06] text-forest/40"
                  }`}
                  style={current ? { background: MAROON_GRADIENT } : undefined}
                >
                  {complete ? <Check size={16} /> : i + 1}
                </span>
                <span className="hidden sm:block text-left min-w-0">
                  <span className="block font-body text-[10px] font-bold tracking-[0.16em] uppercase text-forest/40">Step {i + 1}</span>
                  <span className={`block font-body font-semibold text-sm truncate ${current ? "text-forest" : "text-forest/50"}`}>{label}</span>
                </span>
              </button>
              {i < STEPS.length - 1 && <span className={`flex-1 h-px ${i < step ? "bg-gold" : "bg-maroon/10"}`} />}
            </li>
          );
        })}
      </ol>
      <p className="sm:hidden mt-3 font-body text-sm font-semibold text-forest">{STEPS[step]}</p>
    </div>
  );
}

function Field({ n, icon, title, required, children }: { n: number; icon: ReactNode; title: string; required?: boolean; children: ReactNode }) {
  return (
    <section>
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="flex items-center gap-2 font-body font-semibold text-forest text-[15px]">
          <span className="text-gold">{icon}</span> {n}. {title}
        </h3>
        {required && <span className="px-2.5 py-0.5 rounded-full bg-gold-pale text-forest text-[11px] font-bold font-body">Required</span>}
      </div>
      {children}
    </section>
  );
}

function Choice({ selected, onClick, row, children }: { selected: boolean; onClick: () => void; row?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full text-left rounded-2xl border px-4 py-3 transition-all ${row ? "flex items-center gap-4" : ""} ${
        selected ? "border-maroon bg-maroon/[0.04] ring-2 ring-maroon/20" : "border-maroon/12 bg-white hover:border-maroon/35"
      }`}
    >
      {children}
    </button>
  );
}

function ReadOnlyDate({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-maroon/10 px-4 py-3" style={{ background: TINT }}>
      <p className="font-body text-[11px] font-bold tracking-[0.14em] uppercase text-forest/45">{label}</p>
      <p className="mt-1 font-body font-semibold text-forest">{value}</p>
    </div>
  );
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit?: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-maroon/10 last:border-b-0 font-body text-sm">
      <span className="w-32 shrink-0 text-forest/50">{label}</span>
      <span className="flex-1 text-forest font-semibold break-words">{value || "—"}</span>
      {onEdit && (
        <button type="button" onClick={onEdit} className="text-xs font-semibold text-maroon hover:underline">
          Change
        </button>
      )}
    </div>
  );
}

function Note({ icon, title, children }: { icon: ReactNode; title?: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 p-4 sm:p-5 rounded-2xl bg-gold-pale/40 border border-gold/25">
      <span className="text-maroon shrink-0 mt-0.5">{icon}</span>
      <div className="font-body text-sm text-forest/80">
        {title && <p className="font-semibold text-forest mb-1">{title}</p>}
        {children}
      </div>
    </div>
  );
}

// ── Stay summary (sidebar) ───────────────────────────────────────────────────────────────────

function StaySummary(p: { programme: string; room: string; weeks: number; admission: string; checkout: string; tariff: string }) {
  const included = ["Doctor consultation & protocol", "Sattvic organic meals (3 daily)", "Yoga, Ayurveda & Naturopathy therapies"];
  return (
    <aside className="lg:sticky lg:top-28 rounded-[28px] bg-white border border-gold/30 shadow-card overflow-hidden">
      <div className="px-6 pt-6 pb-4 flex items-center justify-between gap-3 border-b border-maroon/10">
        <h3 className="flex items-center gap-2 font-display font-bold text-forest text-xl">
          <Leaf size={18} className="text-gold" /> Stay Summary
        </h3>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-maroon/[0.06] text-maroon text-[11px] font-bold font-body">
          <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" /> Live reservation
        </span>
      </div>

      <div className="p-6 space-y-5">
        <div className="rounded-2xl p-4" style={{ background: TINT }}>
          <p className="font-body text-[11px] font-bold tracking-[0.14em] uppercase text-forest/45">Selected programme</p>
          <p className="mt-1 font-body font-semibold text-forest">{p.programme || "Choose a programme to see your stay"}</p>
          {p.room && <p className="mt-0.5 font-body text-sm text-forest/60">{p.room}</p>}
        </div>

        <div className="rounded-2xl border border-maroon/10 p-4 space-y-3">
          <TimelineItem
            icon={<CalendarCheck2 size={16} />}
            label="Check-in · arrival"
            value={p.admission ? longDate(p.admission) : "Pending date selection"}
            accent
          />
          <div className="ml-4 pl-5 border-l border-dashed border-maroon/20">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-maroon/[0.05] font-body text-xs text-forest/70">
              <Clock size={12} /> {p.weeks} week{p.weeks > 1 ? "s" : ""} · {nightsFor(p.weeks)} nights
            </span>
          </div>
          <TimelineItem
            icon={<CheckCircle2 size={16} />}
            label="Checkout · departure"
            value={p.checkout ? longDate(p.checkout) : "Auto-derived from duration"}
          />
        </div>

        <p className="flex items-center gap-1.5 font-body text-xs text-forest/60">
          <MapPin size={13} className="text-maroon" /> Campus: <span className="font-semibold text-forest">Prashanti Kutiram</span> (Asia/Kolkata)
        </p>

        <div className="rounded-2xl border border-maroon/10 p-4 space-y-2.5 font-body text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-forest/70">Programme & accommodation</span>
            <span className="font-semibold text-forest">{p.tariff || "—"}</span>
          </div>
          {included.map((i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <span className="text-forest/70">{i}</span>
              <span className="px-2 py-0.5 rounded-md bg-gold-pale text-forest text-[11px] font-bold">Included</span>
            </div>
          ))}
          <div className="flex items-center justify-between gap-3">
            <span className="text-forest/70">Advance payment</span>
            <span className="font-semibold text-maroon">{formatMoney(0, "INR")} · Zero advance</span>
          </div>
          <div className="pt-3 mt-1 border-t border-maroon/10 flex items-center justify-between gap-3">
            <span>
              <span className="block font-semibold text-forest">Payable on admission</span>
              <span className="block text-xs text-forest/50">Settled at the campus reception</span>
            </span>
            <span className="font-display font-bold text-maroon text-xl">{p.tariff || "—"}</span>
          </div>
        </div>

        <ul className="space-y-2 font-body text-sm text-forest/80">
          {[
            "No advance or cancellation fee to request a stay",
            "Full medical evaluation by our doctors on admission",
            "Fresh organic sattvic vegetarian meals included",
            "Official S-VYASA Prashanti Kutiram campus admission",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <Check size={15} className="text-gold shrink-0 mt-0.5" /> {t}
            </li>
          ))}
        </ul>

        <Assistance />
      </div>
    </aside>
  );
}

function TimelineItem({ icon, label, value, accent }: { icon: ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${accent ? "text-cream" : "bg-gold text-forest-dark"}`}
        style={accent ? { background: MAROON_GRADIENT } : undefined}
      >
        {icon}
      </span>
      <span>
        <span className="block font-body text-[11px] font-bold tracking-[0.14em] uppercase text-forest/45">{label}</span>
        <span className="block font-body font-semibold text-forest text-sm">{value}</span>
      </span>
    </div>
  );
}

function Assistance() {
  return (
    <div className="rounded-2xl p-4 border border-gold/30 bg-gold-pale/30 font-body text-sm">
      <p className="flex items-center gap-2 font-semibold text-maroon"><Phone size={15} /> Need help with your booking?</p>
      <p className="mt-2 text-forest/70">
        Help desk:{" "}
        {CAMPUS.phones.map((ph, i) => (
          <span key={ph}>
            {i > 0 && " · "}
            <a href={`tel:${ph.replace(/\s/g, "")}`} className="font-semibold text-forest hover:text-maroon">{ph}</a>
          </span>
        ))}
      </p>
      <p className="text-forest/70">
        Email: <a href={`mailto:${CAMPUS.email}`} className="font-semibold text-forest hover:text-maroon">{CAMPUS.email}</a>
      </p>
    </div>
  );
}

// ── After the request ────────────────────────────────────────────────────────────────────────

function BookingDetails({ b }: { b: StayBooking }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 font-body text-sm">
      {[
        ["Programme", b.programme],
        ["Accommodation", b.room],
        ["Admission", longDate(b.admissionDate)],
        ["Checkout", b.checkoutDate ? longDate(b.checkoutDate) : ""],
        ["Duration", b.weeks ? `${b.weeks} week${b.weeks > 1 ? "s" : ""} · ${nightsFor(b.weeks)} nights` : ""],
        ["Tariff estimate", b.tariff],
      ].map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-3">
          <span className="text-forest/50 shrink-0">{k}</span>
          <span className="text-forest font-semibold text-right">{v || "—"}</span>
        </div>
      ))}
    </div>
  );
}

/** Pending: request sent, reception has not decided yet. */
export function BookingRequested({ booking, onChange }: { booking: StayBooking; onChange: () => void }) {
  const steps = [
    { label: "Booking request received", done: true },
    { label: "Reception reviews your registration and stay", done: false, current: true },
    { label: "Confirmation by email — then visit our campus on your date", done: false },
  ];
  return (
    <div className="rounded-[28px] bg-white border border-gold/30 shadow-card overflow-hidden">
      <div className="px-6 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-3 border-b border-gold/20 bg-gold-pale/40">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-gold text-forest-dark flex items-center justify-center"><Hourglass size={20} /></span>
          <div>
            <p className="font-body text-[11px] font-bold tracking-[0.16em] uppercase text-forest/60">Awaiting reception confirmation</p>
            <h2 className="font-display font-bold text-forest text-xl sm:text-2xl leading-tight">Your stay request is with our team</h2>
          </div>
        </div>
        {booking.requestedOn && (
          <span className="font-body text-xs text-forest/55">Requested {shortDate(booking.requestedOn.slice(0, 10))}</span>
        )}
      </div>
      <div className="p-6 sm:p-8 space-y-6">
        <ol className="space-y-3">
          {steps.map((s) => (
            <li key={s.label} className="flex items-center gap-3 font-body text-sm">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  s.done ? "bg-gold text-forest-dark" : s.current ? "text-cream" : "bg-maroon/[0.06] text-forest/40"
                }`}
                style={s.current ? { background: MAROON_GRADIENT } : undefined}
              >
                {s.done ? <Check size={14} /> : s.current ? <Loader2 size={14} className="animate-spin" /> : <Clock size={13} />}
              </span>
              <span className={s.done || s.current ? "text-forest font-semibold" : "text-forest/55"}>{s.label}</span>
            </li>
          ))}
        </ol>
        <div className="rounded-2xl border border-maroon/10 p-5" style={{ background: TINT }}>
          <BookingDetails b={booking} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onChange}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-maroon/15 font-body font-semibold text-maroon hover:bg-maroon/5 transition-colors"
          >
            <CalendarDays size={16} /> Change request
          </button>
          <p className="flex-1 self-center font-body text-xs text-forest/55">
            You can change the request until reception confirms it. We'll email you once it's confirmed.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Approved: "please visit our campus on <date>". */
export function StayConfirmed({ booking, email }: { booking: StayBooking; email: string }) {
  const bring = [
    "A government photo ID",
    "Previous medical reports and current prescriptions",
    "The medicines you take now, for your whole stay",
    "Comfortable clothing for yoga and therapies",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] overflow-hidden border border-maroon/10 shadow-forest bg-white"
    >
      <div className="relative px-6 sm:px-8 py-7 text-cream" style={{ background: MAROON_GRADIENT }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <p className="inline-flex items-center gap-2 font-body text-[11px] font-bold tracking-[0.16em] uppercase text-gold-light">
          <Sparkles size={13} /> Stay confirmed by reception
        </p>
        <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl leading-tight">Please visit our campus on</h2>
        <p className="mt-1 font-display font-bold text-3xl sm:text-4xl text-gold-light leading-tight">{longDate(booking.admissionDate)}</p>
        <p className="mt-3 font-body text-sm text-cream/80 max-w-xl">
          Report to the main reception at Prashanti Kutiram, where our team will complete your admission. No advance payment
          is needed — the tariff is settled at the campus reception.
        </p>
      </div>
      <div className="p-6 sm:p-8 space-y-6">
        <BookingDetails b={booking} />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-maroon/10 p-5" style={{ background: TINT }}>
            <p className="font-body text-xs font-bold tracking-[0.16em] uppercase text-gold">Please bring</p>
            <ul className="mt-3 space-y-2 font-body text-sm text-forest/80">
              {bring.map((t) => (
                <li key={t} className="flex gap-2"><Check size={15} className="text-maroon shrink-0 mt-0.5" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-maroon/10 p-5" style={{ background: TINT }}>
            <p className="font-body text-xs font-bold tracking-[0.16em] uppercase text-gold">How to reach us</p>
            <p className="mt-3 font-body text-sm text-forest/80 flex gap-2"><MapPin size={15} className="text-maroon shrink-0 mt-0.5" /> {CAMPUS.address}</p>
            <Link to="/plan-your-stay/how-to-reach" className="mt-3 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-maroon hover:underline">
              Directions & travel options <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <p className="flex items-start gap-2 font-body text-sm text-forest/70">
          <LogIn size={16} className="text-maroon shrink-0 mt-0.5" />
          {booking.confirmationEmailed
            ? <>We've emailed this confirmation{email ? <> to <span className="font-semibold text-forest">{email}</span></> : null}. Your Patient App login is sent in a separate email.</>
            : <>A confirmation email{email ? <> to <span className="font-semibold text-forest">{email}</span></> : null} is on its way, with your Patient App login in a separate email.</>}
        </p>
        <Assistance />
      </div>
    </motion.div>
  );
}
