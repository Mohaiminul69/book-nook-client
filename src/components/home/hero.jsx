"use client";

import dynamic from "next/dynamic";
import { HeroSliderFallback } from "@/components/home/hero-slider";

const HeroSlider = dynamic(
  () => import("@/components/home/hero-slider").then((mod) => mod.HeroSlider),
  { ssr: false, loading: () => <HeroSliderFallback /> },
);

export const Hero = () => {
  return <HeroSlider />;
};
