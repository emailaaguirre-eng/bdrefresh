export const siteName = "B&D Servicing LLC";
export const siteTagline = "Design. Build. Launch. Improve.";
export const defaultDescription =
  "Full-stack development for real operations: custom web applications, internal tools, automation, and API integrations—with clear fit, handoffs, and software you can run.";

export function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof env === "string" && env.length > 0) {
    return env.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}
