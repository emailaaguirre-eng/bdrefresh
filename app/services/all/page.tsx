import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { AllServicesCatalog } from "@/components/services/AllServicesCatalog";

export const metadata: Metadata = {
  title: "All Services & Packages",
  description:
    "Full list of B&D Servicing services and plans: project work, Custom Platform Builds (CPBs), Managed Hosting, Website Care, monitoring, SEO Care, support, and packages. Plain language; scope confirmed at quote.",
};

export default function AllServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Catalog"
        environment={{ intensity: "default", layout: "beta" }}
        title={
          <>
            All <span className="text-bd-accent">services &amp; packages</span>
          </>
        }
        lead="Every service and plan we offer, clearly listed so you can compare what stands alone and what comes as a package, including Custom Platform Builds: industry-specific platforms with a prebuilt back end and a semi-custom front end. Choose what fits now without buying extras you do not need."
      />
      <AllServicesCatalog />
      <ClosingBand deck="alt" aria-labelledby="all-svc-cta-heading">
        <Reveal>
          <h2
            id="all-svc-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-bd-light-text"
          >
            Ready to price against a real <span className="text-bd-accent">scope</span>?
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Share what you circled on this list and how the business runs today. We will confirm a lean package and a clear number.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark"
          >
            <span>Request a quote</span>
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
