import type { Metadata } from "next";
import Page from "@/views/departments/Rheumatology";

export const metadata: Metadata = { title: "Rheumatology" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
