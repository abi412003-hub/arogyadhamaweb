import type { Metadata } from "next";
import Page from "@/views/plan-your-stay/HowToReach";

export const metadata: Metadata = { title: "How to Reach" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
