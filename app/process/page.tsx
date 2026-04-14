import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { DarkCtaBand } from "@/components/layout/DarkCtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeroWithWeb } from "@/components/layout/PageHeroWithWeb";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Discovery, build, test and launch, and improve — a straightforward rhythm with clear checkpoints and honest communication.",
};

const phases = [
  {
    tag: "Phase 01",
    title: "Discovery",
    blocks: [
      {
        label: "What happens",
        text: "We clarify goals, constraints, users, and success criteria. We map current workflows, data sources, and integrations so the architecture matches reality, not assumptions.",
      },
      {
        label: "Why it matters",
        text: "Most expensive rework traces back to fuzzy requirements. Discovery front-loads the hard questions so build time is spent shipping, not undoing.",
      },
      {
        label: "Outcome",
        text: "A shared picture of scope, risks, and milestones you can plan around.",
      },
    ],
  },
  {
    tag: "Phase 02",
    title: "Build",
    blocks: [
      {
        label: "What happens",
        text: "We implement the UI, application logic, database layer, and integrations in tight loops, with regular checkpoints so you see progress, not a black box.",
      },
      {
        label: "Why it matters",
        text: "Custom software only wins if it’s maintainable. We favor clear structure, sensible defaults, and documentation your team can grow into.",
      },
      {
        label: "Outcome",
        text: "Working software in staging that reflects agreed scope and is ready for hardening.",
      },
    ],
  },
  {
    tag: "Phase 03",
    title: "Test & Launch",
    blocks: [
      {
        label: "What happens",
        text: "QA passes, edge cases, performance checks, and a controlled go-live. We verify backups, monitoring hooks, and rollback paths where they matter.",
      },
      {
        label: "Why it matters",
        text: "Launch day shouldn’t be the first time someone tries the critical path. Testing reduces surprises for your team and your customers.",
      },
      {
        label: "Outcome",
        text: "Production deployment with confidence, plus a short stabilization window to catch real-world nuances.",
      },
    ],
  },
  {
    tag: "Phase 04",
    title: "Improve",
    blocks: [
      {
        label: "What happens",
        text: "We measure, tune, and extend: performance work, feature increments, and operational hardening based on real usage.",
      },
      {
        label: "Why it matters",
        text: "The first release is not the finish line. Software that improves calmly over time protects your investment.",
      },
      {
        label: "Outcome",
        text: "A living system with a clear path for the next iteration.",
      },
    ],
  },
] as const;

export default function ProcessPage() {
  return (
    <>
      <PageHeroWithWeb
        eyebrow="Process"
        title={
          <>
            From idea to <span className="shimmer-text">production</span>
          </>
        }
        lead="A straightforward rhythm: discovery, build, test and launch, improve. You always know what stage you’re in and what comes next."
      />
      {phases.map((phase, pi) => (
        <section
          key={phase.title}
          className={pi % 2 === 0 ? "bg-bd-light-bg py-16 md:py-20" : "dot-grid-bg py-16 md:py-20"}
          aria-labelledby={`phase-${pi}`}
        >
          <Container>
            <Reveal delay={pi * 0.04}>
              <SectionTag>{phase.tag}</SectionTag>
              <h2 id={`phase-${pi}`} className="font-heading text-3xl font-bold md:text-4xl">
                {phase.title}
              </h2>
              <div className="mt-8 max-w-3xl space-y-6">
                {phase.blocks.map((b) => (
                  <div key={b.label}>
                    <p className="font-heading text-sm font-bold text-bd-accent">{b.label}</p>
                    <p className="mt-2 text-bd-light-secondary">{b.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      ))}
      <DarkCtaBand withParticles={false} aria-labelledby="process-cta-heading">
        <Reveal>
          <h2
            id="process-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-white"
          >
            Ready to start <span className="text-bd-accent-lighter">phase one?</span>
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-dark-muted">
            Tell us what you&apos;re trying to fix or launch. We&apos;ll map the right sequence.
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
