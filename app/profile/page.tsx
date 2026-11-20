import type { Metadata } from "next";
import Page from "@/views/Profile";

export const metadata: Metadata = {
  title: "My Profile",
  robots: { index: false, follow: false },
};

export default function Route() {
  return <Page />;
}

export const dynamic = "force-dynamic";
