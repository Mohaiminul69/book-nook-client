"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { BookThumb } from "@/components/book-thumb";
import { notify } from "@/components/toast";
import { Button } from "@/components/ui/button";

const ReturnButton = ({ borrow, onReturn, returning, className = "" }) => {
  return (
    <Button
      variant="secondary"
      disabled={returning}
      onClick={() => onReturn(borrow)}
      className={className}
    >
      Return Book
    </Button>
  );
};

export const MyBorrowsList = ({ borrows: serverBorrows }) => {
  const router = useRouter();
  const [returnedIds, setReturnedIds] = useState([]);
  const [returningId, setReturningId] = useState(null);

  const borrows = serverBorrows.filter(
    (borrow) => !returnedIds.includes(borrow._id),
  );

  const handleReturn = async (borrow) => {
    setReturningId(borrow._id);
    try {
      await apiFetch(`/borrows/${borrow._id}`, { method: "DELETE" });
      setReturnedIds((current) => [...current, borrow._id]);
      notify.success(
        "Book returned",
        `“${borrow.bookTitle}” is back on the shelf.`,
      );
      router.refresh();
    } catch {
      notify.error("Return failed", "Please try again in a moment.");
    } finally {
      setReturningId(null);
    }
  };

  const count = borrows.length;

  return (
    <>
      <div className="flex flex-col gap-3">
        <span className="kicker">My Borrows</span>
        <h1 className="text-[38px] leading-[1.05] tracking-[-0.025em] lg:text-[60px]">
          On your nightstand<span className="text-magenta">.</span>
        </h1>
        <p className="text-base text-foreground/82 lg:text-lg">
          {count} {count === 1 ? "book" : "books"} out right now. Loans last
          seven days.
        </p>
      </div>

      {count === 0 ? (
        <div className="flex flex-col items-start gap-4">
          <p className="text-xl italic">Nothing borrowed right now.</p>
          <Button asChild variant="secondary">
            <Link href="/books">Browse Books</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="hidden flex-col lg:flex">
            <div className="kicker grid grid-cols-[72px_minmax(0,2fr)_1fr_1fr_1fr_150px] gap-6 border-b border-foreground/20 pb-3">
              <span>Image</span>
              <span>Title</span>
              <span>Borrow date</span>
              <span>Return date</span>
              <span>Status</span>
              <span />
            </div>
            {borrows.map((borrow) => (
              <div
                key={borrow._id}
                className="grid grid-cols-[72px_minmax(0,2fr)_1fr_1fr_1fr_150px] items-center gap-6 border-b border-foreground/10 py-4 text-[15px]"
              >
                <BookThumb
                  title={borrow.bookTitle}
                  category={borrow.bookCategory}
                  image={borrow.bookImage}
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-heading text-[19px]">
                    {borrow.bookTitle}
                  </span>
                  <span className="text-sm text-foreground/75 italic">
                    {borrow.bookAuthor}
                  </span>
                </div>
                <span>{borrow.borrowLabel}</span>
                <span>{borrow.returnLabel}</span>
                <span className={borrow.urgent ? "text-magenta-700" : ""}>
                  {borrow.status}
                </span>
                <div className="flex justify-end">
                  <ReturnButton
                    borrow={borrow}
                    onReturn={handleReturn}
                    returning={returningId === borrow._id}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:hidden">
            {borrows.map((borrow) => (
              <div
                key={borrow._id}
                className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-4 gap-y-2.5 border-b border-foreground/10 py-4"
              >
                <BookThumb
                  title={borrow.bookTitle}
                  category={borrow.bookCategory}
                  image={borrow.bookImage}
                  className="h-[68px] w-[52px]"
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-heading text-[19px]">
                    {borrow.bookTitle}
                  </span>
                  <span className="text-[13px] text-foreground/75">
                    Borrowed {borrow.borrowLabel}
                  </span>
                  <span className="text-[13px]">
                    Return by {borrow.returnLabel} ·{" "}
                    <span className={borrow.urgent ? "text-magenta-700" : ""}>
                      {borrow.status}
                    </span>
                  </span>
                </div>
                <div className="col-start-2">
                  <ReturnButton
                    borrow={borrow}
                    onReturn={handleReturn}
                    returning={returningId === borrow._id}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
