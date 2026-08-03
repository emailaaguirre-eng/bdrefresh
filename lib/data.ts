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
};

export const servicesDetailed: HomeServiceCard[] = [
  {
    title: "Website Builds",
    description:
      "Business and marketing sites that make what you do clear, build trust quickly, and give visitors an easy next step.",
  },
  {
    title: "Custom Web Applications",
    description:
      "For teams where SaaS or templates force awkward workarounds: apps and portals shaped around your roles, data, and rules.",
  },
  {
    title: "Internal Tools & Dashboards",
    description:
      "For teams stuck in spreadsheets and email: dashboards, approvals, and reporting that match how your work actually gets done.",
  },
  {
    title: "Automation & API Integrations",
    description:
      "Need two or more systems talking to each other? We connect them so your records stay in sync and updates happen automatically.",
  },
  {
    title: "Managed Hosting",
    description:
      "We host and look after your live website with backups, monitoring, and business-hours support so day-to-day hosting stays with us.",
    href: "/services/hosting",
  },
  {
    title: "Website Care",
    description:
      "Ongoing care to keep your site healthy, with a client portal for updates, reports, change orders, and more.",
    href: "/services/hosting",
  },
  {
    title: "SEO",
    description:
      "We help your site show up in search engines, with ongoing SEO care when you want steady attention after the foundation is in place.",
    href: "/services/hosting",
  },
  {
    title: "Web Copy",
    description:
      "Clear messaging about who you help, what you do, and what to do next, written with the site instead of bolted on later.",
  },
  {
    title: "Graphic Design",
    description:
      "Logos, brand assets, and marketing visuals that feel like the same company as your website, not a separate look.",
  },
];

/** Full services page: anchors + extended Value / Use case copy (not the home preview grid). */
export const servicesPageOffers = [
  {
    id: "svc-websites",
    iconIndex: 0,
    title: "Website Builds",
    description:
      "Professional business and marketing sites built around a clear message, a strong first impression, and an easy path to get in touch or take the next step.",
  },
  {
    id: "svc-custom-apps",
    iconIndex: 1,
    title: "Custom Web Applications",
    description:
      "For teams where SaaS or templates force awkward workarounds: customer-facing apps and portals shaped around your roles, data, and rules.",
  },
  {
    id: "svc-internal-tools",
    iconIndex: 2,
    title: "Internal Tools & Dashboards",
    description:
      "For teams stuck in inboxes and spreadsheets: dashboards, approvals, and reporting that match how your work actually gets done, so people can run the day from one place.",
  },
  {
    id: "svc-automation",
    iconIndex: 3,
    title: "Automation & API Integrations",
    description:
      "Need two or more systems talking to each other? We connect them so your records stay in sync and updates happen automatically.",
  },
  {
    id: "svc-hosting",
    iconIndex: 4,
    title: "Managed Hosting",
    description:
      "We host and look after your live website: secure connection, regular backups, monitoring, and support during business hours so day-to-day hosting stays with us.",
    learnMoreHref: "/services/hosting",
    learnMoreLabel: "Hosting & Infrastructure",
  },
  {
    id: "svc-website-care",
    iconIndex: 5,
    title: "Website Care",
    description:
      "Ongoing managed website care to ensure your site is healthy. Includes a client portal so you can stay up to date on the site, review reports, handle change orders, and more.",
    learnMoreHref: "/services/hosting",
    learnMoreLabel: "Hosting & Infrastructure",
  },
  {
    id: "svc-seo",
    iconIndex: 6,
    title: "SEO",
    description:
      "We help your site show up in search engines. Ongoing SEO care is available when you want steady attention after the foundation is in place.",
    learnMoreHref: "/services/hosting",
    learnMoreLabel: "Hosting & Infrastructure",
  },
  {
    id: "svc-web-copy",
    iconIndex: 7,
    title: "Web Copy",
    description:
      "Clear messaging about who you help, what you do, and what to do next, written with the site instead of bolted on later.",
  },
  {
    id: "svc-design",
    iconIndex: 8,
    title: "Graphic Design",
    description:
      "Logos, brand assets, and marketing visuals that feel like the same company as your website, not a separate look.",
  },
] as const;

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
