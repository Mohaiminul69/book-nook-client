import { Suspense } from "react";
import { HeroSlider, HeroSliderFallback } from "@/components/home/hero-slider";

export const metadata = {
  title: { absolute: "BookNook | Home" },
};

const Home = () => {
  return (
    <section className="page-container">
      <Suspense fallback={<HeroSliderFallback />}>
        <HeroSlider />
      </Suspense>
    </section>
  );
};

export default Home;
