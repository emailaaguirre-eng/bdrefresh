/** Static presentation rail: one connected operations story. */

const layers = [
  { label: "Hosting", note: "Live site" },
  { label: "Care", note: "Upkeep" },
  { label: "Monitoring", note: "Signals" },
  { label: "SEO", note: "Findability" },
  { label: "Portal", note: "Visibility" },
] as const;

export function HostingOverviewRail() {
  return (
    <div className="border border-bd-light-border bg-bd-light-bg/70 p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-bd-accent">
          After launch
        </p>
        <p className="font-mono text-[0.65rem] text-bd-light-muted">one team · one path</p>
      </div>

      <ol className="mt-5 grid list-none gap-2 p-0 sm:grid-cols-5">
        {layers.map((layer, i) => (
          <li key={layer.label} className="relative">
            <div className="h-full border border-bd-light-border bg-white px-3 py-3">
              <p className="font-mono text-[0.62rem] text-bd-light-muted">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-heading text-sm font-bold text-bd-light-text">{layer.label}</p>
              <p className="mt-0.5 text-xs text-bd-light-secondary">{layer.note}</p>
            </div>
            {i < layers.length - 1 ? (
              <span
                className="pointer-events-none absolute -right-1.5 top-1/2 z-10 hidden h-px w-3 -translate-y-1/2 bg-bd-accent/50 sm:block"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
