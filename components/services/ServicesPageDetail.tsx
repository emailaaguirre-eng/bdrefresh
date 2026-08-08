import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { servicesPageGroups } from "@/lib/data";
import { ServicesOfferCard } from "./ServicesOfferCard";

/**
 * Services product map: Build vs After launch.
 * Jump nav is always a single vertical list (no wrap chips).
 * Offer cards reuse the home services tilt / glow surface.
 */
export function ServicesPageDetail() {
  return (
    <section
      className="relative overflow-hidden bg-bd-light-alt py-16 md:py-24"
      aria-labelledby="svc-list-heading"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-[450px] w-[450px] rounded-full bg-[rgba(37,104,160,0.06)] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-24 right-[-80px] h-[350px] w-[350px] rounded-full bg-[rgba(46,196,162,0.04)] blur-[80px]" />

      <Container className="relative">
        <Reveal>
          <SectionTag>On this page</SectionTag>
          <h2
            id="svc-list-heading"
            className="mt-3 font-heading text-2xl font-bold tracking-tight text-bd-light-text sm:text-3xl md:text-4xl"
          >
            How we group the work
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-bd-light-secondary md:text-[1.05rem]">
            Build first when you need a site, application, or brand foundation. After launch, focus on hosting, care, and
            search readiness. Plans and prices live in the full catalog.
          </p>
        </Reveal>

        <div className="mt-10 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:items-start lg:gap-x-12 xl:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] xl:gap-x-16">
          <aside className="mb-10 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
            <nav
              className="border-l border-bd-light-border pl-4"
              aria-label="Jump to a section"
            >
              <ul className="m-0 list-none space-y-5 p-0">
                {servicesPageGroups.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`#${g.id}`}
                      className="block text-sm font-semibold text-bd-accent transition hover:text-bd-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
                    >
                      {g.label}
                    </a>
                    <ul className="mt-2 list-none space-y-1.5 p-0 pl-0">
                      {g.items.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="block text-sm leading-snug text-bd-light-secondary transition hover:text-bd-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
                          >
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                <li className="border-t border-bd-light-border pt-4">
                  <a
                    href="/services/all"
                    className="block text-sm font-medium text-bd-light-secondary transition hover:text-bd-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
                  >
                    All plans &amp; packages
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <div className="space-y-14 md:space-y-16">
            {servicesPageGroups.map((group, groupIndex) => {
              const offerBase = servicesPageGroups
                .slice(0, groupIndex)
                .reduce((n, g) => n + g.items.length, 0);

              return (
              <div key={group.id} id={group.id} className="scroll-mt-28 space-y-8">
                <Reveal>
                  <SectionTag>{group.label}</SectionTag>
                  <h3 className="mt-2 font-heading text-xl font-bold tracking-tight text-bd-light-text md:text-2xl">
                    {group.heading}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-bd-light-secondary">{group.lede}</p>
                </Reveal>
                <div className="space-y-6 md:space-y-8">
                  {group.items.map((item, itemIndex) => {
                    const index = offerBase + itemIndex;
                    return (
                      <Reveal key={item.id} delay={Math.min(index * 0.04, 0.16)}>
                        <ServicesOfferCard item={item} index={index} />
                      </Reveal>
                    );
                  })}
                </div>
              </div>
              );
            })}

            <Reveal delay={0.08}>
              <div
                className="bd-service-card relative rounded-2xl border border-bd-light-border bg-bd-light-card p-6 shadow-card md:p-8"
                aria-labelledby="all-services-cta-heading"
              >
                <div className="bd-service-card-glow" aria-hidden />
                <div className="relative">
                  <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bd-accent">
                    Full catalog
                  </p>
                  <h3
                    id="all-services-cta-heading"
                    className="mt-2 font-heading text-xl font-bold tracking-tight text-bd-light-text md:text-2xl"
                  >
                    See all services &amp; packages
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-bd-light-secondary">
                    Starting prices and every standalone plan: project lines, CPBs, Managed Hosting, Website Care, SEO Care,
                    monitoring, support, and packages like Complete Care.
                  </p>
                  <p className="mt-5 flex flex-wrap gap-4">
                    <Link
                      href="/services/all"
                      className="inline-flex items-center gap-2 rounded-xl bg-bd-accent px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
                    >
                      View all plans &amp; packages
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                    <Link
                      href="/services/hosting"
                      className="inline-flex items-center gap-2 self-center text-sm font-semibold text-bd-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
                    >
                      Hosting &amp; care story →
                    </Link>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
