"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCardTilt } from "@/components/effects/useCardTilt";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import type { ServicesPageOffer } from "@/lib/data";

/**
 * Same tilt / glow card surface as the home services grid.
 */
export function ServicesOfferCard({ item, index }: { item: ServicesPageOffer; index: number }) {
  const reduce = useReducedMotion();
  const [fineHover, setFineHover] = useState(false);
  useEffect(() => {
    setFineHover(window.matchMedia("(min-width: 768px) and (hover: hover)").matches);
  }, []);
  const tilt = useCardTilt({ disabled: reduce || !fineHover });

  /* eslint-disable react-hooks/refs */
  return (
    <article
      id={item.id}
      ref={tilt.ref}
      className="bd-service-card group relative scroll-mt-28 rounded-2xl border border-bd-light-border bg-bd-light-card shadow-card"
      {...tilt.handlers}
    >
      <div className="bd-service-card-glow" aria-hidden />
      <div className="bd-service-card-inner p-6 md:p-8">
        <div className="flex flex-wrap items-start gap-5 md:gap-8">
          <div className="flex shrink-0 items-center gap-4">
            <span className="font-mono text-2xl font-bold tabular-nums text-bd-accent md:text-3xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="bd-service-icon-wrap flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[rgba(37,104,160,0.18)] bg-[rgba(37,104,160,0.08)] text-bd-accent">
              <ServiceIcon index={item.iconIndex} />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-xl font-bold tracking-tight text-bd-light-text md:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-bd-light-secondary">{item.description}</p>
            {item.learnMoreHref ? (
              <p className="mt-4">
                <Link
                  href={item.learnMoreHref}
                  className="text-sm font-semibold text-bd-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
                >
                  Learn more: {item.learnMoreLabel ?? "Details"}
                  <span aria-hidden className="ml-1">
                    →
                  </span>
                </Link>
              </p>
            ) : null}
          </div>
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-bd-light-border to-transparent"
          aria-hidden
        />
      </div>
    </article>
  );
  /* eslint-enable react-hooks/refs */
}
