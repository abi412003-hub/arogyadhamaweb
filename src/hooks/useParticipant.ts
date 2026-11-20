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
  memberSince: string;
  lastLogin: string;
}

const KEY = ["participant"];

async function fetchMe(): Promise<ParticipantProfile | null> {
  const res = await fetch("/api/auth/me", { cache: "no-store", credentials: "same-origin" });
  if (res.status === 401) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) throw new Error(data?.error || "Could not load profile");
  return (data.profile ?? null) as ParticipantProfile | null;
}

/** The signed-in website participant (null when signed out). */
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
    profile: query.data ?? null,
    loading: query.isLoading,
    error: query.error as Error | null,
    setProfile: (p: ParticipantProfile | null) => qc.setQueryData(KEY, p),
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
