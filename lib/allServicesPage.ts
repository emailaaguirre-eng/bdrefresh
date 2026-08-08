/**
 * Full public catalog of B&D standalone services and plans.
 * Aligned with BDCC ServicePlanSeeder + CatalogV1 SEO Care rows + proposal packages.
 * Not a high-level overview: each plan is listed so clients can compare options.
 * Prices are starting points; final scope is confirmed at quote.
 *
 * This module is the source of truth for plan names, prices, and plan descriptions.
 * Hosting page plan tables derive from the arrays below (hostingSeoCareTiers / hostingALaCarteServices).
 */

export type CatalogItem = {
  id: string;
  name: string;
  price?: string;
  note?: string | null;
  description: string;
  href?: string;
  hrefLabel?: string;
};

export type CatalogGroup = {
  id: string;
  title: string;
  heading?: string;
  lede: string;
  items: CatalogItem[];
  footerNote?: string;
  footerHref?: string;
  footerLinkLabel?: string;
};

/** Project / scoped work (not always fixed monthly SKUs). */
export const projectServiceItems: CatalogItem[] = [
  {
    id: "website-builds",
    name: "Website Builds",
    description:
      "Public marketing and business sites: clear message, trust, and an easy next step for visitors.",
  },
  {
    id: "custom-apps",
    name: "Custom Web Applications",
    description:
      "Portals and apps shaped around your roles and workflows when off-the-shelf tools force workarounds.",
  },
  {
    id: "internal-tools",
    name: "Internal Tools & Dashboards",
    description:
      "Private ops tools: approvals, reporting, and day-to-day work outside scattered spreadsheets and email.",
  },
  {
    id: "automation",
    name: "Automation & API Integrations",
    description:
      "Connect systems you already use so records stay in sync without copy-paste handoffs.",
  },
  {
    id: "web-copy",
    name: "Web Copy",
    description:
      "Page messaging written with the site: who you help, what you offer, and what to do next.",
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    description:
      "Logos, brand assets, and visuals that match the website, not a separate look.",
  },
  {
    id: "technical-seo-audit",
    name: "Technical SEO Audit",
    price: "From $950 one-time",
    note: "Search rankings and traffic are not guaranteed.",
    description:
      "One-time crawl and technical review with prioritized recommendations. Not an ongoing SEO Care plan.",
  },
];

/** Hosting plans (standalone and add-on). */
export const hostingPlanItems: CatalogItem[] = [
  {
    id: "managed-website-hosting",
    name: "B&D Managed Hosting",
    price: "From $149/mo",
    description:
      "Standalone Managed Hosting at the full monthly rate for one production site under the standard limits above.",
    href: "/services/hosting#hosting-managed",
    hrefLabel: "Managed Hosting details",
  },
  {
    id: "managed-website-hosting-addon",
    name: "B&D Managed Hosting (plan add-on)",
    price: "From $99/mo",
    description:
      "Same hosting scope at the add-on rate when you already have another qualifying B&D plan. Do not stack with Complete Care (hosting is already included).",
    href: "/services/hosting#hosting-managed",
    hrefLabel: "Managed Hosting details",
  },
];

/** Website Care plan tiers. */
export const websiteCarePlanItems: CatalogItem[] = [
  {
    id: "website-care-basic",
    name: "Website Care Basic",
    description:
      "Entry tier: uptime and SSL monitoring, domain signals when configured, backup review, portal status, and standard business-hours support.",
    href: "/services/hosting#hosting-care",
    hrefLabel: "Website Care overview",
  },
  {
    id: "website-care-plus",
    name: "Website Care Plus",
    price: "From $349/mo",
    description:
      "Adds deeper page, form, and redirect monitoring; approved updates and maintenance in plan scope; fuller monthly reporting; analytics readiness where entitled.",
    href: "/services/hosting#hosting-care",
    hrefLabel: "Website Care overview",
  },
  {
    id: "website-care-premium",
    name: "Website Care Premium",
    description:
      "Highest tier: SEO health signals in care monitoring, priority support, richer portal reporting, and SEO-oriented summaries where included.",
    href: "/services/hosting#hosting-care",
    hrefLabel: "Website Care overview",
  },
];

