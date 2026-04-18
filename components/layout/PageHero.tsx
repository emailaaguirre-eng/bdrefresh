import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
}) {
  return (
    <header className="relative overflow-hidden bg-[#080c12] text-bd-dark-text">
      <Container className="relative py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent-lighter">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-snug tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>
          <p className="text-base leading-relaxed text-bd-dark-muted md:text-lg lg:pb-1">{lead}</p>
        </div>
      </Container>
    </header>
  );
}
