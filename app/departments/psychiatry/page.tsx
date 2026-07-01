import type { Metadata } from "next";
import Page from "@/views/departments/Psychiatry";

export const metadata: Metadata = { title: "Psychiatry" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