/** Standalone monitoring and visibility plans. */
export const monitoringPlanItems: CatalogItem[] = [
  {
    id: "website-monitoring",
    name: "Website Monitoring",
    price: "From $149/mo",
    description:
      "Live-site signals: availability, SSL, DNS, headers, domain expiration, key pages, redirects, forms, plus portal status views.",
    href: "/services/hosting#hosting-monitoring",
    hrefLabel: "Monitoring overview",
  },
  {
    id: "email-domain-health",
    name: "Email / Domain Health",
    description:
      "Domain and email readiness: expiration, SSL, DNS, deliverability-related settings, and portal email/SSL widgets.",
  },
  {
    id: "seo-health-monitoring",
    name: "SEO Health Monitoring",
    note: "Search rankings and traffic are not guaranteed.",
    description:
      "Scheduled SEO health scans and portal SEO summaries without a full SEO Care work cycle.",
  },
  {
    id: "domain-ssl-management",
    name: "Domain & SSL Management",
    price: "From $29/mo",
    description:
      "Domain renewals and certificate coordination so expirations are less likely to sneak up on you.",
  },
  {
    id: "website-analytics-readiness",
    name: "Website Analytics Readiness",
    description:
      "Visitor tracking where configured, portal analytics summaries, and common search/analytics connectors when the account is ready.",
  },
];

/** SEO Care plans (standalone tiers). Rankings disclaimer is on the group lede, not repeated on every row. */
export const seoCarePlanItems: CatalogItem[] = [
  {
    id: "seo-foundation-setup",
    name: "SEO Foundation Setup",
    price: "From $750 one-time",
    description:
      "One-time base: titles and descriptions where needed, sitemap and indexing setup, Search Console connection, clean technical start before monthly care.",
    href: "/services/hosting#hosting-seo",
    hrefLabel: "SEO Care overview",
  },
  {
    id: "basic-seo-care",
    name: "Basic SEO Care",
    price: "From $199/mo",
    description:
      "Monthly readiness: titles, descriptions, headings, image text, sitemap/index checks, and a monthly SEO health summary of Care-scope work.",
    href: "/services/hosting#hosting-seo",
    hrefLabel: "SEO Care overview",
  },
  {
    id: "seo-care-plus",
    name: "SEO Care Plus",
    price: "From $399/mo",
    description:
      "Active monthly improvement: health checks, structure updates, selected priority pages, internal linking, structured data, and action summaries.",
    href: "/services/hosting#hosting-seo",
    hrefLabel: "SEO Care overview",
  },
  {
    id: "seo-growth",
    name: "SEO Growth",
    price: "From $699/mo",
    description:
      "Broader monthly program: more priority pages, topic and content guidance, conversion notes, quarterly strategy review with monthly summaries.",
    href: "/services/hosting#hosting-seo",
    hrefLabel: "SEO Care overview",
  },
  {
    id: "local-seo-care",
    name: "Local SEO Care",
    price: "From $249/mo",
    note: "Available standalone or as an add-on to other SEO Care plans.",
    description:
      "Local readiness: NAP consistency, listing readiness notes, local structured data, and monthly local recommendations.",
    href: "/services/hosting#hosting-seo",
    hrefLabel: "SEO Care overview",
  },
];

/** Support retainers (standalone). */
export const supportPlanItems: CatalogItem[] = [
  {
    id: "technical-support-retainer",
    name: "Technical Support Retainer",
    description:
      "Dedicated priority technical support beyond standard business-hours help on other plans.",
  },
  {
    id: "workspace-support",
    name: "Workspace Support",
    description:
      "Portal request tracking and standard help-desk style coordination under a support agreement.",
  },
];

