import { Reveal } from "@/components/motion/Reveal";
import { DeployTerminal } from "@/components/home/DeployTerminal";
import { HomeMetricsCounters } from "@/components/home/HomeMetricsCounters";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

export function HomeValuesBlock() {
  return (
    <section className="bg-bd-light-bg py-20 md:py-28" aria-labelledby="home-values-heading">
      <Container>
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <DeployTerminal />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTag>Our Values</SectionTag>
            <h2 id="home-values-heading" className="text-left font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
              Dedicated to Providing
              <br />
              Superior Development.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-[1.75] text-bd-light-secondary">
              We believe in one-on-one attention for every build so we understand your goals and deliver a system that
              fits. If you want to understand what&apos;s being built and why, we&apos;ll guide you through it and
              provide clean documentation.
            </p>
            <HomeMetricsCounters />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
