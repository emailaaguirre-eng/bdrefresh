import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

type Props = SectionProps & {
  children: ReactNode;
  className?: string;
  pyClass?: string;
};

/**
 * Closing CTA: frosted gray band — white headline lead + body; emphasized words use primary ink via `.bd-light-cta-copy` (see globals).
 */
export function LightCtaBand({
  children,
  className = "",
  pyClass = "py-24 md:py-[100px]",
  ...sectionProps
}: Props) {
  return (
    <section
      className={`relative overflow-hidden border-t border-bd-light-border/90 bg-bd-light-bg/85 text-bd-light-text backdrop-blur-md supports-[backdrop-filter]:bg-bd-light-bg/70 ${pyClass} ${className}`.trim()}
      {...sectionProps}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(37,104,160,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(90,171,238,0.06),transparent_50%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[580px] text-center">
        <div className="bd-light-cta-copy">{children}</div>
      </Container>
    </section>
  );
}
