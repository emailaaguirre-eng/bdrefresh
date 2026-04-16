import type { Metadata } from "next";
import { CodrexBand } from "@/components/about/CodrexBand";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { Reveal } from "@/components/motion/Reveal";
import { LightCtaBand } from "@/components/layout/LightCtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built beyond templates. B&D Servicing is full-stack development with a bias toward clarity, maintainability, and software that still makes sense after launch week.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Built Beyond Templates.
            <br />
            Designed for the <span className="shimmer-text">Way You Work.</span>
          </>
        }
        lead="Full-stack development with a bias toward clarity, maintainability, and software that still makes sense after launch week."
      />
      <section className="bg-bd-light-bg py-16 md:py-20" aria-labelledby="about-who">
        <Container>
          <Reveal>
            <SectionTag>Who we are</SectionTag>
            <h2 id="about-who" className="font-heading text-3xl font-bold md:text-4xl">
              Full-stack, with the long view
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-bd-light-secondary">
              B&amp;D Servicing is a full-stack development firm with over 10 years of experience building websites, web
              applications, and digital systems tailored to real business needs.
            </p>
          </Reveal>
          <Reveal className="mt-10 max-w-3xl space-y-4 text-bd-light-secondary">
            <p>
              The company combines strategy, design, development, and problem-solving to create solutions that are
              functional, scalable, and purposeful.
            </p>
            <p>
              B&amp;D focuses on building solutions that go beyond one-size-fits-all templates. Some projects are
              public-facing websites; others are custom tools, platforms, or systems built to support specific workflows
              and operational goals.
            </p>
            <p>
              We are not interested in shipping a brochure and disappearing. We want software your team can run, extend,
              and reason about.
            </p>
          </Reveal>
        </Container>
      </section>
      <section className="dot-grid-bg py-16 md:py-20" aria-labelledby="about-guide">
        <Container>
          <Reveal>
            <SectionTag>How we work</SectionTag>
            <h2 id="about-guide" className="font-heading text-3xl font-bold md:text-4xl">
              What guides our work
            </h2>
            <p className="mt-4 text-bd-light-secondary">A few principles that show up in every engagement.</p>
          </Reveal>
          <Reveal className="mt-10 max-w-3xl space-y-5 text-bd-light-secondary">
            <p>
              <strong className="text-bd-light-text">Outcomes first.</strong> We align on what “done” means for your
              users and your operators before we debate frameworks.
            </p>
            <p>
              <strong className="text-bd-light-text">Honest tradeoffs.</strong> Timeline, cost, and risk are part of the
              conversation early, not surprises after the deposit.
            </p>
            <p>
              <strong className="text-bd-light-text">Handoff that holds up.</strong> Documentation and structure matter:
              the next developer (or future you) should not need a séance to change the system.
            </p>
            <p>
              <strong className="text-bd-light-text">Calm execution.</strong> We prefer predictable delivery and clear
              checkpoints over theater and buzzwords.
            </p>
          </Reveal>
        </Container>
      </section>
      <CodrexBand>
        <Reveal>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent">
            [ CoDre-X ]
          </span>
          <h2 id="codrex-heading" className="mt-4 font-heading text-3xl font-bold text-bd-light-text md:text-4xl">
            Powered by CoDre-X
          </h2>
          <p className="mt-4 max-w-2xl text-bd-light-secondary">
            You’ll see this mark in our footer. It’s not a separate product pitch.
          </p>
        </Reveal>
        <Reveal className="mt-10 max-w-3xl space-y-4 leading-relaxed text-bd-light-secondary">
          <p className="text-bd-light-text">
            <strong>CoDre-X is the creative and technical engine behind B&amp;D Servicing.</strong> It represents the
            signature development approach behind the company’s work: thoughtful, custom-built, and focused on turning
            ideas into functional digital systems.
          </p>
          <p>
            In practice: when you see “Powered by CoDre-X” in the footer, it is a mark of that approach, not a separate
            product for sale.
          </p>
        </Reveal>
      </CodrexBand>
      <LightCtaBand aria-labelledby="about-cta-heading">
        <Reveal>
          <h2
            id="about-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-white"
          >
            Want to see if we&apos;re a <span className="text-bd-dark-bg">good fit?</span>
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-white/85">
            Share a bit about your project. We&apos;ll respond with clear next steps.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-bd-accent shadow-md transition hover:bg-bd-light-alt"
          >
            <span>Start a Project</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </MagneticLink>
        </Reveal>
      </LightCtaBand>
    </>
  );
}
