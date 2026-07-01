import type { Metadata } from "next";
import Page from "@/views/departments/Endocrinology";

export const metadata: Metadata = { title: "Endocrinology" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
