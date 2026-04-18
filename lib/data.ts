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
    description:
      "When your rules, roles, and data do not fit a template: customer-facing apps and portals scoped to how people actually work.",
  },
  {
    title: "Internal Tools",
    description:
      "For teams stuck in spreadsheets and email chains: dashboards, approvals, and reporting with permissions that match reality.",
  },
  {
    title: "Automation & API Integrations",
    description:
      "When systems need to stay in sync without copy-paste: APIs, webhooks, imports, deduplication, and guarded jobs between tools.",
  },
  {
    title: "Launch & Improve",
    description:
      "After go-live: deployment hygiene, monitoring, performance work, and measured iterations as usage grows.",
  },
  {
    title: "Web Copy",
    description:
      "Messaging that states who it is for, what changes, and what to do next, written alongside the build, not bolted on after.",
  },
  {
    title: "Search Engine Optimization",
    description:
      "When discovery matters: structure and technical hygiene so search engines and humans both understand the offer.",
  },
  {
    title: "Graphic Design",
    description:
      "Identity and marketing visuals that read as the same company as the product, not a separate aesthetic layer.",
  },
] as const;

/** Full services page (legacy services.html): anchors + extended Value / Use case copy (not the home preview grid). */
export const servicesPageOffers = [
  {
    id: "svc-custom-apps",
    iconIndex: 0,
    title: "Custom Applications",
    description:
      "For teams where SaaS or templates force awkward workarounds: customer-facing apps and portals shaped around your roles, data, and rules. Typical scope covers auth, core flows, admin surfaces, and a staging path to production.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Reduces rework from wrong assumptions early. You get explicit tradeoffs on complexity, a sensible permission model, and handoff material your staff can use without re-interpreting the build.",
  },
  {
    id: "svc-internal-tools",
    iconIndex: 1,
    title: "Internal Tools",
    description:
      "When decisions live in inboxes and one-off sheets: dashboards, approvals, and reporting that match how work is approved and recorded. Done means people can run daily operations from the tool, not around it.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Cuts duplicate entry and “which version is true?” moments. Audit-friendly patterns where they matter; plain workflows where they do not.",
  },
  {
    id: "svc-automation",
    iconIndex: 2,
    title: "Automation & API Integrations",
    description:
      "When two or more systems need to stay aligned: APIs, webhooks, scheduled sync, imports, deduplication, and guardrails so partial failures do not silently corrupt data.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Surfaces integration edges early (auth, rate limits, id mapping). You get operational visibility: what runs, when, and how to recover if a vendor changes behavior.",
  },
  {
    id: "svc-launch",
    iconIndex: 3,
    title: "Launch & Improve",
    description:
      "Deployment, monitoring, performance passes, and measured iterations after go-live, when the goal is stability under real traffic, not a one-time push and disappear.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Reduces launch-week guesswork: staging sign-off, rollback thinking, and a sane first slice of observability. Post-launch work stays tied to observed bottlenecks, not generic tuning.",
  },
  {
    id: "svc-web-copy",
    iconIndex: 4,
    title: "Web Copy",
    description:
      "Copy that states who it is for, what problem you solve, and what happens next, drafted in the same pass as structure and UI so the story matches the product.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Avoids the “beautiful site, vague offer” trap. Visitors self-select; your team spends less time re-explaining basics on first calls.",
  },
  {
    id: "svc-seo",
    iconIndex: 5,
    title: "Search Engine Optimization",
    description:
      "Technical structure, internal linking, and intent-aligned page work so humans and crawlers get a coherent picture, without promising rankings that nobody can guarantee.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Best when you have a real offer worth finding and are willing to align content with how people actually search. Treats SEO as implementation discipline, not keyword stuffing.",
  },
  {
    id: "svc-design",
    iconIndex: 6,
    title: "Graphic Design",
    description:
      "Logos, brand assets, and marketing visuals that sit credibly next to the product, useful when identity and interface need to feel like one organization.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Reduces visual drift between site, decks, and collateral. Clear file delivery and practical formats your vendors can reuse.",
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

export const workCases = [
  {
    n: "01",
    title: "AI Workflow Assistant Platform",
    description:
      "Scattered notes and tasks across tabs and threads. One workspace pulls context together: less re-finding, clearer decisions.",
    image: "/work-previews/assistant.svg",
    alt: "Illustrative mockup: assistant-style workspace interface, not a client deliverable",
    useObject: false,
  },
  {
    n: "02",
    title: "Custom Campaign Operations System",
    description:
      "Outreach stuck in ad hoc lists. Clear owner, status, and next step so batches do not slip.",
    image: "/work-previews/campaign.svg",
    alt: "Illustrative mockup: campaign operations style UI, not a client deliverable",
    useObject: false,
  },
  {
    n: "03",
    title: "Custom Commerce & Experience Platform",
    description:
      "Products and shipping rules generic carts handle poorly. Tailored checkout, clear choices, logic where you need it.",
    image: "/work-previews/commerce.svg",
    alt: "Illustrative mockup: physical product configuration with add-ons and shipping options, not a client deliverable",
    useObject: true,
  },
  {
    n: "04",
    title: "Professional Services Website",
    description:
      "Strong offer, vague site. Services, proof, and next steps structured so fit is clear before the call.",
    image: "/work-previews/site.svg",
    alt: "Illustrative mockup: professional services marketing site style, not a client deliverable",
    useObject: false,
  },
  {
    n: "05",
    title: "System Health Monitoring & Diagnostics Platform",
    description:
      "Many environments, no shared health view. One dashboard for checks and alerts. Issues surface sooner.",
    image: "/work-previews/monitor.svg",
    alt: "Illustrative mockup: monitoring dashboard style UI, not a client deliverable",
    useObject: false,
  },
  {
    n: "06",
    title: "Custom Restaurant POS & Kitchen Routing System",
    description:
      "Front and kitchen drift in the rush. Table-side orders, kitchen routing, lighter reporting.",
    image: "/work-previews/pos.svg",
    alt: "Illustrative mockup: restaurant POS and kitchen display style UI, not a client deliverable",
    useObject: false,
  },
] as const;
