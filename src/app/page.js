import { Suspense } from "react";
import { HeroSlider } from "@/components/home/hero-slider";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6">
      {/* Swiper reads the clock while rendering, so it streams in under Suspense */}
      <Suspense
        fallback={
          <div className="min-h-[440px] rounded-3xl bg-[#1e2a4a] md:min-h-[460px] dark:bg-[#161d33]" />
        }
      >
        <HeroSlider />
      </Suspense>
    </section>
  );
}
