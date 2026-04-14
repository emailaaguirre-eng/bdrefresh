"use client";

import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { CtaParticleCanvas } from "@/components/effects/CtaParticleCanvas";
import { Container } from "@/components/ui/Container";

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

type Props = SectionProps & {
  children: ReactNode;
  className?: string;
  /** Default matches legacy `.cta-section` (100px vertical). */
  pyClass?: string;
  /** Particle canvas; home CTA keeps `true`, inner pages use `false` when the hero already has the web effect. */
  withParticles?: boolean;
};

/**
 * Legacy `.cta-section` + optional `.cta-bg-effect`: dark band with radial wash; particles optional.
 */
export function DarkCtaBand({
  children,
  className = "",
  pyClass = "py-24 md:py-[100px]",
  withParticles = true,
  ...sectionProps
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-bd-dark-bg text-bd-dark-text ${pyClass} ${className}`.trim()}
      {...sectionProps}
    >
      {withParticles ? <CtaParticleCanvas boundaryRef={sectionRef} /> : null}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_rgba(37,104,160,0.2),_transparent_65%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[580px] text-center">{children}</Container>
    </section>
  );
}
