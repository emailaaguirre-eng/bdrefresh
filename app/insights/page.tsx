import type { Metadata } from "next";
import { InsightPostCard } from "@/components/insights/InsightPostCard";
import { PageHeroWithWeb } from "@/components/layout/PageHeroWithWeb";
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
      <PageHeroWithWeb
        eyebrow="Insights"
        title={
          <>
            Notes from <span className="shimmer-text">the build</span>
          </>
        }
        lead="Thoughtful takes on websites, web applications, digital strategy, and the decisions that shape better online experiences."
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
    </>
  );
}
