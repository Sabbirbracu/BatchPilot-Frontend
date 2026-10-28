import clsx from "clsx";

/** Small coloured status tag (`.pill`). Colours come from the caller so meaning stays at the call site. */
export function Pill({ bg, fg, children, className }: { bg: string; fg: string; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx("inline-flex items-center gap-[5px] rounded-[9px] text-[12px] font-bold whitespace-nowrap", className ?? "px-[9px] py-0.5")}
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  );
}
