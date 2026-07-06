import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

// Voice bot (ElevenLabs "Prashanthi") temporarily HIDDEN — the ElevenLabs
// account is out of Conversational-AI quota, so it errored for visitors.
// To restore: re-add `import Script from "next/script";` above, uncomment the
// const below, and restore the two elements in <body> (see the comment there).
// const CONVAI_AGENT_ID = "agent_2001kwf3rd9wewcsmcbt5ysm06az"; // "Prashanthi" voice agent

const SITE_URL = "https://www.svyasaarogyadhama.com";
const TITLE =
  "Arogyadhama — Integrative Medicine Hospital | S-VYASA, Bengaluru";
const DESCRIPTION =
  "India's premier integrative medicine hospital combining Yoga, Ayurveda, Naturopathy, Acupuncture, Physiotherapy & modern science for holistic healing since 1984. 350-bed facility at Prashanti Kutiram, Bengaluru.";
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
  icons: { icon: "/favicon.png" },
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
        <Providers>{children}</Providers>
        {/* Voice bot (ElevenLabs "Prashanthi") temporarily hidden here — the
            ElevenLabs account ran out of Conversational-AI quota, so it errored
            for visitors. To restore, re-add the elevenlabs-convai element and
            the convai-widget Script tag (plus the CONVAI_AGENT_ID const and the
            next/script import), per git history commit 26221ad. */}
      </body>
    </html>
  );
}
