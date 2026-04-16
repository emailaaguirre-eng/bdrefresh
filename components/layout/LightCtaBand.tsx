import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

type Props = SectionProps & {
  children: ReactNode;
  className?: string;
  pyClass?: string;
};

/**
 * Closing CTA: solid brand accent (`bd.accent` / `#2568a0`). Primary actions use a light button so they stay visible.
 */
export function LightCtaBand({
  children,
  className = "",
  pyClass = "py-24 md:py-[100px]",
  ...sectionProps
}: Props) {
  return (
    <section
      className={`relative overflow-hidden bg-bd-accent text-white ${pyClass} ${className}`.trim()}
      {...sectionProps}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(255,255,255,0.1),transparent_58%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[580px] text-center">{children}</Container>
    </section>
  );
}
