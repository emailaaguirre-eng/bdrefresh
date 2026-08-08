import type { Metadata } from "next";
import { CodreXWordmark } from "@/components/brand/CodreXWordmark";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { InsightPostCard } from "@/components/insights/InsightPostCard";
import { InsightsStarfield } from "@/components/insights/InsightsStarfield";
import { ClosingBand } from "@/components/layout/ClosingBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { getInsightsSorted } from "@/lib/insightsData";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Thoughtful takes on websites, web applications, digital strategy, and the decisions that shape better online experiences.",
};

export default function InsightsPage() {
  const posts = getInsightsSorted();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <span className="font-codrex font-bold tracking-normal">
            The <CodreXWordmark /> Files
          </span>
        }
        lead="Thoughtful takes on websites, web applications, digital strategy, and the decisions that shape better online experiences."
        backdrop={<InsightsStarfield />}
        contentClassName="py-20 md:py-24 lg:py-28"
      />
      <section className="dot-grid-bg py-16 md:py-24" aria-label="Articles">
        <Container>
          <SectionTag>Articles</SectionTag>

          {featured ? (
            <div className="mt-6 max-w-3xl">
              <InsightPostCard post={featured} featured />
            </div>
          ) : null}

          {rest.length > 0 ? (
            <ul className="mt-10 grid max-w-3xl gap-8">
              {rest.map((post) => (
                <li key={post.slug}>
                  <InsightPostCard post={post} />
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>
      <ClosingBand deck="alt" aria-labelledby="insights-cta-heading">
        <Reveal>
          <h2
            id="insights-cta-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-bd-light-text"
          >
            From article to a real <span className="text-bd-accent">roadmap</span>
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-bd-light-secondary">
            If something you read here matches a decision you&apos;re facing, send the context. We&apos;ll help turn it into a scoped next step.
          </p>
          <MagneticLink
            href="/start-project"
            className="bd-btn-magnetic mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-dark"
          >
            <span>Apply this to your site</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </MagneticLink>
        </Reveal>
      </ClosingBand>
    </>
  );
}
