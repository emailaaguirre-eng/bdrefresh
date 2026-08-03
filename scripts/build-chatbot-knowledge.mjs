import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'chatbot-knowledge.js');

const glossaryRaw = [
  ['Website', 'A collection of web pages that represent a business, brand, service, product, or organization online.', "A website is often the first place people go to understand what a business does, whether it is credible, and how to contact or buy from it."],
  ['Landing page', 'A focused single page built around one specific offer, campaign, service, or action.', 'Landing pages help guide visitors toward one clear next step, such as booking a call, submitting a form, or buying.'],
  ['Homepage', 'The main entry page of a website.', 'The homepage usually sets the first impression and helps visitors decide where to go next.'],
  ['Domain', 'The web address people use to find a website, such as example.com.', 'Domains connect to websites, email, DNS records, and security settings.'],
  ['DNS', 'DNS is the system that tells the internet where a domain should point, including the website, email provider, and verification records.', 'Incorrect DNS settings can break websites, email, SSL, tracking tools, and platform connections.'],
  ['Hosting', 'Hosting is the server or platform where a website or application lives so people can access it online.', 'Hosting affects speed, uptime, security, backups, and launch reliability.'],
  ['SSL', 'SSL is the security certificate that allows a website to load securely with HTTPS.', 'Without SSL, browsers may show security warnings and visitors may not trust the site.'],
  ['CMS', 'A CMS, or content management system, lets people update website content without editing code.', 'A CMS can make it easier to manage pages, posts, images, and site content over time.'],
  ['Responsive design', 'Responsive design means a website adapts to different screen sizes, including phones, tablets, and desktops.', 'Visitors expect websites to work well on mobile devices, and poor mobile design can hurt trust and conversions.'],
  ['SEO', 'SEO, or search engine optimization, is the process of improving a website so search engines can understand it and users can find it.', 'SEO can support visibility, trust, traffic, and lead generation over time.'],
  ['On-page SEO', 'On-page SEO focuses on the content and structure of individual pages, including titles, headings, copy, internal links, metadata, and image descriptions.', 'Good on-page SEO helps search engines and visitors understand what each page is about.'],
  ['Technical SEO', 'Technical SEO focuses on the behind-the-scenes health of a website, including speed, indexing, crawlability, redirects, structured data, sitemaps, and site architecture.', 'Technical SEO helps search engines access and understand the site properly.'],
  ['Local SEO', 'Local SEO helps a business appear in search results for a geographic area or service location.', 'Local SEO is important for businesses that serve specific cities, regions, or local customers.'],
  ['Metadata', 'Metadata is behind-the-scenes page information, such as title tags and meta descriptions, that helps describe a page.', 'Metadata can affect how pages appear in search results and how clearly users understand the page.'],
  ['Sitemap', 'A sitemap is a file that lists important website pages for search engines.', 'Sitemaps help search engines discover and understand site structure.'],
  ['Robots.txt', 'Robots.txt is a file that gives search engines instructions about which parts of a site they can or should not crawl.', 'Incorrect robots.txt settings can accidentally block important pages from search engines.'],
  ['Redirect', 'A redirect sends visitors and search engines from one URL to another.', 'Redirects help preserve traffic and avoid broken links when pages move or URLs change.'],
  ['Analytics', 'Analytics tools track website or campaign activity, such as visits, traffic sources, clicks, and conversions.', 'Analytics help businesses understand what is working and where improvements are needed.'],
  ['Google Search Console', 'Google Search Console is a Google tool that shows how a website appears in Google search and whether there are indexing or technical issues.', 'It helps identify search visibility, indexing problems, crawl errors, and performance opportunities.'],
  ['Conversion', 'A conversion is a desired action a visitor takes, such as submitting a form, booking a call, making a purchase, or downloading something.', 'Conversions are how websites and campaigns are often measured.'],
  ['CTA', 'CTA means call to action. It is the prompt that tells users what to do next, such as "Book a call" or "Request a quote."', 'Clear CTAs help visitors take the next step.'],
  ['CRM', 'A CRM is a system used to manage leads, contacts, customers, sales activity, and follow-up.', 'Connecting website forms or automations to a CRM helps reduce manual entry and keeps leads organized.'],
  ['API', 'An API, or application programming interface, is a structured way for one software system to communicate with another.', 'APIs are often what make integrations, automations, dashboards, portals, payment tools, CRMs, email platforms, and custom applications work together.'],
  ['API integrations', 'API integrations are connections built between software systems using APIs so tools can share information, trigger actions, update records, or keep data consistent.', 'API integrations can reduce manual entry, prevent duplicate work, improve reporting, and help business systems work together more reliably.'],
  ['Integration', 'An integration connects two or more tools or systems so they can share data or trigger actions.', 'Integrations reduce manual work and make business systems more connected.'],
  ['Automation', 'Automation uses rules or workflows to handle repetitive tasks automatically, such as notifications, CRM updates, spreadsheet updates, approvals, or follow-up tasks.', 'Automation can save time, reduce manual errors, and make processes more consistent.'],
  ['Workflow', 'A workflow is the series of steps a task or process follows from start to finish.', 'Clear workflows make automation, reporting, approvals, and accountability easier.'],
  ['Webhooks', 'A webhook is a way for one system to notify another system when something happens, such as a form submission, payment, booking, or status change.', 'Webhooks are useful for real-time updates because they can trigger actions automatically when an event occurs.'],
  ['Dashboard', 'A dashboard is a visual screen that shows important information, metrics, statuses, or actions in one place.', 'Dashboards help teams quickly understand what is happening and what needs attention.'],
  ['Client portal', 'A client portal is a secure area where clients can log in to access documents, tasks, messages, forms, status updates, or deliverables.', 'Client portals reduce back-and-forth emails and give clients one organized place to find information.'],
  ['Portal', 'A portal is a secure user area for customers, clients, staff, or partners.', 'Portals can improve transparency, reduce support load, and organize user-specific information.'],
  ['Admin dashboard', 'An admin dashboard is a private control panel where authorized users manage data, content, users, settings, reports, or workflows.', 'Admin dashboards help teams operate a system without editing code directly.'],
  ['User roles', 'User roles define what different users are allowed to see or do inside a system.', 'Roles protect information and keep workflows organized by permission level.'],
  ['Authentication', "Authentication is the process of verifying a user's identity, usually through login credentials or other security checks.", 'Authentication protects private areas, accounts, dashboards, portals, and sensitive data.'],
  ['Database', 'A database is where structured information is stored, such as users, orders, leads, products, form submissions, tasks, or reports.', 'Good database structure makes it easier to search, update, report on, and protect business information.'],
  ['Data migration', 'Data migration is the process of moving information from one system, file, or platform to another.', 'Clean migration helps preserve important records when switching tools or rebuilding systems.'],
  ['Data sync', 'Data sync keeps information consistent between systems, such as making sure a contact added in one platform also appears correctly in another.', 'Data sync reduces duplicate entry, outdated records, and mismatched information across tools.'],
  ['Deduplication', 'Deduplication is the process of finding and removing duplicate records.', 'Deduplication keeps CRMs, mailing lists, reports, and workflows cleaner and more reliable.'],
  ['Tagging', 'Tagging is a way to label records so they can be grouped, filtered, reported on, or used in automations.', 'Tags help organize leads, clients, campaigns, support requests, project stages, and follow-up actions.'],
  ['Backup', 'A backup is a saved copy of website, application, or database information.', 'Backups help restore data if something breaks, is deleted, or becomes corrupted.'],
  ['Uptime monitoring', 'Uptime monitoring checks whether a website or application is online and reachable.', 'It helps detect outages quickly.'],
  ['Monitoring', 'Monitoring tracks whether a website or application is online, performing well, and free from major errors.', 'Monitoring helps identify outages, slow pages, broken functionality, or system errors after launch.'],
  ['Maintenance', 'Maintenance is ongoing care for a website, app, or system, such as updates, backups, fixes, monitoring, and content changes.', 'Maintenance keeps systems healthier, safer, and more reliable over time.'],
  ['Security review', 'A security review checks access, permissions, SSL, plugins, backups, spam protection, and other basic risks.', 'Security reviews help reduce avoidable problems and protect business systems.'],
  ['SPF', 'SPF is an email authentication record that helps identify which servers are allowed to send email for a domain.', 'SPF can help reduce spoofing and support better email trust.'],
  ['DKIM', 'DKIM is an email authentication method that adds a digital signature to messages.', 'DKIM helps receiving mail systems verify that a message was not altered and is connected to the sending domain.'],
  ['DMARC', 'DMARC is an email authentication policy that helps protect a domain from spoofing and gives visibility into who is sending email on behalf of the domain.', 'DMARC helps improve domain protection and supports better email trust when SPF and DKIM are also configured correctly.'],
  ['Deliverability', 'Deliverability is the ability of emails to reach recipients inboxes instead of spam or being blocked.', 'Deliverability affects whether clients, leads, and customers actually receive important emails.'],
  ['Email authentication', 'Email authentication uses records like SPF, DKIM, and DMARC to help prove that email sent from a domain is legitimate.', 'It helps protect domain reputation and reduce spoofing or spam issues.'],
  ['Google Workspace', "Google Workspace is Google's business email and productivity platform.", 'It can host business email, calendars, documents, and collaboration tools.'],
  ['Microsoft 365', "Microsoft 365 is Microsoft's business email and productivity platform.", 'It can host Outlook email, calendars, documents, Teams, SharePoint, and other business tools.'],
  ['Power Automate', "Power Automate is Microsoft's workflow automation tool.", 'It can connect Microsoft 365 apps and other services to automate approvals, notifications, data movement, and repetitive tasks.'],
  ['Zapier', 'Zapier is an automation platform that connects apps and triggers actions between them.', 'It is useful for lightweight automations between common business tools.'],
  ['Make', 'Make is an automation platform used to build visual workflows between apps and systems.', 'It can support more complex automation scenarios and data flows.'],
  ['Web app', 'A web app is software that runs in a browser and allows users to do more than read static web pages.', 'Web apps can support logins, dashboards, forms, workflows, portals, and business tools.'],
  ['Progressive web app', 'A progressive web app is a web app designed to behave more like a mobile app, sometimes including installable access or offline-friendly features.', 'It can offer an app-like experience without always requiring a native app store release.'],
  ['Native mobile app', 'A native mobile app is an app built specifically for platforms like iOS or Android.', 'Native apps can support mobile-specific features but usually require more planning, development, testing, and maintenance.'],
  ['MVP', 'MVP means minimum viable product, which is the smallest useful version of a product that can test an idea or workflow.', 'MVPs help reduce risk by focusing on the essential features first.'],
  ['Prototype', 'A prototype is an early model of a website, app, or feature used to test structure, flow, or design before full development.', 'Prototypes help clarify ideas before investing in a full build.'],
  ['Wireframe', 'A wireframe is a simple layout plan that shows page or screen structure without final visual design.', 'Wireframes help plan content, layout, and user flow early.'],
  ['Mockup', 'A mockup is a more polished visual representation of what a page, screen, or design may look like.', 'Mockups help review design direction before development.'],
  ['QA', 'QA, or quality assurance, is the testing process used to check that a website, application, or workflow works as expected before release.', 'QA can include checking forms, links, mobile layouts, browser behavior, user flows, permissions, integrations, and edge cases.'],
  ['CI/CD', 'CI/CD is a development process that can automatically test and deploy code changes through a controlled pipeline.', 'CI/CD can make releases safer, faster, and more consistent, especially for applications or sites with frequent updates.'],
  ['Deployment', 'Deployment is the process of moving a website, app, or update from development into the live environment where users can access it.', 'Deployment includes launch checks, hosting, environment settings, DNS, security, testing, and rollback planning.'],
  ['Staging', 'Staging is a test environment used to review changes before they go live.', 'Staging helps teams test updates, catch issues, and approve changes before affecting the live production site or application.'],
  ['Production', 'Production is the live version of a website or application that real users, customers, or staff interact with.', 'Changes in production need to be handled carefully because mistakes can affect real users, business operations, or customer experience.'],
  ['Internal tools', 'Internal tools are private systems built for staff to manage workflows, records, approvals, tasks, dashboards, reporting, or daily operations.', 'Internal tools reduce scattered spreadsheets, manual tracking, and process confusion by giving teams one structured place to work.'],
  ['Custom applications', 'A custom application is software built around a specific business process instead of forcing the business to fit into a generic template or off-the-shelf tool.', 'Custom applications are helpful when a business has unique workflows, user roles, data needs, integrations, or reporting requirements that standard software does not handle well.'],
  ['Full stack / end-to-end development', 'Full stack or end-to-end development means handling the visible part users interact with, the behind-the-scenes logic, the database, and the deployment process that gets the system live.', 'A complete project may include more than screens or design. It may also require backend logic, data storage, security, hosting, testing, and launch support.'],
  ['Scalable platform', 'A scalable platform is built so it can grow over time, whether that means more users, more data, more features, or more integrations.', 'Scalability helps reduce the need to rebuild from scratch when the business grows or the system becomes more complex.'],
  ['Architecture', 'Architecture is the technical blueprint for how a website, app, database, integrations, and infrastructure fit together.', 'Good architecture helps a system stay reliable, maintainable, and easier to expand.'],
  ['Tech stack', 'A tech stack is the collection of technologies used to build and run a project, such as programming languages, frameworks, databases, hosting, APIs, and third-party services.', 'The tech stack affects performance, cost, maintenance, scalability, and future development options.'],
  ['Documentation', 'Documentation is written guidance that explains how a system works, how to maintain it, and how to use important features or workflows.', 'Documentation makes handoff, training, support, and future updates easier.']
];

