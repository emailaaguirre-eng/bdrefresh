/** Customer-facing Hosting & Infrastructure page copy (aligned with BDCC catalog). */

export const portalFeatures = [
  {
    id: "status",
    title: "View website status and service updates",
    detail:
      "See a clear snapshot of your site and recent service notes so you know what is happening without digging through email threads.",
  },
  {
    id: "completed-work",
    title: "Review completed work",
    detail:
      "Look back at maintenance and care work that has already been done, with a simple record you can reference anytime.",
  },
  {
    id: "reports",
    title: "Access reports and documents",
    detail:
      "Open reports and related documents in one place when you need a summary of SEO, care, or other ongoing service work.",
  },
  {
    id: "support",
    title: "Submit support requests",
    detail:
      "Send a request through the portal when something needs attention, instead of hoping a message gets lost in someone’s inbox.",
  },
  {
    id: "quotes",
    title: "Review and approve quotes",
    detail:
      "When additional work is proposed, review the details in the portal and approve or decline from there.",
  },
  {
    id: "change-orders",
    title: "Track change orders",
    detail:
      "Follow change orders from sent to approved so scope and next steps stay visible to your team.",
  },
  {
    id: "monitoring",
    title: "View monitoring information",
    detail:
      "Check monitoring signals included with your plan, such as availability or certificate status, without waiting for a status email.",
  },
  {
    id: "informed",
    title: "Stay informed about hosting, maintenance, and SEO work",
    detail:
      "Keep hosting, care, and SEO activity in one shared view so you always know what is being watched and what was recently handled.",
  },
] as const;

export const hostingIncluded = [
  "Managed website hosting",
  "SSL security certificate",
  "Daily automated backups",
  "30-day backup history",
  "Restore assistance",
  "Performance optimization when appropriate",
  "Hosting platform maintenance",
  "Website availability monitoring",
  "Server resource monitoring",
  "Staging environment when supported",
  "Domain and DNS coordination",
  "Traffic and resource reviews",
  "Support during normal business hours",
] as const;

export const hostingLimits = [
  { label: "Production site", value: "1" },
  { label: "Staging site", value: "1 when supported" },
  { label: "Storage", value: "25 GB" },
  { label: "Traffic", value: "About 50,000 visits / month" },
  { label: "Backups", value: "Daily, 30-day retention" },
  { label: "Restores", value: "2 included per year" },
  { label: "Support", value: "Business hours" },
] as const;

/** Concise benefit themes (not one card per SKU). */
export const commonImpactServices = [
  {
    title: "Keeping the website online",
    description:
      "Managed hosting, SSL, and availability monitoring help keep your website accessible when customers need it. If an issue occurs, our team can investigate during normal business hours.",
  },
  {
    title: "Protect the website",
    description:
      "Daily backups, platform maintenance, and ongoing website care help reduce the risk of lost work, outdated software, and preventable problems.",
  },
  {
    title: "Help people find the website",
    description:
      "SEO Care supports the technical and on-page foundation of your website so search engines can better understand your business. Rankings, traffic, and leads are not guaranteed.",
  },
] as const;

/**
 * Monitoring areas supported by hosting and/or Website Monitoring catalog features.
 * Human review and support remain business-hours unless another service level is included.
 */
export const monitoringAreas = [
  "Website availability",
  "SSL certificate status",
  "Domain expiration",
  "Hosting resource usage",
  "DNS health",
  "Backup status",
  "Performance indicators",
  "Email or domain health when included in the selected service",
] as const;

export const websiteCarePoints = [
  "Approved updates and routine maintenance",
  "Minor fixes within the care plan",
  "Documented work and monthly proof of progress",
  "Client portal access for status, reports, and requests",
] as const;

export const seoCareTiers = [
  {
    name: "SEO Setup",
    price: "$750 one-time",
    description:
      "Baseline metadata, sitemap and indexing setup, Search Console connection, and a clean technical starting point.",
  },
  {
    name: "Essential SEO Care",
    price: "From $199/mo",
    description:
      "Ongoing metadata, headings, image alt text, sitemap and robots review, indexability checks, and a monthly SEO health summary.",
  },
  {
    name: "Professional SEO Care",
    price: "From $399/mo",
    description:
      "Everything in Essential, plus focused improvements to one to three priority pages, internal linking, schema review, and a monthly action summary.",
  },
  {
    name: "Growth SEO",
    price: "From $699/mo",
    description:
      "Broader work across three to five priority pages, topic and conversion guidance, and a quarterly strategy review.",
  },
  {
    name: "Local SEO Care",
    price: "From $249/mo",
    description:
      "Local search readiness, business information consistency, LocalBusiness schema review, and monthly local recommendations. Available standalone or as an add-on.",
  },
] as const;

export const aLaCarteServices = [
  {
    name: "Managed Hosting",
    price: "From $149/mo",
    note: "$99/mo as an add-on with another qualifying plan",
    description:
      "Managed hosting, SSL, backups, website availability monitoring, platform maintenance, and business-hours support.",
  },
  {
    name: "Website Monitoring",
    price: "From $149/mo",
    note: null,
    description:
      "Automated monitoring and documented alerts for supported website, domain, certificate, performance, and infrastructure signals.",
  },
  {
    name: "Website Care",
    price: "From $349/mo",
    note: null,
    description:
      "Routine maintenance, approved updates, minor fixes, reporting, and access to the client portal.",
  },
  {
    name: "SEO Care",
    price: "From $199/mo",
    note: "Tiers from Essential through Growth; Local available separately",
    description:
      "Ongoing technical, on-page, and local SEO support. Rankings, traffic, and leads are not guaranteed.",
  },
  {
    name: "Domain & SSL Management",
    price: "From $29/mo",
    note: null,
    description:
      "Renewal coordination, certificate checks, and domain-related support designed to reduce expiration surprises.",
  },
  {
    name: "Complete Care",
    price: "$1,595/mo",
    note: "Includes Managed Hosting; do not stack the separate hosting add-on",
    description:
      "An all-in service package combining premium website care, monitoring, Growth SEO, portal reporting, priority support, and managed hosting.",
  },
] as const;
