import { num } from "@/lib/format";

/** White summary tile: coloured dot + label, big number. */
export function StatTile({ label, value, dot, valueColor }: { label: string; value: number; dot: string; valueColor?: string }) {
  return (
    <div className="rounded-[20px] bg-white px-4 py-3">
      <p className="m-0 flex items-center gap-1.5 text-[13px] text-[#6B6880]">
        <span className="size-2 rounded-full" style={{ background: dot }} />
        {label}
      </p>
      <p className="num m-0 mt-0.5 text-[24px] font-bold" style={{ color: valueColor }}>
        {num(value, "bn")}
      </p>
    </div>
  );
}
