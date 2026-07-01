import type { Metadata } from "next";
import Page from "@/views/KnowledgeHub";

export const metadata: Metadata = { title: "Knowledge Hub" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
