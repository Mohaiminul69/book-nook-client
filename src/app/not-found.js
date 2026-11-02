import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: { absolute: "BookNook | Page Not Found" },
};

const NotFound = () => {
  return (
    <section className="page-container flex flex-col items-start gap-6 pt-14 pb-6 lg:pt-24 lg:pb-10">
      <span className="font-heading text-[120px] leading-[0.85] tracking-[-0.05em] lining-nums lg:text-[220px]">
        404<span className="text-magenta">.</span>
      </span>
      <h1 className="text-[28px] tracking-[-0.015em] lg:text-[44px]">
        This page isn&apos;t on any shelf.
      </h1>
      <p className="max-w-[40ch] text-base text-foreground/82 lg:text-lg">
        The link may be old, or the book may have been removed.
      </p>
      <Button asChild className="min-h-12 px-7 text-[15px]">
        <Link href="/">Back to Home</Link>
      </Button>
    </section>
  );
};

export default NotFound;
