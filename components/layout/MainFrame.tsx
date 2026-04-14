"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Fixed header overlays the home hero; inner pages need top offset.
 * Inner routes use the same dark canvas as PageHero so body’s light bg never shows as a strip under the nav.
 */
export function MainFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <main id="main-content" className={isHome ? "" : "bg-bd-dark-bg pt-[4.5rem]"}>
      {children}
    </main>
  );
}
