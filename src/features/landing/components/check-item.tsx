import clsx from "clsx";

/** A ✓ (or ✕ when `no`) bullet line, the design's `.chk` / `.chk.x`. */
export function CheckItem({ no, className, children }: { no?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <p className={clsx("mb-2.5 flex items-start gap-2.5 leading-[1.5] last:mb-0", className ?? "text-[17px]")}>
      <span
        aria-hidden
        className={clsx(
          "mt-[3px] flex size-[22px] flex-none items-center justify-center rounded-full text-[13px] font-extrabold",
          no ? "bg-[#FEF0EF] text-[#D92D20]" : "bg-[#ECFDF3] text-[#039855]",
        )}
      >
        {no ? "✕" : "✓"}
      </span>
      <span>{children}</span>
    </p>
  );
}
