import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** CoDre-X: solid white band (color break vs alt sections; no hairline borders). */
export function CodrexBand({ children }: { children: ReactNode }) {
  return (
    <section
      id="codrex"
      className="scroll-mt-28 bg-white py-16 text-bd-light-text md:py-24"
      aria-labelledby="codrex-heading"
    >
      <Container>
        <div className="mx-auto max-w-4xl">{children}</div>
      </Container>
    </section>
  );
}
