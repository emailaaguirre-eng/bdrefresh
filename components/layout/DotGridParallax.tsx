"use client";

import { useEffect } from "react";

/** Legacy script.js §18 — scroll-driven --bd-grid-offset on `.dot-grid-bg` sections. */
export function DotGridParallax() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      document.querySelectorAll<HTMLElement>(".dot-grid-bg").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const offset = (progress - 0.5) * 25;
          section.style.setProperty("--bd-grid-offset", `${offset}px`);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
