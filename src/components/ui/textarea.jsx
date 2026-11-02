import * as React from "react";
import { cn } from "cn";

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-[110px] w-full resize-y rounded-md border border-input bg-card px-2.5 py-1.5 text-base text-foreground caret-primary transition-colors placeholder:text-foreground/65 hover:border-foreground/45 focus-visible:border-primary focus-visible:outline-offset-0 aria-invalid:border-magenta",
        className,
      )}
      {...props}
    />
  );
};

export { Textarea };
