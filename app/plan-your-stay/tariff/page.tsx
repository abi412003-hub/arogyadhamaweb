import type { Metadata } from "next";
import Page from "@/views/plan-your-stay/Tariff";

export const metadata: Metadata = { title: "Tariff & Packages" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
