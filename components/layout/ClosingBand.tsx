import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

type Props = SectionProps & {
  children: ReactNode;
  /** Continues the site light stagger: bright `white` vs deck `bg-bd-light-alt` (no frosted gray CTA shell). */
  deck: "white" | "alt";
  className?: string;
  pyClass?: string;
};

/**
 * Flat closing band with CTA copy — same typography as the rest of the light stack (not `.bd-light-cta-copy`).
 */
export function ClosingBand({ deck, children, className = "", pyClass = "py-24 md:py-[100px]", ...sectionProps }: Props) {
  const bg = deck === "white" ? "bg-white" : "bg-bd-light-alt";
  return (
    <section className={`${bg} text-bd-light-text ${pyClass} ${className}`.trim()} {...sectionProps}>
      <Container className="mx-auto max-w-[580px] text-center">{children}</Container>
    </section>
  );
}
