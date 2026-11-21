"use client";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, Lock, Mail, Phone, Smartphone, Sparkles,
  ShieldCheck, UserRound, Loader2, ChevronDown, Clock, CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Link } from "@/lib/router-compat";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { COUNTRY_CODES, findCountryCode } from "@/lib/country-codes";
import { useParticipant, type ParticipantProfile } from "@/hooks/useParticipant";

type Mode = "login" | "register";
type Step = "mobile" | "otp" | "details";

const OTP_LENGTH = 5;
const TINT = "hsl(345 15% 97%)";
const MAROON_GRADIENT =
  "linear-gradient(135deg, hsl(var(--maroon-dark)) 0%, hsl(var(--maroon)) 55%, hsl(345 40% 26%) 100%)";

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok && data?.success, status: res.status, data };
}

interface Details {
  fullName: string; email: string; gender: string; dateOfBirth: string;
  city: string; state: string; country: string; healthConcern: string;
  emergencyContactName: string; emergencyContactPhone: string;
}
const EMPTY_DETAILS: Details = {
  fullName: "", email: "", gender: "", dateOfBirth: "", city: "", state: "",
  country: "India", healthConcern: "", emergencyContactName: "", emergencyContactPhone: "",
};

export default function Account() {
  const params = useSearchParams();
  const router = useRouter();
  const { profile, loading, refresh } = useParticipant();

  const [mode, setMode] = useState<Mode>(params.get("tab") === "login" ? "login" : "register");
  const [step, setStep] = useState<Step>("mobile");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [details, setDetails] = useState<Details>(EMPTY_DETAILS);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ReactNode>("");
  // Amber "awaiting reception approval" message (not an error the user made).
  const [notice, setNotice] = useState<ReactNode>("");

  // Follow ?tab= when the header menu links here while the page is open.
  useEffect(() => {
    const t = params.get("tab");
    if (t === "login" || t === "register") switchMode(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const cc = findCountryCode(countryCode) ?? COUNTRY_CODES[0];
  const mobileValid = mobile.length >= cc.min && mobile.length <= cc.max &&
    (countryCode !== "+91" || /^[6-9]/.test(mobile));
  const prettyMobile = `${countryCode} ${mobile.replace(/(\d{5})(\d+)/, "$1 $2")}`;

  const totalSteps = mode === "register" ? 3 : 2;
  const stepIndex = step === "mobile" ? 1 : step === "otp" ? 2 : 3;
  const stepName = step === "mobile" ? "Mobile" : step === "otp" ? "Verify OTP" : "Your details";

  function switchMode(m: Mode) {
    setMode(m);
    setStep("mobile");
    setOtp("");
    setError("");
    setNotice("");
  }

  // Turn an API refusal into the right message (codes from src/lib/participants.ts).
  function showRefusal(data: any, fallback: string) {
    const code = data?.code;
    if (code === "pending") {
      setStep("mobile");
      setNotice(data.error);
    } else if (code === "not_registered") {
      setStep("mobile");
      setError(<>This number is not registered. <button type="button" className="underline font-semibold" onClick={() => switchMode("register")}>Register now</button></>);
    } else if (code === "exists" && !/awaiting/i.test(data.error || "")) {
      setError(<>This number is already registered. <button type="button" className="underline font-semibold" onClick={() => switchMode("login")}>Sign in instead</button></>);
    } else if (code === "exists") {
      setNotice(data.error);
    } else {
      if (code === "rejected" || code === "inactive") setStep("mobile");
      setError(data?.error || fallback);
    }
  }

  async function requestOtp(e?: FormEvent) {
    e?.preventDefault();
    if (!mobileValid) return;
    setBusy(true); setError(""); setNotice("");
    const r = await post("/api/auth/request-otp", { mode, countryCode, mobile });
    setBusy(false);
    if (r.ok) { setOtp(""); setStep("otp"); return; }
    showRefusal(r.data, "Something went wrong. Please try again.");
  }

  async function submitOtp(e?: FormEvent) {
    e?.preventDefault();
    if (otp.length !== OTP_LENGTH) return;
    setBusy(true); setError(""); setNotice("");
    if (mode === "login") {
      const r = await post("/api/auth/login", { countryCode, mobile, otp });
      if (r.ok) {
        await refresh().catch(() => null);
        setBusy(false);
        toast.success("Welcome back!");
        router.push("/profile");
        return;
      }
      setBusy(false);
      showRefusal(r.data, "Could not sign you in.");
      return;
    }
    const r = await post("/api/auth/verify-otp", { countryCode, mobile, otp });
    setBusy(false);
    if (r.ok) { setStep("details"); return; }
    setError(r.data?.error || "Incorrect OTP.");
  }

  async function submitDetails(e: FormEvent) {
    e.preventDefault();
    if (details.fullName.trim().length < 2) { setError("Please enter your full name."); return; }
    setBusy(true); setError("");
    const r = await post("/api/auth/register", { countryCode, mobile, otp, ...details });
    setBusy(false);
    if (r.ok) {
      // Registered and signed in: the dashboard opens on the stay-booking form.
      setDetails(EMPTY_DETAILS);
      await refresh().catch(() => null);
      toast.success("Registration complete — now request your stay");
      router.push("/profile");
      return;
    }
    if (r.data?.code === "bad_otp") { setStep("otp"); setOtp(""); }
    showRefusal(r.data, "Could not complete registration.");
  }

  const set = (k: keyof Details) => (e: { target: { value: string } }) =>
    setDetails((d) => ({ ...d, [k]: e.target.value }));

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <Layout>
      <section className="pt-28 md:pt-32 pb-16 md:pb-24" style={{ background: TINT }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] rounded-[28px] overflow-hidden bg-white border border-maroon/10 shadow-forest">
            {/* ── Form side ── */}
            <div className="min-w-0 p-5 sm:p-10 lg:p-12">
              {!loading && profile ? (
                <SignedIn profile={profile} />
              ) : (
                <>
                  {/* Tabs */}
                  <div className="grid grid-cols-2 p-1.5 rounded-2xl border border-maroon/10" style={{ background: TINT }} role="tablist">
                    {(["login", "register"] as Mode[]).map((m) => (
                      <button
                        key={m}
                        role="tab"
                        aria-selected={mode === m}
                        onClick={() => switchMode(m)}
                        className={`py-3 rounded-xl font-body font-semibold text-[15px] transition-all ${
                          mode === m ? "bg-white text-maroon shadow-card" : "text-forest/50 hover:text-forest"
                        }`}
                      >
                        {m === "login" ? "Sign In" : "Register"}
                      </button>
                    ))}
                  </div>

                  {/* Step chip */}
                  <div className="mt-7 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-maroon/15 bg-maroon/[0.04]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="font-body text-[11px] font-bold tracking-[0.16em] uppercase text-maroon">
                      Step {stepIndex} of {totalSteps}: {stepName}
                    </span>
                  </div>

                  <h1 className="mt-4 font-display font-bold text-forest" style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)", lineHeight: 1.12 }}>
                    {mode === "register" ? "Participant registration" : "Welcome back"}
                  </h1>
                  <p className="mt-2 font-body text-sage text-[15px]">
                    {step === "mobile" && (mode === "register"
                      ? "Enter your mobile number to begin registration for Prashanti Kutiram."
                      : "Sign in with the mobile number you registered with.")}
                    {step === "otp" && <>Enter the {OTP_LENGTH}-digit OTP for <span className="font-semibold text-forest">{prettyMobile}</span>.</>}
                    {step === "details" && "Tell us a little about yourself. Next, you'll request your stay from your dashboard — reception confirms it."}
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${mode}-${step}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="mt-7"
                    >
                      {step === "mobile" && (
                        <form onSubmit={requestOtp}>
                          <label htmlFor="mobile" className="flex items-center gap-2 font-body font-semibold text-forest text-[15px]">
                            <Smartphone size={17} className="text-gold" /> Mobile number
                          </label>
                          <div className="mt-2.5 flex items-stretch rounded-2xl border border-maroon/15 bg-white focus-within:border-maroon/50 focus-within:ring-4 focus-within:ring-maroon/10 transition-all">
                            <div className="relative flex items-center">
                              <select
                                aria-label="Country code"
                                value={countryCode}
                                onChange={(e) => { setCountryCode(e.target.value); setError(""); }}
                                className="appearance-none bg-transparent pl-4 pr-8 h-14 font-body font-semibold text-forest text-[15px] focus:outline-none cursor-pointer"
                              >
                                {COUNTRY_CODES.map((c) => (
                                  <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                                ))}
                              </select>
                              <ChevronDown size={14} className="absolute right-2.5 text-forest/40 pointer-events-none" />
                            </div>
                            <span className="w-px my-3 bg-maroon/10" />
                            <input
                              id="mobile"
                              type="tel"
                              inputMode="numeric"
                              autoComplete="tel-national"
                              placeholder={countryCode === "+91" ? "98765 43210" : "Mobile number"}
                              value={mobile}
                              onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "").slice(0, cc.max)); setError(""); }}
                              className="flex-1 min-w-0 px-4 h-14 bg-transparent font-body text-lg text-forest placeholder:text-forest/30 focus:outline-none tracking-wide"
                            />
                          </div>
                          <div className="mt-2 flex items-center justify-between font-body text-xs">
                            <span className="text-sage">{cc.country} ({cc.code})</span>
                            <span className={`px-2 py-0.5 rounded-md font-semibold ${mobileValid ? "bg-maroon/10 text-maroon" : "bg-maroon/[0.04] text-forest/50"}`}>
                              {mobile.length} / {cc.max} digits
                            </span>
                          </div>

                          <ErrorLine error={error} />
                          <NoticeLine notice={notice} />
                          <PrimaryButton disabled={!mobileValid || busy} busy={busy}>
                            {mode === "register" ? "Request OTP to Register" : "Request OTP to Sign In"}
                          </PrimaryButton>
                        </form>
                      )}

                      {step === "otp" && (
                        <form onSubmit={submitOtp}>
                          <label className="flex items-center gap-2 font-body font-semibold text-forest text-[15px]">
                            <ShieldCheck size={17} className="text-gold" /> One-time password
                          </label>
                          <div className="mt-3">
                            <InputOTP maxLength={OTP_LENGTH} value={otp} onChange={(v) => { setOtp(v.replace(/\D/g, "")); setError(""); }} autoFocus inputMode="numeric">
                              <InputOTPGroup className="gap-2.5">
                                {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                                  <InputOTPSlot
                                    key={i}
                                    index={i}
                                    className="h-14 w-12 sm:w-14 rounded-xl border border-maroon/20 first:rounded-xl last:rounded-xl first:border-l font-display text-2xl font-bold text-forest bg-white"
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-sm">
                            <button type="button" onClick={() => { setStep("mobile"); setError(""); }} className="inline-flex items-center gap-1 text-maroon font-semibold hover:underline">
                              <ArrowLeft size={14} /> Change number
                            </button>
                            <button type="button" disabled={busy} onClick={() => requestOtp()} className="text-forest/60 hover:text-forest">
                              Resend OTP
                            </button>
                          </div>

                          <ErrorLine error={error} />
                          <NoticeLine notice={notice} />
                          <PrimaryButton disabled={otp.length !== OTP_LENGTH || busy} busy={busy}>
                            {mode === "register" ? "Verify & Continue" : "Verify & Sign In"}
                          </PrimaryButton>
                        </form>
                      )}

                      {step === "details" && (
                        <form onSubmit={submitDetails} className="space-y-6">
                          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-maroon/[0.04] border border-maroon/10 font-body text-sm text-forest">
                            <ShieldCheck size={16} className="text-gold shrink-0" />
                            Mobile <span className="font-semibold">{prettyMobile}</span> verified
                          </div>

                          <FieldGroup title="Personal details">
                            <Field label="Full name" required className="sm:col-span-2">
                              <input className={inputCls} value={details.fullName} onChange={set("fullName")} autoComplete="name" placeholder="As on your ID" required maxLength={140} />
                            </Field>
                            <Field label="Email">
                              <input className={inputCls} type="email" value={details.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" maxLength={140} />
                            </Field>
                            <Field label="Gender">
                              <select className={inputCls} value={details.gender} onChange={set("gender")}>
                                <option value="">Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                              </select>
                            </Field>
                            <Field label="Date of birth">
                              <input className={inputCls} type="date" max={today} min="1900-01-01" value={details.dateOfBirth} onChange={set("dateOfBirth")} />
                            </Field>
                          </FieldGroup>

                          <FieldGroup title="Address">
                            <Field label="City">
                              <input className={inputCls} value={details.city} onChange={set("city")} autoComplete="address-level2" maxLength={80} />
                            </Field>
                            <Field label="State">
                              <input className={inputCls} value={details.state} onChange={set("state")} autoComplete="address-level1" maxLength={80} />
                            </Field>
                            <Field label="Country">
                              <input className={inputCls} value={details.country} onChange={set("country")} autoComplete="country-name" maxLength={80} />
                            </Field>
                          </FieldGroup>

                          <FieldGroup title="Health">
                            <Field label="Primary health concern" className="sm:col-span-2">
                              <textarea className={`${inputCls} h-auto py-3 min-h-[88px] resize-y`} value={details.healthConcern} onChange={set("healthConcern")} maxLength={1000} placeholder="e.g. Back pain, diabetes, stress management…" />
                            </Field>
                          </FieldGroup>

                          <FieldGroup title="Emergency contact">
                            <Field label="Contact name">
                              <input className={inputCls} value={details.emergencyContactName} onChange={set("emergencyContactName")} maxLength={140} />
                            </Field>
                            <Field label="Contact phone">
                              <input className={inputCls} type="tel" inputMode="tel" value={details.emergencyContactPhone} onChange={(e) => setDetails((d) => ({ ...d, emergencyContactPhone: e.target.value.replace(/[^\d+\s-]/g, "").slice(0, 20) }))} />
                            </Field>
                          </FieldGroup>

                          <ErrorLine error={error} />
                          <NoticeLine notice={notice} />
                          <PrimaryButton disabled={busy || details.fullName.trim().length < 2} busy={busy}>
                            Create my account
                          </PrimaryButton>
                        </form>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Info note */}
                  <div className="mt-7 flex gap-3 p-4 rounded-2xl border border-dashed border-maroon/15 font-body text-sm text-forest/70" style={{ background: TINT }}>
                    <Lock size={18} className="text-gold shrink-0 mt-0.5" />
                    <p>
                      Your participant account is kept with the Arogyadhama patient records. Each family member should register with their own mobile number.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* ── Brand panel ── */}
            <BrandPanel mode={mode} />
          </div>
        </div>
      </section>
    </Layout>
  );
}

const inputCls =
  "w-full h-12 px-4 rounded-xl border border-maroon/15 bg-white font-body text-[15px] text-forest placeholder:text-forest/30 focus:outline-none focus:border-maroon/50 focus:ring-4 focus:ring-maroon/10 transition-all";

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="section-label text-gold mb-3">{title}</legend>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </fieldset>
  );
}

