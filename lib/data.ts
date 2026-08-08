export const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Laravel",
  "Filament",
  "Tailwind CSS",
  "Python",
  "PostgreSQL",
  "REST APIs",
  "API Integrations",
  "GraphQL",
  "Fabric.js",
  "Konva.js",
  "AWS",
  "Docker",
  "PM2",
  "Passenger",
  "WordPress",
  "Sanity",
  "Prismic",
  "Webhooks",
  "CI/CD",
  "Firebase",
] as const;

export type HomeServiceCard = {
  title: string;
  description: string;
  /** Optional deep link (e.g. Hosting & Infrastructure page). */
  href?: string;
  /** Glyph from ServiceIcon; defaults to card order index if omitted. */
  iconIndex?: number;
};

/**
 * Home services preview only — few entry doors, not the full menu.
 * Full narrative list: /services. Plan catalog: /services/all.
 */
export const servicesDetailed: HomeServiceCard[] = [
  {
    title: "Website Builds",
    description:
      "Business and marketing sites that make what you do clear, build trust quickly, and give visitors an easy next step.",
    href: "/services#svc-websites",
    iconIndex: 0,
  },
  {
    title: "Custom Apps & Tools",
    description:
      "Customer portals, internal dashboards, integrations, and industry platforms (CPBs: prebuilt back end, semi-custom front) when off-the-shelf tools force awkward workarounds.",
    href: "/services#svc-custom-apps",
    iconIndex: 1,
  },
  {
    title: "Hosting & Website Care",
    description:
      "Keep the live site online and healthy: managed hosting, monitoring, maintenance, and a client portal under one relationship.",
    href: "/services/hosting",
    iconIndex: 4,
  },
  {
    title: "SEO Care",
    description:
      "Technical and on-page search readiness after launch, with ongoing care when you want steady attention. Rankings are not guaranteed.",
    href: "/services/hosting#hosting-seo",
    iconIndex: 6,
  },
];

/** Full services page: product map (build vs after launch), not every SKU. Catalog: /services/all. */
export type ServicesPageOffer = {
  id: string;
  iconIndex: number;
  title: string;
  description: string;
  learnMoreHref?: string;
  learnMoreLabel?: string;
};

export type ServicesPageGroup = {
  id: string;
  label: string;
  heading: string;
  lede: string;
  items: ServicesPageOffer[];
};

export const servicesPageGroups: ServicesPageGroup[] = [
  {
    id: "build",
    label: "Build",
    heading: "Sites, apps, and brand",
    lede:
      "Scoped project work to launch something new or replace tools that no longer fit. Compare plans and packages anytime in the full catalog.",
    items: [
      {
        id: "svc-websites",
        iconIndex: 0,
        title: "Website Builds",
        description:
          "Business and marketing sites with a clear message, a strong first impression, and an easy path for visitors to get in touch or take the next step.",
      },
      {
        id: "svc-custom-apps",
        iconIndex: 1,
        title: "Custom Apps & Tools",
        description:
          "Portals, internal dashboards, and integrations when off-the-shelf software forces awkward workarounds. Includes industry Custom Platform Builds (CPBs): prebuilt back end, semi-custom front for salons and barbers, restaurants, e-commerce, and informational sites.",
        learnMoreHref: "/services/all#cpb",
        learnMoreLabel: "CPB lines in the catalog",
      },
      {
        id: "svc-brand",
        iconIndex: 8,
        title: "Web Copy & Graphic Design",
        description:
          "Messaging and visual identity written and designed with the site so brand and pages feel like one company, not a separate layer bolted on later.",
      },
    ],
  },
  {
    id: "care",
    label: "After launch",
    heading: "Hosting, care, and search readiness",
    lede:
      "Keep the live site online, maintained, and easier for search engines to understand. Deep detail on the Hosting page; tiers and starting prices in the full catalog.",
    items: [
      {
        id: "svc-hosting",
        iconIndex: 4,
        title: "Hosting & Website Care",
        description:
          "Managed hosting, backups, monitoring, and ongoing care so day-to-day operations stay with us, with a client portal for status, reports, and requests.",
        learnMoreHref: "/services/hosting",
        learnMoreLabel: "Hosting & infrastructure story",
      },
      {
        id: "svc-seo",
        iconIndex: 6,
        title: "SEO Care",
        description:
          "Technical and on-page search readiness, from foundation setup through ongoing monthly care. Rankings, traffic, and leads are not guaranteed.",
        learnMoreHref: "/services/hosting#hosting-seo",
        learnMoreLabel: "SEO Care overview",
      },
    ],
  },
];

