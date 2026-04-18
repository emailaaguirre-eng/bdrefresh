"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { processPhases } from "@/lib/data";
import { ProcessStepIcon } from "@/components/process/ProcessStepIcon";

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
      className="relative overflow-hidden bg-white py-24 md:py-[110px]"
      id="process"
      aria-labelledby="home-process-heading"
    >
      <Container>
        <Reveal>
          <SectionTag>Our Process</SectionTag>
          <h2 id="home-process-heading" className="font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
            How We Build
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bd-light-secondary">
            A clear, repeatable process that keeps you informed at every stage and delivers reliable results, with
            visible staging and sign-off before go-live so expectations stay grounded.
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
                    <ProcessStepIcon phase={p.phase} />
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