function Field({ label, required, className = "", children }: { label: string; required?: boolean; className?: string; children: ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="block mb-1.5 font-body text-sm font-semibold text-forest/80">
        {label}{required && <span className="text-maroon"> *</span>}
      </span>
      {children}
    </label>
  );
}

function ErrorLine({ error }: { error: ReactNode }) {
  if (!error) return null;
  return (
    <p role="alert" className="mt-4 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 font-body text-sm text-red-700">
      {error}
    </p>
  );
}

function NoticeLine({ notice }: { notice: ReactNode }) {
  if (!notice) return null;
  return (
    <p role="status" className="mt-4 flex gap-2.5 px-3.5 py-3 rounded-xl bg-gold-pale/60 border border-gold/30 font-body text-sm text-forest">
      <Clock size={17} className="text-gold shrink-0 mt-0.5" />
      <span>{notice}</span>
    </p>
  );
}

function PrimaryButton({ children, disabled, busy }: { children: ReactNode; disabled?: boolean; busy?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mt-6 w-full h-16 rounded-2xl inline-flex items-center justify-center gap-3 font-display font-bold text-lg text-cream shadow-forest transition-all hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:brightness-100 disabled:cursor-not-allowed"
      style={{ background: MAROON_GRADIENT }}
    >
      {busy ? <Loader2 size={20} className="animate-spin" /> : null}
      {children}
      {!busy && <ArrowRight size={20} />}
    </button>
  );
}

