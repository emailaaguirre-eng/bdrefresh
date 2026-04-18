import type { Metadata } from "next";
import { AboutBody } from "@/components/about/AboutBody";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { Reveal } from "@/components/motion/Reveal";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { PageHero } from "@/components/layout/PageHero";

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
      <AboutBody />
      <ClosingBand deck="alt" aria-labelledby="about-cta-heading">
        <Reveal>
          <h2
            id="about-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-bd-light-text"
          >
            Want to see if we&apos;re a <span className="text-bd-accent">good fit?</span>
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Share a bit about your project. We&apos;ll respond with clear next steps.
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
