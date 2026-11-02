import { Suspense } from "react";
import { redirect } from "next/navigation";
import { MyBooksList } from "@/components/books/my-books-list";
import { LoadingState } from "@/components/loading-state";
import { getBooks } from "@/lib/books";
import { getSession } from "@/lib/server-api";

export const metadata = {
  title: "My Books",
};

const MyBooksData = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login?from=/my-books");
  }

  let books;
  try {
    books = await getBooks({ email: session.user.email });
  } catch {
    return (
      <p className="py-16 text-base text-foreground/75 italic">
        Your books couldn&apos;t be loaded right now. Please try again in a
        moment.
      </p>
    );
  }

  return <MyBooksList books={books} />;
};

const MyBooksPage = () => {
  return (
    <section className="page-container flex flex-col gap-9 pt-9 lg:pt-16">
      <Suspense fallback={<LoadingState label="Loading your books…" />}>
        <MyBooksData />
      </Suspense>
    </section>
  );
};

export default MyBooksPage;
