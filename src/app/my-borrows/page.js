import { Suspense } from "react";
import { MyBorrowsList } from "@/components/borrows/my-borrows-list";
import { LoadingState } from "@/components/loading-state";
import { getMyBorrows } from "@/lib/server-api";

export const metadata = {
  title: "My Borrows",
};

const DAY = 24 * 60 * 60 * 1000;

const formatDate = (value) => {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const startOfDay = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getStatus = (returnDate) => {
  const daysLeft = Math.round(
    (startOfDay(returnDate) - startOfDay(Date.now())) / DAY,
  );
  if (daysLeft < 0) return { status: "Overdue", urgent: true };
  if (daysLeft === 0) return { status: "Due today", urgent: true };
  if (daysLeft === 1) return { status: "1 day left", urgent: true };
  return { status: `${daysLeft} days left`, urgent: false };
};

const MyBorrowsData = async () => {
  let borrows;
  try {
    borrows = await getMyBorrows();
  } catch {
    return (
      <p className="py-16 text-base text-foreground/75 italic">
        Your borrows couldn&apos;t be loaded right now. Please try again in a
        moment.
      </p>
    );
  }

  const rows = borrows.map((borrow) => ({
    ...borrow,
    borrowLabel: formatDate(borrow.borrowDate),
    returnLabel: formatDate(borrow.returnDate),
    ...getStatus(borrow.returnDate),
  }));

  return <MyBorrowsList borrows={rows} />;
};

const MyBorrowsPage = () => {
  return (
    <section className="page-container flex flex-col gap-9 pt-9 lg:pt-16">
      <Suspense fallback={<LoadingState label="Loading your borrows…" />}>
        <MyBorrowsData />
      </Suspense>
    </section>
  );
};

export default MyBorrowsPage;
