import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  backdrop,
  contentClassName = "py-16 md:py-20 lg:py-24",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead: string;
  /** Optional CTA row under the lead (e.g. primary + secondary links). */
  actions?: ReactNode;
  /** Absolute layer behind copy (e.g. Insights night sky). */
  backdrop?: ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-[#080c12] text-bd-dark-text">
      {backdrop}
      <Container className={`relative z-10 ${contentClassName}`}>
        <div className="flex max-w-[740px] flex-col items-start text-left">
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent-lighter">
            {eyebrow}
          </div>
          <h1 className="mt-4 font-heading text-[clamp(2.5rem,5.5vw,4rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-bd-dark-muted md:text-lg">{lead}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
        </div>
      </Container>
    </div>
  );
}
