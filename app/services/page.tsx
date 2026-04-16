import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { LightCtaBand } from "@/components/layout/LightCtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { ServicesPageDetail } from "@/components/services/ServicesPageDetail";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A practical buying guide: custom apps, internal tools, integrations, launch and improve, copy, SEO, and design—who each is for, typical scope, and where risk drops.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            What we build <span className="shimmer-text">with you</span>
          </>
        }
        lead="Seven practice areas, one bar for execution: clear fit, honest tradeoffs, and software your team can run day to day—not a separate pile of mystery phases."
      />
      <ServicesPageDetail />
      <LightCtaBand aria-labelledby="svc-cta-heading">
        <Reveal>
          <h2
            id="svc-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-bd-light-text"
          >
            Not sure which <span className="text-bd-accent-lighter">service fits</span>?
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Describe the problem. We&apos;ll recommend a sane starting point.
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
      </LightCtaBand>
    </>
  );
}
