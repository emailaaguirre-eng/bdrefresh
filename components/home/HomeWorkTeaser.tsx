"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCardTilt } from "@/components/effects/useCardTilt";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

const items = [
  {
    title: "Workflow Systems",
    body: "Tools that manage steps, status, approvals, and reporting",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "Admin Dashboards",
    body: "Secure portals for users, settings, and operational controls",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Automation + API Integrations",
    body: "Syncing data between platforms, webhooks, imports, dedupe and tagging",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Production Improvements",
    body: "Configuration cleanup, stability, and performance hardening",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

function WorkCard({ item, delay }: { item: (typeof items)[number]; delay: number }) {
  const reduce = useReducedMotion();
  const [fineHover, setFineHover] = useState(false);
  useEffect(() => {
    setFineHover(window.matchMedia("(min-width: 768px) and (hover: hover)").matches);
  }, []);
  const tilt = useCardTilt({ disabled: reduce || !fineHover, maxTilt: 3, glowSelector: ".bd-work-glow-none" });

  /* eslint-disable react-hooks/refs */
  const card = (
    <article
      ref={tilt.ref}
      className="bd-work-card flex h-full gap-4 rounded-2xl border border-bd-light-border bg-white p-6 shadow-card"
      {...tilt.handlers}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bd-accent/10 text-bd-accent">{item.icon}</div>
      <div>
        <h3 className="font-heading text-lg font-bold text-bd-light-text">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-bd-light-secondary">{item.body}</p>
      </div>
    </article>
  );
  /* eslint-enable react-hooks/refs */

  return <Reveal delay={delay}>{card}</Reveal>;
}

/** Legacy `#work` grid — 2×2; `bg-white` band in the home white ↔ alt rhythm (see `app/page.tsx`). */
export function HomeWorkTeaser() {
  return (
    <section className="bg-white py-24 md:py-[110px]" id="work" aria-labelledby="home-work-heading">
      <Container>
        <Reveal>
          <SectionTag>Selected Work</SectionTag>
          <h2 id="home-work-heading" className="font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
            Client-Confidential
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bd-light-secondary">
            Many projects involve internal operations or private data, so we don&apos;t publicly showcase most builds.
            Below are representative patterns: illustrative mockups, not client deliverables.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <WorkCard key={item.title} item={item} delay={i * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}
