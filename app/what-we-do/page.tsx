import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { WhatWeDoBody } from "@/components/what-we-do/WhatWeDoBody";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Full-stack development for real operations: custom websites, applications, internal tools, and systems shaped around business needs.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Websites, tools, and integrations that help the <span className="shimmer-text">work move</span>
          </>
        }
        lead="End-to-end development with a bias toward clarity, maintainability, and software that still makes sense after launch week."
      />
      <WhatWeDoBody />
      <ClosingBand deck="white" aria-labelledby="wwd-cta-heading">
        <Reveal>
          <h2
            id="wwd-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-bd-light-text"
          >
            Talk through your <span className="text-bd-accent">next build</span>
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Share where you are today and where you want to be. We&apos;ll help you map a sensible path.
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
