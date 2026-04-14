import type { MetadataRoute } from "next";
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
  "/insights/what-type-of-website-is-right-for-your-business",
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
