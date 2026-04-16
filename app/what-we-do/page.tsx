import type { Metadata } from "next";
import Link from "next/link";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { LightCtaBand } from "@/components/layout/LightCtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Full-stack development for real operations: custom websites, applications, internal tools, and systems shaped around business needs.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Full-stack development for <span className="shimmer-text">real operations</span>
          </>
        }
        lead="B&D Servicing is a full-stack development firm with 10+ years of experience building websites, web applications, internal tools, and digital systems shaped around real business needs, not generic templates."
      />
      <section className="bg-bd-light-bg py-16 md:py-20" aria-labelledby="wwd-build">
        <Container>
          <Reveal>
            <SectionTag>What we build</SectionTag>
            <h2 id="wwd-build" className="font-heading text-3xl font-bold md:text-4xl">
              Software that fits the work
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-bd-light-secondary">
              We design and ship end-to-end: front end, back end, data, integrations, deployment, and ongoing
              improvements.
            </p>
          </Reveal>
          <Reveal className="mt-10 max-w-3xl space-y-4 text-bd-light-secondary">
            <p>
              Most teams don’t need another rigid theme or a pile of disconnected plugins. They need systems that match
              how people actually work: clear permissions, predictable workflows, and data that stays in sync across
              tools.
            </p>
            <p>
              That’s where we focus: custom applications, internal dashboards, automation, and public-facing sites when
              they need to perform, not just look passable in a demo.
            </p>
          </Reveal>
        </Container>
      </section>
      <section className="dot-grid-bg py-16 md:py-20" aria-labelledby="wwd-help">
        <Container>
          <Reveal>
            <SectionTag>Who we help</SectionTag>
            <h2 id="wwd-help" className="font-heading text-3xl font-bold md:text-4xl">
              Teams outgrowing off-the-shelf tools
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-bd-light-secondary">
              Whether you’re a small business that needs a fast, credible web presence or a growing company investing
              in internal platforms, we scope to outcomes: fewer manual steps, clearer reporting, and software your
              team will actually use.
            </p>
            <Link
              href="/start-project"
              className="mt-8 inline-flex text-sm font-semibold text-bd-accent hover:text-bd-accent-dark"
            >
              Start a conversation →
            </Link>
          </Reveal>
        </Container>
      </section>
      <LightCtaBand aria-labelledby="wwd-cta-heading">
        <Reveal>
          <h2
            id="wwd-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-white"
          >
            Talk through your <span className="text-bd-dark-bg">next build</span>
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-white/85">
            Share where you are today and where you want to be. We&apos;ll help you map a sensible path.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-bd-accent shadow-md transition hover:bg-bd-light-alt"
          >
            <span>Start a Project</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </MagneticLink>
        </Reveal>
      </LightCtaBand>
    </>
  );
}
