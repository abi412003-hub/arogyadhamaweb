import type { Metadata } from "next";
import Page from "@/views/plan-your-stay/AfterCare";

export const metadata: Metadata = { title: "Anuvartana — Aftercare Programme" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
