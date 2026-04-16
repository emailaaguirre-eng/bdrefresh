export type InsightBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] };

export type InsightPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  author: { name: string; affiliation: string };
  blocks: InsightBlock[];
};

/** Prefer organization line so bylines show e.g. “B&D Servicing” only, not “Individual, B&D Servicing”. */
export function getAuthorByline(author: InsightPost["author"]): string {
  const affiliation = author.affiliation.trim();
  const name = author.name.trim();
  if (affiliation) return affiliation;
  return name;
}

const WEBSITE_TYPES_SLUG = "what-type-of-website-is-right-for-your-business";

export const insightPosts: InsightPost[] = [
  {
    slug: WEBSITE_TYPES_SLUG,
    title: "What Type of Website Is Right for Your Business?",
    description:
      "A practical guide to brochure sites, marketing sites, content hubs, e-commerce, and when you need a custom web application instead.",
    excerpt:
      "Not every business needs the same kind of site. Here is how to think about brochure, marketing, content, commerce, and custom platforms—so you build the right thing from the start.",
    publishedAt: "2026-03-15",
    author: { name: "", affiliation: "B&D Servicing" },
    blocks: [
      { kind: "p", text: "Not every business needs the same kind of website." },
      {
        kind: "p",
        text: "Some need a clean, professional online presence that builds trust and makes it easy for people to get in touch. Others need something far more tailored, like a custom experience, a client portal, a workflow tool, or a platform that supports a more advanced digital process.",
      },
      {
        kind: "p",
        text: "The problem is that many business owners start with the word website when what they really need might be a completely different kind of solution.",
      },
      {
        kind: "p",
        text: "Choosing the right type of website starts with understanding what the site is supposed to do.",
      },
      { kind: "h2", text: "1. The simple brochure-style website" },
      {
        kind: "p",
        text: "A brochure-style website is often the right fit when your main goal is to establish credibility, explain what you do, and give people a clear way to contact you.",
      },
      {
        kind: "p",
        text: "This type of site is usually best for businesses that need:",
      },
      {
        kind: "ul",
        items: [
          "a professional online presence",
          "service pages",
          "contact information",
          "basic SEO foundations",
          "a clean, modern design",
        ],
      },
      {
        kind: "p",
        text: "For many small businesses, this is more than enough. A well-built brochure site can still be polished, strategic, and highly effective without being overly complex.",
      },
      { kind: "h2", text: "2. The custom marketing site" },
      {
        kind: "p",
        text: "A custom marketing site goes beyond basic online presence. It is built to shape perception, communicate value more clearly, and guide visitors through a stronger brand experience.",
      },
      {
        kind: "p",
        text: "This is often the right fit when you need:",
      },
      {
        kind: "ul",
        items: [
          "a more premium presentation",
          "stronger messaging and positioning",
          "more intentional page flows",
          "custom visuals, animations, or interactions",
          "a site that supports higher-ticket services or more sophisticated offers",
        ],
      },
      {
        kind: "p",
        text: "For businesses trying to stand out in a crowded market, this kind of site can make a major difference. It is not just about looking better. It is about helping the business feel more credible, more established, and more aligned with the clients it wants to attract.",
      },
      { kind: "h2", text: "3. The content-driven site" },
      {
        kind: "p",
        text: "Some businesses rely on content to educate, rank in search, and build authority over time. In those cases, the website needs to support publishing in a clean and organized way.",
      },
      {
        kind: "p",
        text: "A content-driven site may be the right choice when you plan to publish:",
      },
      {
        kind: "ul",
        items: ["blog posts", "guides", "resources", "updates", "thought leadership content"],
      },
      {
        kind: "p",
        text: "This type of site should be built with structure in mind, so it is easy to expand over time without becoming messy or difficult to manage.",
      },
      { kind: "h2", text: "4. The e-commerce site" },
      {
        kind: "p",
        text: "If you are selling products online, your site has to do more than look good. It needs to support product presentation, navigation, trust, conversion, and a smooth purchase flow.",
      },
      {
        kind: "p",
        text: "An e-commerce site is the right fit when you need:",
      },
      {
        kind: "ul",
        items: [
          "product listings",
          "product detail pages",
          "cart and checkout flow",
          "shipping or fulfillment logic",
          "a stronger shopping experience",
        ],
      },
      {
        kind: "p",
        text: "Not all e-commerce builds are the same. Some stores can work well with a lighter setup, while others need a much more customized experience depending on the product, the brand, and the way the business operates.",
      },
      { kind: "h2", text: "5. The web application or custom platform" },
      {
        kind: "p",
        text: "Sometimes the right answer is not a standard website at all.",
      },
      {
        kind: "p",
        text: "If your business needs something interactive, process-based, or highly specific to how you work, you may actually need a web application or custom platform.",
      },
      {
        kind: "p",
        text: "This is often the right direction when you need:",
      },
      {
        kind: "ul",
        items: [
          "user accounts or role-based access",
          "custom workflows",
          "dashboards",
          "internal tools",
          "integrations",
          "portals",
          "non-standard user journeys",
        ],
      },
      {
        kind: "p",
        text: "This is where many businesses accidentally underestimate what they need. They ask for a website, but what they are really describing is a system.",
      },
      { kind: "h2", text: "6. So how do you know which one is right?" },
      {
        kind: "p",
        text: "A few good questions can help clarify the direction:",
      },
      {
        kind: "ul",
        items: [
          "Do you mainly need to be found and contacted?",
          "Do you need to persuade and position more effectively?",
          "Do you plan to publish content regularly?",
          "Do you need to sell products online?",
          "Do you need users to interact with a process, portal, or custom workflow?",
          "Will this site need to grow with the business over time?",
        ],
      },
      {
        kind: "p",
        text: "The more your needs involve process, customization, interactivity, or future expansion, the more likely it is that a simple site will eventually feel limiting.",
      },
      { kind: "h2", text: "7. The best fit is not always the most complicated one" },
      {
        kind: "p",
        text: "It is easy to assume the most advanced option is the best option. That is not always true.",
      },
      {
        kind: "p",
        text: "The right solution is the one that matches your goals, your workflow, your budget, and where your business is headed next.",
      },
      {
        kind: "p",
        text: "Some businesses need a strong, polished brochure site and nothing more. Others need a more strategic marketing site. Others need a system that goes far beyond a traditional website.",
      },
      {
        kind: "p",
        text: "The key is building the right thing from the start.",
      },
      { kind: "h2", text: "Final thought" },
      {
        kind: "p",
        text: "A website should not just exist. It should support the way your business actually works.",
      },
      {
        kind: "p",
        text: "That is why the first step is not choosing a template or a platform. It is identifying what kind of digital experience your business really needs.",
      },
      {
        kind: "p",
        text: "If you are not sure where your project falls, that is usually the best place to start the conversation.",
      },
    ],
  },
  {
    slug: "beyond-the-box-strategic-advantage-custom-business-applications",
    title: "Beyond the Box: The Strategic Advantage of Custom Business Applications",
    description:
      "Why bespoke software becomes critical as you outgrow off-the-shelf tools: fewer workarounds, deeper integrations, brand control, and ownership of your operational stack.",
    excerpt:
      "When templates and connectors stop matching how you work, custom applications shift from nice-to-have to operational leverage. Here is the strategic case.",
    publishedAt: "2026-04-15",
    author: { name: "", affiliation: "B&D Servicing" },
    blocks: [
      {
        kind: "p",
        text: "Most businesses begin their journey relying on off-the-shelf software. It makes sense in the early days: it is immediate, accessible, and solves the problem right in front of you.",
      },
      {
        kind: "p",
        text: "But as a business matures, a subtle shift happens. Instead of the software supporting the company's operations, the company begins adapting its workflows to accommodate the limitations of the software. Teams find themselves manually exporting data, relying on clunky third-party connectors, and developing elaborate workarounds just to get their daily tasks done.",
      },
      {
        kind: "p",
        text: "When a business reaches this inflection point, transitioning to a custom-built application stops being a luxury and becomes a critical operational advantage. Here is why investing in software designed specifically for your exact specifications yields an incredible return on investment.",
      },
      { kind: "h2", text: '1. Eradicating the "Workaround"' },
      {
        kind: "p",
        text: "Pre-packaged software is built for the masses, which means it is full of features you don't need and missing the highly specific features you do.",
      },
      {
        kind: "p",
        text: "A custom application is engineered precisely for your operational reality. If your business requires complex, automated background tasks, like pinging domains, running recurring health checks, or generating highly specific data reports for clients, a custom build handles it natively. It eliminates the need to duct-tape different platforms together, significantly reducing human error and saving countless hours of manual administrative work.",
      },
      { kind: "h2", text: "2. Seamless, Deep Integration" },
      {
        kind: "p",
        text: "Modern businesses do not operate in a vacuum; they rely on a web of tools, from CRMs to secure financial databases. Off-the-shelf platforms often struggle to communicate with one another effectively.",
      },
      {
        kind: "p",
        text: "Building a bespoke application allows you to create a central nervous system for your business. You can connect disparate APIs, migrate heavy data seamlessly, and ensure that your front-end user interface and your back-end data processing are communicating flawlessly in real-time.",
      },
      { kind: "h2", text: "3. Uncompromising Brand and Experience Control" },
      {
        kind: "p",
        text: "When you use a white-labeled or template-based platform, you are at the mercy of their design limitations. Your client portal ends up looking exactly like your competitor's.",
      },
      {
        kind: "p",
        text: "Custom development grants you absolute control over the user experience. It allows a business to enforce strict brand standards across every touchpoint, locking in the exact typography, such as keeping Arial consistent across all views, and executing precise color palettes. More importantly, it allows for high-fidelity, professional UI design. Whether that means implementing modern 3D effects, cinematic visual hierarchies, or clean, data-rich dashboards, a custom app ensures your clients experience an executive-level presentation that off-the-shelf software simply cannot replicate.",
      },
      { kind: "h2", text: "4. Security and Total Ownership" },
      {
        kind: "p",
        text: "Relying entirely on a third-party vendor means you are renting your operational infrastructure. If that vendor raises their prices, sunsets a feature you rely on, or suffers a security breach, your business is directly impacted.",
      },
      {
        kind: "p",
        text: "When you build a custom application, you own the code, the architecture, and the roadmap. You dictate the security protocols, and you decide when and how the platform scales as your business grows or pivots.",
      },
      { kind: "h2", text: "The Bottom Line" },
      {
        kind: "p",
        text: "Building a custom program is an investment in operational leverage. It moves a business from reacting to software limitations to dictating exactly how its technology should serve its goals, its team, and its clients.",
      },
      {
        kind: "p",
        text: "For companies ready to scale efficiently, a bespoke application isn't just a tool; it is a competitive moat.",
      },
    ],
  },
];

export function getInsightSlugs(): string[] {
  return insightPosts.map((p) => p.slug);
}

export function getInsightPost(slug: string): InsightPost | undefined {
  return insightPosts.find((p) => p.slug === slug);
}

export function getInsightsSorted(): InsightPost[] {
  return [...insightPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}
