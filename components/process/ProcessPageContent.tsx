import { Reveal } from "@/components/motion/Reveal";
import { ProcessPhasesColumn } from "@/components/process/ProcessPhasesColumn";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

type PhaseBlock = { readonly label: string; readonly text: string };
export type ProcessPagePhase = {
  readonly id: string;
  readonly phase: string;
  readonly tag: string;
  readonly title: string;
  readonly blocks: readonly PhaseBlock[];
};

/**
 * Process detail: services-style jump nav + editorial phase blocks.
 * Intentionally not the home horizontal timeline (rings / connector).
 */
export function ProcessPageContent({ phases }: { phases: readonly ProcessPagePhase[] }) {
  return (
    <>
      <section className="border-b border-bd-light-border bg-bd-light-bg py-14 md:py-16" aria-labelledby="process-detail-heading">
        <Container>
          <Reveal>
            <SectionTag>Detail</SectionTag>
            <h2 id="process-detail-heading" className="font-heading text-3xl font-bold md:text-4xl text-bd-light-text">
              Phase by phase
            </h2>
          </Reveal>
        </Container>
      </section>

      <ProcessPhasesColumn phases={phases} />
    </>
  );
}