/** Bundled packages that combine multiple plans. */
export const packageItems: CatalogItem[] = [
  {
    id: "complete-care-package",
    name: "Complete Care Package",
    price: "From $1,595/mo",
    note: "Managed Hosting is included. Do not also attach the Managed Hosting add-on.",
    description:
      "Website Care Premium, website and email/domain monitoring, Growth-level SEO Care, portal widgets and reports, priority support, and Managed Hosting under one relationship.",
    href: "/services/hosting#hosting-plans",
    hrefLabel: "Package context",
  },
  {
    id: "seo-care-starter-package",
    name: "SEO Care Starter Package",
    note: "Search rankings and traffic are not guaranteed.",
    description:
      "SEO Foundation Setup plus the first month of Basic SEO Care in one package.",
  },
  {
    id: "application-support-package",
    name: "Application Support Package",
    description:
      "Hosting, website monitoring, technical support, and integration support under one relationship. Custom integration work is scoped before it is billed.",
  },
];

/** Custom Platform Builds (CPBs): industry-specific prebuilt backends with semi-custom fronts. */
export const customPlatformBuildItems: CatalogItem[] = [
  {
    id: "cpb-salon-barber",
    name: "Salon & Barbershop CPB",
    description:
      "Industry back end for chair-based shops (booking, scheduling, staff tools, and optional POS, CRM, and reporting), with a semi-custom front that presents your shop and brand. Not a generic website theme bolted onto someone else’s stack.",
  },
  {
    id: "cpb-restaurant",
    name: "Restaurant CPB",
    description:
      "Industry back end for restaurants and similar food businesses (reservations, ordering, kitchen flows, and POS-oriented ops when needed), with a semi-custom front for the house. Front of house, kitchen, and service staff share one prebuilt system; the guest-facing side is tailored to you.",
  },
  {
    id: "cpb-ecommerce",
    name: "E-commerce CPB",
    description:
      "Industry back end for catalog, pricing, checkout, fulfillment handoff, and day-to-day admin, with a semi-custom storefront and brand experience. For sellers who need more control than a stock template, without rebuilding commerce software from zero.",
  },
  {
    id: "cpb-informational",
    name: "Informational Site CPB",
    description:
      "Industry back end for content structure, trust, and conversion paths suited to information-first businesses, with a semi-custom front for messaging and brand. No full e-commerce or heavy ops stack required on day one; care, monitoring, or modules can come later.",
  },
];

export const catalogGroups: CatalogGroup[] = [
  {
    id: "projects",
    title: "Project work",
    heading: "Websites, apps, and design",
    lede:
      "Scoped project work. Pricing depends on goals, complexity, and timeline. We recommend a clear starting point so you are not buying more than you need.",
    items: projectServiceItems,
    footerNote: "We can discuss the scope of your project and provide a clear quote.",
    footerHref: "/start-project",
    footerLinkLabel: "Contact us",
  },
  {
    id: "cpb",
    title: "Custom Platform Builds",
    heading: "Custom Platform Builds (CPBs)",
    lede:
      "A CPB is industry-specific: a prebuilt back end for how that business type runs, and a semi-custom front end tailored to your brand, content, and customer experience. You get proven workflows (public site when needed, staff tools, customer flows, and the modules that matter) without a full custom-software project or a one-size template. We are developing this line across salons and barbers, restaurants, e-commerce, and informational sites.",
    items: customPlatformBuildItems,
    footerNote: "Tell us your industry and how work happens today. We will match a CPB line, outline front-end scope, and provide a clear quote.",
    footerHref: "/start-project",
    footerLinkLabel: "Contact us",
  },
  {
    id: "hosting",
    title: "Hosting plans",
    heading: "Managed Hosting plans",
    lede:
      "We host and look after your live website under one support relationship: managed environment, security certificate, daily backups and restore help, caching when appropriate, platform maintenance, uptime and resource monitoring, DNS coordination, traffic review, and staging when your site supports it. Standard standalone limits: 1 production site, 1 staging when supported, about 25 GB storage, about 50,000 visits/month, daily backups with 30-day retention, 2 restores/year, and business-hours support.",
    items: hostingPlanItems,
  },
  {
    id: "website-care",
    title: "Website Care plans",
    heading: "Website Care plans",
    lede:
      "Ongoing care for the live site after launch: approved updates and maintenance in plan scope, monitoring matched to the tier, monthly service reporting, and a client portal for status, reports, and requests. Support is business-hours unless the tier includes priority help. Choose the tier that matches how much hands-on care you want.",
    items: websiteCarePlanItems,
  },
  {
    id: "monitoring",
    title: "Monitoring & readiness",
    heading: "Monitoring and readiness plans",
    lede:
      "Standalone plans when you want eyes on availability, domain, certificates, SEO health signals, or analytics readiness without buying a full Website Care package. Each line watches a different signal set; human review remains business-hours unless another plan says otherwise.",
    items: monitoringPlanItems,
  },
  {
    id: "seo-care",
    title: "SEO Care plans",
    heading: "SEO Care plans",
    lede:
      "Sold on their own. Work is technical and on-page within plan scope. Monthly plans include summaries of Care-scope work found and handled. Rankings, traffic, and leads are not guaranteed.",
    items: seoCarePlanItems,
  },
  {
    id: "support",
    title: "Support plans",
    heading: "Support plans",
    lede:
      "Standalone support when you need help beyond what hosting or care already includes. Choose priority technical coverage or standard portal-based request handling.",
    items: supportPlanItems,
  },
  {
    id: "packages",
    title: "Packages",
    heading: "Bundled packages",
    lede:
      "Packages put multiple services under one clear option when you want fewer separate subscriptions and one delivery relationship. Contents below are what each package is for; do not stack items the package already includes.",
    items: packageItems,
  },
];

