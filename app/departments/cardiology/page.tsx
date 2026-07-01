import type { Metadata } from "next";
import Page from "@/views/departments/Cardiology";

export const metadata: Metadata = { title: "Cardiology" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
