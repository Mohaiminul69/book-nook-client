import { Suspense } from "react";
import Link from "next/link";
import { getBooks } from "@/lib/books";
import { CATEGORIES } from "@/lib/categories";

const formatCount = (count) => {
  if (count === null) return "";
  return `${count} ${count === 1 ? "title" : "titles"}`;
};

const CategoryList = ({ counts = {} }) => {
  return (
    <div className="flex flex-col">
      {CATEGORIES.map((name) => (
        <Link
          key={name}
          href={`/books?category=${name}`}
          className="flex items-baseline gap-3 py-3.5 transition-colors hover:text-cyan-700"
        >
          <span className="font-heading text-[22px] tracking-[-0.01em] lg:text-[28px]">
            {name}
          </span>
          <span
            aria-hidden="true"
            className="mb-[0.4em] min-w-6 flex-1 self-end border-b border-dotted border-foreground/45"
          />
          <span className="text-[15px] tabular-nums">
            {formatCount(counts[name] ?? null)}
          </span>
        </Link>
      ))}
    </div>
  );
};

const CategoryListWithCounts = async () => {
  let books = [];
  try {
    books = await getBooks();
  } catch {
    return <CategoryList />;
  }
  const counts = Object.fromEntries(
    CATEGORIES.map((name) => [
      name,
      books.filter((book) => book.category === name).length,
    ]),
  );
  return <CategoryList counts={counts} />;
};

export const TopCategories = () => {
  return (
    <section className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="flex flex-col gap-2">
        <span className="kicker">Top categories</span>
        <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] lg:text-[44px]">
          Where to start
        </h2>
        <p className="mt-2 max-w-[36ch] text-base leading-[1.6] text-foreground/82">
          Every book is filed under one of five shelves. Pick one to see
          what&apos;s there.
        </p>
      </div>
      <Suspense fallback={<CategoryList />}>
        <CategoryListWithCounts />
      </Suspense>
    </section>
  );
};
