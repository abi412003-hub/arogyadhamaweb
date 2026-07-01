import type { Metadata } from "next";
import Page from "@/views/plan-your-stay/Schedule";

export const metadata: Metadata = { title: "Daily Schedule" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
