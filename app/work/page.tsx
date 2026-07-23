import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { DarkParticleSection } from "@/components/layout/DarkParticleSection";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { WorkPreviewMedia } from "@/components/work/WorkPreviewMedia";
import { ThroughLineSection } from "@/components/work/ThroughLineSection";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { workCases } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Our projects reflect the kinds of systems B&D Servicing builds, from websites and web applications to internal tools, diagnostics, and operational systems.",
};

const focus = ["Websites", "Web applications", "Internal tools", "Diagnostics", "Platform experiences"];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title={
          <>
            B&amp;D <span className="shimmer-text">Projects</span>
          </>
        }
        lead="We build websites, applications, internal tools, and platforms for real operations. The examples below are a small sample of the kinds of systems we build and illustrate the solutions they provide for our clients."
      />
      <section aria-label="Selected use cases with confidentiality context">
        <div className="dot-grid-bg relative overflow-hidden bg-bd-light-bg pt-16 pb-16 md:pt-20 md:pb-24" aria-labelledby="work-cases">
          <Container className="relative">
            <div className="w-full">
              <Reveal>
                <SectionTag>Selected Use Cases</SectionTag>
                <h2 id="work-cases" className="font-heading text-3xl font-bold md:text-4xl text-bd-light-text">
                  Illustrative use cases
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-bd-light-secondary">
                  Much of our work is internal, pre-release, or confidential. The examples below are illustrative
                  mockups and pattern-level descriptions rather than client screens or named case studies.
                </p>
              </Reveal>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:items-stretch">
              {workCases.map((item, i) => (
                <Reveal key={item.n} delay={i * 0.05} className="h-full">
                  <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-bd-light-border bg-white shadow-card transition hover:border-bd-accent/20 hover:shadow-card-hover">
                    <figure className="bd-work-preview shrink-0">
                      <figcaption className="bd-work-preview__label">Concept mockup</figcaption>
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
        </div>
      </section>
      <DarkParticleSection className="py-14 text-bd-dark-text" aria-label="Focus areas">
        <Container>
          <div className="w-full max-w-3xl">
            <Reveal>
              <h2
                id="work-focus-heading"
                className="font-heading text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-[-0.025em] text-white"
              >
                Where this work{" "}
                <span className="bd-home-cta-real-glow inline-block">
                  <span className="bd-home-cta-real-text">tends to land</span>
                </span>
              </h2>
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
      </DarkParticleSection>
      <ThroughLineSection />
      <ClosingBand deck="alt" aria-labelledby="work-cta-heading">
        <Reveal>
          <h2
            id="work-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-bd-light-text"
          >
            Ready to talk <span className="text-bd-accent">scope and fit?</span>
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Tell us what you&apos;re trying to ship. We&apos;ll respond with clear next steps.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-light"
          >
            <span>Start a Project</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </MagneticLink>
        </Reveal>
      </ClosingBand>
    </>
  );
}