function requireCatalogItem(items: readonly CatalogItem[], id: string): CatalogItem {
  const item = items.find((row) => row.id === id);
  if (!item) {
    throw new Error(`Catalog item not found: ${id}`);
  }
  return item;
}

/** Hosting page SEO Care table: name / price / description from catalog only. */
export const hostingSeoCareTiers = seoCarePlanItems.map((item) => ({
  name: item.name,
  price: item.price ?? "",
  description: item.description,
}));

export type HostingALaCarteService = {
  name: string;
  price: string;
  note: string | null;
  description: string;
};

/**
 * Hosting page “a la carte” summary rows.
 * Selected representative SKUs; all name/price/note/description come from the catalog arrays above.
 */
export const hostingALaCarteServices: HostingALaCarteService[] = (() => {
  const managed = requireCatalogItem(hostingPlanItems, "managed-website-hosting");
  const managedAddon = requireCatalogItem(hostingPlanItems, "managed-website-hosting-addon");
  const monitoring = requireCatalogItem(monitoringPlanItems, "website-monitoring");
  const care = requireCatalogItem(websiteCarePlanItems, "website-care-plus");
  const seo = requireCatalogItem(seoCarePlanItems, "basic-seo-care");
  const domainSsl = requireCatalogItem(monitoringPlanItems, "domain-ssl-management");
  const complete = requireCatalogItem(packageItems, "complete-care-package");

  return [
    {
      name: managed.name,
      price: managed.price ?? "",
      note: managedAddon.price
        ? `${managedAddon.price} as a plan add-on with another qualifying B&D plan`
        : managedAddon.note ?? null,
      description: managed.description,
    },
    {
      name: monitoring.name,
      price: monitoring.price ?? "",
      note: monitoring.note ?? null,
      description: monitoring.description,
    },
    {
      name: care.name,
      price: care.price ?? "",
      note: care.note ?? null,
      description: care.description,
    },
    {
      name: "SEO Care",
      price: seo.price ?? "",
      note: "Tiers from Basic through Growth; Local SEO Care available separately. Rankings not guaranteed.",
      description: seo.description,
    },
    {
      name: domainSsl.name,
      price: domainSsl.price ?? "",
      note: domainSsl.note ?? null,
      description: domainSsl.description,
    },
    {
      name: complete.name,
      price: complete.price ?? "",
      note: complete.note ?? null,
      description: complete.description,
    },
  ];
})();

