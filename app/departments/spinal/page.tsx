import type { Metadata } from "next";
import Page from "@/views/departments/SpinalDisorders";

export const metadata: Metadata = { title: "Spinal Disorders" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
