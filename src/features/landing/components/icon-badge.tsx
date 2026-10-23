import clsx from "clsx";

/** The design's `.ico`: a 52px rounded square holding an icon. Colours come from `className`. */
export function IconBadge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span aria-hidden className={clsx("flex size-[52px] flex-none items-center justify-center rounded-2xl", className)}>
      {children}
    </span>
  );
}
