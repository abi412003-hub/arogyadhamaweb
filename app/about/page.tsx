import type { Metadata } from "next";
import Page from "@/views/About";

export const metadata: Metadata = { title: "About Arogyadhama" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
