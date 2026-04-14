import type { InsightBlock } from "@/lib/insightsData";

export function InsightBody({ blocks }: { blocks: InsightBlock[] }) {
  return (
    <div className="insight-prose space-y-5">
      {blocks.map((b, i) => {
        if (b.kind === "p") {
          return (
            <p key={i} className="text-[1.0625rem] leading-[1.75] text-bd-light-secondary">
              {b.text}
            </p>
          );
        }
        if (b.kind === "h2") {
          return (
            <h2
              key={i}
              className="font-heading text-2xl font-bold tracking-tight text-bd-light-text md:text-[1.65rem] [&:not(:first-child)]:mt-12"
            >
              {b.text}
            </h2>
          );
        }
        if (b.kind === "h3") {
          return (
            <h3 key={i} className="mt-8 font-heading text-lg font-bold text-bd-light-text">
              {b.text}
            </h3>
          );
        }
        if (b.kind === "ul") {
          return (
            <ul
              key={i}
              className="list-disc space-y-2 pl-6 text-[1.0625rem] leading-relaxed text-bd-light-secondary marker:text-bd-accent"
            >
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}
