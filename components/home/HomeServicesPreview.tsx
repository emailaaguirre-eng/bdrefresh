import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { HomeServicesGrid } from "@/components/home/HomeServicesGrid";

/** Home `#services` — few entry doors into the full services menu. */
export function HomeServicesPreview() {
  return (
    <section
      className="relative overflow-hidden bg-bd-light-alt py-24 md:py-[110px]"
      id="services"
      aria-labelledby="home-svc-heading"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-[450px] w-[450px] rounded-full bg-[rgba(37,104,160,0.06)] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-24 left-[-100px] h-[350px] w-[350px] rounded-full bg-[rgba(46,196,162,0.04)] blur-[80px]" />
      <Container className="relative">
        <Reveal>
          <h2 id="home-svc-heading" className="font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
            What We Offer
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bd-light-secondary md:text-base">
            Start with how you want to build, or how you want the live site cared for. Full service list and plans are one
            click away.
          </p>
        </Reveal>
        <HomeServicesGrid />
        <Reveal delay={0.12}>
          <p className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-bd-accent hover:text-bd-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
            >
              See all services
              <span aria-hidden>→</span>
            </Link>
            <span className="mx-3 text-bd-light-muted" aria-hidden>
              ·
            </span>
            <Link
              href="/services/all"
              className="inline-flex items-center gap-2 text-sm font-semibold text-bd-accent hover:text-bd-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
            >
              Plans &amp; packages
              <span aria-hidden>→</span>
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
