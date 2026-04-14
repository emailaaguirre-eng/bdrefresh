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

const WEBSITE_TYPES_SLUG = "what-type-of-website-is-right-for-your-business";

export const insightPosts: InsightPost[] = [
  {
    slug: WEBSITE_TYPES_SLUG,
    title: "What Type of Website Is Right for Your Business?",
    description:
      "A practical guide to brochure sites, marketing sites, content hubs, e-commerce, and when you need a custom web application instead.",
    excerpt:
      "Not every business needs the same kind of site. Here is how to think about brochure, marketing, content, commerce, and custom platforms—so you build the right thing from the start.",
    publishedAt: "2026-04-01",
    author: { name: "Chet Aiellu", affiliation: "B&D Servicing" },
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
