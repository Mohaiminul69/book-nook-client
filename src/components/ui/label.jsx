"use client";

import * as React from "react";
import { cn } from "cn";
import { Label as LabelPrimitive } from "radix-ui";

const Label = ({ className, ...props }) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "mb-[5px] block text-xs text-foreground/70 select-none",
        className,
      )}
      {...props}
    />
  );
};

export { Label };
