"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCardTilt } from "@/components/effects/useCardTilt";
import { Reveal } from "@/components/motion/Reveal";
import { servicesDetailed } from "@/lib/data";

function Icon01() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function Icon02() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
function Icon03() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}
function Icon04() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function Icon05() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function Icon06() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}
function Icon07() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

const ICONS = [Icon01, Icon02, Icon03, Icon04, Icon05, Icon06, Icon07];

function ServiceCard({ title, description, index }: { title: string; description: string; index: number }) {
  const reduce = useReducedMotion();
  const [fineHover, setFineHover] = useState(false);
  useEffect(() => {
    setFineHover(window.matchMedia("(min-width: 768px) and (hover: hover)").matches);
  }, []);
  const tilt = useCardTilt({ disabled: reduce || !fineHover });
  const Icon = ICONS[index] ?? Icon01;

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
        <span className="font-mono text-xs font-bold text-bd-accent opacity-50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="bd-service-icon-wrap mt-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[rgba(37,104,160,0.18)] bg-[rgba(37,104,160,0.08)] text-bd-accent">
          <Icon />
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
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      {servicesDetailed.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.04}>
          <ServiceCard title={s.title} description={s.description} index={i} />
        </Reveal>
      ))}
    </div>
  );
}
