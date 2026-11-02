import { Suspense } from "react";
import {
  BookCatalogue,
  CatalogueHeader,
  CategoryFilter,
} from "@/components/books/book-catalogue";
import { LoadingState } from "@/components/loading-state";
import { getBooks } from "@/lib/books";
import { CATEGORIES } from "@/lib/categories";

export const metadata = {
  title: "All Books",
};

const CatalogueLoading = () => {
  return (
    <>
      <CatalogueHeader countLabel="" />
      <CategoryFilter active="All" />
      <LoadingState label="Loading books…" />
    </>
  );
};

const CatalogueData = async ({ searchParams }) => {
  const { category } = await searchParams;
  const initialCategory = CATEGORIES.includes(category) ? category : "All";

  let books;
  try {
    books = await getBooks();
  } catch {
    return (
      <>
        <CatalogueHeader countLabel="" />
        <p className="py-16 text-base text-foreground/75 italic">
          Books couldn&apos;t be loaded right now. Please try again in a moment.
        </p>
      </>
    );
  }

  return <BookCatalogue books={books} initialCategory={initialCategory} />;
};

const AllBooksPage = ({ searchParams }) => {
  return (
    <section className="page-container flex flex-col gap-9 pt-9 lg:pt-16">
      <Suspense fallback={<CatalogueLoading />}>
        <CatalogueData searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default AllBooksPage;
