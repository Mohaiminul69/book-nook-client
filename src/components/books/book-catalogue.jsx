"use client";

import { useState } from "react";
import { BookCard } from "@/components/book-card";
import { FILTERS } from "@/lib/categories";

export const CatalogueHeader = ({ countLabel }) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="kicker">The catalogue</span>
      <h1 className="text-[38px] leading-[1.05] tracking-[-0.025em] lg:text-[60px]">
        All books<span className="text-magenta">.</span>
      </h1>
      <p className="min-h-[1.6em] text-base text-foreground/82 lg:text-lg">
        {countLabel}
      </p>
    </div>
  );
};

export const CategoryFilter = ({ active, onChange }) => {
  return (
    <div className="-mx-1 overflow-x-auto p-1">
      <div
        role="radiogroup"
        aria-label="Filter by category"
        className="inline-flex overflow-hidden rounded-md border border-border"
      >
        {FILTERS.map((name) => {
          const selected = name === active;
          return (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={!onChange}
              onClick={() => onChange?.(name)}
              className={`border-l border-border px-3.5 py-2 text-sm whitespace-nowrap transition-colors first:border-l-0 disabled:cursor-default ${
                selected
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-foreground/7"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const getCountLabel = (count, category) => {
  const titles = `${count} ${count === 1 ? "title" : "titles"}`;
  if (category === "All") return `${titles}, newest first.`;
  return `${titles} in ${category}, newest first.`;
};

export const BookCatalogue = ({ books, initialCategory }) => {
  const [category, setCategory] = useState(initialCategory);

  const visibleBooks =
    category === "All"
      ? books
      : books.filter((book) => book.category === category);

  const handleChange = (name) => {
    setCategory(name);
    const url = name === "All" ? "/books" : `/books?category=${name}`;
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      <CatalogueHeader
        countLabel={getCountLabel(visibleBooks.length, category)}
      />
      <CategoryFilter active={category} onChange={handleChange} />
      {visibleBooks.length === 0 ? (
        <p className="py-16 text-base text-foreground/75 italic">
          {category === "All"
            ? "No books on the shelves yet."
            : `No ${category} books on the shelves yet.`}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-3 lg:gap-7">
          {visibleBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </>
  );
};
