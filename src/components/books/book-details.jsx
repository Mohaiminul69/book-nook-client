import { BookCover } from "@/components/book-cover";
import { BorrowButton } from "@/components/books/borrow-button";
import { Tag } from "@/components/tag";

const formatDate = (value) => {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getCopiesLabel = (book) => {
  if (book.availableCopies > 0) {
    return `${book.availableCopies} of ${book.totalCopies} available`;
  }
  return `None of ${book.totalCopies} available`;
};

const Fact = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="kicker">{label}</span>
      {children}
    </div>
  );
};

export const BookDetails = ({ book, user, myBorrow }) => {
  const isOut = book.availableCopies <= 0;

  return (
    <div className="grid items-start gap-7 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-18">
      <div className="w-[62%] rounded-sm shadow-lg lg:w-full">
        <BookCover
          title={book.title}
          author={book.author}
          category={book.category}
          image={book.image}
          typeClassName="px-[26px] py-7 shadow-[inset_9px_0_0_color-mix(in_srgb,currentColor_14%,transparent)]"
          titleClassName="text-2xl lg:text-[34px]"
        />
      </div>

      <div className="flex max-w-[600px] flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <Tag variant="accent">{book.category}</Tag>
          {isOut && <Tag variant="alert">Not available</Tag>}
        </div>
        <h1 className="text-[38px] leading-[1.05] tracking-[-0.025em] lg:text-[60px]">
          {book.title}
        </h1>
        <span className="text-[22px] italic">{book.author}</span>
        <p className="text-lg leading-[1.65]">{book.description}</p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-5 pt-3 pb-2 lg:grid-cols-[repeat(3,auto)]">
          <Fact label="Added by">
            <span className="text-base">{book.addedBy?.name}</span>
            <span className="text-[13px] text-foreground/72">
              {book.addedBy?.email}
            </span>
          </Fact>
          <Fact label="Added on">
            <span className="text-base">{formatDate(book.createdAt)}</span>
          </Fact>
          <Fact label="Copies">
            <span className="text-base">{getCopiesLabel(book)}</span>
          </Fact>
        </div>

        {myBorrow && (
          <span className="text-[15px] text-cyan-700">
            You&apos;re reading this one. Return by{" "}
            {formatDate(myBorrow.returnDate)}.
          </span>
        )}

        <div className="flex flex-wrap gap-3">
          <BorrowButton book={book} user={user} />
        </div>
      </div>
    </div>
  );
};
