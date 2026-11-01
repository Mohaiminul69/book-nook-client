import Link from "next/link";

// 30×30 ink square with an italic "B", then "Book*Nook*"
export function BrandWordmark({ className = "", ...props }) {
  return (
    <span {...props} className={`text-[22px] font-semibold tracking-[-0.01em] ${className}`}>
      Book<span className="italic">Nook</span>
    </span>
  );
}

export function Logo({ className = "", onClick }) {
  return (
    <Link href="/" onClick={onClick} className={`flex items-center gap-2.5 text-foreground ${className}`}>
      <span
        aria-hidden="true"
        className="grid size-[30px] place-items-center rounded-sm bg-foreground font-heading text-[19px] text-background italic"
      >
        B
      </span>
      <BrandWordmark />
    </Link>
  );
}