function SignedIn({ profile }: { profile: ParticipantProfile }) {
  return (
    <div className="py-6">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-cream" style={{ background: MAROON_GRADIENT }}>
        <UserRound size={26} />
      </div>
      <h1 className="mt-5 font-display font-bold text-forest text-3xl">You're signed in</h1>
      <p className="mt-2 font-body text-sage">
        Signed in as <span className="font-semibold text-forest">{profile.fullName}</span> ({profile.countryCode} {profile.mobile}).
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link to="/profile" className="inline-flex items-center gap-2 px-6 h-12 rounded-xl font-body font-semibold text-cream" style={{ background: MAROON_GRADIENT }}>
          View my profile <ArrowRight size={16} />
        </Link>
        <Link to="/book-now" className="inline-flex items-center gap-2 px-6 h-12 rounded-xl font-body font-semibold bg-gold text-forest-dark hover:bg-gold-light transition-colors">
          Book your stay
        </Link>
      </div>
    </div>
  );
}

const BENEFITS = [
  "Direct online booking for residential health packages",
  "Personalised therapy scheduling & consultation tracking",
  "No advance fee required to request your reservation",
  "Highest standard of data privacy & patient dignity",
];

function BrandPanel({ mode }: { mode: Mode }) {
  return (
    <aside className="relative overflow-hidden p-8 sm:p-10 lg:p-12 text-cream flex flex-col" style={{ background: MAROON_GRADIENT }}>
      {/* decorative rings */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full border border-gold/15" />
      <div className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full border border-gold/10" />
      <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />

      <div className="relative">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 font-body text-[11px] font-bold tracking-[0.18em] uppercase text-gold-light">
          <Sparkles size={13} /> Prashanti Kutiram Campus
        </span>
        <h2 className="mt-6 font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
          {mode === "register" ? "Join S-VYASA Arogyadhama" : "Welcome back to Arogyadhama"}
        </h2>
        <p className="mt-4 font-body text-cream/75 text-[15px] leading-relaxed">
          {mode === "register"
            ? "Create your participant account to reserve therapeutic packages, access expert yoga therapy consultations, and begin your healing journey."
            : "Sign in to view your participant profile, manage your details and plan your next stay at Prashanti Kutiram."}
        </p>

        <ul className="mt-7 space-y-4">
          {BENEFITS.map((b) => (
            <li key={b} className="flex gap-3 font-body text-[15px] text-cream/90">
              <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full border border-gold/50 bg-gold/15 flex items-center justify-center">
                <Check size={13} className="text-gold-light" strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-10 lg:mt-auto pt-6">
        <div className="rounded-2xl border border-cream/15 bg-white/[0.06] p-5 backdrop-blur-sm">
          <p className="font-body text-[11px] font-bold tracking-[0.18em] uppercase text-gold-light">Need help registering?</p>
          <p className="mt-2 font-body text-sm text-cream/80">Our admissions help desk is happy to assist:</p>
          <div className="mt-3 space-y-1.5 font-body text-sm">
            <a href="tel:+919972871777" className="flex items-center gap-2 text-cream hover:text-gold-light transition-colors">
              <Phone size={14} className="text-gold-light" /> 997-287-1777 / 961-134-4691
            </a>
            <a href="mailto:info@arogyadhama.org" className="flex items-center gap-2 text-cream hover:text-gold-light transition-colors">
              <Mail size={14} className="text-gold-light" /> info@arogyadhama.org
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
