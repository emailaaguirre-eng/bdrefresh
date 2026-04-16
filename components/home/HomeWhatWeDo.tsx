import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

export function HomeWhatWeDo() {
  return (
    <section className="dot-grid-bg py-20 md:py-28" aria-labelledby="home-wwd-heading">
      <Container>
        <Reveal>
          <SectionTag>What We Do</SectionTag>
          <h2 id="home-wwd-heading" className="font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
            Development-first.
            <br />
            Outcome-driven.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-bd-light-secondary">
            B&amp;D Servicing builds modern websites and custom web applications end-to-end, from web design and
            graphic design to website copywriting and SEO. We handle front-end, back-end, databases, integrations,
            and deployment so everything works together cleanly—especially when the result has to hold up in day-to-day
            operations, not just at launch.
          </p>
          <Link
            href="/what-we-do"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-bd-accent hover:text-bd-accent-dark"
          >
            How we work <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
