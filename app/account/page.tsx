import { Suspense } from "react";
import type { Metadata } from "next";
import Page from "@/views/Account";

export const metadata: Metadata = {
  title: "Participant Login & Registration",
  robots: { index: false, follow: false },
};

export default function Route() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
