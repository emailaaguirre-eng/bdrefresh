const pillars = [
  {
    title: "10+ years",
    body: "Shipping production websites, applications, and internal tools for teams that need software to match real workflows.",
  },
  {
    title: "Direct collaboration",
    body: "You work with the people scoping and building the software, not a rotating cast of handoffs.",
  },
  {
    title: "Clear checkpoints",
    body: "Staging, documentation, and review moments before go-live so ownership and expectations stay grounded.",
  },
] as const;

/** Grounded trust strip (no unverifiable metrics). */
export function HomeMetricsCounters() {
  return (
    <div className="grid grid-cols-1 gap-6 border-t border-bd-light-border pt-8 sm:grid-cols-3 sm:gap-8">
      {pillars.map((p) => (
        <div key={p.title}>
          <div className="font-editorial text-lg font-bold tracking-tight text-bd-accent">{p.title}</div>
          <p className="mt-2 text-[0.88rem] leading-relaxed text-bd-light-secondary">{p.body}</p>
        </div>
      ))}
    </div>
  );
}
