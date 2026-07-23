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

export const servicesDetailed = [
  {
    title: "Website Builds",
    description:
      "Business sites, marketing sites, and web platforms built to earn trust quickly and support the offer clearly.",
  },
  {
    title: "Custom Web Applications",
    description:
      "When your rules, roles, and data do not fit a template: customer-facing apps and portals scoped to how people actually work.",
  },
  {
    title: "Internal Tools & Dashboards",
    description:
      "For teams stuck in spreadsheets and email chains: dashboards, approvals, and reporting with permissions that match reality.",
  },
  {
    title: "Automation & API Integrations",
    description:
      "When systems need to stay in sync without copy-paste: APIs, webhooks, imports, deduplication, and guarded jobs between tools.",
  },
  {
    title: "Managed Hosting",
    description:
      "A managed environment for production sites: SSL, backups, staging when supported, monitoring, and business-hours support.",
  },
  {
    title: "Website Care",
    description:
      "Ongoing maintenance and health checks so updates, uptime, and routine issues are handled before they become emergencies.",
  },
  {
    title: "SEO",
    description:
      "Technical structure, on-page hygiene, and ongoing SEO care so search engines and humans both understand the offer.",
  },
  {
    title: "Web Copy",
    description:
      "Messaging that states who it is for, what changes, and what to do next, written alongside the build, not bolted on after.",
  },
  {
    title: "Graphic Design",
    description:
      "Identity and marketing visuals that read as the same company as the product, not a separate aesthetic layer.",
  },
] as const;

/** Full services page: anchors + extended Value / Use case copy (not the home preview grid). */
export const servicesPageOffers = [
  {
    id: "svc-websites",
    iconIndex: 0,
    title: "Website Builds",
    description:
      "Professional business sites, marketing sites, and web platforms shaped around a clear offer, credible first impression, and a path to contact or convert. Typical scope covers structure, design implementation, content placement, and a clean handoff to hosting or care.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Best when the site needs to do a real job—explain the offer, build trust, and move the right people forward—not just look finished in a screenshot.",
  },
  {
    id: "svc-custom-apps",
    iconIndex: 1,
    title: "Custom Web Applications",
    description:
      "For teams where SaaS or templates force awkward workarounds: customer-facing apps and portals shaped around your roles, data, and rules. Typical scope covers auth, core flows, admin surfaces, and a staging path to production.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Reduces rework from wrong assumptions early. You get explicit tradeoffs on complexity, a sensible permission model, and handoff material your staff can use without re-interpreting the build.",
  },
  {
    id: "svc-internal-tools",
    iconIndex: 2,
    title: "Internal Tools & Dashboards",
    description:
      "When decisions live in inboxes and one-off sheets: dashboards, approvals, and reporting that match how work is approved and recorded. Done means people can run daily operations from the tool, not around it.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Cuts duplicate entry and “which version is true?” moments. Audit-friendly patterns where they matter; plain workflows where they do not.",
  },
  {
    id: "svc-automation",
    iconIndex: 3,
    title: "Automation & API Integrations",
    description:
      "When two or more systems need to stay aligned: APIs, webhooks, scheduled sync, imports, deduplication, and guardrails so partial failures do not silently corrupt data.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Surfaces integration edges early (auth, rate limits, id mapping). You get operational visibility: what runs, when, and how to recover if a vendor changes behavior.",
  },
  {
    id: "svc-hosting",
    iconIndex: 4,
    title: "Managed Hosting",
    description:
      "B&D managed hosting for production websites: managed environment, SSL, CDN/caching where appropriate, daily backups, restores, platform maintenance, uptime and resource monitoring, staging when supported, and DNS coordination.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Fits when you want the live site treated as an operating asset—backed up, monitored, and supported—rather than left on a set-and-forget plan.",
  },
  {
    id: "svc-website-care",
    iconIndex: 5,
    title: "Website Care",
    description:
      "Ongoing managed website care: health checks, maintenance routines, reporting, and support so small issues are caught early and the site stays ready for day-to-day use.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Best after launch when ownership matters: who watches uptime, who handles updates, and how problems get surfaced before customers do.",
  },
  {
    id: "svc-seo",
    iconIndex: 6,
    title: "SEO",
    description:
      "Technical structure, internal linking, and intent-aligned page work so humans and crawlers get a coherent picture, plus ongoing SEO care options when search readiness needs steady attention. Rankings are not guaranteed.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Best when you have a real offer worth finding and are willing to align content with how people actually search. Treats SEO as implementation discipline, not keyword stuffing.",
  },
  {
    id: "svc-web-copy",
    iconIndex: 7,
    title: "Web Copy",
    description:
      "Copy that states who it is for, what problem you solve, and what happens next, drafted in the same pass as structure and UI so the story matches the product.",
    insightLabel: "Fit & risk" as const,
    insight:
      "Avoids the “beautiful site, vague offer” trap. Visitors self-select; your team spends less time re-explaining basics on first calls.",
  },
  {
    id: "svc-design",
    iconIndex: 8,
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
      "A strong service can lose momentum when the website does not clearly communicate its value. This concept organizes services, credibility, and next steps into a focused experience that helps prospective clients understand the offer and determine fit before making contact.",
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