/** @deprecated Use servicesPageGroups — flat list kept only if anything still imports it. */
export const servicesPageOffers = servicesPageGroups.flatMap((g) => g.items);

export const processPhases = [
  {
    phase: "01",
    title: "Discovery",
    body: "Goals, constraints, and who does what, mapped into a concrete plan and architecture before build hours stack up.",
  },
  {
    phase: "02",
    title: "Build",
    body: "Front-end, back-end, data, and integrations in tight loops with visible progress, not a black box until the end.",
  },
  {
    phase: "03",
    title: "Test & Launch",
    body: "Staging review, QA, deployment, and go-live checks so ownership is clear the day it ships.",
  },
  {
    phase: "04",
    title: "Improve",
    body: "Measured iterations from real usage: performance, reliability, and the next slice of value, without surprise rewrites.",
  },
] as const;

/** Work page closing section — principles along the delivery through-line. */
export const throughLinePrinciples = [
  {
    n: "01",
    title: "Shaped Around Real Work",
    body: "Software designed around how the work actually runs, not around a generic template.",
    micro: "Fit before features",
  },
  {
    n: "02",
    title: "Clear Ownership",
    body: "Defined roles, responsibility, and accountability keep decisions moving.",
    micro: "Less ambiguity",
  },
  {
    n: "03",
    title: "Fewer Handoffs",
    body: "Connected systems reduce friction, rework, and the fragile gaps where work gets lost.",
    micro: "The through-line",
  },
  {
    n: "04",
    title: "Launch With Confidence",
    body: "Built, tested, and prepared for real use, with fewer surprises after release.",
    micro: "Ready for reality",
  },
  {
    n: "05",
    title: "Improve After Launch",
    body: "Measure, learn, and refine the system as the business and its needs evolve.",
    micro: "Built to keep growing",
  },
] as const;

export const workCases = [
  {
    n: "01",
    title: "AI Workflow Assistant Platform",
    description:
      "Notes, tasks, conversations, and decisions often become scattered across disconnected tools. This concept brings them into one intelligent workspace, making important context easier to find, decisions easier to track, and work easier to move forward.",
    image: "/work-previews/assistant.svg",
    alt: "Concept mockup: assistant-style workspace interface, not a client deliverable",
    useObject: false,
  },
  {
    n: "02",
    title: "Custom Campaign Operations System",
    description:
      "Outreach campaigns become difficult to manage when contacts, assignments, and follow-ups live in separate spreadsheets and message threads. This concept creates a shared operational view with clear ownership, current status, and the next action required.",
    image: "/work-previews/campaign.svg",
    alt: "Concept mockup: campaign operations style UI, not a client deliverable",
    useObject: false,
  },
  {
    n: "03",
    title: "Custom Commerce & Experience Platform",
    description:
      "Standard storefronts are not always built for complex products, custom options, add-ons, fulfillment rules, or specialized customer journeys. This concept demonstrates a tailored commerce experience with clearer choices, smarter logic, and a checkout flow designed around the actual business.",
    image: "/work-previews/commerce.svg",
    alt: "Concept mockup: physical product configuration with add-ons and shipping options, not a client deliverable",
    useObject: false,
  },
  {
    n: "04",
    title: "Professional Services Website",
    description:
      "A strong service can lose momentum when the website does not clearly communicate its value. This concept organizes services, credibility, and next steps into a focused experience that helps prospective clients understand what you do and decide if you are a fit before making contact.",
    image: "/work-previews/site.svg",
    alt: "Concept mockup: professional services marketing site style, not a client deliverable",
    useObject: false,
  },
  {
    n: "05",
    title: "System Health Monitoring & Diagnostics Platform",
    description:
      "Managing multiple websites, services, or technical environments without a shared health view makes problems easier to miss. This concept brings checks, alerts, and system status into one dashboard so teams can identify issues earlier and respond with greater clarity.",
    image: "/work-previews/monitor.svg",
    alt: "Concept mockup: monitoring dashboard style UI, not a client deliverable",
    useObject: false,
  },
  {
    n: "06",
    title: "Custom Restaurant POS & Kitchen Routing System",
    description:
      "During busy service periods, communication between the dining room and kitchen can quickly break down. This concept connects table-side ordering, kitchen routing, order status, and lightweight reporting in one streamlined operational system.",
    image: "/work-previews/pos.svg",
    alt: "Concept mockup: restaurant POS and kitchen display style UI, not a client deliverable",
    useObject: false,
  },
] as const;
