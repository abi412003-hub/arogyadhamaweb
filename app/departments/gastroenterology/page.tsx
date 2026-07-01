import type { Metadata } from "next";
import Page from "@/views/departments/Gastroenterology";

export const metadata: Metadata = { title: "Gastroenterology" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
