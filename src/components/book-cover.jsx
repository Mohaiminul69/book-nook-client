import Image from "next/image";
import { cn } from "@/lib/utils";

export const COVER_COLORS = {
  Fiction: "bg-magenta-200 text-magenta-900",
  Science: "bg-cyan-200 text-cyan-900",
  History: "bg-neutral-300 text-neutral-900",
  Kids: "bg-cyan-100 text-cyan-800",
  Others: "bg-neutral-100 text-neutral-800",
};

export const BookCover = ({
  title,
  author,
  category,
  image,
  className = "",
  typeClassName = "",
  titleClassName = "text-[26px]",
}) => {
  if (image) {
    return (
      <Image
        src={image}
        alt={`Cover of ${title}`}
        width={600}
        height={800}
        unoptimized
        className={cn(
          "aspect-[3/4] w-full rounded-sm bg-neutral-200 object-cover",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex aspect-[3/4] w-full flex-col justify-between rounded-sm px-[18px] py-5 shadow-[inset_7px_0_0_color-mix(in_srgb,currentColor_14%,transparent)]",
        COVER_COLORS[category] || COVER_COLORS.Others,
        className,
        typeClassName,
      )}
    >
      <span className="pl-1.5 text-[10px] tracking-[0.14em] uppercase">
        {category}
      </span>
      <div className="flex flex-col gap-1.5 pl-1.5">
        <span className="h-[3px] w-9 border-t-[1.5px] border-b-[0.5px] border-current" />
        <span
          className={cn(
            "font-heading leading-[1.08] tracking-[-0.01em]",
            titleClassName,
          )}
        >
          {title}
        </span>
        {author && <span className="text-[13px] italic">{author}</span>}
      </div>
    </div>
  );
};
