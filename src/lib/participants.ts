// Server-only helpers for website participants stored in Frappe
// (DocType "Website Registered User", created by scripts/create-frappe-doctype.mjs).
import { getDoc } from "@/lib/erpnext";
import { findCountryCode } from "@/lib/country-codes";

export const PARTICIPANT_DOCTYPE =
  process.env.ERPNEXT_PARTICIPANT_DOCTYPE || "Website Registered User";

export interface MobileInput {
  countryCode: string;
  mobile: string;
  loginId: string;
}

/** Validate a country code + mobile pair. Returns null when invalid. */
export function parseMobile(countryCode: unknown, mobile: unknown): MobileInput | null {
  const cc = typeof countryCode === "string" ? countryCode.trim() : "";
  const rule = findCountryCode(cc);
  if (!rule) return null;
  const digits = typeof mobile === "string" ? mobile.replace(/\D/g, "") : "";
  if (digits.length < rule.min || digits.length > rule.max) return null;
  if (cc === "+91" && !/^[6-9]/.test(digits)) return null;
  return { countryCode: cc, mobile: digits, loginId: `${cc}${digits}` };
}

export async function findParticipant(loginId: string) {
  return getDoc(PARTICIPANT_DOCTYPE, loginId);
}

/** The fields the browser is allowed to see. */
export function toProfile(doc: Record<string, any>) {
  return {
    name: doc.name as string,
    fullName: doc.full_name ?? "",
    countryCode: doc.country_code ?? "",
    mobile: doc.mobile ?? "",
    mobileVerified: Boolean(doc.mobile_verified),
    email: doc.email ?? "",
    gender: doc.gender ?? "",
    dateOfBirth: doc.date_of_birth ?? "",
    city: doc.city ?? "",
    state: doc.state ?? "",
    country: doc.country ?? "",
    healthConcern: doc.health_concern ?? "",
    emergencyContactName: doc.emergency_contact_name ?? "",
    emergencyContactPhone: doc.emergency_contact_phone ?? "",
    status: doc.status ?? "",
    memberSince: doc.creation ?? "",
    lastLogin: doc.last_login ?? "",
  };
}

export type Profile = ReturnType<typeof toProfile>;

/** Frappe Datetime string ("YYYY-MM-DD HH:mm:ss") in IST. */
export function frappeNow(): string {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().slice(0, 19).replace("T", " ");
}
