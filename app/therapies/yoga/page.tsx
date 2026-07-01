import type { Metadata } from "next";
import Page from "@/views/therapies/YogaTherapy";

export const metadata: Metadata = { title: "Yoga Therapy" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
