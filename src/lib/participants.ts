// Server-only helpers for website participants stored in Frappe
// (DocType "Website Registered User", created by scripts/create-frappe-doctype.mjs;
// approval fields added by scripts/update-frappe-doctype-approval.mjs).
import { getDoc, getList } from "@/lib/erpnext";
import { findCountryCode } from "@/lib/country-codes";

export const PARTICIPANT_DOCTYPE =
  process.env.ERPNEXT_PARTICIPANT_DOCTYPE || "Website Registered User";

export const PATIENT_APP_URL =
  process.env.PATIENT_APP_URL?.trim() || "https://arogya-patient-app.vercel.app";

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

// ── Reception approval ──────────────────────────────────────────────────────

export type AccessState = "approved" | "pending" | "rejected" | "inactive";

export function accessState(doc: Record<string, any>): AccessState {
  if (doc.status === "Inactive") return "inactive";
  if (doc.approval_status === "Approved") return "approved";
  if (doc.approval_status === "Rejected") return "rejected";
  return "pending";
}

/** Why a registered user may not sign in yet — `null` when they may. */
export function accessDenied(doc: Record<string, any>): { status: number; code: string; error: string } | null {
  switch (accessState(doc)) {
    case "approved":
      return null;
    case "pending":
      return {
        status: 403,
        code: "pending",
        error:
          "Your registration is awaiting approval from reception. You can sign in once it has been approved.",
      };
    case "rejected": {
      const remarks = typeof doc.reception_remarks === "string" ? doc.reception_remarks.trim() : "";
      return {
        status: 403,
        code: "rejected",
        error: `Your registration was not approved by reception.${
          remarks ? ` Reason: ${remarks.replace(/[.!\s]*$/, ".")}` : ""
        } Please contact the help desk.`,
      };
    }
    default:
      return {
        status: 403,
        code: "inactive",
        error: "This account is inactive. Please contact the help desk.",
      };
  }
}

export const NOT_REGISTERED = {
  status: 404,
  code: "not_registered",
  error: "This number is not registered.",
};

// ── Patient link ────────────────────────────────────────────────────────────

/**
 * The single Patient whose mobile/phone ends with these digits, or null when there
 * is none or more than one (a family sharing a phone) — reception then picks.
 */
export async function findPatientByMobile(mobile: string): Promise<string | null> {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length < 8) return null;
  const ids = new Set<string>();
  for (const field of ["mobile", "phone"]) {
    try {
      const rows = await getList("Patient", {
        filters: [[field, "like", `%${digits}%`]],
        fields: ["name", field],
        limit: 10,
      });
      for (const r of rows) {
        if (String(r[field] ?? "").replace(/\D/g, "").endsWith(digits)) ids.add(r.name);
      }
    } catch (e) {
      console.error(`findPatientByMobile: lookup on Patient.${field} failed (non-fatal):`, e);
    }
  }
  return ids.size === 1 ? [...ids][0] : null;
}

/** The Patient-record fields shown on the website dashboard. */
export async function getPatientProfile(id: string) {
  const p = await getDoc("Patient", id);
  if (!p) return null;
  const s = (v: unknown) => (v === null || v === undefined ? "" : String(v));
  return {
    id: s(p.name),
    name: s(p.patient_name || [p.first_name, p.last_name].filter(Boolean).join(" ")),
    gender: s(p.sex),
    dob: s(p.dob),
    bloodGroup: s(p.blood_group),
    mobile: s(p.mobile || p.phone),
    email: s(p.email),
    department: s(p.ad_department || p.department),
    accommodation: s(p.accommodation_type),
    room: s(p.room_no),
    opNo: s(p.ad_op_no),
    ipNo: s(p.ad_ip_no),
    admissionDate: s(p.date_of_admission),
    status: s(p.status),
  };
}

export type PatientProfile = NonNullable<Awaited<ReturnType<typeof getPatientProfile>>>;

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
    approvalStatus: doc.approval_status ?? "",
    patientId: doc.patient ?? "",
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
