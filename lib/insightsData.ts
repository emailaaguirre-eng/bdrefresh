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
    slug: "real-cost-of-free-hosting-managed-support",
    title: "The Real Cost of Free Hosting: Why Business Websites Need Managed Support",
    description:
      "Free hosting can be useful for learning and testing, but business websites need stability, backups, security review, support, and room to grow.",
    excerpt:
      "Free hosting can look attractive at first, but business websites often pay the real cost through slow performance, weak recovery options, security gaps, limited support, and lost time.",
    publishedAt: "2026-06-03",
    author: { name: "", affiliation: "B&D Servicing" },
    blocks: [
      { kind: "p", text: "When you are first launching a website, side project, or new digital venture, the word free can be tempting." },
      { kind: "p", text: "Free hosting platforms promise to get your site online quickly, often with little or no upfront cost. For learning, testing, or experimenting, that can be useful. But when your website becomes part of your business, free can start carrying hidden costs." },
      { kind: "p", text: "Those costs usually show up as slow performance, limited control, security gaps, missing backups, poor support, and time spent troubleshooting issues that should have been prevented in the first place." },
      { kind: "p", text: "For a business website, hosting is not just where your files live. It is part of your business infrastructure." },
      { kind: "p", text: "At B&D Servicing, we believe managed hosting should give business owners more than server space. It should provide stability, accountability, support, and a clearer path when something needs attention." },

      { kind: "h2", text: "Free hosting has a place" },
      { kind: "p", text: "Free hosting can be a good starting point for learning basic website development, testing a personal project, creating a temporary landing page, or experimenting before investing in a full setup." },
      { kind: "p", text: "But a business website has different expectations. Your website may be where customers find you, contact you, read about your services, schedule appointments, submit forms, or decide whether your business looks credible." },
      { kind: "p", text: "When that website becomes part of your sales, operations, or client communication, the hosting behind it matters." },

      { kind: "h2", text: "1. Performance: your website needs room to breathe" },
      { kind: "p", text: "Free hosting platforms often place many websites on shared resources. That means your site may be affected by limits you do not control." },
      { kind: "p", text: "A slow website can create a poor first impression. Visitors may leave before your page finishes loading. Search engines may also view poor performance as a negative signal." },
      { kind: "p", text: "Managed hosting gives your website a more reliable foundation. Depending on the site and platform, that may include better server configuration, caching, CDN support, image optimization, and performance monitoring." },
      { kind: "p", text: "The goal is simple: your website should load reliably and give visitors a smooth experience." },

      { kind: "h2", text: "2. Security: hope is not a hosting strategy" },
      { kind: "p", text: "Security is one of the biggest differences between a casual website setup and a managed hosting approach." },
      { kind: "p", text: "With free or low-support hosting, the business owner is often responsible for figuring out updates, vulnerabilities, suspicious traffic, malware issues, SSL problems, and recovery steps." },
      { kind: "p", text: "That can become overwhelming quickly." },
      { kind: "p", text: "A managed hosting approach should include regular review of important security basics, such as:" },
      {
        kind: "ul",
        items: [
          "SSL certificate status",
          "website and platform updates",
          "backup availability",
          "basic malware or file exposure checks",
          "DNS and domain health",
          "access control review",
          "security headers where appropriate",
          "monitoring for common website issues",
        ],
      },
      { kind: "p", text: "Security is not a one-time setup. It is an ongoing responsibility." },

      { kind: "h2", text: "3. Backups: the safety net you hope you never need" },
      { kind: "p", text: "A website can break for many reasons. An update can fail. A plugin can conflict. A file can be overwritten. A form can stop working. A server issue can cause unexpected downtime." },
      { kind: "p", text: "Without backups, recovery becomes stressful and expensive." },
      { kind: "p", text: "Managed hosting should include a clear backup plan. That means knowing:" },
      {
        kind: "ul",
        items: [
          "how often backups happen",
          "where backups are stored",
          "how long backups are retained",
          "when the last backup completed",
          "whether a restore process has been tested",
        ],
      },
      { kind: "p", text: "Backups are not glamorous, but they are one of the most important parts of responsible website management." },

      { kind: "h2", text: "4. Ownership and control: your business should not be trapped" },
      { kind: "p", text: "Free platforms often come with limitations. You may be restricted by a forced subdomain, limited features, ads, platform rules, or a setup that becomes difficult to move later." },
      { kind: "p", text: "For a business, that can create long-term problems." },
      { kind: "p", text: "A managed setup should help you maintain better control over your:" },
      {
        kind: "ul",
        items: [
          "custom domain",
          "DNS records",
          "website files",
          "hosting environment",
          "email-related records",
          "security settings",
          "growth path",
        ],
      },
      { kind: "p", text: "Your website should support your business, not trap it inside someone else's limitations." },

      { kind: "h2", text: "5. Staging and maintenance: changes should not be guesswork" },
      { kind: "p", text: "Making changes directly on a live website can be risky. A small update can unexpectedly affect layout, forms, checkout, links, or page behavior." },
      { kind: "p", text: "That is why managed website support often includes a safer workflow for reviewing and testing changes before they affect customers. Depending on the website, this may include a staging environment, backup-before-change process, maintenance logs, or controlled deployment steps." },
      { kind: "p", text: "For business websites, the goal is not just to make changes. The goal is to make changes carefully." },

      { kind: "h2", text: "6. Support: business-hours help from someone who knows your site" },
      { kind: "p", text: "Free hosting usually leaves you with help articles, community forums, or automated responses." },
      { kind: "p", text: "Managed hosting gives you a clearer support path." },
      { kind: "p", text: "At B&D Servicing, managed support is designed around business-hours technical support, documented troubleshooting, and practical guidance. We do not position standard hosting support as 24/7 coverage." },
      { kind: "p", text: "For clients who need emergency or after-hours support, that should be handled separately through a defined agreement or support plan." },
      { kind: "p", text: "That distinction matters because responsible service should be clear, realistic, and honest." },

      { kind: "h2", text: "Free hosting vs. managed hosting" },
      {
        kind: "ul",
        items: [
          "Cost: free hosting may have no or low upfront cost, while managed hosting is a monthly service investment.",
          "Domain: free hosting may require a subdomain or platform branding, while managed hosting supports custom domain control.",
          "Performance: free hosting often has limited resources, while managed hosting allows better configuration, caching, and performance review.",
          "Security: free hosting is often self-managed, while managed hosting includes ongoing security basics and review.",
          "Backups: free hosting may have limited, manual, or unavailable backups, while managed hosting includes scheduled backups and recovery planning.",
          "Support: free hosting often relies on forums, bots, or self-help, while managed hosting provides business-hours technical support.",
          "Control: free hosting may involve platform restrictions, while managed hosting provides more flexibility and ownership.",
          "Maintenance: free hosting is mostly do-it-yourself, while managed hosting supports updates, monitoring, and troubleshooting.",
          "Growth: free hosting can become limiting, while managed hosting is built for a more professional long-term setup.",
        ],
      },

      { kind: "h2", text: "When free hosting stops being free" },
      { kind: "p", text: "Free hosting can be useful when the stakes are low. But when your website supports a business, client relationships, marketing campaigns, online sales, lead generation, or professional credibility, the cost of free can become much higher than expected." },
      { kind: "p", text: "The real cost may be paid through:" },
      {
        kind: "ul",
        items: [
          "lost leads",
          "downtime",
          "poor customer experience",
          "security problems",
          "missing backups",
          "limited support",
          "time spent troubleshooting instead of running your business",
        ],
      },
      { kind: "p", text: "Managed hosting is not just a technical upgrade. It is a business decision." },
      { kind: "p", text: "It gives your website a stronger foundation and gives you someone responsible for helping keep that foundation healthy." },

      { kind: "h2", text: "Is your website hosting helping or holding you back?" },
      { kind: "p", text: "If your website has become important to your business, it may be time to treat hosting like infrastructure, not an afterthought." },
      { kind: "p", text: "B&D Servicing can review your website, hosting setup, domain, SSL, backups, and site health to help you understand where things stand and what should be improved." },
      { kind: "p", text: "Whether you need a simple business website, a managed WordPress setup, a custom application, or a more advanced hosting plan, the right foundation can save time, reduce risk, and help your website support your business more reliably." },
    ],
  },
  {
    slug: WEBSITE_TYPES_SLUG,
    title: "What Type of Website Is Right for Your Business?",
    description:
      "A practical guide to brochure sites, marketing sites, content hubs, e-commerce, and when you need a custom web application instead.",
    excerpt:
      "Not every business needs the same kind of site. Here is how to think about brochure, marketing, content, commerce, and custom platforms, so you build the right thing from the start.",
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
