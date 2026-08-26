import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { servicesPageGroups } from "@/lib/data";
import { ServicesOfferCard } from "./ServicesOfferCard";

/**
 * Services product map: Build vs After launch.
 * Full-width list — no side jump nav or bottom catalog card (those live in header/footer CTAs and /services/all).
 * Offer cards reuse the home services tilt / glow surface (without sequential numbering).
 */
export function ServicesPageDetail() {
  return (
    <section
      className="relative overflow-hidden bg-bd-light-alt pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32"
      aria-label="Services by focus"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-[450px] w-[450px] rounded-full bg-[rgba(37,104,160,0.06)] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-24 right-[-80px] h-[350px] w-[350px] rounded-full bg-[rgba(46,196,162,0.04)] blur-[80px]" />

      <Container className="relative">
        <div className="space-y-14 md:space-y-16">
          {servicesPageGroups.map((group, groupIndex) => {
            const offerBase = servicesPageGroups
              .slice(0, groupIndex)
              .reduce((n, g) => n + g.items.length, 0);

            return (
              <div key={group.id} id={group.id} className="scroll-mt-28 space-y-8">
                <Reveal>
                  <SectionTag>{group.label}</SectionTag>
                  <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-bd-light-text sm:text-3xl md:text-[1.85rem] md:leading-tight">
                    {group.heading}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-bd-light-secondary md:text-[1.05rem]">
                    {group.lede}
                  </p>
                </Reveal>
                <div className="space-y-6 md:space-y-8">
                  {group.items.map((item, itemIndex) => {
                    const index = offerBase + itemIndex;
                    return (
                      <Reveal key={item.id} delay={Math.min(index * 0.04, 0.16)}>
                        <ServicesOfferCard item={item} index={index} showIndex={false} />
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
