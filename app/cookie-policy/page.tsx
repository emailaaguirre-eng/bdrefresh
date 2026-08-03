import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { cookieBlocks } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How B&D Servicing LLC uses cookies and similar technologies on banddservicing.com, and how to manage preferences.",
};

export default function CookiePolicyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Cookie Policy"
      lead="Essential cookies keep the site working. Optional analytics run only with your consent."
      updated="August 1, 2026"
      blocks={cookieBlocks}
    />
  );
}
