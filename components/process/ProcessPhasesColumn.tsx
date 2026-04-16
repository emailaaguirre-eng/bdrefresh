"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import type { ProcessPagePhase } from "./ProcessPageContent";

const ctaBandRadial =
  "pointer-events-none absolute inset-0 z-0 rounded-2xl bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(37,104,160,0.07),transparent_58%)]";

function navLinkClass(active: boolean) {
  const base =
    "rounded-full border px-3 py-1.5 text-left text-xs font-medium transition lg:rounded-none lg:border-0 lg:px-3 lg:py-2 lg:text-sm";
  if (active) {
    return `${base} border-bd-accent/35 bg-bd-accent/10 text-bd-accent lg:border-l-2 lg:border-bd-accent lg:bg-transparent lg:pl-[calc(1.25rem-2px)]`;
  }
  return `${base} border-bd-light-border bg-white/80 text-bd-light-secondary hover:border-bd-accent/30 hover:text-bd-accent lg:bg-transparent`;
}

export function ProcessPhasesColumn({ phases }: { phases: readonly ProcessPagePhase[] }) {
  const [activeId, setActiveId] = useState(phases[0]?.id ?? "");

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && phases.some((p) => p.id === hash)) {
      setActiveId(hash);
    }
  }, [phases]);

  useEffect(() => {
    const ids = phases.map((p) => p.id);
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target?.id) {
          setActiveId(top.target.id);
        }
      },
      { root: null, rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.08, 0.15, 0.25, 0.35, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [phases]);

  return (
    <section className="dot-grid-bg py-16 md:py-24" aria-label="Process phases">
      <Container>
        <div className="lg:grid lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16">
          <aside className="mb-10 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-bd-light-muted lg:hidden">Jump to</p>
            <nav className="flex flex-wrap gap-2 lg:flex lg:flex-col lg:gap-0 lg:border-l lg:border-bd-light-border lg:pl-5" aria-label="Process phases">
              {phases.map((p) => {
                const active = activeId === p.id;
                return (
                  <a
                    key={p.id}
                    href={`#${p.id}`}
                    className={navLinkClass(active)}
                    aria-current={active ? "true" : undefined}
                  >
                    <span className={active ? "font-mono text-bd-accent" : "font-mono text-bd-accent/50"}>{p.phase}</span>
                    <span className="lg:ml-2">{p.title}</span>
                  </a>
                );
              })}
            </nav>
          </aside>

          <div>
            {phases.map((phase, i) => {
              const altBand = i === 0 || i === 2;
              return (
                <Reveal key={phase.id} delay={i * 0.04}>
                  <article
                    id={phase.id}
                    className={
                      altBand
                        ? "scroll-mt-28 relative my-8 overflow-hidden rounded-2xl border border-bd-light-border/90 bg-bd-light-alt px-5 py-12 first:mt-0 md:px-8 md:py-16 lg:my-12 lg:px-10 lg:py-[4.25rem]"
                        : "scroll-mt-28 border-b border-bd-light-border py-14 last:border-b-0 md:py-16 lg:py-[4.5rem] lg:first:pt-6"
                    }
                  >
                    {altBand ? <div className={ctaBandRadial} aria-hidden /> : null}
                    <div className={`relative max-w-3xl ${altBand ? "z-[1]" : ""}`}>
                      <span
                        className={`pointer-events-none absolute -right-2 top-0 select-none font-mono text-[clamp(3.5rem,12vw,6.5rem)] font-bold leading-none tracking-tight md:-right-4 ${
                          altBand ? "text-bd-accent/[0.12]" : "text-bd-accent/[0.08]"
                        }`}
                        aria-hidden
                      >
                        {phase.phase}
                      </span>
                      <header className="relative">
                        <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-bd-accent">{phase.tag}</p>
                        <h3 className="mt-2 font-heading text-[clamp(1.65rem,4vw,2.25rem)] font-bold tracking-tight text-bd-light-text">
                          {phase.title}
                        </h3>
                        <div className="mt-5 h-px max-w-xs bg-gradient-to-r from-bd-accent/50 to-transparent" aria-hidden />
                      </header>

                      <ol className="relative mt-10 space-y-9 md:mt-12 md:space-y-10" aria-label={`${phase.title} checkpoints`}>
                        {phase.blocks.map((b) => (
                          <li
                            key={b.label}
                            className="group rounded-xl md:grid md:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] md:gap-x-10 md:px-1 md:py-1 md:transition-colors md:hover:bg-white/50"
                          >
                            <p className="font-heading text-xs font-bold uppercase tracking-wide text-bd-accent md:pt-1">{b.label}</p>
                            <p className="mt-3 border-l-2 border-bd-accent/30 pl-4 text-[1.02rem] leading-relaxed text-bd-light-secondary transition-[border-color] duration-200 md:mt-0 md:group-hover:border-bd-accent/55 md:text-[1.05rem]">
                              {b.text}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
