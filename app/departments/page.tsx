import type { Metadata } from "next";
import Page from "@/views/Departments";

export const metadata: Metadata = { title: "Clinical Departments" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
