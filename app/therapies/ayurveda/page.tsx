import type { Metadata } from "next";
import Page from "@/views/therapies/Ayurveda";

export const metadata: Metadata = { title: "Ayurveda" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
