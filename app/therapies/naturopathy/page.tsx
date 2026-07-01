import type { Metadata } from "next";
import Page from "@/views/therapies/Naturopathy";

export const metadata: Metadata = { title: "Naturopathy" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
