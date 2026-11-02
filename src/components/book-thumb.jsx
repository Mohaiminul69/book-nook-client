import Image from "next/image";
import { COVER_COLORS } from "@/components/book-cover";
import { cn } from "@/lib/utils";

export const BookThumb = ({ title, category, image, className = "" }) => {
  if (image) {
    return (
      <Image
        src={image}
        alt={`Cover of ${title}`}
        width={96}
        height={128}
        unoptimized
        className={cn(
          "h-16 w-12 shrink-0 rounded-sm bg-neutral-200 object-cover",
          className,
        )}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-16 w-12 shrink-0 rounded-sm shadow-[inset_4px_0_0_color-mix(in_srgb,currentColor_14%,transparent)]",
        COVER_COLORS[category] || COVER_COLORS.Others,
        className,
      )}
    />
  );
};
