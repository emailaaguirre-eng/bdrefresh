import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { privacyBlocks } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How B&D Servicing LLC collects, uses, and protects information on banddservicing.com, including forms, cookies, and analytics.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Privacy Policy"
      lead="What we collect on this website, why we collect it, and the choices you have."
      updated="August 1, 2026"
      blocks={privacyBlocks}
    />
  );
}
