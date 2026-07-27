"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCardTilt } from "@/components/effects/useCardTilt";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { servicesDetailed } from "@/lib/data";

function ServiceCard({ title, description, index }: { title: string; description: string; index: number }) {
  const reduce = useReducedMotion();
  const [fineHover, setFineHover] = useState(false);
  useEffect(() => {
    setFineHover(window.matchMedia("(min-width: 768px) and (hover: hover)").matches);
  }, []);
  const tilt = useCardTilt({ disabled: reduce || !fineHover });

  /* useCardTilt: callback ref; ref.current only read in pointer handlers. */
  /* eslint-disable react-hooks/refs */
  const card = (
    <article
      ref={tilt.ref}
      className="bd-service-card group relative h-full rounded-2xl border border-bd-light-border bg-bd-light-card shadow-card"
      {...tilt.handlers}
    >
      <div className="bd-service-card-glow" aria-hidden />
      <div className="bd-service-card-inner flex h-full flex-col p-8 md:p-10">
        <span className="font-mono text-xs font-bold text-bd-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="bd-service-icon-wrap mt-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[rgba(37,104,160,0.18)] bg-[rgba(37,104,160,0.08)] text-bd-accent">
          <ServiceIcon index={index} />
        </div>
        <h3 className="mt-5 font-heading text-[1.2rem] font-bold tracking-tight text-bd-light-text">{title}</h3>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-bd-light-secondary">{description}</p>
        <div
          className="pointer-events-none absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-bd-light-border to-transparent"
          aria-hidden
        />
      </div>
    </article>
  );
  /* eslint-enable react-hooks/refs */
  return card;
}

export function HomeServicesGrid() {
  return (
    <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 sm:items-stretch">
      {servicesDetailed.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.04} className="h-full">
          <ServiceCard title={s.title} description={s.description} index={i} />
        </Reveal>
      ))}
    </div>
  );
}
