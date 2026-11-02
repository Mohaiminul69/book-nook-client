"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { notify } from "@/components/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formatDate = (date) => {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const ReadOnlyField = ({ id, label, value }) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} readOnly className="min-h-[42px]" />
    </div>
  );
};

export const BorrowButton = ({ book, user }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState(null);

  if (book.availableCopies <= 0) {
    return (
      <Button disabled className="min-h-12 px-7 text-[15px]">
        Not Available
      </Button>
    );
  }

  const handleOpenChange = (next) => {
    if (next) {
      const borrowDate = new Date();
      const returnDate = new Date(borrowDate);
      returnDate.setDate(returnDate.getDate() + 7);
      setDates({ borrowDate, returnDate });
    }
    setOpen(next);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const borrow = await apiFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId: book._id }),
      });
      setOpen(false);
      notify.success(
        "Book borrowed",
        `Return “${book.title}” by ${formatDate(new Date(borrow.returnDate))}.`,
      );
      router.refresh();
    } catch (error) {
      setOpen(false);
      if (error.code === "ALREADY_BORROWED") {
        notify.error(
          "Already borrowed",
          `You already have “${book.title}”. Return it before borrowing again.`,
        );
      } else if (error.code === "NOT_AVAILABLE") {
        notify.error("Not available", "Every copy is out right now.");
        router.refresh();
      } else {
        notify.error("Borrow failed", "Please try again in a moment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="min-h-12 px-7 text-[15px]">Borrow This Book</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <span className="kicker">Borrow this book</span>
          <DialogTitle>{book.title}</DialogTitle>
          <span className="text-[15px] italic">{book.author}</span>
        </DialogHeader>
        <ReadOnlyField id="borrow-name" label="Name" value={user.name} />
        <ReadOnlyField id="borrow-email" label="Email" value={user.email} />
        {dates && (
          <div className="grid grid-cols-2 gap-3">
            <ReadOnlyField
              id="borrow-date"
              label="Borrow date"
              value={formatDate(dates.borrowDate)}
            />
            <ReadOnlyField
              id="return-date"
              label="Return date"
              value={formatDate(dates.returnDate)}
            />
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="min-h-11">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="min-h-11 px-[22px]"
          >
            Confirm Borrow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
