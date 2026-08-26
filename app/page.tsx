import type { Metadata } from "next";
import { HomeContactSection } from "@/components/home/HomeContactSection";
import { HomeCtaBand } from "@/components/home/HomeCtaBand";
import { HomeProcessPreview } from "@/components/home/HomeProcessPreview";
import { HomeServicesPreview } from "@/components/home/HomeServicesPreview";
import { HomeValuesBlock } from "@/components/home/HomeValuesBlock";
import { HomeWhatWeDo } from "@/components/home/HomeWhatWeDo";
import { HeroHome } from "@/components/home/HeroHome";
import { TechStrip } from "@/components/home/TechStrip";
import { defaultDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design. Build. Launch. Improve.",
  description: defaultDescription,
};

export default function HomePage() {
  return (
    <>
      {/*
        After hero + tech (dark): light bands alternate white ↔ `bg-bd-light-alt`.
        Dark break: `HomeCtaBand`. Confidential / selected-work lives on `/work`, not home.
        Keep order so white/alt never doubles without an intervening band.
      */}
      <HeroHome />
      <TechStrip />
      <HomeWhatWeDo />
      <HomeServicesPreview />
      <HomeProcessPreview />
      <HomeCtaBand />
      <HomeValuesBlock />
      <HomeContactSection />
    </>
  );
}
