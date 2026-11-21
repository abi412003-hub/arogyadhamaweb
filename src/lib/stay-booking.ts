// Stay-booking rules shared by the dashboard form (browser) and the booking API (server).
// Pure — no server-only imports — so both sides compute the same dates and prices.
//
// A registered participant requests a residential stay from their dashboard: a programme, an
// accommodation tier, a duration (1–4 weeks) and an admission Tuesday. The request goes to
// reception with their registration; when reception approves it, the dashboard (and an email)
// asks them to report to the campus on the admission date.
import { ROOM_RATES, type RoomRateKey } from "./tariff-rates";

export const STAY_PROGRAMMES = [
  { slug: "positive-health", name: "Positive Health & Wellness", blurb: "Stress relief, rejuvenation and lasting well-being" },
  { slug: "diabetes", name: "Diabetes & Metabolic Care", blurb: "Yoga-based metabolic medicine for diabetes" },
  { slug: "cardiology", name: "Cardiology — Heart Care", blurb: "Lifestyle-based cardiovascular rehabilitation" },
  { slug: "endocrinology", name: "Endocrinology — Hormonal Balance", blurb: "Thyroid, PCOS and hormonal disorders" },
  { slug: "gastroenterology", name: "Gastroenterology — Digestive Health", blurb: "Gut and digestive conditions" },
  { slug: "neurology", name: "Neurology — Brain & Nerves", blurb: "Migraine, Parkinson's, stroke rehabilitation" },
  { slug: "oncology", name: "Oncology — Integrative Cancer Care", blurb: "Complementary care alongside treatment" },
  { slug: "psychiatry", name: "Psychiatry — Mind & Emotions", blurb: "Anxiety, depression and sleep" },
  { slug: "pulmonology", name: "Pulmonology — Breathing & Lungs", blurb: "Asthma, COPD and breathing therapy" },
  { slug: "rheumatology", name: "Rheumatology — Joints & Inflammation", blurb: "Arthritis and inflammatory conditions" },
  { slug: "spinal-disorders", name: "Spinal Disorders — Back & Neck", blurb: "Back pain, spondylosis and disc problems" },
] as const;

export interface StayRoom {
  key: RoomRateKey;
  name: string;
  block: string;
  perPerson: boolean;
  ac: boolean;
}

export const STAY_ROOMS: readonly StayRoom[] = [
  { key: "dormitory", name: "Dormitory", block: "Pushpa / Ashwini Ward", perPerson: false, ac: false },
  { key: "double-sharing", name: "Double / Triple Sharing (Non-AC)", block: "Maitri Block", perPerson: true, ac: false },
  { key: "double-sharing-ac", name: "Double / Triple Sharing (AC)", block: "Maitri Block", perPerson: true, ac: true },
  { key: "single", name: "Single Room", block: "Ashirwad Block", perPerson: false, ac: false },
  { key: "semi-deluxe", name: "Double Deluxe (AC)", block: "Sheshadri", perPerson: true, ac: true },
  { key: "single-deluxe", name: "Single Deluxe (AC)", block: "Sheshadri", perPerson: false, ac: true },
  { key: "suite", name: "Suite Sharing (AC)", block: "Premium Block", perPerson: true, ac: true },
];

export const STAY_WEEKS = [1, 2, 3, 4] as const;

export type Currency = "INR" | "USD";

export const CAMPUS = {
  name: "S-VYASA Arogyadhama, Prashanti Kutiram",
  address: "Prashanti Kutiram, Vivekananda Road, Kalluballu Post, Jigani, Anekal, Bengaluru – 560105",
  phones: ["+91 99728 71777", "+91 96113 44691"],
  email: "arogyadhama@svyasa.edu.in",
  timeZone: "Asia/Kolkata",
} as const;

export const findProgramme = (slug: string) => STAY_PROGRAMMES.find((p) => p.slug === slug) ?? null;
export const findRoom = (key: string) => STAY_ROOMS.find((r) => r.key === key) ?? null;

