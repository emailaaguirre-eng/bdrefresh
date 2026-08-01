import Link from "next/link";
import { CodrexBand } from "@/components/about/CodrexBand";
import { codreXUrl } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

const principles: readonly { title: string; body: string }[] = [
  {
    title: "Outcomes first.",
    body: "We align on what “done” means for your users and your operators before we debate frameworks.",
  },
  {
    title: "Honest tradeoffs.",
    body: "Timeline, cost, and risk are part of the conversation early, not surprises after the deposit.",
  },
  {
    title: "Handoff that holds up.",
    body: "Documentation and structure matter: the next developer (or future you) should not need a séance to change the system.",
  },
  {
    title: "Calm execution.",
    body: "We prefer predictable delivery and clear checkpoints over theater and buzzwords.",
  },
] as const;

/**
 * After dark `PageHero`: same stagger as home light bands — `bg-white` ↔ `bg-bd-light-alt` (no hairlines).
 * Order: white (who) → alt (how we work) → white (CoDre-X) → closing band is `bg-bd-light-alt` via `ClosingBand deck="alt"`.
 */
export function AboutBody() {
  return (
    <>
      <section className="bg-white py-16 md:py-24" aria-labelledby="about-who">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
            <Reveal className="lg:pt-2">
              <SectionTag>Who we are</SectionTag>
              <h2 id="about-who" className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
                Built in connected layers
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-bd-light-secondary">
                Every digital build has visible and invisible parts. We think through both: what users see, how
                information moves, where tools connect, and how the system can continue supporting the business after
                launch.
              </p>
            </Reveal>

            <div className="relative">
              <div
                className="pointer-events-none absolute left-[0.65rem] top-0 bottom-0 w-px bg-gradient-to-b from-bd-accent/20 via-bd-accent/25 to-bd-accent/15 md:left-[0.7rem]"
                aria-hidden
              />
              <ol className="relative space-y-5 md:space-y-6" aria-label="About B&amp;D Servicing">
                <li className="relative pl-10 md:pl-11">
                  <Reveal delay={0.04}>
                    <span
                      className="absolute left-0 top-1/2 flex h-[0.65rem] w-[0.65rem] -translate-y-1/2 rounded-full border-2 border-bd-accent bg-white shadow-[0_0_0_4px_rgba(37,104,160,0.12)] md:h-3 md:w-3"
                      aria-hidden
                    />
                    <div className="rounded-2xl border border-bd-light-border bg-white/90 p-5 shadow-card transition duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:border-bd-accent/30 hover:shadow-card-hover motion-reduce:hover:translate-y-0 md:p-6">
                      <p className="leading-relaxed text-bd-light-secondary">
                        The company combines strategy, design, development, and problem-solving to create solutions that are
                        functional, scalable, and purposeful.
                      </p>
                    </div>
                  </Reveal>
                </li>
                <li className="relative pl-10 md:pl-11">
                  <Reveal delay={0.08}>
                    <span
                      className="absolute left-0 top-1/2 flex h-[0.65rem] w-[0.65rem] -translate-y-1/2 rounded-full border-2 border-bd-accent bg-white shadow-[0_0_0_4px_rgba(37,104,160,0.12)] md:h-3 md:w-3"
                      aria-hidden
                    />
                    <div className="rounded-2xl border border-bd-light-border bg-white/90 p-5 shadow-card transition duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:border-bd-accent/30 hover:shadow-card-hover motion-reduce:hover:translate-y-0 md:p-6">
                      <p className="leading-relaxed text-bd-light-secondary">
                        B&amp;D focuses on building solutions that go beyond one-size-fits-all templates. Some projects are
                        public-facing websites; others are custom tools, platforms, or systems built to support specific
                        workflows and operational goals.
                      </p>
                    </div>
                  </Reveal>
                </li>
                <li className="relative pl-10 md:pl-11">
                  <Reveal delay={0.12}>
                    <span
                      className="absolute left-0 top-1/2 flex h-[0.65rem] w-[0.65rem] -translate-y-1/2 rounded-full border-2 border-bd-accent bg-white shadow-[0_0_0_4px_rgba(37,104,160,0.12)] md:h-3 md:w-3"
                      aria-hidden
                    />
                    <div className="rounded-2xl border border-bd-light-border bg-gradient-to-br from-white to-bd-light-alt/35 p-5 shadow-card transition duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:border-bd-accent/30 hover:shadow-card-hover motion-reduce:hover:translate-y-0 md:p-6">
                      <p className="leading-relaxed text-bd-light-secondary">
                        We build with handoff, maintenance, and future improvement in mind so the final product is
                        something your team can understand, manage, and grow over time.
                      </p>
                    </div>
                  </Reveal>
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bd-light-alt py-16 md:py-24" aria-labelledby="about-guide">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionTag>How we work</SectionTag>
            <h2 id="about-guide" className="mt-3 font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
              What guides our work
            </h2>
            <p className="mt-4 text-bd-light-secondary">A few principles that show up in every engagement.</p>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:gap-6" role="list">
            {principles.map((item) => (
                <li key={item.title}
                  className="group relative flex h-full cursor-default flex-col overflow-hidden rounded-2xl border border-bd-light-border bg-white p-6 shadow-card transition duration-300 ease-out will-change-transform hover:-translate-y-1 hover:border-bd-accent/35 hover:shadow-card-hover motion-reduce:hover:translate-y-0 active:translate-y-0 active:shadow-card md:p-7"
                  role="listitem"
                >
                  <span
                    className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-bd-accent/[0.06] blur-2xl transition group-hover:bg-bd-accent/[0.1]"
                    aria-hidden
                  />
                  <p className="font-heading text-lg font-bold text-bd-light-text">{item.title}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-bd-light-secondary md:text-[0.95rem]">{item.body}</p>
                  <div className="mt-5 h-0.5 w-12 rounded-full bg-gradient-to-r from-bd-accent to-bd-accent-lighter opacity-70" aria-hidden />
                </li>
            ))}
          </ul>
        </Container>
      </section>

      <CodrexBand>
        <Reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
<img
  src="/codrex-logo-v2-blue.png"
  alt="CoDre-X Concept Realized"
  width={420}
  height={138}
  loading="lazy"
  decoding="async"
  fetchPriority="low"
  className="mb-6 h-auto w-full max-w-[340px] md:max-w-[420px]"
/>
          <h2 id="codrex-heading" className="sr-only">
            CoDre-X
          </h2>
        </Reveal>
        <Reveal className="mt-10 max-w-3xl text-[1.05rem] leading-relaxed text-bd-light-secondary">
          <p>
            <Link
              href={codreXUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-bd-light-text hover:underline"
            >
              CoDre-<span className="text-bd-codrex">X</span>
            </Link>{" "}
            is a division of B&amp;D Servicing representing the company&apos;s premium creative and development work,
            where thoughtful ideas are shaped into custom digital solutions.
          </p>
        </Reveal>
      </CodrexBand>
    </>
  );
}
