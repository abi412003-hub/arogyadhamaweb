import type { Metadata } from "next";
import Page from "@/views/departments/PositiveHealth";

export const metadata: Metadata = { title: "Promotion of Positive Health" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
