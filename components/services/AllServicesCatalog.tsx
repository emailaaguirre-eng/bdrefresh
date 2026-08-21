import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { catalogGroups, type CatalogGroup, type CatalogItem } from "@/lib/allServicesPage";

function PlanRow({ item, index }: { item: CatalogItem; index: number }) {
  return (
    <li className="group relative border-b border-bd-light-border last:border-b-0">
      <div className="relative px-5 py-7 transition-colors md:px-8 md:py-8 group-hover:bg-[rgba(37,104,160,0.03)]">
        <span
          className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-bd-accent transition-transform duration-300 group-hover:scale-y-100"
          aria-hidden
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[0.72rem] font-bold tabular-nums tracking-wider text-bd-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-editorial text-lg font-bold tracking-tight text-bd-light-text md:text-xl">
                {item.name}
              </h3>
            </div>
            {item.note ? (
              <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-bd-light-secondary">{item.note}</p>
            ) : null}
            <p className={`${item.note ? "mt-2" : "mt-3"} max-w-2xl text-[1.02rem] leading-relaxed text-bd-light-secondary`}>
              {item.description}
            </p>
            {item.href ? (
              <p className="mt-4">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-bd-accent underline-offset-2 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
                >
                  {item.hrefLabel ?? "Learn more"}
                  <span aria-hidden className="translate-y-px text-bd-accent/70">
                    →
                  </span>
                </Link>
              </p>
            ) : null}
          </div>
          {item.price ? (
            <p className="shrink-0 font-mono text-sm font-semibold tracking-tight text-bd-accent sm:pt-0.5 sm:text-right">
              {item.price}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function CatalogSection({ group, index }: { group: CatalogGroup; index: number }) {
  const surface = index % 2 === 0 ? "bg-white" : "bg-bd-light-bg";

  return (
    <section
      id={group.id}
      className={`scroll-mt-28 border-t border-bd-light-border/70 ${surface} py-14 md:py-20`}
      aria-labelledby={`${group.id}-heading`}
    >
      <Container>
        <div className="lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start lg:gap-x-14 xl:gap-x-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="max-w-md">
              <SectionTag>{group.title}</SectionTag>
              <h2
                id={`${group.id}-heading`}
                className="mt-1 font-heading text-2xl font-bold tracking-tight text-bd-light-text md:text-3xl lg:text-[2rem] lg:leading-tight"
              >
                {group.heading ?? group.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-bd-light-secondary md:text-[1.05rem]">
                {group.lede}
              </p>
              <p className="mt-5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-bd-light-muted">
                {group.items.length} {group.items.length === 1 ? "plan" : "plans"}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 lg:mt-0">
            <ul className="list-none overflow-hidden border border-bd-light-border bg-white shadow-[0_18px_48px_-36px_rgba(15,23,42,0.35)] p-0">
              {group.items.map((item, i) => (
                <Reveal key={item.id} delay={Math.min(i * 0.025, 0.18)}>
                  <PlanRow item={item} index={i} />
                </Reveal>
              ))}
            </ul>

            {group.footerNote ? (
              <Reveal delay={0.08}>
                <div className="mt-5 border border-bd-light-border bg-white px-6 py-6 md:px-7">
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-bd-accent">
                    Next step
                  </p>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-bd-light-secondary">
                    {group.footerHref ? (
                      <>
                        <Link
                          href={group.footerHref}
                          className="font-semibold text-bd-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
                        >
                          {group.footerLinkLabel ?? "Contact us"}
                        </Link>
                        {" to discuss the scope of your project and provide a clear quote."}
                      </>
                    ) : (
                      group.footerNote
                    )}
                  </p>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Full services & packages catalog: editorial plan lists, not a default card dashboard.
 */
export function AllServicesCatalog() {
  return (
    <>
      <nav
        className="sticky top-0 z-20 border-b border-bd-light-border/80 bg-white/90 backdrop-blur-md"
        aria-label="Jump to a catalog section"
      >
        <Container>
          <div className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {catalogGroups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="shrink-0 rounded-full border border-bd-light-border bg-bd-light-bg/80 px-3.5 py-1.5 text-xs font-medium text-bd-light-secondary transition hover:border-bd-accent/40 hover:text-bd-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent md:text-sm"
              >
                {g.title}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {catalogGroups.map((group, i) => (
        <CatalogSection key={group.id} group={group} index={i} />
      ))}
    </>
  );
}
