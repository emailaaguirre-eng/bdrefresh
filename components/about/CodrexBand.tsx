import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** CoDre-X band: light dot grid (same rhythm as other About body sections, not footer-dark). */
export function CodrexBand({ children }: { children: ReactNode }) {
  return (
    <section id="codrex" className="dot-grid-bg py-16 text-bd-light-text md:py-24" aria-labelledby="codrex-heading">
      <Container>{children}</Container>
    </section>
  );
}
