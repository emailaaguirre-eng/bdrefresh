import type { Metadata } from "next";
import { AboutBody } from "@/components/about/AboutBody";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { Reveal } from "@/components/motion/Reveal";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built beyond templates. B&D Servicing is end-to-end development with a bias toward clarity, maintainability, and software that still makes sense after launch week.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        environment={{ intensity: "editorial", layout: "epsilon" }}
        title={
          <>
            Built beyond templates, designed for{" "}
            <span className="text-bd-accent">the way you work.</span>
          </>
        }
        lead="B&D Servicing builds digital applications, internal tools, and systems shaped around real business needs."
      />
      <AboutBody />
      <ClosingBand deck="alt" aria-labelledby="about-cta-heading">
        <Reveal>
          <h2
            id="about-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-bd-light-text"
          >
            Prefer a team that finishes <span className="text-bd-accent">past launch week</span>?
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Introduce the business and the outcome you need. We&apos;ll reply with whether we&apos;re the right fit and what a first step looks like.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark"
          >
            <span>Introduce your project</span>
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
