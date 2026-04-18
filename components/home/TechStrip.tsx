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

/**
 * Infinite marquee: two identical rows and translateX(-50%) produce a seamless loop.
 * This is intentional (not a duplicate strip); only one `<TechStrip />` mounts on the home page.
 */
export function TechStrip() {
  return (
    <div id="home-tech" className="bd-tech-marquee scroll-mt-24" aria-label="Technologies we use">
      <div className="bd-tech-track">
        <TechRow />
        <TechRow hidden />
      </div>
    </div>
  );
}
