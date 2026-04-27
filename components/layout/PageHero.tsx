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
        <div className="flex max-w-[740px] flex-col items-start text-left">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent-lighter">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-heading text-[clamp(2.5rem,5.5vw,4rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-bd-dark-muted md:text-lg">{lead}</p>
        </div>
      </Container>
    </header>
  );
}
