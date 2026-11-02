import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookDetails } from "@/components/books/book-details";
import { LoadingState } from "@/components/loading-state";
import { Button } from "@/components/ui/button";
import { getBookById, getMyBorrows, getSession } from "@/lib/server-api";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const book = await getBookById(id).catch(() => null);
  return { title: book ? book.title : "Book Details" };
};

const BookDetailsData = async ({ params }) => {
  const { id } = await params;

  let book;
  try {
    book = await getBookById(id);
  } catch {
    return (
      <p className="py-16 text-base text-foreground/75 italic">
        This book couldn&apos;t be loaded right now. Please try again in a
        moment.
      </p>
    );
  }

  if (!book) {
    notFound();
  }

  const [session, borrows] = await Promise.all([
    getSession(),
    getMyBorrows().catch(() => []),
  ]);
  const myBorrow = borrows.find((borrow) => borrow.bookId === book._id);
  const user = {
    name: session?.user.name || "",
    email: session?.user.email || "",
  };

  return <BookDetails book={book} user={user} myBorrow={myBorrow} />;
};

const BookDetailsPage = ({ params }) => {
  return (
    <section className="page-container flex flex-col gap-8 pt-9 lg:pt-16">
      <Button asChild variant="ghost" className="self-start px-0">
        <Link href="/books">← All Books</Link>
      </Button>
      <Suspense fallback={<LoadingState label="Loading book…" />}>
        <BookDetailsData params={params} />
      </Suspense>
    </section>
  );
};

export default BookDetailsPage;
