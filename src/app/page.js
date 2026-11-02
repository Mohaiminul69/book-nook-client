import { Suspense } from "react";
import { HeroSlider, HeroSliderFallback } from "@/components/home/hero-slider";
import { NewArrivals } from "@/components/home/new-arrivals";

export const metadata = {
  title: { absolute: "BookNook | Home" },
};

const Home = () => {
  return (
    <div className="page-container flex flex-col gap-18 lg:gap-32">
      <Suspense fallback={<HeroSliderFallback />}>
        <HeroSlider />
      </Suspense>
      <NewArrivals />
    </div>
  );
};

export default Home;
