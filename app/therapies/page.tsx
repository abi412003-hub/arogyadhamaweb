import type { Metadata } from "next";
import Page from "@/views/Therapies";

export const metadata: Metadata = { title: "Therapies & Healing Systems" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
