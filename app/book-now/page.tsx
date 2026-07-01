import type { Metadata } from "next";
import Page from "@/views/BookNow";

export const metadata: Metadata = { title: "Book Now" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
