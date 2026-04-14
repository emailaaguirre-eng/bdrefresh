export const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "REST APIs",
  "GraphQL",
  "AWS",
  "Docker",
  "WordPress",
  "Webhooks",
  "CI/CD",
  "Firebase",
] as const;

export const servicesDetailed = [
  {
    title: "Custom Applications",
    description: "Web apps and portals built around your workflow, not a one-size-fits-all template.",
  },
  {
    title: "Internal Tools",
    description: "Dashboards, admin panels, approvals, and reporting tools designed to save time.",
  },
  {
    title: "Automation & API Integrations",
    description: "Connect platforms using APIs, webhooks, data sync, imports, deduplication, and automated workflows.",
  },
  {
    title: "Launch & Improve",
    description: "Deployment support, performance tuning, monitoring, and iterative enhancements.",
  },
  {
    title: "Web Copy",
    description: "Clear, compelling copy that communicates your value and drives visitors to take action.",
  },
  {
    title: "Search Engine Optimization",
    description: "On-page SEO, keyword strategy, and technical optimization so your site ranks and gets found.",
  },
  {
    title: "Graphic Design",
    description: "Logos, brand assets, marketing materials, and visual design that matches your identity.",
  },
] as const;

/** Full services page (legacy services.html): anchors + extended Value / Use case copy — not the home preview grid. */
export const servicesPageOffers = [
  {
    id: "svc-custom-apps",
    iconIndex: 0,
    title: "Custom Applications",
    description:
      "Web apps and customer-facing portals built around your rules, roles, and data, not a one-size template.",
    insightLabel: "Value" as const,
    insight:
      "When off-the-shelf products force compromises, a focused custom build can reduce support burden and give you a real competitive edge in how you serve clients.",
  },
  {
    id: "svc-internal-tools",
    iconIndex: 1,
    title: "Internal Tools",
    description:
      "Dashboards, admin panels, approvals, and reporting so your team spends less time fighting software.",
    insightLabel: "Use case" as const,
    insight:
      "Replace scattered spreadsheets with a single source of truth: permissions, audit trails, and workflows that match how decisions actually get made.",
  },
  {
    id: "svc-automation",
    iconIndex: 2,
    title: "Automation & API Integrations",
    description:
      "Connect CRMs, billing, inventory, and custom systems with APIs, webhooks, sync jobs, and guardrails.",
    insightLabel: "Value" as const,
    insight:
      "Fewer copy-paste errors, faster turnaround, and reporting that reflects reality because the data pipeline is intentional, not manual.",
  },
  {
    id: "svc-launch",
    iconIndex: 3,
    title: "Launch & Improve",
    description: "Deployment, monitoring, performance work, and iterative enhancements after go-live.",
    insightLabel: "Use case" as const,
    insight:
      "Go live with confidence, then tighten bottlenecks as usage grows, without heroics or surprise rebuilds.",
  },
  {
    id: "svc-web-copy",
    iconIndex: 4,
    title: "Web Copy",
    description:
      "Clear messaging that explains what you do, who it’s for, and what happens next, aligned with the build and not bolted on later.",
    insightLabel: "Value" as const,
    insight:
      "Visitors understand the offer faster; sales conversations start warmer because the site did the first pass of qualification.",
  },
  {
    id: "svc-seo",
    iconIndex: 5,
    title: "Search Engine Optimization",
    description:
      "On-page structure, technical hygiene, and keyword intent so search engines and humans both get the picture.",
    insightLabel: "Use case" as const,
    insight:
      "You have a legitimate offer but invisible discovery. SEO is treated as part of the implementation, not an afterthought.",
  },
  {
    id: "svc-design",
    iconIndex: 6,
    title: "Graphic Design",
    description:
      "Logos, brand assets, and marketing visuals that match the product experience, not a separate aesthetic bolted on.",
    insightLabel: "Value" as const,
    insight:
      "Consistent identity across site, decks, and collateral so every touchpoint feels like the same company.",
  },
] as const;

export const processPhases = [
  {
    phase: "01",
    title: "Discovery",
    body: "Understand your goals, map requirements, and plan the architecture.",
  },
  {
    phase: "02",
    title: "Build",
    body: "Develop the front-end, back-end, database, and integrations.",
  },
  {
    phase: "03",
    title: "Test & Launch",
    body: "QA, staging review, deployment, and go-live with monitoring.",
  },
  {
    phase: "04",
    title: "Improve",
    body: "Iterate based on feedback, optimize performance, and scale.",
  },
] as const;

export const workCases = [
  {
    n: "01",
    title: "AI Workflow Assistant Platform",
    description:
      "A custom assistant interface designed to support organization, information handling, and day-to-day workflow productivity.",
    image: "/work-previews/assistant.svg",
    alt: "Illustrative mockup: assistant-style workspace interface, not a client deliverable",
    useObject: false,
  },
  {
    n: "02",
    title: "Custom Campaign Operations System",
    description:
      "A workflow-based outreach platform built to support more tailored communication, task flow, and campaign organization.",
    image: "/work-previews/campaign.svg",
    alt: "Illustrative mockup: campaign operations style UI, not a client deliverable",
    useObject: false,
  },
  {
    n: "03",
    title: "Custom Commerce & Experience Platform",
    description: "A tailored web platform built to deliver a more interactive and customized online experience.",
    image: "/work-previews/commerce.svg",
    alt: "Illustrative mockup: physical product configuration with add-ons and shipping options, not a client deliverable",
    useObject: true,
  },
  {
    n: "04",
    title: "Professional Services Website",
    description:
      "A polished business website designed to communicate complex services more clearly and strengthen digital credibility.",
    image: "/work-previews/site.svg",
    alt: "Illustrative mockup: professional services marketing site style, not a client deliverable",
    useObject: false,
  },
  {
    n: "05",
    title: "System Health Monitoring & Diagnostics Platform",
    description:
      "A proprietary system in development focused on monitoring website health, technical configuration, and operational signals across managed environments.",
    image: "/work-previews/monitor.svg",
    alt: "Illustrative mockup: monitoring dashboard style UI, not a client deliverable",
    useObject: false,
  },
  {
    n: "06",
    title: "Custom Restaurant POS & Kitchen Routing System",
    description:
      "A custom restaurant operations system developed in collaboration with ownership and staff to support a more efficient workflow from table-side ordering to kitchen communication and reporting.",
    image: "/work-previews/pos.svg",
    alt: "Illustrative mockup: restaurant POS and kitchen display style UI, not a client deliverable",
    useObject: false,
  },
] as const;
