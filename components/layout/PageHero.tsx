import type { ReactNode } from "react";
import {
  HeroEnvironmentalDepth,
  type HeroEnvIntensity,
  type HeroEnvLayout,
} from "@/components/brand/HeroEnvironmentalDepth";
import { Container } from "@/components/ui/Container";

export type PageHeroEnvironment =
  | false
  | {
      intensity?: HeroEnvIntensity;
      layout?: HeroEnvLayout;
      hosting?: boolean;
    };

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  backdrop,
  contentClassName = "py-16 md:py-20 lg:py-24",
  titleClassName,
  leadClassName,
  environment = false,
}: {
  /** Omit or pass null/empty to hide the mono eyebrow row. */
  eyebrow?: ReactNode | null;
  title: ReactNode;
  lead: ReactNode;
  /** Optional CTA row under the lead (e.g. primary + secondary links). */
  actions?: ReactNode;
  /** Absolute layer behind copy (e.g. Insights night sky). */
  backdrop?: ReactNode;
  contentClassName?: string;
  /** Extra classes on the h1 (e.g. reset tracking when title is a logo image). */
  titleClassName?: string;
  leadClassName?: string;
  /**
   * Inner-page B&D Environmental Depth (NOT for Home or Insights).
   * Omit / false keeps the hero plain — required for Insights CoDre-X.
   */
  environment?: PageHeroEnvironment;
}) {
  const showEyebrow = eyebrow != null && eyebrow !== false && eyebrow !== "";
  const env = environment === false || environment == null ? null : environment;

  return (
    <div className="relative overflow-hidden bg-[#080c12] text-bd-dark-text">
      {backdrop}
      {env ? (
        <HeroEnvironmentalDepth
          intensity={env.intensity}
          layout={env.layout}
          hosting={env.hosting}
        />
      ) : null}
      <Container className={`relative z-10 ${contentClassName}`}>
        <div className="flex w-full max-w-[740px] flex-col items-start text-left">
          {showEyebrow ? (
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bd-accent-lighter">
              {eyebrow}
            </div>
          ) : null}
          <h1
            className={[
              showEyebrow ? "mt-4" : "",
              "font-heading text-[clamp(2.5rem,5.5vw,4rem)] font-bold leading-[1.12] tracking-[-0.015em] text-white",
              titleClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {title}
          </h1>
          {lead ? (
            <p
              className={[
                "mt-5 text-base leading-relaxed text-bd-dark-muted md:text-lg",
                leadClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {lead}
            </p>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
        </div>
      </Container>
    </div>
  );
}
