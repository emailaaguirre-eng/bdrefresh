import Link from "next/link";

export function ArticleEndCta() {
  return (
    <aside
      className="mt-16 rounded-2xl border border-white/15 bg-bd-accent px-8 py-10 text-white md:px-10 md:py-12"
      aria-labelledby="article-cta-heading"
    >
      <h2 id="article-cta-heading" className="font-heading text-xl font-bold tracking-tight md:text-2xl">
        Put this idea next to your <span className="text-bd-dark-bg">real constraints</span>
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85">
        Whether you need a marketing site, store, custom platform, or care after launch, we&apos;ll help you choose
        the path that matches how the business actually runs.
      </p>
      <Link
        href="/start-project"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-bd-accent shadow-md transition hover:bg-bd-light-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Talk with B&amp;D
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </aside>
  );
}
