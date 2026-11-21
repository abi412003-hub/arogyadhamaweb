"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/** Mirrors `toProfile()` in src/lib/participants.ts (server-only module). */
export interface ParticipantProfile {
  name: string;
  fullName: string;
  countryCode: string;
  mobile: string;
  mobileVerified: boolean;
  email: string;
  gender: string;
  dateOfBirth: string;
  city: string;
  state: string;
  country: string;
  healthConcern: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  status: string;
  approvalStatus: string;
  /** "pending" until reception approves the registration (and stay request) — then "approved". */
  access: "approved" | "pending" | "rejected" | "inactive";
  patientId: string;
  memberSince: string;
  lastLogin: string;
  booking: StayBooking | null;
}

/** Mirrors `toBooking()` in src/lib/participants.ts. */
export interface StayBooking {
  programme: string;
  room: string;
  weeks: number;
  admissionDate: string;
  checkoutDate: string;
  tariff: string;
  notes: string;
  requestedOn: string;
  confirmed: boolean;
  confirmationEmailed: boolean;
}

/** Mirrors `getPatientProfile()` in src/lib/participants.ts. */
export interface LinkedPatient {
  id: string;
  name: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  mobile: string;
  email: string;
  department: string;
  accommodation: string;
  room: string;
  opNo: string;
  ipNo: string;
  admissionDate: string;
  status: string;
}

interface Me {
  profile: ParticipantProfile;
  patient: LinkedPatient | null;
  patientAppUrl: string;
  /** "Open Patient App" signs them straight in via /api/auth/patient-app. */
  patientAppHandoff: boolean;
}

const KEY = ["participant"];
const DEFAULT_APP_URL = "https://arogya-patient-app.vercel.app";

async function fetchMe(): Promise<Me | null> {
  const res = await fetch("/api/auth/me", { cache: "no-store", credentials: "same-origin" });
  if (res.status === 401) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) throw new Error(data?.error || "Could not load profile");
  if (!data.profile) return null;
  return {
    profile: data.profile,
    patient: data.patient ?? null,
    patientAppUrl: data.patientAppUrl || DEFAULT_APP_URL,
    patientAppHandoff: data.patientAppHandoff === true,
  };
}

/** The signed-in (reception-approved) website participant; null when signed out. */
export function useParticipant() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: KEY,
    queryFn: fetchMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    profile: query.data?.profile ?? null,
    patient: query.data?.patient ?? null,
    patientAppUrl: query.data?.patientAppUrl ?? DEFAULT_APP_URL,
    patientAppHandoff: query.data?.patientAppHandoff ?? false,
    loading: query.isLoading,
    error: query.error as Error | null,
    /** Re-read the session from the server (after sign-in). */
    refresh: () => qc.fetchQuery({ queryKey: KEY, queryFn: fetchMe }),
    logout: async () => {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => {});
      qc.setQueryData(KEY, null);
    },
  };
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return ((parts[0][0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}