/** Rupees for India, dollars everywhere else — the same rule as the Tariff page. */
export function currencyForCountry(country: string | null | undefined): Currency {
  const c = (country ?? "").trim().toLowerCase();
  return !c || c === "india" || c === "in" ? "INR" : "USD";
}

/** The all-inclusive tariff for a room over `weeks` weeks, or null for an unknown room/duration. */
export function stayTariff(roomKey: string, weeks: number, currency: Currency): number | null {
  const rates = ROOM_RATES[roomKey as RoomRateKey];
  if (!rates || !Number.isInteger(weeks) || weeks < 1 || weeks > rates.INR.length) return null;
  return rates[currency][weeks - 1];
}

export function formatMoney(amount: number, currency: Currency): string {
  return currency === "INR" ? `₹${amount.toLocaleString("en-IN")}` : `$${amount.toLocaleString("en-US")}`;
}

// ── Dates (all calendar dates are in campus time, Asia/Kolkata) ─────────────────────────────

/** Today's date on campus, "YYYY-MM-DD". */
export function campusToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CAMPUS.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

const DAY_MS = 86_400_000;
const isoToUtc = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
const utcToIso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

export function addDays(iso: string, days: number): string {
  return utcToIso(isoToUtc(iso) + days * DAY_MS);
}

/** 0 = Sunday … 2 = Tuesday. */
export const weekday = (iso: string) => new Date(isoToUtc(iso)).getUTCDay();

/** Admissions are on Tuesdays. Requests need at least 2 days' notice, up to 12 weeks ahead. */
export const ADMISSION_LEAD_DAYS = 2;
export const ADMISSION_HORIZON_WEEKS = 12;

export function admissionDates(now: Date = new Date()): string[] {
  let d = addDays(campusToday(now), ADMISSION_LEAD_DAYS);
  while (weekday(d) !== 2) d = addDays(d, 1);
  return Array.from({ length: ADMISSION_HORIZON_WEEKS }, (_, i) => addDays(d, i * 7));
}

/** A stay runs Tuesday → Monday: `weeks` weeks after admission, minus one day. */
export function checkoutDate(admission: string, weeks: number): string {
  return addDays(admission, weeks * 7 - 1);
}

export const nightsFor = (weeks: number) => weeks * 7 - 1;

/** "Tuesday, 2 December 2026". */
export function longDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return new Date(isoToUtc(iso)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "2 Dec 2026". */
export function shortDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return new Date(isoToUtc(iso)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// ── Validation (server side re-checks everything the form sends) ────────────────────────────

export interface StayRequestInput {
  programme: string;
  room: string;
  weeks: number;
  admissionDate: string;
  email: string;
  notes: string;
}

export interface StayRequest extends StayRequestInput {
  checkoutDate: string;
  currency: Currency;
  tariff: number;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Checks a request and fills in what the server derives. Returns an error message or the request. */
export function validateStayRequest(
  input: Partial<Record<keyof StayRequestInput, unknown>>,
  country: string,
  now: Date = new Date(),
): { ok: true; value: StayRequest } | { ok: false; error: string } {
  const s = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const programme = s(input.programme, 60);
  const room = s(input.room, 60);
  const weeks = Number(input.weeks);
  const admissionDate = s(input.admissionDate, 10);
  const email = s(input.email, 140);
  const notes = s(input.notes, 500);

  if (!findProgramme(programme)) return { ok: false, error: "Please choose a wellness programme." };
  if (!findRoom(room)) return { ok: false, error: "Please choose an accommodation tier." };
  if (!(STAY_WEEKS as readonly number[]).includes(weeks)) return { ok: false, error: "Please choose a stay of 1 to 4 weeks." };
  if (!admissionDates(now).includes(admissionDate))
    return { ok: false, error: "Please choose one of the available admission Tuesdays." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };

  const currency = currencyForCountry(country);
  const tariff = stayTariff(room, weeks, currency);
  if (tariff === null) return { ok: false, error: "This accommodation is not available for that duration." };
  return {
    ok: true,
    value: { programme, room, weeks, admissionDate, email, notes, checkoutDate: checkoutDate(admissionDate, weeks), currency, tariff },
  };
}
