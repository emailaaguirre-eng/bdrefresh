export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/services", label: "Services" },
  { href: "/services/hosting", label: "Hosting" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
] as const;

export const footerNav = {
  company: [
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/start-project", label: "Start a Project" },
  ],
  services: [
    { href: "/services", label: "Services" },
    { href: "/services/hosting", label: "Hosting & Infrastructure" },
    { href: "/process", label: "Process" },
    { href: "/what-we-do", label: "What We Do" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookie-policy", label: "Cookies" },
    { href: "/accessibility", label: "Accessibility" },
  ],
} as const;
