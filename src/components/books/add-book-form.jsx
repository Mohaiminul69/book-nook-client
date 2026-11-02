"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { CATEGORIES } from "@/lib/categories";
import { uploadToImgbb } from "@/lib/imgbb";
import { FormError } from "@/components/auth/auth-parts";
import { notify } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EMPTY_FORM = {
  title: "",
  author: "",
  category: "Fiction",
  totalCopies: "1",
  description: "",
};

export const SELECT_CLASS =
  "min-h-11 w-full rounded-md border border-input bg-card px-2.5 py-1.5 text-base text-foreground transition-colors hover:border-foreground/45 focus-visible:border-primary focus-visible:outline-offset-0";

const validate = (form) => {
  if (!form.title.trim() || !form.author.trim()) {
    return "Book title and author name are required.";
  }
  if (!(parseInt(form.totalCopies) >= 1)) {
    return "Total copies must be at least 1.";
  }
  if (!form.description.trim()) {
    return "Add a short description.";
  }
  return "";
};

const ImageUpload = ({ file, preview, onChange }) => {
  return (
    <div>
      <Label htmlFor="cover">Book Image</Label>
      <label
        htmlFor="cover"
        className="flex cursor-pointer items-center gap-4 rounded-md border border-dashed border-foreground/35 bg-card p-4 transition-colors hover:border-primary"
      >
        <input
          id="cover"
          type="file"
          accept="image/png, image/jpeg"
          onChange={onChange}
          className="sr-only"
        />
        {preview ? (
          <span
            role="img"
            aria-label="Selected cover"
            className="h-[58px] w-11 flex-none rounded-sm bg-cover bg-center"
            style={{ backgroundImage: `url(${preview})` }}
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-[58px] w-11 flex-none place-items-center rounded-sm bg-neutral-100 text-xl text-cyan-700"
          >
            ↑
          </span>
        )}
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[15px]">
            {file ? file.name : "Choose a cover image"}
          </span>
          <span className="text-[13px] text-foreground/72">
            JPG or PNG, uploaded to imgbb
          </span>
        </span>
      </label>
    </div>
  );
};

export const AddBookForm = ({ user }) => {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError("");
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = validate(form);
    if (message) {
      setError(message);
      return;
    }

    setSaving(true);
    try {
      const image = file ? await uploadToImgbb(file) : "";
      const book = await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          totalCopies: parseInt(form.totalCopies),
          image,
        }),
      });
      notify.success("Book added", `“${book.title}” is now in All Books.`);
      router.push("/my-books");
    } catch (err) {
      setSaving(false);
      const uploadFailed = err.message.toLowerCase().includes("upload");
      notify.error(
        uploadFailed ? "Image upload failed" : "Could not add book",
        uploadFailed
          ? "Check the image and try again."
          : "Please try again in a moment.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <Label htmlFor="title">Book Title</Label>
        <Input
          id="title"
          placeholder="The Waves"
          value={form.title}
          onChange={updateField("title")}
        />
      </div>
      <div>
        <Label htmlFor="author">Author Name</Label>
        <Input
          id="author"
          placeholder="Virginia Woolf"
          value={form.author}
          onChange={updateField("author")}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={form.category}
            onChange={updateField("category")}
            className={SELECT_CLASS}
          >
            {CATEGORIES.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="copies">Total Copies</Label>
          <Input
            id="copies"
            type="number"
            min="1"
            value={form.totalCopies}
            onChange={updateField("totalCopies")}
          />
        </div>
      </div>
      <ImageUpload file={file} preview={preview} onChange={handleFileChange} />
      <div>
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          placeholder="Two or three sentences about the book."
          value={form.description}
          onChange={updateField("description")}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="your-name">Your Name</Label>
          <Input id="your-name" value={user.name} readOnly />
        </div>
        <div>
          <Label htmlFor="your-email">Your Email</Label>
          <Input id="your-email" value={user.email} readOnly />
        </div>
      </div>
      <FormError message={error} />
      <div>
        <Button
          type="submit"
          disabled={saving}
          className="min-h-12 px-7 text-[15px]"
        >
          {saving ? "Adding…" : "Add Book"}
        </Button>
      </div>
    </form>
  );
};
