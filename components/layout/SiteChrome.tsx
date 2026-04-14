import type { ReactNode } from "react";
import { BdChatbot } from "@/components/chat/BdChatbot";
import { HeroCursorEffects } from "@/components/effects/HeroCursorEffects";
import { BackToTop } from "./BackToTop";
import { DotGridParallax } from "./DotGridParallax";
import { MainFrame } from "./MainFrame";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <DotGridParallax />
      <HeroCursorEffects />
      <ScrollProgressBar />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10100] focus:rounded-lg focus:bg-bd-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <MainFrame>{children}</MainFrame>
      <SiteFooter />
      <BackToTop />
      <BdChatbot />
    </>
  );
}
