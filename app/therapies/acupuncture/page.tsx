import type { Metadata } from "next";
import Page from "@/views/therapies/Acupuncture";

export const metadata: Metadata = { title: "Acupuncture" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
