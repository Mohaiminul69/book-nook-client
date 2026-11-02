"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { CATEGORIES } from "@/lib/categories";
import { SELECT_CLASS } from "@/components/books/add-book-form";
import { FormError } from "@/components/auth/auth-parts";
import { BookThumb } from "@/components/book-thumb";
import { notify } from "@/components/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const formatDate = (value) => {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const toForm = (book) => ({
  title: book.title,
  author: book.author,
  category: book.category,
  totalCopies: String(book.totalCopies),
  description: book.description,
});

const RowActions = ({ book, onEdit, onDelete }) => {
  return (
    <div className="flex gap-2 lg:justify-end">
      <Button variant="secondary" onClick={() => onEdit(book)}>
        Edit
      </Button>
      <Button
        variant="ghost"
        onClick={() => onDelete(book)}
        className="px-3 text-magenta-700 hover:bg-magenta-700/10"
      >
        Delete
      </Button>
    </div>
  );
};

const EditBookDialog = ({ book, onClose, onSaved }) => {
  const [form, setForm] = useState(() => toForm(book));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError("");
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.author.trim()) {
      setError("Book title and author name are required.");
      return;
    }
    if (!(parseInt(form.totalCopies) >= 1)) {
      setError("Total copies must be at least 1.");
      return;
    }
    if (!form.description.trim()) {
      setError("Add a short description.");
      return;
    }

    setSaving(true);
    try {
      const updated = await apiFetch(`/books/${book._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...form,
          totalCopies: parseInt(form.totalCopies),
        }),
      });
      notify.success("Changes saved", `“${updated.title}” was updated.`);
      onSaved(updated);
    } catch (err) {
      setSaving(false);
      if (err.status === 400) {
        setError(err.message);
      } else {
        notify.error("Could not save", "Please try again in a moment.");
      }
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <span className="kicker">Edit book</span>
          <DialogTitle className="text-[26px]">{book.title}</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="edit-title">Book Title</Label>
          <Input
            id="edit-title"
            value={form.title}
            onChange={updateField("title")}
            className="min-h-[42px]"
          />
        </div>
        <div>
          <Label htmlFor="edit-author">Author Name</Label>
          <Input
            id="edit-author"
            value={form.author}
            onChange={updateField("author")}
            className="min-h-[42px]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="edit-category">Category</Label>
            <select
              id="edit-category"
              value={form.category}
              onChange={updateField("category")}
              className={`${SELECT_CLASS} min-h-[42px]`}
            >
              {CATEGORIES.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="edit-copies">Total Copies</Label>
            <Input
              id="edit-copies"
              type="number"
              min="1"
              value={form.totalCopies}
              onChange={updateField("totalCopies")}
              className="min-h-[42px]"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="edit-description">Short Description</Label>
          <Textarea
            id="edit-description"
            value={form.description}
            onChange={updateField("description")}
            className="min-h-[90px]"
          />
        </div>
        <FormError message={error} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="min-h-11">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="min-h-11 px-[22px]"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DeleteBookDialog = ({ book, onClose, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiFetch(`/books/${book._id}`, { method: "DELETE" });
      notify.success("Book deleted", `“${book.title}” was removed.`);
      onDeleted(book);
    } catch {
      setDeleting(false);
      notify.error("Could not delete", "Please try again in a moment.");
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle className="text-[26px]">
          Delete “{book.title}”?
        </DialogTitle>
        <DialogDescription className="text-base leading-[1.6] text-foreground">
          The book is removed from All Books for everyone. This can&apos;t be
          undone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="min-h-11">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
            className="min-h-11 px-[22px]"
          >
            Delete Book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const MyBooksList = ({ books: serverBooks }) => {
  const router = useRouter();
  const [deletedIds, setDeletedIds] = useState([]);
  const [edits, setEdits] = useState({});
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const books = serverBooks
    .filter((book) => !deletedIds.includes(book._id))
    .map((book) => ({ ...book, ...edits[book._id] }));
  const count = books.length;

  const handleSaved = (updated) => {
    setEdits((current) => ({ ...current, [updated._id]: updated }));
    setEditing(null);
    router.refresh();
  };

  const handleDeleted = (book) => {
    setDeletedIds((current) => [...current, book._id]);
    setDeleting(null);
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3">
          <span className="kicker">My Books</span>
          <h1 className="text-[38px] leading-[1.05] tracking-[-0.025em] lg:text-[60px]">
            Books you&apos;ve shared<span className="text-magenta">.</span>
          </h1>
          <p className="text-base text-foreground/82 lg:text-lg">
            {count} {count === 1 ? "book" : "books"} added by you.
          </p>
        </div>
        <Button asChild className="min-h-11 px-[22px]">
          <Link href="/add-book">Add Book</Link>
        </Button>
      </div>

      {count === 0 ? (
        <p className="text-xl italic">You haven&apos;t added any books yet.</p>
      ) : (
        <>
          <div className="hidden flex-col lg:flex">
            <div className="kicker grid grid-cols-[minmax(0,2.4fr)_1fr_1fr_1fr_190px] gap-6 border-b border-foreground/20 pb-3">
              <span>Book</span>
              <span>Category</span>
              <span>Copies</span>
              <span>Added</span>
              <span className="text-right">Actions</span>
            </div>
            {books.map((book) => (
              <div
                key={book._id}
                className="grid grid-cols-[minmax(0,2.4fr)_1fr_1fr_1fr_190px] items-center gap-6 border-b border-foreground/10 py-4 text-[15px]"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <BookThumb
                    title={book.title}
                    category={book.category}
                    image={book.image}
                    className="h-[58px] w-11"
                  />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-heading text-lg">{book.title}</span>
                    <span className="text-sm text-foreground/75 italic">
                      {book.author}
                    </span>
                  </div>
                </div>
                <span>{book.category}</span>
                <span className="tabular-nums">
                  {book.availableCopies} / {book.totalCopies}
                </span>
                <span>{formatDate(book.createdAt)}</span>
                <RowActions
                  book={book}
                  onEdit={setEditing}
                  onDelete={setDeleting}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1 lg:hidden">
            {books.map((book) => (
              <div
                key={book._id}
                className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-foreground/10 py-4"
              >
                <BookThumb
                  title={book.title}
                  category={book.category}
                  image={book.image}
                  className="h-[68px] w-[52px]"
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-heading text-[19px]">{book.title}</span>
                  <span className="text-sm text-foreground/75 italic">
                    {book.author}
                  </span>
                  <span className="text-[13px] text-foreground/72">
                    {book.category} · {book.availableCopies} /{" "}
                    {book.totalCopies} copies · {formatDate(book.createdAt)}
                  </span>
                </div>
                <div className="col-start-2 pt-1">
                  <RowActions
                    book={book}
                    onEdit={setEditing}
                    onDelete={setDeleting}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {editing && (
        <EditBookDialog
          key={editing._id}
          book={editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}
      {deleting && (
        <DeleteBookDialog
          key={deleting._id}
          book={deleting}
          onClose={() => setDeleting(null)}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
};