const extraKeys = {
  API: ['application programming interface'],
  'API integrations': [],
  'On-page SEO': ['on page seo'],
  'Technical SEO': [],
  'Local SEO': [],
  'Google Search Console': ['search console'],
  'Progressive web app': ['pwa'],
  'Native mobile app': ['native app'],
  'Full stack / end-to-end development': ['full stack', 'end-to-end', 'end to end', 'fullstack'],
  Webhooks: ['webhook'],
  'Client portal': ['client portals'],
  Robots: ['robots txt']
};

const glossary = glossaryRaw.map(([term, definition, why]) => ({
  term,
  definition,
  why,
  keys: extraKeys[term] || []
}));

// Client-facing only: what we offer + a few public starting prices.
// Do not list full internal rate cards, tier ladders, or proprietary package detail.
const serviceMenu = `WHAT WE OFFER
- Website builds: professional business and marketing sites
- Custom web applications: portals and apps shaped around your workflows
- Internal tools & dashboards: approvals, reporting, and team systems
- Automation & API integrations: keep tools in sync without copy-paste
- Managed hosting: starting at $149/month
- Website monitoring: checks and alerts for the live site (ask for details)
- Website care: ongoing maintenance and health checks (quoted to fit)
- SEO: technical and on-page care; ongoing SEO care starting at $199/month
- Web copy: clear messaging for pages and calls to action
- Graphic design: logos, brand assets, and marketing visuals

Also available when needed: DNS/email setup, monitoring, and project consulting.

Notes: Final quotes depend on scope. Rankings and results are not guaranteed.
B&D Servicing does not provide cybersecurity services; we can recommend third-party partners when needed.
Ask for a free consultation for a tailored estimate.`

const payload = { glossary, serviceMenu };
const out = `window.BD_CHATBOT_KNOWLEDGE = ${JSON.stringify(payload)};\n`;
fs.writeFileSync(outPath, out, 'utf8');
console.log('Wrote', outPath, out.length, 'chars');
