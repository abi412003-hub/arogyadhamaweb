import type { Metadata } from "next";
import Page from "@/views/departments/Oncology";

export const metadata: Metadata = { title: "Oncology" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
