"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { processPhases } from "@/lib/data";

function StepIcon({ phase }: { phase: string }) {
  if (phase === "01") {
    return (
      <svg className="text-bd-accent" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }
  if (phase === "02") {
    return (
      <svg className="text-bd-accent" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (phase === "03") {
    return (
      <svg className="text-bd-accent" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );
  }
  return (
    <svg className="text-bd-accent" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

/** Legacy `.process` + timeline connector fill + step rings (script.js §9). */
export function HomeProcessPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => setFilled(true), 400);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="dot-grid-bg relative overflow-hidden py-24 md:py-[110px]"
      id="process"
      aria-labelledby="home-process-heading"
    >
      <Container>
        <Reveal>
          <SectionTag>Our Process</SectionTag>
          <h2 id="home-process-heading" className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            How We <span className="text-bd-accent">Build</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bd-light-secondary">
            A clear, repeatable process that keeps you informed at every stage and delivers reliable results.
          </p>
        </Reveal>

        <div className="relative mt-8">
          <div className="bd-process-connector hidden lg:block" aria-hidden>
            <div className={`bd-process-connector-fill ${filled ? "bd-filled" : ""}`} />
          </div>
          <div className="relative z-[1] grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {processPhases.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="bd-process-step px-0 text-center lg:px-4">
                  <div className="bd-step-ring mx-auto mb-6">
                    <StepIcon phase={p.phase} />
                  </div>
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] text-bd-accent opacity-60">
                    Phase {p.phase}
                  </span>
                  <h3 className="mt-1.5 font-heading text-[1.15rem] font-bold text-bd-light-text">{p.title}</h3>
                  <p className="mx-auto mt-2 max-w-[220px] text-[0.88rem] leading-relaxed text-bd-light-secondary">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-10">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-sm font-semibold text-bd-accent hover:text-bd-accent-dark"
          >
            Process in detail <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
