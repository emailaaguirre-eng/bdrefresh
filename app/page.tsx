import type { Metadata } from "next";
import { HomeContactSection } from "@/components/home/HomeContactSection";
import { HomeCtaBand } from "@/components/home/HomeCtaBand";
import { HomeProcessPreview } from "@/components/home/HomeProcessPreview";
import { HomeServicesPreview } from "@/components/home/HomeServicesPreview";
import { HomeValuesBlock } from "@/components/home/HomeValuesBlock";
import { HomeWhatWeDo } from "@/components/home/HomeWhatWeDo";
import { HomeWorkTeaser } from "@/components/home/HomeWorkTeaser";
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
        After hero + tech (dark): strict two-step light rhythm — bright `bg-white` vs deck `bg-bd-light-alt`.
        Dark `HomeCtaBand` breaks the strip; keep this order when adding sections so white/alt never doubles up.
      */}
      <HeroHome />
      <TechStrip />
      <HomeWhatWeDo />
      <HomeServicesPreview />
      <HomeProcessPreview />
      <HomeCtaBand />
      <HomeValuesBlock />
      <HomeWorkTeaser />
      <HomeContactSection />
    </>
  );
}
