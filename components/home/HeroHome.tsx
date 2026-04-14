"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { HeroMatrixCanvas } from "./HeroMatrixCanvas";
import { HeroStatusBadge } from "./HeroStatusBadge";
import { HeroTypingSubtitle } from "./HeroTypingSubtitle";

const CODE_FLOATS: { text: string; cls: string }[] = [
  { text: "</>", cls: "bd-code-float--1" },
  { text: "{ }", cls: "bd-code-float--2" },
  { text: "func()", cls: "bd-code-float--3" },
  { text: "[ ]", cls: "bd-code-float--4" },
  { text: "<div>", cls: "bd-code-float--5" },
  { text: "async", cls: "bd-code-float--6" },
  { text: "=>", cls: "bd-code-float--7" },
];

/**
 * Legacy index.html `.hero` + script.js matrix, parallax bg/canvas, code-floats,
 * composition (max-width 740px content), title weight/color, tagline spacing.
 */
export function HeroHome() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [bgTransform, setBgTransform] = useState("translateY(0px) scale(1.1)");
  const [canvasTransform, setCanvasTransform] = useState("translateY(0px)");

  const applyParallax = useCallback(
    (e?: MouseEvent) => {
      if (reduce) return;
      const hero = sectionRef.current;
      if (!hero) return;
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;
      const scrollOffset = scrollY <= heroHeight ? scrollY * 0.4 : heroHeight * 0.4;
      let x = 0;
      let y = scrollOffset;
      if (
        e &&
        window.matchMedia("(min-width: 768px) and (hover: hover)").matches &&
        scrollY <= heroHeight
      ) {
        x = (e.clientX / window.innerWidth - 0.5) * 15;
        y = (e.clientY / window.innerHeight - 0.5) * 15 + scrollOffset;
      }
      setBgTransform(`translate(${x}px, ${y}px) scale(1.1)`);
      const cOff = scrollY <= heroHeight ? scrollY * 0.3 : heroHeight * 0.3;
      setCanvasTransform(`translateY(${cOff}px)`);
    },
    [reduce],
  );

  useEffect(() => {
    if (reduce) return;
    const hero = sectionRef.current;
    if (!hero) return;
    const onScroll = () => applyParallax();
    const onMove = (ev: MouseEvent) => applyParallax(ev);
    window.addEventListener("scroll", onScroll, { passive: true });
    hero.addEventListener("mousemove", onMove, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      hero.removeEventListener("mousemove", onMove);
    };
  }, [reduce, applyParallax]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100vh] overflow-hidden bg-bd-dark-bg py-[120px] pb-20 text-bd-dark-text"
      aria-label="Introduction"
    >
      {!reduce ? (
        <div className="bd-hero-parallax-bg" style={{ transform: bgTransform }} aria-hidden />
      ) : (
        <div className="bd-hero-parallax-bg !transition-none" style={{ transform: "scale(1.1)" }} aria-hidden />
      )}

      <HeroMatrixCanvas style={{ transform: canvasTransform }} />

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
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_top,_rgba(37,104,160,0.12),_transparent_55%)]" />

      {!reduce ? (
        <div className="bd-hero-decorations" aria-hidden>
          {CODE_FLOATS.map(({ text, cls }) => (
            <span key={text} className={`bd-code-float ${cls}`}>
              {text}
            </span>
          ))}
        </div>
      ) : (
        <div className="bd-hero-decorations opacity-50" aria-hidden>
          {CODE_FLOATS.map(({ text, cls }) => (
            <span key={text} className={`bd-code-float ${cls}`}>
              {text}
            </span>
          ))}
        </div>
      )}

      <Container className="relative z-10">
        <div className="max-w-[740px]">
          <HeroStatusBadge />

          <h1 className="mb-5 font-heading text-[clamp(2.5rem,5.5vw,4rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
            <span className="block">Websites and apps,</span>
            <span className="block">
              built <span className="shimmer-text">end-to-end.</span>
            </span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-[0.95rem] font-semibold tracking-[0.02em] text-bd-accent-lighter">
            {["Design", "Build", "Launch", "Improve"].map((w, i) => (
              <span key={w} className="flex items-center gap-4">
                {i > 0 ? <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-bd-dark-muted" aria-hidden /> : null}
                <span>{w}</span>
              </span>
            ))}
          </div>

          <HeroTypingSubtitle />

          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticLink
              href="/start-project"
              className="bd-btn-magnetic inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent-lighter"
            >
              <span>Start a Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </MagneticLink>
            <ButtonLink href="/start-project#contact" variant="ghost">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
