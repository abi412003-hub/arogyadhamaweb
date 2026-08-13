import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";

// Google Analytics 4 — the measurement ID is a public identifier, not a secret.
// Declared once here in the root layout so every route carries exactly one tag.
const GA_MEASUREMENT_ID = "G-YD0M9KJRVT";

const SITE_URL = "https://www.svyasaarogyadhama.com";
const TITLE =
  "Arogyadhama — Integrative Medicine Hospital | S-VYASA, Bengaluru";
const DESCRIPTION =
  "India's premier integrative medicine hospital combining Yoga, Ayurveda, Naturopathy, Acupuncture, Physiotherapy & modern science for holistic healing since 1984. 600-bed facility at Prashanti Kutiram, Bengaluru.";
const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bf5df2f8-1f1d-499a-9987-db013805f3f8/id-preview-8bdc1999--920773b5-8001-4e44-b015-b2a821068e97.lovable.app-1771540283304.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Arogyadhama",
  },
  description: DESCRIPTION,
  authors: [{ name: "Arogyadhama, S-VYASA Deemed University" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
