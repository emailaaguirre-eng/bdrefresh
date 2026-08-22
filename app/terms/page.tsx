import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { termsBlocks } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for banddservicing.com operated by B&D Servicing LLC.",
};

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title={
        <>
          Terms of <span className="text-bd-accent">Use</span>
        </>
      }
      lead="The rules for using this website. Project work is covered by separate agreements."
      updated="August 1, 2026"
      blocks={termsBlocks}
    />
  );
}
