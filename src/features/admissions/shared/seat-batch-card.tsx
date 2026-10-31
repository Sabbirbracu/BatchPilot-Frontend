import clsx from "clsx";
import { Check, Clock3, MapPin } from "lucide-react";
import { ClassBadge } from "@/features/batches/shared/class-badge";
import { timeRange } from "@/features/batches/shared/schedule";
import { daysLabel, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { SeatBatch } from "@/lib/types";
import { planLine } from "./fee-math";

/**
 * A batch to pick (desk admission and the public QR page): badge, name, days and time, place,
 * fee, seats left and how full it is. Full batches can't be picked.
 */
export function SeatBatchCard({ batch: b, selected, onPick }: { batch: SeatBatch; selected: boolean; onPick: () => void }) {
  const { tr, lang } = useLang();
  const full = b.seats_left === 0;
  const taken = b.students + b.held;
  const when = timeRange(b, lang);
  return (
    <button
      type="button"
      disabled={full}
      aria-pressed={selected}
      onClick={onPick}
      className={clsx(
        "relative flex w-full flex-col gap-2.5 rounded-[20px] p-4 text-left transition-shadow",
        selected ? "bg-[#FAF7FF] shadow-[inset_0_0_0_2px_#5B21B6,0_16px_30px_-20px_rgba(91,33,182,.5)]" : "bg-white shadow-[inset_0_0_0_1.5px_#ECE8F5] hover:bg-[#FAF9FD]",
        full && "cursor-not-allowed opacity-55",
      )}
    >
      {selected && (
        <span className="absolute top-3.5 right-3.5 flex size-[26px] items-center justify-center rounded-full bg-[#5B21B6] text-white">
          <Check className="size-4" strokeWidth={3} />
        </span>
      )}
      <div className="flex items-start gap-3 pr-8">
        <ClassBadge batch={b} size="lg" />
        <div className="min-w-0">
          <p className="m-0 truncate text-[17px] font-bold">{b.name}</p>
          <p className="m-0 truncate text-[13px] text-[#6B6880]">{[b.subject, b.class_level].filter(Boolean).join(" · ") || "—"}</p>
        </div>
      </div>
      {(b.days.length > 0 || when) && (
        <p className="m-0 flex items-center gap-2 text-[13.5px] text-[#3B3850]">
          <Clock3 className="size-4 flex-none text-[#8B5CF6]" />
          <span className="truncate">{[daysLabel(b.days, lang), when].filter(Boolean).join(" · ")}</span>
        </p>
      )}
      {b.location && (
        <p className="m-0 flex items-center gap-2 text-[13.5px] text-[#3B3850]">
          <MapPin className="size-4 flex-none text-[#8B5CF6]" />
          <span className="truncate">{b.location}</span>
        </p>
      )}
      <div className="mt-0.5 flex items-center justify-between gap-2 border-t-2 border-dashed border-[#ECE8F5] pt-3">
        <p className="num m-0 min-w-0 truncate text-[15px] font-bold">
          {planLine(b, (p) => taka(p, lang), lang)}
          {b.admission_fee ? <span className="text-[12.5px] font-medium text-[#6B6880]"> · {tr("ভর্তি", "admission")} {taka(b.admission_fee, lang)}</span> : null}
        </p>
        <SeatsPill left={b.seats_left} />
      </div>
      {b.capacity ? (
        <div className="h-1.5 rounded-full bg-[#EFEBF8]" aria-hidden>
          <div className="h-1.5 rounded-full bg-[#8B5CF6]" style={{ width: `${Math.min(100, (taken / b.capacity) * 100)}%` }} />
        </div>
      ) : null}
    </button>
  );
}

function SeatsPill({ left }: { left: number | null }) {
  const { tr, lang } = useLang();
  if (left == null) return null;
  if (left === 0)
    return <span className="flex-none rounded-[10px] bg-[#FEF3F2] px-2.5 py-1 text-[12.5px] font-bold text-[#D92D20]">{tr("সিট পূর্ণ", "Full")}</span>;
  const few = left <= 5;
  return (
    <span className={clsx("flex-none rounded-[10px] px-2.5 py-1 text-[12.5px] font-bold", few ? "bg-[#FFFAEB] text-[#B54708]" : "bg-[#ECFDF3] text-[#039855]")}>
      {tr(`${num(left, lang)}টা সিট খালি`, `${left} seats left`)}
    </span>
  );
}
