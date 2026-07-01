import type { Metadata } from "next";
import Page from "@/views/plan-your-stay/WhatToBring";

export const metadata: Metadata = { title: "What to Bring" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
