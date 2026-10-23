import clsx from "clsx";
import Link from "next/link";

export type RowState = "live" | "done" | "missed" | "upcoming" | "exam";

const bar: Record<RowState, string> = {
  live: "bg-purple",
  done: "bg-ok-bright",
  missed: "bg-due",
  upcoming: "bg-line",
  exam: "bg-gold",
};

/** One entry in the day's routine: time, a status bar, title + status line, and a count. */
export function ScheduleRow({
  href,
  time,
  title,
  subtitle,
  count,
  state,
}: {
  href?: string;
  time: string;
  title: string;
  subtitle: string;
  count: string;
  state: RowState;
}) {
  const live = state === "live";
  const exam = state === "exam";
  const className = clsx(
    "flex items-center gap-3 rounded-2xl px-3.5 py-3 transition-colors xl:gap-4 xl:px-4",
    live ? "bg-lavender/70 ring-2 ring-purple/25" : exam ? "bg-gold-cream" : "bg-canvas hover:bg-lavender/50",
  );
  const body = (
    <>
      <span className={clsx("num w-11 shrink-0 text-[15px] font-semibold", live ? "text-purple" : exam ? "text-gold-ink" : "text-muted")}>{time}</span>
      <span className={clsx("h-9 w-1 shrink-0 rounded-full", bar[state])} aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-ink">{title}</span>
        <span
          className={clsx(
            "block truncate text-xs",
            live ? "font-medium text-purple" : state === "missed" ? "text-due" : exam ? "text-gold-ink" : "text-muted",
          )}
        >
          {subtitle}
        </span>
      </span>
      <span
        className={clsx(
          "num shrink-0 text-[15px] font-bold",
          live ? "text-purple" : exam ? "text-gold-ink" : state === "done" ? "text-ink" : "font-semibold text-muted",
        )}
      >
        {count}
      </span>
    </>
  );
  return <li>{href ? <Link href={href} className={className}>{body}</Link> : <div className={className}>{body}</div>}</li>;
}
