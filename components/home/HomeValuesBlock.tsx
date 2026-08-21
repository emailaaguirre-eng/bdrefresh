import { Reveal } from "@/components/motion/Reveal";
import { DeployTerminal } from "@/components/home/DeployTerminal";
import { HomeMetricsCounters } from "@/components/home/HomeMetricsCounters";
import { Container } from "@/components/ui/Container";

export function HomeValuesBlock() {
  return (
    <section className="bg-bd-light-alt py-20 md:py-28" aria-labelledby="home-values-heading">
      <Container>
        {/* Top: copy first in DOM (a11y/mobile); terminal left on desktop */}
        <div className="grid items-start gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 id="home-values-heading" className="text-left font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
              Dedicated to Providing
              <br />
              Superior Development.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-[1.75] text-bd-light-secondary">
              We believe in one-on-one attention for every build so we understand your goals and deliver a system that
              fits. If you want to understand what&apos;s being built and why, we&apos;ll guide you through it and
              provide clean documentation, with staging and review checkpoints baked into delivery, not bolted on at the
              end.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="min-w-0 w-full lg:order-first">
            <DeployTerminal />
          </Reveal>
        </div>
        {/* Bottom: section-wide evidence under both columns */}
        <Reveal delay={0.12} className="mt-10 md:mt-12">
          <HomeMetricsCounters />
        </Reveal>
      </Container>
    </section>
  );
}
