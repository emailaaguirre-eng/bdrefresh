import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { accessibilityBlocks } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "B&D Servicing LLC accessibility commitment for banddservicing.com, and how to report barriers.",
};

export default function AccessibilityPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title={<span className="text-bd-accent">Accessibility</span>}
      lead="We design for clarity and access, and we welcome feedback when something gets in the way."
      updated="August 1, 2026"
      blocks={accessibilityBlocks}
    />
  );
}
