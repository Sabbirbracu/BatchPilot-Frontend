import clsx from "clsx";

export type StatItem = { label: string; value: React.ReactNode; color?: string; bar?: { pct: number; color: string } };

/** A batch card's numbers in one soft strip, split by thin dividers (students · fee · attendance). */
export function StatRow({ items, className }: { items: StatItem[]; className?: string }) {
  return (
    <dl className={clsx("grid grid-cols-3 divide-x divide-[#EEEAF6] rounded-[16px] bg-[#FAF9FD] py-3", className)}>
      {items.map((it) => (
        <div key={it.label} className="min-w-0 px-3.5">
          <dt className="truncate text-[12px] text-[#6B6880]">{it.label}</dt>
          <dd className="num m-0 mt-0.5 truncate text-[17px] leading-tight font-bold" style={{ color: it.color }}>
            {it.value}
          </dd>
          {it.bar && (
            <div className="mt-2 h-1 rounded-full bg-[#EEEAF6]">
              <div className="h-1 rounded-full" style={{ width: `${Math.min(100, it.bar.pct)}%`, background: it.bar.color }} />
            </div>
          )}
        </div>
      ))}
    </dl>
  );
}
