import type { MetadataRoute } from "next";
import { getInsightSlugs } from "@/lib/insightsData";
import { getSiteUrl } from "@/lib/site";

const routes = [
  "",
  "/what-we-do",
  "/services",
  "/process",
  "/about",
  "/work",
  "/start-project",
  "/insights",
  ...getInsightSlugs().map((slug) => `/insights/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return routes.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
