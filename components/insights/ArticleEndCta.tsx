import Link from "next/link";

export function ArticleEndCta() {
  return (
    <aside
      className="mt-16 rounded-2xl border border-bd-light-border bg-gradient-to-br from-[rgba(37,104,160,0.06)] to-transparent px-8 py-10 md:px-10 md:py-12"
      aria-labelledby="article-cta-heading"
    >
      <h2 id="article-cta-heading" className="font-heading text-xl font-bold tracking-tight text-bd-light-text md:text-2xl">
        Not sure what type of website fits your business?
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-bd-light-secondary">
        We help businesses figure out whether they need a polished marketing site, an e-commerce experience, a custom
        platform, or something in between.
      </p>
      <Link
        href="/start-project"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-bd-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bd-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-accent-lighter"
      >
        Start a Project
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </aside>
  );
}
