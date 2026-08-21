import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { WhatWeDoBody } from "@/components/what-we-do/WhatWeDoBody";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Development-first, outcome-driven work: end-to-end ownership from design through deployment, shaped around how your team actually operates.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Clear ownership. Software that still makes sense after launch
          </>
        }
        lead="We clarify the outcome, shape the system around real operations, and keep design, engineering, and deployment on one thread, so the result holds up in day-to-day use."
      />
      <WhatWeDoBody />
      <ClosingBand deck="white" aria-labelledby="wwd-cta-heading">
        <Reveal>
          <h2
            id="wwd-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-bd-light-text"
          >
            See how we&apos;d own the <span className="text-bd-accent">thread</span>
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Describe the outcome you need after launch week. We&apos;ll show how design, engineering, and delivery stay on one path.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark"
          >
            <span>Map the approach</span>
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
