import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { HostingInfrastructureBody } from "@/components/services/HostingInfrastructureBody";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Hosting & Infrastructure",
  description:
    "Managed hosting, website monitoring, website care, and SEO Care so your site stays online, maintained, and supported after launch. Business-hours support. Rankings are not guaranteed.",
};

export default function HostingInfrastructurePage() {
  return (
    <>
      <PageHero
        eyebrow="Hosting & Infrastructure"
        title={
          <>
            Hosting, monitoring, and <span className="shimmer-text">website care</span>
          </>
        }
        lead="Your website should not become another thing you have to worry about. We help keep it available, maintained, protected, and ready for customers while giving you one place to stay informed."
        actions={
          <>
            <MagneticLink
              href="/start-project"
              className="bd-btn-magnetic inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent-lighter"
            >
              <span>Talk With Us</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </MagneticLink>
            <a
              href="#hosting-plans"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent-lighter"
            >
              View Plans
            </a>
          </>
        }
      />
      <HostingInfrastructureBody />
      <ClosingBand deck="white" aria-labelledby="hosting-cta-heading">
        <Reveal>
          <h2
            id="hosting-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-bd-light-text"
          >
            Want a practical mix for a <span className="text-bd-accent">live site</span>?
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Send your current hosting and care situation. We will recommend only the layers you need, not a full stack by default.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticLink
              href="/start-project"
              className="bd-btn-magnetic inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
            >
              <span>Contact Us</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </MagneticLink>
            <ButtonLink href="/services/all" variant="outline" className="bd-btn-magnetic">
              See All Services & Packages
            </ButtonLink>
          </div>
        </Reveal>
      </ClosingBand>
    </>
  );
}
