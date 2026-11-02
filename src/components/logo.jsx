import Link from "next/link";

export const BrandWordmark = ({ className = "", ...props }) => {
  return (
    <span
      {...props}
      className={`text-[22px] font-semibold tracking-[-0.01em] ${className}`}
    >
      Book<span className="italic">Nook</span>
    </span>
  );
};

export const Brand = () => {
  return (
    <span className="flex items-center gap-2.5 text-foreground">
      <span
        aria-hidden="true"
        className="grid size-[30px] place-items-center rounded-sm bg-foreground font-heading text-[19px] text-background italic"
      >
        B
      </span>
      <BrandWordmark />
    </span>
  );
};

export const Logo = ({ className = "", onClick }) => {
  return (
    <Link href="/" onClick={onClick} className={className}>
      <Brand />
    </Link>
  );
};
