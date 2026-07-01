import type { Metadata } from "next";
import Page from "@/views/therapies/Physiotherapy";

export const metadata: Metadata = { title: "Physiotherapy" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
