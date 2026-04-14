"use client";

import { useRef, type ReactNode } from "react";
import { CtaParticleCanvas } from "@/components/effects/CtaParticleCanvas";
import { Container } from "@/components/ui/Container";

/** Article masthead: particle web + radial wash, matching inner `PageHeroWithWeb`. */
export function InsightArticleHero({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement | null>(null);

  return (
    <header
      ref={headerRef}
      className="relative overflow-hidden border-b border-bd-dark-border/60 bg-bd-dark-bg pb-12 pt-8 text-bd-dark-text md:pb-14 md:pt-10"
    >
      <CtaParticleCanvas boundaryRef={headerRef} />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_rgba(37,104,160,0.2),_transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 top-0 z-[2] h-56 w-56 rounded-full bg-bd-accent/15 blur-3xl"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[2] page-hero-grid opacity-30" aria-hidden />
      <Container className="relative z-10 max-w-3xl">{children}</Container>
    </header>
  );
}
