import type { Metadata } from "next";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { ServicesPageDetail } from "@/components/services/ServicesPageDetail";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Build sites, custom apps and tools, and brand. After launch: managed hosting, website care, and SEO Care. Full plans and packages on the catalog.",
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
        lead="Build when you need a site, application platform, or brand foundation. After launch, we host, care for, and support the live site. Plans and prices are listed in the full catalog."
      />
      <ServicesPageDetail />
      <ClosingBand deck="alt" aria-labelledby="svc-cta-heading">
        <Reveal>
          <h2
            id="svc-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-bd-light-text"
          >
            Need a build, or care for what&apos;s <span className="text-bd-accent-lighter">already live</span>?
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            Tell us what you&apos;re launching or keeping online. We&apos;ll point you to the right product line, not every SKU at once.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark"
          >
            <span>Talk through fit</span>
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
