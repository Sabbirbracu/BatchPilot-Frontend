import clsx from "clsx";

/**
 * Small number tile: label, value, optional thin bar. `card` sits on a batch card,
 * `panel` on a profile panel (slightly darker, tighter).
 */
export function MiniStat({
  label,
  children,
  color,
  bar,
  look = "card",
}: {
  label: string;
  children: React.ReactNode;
  color?: string;
  bar?: { pct: number; color: string };
  look?: "card" | "panel";
}) {
  return (
    <div className={clsx("min-w-0 rounded-[12px] py-[7px]", look === "card" ? "bg-[#FAF9FD] px-2.5" : "bg-[#F7F5FC] px-[9px]")}>
      <p className="m-0 truncate text-[11px] text-[#6B6880]">{label}</p>
      <p className="num m-0 truncate text-[15px] font-bold" style={{ color }}>
        {children}
      </p>
      {bar && (
        <div className="mt-[3px] h-1 rounded-[3px] bg-[#EEEAF6]">
          <div className="h-1 rounded-[3px]" style={{ width: `${Math.min(100, bar.pct)}%`, background: bar.color }} />
        </div>
      )}
    </div>
  );
}
