import type { MetadataRoute } from "next";

const SITE_URL = "https://www.svyasaarogyadhama.com";

// Public routes (admin is intentionally excluded).
const ROUTES = [
  "",
  "/about",
  "/about/history",
  "/about/founders",
  "/therapies",
  "/therapies/yoga",
  "/therapies/ayurveda",
  "/therapies/naturopathy",
  "/therapies/acupuncture",
  "/therapies/physiotherapy",
  "/therapies/yogic-counselling",
  "/therapies/ozone",
  "/departments",
  "/departments/neurology",
  "/departments/oncology",
  "/departments/cardiology",
  "/departments/pulmonology",
  "/departments/psychiatry",
  "/departments/rheumatology",
  "/departments/spinal",
  "/departments/diabetes",
  "/departments/gastroenterology",
  "/departments/endocrinology",
  "/departments/positive-health",
  "/plan-your-stay",
  "/plan-your-stay/tariff",
  "/plan-your-stay/schedule",
  "/plan-your-stay/accommodation",
  "/plan-your-stay/what-to-bring",
  "/plan-your-stay/how-to-reach",
  "/plan-your-stay/faqs",
  "/knowledge-hub",
  "/patient-stories",
  "/contact",
  "/book-now",
  "/our-team",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
