import Link from "next/link";
import type { LegalBlock } from "@/components/legal/LegalDoc";
import { siteContact } from "@/lib/site";

const contactLine = (
  <>
    Questions:{" "}
    <a className="text-bd-accent underline underline-offset-2 hover:text-bd-accent-dark" href={`mailto:${siteContact.email}`}>
      {siteContact.email}
    </a>
    . {siteContact.legalName}, {siteContact.region}.
  </>
);

export const privacyBlocks: LegalBlock[] = [
  {
    kind: "p",
    text: `${siteContact.legalName} (“B&D”, “we”, “us”) operates banddservicing.com and related services. This Privacy Policy explains what information we collect on our website, how we use it, and the choices you have.`,
  },
  { kind: "h2", text: "Information we collect" },
  {
    kind: "ul",
    items: [
      "Contact and project details you submit through forms (such as name, email, company, and project notes).",
      "Technical data such as IP address, browser type, device information, and pages visited.",
      "Usage analytics when you grant statistics consent (for example Google Analytics and our first-party visitor tracking).",
      "Cookie and preference settings you choose in our consent tools.",
    ],
  },
  { kind: "h2", text: "How we use information" },
  {
    kind: "ul",
    items: [
      "Respond to inquiries and evaluate project fit.",
      "Operate, secure, and improve the website.",
      "Measure site performance and understand which pages are useful (only with consent where required).",
      "Meet legal, security, and fraud-prevention obligations.",
    ],
  },
  { kind: "h2", text: "Cookies and similar technologies" },
  {
    kind: "p",
    text: (
      <>
        We use essential cookies needed for the site to function, and optional analytics cookies when you opt in.
        You can review or change preferences anytime via{" "}
        <Link href="/cookie-policy" className="text-bd-accent underline underline-offset-2 hover:text-bd-accent-dark">
          Cookie Policy
        </Link>{" "}
        or the Cookie settings control in the footer.
      </>
    ),
  },
  { kind: "h2", text: "Sharing" },
  {
    kind: "p",
    text: "We do not sell personal information. We may share data with service providers that help us host the site, deliver email, or run analytics — only as needed to operate those services — or when required by law.",
  },
  { kind: "h2", text: "Retention" },
  {
    kind: "p",
    text: "We keep inquiry and operational records as long as needed for business, security, and legal purposes, then delete or anonymize them when no longer required.",
  },
  { kind: "h2", text: "Your choices" },
  {
    kind: "ul",
    items: [
      "Request access, correction, or deletion of personal information we hold about you, subject to applicable law.",
      "Withdraw analytics consent using Cookie settings.",
      "Stop marketing communications by replying or emailing us (we do not run aggressive marketing lists from this site).",
    ],
  },
  { kind: "h2", text: "Children" },
  {
    kind: "p",
    text: "This website is intended for business audiences and is not directed to children under 13. We do not knowingly collect personal information from children.",
  },
  { kind: "h2", text: "Changes" },
  {
    kind: "p",
    text: "We may update this policy from time to time. The “Last updated” date at the top of the page will change when we do.",
  },
  { kind: "h2", text: "Contact" },
  { kind: "p", text: contactLine },
];

