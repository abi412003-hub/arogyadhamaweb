import type { Metadata } from "next";
import Page from "@/views/departments/Neurology";

export const metadata: Metadata = { title: "Neurology" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
