import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Plain dark CoDre-X band (particle effect lives on the page hero, not here). */
export function CodrexBand({ children }: { children: ReactNode }) {
  return (
    <section id="codrex" className="bg-bd-dark-bg py-16 text-bd-dark-text md:py-24" aria-labelledby="codrex-heading">
      <Container>{children}</Container>
    </section>
  );
}
