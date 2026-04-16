"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useRef } from "react";
import { HeroBackdropShell } from "@/components/layout/HeroBackdropShell";

type Props = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  children: ReactNode;
};

/** Flat dark band with the same networked-particle canvas as the home closing CTA. */
export function DarkParticleSection({ children, className = "", ...sectionProps }: Props) {
  const boundaryRef = useRef<HTMLElement | null>(null);
  return (
    <section
      ref={boundaryRef}
      className={`relative overflow-hidden bg-bd-dark-bg ${className}`.trim()}
      {...sectionProps}
    >
      <HeroBackdropShell boundaryRef={boundaryRef} variant="cta" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
