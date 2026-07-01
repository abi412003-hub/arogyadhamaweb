import type { Metadata } from "next";
import Page from "@/views/therapies/YogicCounselling";

export const metadata: Metadata = { title: "Yogic Counselling & Psychotherapy" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
