import { Suspense } from "react";
import { HeroSlider, HeroSliderFallback } from "@/components/home/hero-slider";

// The layout's "BookNook | %s" template only applies to nested routes, not this page
export const metadata = {
  title: { absolute: "BookNook | Home" },
};

export default function Home() {
  return (
    <section className="page-container">
      {/* Swiper reads the clock while rendering, so it streams in under Suspense */}
      <Suspense fallback={<HeroSliderFallback />}>
        <HeroSlider />
      </Suspense>
    </section>
  );
}
