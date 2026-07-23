import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { throughLinePrinciples } from "@/lib/data";
import { ThroughLineIcon } from "@/components/work/ThroughLineIcon";

/** Work page closing note — five principles on a connected through-line. */
export function ThroughLineSection() {
  return (
    <section className="dot-grid-bg py-16 md:py-20" aria-labelledby="work-close">
      <Container>
        <Reveal>
          <SectionTag>Closing note</SectionTag>
          <h2 id="work-close" className="font-heading text-3xl font-bold md:text-4xl text-bd-light-text">
            The through-line
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">
            The through-line is consistent: software shaped around how work actually runs, with clearer ownership,
            fewer brittle handoffs, and room to improve after launch.
          </p>
        </Reveal>

        <div className="bd-throughline relative mt-12 md:mt-16">
          <div className="bd-throughline-rail hidden lg:block" aria-hidden />
          <div
            className="relative z-[1] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
            role="list"
            aria-label="Five principles along the through-line"
          >
            {throughLinePrinciples.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.05} className="h-full" role="listitem">
                <article
                  className={`bd-throughline-card flex h-full flex-col items-center px-4 py-6 text-center lg:px-3 ${
                    item.n === "03" ? "bd-throughline-card--focus" : ""
                  }`}
                >
                  <div className="bd-step-ring bd-throughline-ring mb-5">
                    <ThroughLineIcon n={item.n} />
                  </div>
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.12em] text-bd-accent opacity-70">
                    {item.n}
                  </span>
                  <h3 className="mt-2 font-heading text-base font-bold leading-snug tracking-tight text-bd-light-text md:text-[1.05rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-bd-light-secondary">{item.body}</p>
                  <span className="mt-auto pt-5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-bd-accent/80">
                    {item.micro}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
