import { cn } from "@/lib/utils";

const TAG_STYLES = {
  neutral: "bg-neutral-100 text-neutral-800",
  accent: "bg-cyan-100 text-cyan-800",
  alert: "bg-magenta-100 text-magenta-800",
};

export const Tag = ({ variant = "neutral", className = "", children }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[1.5px] px-2.5 py-[3px] text-[11px] tracking-[0.02em]",
        TAG_STYLES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
