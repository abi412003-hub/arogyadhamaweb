import type { Metadata } from "next";
import Page from "@/views/AboutHistory";

export const metadata: Metadata = { title: "Our History" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
