import type { MetadataRoute } from "next";

const SITE_URL = "https://www.svyasaarogyadhama.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/account", "/profile"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
