import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { DarkCtaBand } from "@/components/layout/DarkCtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeroWithWeb } from "@/components/layout/PageHeroWithWeb";
import { WorkPreviewMedia } from "@/components/work/WorkPreviewMedia";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { workCases } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Representative use cases and illustrative mockups. Real systems, selective sharing — no fabricated case studies.",
};

const focus = ["Websites", "Web applications", "Internal tools", "Diagnostics", "Platform experiences"];

export default function WorkPage() {
  return (
    <>
      <PageHeroWithWeb
        eyebrow="Work"
        title={
          <>
            Real systems, <span className="shimmer-text">selective sharing.</span>
          </>
        }
        lead="We build for production: websites, applications, internal tools, and platforms. These use cases reflect the kinds of problems we solve so you can gauge fit without requiring confidential project details."
      />
      <section className="bg-bd-light-bg py-16 md:py-20" aria-labelledby="work-how">
        <Container>
          <div className="w-full max-w-3xl">
            <Reveal>
              <SectionTag>Confidentiality</SectionTag>
              <h2 id="work-how" className="font-heading text-3xl font-bold md:text-4xl">
                How we show work
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-bd-light-secondary">
                Because much of our work involves private systems, internal workflows, pre-launch environments, or projects
                covered by confidentiality agreements, we may show illustrative mockups and high-level descriptions instead
                of actual client screenshots or named case studies.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
      <section className="dot-grid-bg relative overflow-hidden py-16 md:py-24" aria-labelledby="work-cases">
        <div className="pointer-events-none absolute right-0 top-20 z-0 h-80 w-80 rounded-full bg-bd-accent/10 blur-3xl" />
        <Container className="relative">
          {/* Intro matches other work sections (~3xl); grid uses full container width so mockups aren’t squeezed. */}
          <div className="w-full max-w-3xl">
            <Reveal>
              <SectionTag>Selected Use Cases</SectionTag>
              <h2 id="work-cases" className="font-heading text-3xl font-bold md:text-4xl">
                Selected use cases
              </h2>
              <p className="mt-4 text-bd-light-secondary">
                Representative use cases shown through illustrative mockups, without client names, endorsements, or
                fabricated metrics.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch">
            {workCases.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.05} className="h-full">
                <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-bd-light-border bg-white shadow-card transition hover:border-bd-accent/20 hover:shadow-card-hover">
                  <figure className="bd-work-preview shrink-0">
                    <figcaption className="bd-work-preview__label">Illustrative mockup</figcaption>
                    <div className="bd-work-preview__media">
                      <WorkPreviewMedia src={item.image} alt={item.alt} useObject={item.useObject} />
                    </div>
                  </figure>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-xs font-bold text-bd-accent">{item.n}</span>
                    <h3 className="mt-2 font-heading text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-bd-light-secondary">{item.description}</p>
                    <div className="mt-4 h-px w-full shrink-0 bg-gradient-to-r from-bd-accent/40 to-transparent" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-bd-dark-bg py-14 text-bd-dark-text" aria-label="Focus areas">
        <Container>
          <div className="w-full max-w-3xl">
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent-lighter">
                Where this work tends to land
              </p>
              <ul className="mt-6 flex flex-wrap gap-3" role="list">
                {focus.map((label) => (
                  <li
                    key={label}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium"
                    role="listitem"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>
      <section className="dot-grid-bg py-16 md:py-20" aria-labelledby="work-close">
        <Container>
          <div className="w-full max-w-3xl">
            <Reveal>
              <SectionTag>Closing note</SectionTag>
              <h2 id="work-close" className="font-heading text-3xl font-bold md:text-4xl">
                The through-line
              </h2>
            </Reveal>
            <Reveal className="mt-8 text-lg text-bd-light-secondary">
              <p>
                Not every project can be shared in full, but each one reflects the same goal: to build something thoughtful,
                functional, and tailored to the business it supports.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
      <DarkCtaBand withParticles={false} aria-labelledby="work-cta-heading">
        <Reveal>
          <h2
            id="work-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-white"
          >
            Ready to talk <span className="text-bd-accent-lighter">scope and fit?</span>
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-dark-muted">
            Tell us what you&apos;re trying to ship. We&apos;ll respond with clear next steps.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bd-accent-light"
          >
            <span>Start a Project</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </MagneticLink>
        </Reveal>
      </DarkCtaBand>
    </>
  );
}
