"use client";

import { useEffect, useRef } from "react";
import "./hero-environmental-depth.css";

export type HeroEnvIntensity = "default" | "editorial" | "restrained";
export type HeroEnvLayout = "alpha" | "beta" | "gamma" | "delta" | "epsilon" | "zeta" | "eta";

export type HeroEnvironmentalDepthProps = {
  /** Visual weight for inner-page heroes. Never used on Home or Insights. */
  intensity?: HeroEnvIntensity;
  /** Authored geometry set — deterministic, no runtime randomness. */
  layout?: HeroEnvLayout;
  /** Hosting-flavored field density (same system, slightly tighter grid). */
  hosting?: boolean;
  className?: string;
};

/**
 * B&D Environmental Depth — INNER-PAGE hero system only.
 *
 * Do NOT use on Home (protected particle showcase) or Insights (CoDre-X).
 * Wire only via PageHero `environment` on normal public / legal heroes.
 *
 * Decorative: aria-hidden, pointer-events none, no layout contribution.
 */
export function HeroEnvironmentalDepth({
  intensity = "default",
  layout = "alpha",
  hosting = false,
  className = "",
}: HeroEnvironmentalDepthProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 768px)",
    );

    let raf = 0;
    let attached = false;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      // ~2–5px via CSS multipliers
      tx = ((e.clientX - r.left) / r.width - 0.5) * 1.8;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 1.8;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      el.style.setProperty("--ex", cx.toFixed(3));
      el.style.setProperty("--ey", cy.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    const detach = () => {
      if (!attached) return;
      const host = el.parentElement;
      host?.removeEventListener("mousemove", onMove);
      host?.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      el.style.setProperty("--ex", "0");
      el.style.setProperty("--ey", "0");
      attached = false;
    };

    const attach = () => {
      if (attached || reduceMq.matches || !fineMq.matches) return;
      const host = el.parentElement;
      if (!host) return;
      host.addEventListener("mousemove", onMove, { passive: true });
      host.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(tick);
      attached = true;
    };

    const sync = () => {
      detach();
      attach();
    };

    sync();
    reduceMq.addEventListener("change", sync);
    fineMq.addEventListener("change", sync);

    return () => {
      reduceMq.removeEventListener("change", sync);
      fineMq.removeEventListener("change", sync);
      detach();
    };
  }, []);

  const showC = intensity !== "restrained" && layout !== "epsilon" && layout !== "eta";
  const showRail2 = intensity !== "restrained" && layout !== "epsilon" && layout !== "eta";
  const showEdge2 = intensity !== "restrained" || layout === "alpha";
  const tealOnB = layout === "alpha" || layout === "gamma" || layout === "zeta" || hosting;

  const cls = [
    "bd-hero-env",
    "bd-hero-env--live",
    intensity !== "default" ? `bd-hero-env--${intensity}` : "",
    hosting ? "bd-hero-env--hosting" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={cls} data-layout={layout} aria-hidden>
      <div className="bd-hero-env__field" />
      <div className="bd-hero-env__plane bd-hero-env__plane--a" />
      <div
        className={[
          "bd-hero-env__plane",
          "bd-hero-env__plane--b",
          tealOnB ? "bd-hero-env__plane--teal" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {showC ? <div className="bd-hero-env__plane bd-hero-env__plane--c" /> : null}
      <div className="bd-hero-env__edge bd-hero-env__edge--1" />
      {showEdge2 ? (
        <div
          className={[
            "bd-hero-env__edge",
            "bd-hero-env__edge--2",
            layout === "beta" || layout === "delta" ? "bd-hero-env__edge--teal" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ) : null}
      <div className="bd-hero-env__rail bd-hero-env__rail--1" />
      {showRail2 ? <div className="bd-hero-env__rail bd-hero-env__rail--2" /> : null}
    </div>
  );
}
