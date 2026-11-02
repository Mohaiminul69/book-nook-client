import { Suspense } from "react";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { LoadingState } from "@/components/loading-state";
import { Button } from "@/components/ui/button";
import { getBooks } from "@/lib/books";

const NewArrivalsGrid = async () => {
  let books = [];
  try {
    books = await getBooks({ limit: 6 });
  } catch {
    return (
      <p className="py-10 text-base text-foreground/75 italic">
        New arrivals couldn&apos;t be loaded right now. Please try again in a
        moment.
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <p className="py-10 text-base text-foreground/75 italic">
        No books on the shelves yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-3 lg:gap-7">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export const NewArrivals = () => {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <span className="kicker">New arrivals</span>
          <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] lg:text-[44px]">
            Just added to the shelves
          </h2>
        </div>
        <span className="text-[15px] text-foreground/75">
          The six newest books, newest first.
        </span>
      </div>
      <Suspense fallback={<LoadingState label="Loading new arrivals…" />}>
        <NewArrivalsGrid />
      </Suspense>
      <div>
        <Button asChild size="lg">
          <Link href="/books">See All Books</Link>
        </Button>
      </div>
    </section>
  );
};
