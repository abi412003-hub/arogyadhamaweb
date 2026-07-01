import type { Metadata } from "next";
import Page from "@/views/departments/Pulmonology";

export const metadata: Metadata = { title: "Pulmonology" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
