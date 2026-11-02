import { Suspense } from "react";
import { AddBookForm } from "@/components/books/add-book-form";
import { LoadingState } from "@/components/loading-state";
import { getSession } from "@/lib/server-api";

export const metadata = {
  title: "Add Book",
};

const AddBookFormWithUser = async () => {
  const session = await getSession();
  const user = {
    name: session?.user.name || "",
    email: session?.user.email || "",
  };
  return <AddBookForm user={user} />;
};

const AddBookPage = () => {
  return (
    <section className="page-container grid gap-8 pt-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:pt-16">
      <div className="flex flex-col gap-4">
        <span className="kicker">Add Book</span>
        <h1 className="text-[38px] leading-[1.05] tracking-[-0.025em] lg:text-[60px]">
          Put a book on the <span className="italic">shelf</span>
          <span className="text-magenta">.</span>
        </h1>
        <p className="max-w-[34ch] text-base leading-[1.6] lg:text-lg">
          It shows up in All Books straight away. Set how many copies you can
          lend.
        </p>
      </div>
      <Suspense fallback={<LoadingState label="Loading form…" />}>
        <AddBookFormWithUser />
      </Suspense>
    </section>
  );
};

export default AddBookPage;
