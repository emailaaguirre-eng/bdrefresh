import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

export function HomeWhatWeDo() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="home-wwd-heading">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_minmax(0,20rem)] md:gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
          <Reveal>
            <SectionTag>What We Do</SectionTag>
            <h2 id="home-wwd-heading" className="font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
              Development-first.
              <br />
              Outcome-driven.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">
              We take end-to-end ownership of digital work: clarify the outcome, shape the system around how people
              actually operate, and ship something your team can run, not a handoff that falls apart after launch week.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-bd-light-secondary">
              Design, content, engineering, integrations, and deployment stay on one thread so permissions, workflows,
              and data stay coherent in day-to-day use.
            </p>
            <Link
              href="/what-we-do"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-bd-accent hover:text-bd-accent-dark"
            >
              How we approach the work <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bd-what-we-do-stack.png"
              alt="End-to-end B&D ownership: design, content, front end, back end, databases, API integrations, and cloud deployment around a live product."
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-[16rem] md:mx-0 md:max-w-none"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
