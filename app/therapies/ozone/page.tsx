import type { Metadata } from "next";
import Page from "@/views/therapies/OzoneTherapy";

export const metadata: Metadata = { title: "Ozone Therapy" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
