import { techStack } from "@/lib/data";

function TechRow({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex items-center gap-12 px-6" aria-hidden={hidden || undefined}>
      {techStack.map((name) => (
        <span
          key={`${hidden ? "d" : "a"}-${name}`}
          className="inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-[0.82rem] font-semibold text-bd-dark-faint transition-colors hover:text-bd-accent-lighter"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bd-accent opacity-30" aria-hidden />
          {name}
        </span>
      ))}
    </div>
  );
}

/** Infinite marquee matching the static site tech bar (paused when reduced motion). */
export function TechStrip() {
  return (
    <div className="bd-tech-marquee" aria-label="Technologies we use">
      <div className="bd-tech-track">
        <TechRow />
        <TechRow hidden />
      </div>
    </div>
  );
}
