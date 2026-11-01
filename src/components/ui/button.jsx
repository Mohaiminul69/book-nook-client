import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "cn"
import { Slot } from "radix-ui"

// Broadsheet buttons: serif, 2px radius, 6px gap (design handoff → Components → Buttons)
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-transparent font-heading text-sm leading-tight font-semibold whitespace-nowrap transition-colors select-none disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary: cyan fill, paper-colored text
        default:
          "bg-primary text-primary-foreground hover:bg-cyan-600 active:bg-cyan-700",
        // Secondary: transparent with a divider border
        secondary:
          "border-border bg-transparent text-foreground hover:bg-foreground/7 active:bg-foreground/14 aria-expanded:bg-foreground/7",
        outline:
          "border-border bg-transparent text-foreground hover:bg-foreground/7 active:bg-foreground/14 aria-expanded:bg-foreground/7",
        // Ghost: cyan text, no border
        ghost:
          "text-primary hover:bg-primary/10 active:bg-primary/18 aria-expanded:bg-primary/10",
        destructive:
          "bg-magenta-700 text-primary-foreground hover:bg-magenta-800",
        link: "text-cyan-700 underline-offset-3 hover:underline",
      },
      size: {
        default: "min-h-10 px-[18px] py-2.5",
        xs: "min-h-7 px-2 text-xs",
        sm: "min-h-9 px-3",
        lg: "min-h-[46px] px-6 text-[15px]",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
