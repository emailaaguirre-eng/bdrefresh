import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Article masthead: flat `#080c12` fill, matching inner `PageHero` (no aurora blobs or grid wash). */
export function InsightArticleHero({ children }: { children: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-bd-dark-border/60 bg-[#080c12] pb-12 pt-8 text-bd-dark-text md:pb-14 md:pt-10">
      <Container className="relative z-10 max-w-3xl">{children}</Container>
    </header>
  );
}
