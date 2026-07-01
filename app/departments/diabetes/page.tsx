import type { Metadata } from "next";
import Page from "@/views/departments/Diabetes";

export const metadata: Metadata = { title: "Diabetes & Metabolic Disorders" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
