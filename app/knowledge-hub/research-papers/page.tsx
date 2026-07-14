import type { Metadata } from "next";
import Page from "@/views/ResearchPapers";

export const metadata: Metadata = { title: "Research Papers" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
