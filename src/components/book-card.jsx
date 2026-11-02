import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { Tag } from "@/components/tag";
import { Button } from "@/components/ui/button";

export const BookCard = ({ book }) => {
  const isOut = book.availableCopies <= 0;

  return (
    <article className="flex h-full flex-col gap-3.5 rounded-md bg-card p-2.5 lg:p-4">
      <BookCover
        title={book.title}
        category={book.category}
        image={book.image}
        typeClassName="px-2.5 py-3 shadow-[inset_6px_0_0_color-mix(in_srgb,currentColor_14%,transparent)] lg:px-5 lg:py-[22px]"
        titleClassName="text-[15px] lg:text-[26px]"
      />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <Tag>{book.category}</Tag>
          {isOut && <Tag variant="alert">Not available</Tag>}
        </div>
        <h3 className="pt-1.5 text-[17px] leading-[1.2] tracking-[-0.01em] font-normal lg:text-[22px]">
          {book.title}
        </h3>
        <span className="text-sm text-foreground/75 italic">{book.author}</span>
      </div>
      <Button asChild variant="secondary" className="min-h-[42px] w-full">
        <Link href={`/books/${book._id}`}>View Details</Link>
      </Button>
    </article>
  );
};
