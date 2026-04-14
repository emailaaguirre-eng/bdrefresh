"use client";

import { useRef, type ReactNode } from "react";
import { CtaParticleCanvas } from "@/components/effects/CtaParticleCanvas";
import { Container } from "@/components/ui/Container";

/** Inner-page hero: same layout as `PageHero` plus networked particle canvas. */
export function PageHeroWithWeb({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
}) {
  const headerRef = useRef<HTMLElement | null>(null);

  return (
    <header ref={headerRef} className="relative overflow-hidden bg-bd-dark-bg text-bd-dark-text">
      <CtaParticleCanvas boundaryRef={headerRef} />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_rgba(37,104,160,0.2),_transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 z-[2] h-72 w-72 rounded-full bg-bd-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 z-[2] h-64 w-64 rounded-full bg-bd-teal/15 blur-3xl"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[2] page-hero-grid opacity-40" aria-hidden />
      <Container className="relative z-10 py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent-lighter">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>
          <p className="text-base leading-relaxed text-bd-dark-muted md:text-lg lg:pb-1">{lead}</p>
        </div>
      </Container>
    </header>
  );
}
