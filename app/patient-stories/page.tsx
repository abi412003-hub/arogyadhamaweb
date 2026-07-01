import type { Metadata } from "next";
import Page from "@/views/PatientStories";

export const metadata: Metadata = { title: "Patient Stories" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
