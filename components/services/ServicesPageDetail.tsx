import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { servicesPageOffers } from "@/lib/data";
import { ServiceIcon } from "./ServiceIcon";

/**
 * Inner services layout: editorial stack + sticky jump nav — not the home tilt card grid.
 * Copy and anchors align with legacy services.html.
 * First band is plain light; offerings block uses dot grid (staggered vs hero).
 */
export function ServicesPageDetail() {
  return (
    <>
      <section className="bg-bd-light-bg py-16 md:py-20" aria-labelledby="svc-detail-heading">
        <Container>
          <Reveal>
            <SectionTag>Services</SectionTag>
            <h2
              id="svc-detail-heading"
              className="font-heading text-2xl md:whitespace-nowrap font-bold tracking-tight text-bd-light-text sm:text-3xl md:text-4xl"
            >
              Services that fit your next step
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-bd-light-secondary">
              We help you choose a sensible first step, focus on what matters most, and leave room to grow without
              making things harder to manage later.
            </p>
          </Reveal>
        </Container>
      </section>
      <section className="dot-grid-bg py-16 md:py-24" aria-label="Service offerings list">
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16">
            <aside className="mb-10 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-bd-light-muted lg:hidden">
                On this page
              </p>
              <nav
                className="flex flex-wrap gap-2 lg:flex lg:flex-col lg:gap-0 lg:border-l lg:border-bd-light-border lg:pl-5"
                aria-label="Services on this page"
              >
                {servicesPageOffers.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-full border border-bd-light-border bg-white/80 px-3 py-1.5 text-left text-xs font-medium text-bd-light-secondary transition hover:border-bd-accent/30 hover:text-bd-accent lg:rounded-none lg:border-0 lg:bg-transparent lg:px-3 lg:py-2 lg:text-sm"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="space-y-12 md:space-y-16">
              {servicesPageOffers.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.03}>
                  <article
                    id={s.id}
                    className="scroll-mt-28 rounded-2xl border border-bd-light-border bg-white/90 p-6 shadow-card md:p-8"
                  >
                    <div className="flex flex-wrap items-start gap-5 md:gap-8">
                      <div className="flex shrink-0 items-center gap-4">
                        <span className="font-mono text-2xl font-bold tabular-nums text-bd-accent md:text-3xl">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[rgba(37,104,160,0.18)] bg-[rgba(37,104,160,0.08)]">
                          <ServiceIcon index={s.iconIndex} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-xl font-bold tracking-tight text-bd-light-text md:text-2xl">
                          {s.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-bd-light-secondary">{s.description}</p>
                        {"learnMoreHref" in s && s.learnMoreHref ? (
                          <p className="mt-4">
                            <Link
                              href={s.learnMoreHref}
                              className="text-sm font-semibold text-bd-accent underline-offset-2 hover:underline"
                            >
                              Learn more: {"learnMoreLabel" in s && s.learnMoreLabel ? s.learnMoreLabel : "Details"}
                            </Link>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
