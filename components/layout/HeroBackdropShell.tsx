"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type RefObject } from "react";
import { CtaParticleCanvas } from "@/components/effects/CtaParticleCanvas";

/**
 * Particle web plus optional overlays.
 * - `hero`: scanlines + vignette + grid (inner page heroes).
 * - `cta`: particle only — matches legacy `.cta-section` on flat `#080c12` (canvas at full opacity like static site).
 */
export function HeroBackdropShell({
  boundaryRef,
  variant = "hero",
}: {
  boundaryRef: RefObject<HTMLElement | null>;
  variant?: "hero" | "cta";
}) {
  const reduce = useReducedMotion();
  const [canvasTransform, setCanvasTransform] = useState("translateY(0px)");

  const applyParallax = useCallback(() => {
    if (reduce) return;
    const el = boundaryRef.current;
    if (!el) return;
    const scrollY = window.scrollY;
    const h = el.offsetHeight;
    const cOff = scrollY <= h ? scrollY * 0.3 : h * 0.3;
    setCanvasTransform(`translateY(${cOff}px)`);
  }, [reduce, boundaryRef]);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => applyParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    const id = requestAnimationFrame(() => applyParallax());
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce, applyParallax]);

  return (
    <>
      {!reduce ? (
        <div
          className={`pointer-events-none absolute inset-0 z-0 ${variant === "cta" ? "opacity-100" : "opacity-[0.55]"}`}
          style={{ transform: canvasTransform }}
          aria-hidden
        >
          <CtaParticleCanvas boundaryRef={boundaryRef} />
        </div>
      ) : null}

      {variant === "hero" ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.65]"
            style={{
              backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 4px
          )`,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background: "linear-gradient(180deg, rgba(8,12,18,0.2) 0%, rgba(8,12,18,0.65) 50%, rgba(8,12,18,0.95) 100%)",
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 z-[2] page-hero-grid opacity-30" aria-hidden />
        </>
      ) : null}
    </>
  );
}
