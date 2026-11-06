export type StripItem = { icon: React.ReactNode; iconBg: string; iconFg: string; label: string; value: React.ReactNode; note?: React.ReactNode; valueColor?: string };

/**
 * The four numbers on top of each online / marketing screen: two to a row on phones, four from laptops up.
 * On phones the icon sits above the number so values like "৳২.৪৫ লাখ" get the full tile width.
 */
export function StatStrip({ items }: { items: StripItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="flex min-w-0 flex-col gap-2 rounded-[22px] bg-white px-3.5 py-3 sm:flex-row sm:items-center sm:gap-[11px]">
          <span className="flex size-9 flex-none items-center justify-center rounded-[12px] sm:size-[38px]" style={{ background: it.iconBg, color: it.iconFg }}>
            {it.icon}
          </span>
          <div className="min-w-0">
            <p className="m-0 truncate text-[12px] text-[#6B6880]">{it.label}</p>
            <p className="num m-0 truncate text-[19px] leading-[1.25] font-bold" style={{ color: it.valueColor ?? "#17161F" }}>
              {it.value}
            </p>
            {it.note != null && <p className="m-0 truncate text-[11.5px] text-[#6B6880]">{it.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
