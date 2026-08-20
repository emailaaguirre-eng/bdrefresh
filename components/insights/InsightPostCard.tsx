import Link from "next/link";
import type { InsightPost } from "@/lib/insightsData";

function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function InsightPostCard({ post, featured }: { post: InsightPost; featured?: boolean }) {
  const href = `/insights/${post.slug}`;
  return (
    <article
      className={`group rounded-none border border-bd-light-border bg-white p-8 shadow-none transition hover:border-bd-accent/25 md:p-10 ${
        featured ? "ring-1 ring-bd-accent/10" : ""
      }`}
    >
      {featured ? (
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-bd-accent">Featured</p>
      ) : null}
      <time dateTime={post.publishedAt} className={`block text-sm text-bd-light-muted ${featured ? "mt-3" : "mt-0"}`}>
        {formatDate(post.publishedAt)}
      </time>
      <h2 className="mt-3 font-heading text-xl font-bold tracking-tight text-bd-light-text md:text-2xl">
        <Link
          href={href}
          className="transition hover:text-bd-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-4 text-base leading-relaxed text-bd-light-secondary">{post.excerpt}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bd-accent transition hover:text-bd-accent-dark"
      >
        Read article
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}
