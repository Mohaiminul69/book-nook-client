// Typographic cover used until a real imgbb image exists (handoff → Components → BookCover)
const COVER_COLORS = {
  Fiction: "bg-magenta-200 text-magenta-900",
  Science: "bg-cyan-200 text-cyan-900",
  History: "bg-neutral-300 text-neutral-900",
  Kids: "bg-cyan-100 text-cyan-800",
  Others: "bg-neutral-100 text-neutral-800",
};

export function BookCover({ title, author, category, image, className = "", titleClassName = "text-[26px]" }) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={`Cover of ${title}`}
        className={`aspect-[3/4] w-full rounded-sm object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex aspect-[3/4] w-full flex-col justify-between rounded-sm px-[18px] py-5 shadow-[inset_7px_0_0_color-mix(in_srgb,currentColor_14%,transparent)] ${
        COVER_COLORS[category] || COVER_COLORS.Others
      } ${className}`}
    >
      <span className="pl-1.5 text-[10px] tracking-[0.14em] uppercase">{category}</span>
      <div className="flex flex-col gap-1.5 pl-1.5">
        <span className="h-[3px] w-9 border-t-[1.5px] border-b-[0.5px] border-current" />
        <span className={`font-heading leading-[1.08] tracking-[-0.01em] ${titleClassName}`}>
          {title}
        </span>
        {author && <span className="text-[13px] italic">{author}</span>}
      </div>
    </div>
  );
}
