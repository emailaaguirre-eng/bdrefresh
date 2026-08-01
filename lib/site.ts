export const siteName = "B&D Servicing LLC";
export const siteTagline = "Design. Build. Launch. Improve.";

/** CoDre-X product / studio site (external). */
export const codreXUrl = "https://www.codre-x.com";

/** Approved raster logo (PNG, transparent). File: `public/logo-main.png`. */
export const brandLogoSrc = "/logo-main.png";
export const defaultDescription =
  "Full-stack development for real operations: custom web applications, internal tools, automation, and API integrations, with clear fit, handoffs, and software you can run.";

/** Canonical contact block for Privacy, Cookie, Accessibility, and consent UI. */
export const siteContact = {
  legalName: "B&D Servicing LLC",
  region: "Arizona, United States",
  email: "info@banddservicing.com",
} as const;

export function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof env === "string" && env.length > 0) {
    return env.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}
