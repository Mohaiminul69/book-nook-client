"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SLIDES = [
  {
    eyebrow: "Welcome to BookNook",
    title: "Your next favourite book is already on the shelf",
    text: "Browse books shared by readers in your community and borrow one in a single click.",
    covers: ["#7a4e2d", "#f2a93b", "#3d5a3a"],
    featured: "The Midnight Library",
  },
  {
    eyebrow: "Free to borrow",
    title: "Borrow for a few days, return when you are done",
    text: "Pick a book, choose a return date and confirm. No fees and no paperwork.",
    covers: ["#34506e", "#f2a93b", "#6b3e5e"],
    featured: "Project Hail Mary",
  },
  {
    eyebrow: "Share your shelf",
    title: "Add the books you love for others to read",
    text: "Upload a cover, write a short note and your book is ready for the next reader.",
    covers: ["#2f4858", "#f2a93b", "#8a5a1e"],
    featured: "Atomic Habits",
  },
];

function CoverStack({ covers, featured }) {
  const [left, middle, right] = covers;
  return (
    <div className="relative hidden h-72 w-96 shrink-0 md:block" aria-hidden="true">
      <div
        className="absolute top-10 left-5 h-56 w-36 -rotate-8 rounded-lg shadow-2xl"
        style={{ background: left }}
      />
      <div
        className="absolute top-2 left-28 flex h-60 w-40 items-end rounded-lg p-4 shadow-2xl"
        style={{ background: middle }}
      >
        <span className="font-heading text-xl leading-tight font-bold text-primary">
          {featured}
        </span>
      </div>
      <div
        className="absolute top-12 left-56 h-56 w-36 rotate-7 rounded-lg shadow-2xl"
        style={{ background: right }}
      />
    </div>
  );
}

export function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, A11y]}
      loop
      speed={700}
      autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="hero-slider overflow-hidden rounded-3xl bg-[#1e2a4a] dark:bg-[#161d33]"
      style={{
        "--swiper-pagination-color": "#f2a93b",
        "--swiper-pagination-bullet-inactive-color": "#ffffff",
        "--swiper-pagination-bullet-inactive-opacity": "0.4",
        "--swiper-navigation-color": "#ffffff",
        "--swiper-navigation-size": "22px",
      }}
    >
      {SLIDES.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div className="flex min-h-[440px] items-center gap-10 px-6 pt-12 pb-16 sm:px-16 md:min-h-[460px]">
            <div className="flex max-w-xl flex-1 flex-col items-start gap-5">
              <span className="rounded-full bg-highlight/20 px-3 py-1.5 text-xs font-semibold tracking-wider text-[#f7c873] uppercase">
                {slide.eyebrow}
              </span>
              <h1 className="text-4xl leading-[1.08] font-bold text-white sm:text-5xl">
                {slide.title}
              </h1>
              <p className="max-w-md text-base leading-relaxed text-[#d4dae8] sm:text-lg">
                {slide.text}
              </p>
              <Button asChild variant="highlight" size="lg" className="h-12 px-6 text-base font-semibold">
                <Link href="/books">
                  Browse Books <ArrowRight />
                </Link>
              </Button>
            </div>
            <CoverStack covers={slide.covers} featured={slide.featured} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
