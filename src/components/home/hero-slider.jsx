"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { BookCover } from "@/components/book-cover";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/effect-fade";

const SLIDES = [
  {
    title: "A library the size of a street corner",
    text: "Borrow a book for a week, bring it back, pick another. Every title here was added by someone nearby.",
    covers: [
      { title: "The Remains of the Day", author: "Kazuo Ishiguro", category: "Fiction" },
      { title: "Pachinko", author: "Min Jin Lee", category: "Fiction" },
      { title: "Piranesi", author: "Susanna Clarke", category: "Fiction" },
    ],
  },
  {
    title: "Every reader adds a shelf",
    text: "List the books you own and how many copies you can lend. Neighbours borrow them, and they come back.",
    covers: [
      { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science" },
      { title: "The Gene", author: "Siddhartha Mukherjee", category: "Science" },
      { title: "Cosmos", author: "Carl Sagan", category: "Science" },
    ],
  },
  {
    title: "Return dates you won't forget",
    text: "My Borrows keeps every loan and its return date in one table. One click puts the copy back on the shelf.",
    covers: [
      { title: "The Gruffalo", author: "Julia Donaldson", category: "Kids" },
      { title: "Matilda", author: "Roald Dahl", category: "Kids" },
      { title: "SPQR", author: "Mary Beard", category: "History" },
    ],
  },
];

// Cover positions on the 440px stage: (0,70), (150,0), (300,100)
const COVER_POSITIONS = ["left-0 top-[70px]", "left-[150px] top-0", "left-[300px] top-[100px]"];

function SlideCopy({ slide }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="max-w-[13ch] text-[42px] leading-[1.04] tracking-[-0.025em] lg:text-[76px]">
        {slide.title}
        <span className="text-magenta">.</span>
      </h1>
      <p className="max-w-[42ch] text-base leading-[1.6] lg:text-lg">{slide.text}</p>
    </div>
  );
}

function HeroLayout({ active, copy, onPrev, onNext, onDot }) {
  const slide = SLIDES[active];
  return (
    <div className="grid items-center gap-12 pt-9 lg:min-h-[520px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:pt-14">
      <div className="flex min-w-0 flex-col gap-6">
        <span className="kicker tabular-nums" aria-live="polite">
          0{active + 1} / 0{SLIDES.length}
        </span>
        {copy}
        <div className="flex flex-wrap items-center gap-5 pt-2">
          <Button asChild size="lg">
            <Link href="/books">Browse Books</Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="icon-lg" aria-label="Previous slide" onClick={onPrev}>
              ←
            </Button>
            <Button variant="secondary" size="icon-lg" aria-label="Next slide" onClick={onNext}>
              →
            </Button>
            <div className="flex gap-1.5 pl-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => onDot?.(i)}
                  className={`h-1.5 rounded-[3px] transition-[width] duration-250 ${
                    i === active ? "w-[26px] bg-cyan" : "w-1.5 bg-neutral-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden h-[440px] lg:block" aria-hidden="true">
        {slide.covers.map((cover, i) => (
          <div
            key={`${active}-${cover.title}`}
            className={`absolute w-[230px] rounded-sm shadow-lg animate-in duration-500 fade-in ${COVER_POSITIONS[i]}`}
          >
            <BookCover {...cover} titleClassName="text-[24px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Static first slide: the Suspense fallback while Swiper streams in
export function HeroSliderFallback() {
  return <HeroLayout active={0} copy={<SlideCopy slide={SLIDES[0]} />} />;
}

export function HeroSlider() {
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  return (
    <HeroLayout
      active={active}
      onPrev={() => swiperRef.current?.slidePrev()}
      onNext={() => swiperRef.current?.slideNext()}
      onDot={(i) => swiperRef.current?.slideToLoop(i)}
      copy={
        <Swiper
          modules={[EffectFade, Autoplay, Keyboard, A11y]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={500}
          autoplay={{ delay: 6000, pauseOnMouseEnter: true, disableOnInteraction: false }}
          keyboard={{ enabled: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
          className="w-full"
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.title} className="bg-background">
              <SlideCopy slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      }
    />
  );
}
