import type { Metadata } from "next";
import Page from "@/views/plan-your-stay/FAQs";

export const metadata: Metadata = { title: "FAQs" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
