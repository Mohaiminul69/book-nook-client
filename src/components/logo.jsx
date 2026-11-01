import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-highlight dark:bg-highlight dark:text-highlight-foreground">
        <BookOpen className="size-5" />
      </span>
      <span className="font-heading text-2xl font-bold tracking-tight text-primary">
        BookNook
      </span>
    </Link>
  );
}
