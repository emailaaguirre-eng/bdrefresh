import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

function WhoHelpIconLock() {
  return (
    <svg className="text-bd-accent" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function WhoHelpIconTrending() {
  return (
    <svg className="text-bd-accent" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

const buildStackPills = [
  "front end",
  "back end",
  "data",
  "integrations",
  "deployment",
  "ongoing improvements",
] as const;

function BuildStackPill({ label }: { label: string }) {
  return (
    <li className="inline-flex list-none">
      <span
        className="group inline-flex cursor-default select-none items-center gap-2 rounded-full border border-bd-light-border bg-white px-3 py-1.5 font-mono text-[0.7rem] font-medium tracking-wide text-bd-light-secondary shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-out will-change-transform hover:-translate-y-1 hover:border-bd-accent hover:bg-[rgba(37,104,160,0.07)] hover:text-bd-accent hover:shadow-[0_12px_28px_-8px_rgba(37,104,160,0.28),0_4px_14px_rgba(0,0,0,0.08)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(37,104,160,0.15)] motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[0_1px_3px_rgba(0,0,0,0.05)] md:text-xs"
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-bd-accent-lighter shadow-[0_0_0_1px_rgba(37,104,160,0.12)] transition-[background-color,box-shadow] duration-200 group-hover:bg-bd-accent group-hover:shadow-[0_0_0_3px_rgba(37,104,160,0.18)] motion-reduce:transition-none"
          aria-hidden
        />
        {label}
      </span>
    </li>
  );
}

/**
 * What We Do body: How we ship (stack pills + posture) + Who we help cards.
 */
export function WhatWeDoBody() {
  return (
    <>
      <section className="dot-grid-bg py-16 md:py-24" aria-labelledby="wwd-ship">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTag>How we ship</SectionTag>
              <h2 id="wwd-ship" className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl lg:text-[2.35rem] lg:leading-tight">
                Software that fits the work
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">We design and ship end-to-end:</p>
              <ul
                className="mt-4 flex list-none flex-wrap gap-2 p-0"
                aria-label="Areas we design and ship end-to-end"
              >
                {buildStackPills.map((label) => (
                  <BuildStackPill key={label} label={label} />
                ))}
              </ul>
              <div className="mt-8 border-t border-bd-light-border pt-8">
                <div className="space-y-5 text-[1.02rem] leading-relaxed text-bd-light-secondary md:space-y-6 md:text-[1.05rem]">
                  <p>
                    Most teams don’t need another rigid theme or a pile of disconnected plugins. They need systems that
                    match how people actually work: clear permissions, predictable workflows, and data that stays in sync
                    across tools.
                  </p>
                  <p>
                    That’s the posture behind every engagement: clarify the outcome, own the thread from design through
                    deployment, and leave something the team can run day to day, not a demo that only works at launch.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-bd-light-border/80 bg-bd-light-alt py-16 md:py-24" aria-labelledby="wwd-help">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_20%,rgba(37,104,160,0.09),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_0%_100%,rgba(90,171,238,0.06),transparent_50%)]"
          aria-hidden
        />
        <Container className="relative">
          <Reveal>
            <SectionTag>Who we help</SectionTag>
            <h2 id="wwd-help" className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
              Teams outgrowing off-the-shelf tools
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">
              Whether you’re a small business that needs a fast, credible web presence or a growing company investing in
              internal platforms, we scope to outcomes: fewer manual steps, clearer reporting, and software your team will
              actually use.
            </p>
          </Reveal>

          <ul className="mt-10 grid list-none gap-6 p-0 md:grid-cols-2 lg:mt-12 lg:gap-8" role="list">
            <Reveal delay={0.05}>
              <li className="h-full" role="listitem">
                <article className="flex h-full flex-col rounded-2xl border border-bd-light-border bg-white p-8 shadow-card md:p-10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[rgba(37,104,160,0.15)] bg-[rgba(37,104,160,0.08)]">
                    <WhoHelpIconLock />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold text-bd-light-text">Small business</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-bd-light-secondary">
                    A fast, credible web presence that earns trust in the first scroll.
                  </p>
                </article>
              </li>
            </Reveal>
            <Reveal delay={0.1}>
              <li className="h-full" role="listitem">
                <article className="flex h-full flex-col rounded-2xl border border-bd-light-border bg-white p-8 shadow-card md:p-10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[rgba(37,104,160,0.15)] bg-[rgba(37,104,160,0.08)]">
                    <WhoHelpIconTrending />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold text-bd-light-text">Growing company</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-bd-light-secondary">
                    Internal platforms that cut manual steps and make reporting clear.
                  </p>
                </article>
              </li>
            </Reveal>
          </ul>

          <Reveal className="mt-12" delay={0.08}>
            <div className="border-t border-bd-light-border/80 pt-8">
              <Link
                href="/services"
                className="inline-flex text-sm font-semibold text-bd-accent transition hover:text-bd-accent-dark"
              >
                See what we offer →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
