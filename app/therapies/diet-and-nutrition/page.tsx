import type { Metadata } from "next";
import Page from "@/views/therapies/DietAndNutrition";

export const metadata: Metadata = { title: "Diet & Nutrition" };

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
