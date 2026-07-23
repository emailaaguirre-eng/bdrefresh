import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { HomeServicesGrid } from "@/components/home/HomeServicesGrid";

/** Home `#services` — offer catalog (websites through design, hosting, and care). */
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
          <h2 id="home-svc-heading" className="font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
            What We Offer
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bd-light-secondary md:text-base">
            Build, grow, and run work, often combined in one engagement, scoped to who uses the software and what has to
            stay true after it ships.
          </p>
        </Reveal>
        <HomeServicesGrid />
      </Container>
    </section>
  );
}
