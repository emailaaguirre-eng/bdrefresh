import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { ProcessPageContent } from "@/components/process/ProcessPageContent";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { processPagePhases } from "@/lib/process-page-phases";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Discovery, build, test and launch, and improve: a straightforward rhythm with clear checkpoints and honest communication.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title={
          <>
            <span className="md:whitespace-nowrap">
              From idea to production
            </span>
          </>
        }
        lead="A straightforward rhythm: discovery, build, test and launch, improve. You always know what stage you’re in and what comes next."
      />
      <ProcessPageContent phases={processPagePhases} />
      <ClosingBand deck="alt" aria-labelledby="process-cta-heading">
        <Reveal>
          <h2
            id="process-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-bd-light-text"
          >
            Ready for a clear <span className="text-bd-accent">discovery</span>?
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Bring the goal, constraints, and timeline. We&apos;ll outline discovery, build, launch, and improve in plain steps.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark"
          >
            <span>Begin discovery</span>
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