export const termsBlocks: LegalBlock[] = [
  {
    kind: "p",
    text: `These Terms of Use govern your access to banddservicing.com operated by ${siteContact.legalName}. By using the site, you agree to these terms.`,
  },
  { kind: "h2", text: "Informational site" },
  {
    kind: "p",
    text: "Content on this site describes our services and capabilities for general informational purposes. Project work, pricing, timelines, and deliverables are governed by separate written agreements or statements of work — not by marketing pages alone.",
  },
  { kind: "h2", text: "Acceptable use" },
  {
    kind: "ul",
    items: [
      "Do not attempt to disrupt, scrape abusively, or probe the site for vulnerabilities without authorization.",
      "Do not submit unlawful, harmful, or misleading information through forms.",
      "Do not use the site to infringe intellectual property or privacy rights.",
    ],
  },
  { kind: "h2", text: "Intellectual property" },
  {
    kind: "p",
    text: "Site design, branding, copy, and materials are owned by B&D or its licensors unless otherwise noted. You may not copy or reuse them for commercial purposes without permission.",
  },
  { kind: "h2", text: "Third-party links" },
  {
    kind: "p",
    text: "The site may link to third-party websites or products. We are not responsible for their content, policies, or availability.",
  },
  { kind: "h2", text: "Disclaimer" },
  {
    kind: "p",
    text: "The site is provided “as is.” We aim for accuracy and availability but do not warrant uninterrupted access or that all content is complete for every situation. Outcomes such as search rankings, revenue, or project results are not guaranteed by browsing this site.",
  },
  { kind: "h2", text: "Limitation of liability" },
  {
    kind: "p",
    text: "To the fullest extent permitted by law, B&D is not liable for indirect, incidental, or consequential damages arising from use of the website. For paid services, liability is defined in the applicable client agreement.",
  },
  { kind: "h2", text: "Governing law" },
  {
    kind: "p",
    text: `These terms are governed by the laws of the State of Arizona, United States, without regard to conflict-of-law rules.`,
  },
  { kind: "h2", text: "Contact" },
  { kind: "p", text: contactLine },
];

export const cookieBlocks: LegalBlock[] = [
  {
    kind: "p",
    text: `${siteContact.legalName} uses cookies and similar technologies on banddservicing.com to run the site and, with your permission, understand how it is used.`,
  },
  { kind: "h2", text: "Essential" },
  {
    kind: "p",
    text: "Required for basic functions such as security, load balancing, and remembering your cookie preference choice.",
  },
  { kind: "h2", text: "Statistics / analytics (optional)" },
  {
    kind: "ul",
    items: [
      "Google Analytics (GA4), loaded only after statistics consent is granted.",
      "B&D Command Center first-party visitor tracking, used to understand site usage for our own business site.",
    ],
  },
  { kind: "h2", text: "Managing preferences" },
  {
    kind: "p",
    text: (
      <>
        Use the <strong className="font-semibold text-bd-light-text">Cookie settings</strong> control in the site footer
        to open preferences, grant or withdraw statistics consent, or clear your choice and decide again.
      </>
    ),
  },
  {
    kind: "p",
    text: (
      <>
        For how we handle personal information more broadly, see our{" "}
        <Link href="/privacy" className="text-bd-accent underline underline-offset-2 hover:text-bd-accent-dark">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  { kind: "h2", text: "Contact" },
  { kind: "p", text: contactLine },
];

export const accessibilityBlocks: LegalBlock[] = [
  {
    kind: "p",
    text: `${siteContact.legalName} is committed to making banddservicing.com usable for as many people as possible. We design with clarity, keyboard access, and semantic structure in mind, and we continue to improve the experience over time.`,
  },
  { kind: "h2", text: "Our approach" },
  {
    kind: "ul",
    items: [
      "Semantic headings, landmarks, and labels on primary navigation and forms.",
      "Keyboard-reachable controls for main interactive elements.",
      "Contrast-conscious color choices on core marketing surfaces.",
      "Ongoing smoke checks as we ship meaningful UI changes.",
    ],
  },
  { kind: "h2", text: "Known limitations" },
  {
    kind: "p",
    text: "Some decorative motion, third-party embeds, or older PDF/template assets may not meet every accessibility preference. We prioritize fixes that unblock core tasks such as reading service information and submitting an inquiry.",
  },
  { kind: "h2", text: "Feedback" },
  {
    kind: "p",
    text: (
      <>
        If you encounter a barrier on this site, email{" "}
        <a className="text-bd-accent underline underline-offset-2 hover:text-bd-accent-dark" href={`mailto:${siteContact.email}`}>
          {siteContact.email}
        </a>{" "}
        with the page URL and a short description. We will review and work to address issues within a reasonable time.
      </>
    ),
  },
  { kind: "h2", text: "Contact" },
  { kind: "p", text: contactLine },
];
