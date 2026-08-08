import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { HostingOverviewRail } from "@/components/services/HostingOverviewRail";
import { PortalFeatureExplorer } from "@/components/services/PortalFeatureExplorer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import {
  aLaCarteServices,
  commonImpactServices,
  hostingIncluded,
  hostingLimits,
  monitoringAreas,
  seoCareTiers,
  websiteCarePoints,
} from "@/lib/hostingPage";

const pageNav = [
  { href: "#hosting-overview", label: "Overview" },
  { href: "#hosting-portal", label: "Client Portal" },
  { href: "#hosting-managed", label: "Managed Hosting" },
  { href: "#hosting-monitoring", label: "Monitoring" },
  { href: "#hosting-care", label: "Website Care" },
  { href: "#hosting-seo", label: "SEO Care" },
  { href: "#hosting-plans", label: "Packages" },
] as const;

/**
 * Hosting & Infrastructure body: customer-friendly operations narrative
 * with portal, hosting, monitoring, care, SEO, and plan pricing.
 */
export function HostingInfrastructureBody() {
  return (
    <>
      <section
        id="hosting-overview"
        className="scroll-mt-28 border-b border-bd-light-border/80 bg-white py-14 md:py-16"
        aria-labelledby="hosting-intro-heading"
      >
        <Container>
          <Reveal>
            <SectionTag>After launch</SectionTag>
            <h2
              id="hosting-intro-heading"
              className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl lg:text-[2.35rem] lg:leading-tight"
            >
              Everything your site needs once it&apos;s live
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-bd-light-secondary">
              Launching your website is only the beginning. B&amp;D Servicing brings hosting, website care,
              monitoring, and SEO support together so you are not coordinating several disconnected vendors. You
              receive one team, one support relationship, and one place to stay informed about your website.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-10">
              <HostingOverviewRail />
            </div>
          </Reveal>

          <nav
            className="mt-10 flex flex-wrap gap-2 border-t border-bd-light-border pt-8 lg:mt-12"
            aria-label="On this page"
          >
            {pageNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-bd-light-border bg-bd-light-bg/80 px-3.5 py-1.5 text-xs font-medium text-bd-light-secondary transition hover:border-bd-accent/35 hover:text-bd-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent md:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <section
        id="hosting-portal"
        className="scroll-mt-28 bg-bd-light-alt py-16 md:py-24"
        aria-labelledby="portal-heading"
      >
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <SectionTag>Client Portal</SectionTag>
              <h2
                id="portal-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl"
              >
                Stay connected to your website
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">
                Managed clients receive access to a private portal where they can review website activity, reports,
                requests, approvals, and ongoing service information.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <PortalFeatureExplorer />
          </Reveal>
        </Container>
      </section>

      <section
        id="hosting-cover"
        className="scroll-mt-28 bg-white py-16 md:py-24"
        aria-labelledby="common-services-heading"
      >
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionTag>Most requested</SectionTag>
              <h2
                id="common-services-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl"
              >
                What clients ask for the most
              </h2>
            </Reveal>

            <ol className="relative mt-12 list-none space-y-0 p-0 lg:mt-0" aria-label="Common infrastructure outcomes">
              <div
                className="pointer-events-none absolute left-[0.7rem] top-3 bottom-3 hidden w-px bg-gradient-to-b from-bd-accent/25 via-bd-accent/30 to-bd-accent/15 md:block"
                aria-hidden
              />
              {commonImpactServices.map((item, i) => (
                <li key={item.title} className="relative md:pl-11">
                  <Reveal delay={i * 0.05}>
                    <span
                      className="absolute left-0 top-8 hidden h-3 w-3 rounded-full border-2 border-bd-accent bg-white shadow-[0_0_0_4px_rgba(37,104,160,0.12)] md:block"
                      aria-hidden
                    />
                    <article className="border-b border-bd-light-border py-8 first:pt-0 last:border-b-0 last:pb-0 md:py-9">
                      <p className="font-mono text-xs font-bold text-bd-accent">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-bd-light-text">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[1.05rem] leading-relaxed text-bd-light-secondary">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section
        id="hosting-managed"
        className="scroll-mt-28 bg-bd-light-alt py-16 md:py-24"
        aria-labelledby="managed-hosting-heading"
      >
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-x-14 xl:gap-x-20">
            <div>
              <Reveal>
                <SectionTag>Managed Hosting</SectionTag>
                <h2
                  id="managed-hosting-heading"
                  className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl"
                >
                  We keep your website online, protected, and maintained
                </h2>
                <p className="mt-6 text-[1.05rem] leading-relaxed text-bd-light-secondary">
                  Our managed hosting service includes the essentials needed to keep your website running smoothly. From
                  backups and SSL certificates to monitoring and platform maintenance, we handle the technical side so
                  you can focus on your business.
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <h3 className="mt-12 font-heading text-lg font-bold text-bd-light-text">
                  Included with the Standard Managed Hosting Plan
                </h3>
                <ul className="mt-5 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2">
                  {hostingIncluded.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.98rem] leading-snug text-bd-light-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bd-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <aside
                className="relative mt-12 overflow-hidden border border-bd-light-border bg-white shadow-[0_18px_50px_-32px_rgba(37,104,160,0.45)] lg:mt-0"
                aria-labelledby="hosting-limits-heading"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-bd-accent" aria-hidden />
                <div className="p-7 md:p-8">
                <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bd-accent">
                  Standard plan
                </p>
                <h3 id="hosting-limits-heading" className="mt-3 font-heading text-2xl font-bold text-bd-light-text">
                  $149/month
                </h3>
                <p className="mt-2 text-sm text-bd-light-muted">
                  $99/month when combined with another qualifying plan
                </p>
                <p className="mt-4 text-sm leading-relaxed text-bd-light-secondary">
                  Typical limits for the standalone plan. Staging is included only when supported by the hosting
                  environment.
                </p>
                <dl className="mt-8 space-y-0">
                  {hostingLimits.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-6 border-t border-bd-light-border py-3.5 first:border-t-0 first:pt-0"
                    >
                      <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-bd-light-muted">
                        {row.label}
                      </dt>
                      <dd className="text-right text-sm font-semibold text-bd-light-text">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 border-t border-bd-light-border pt-5 text-sm leading-relaxed text-bd-light-secondary">
                  Larger, high-traffic, ecommerce, membership, or application-based websites may require custom hosting.
                </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        id="hosting-monitoring"
        className="scroll-mt-28 bg-white py-16 md:py-24"
        aria-labelledby="monitoring-heading"
      >
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <SectionTag>Website Monitoring</SectionTag>
              <h2
                id="monitoring-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl"
              >
                Monitoring that keeps an eye on your site
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">
                We monitor important website and infrastructure signals so issues can be identified, documented, and
                reviewed before they quietly become larger problems.
              </p>
              <div className="mt-8 space-y-3 text-[1.02rem] leading-relaxed text-bd-light-secondary">
                <p>
                  <span className="font-semibold text-bd-light-text">Automated monitoring</span> watches supported signals
                  around the clock.
                </p>
                <p>
                  <span className="font-semibold text-bd-light-text">Business-hours review and support</span> is when our
                  team investigates and responds, unless another service level is specifically included.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-10 border border-bd-light-border bg-[#0e141c] p-4 lg:mt-0">
                <div className="mb-3 flex items-center justify-between gap-3 px-1">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#8fa3b8]">signal board</p>
                  <p className="font-mono text-[0.65rem] text-emerald-400/90">watching</p>
                </div>
                <ul className="grid list-none gap-2 p-0 sm:grid-cols-2" aria-label="Monitored areas">
                  {monitoringAreas.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border border-[#243041] bg-[#121922] px-3.5 py-3 text-[0.92rem] leading-snug text-[#c2d0e0]"
                    >
                      <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden>
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 motion-reduce:animate-none" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        id="hosting-care"
        className="scroll-mt-28 bg-bd-light-alt py-16 md:py-24"
        aria-labelledby="website-care-heading"
      >
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <Reveal>
              <SectionTag>Website Care</SectionTag>
              <h2
                id="website-care-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl"
              >
                Ongoing care for the website
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">
                Websites need regular attention after launch. Website Care covers approved updates, routine maintenance,
                minor fixes, and documented work so the site does not slowly become outdated or unreliable.
              </p>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
                The client portal provides proof of work, reports, requests, and status visibility. Redesigns, new
                functionality, large content additions, and major integrations may require a separate quote or change
                order.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="relative mt-10 overflow-hidden border border-bd-light-border bg-white shadow-[0_16px_40px_-28px_rgba(37,104,160,0.35)] lg:mt-0">
                <div className="absolute inset-y-0 left-0 w-1 bg-bd-accent" aria-hidden />
                <ul className="list-none space-y-0 p-0">
                  {websiteCarePoints.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-bd-light-border px-5 py-4 text-[0.98rem] leading-snug text-bd-light-secondary last:border-b-0"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bd-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-bd-light-border px-5 py-4 font-mono text-sm font-semibold text-bd-accent">
                  From $349/month
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        id="hosting-seo"
        className="scroll-mt-28 bg-white py-16 md:py-24"
        aria-labelledby="seo-care-heading"
      >
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <SectionTag>SEO Care</SectionTag>
              <h2
                id="seo-care-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl"
              >
                Ongoing SEO built on a strong foundation
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">
                SEO is an ongoing process, not a one-time switch. Our SEO Care plans focus on the structure, technical
                health, content organization, and local signals that help search engines understand your business.
              </p>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
                <span className="font-semibold text-bd-light-text">
                  Rankings, traffic, and leads are not guaranteed.
                </span>
              </p>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
                Unless separately included, these plans do not include ongoing blog writing, large keyword campaigns,
                backlink outreach, competitor research programs, or daily Google Business Profile management.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 overflow-hidden border border-bd-light-border shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)]">
            <div className="hidden border-b border-bd-light-border bg-[#0e141c] px-6 py-3 sm:grid sm:grid-cols-[minmax(0,1.1fr)_minmax(0,7.5rem)_minmax(0,1.4fr)] sm:gap-6">
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-[#8fa3b8]">
                Plan
              </p>
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-[#8fa3b8]">
                From
              </p>
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-[#8fa3b8]">
                Focus
              </p>
            </div>
            <ul className="list-none divide-y divide-bd-light-border bg-white p-0">
              {seoCareTiers.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.03}>
                  <li className="px-6 py-5 transition hover:bg-bd-light-bg/50 sm:grid sm:grid-cols-[minmax(0,1.1fr)_minmax(0,7.5rem)_minmax(0,1.4fr)] sm:items-start sm:gap-6 sm:py-6">
                    <h3 className="font-heading text-lg font-bold text-bd-light-text">{tier.name}</h3>
                    <p className="mt-1 font-mono text-sm font-semibold text-bd-accent sm:mt-0.5">{tier.price}</p>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-bd-light-secondary sm:mt-0.5">
                      {tier.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        id="hosting-plans"
        className="scroll-mt-28 bg-bd-light-alt py-16 md:py-24"
        aria-labelledby="a-la-carte-heading"
      >
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionTag>A la carte</SectionTag>
              <h2
                id="a-la-carte-heading"
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl"
              >
                Service packages
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">
                These services are available a la carte, so you can start with what you need now. Larger or more complex
                environments may require separate scoping.
              </p>
              <div className="mt-8">
                <ButtonLink href="/services/all" className="bd-btn-magnetic">
                  See All Services & Packages
                </ButtonLink>
              </div>
            </Reveal>

            <div className="mt-12 lg:mt-0">
              <ul className="list-none divide-y divide-bd-light-border border border-bd-light-border bg-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.28)] p-0">
                {aLaCarteServices.map((svc, i) => (
                  <Reveal key={svc.name} delay={i * 0.03}>
                    <li className="px-6 py-6 transition hover:bg-bd-light-bg/40 md:px-7 md:py-7">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                        <h3 className="font-heading text-xl font-bold text-bd-light-text">{svc.name}</h3>
                        <p className="shrink-0 font-mono text-sm font-semibold text-bd-accent">{svc.price}</p>
                      </div>
                      {svc.note ? <p className="mt-1 text-sm text-bd-light-muted">{svc.note}</p> : null}
                      <p className="mt-2 text-[1.02rem] leading-relaxed text-bd-light-secondary">{svc.description}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={0.08}>
                <div className="mt-4 border border-bd-light-border bg-white px-6 py-6 md:px-7 md:py-7">
                  <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bd-accent">
                    Need a lean set of plans?
                  </p>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-bd-light-secondary">
                    You do not need every package. We can review your site and help determine the right mix of hosting,
                    care, monitoring, and SEO support to manage it well without adding services you do not need.
                  </p>
                  <p className="mt-4">
                    <Link
                      href="/start-project"
                      className="font-semibold text-bd-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
                    >
                      Talk with us about the right mix
                    </Link>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
