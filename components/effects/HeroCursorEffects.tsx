"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const POOL_SIZE = 30;

/**
 * Legacy script.js §14: glow + pixel trail while cursor is over #bd-hero or the site header.
 * Adds body.bd-home-cursor-mode on the homepage for cursor:none (md+, fine pointer only).
 */
export function HeroCursorEffects() {
  const pathname = usePathname();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const glowRef = useRef<HTMLDivElement | null>(null);
  const pixelEls = useRef<(HTMLDivElement | null)[]>([]);
  const pixelIndex = useRef(0);
  const lastPixel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (pathname !== "/") {
      document.body.classList.remove("bd-home-cursor-mode");
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!reduce && fine) {
      document.body.classList.add("bd-home-cursor-mode");
    }
    return () => document.body.classList.remove("bd-home-cursor-mode");
  }, [pathname]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (pathname !== "/") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(min-width: 768px) and (hover: hover)").matches) return;

      const hero = document.getElementById("home");
      const header = document.querySelector("[data-bd-site-header]");
      const glow = glowRef.current;
      if (!hero || !header || !glow) return;

      const hr = hero.getBoundingClientRect();
      const tr = (header as HTMLElement).getBoundingClientRect();
      const inHero =
        e.clientY >= hr.top &&
        e.clientY <= hr.bottom &&
        e.clientX >= hr.left &&
        e.clientX <= hr.right;
      const inNav =
        e.clientY >= tr.top &&
        e.clientY <= tr.bottom &&
        e.clientX >= tr.left &&
        e.clientX <= tr.right;

      if (inHero || inNav) {
        glow.classList.add("bd-cursor-glow--visible");
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;

        const target = (e.target as HTMLElement | null)?.closest?.("a, button");
        if (target) glow.classList.add("bd-cursor-glow--link");
        else glow.classList.remove("bd-cursor-glow--link");

        const dist = Math.hypot(e.clientX - lastPixel.current.x, e.clientY - lastPixel.current.y);
        if (dist > 6) {
          const i = pixelIndex.current % POOL_SIZE;
          const el = pixelEls.current[i];
          if (el) {
            const offsetX = (Math.random() - 0.5) * 12;
            const offsetY = (Math.random() - 0.5) * 12;
            const size = 3 + Math.random() * 3;
            el.style.left = `${e.clientX + offsetX}px`;
            el.style.top = `${e.clientY + offsetY}px`;
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.opacity = "0.6";
            el.style.transform = "none";
            el.style.transition = "none";
            void el.offsetHeight;
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            el.style.opacity = "0";
            el.style.transform = `translate(${offsetX * 2}px, ${offsetY * 2 + 8}px)`;
          }
          pixelIndex.current += 1;
          lastPixel.current = { x: e.clientX, y: e.clientY };
        }
      } else {
        glow.classList.remove("bd-cursor-glow--visible", "bd-cursor-glow--link");
      }
    },
    [pathname],
  );

  useEffect(() => {
    if (!isClient || pathname !== "/") return;
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [isClient, pathname, onMouseMove]);

  if (!isClient || pathname !== "/") return null;

  return createPortal(
    <>
      <div ref={glowRef} className="bd-cursor-glow" aria-hidden />
      {Array.from({ length: POOL_SIZE }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            pixelEls.current[i] = el;
          }}
          className="bd-cursor-pixel"
          aria-hidden
        />
      ))}
    </>,
    document.body,
  );
}
