import type { Metadata } from "next";
import Page from "@/views/plan-your-stay/PlanYourStay";

export const metadata: Metadata = { title: "Plan Your Stay" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
