import clsx from "clsx";

/** White summary tile: label, big number, then either a bar or a short note. */
export function SummaryTile({
  label,
  value,
  valueColor,
  bar,
  note,
  noteColor,
  alert,
}: {
  label: string;
  value: React.ReactNode;
  valueColor?: string;
  bar?: { pct: number; color: string };
  note?: string;
  noteColor?: string;
  alert?: boolean;
}) {
  return (
    <div className={clsx("min-w-0 rounded-[20px] bg-white px-4 py-[13px]", alert && "shadow-[inset_0_0_0_1.5px_#FBD5D2]")}>
      <p className="m-0 truncate text-[12.5px] text-[#6B6880]">{label}</p>
      <p className={clsx("num m-0 mt-0.5 truncate text-[22px] font-bold", bar && "mb-1.5")} style={{ color: valueColor }}>
        {value}
      </p>
      {bar && (
        <div className="h-[5px] rounded-[4px] bg-[#F1EEF8]">
          <div className="h-[5px] rounded-[4px]" style={{ width: `${Math.min(100, bar.pct)}%`, background: bar.color }} />
        </div>
      )}
      {note && (
        <p className="m-0 truncate text-[12px]" style={{ color: noteColor ?? "#6B6880", fontWeight: noteColor ? 600 : undefined }}>
          {note}
        </p>
      )}
    </div>
  );
}
