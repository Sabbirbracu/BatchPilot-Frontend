import clsx from "clsx";
import { monthLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { MonthTile } from "../../lib/month-tiles";

/** "কোন মাসের ফি নিচ্ছেন?" — open months (picked oldest first), next month as advance, last paid month. */
export function MonthTiles({
  tiles,
  selected,
  advance,
  onPick,
  onAdvance,
}: {
  tiles: MonthTile[];
  selected: number; // how many open months are picked, from the oldest
  advance: boolean;
  onPick: (index: number) => void;
  onAdvance: () => void;
}) {
  const { tr, lang } = useLang();
  return (
    <div>
      <p className="m-0 mb-2 text-[13px] font-bold">{tr("কোন মাসের ফি নিচ্ছেন?", "Which months is this for?")}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tiles.map((t, i) => {
          const name = monthLabel(t.month, lang);
          if (t.kind === "paid") {
            return (
              <div key={t.month} className="rounded-[14px] bg-[#ECFDF3] px-[11px] py-[9px] text-[#039855]">
                <p className="m-0 text-[12px] font-bold">{name}</p>
                <p className="num m-0 font-bold">{taka(t.amount, lang)}</p>
                <p className="m-0 text-[11px]">{tr("✓ পরিশোধিত", "✓ Paid")}</p>
              </div>
            );
          }
          const on = t.kind === "open" ? i < selected : advance;
          const note =
            t.kind === "advance" ? tr("অগ্রিম", "Advance") : t.current ? tr("এই মাস", "This month") : tr("বাকি পড়ে আছে", "Overdue");
          return (
            <button
              key={t.month}
              type="button"
              aria-pressed={on}
              onClick={() => (t.kind === "open" ? onPick(i) : onAdvance())}
              className={clsx(
                "rounded-[14px] px-[11px] py-[9px] text-left",
                on ? "bg-[#F4EEFF] shadow-[inset_0_0_0_2px_#5B21B6]" : "bg-white shadow-[inset_0_0_0_1.5px_#E4DDF5] hover:bg-[#FAF9FD]",
              )}
            >
              <p className={clsx("m-0 text-[12px]", on ? "font-bold text-[#5B21B6]" : "text-[#6B6880]")}>
                {on && "✓ "}
                {name}
              </p>
              <p className="num m-0 font-bold" style={{ color: on ? "#17161F" : "#6B6880" }}>
                {taka(t.amount, lang)}
              </p>
              <p className="m-0 text-[11px]" style={{ color: t.kind === "advance" ? "#6B6880" : "#D92D20" }}>
                {note}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
