import type { Metadata } from "next";
import Page from "@/views/OurTeam";

export const metadata: Metadata = { title: "Our Team" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
