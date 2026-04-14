import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { HomeServicesGrid } from "@/components/home/HomeServicesGrid";

/** Legacy `#services` on index — 7 cards, tilt, glow, orbs, “What We Build”. */
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
          <SectionTag>Services</SectionTag>
          <h2 id="home-svc-heading" className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            What We Build
          </h2>
        </Reveal>
        <HomeServicesGrid />
      </Container>
    </section>
  );
}
