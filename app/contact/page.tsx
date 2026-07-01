import type { Metadata } from "next";
import Page from "@/views/Contact";

export const metadata: Metadata = { title: "Contact Us" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
