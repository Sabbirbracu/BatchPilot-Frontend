import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import { dayColor } from "./day-colors";
import { WEEK } from "./schedule";

/**
 * Seven day squares, class days filled purple or gold by rotation (see day-colors). `light` is
 * the white-on-purple version used on the next-class card, where `highlight` (the next class day) turns gold.
 */
export function DayStrip({
  days,
  light,
  highlight,
  stretch,
  className,
}: {
  days: string[];
  light?: boolean;
  highlight?: string | null;
  stretch?: boolean; // fill the row (batch cards) instead of fixed 30px squares
  className?: string;
}) {
  const { lang } = useLang();
  return (
    <div className={clsx("flex", stretch ? "gap-1.5" : "gap-1", className)}>
      {WEEK.map((d) => {
        const on = days.includes(d.code);
        const style = light
          ? d.code === highlight
            ? { background: "#F5B800", color: "#2E1065" }
            : on
              ? { background: "rgba(255,255,255,.22)", color: "#FFFFFF" }
              : { background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.4)" }
          : on
            ? { background: dayColor(d.code).bg, color: dayColor(d.code).fg }
            : { background: "#F3F1FA", color: "#B9B5CC" };
        return (
          <span
            key={d.code}
            className={clsx(
              "flex items-center justify-center",
              stretch ? "h-7 flex-1 rounded-[9px] text-[12px]" : "h-6 w-[30px] rounded-[7px] text-[11px]",
              on || d.code === highlight ? "font-bold" : "font-medium",
            )}
            style={style}
            title={lang === "bn" ? d.bn : d.en}
          >
            {lang === "bn" ? d.bn : d.en.slice(0, 2)}
          </span>
        );
      })}
    </div>
  );
}
