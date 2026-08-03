import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { ServicesPageDetail } from "@/components/services/ServicesPageDetail";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What we offer: website builds, custom web applications, internal tools, integrations, managed hosting, website care, SEO, copy, and design.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            What we <span className="shimmer-text">offer</span>
          </>
        }
        lead="Website builds, custom applications, internal tools, integrations, managed hosting, website care, SEO, copy, and design, scoped to fit the business clearly, run reliably, and grow without becoming hard to manage."
      />
      <ServicesPageDetail />
      <ClosingBand deck="alt" aria-labelledby="svc-cta-heading">
        <Reveal>
          <h2
            id="svc-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-bd-light-text"
          >
            Not sure <span className="text-bd-accent-lighter">where to start</span>?
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Describe the problem. We&apos;ll recommend a sane starting point.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark"
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
