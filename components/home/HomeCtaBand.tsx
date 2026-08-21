"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { HeroBackdropShell } from "@/components/layout/HeroBackdropShell";
import { HomeCtaSatelliteCursor } from "./HomeCtaSatelliteCursor";

/** Home closing CTA: legacy `.cta-section` — `var(--dark-bg)` / `#080c12`, particle only, no aurora or pointer wash. */
export function HomeCtaBand() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFinePointer(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const satelliteOn = !reduce && finePointer;

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-bd-dark-bg py-24 text-bd-dark-text md:py-[100px] ${satelliteOn ? "bd-home-cta-satellite-zone" : ""}`}
      aria-labelledby="home-cta-heading"
    >
      <HeroBackdropShell boundaryRef={sectionRef} variant="cta" />
      <HomeCtaSatelliteCursor boundaryRef={sectionRef} enabled={satelliteOn} />
      <Container className="relative z-10 max-w-[580px] text-center">
        <Reveal>
          <h2
            id="home-cta-heading"
            className="font-heading text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-[-0.015em] text-white"
          >
            Ready to build <span className="text-bd-accent">something real?</span>
          </h2>
          <p className="mt-4 text-[1.1rem] leading-relaxed text-bd-dark-muted">
            Tell us about your project. We&apos;ll scope it, plan it, and build it right, with a direct reply and clear
            next steps.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bd-accent-dark"
          >
            <span>Get a Free Quote</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </MagneticLink>
        </Reveal>
      </Container>
    </section>
  );
}
