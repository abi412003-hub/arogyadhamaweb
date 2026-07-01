import type { Metadata } from "next";
import Page from "@/views/plan-your-stay/Accommodation";

export const metadata: Metadata = { title: "Accommodation" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
