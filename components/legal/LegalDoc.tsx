import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

export type LegalBlock =
  | { kind: "p"; text: ReactNode }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: ReactNode[] };

export function LegalDoc({
  eyebrow,
  title,
  lead,
  updated,
  blocks,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  blocks: LegalBlock[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />
      <section className="bg-white py-14 md:py-16">
        <Container>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-bd-light-secondary">
            Last updated {updated}
          </p>
          <div className="mt-8 max-w-[720px] space-y-5">
            {blocks.map((block, i) => {
              if (block.kind === "h2") {
                return (
                  <h2
                    key={i}
                    className="font-heading text-2xl font-bold tracking-tight text-bd-light-text md:text-[1.65rem] [&:not(:first-child)]:mt-12"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.kind === "ul") {
                return (
                  <ul
                    key={i}
                    className="list-disc space-y-2 pl-6 text-[1.0625rem] leading-relaxed text-bd-light-secondary marker:text-bd-accent"
                  >
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-[1.0625rem] leading-[1.75] text-bd-light-secondary">
                  {block.text}
                </p>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
