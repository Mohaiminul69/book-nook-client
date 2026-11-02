import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { NewArrivals } from "@/components/home/new-arrivals";
import { TopCategories } from "@/components/home/top-categories";

export const metadata = {
  title: { absolute: "BookNook | Home" },
};

const Home = () => {
  return (
    <div className="page-container flex flex-col gap-18 lg:gap-32">
      <Hero />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </div>
  );
};

export default Home;
