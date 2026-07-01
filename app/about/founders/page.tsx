import type { Metadata } from "next";
import Page from "@/views/AboutFounders";

export const metadata: Metadata = { title: "Our Founders" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
