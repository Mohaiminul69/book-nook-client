import * as React from "react";
import { cn } from "cn";

const Input = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "min-h-11 w-full min-w-0 rounded-md border border-input bg-card px-2.5 py-1.5 text-base text-foreground caret-primary transition-colors placeholder:text-foreground/65 hover:border-foreground/45 focus-visible:border-primary focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-magenta read-only:bg-neutral-100 read-only:text-foreground/80 read-only:hover:border-input",
        className,
      )}
      {...props}
    />
  );
};

export { Input };
