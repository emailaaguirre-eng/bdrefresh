import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleEndCta } from "@/components/insights/ArticleEndCta";
import { InsightArticleHero } from "@/components/insights/InsightArticleHero";
import { InsightBody } from "@/components/insights/InsightBody";
import { Container } from "@/components/ui/Container";
import { getAuthorByline, getInsightPost, getInsightSlugs } from "@/lib/insightsData";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) notFound();

  return (
    <article>
      <InsightArticleHero>
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-bd-accent-lighter transition hover:text-white"
        >
          <span aria-hidden>←</span> Insights
        </Link>
        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent-lighter">
          Article
        </p>
        <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[2.35rem]">
          {post.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-bd-dark-muted md:text-lg">{post.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-bd-dark-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden className="text-bd-dark-faint">
            ·
          </span>
          <span>{getAuthorByline(post.author)}</span>
        </div>
      </InsightArticleHero>

      <div className="bg-bd-light-bg py-14 md:py-20">
        <Container className="max-w-3xl">
          <InsightBody blocks={post.blocks} />
          <footer className="mt-14 border-t border-bd-light-border pt-10">
            <p className="text-sm font-medium text-bd-light-text">
              <span className="text-bd-light-muted">Written by </span>
              {getAuthorByline(post.author)}
            </p>
          </footer>
          <ArticleEndCta />
        </Container>
      </div>
    </article>
  );
}
