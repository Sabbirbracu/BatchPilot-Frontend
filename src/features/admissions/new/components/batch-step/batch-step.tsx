import clsx from "clsx";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Empty } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { SeatBatch } from "@/lib/types";
import { SeatBatchCard } from "../../../shared/seat-batch-card";

/** ধাপ ১ — "কোন ব্যাচে ভর্তি হবে?": search, class chips, and the batch cards. */
export function BatchStep({ batches, selected, onPick }: { batches: SeatBatch[]; selected: string | null; onPick: (id: string) => void }) {
  const { tr, lang } = useLang();
  const [q, setQ] = useState("");
  const [cls, setCls] = useState<string | null>(null);
  const classes = useMemo(() => [...new Set(batches.map((b) => b.class_level).filter((c): c is string => !!c))].sort(), [batches]);
  const term = q.trim().toLowerCase();
  const shown = batches.filter(
    (b) => (!cls || b.class_level === cls) && (!term || [b.name, b.subject, b.class_level, b.location].some((x) => x?.toLowerCase().includes(term))),
  );
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="m-0 text-[22px] font-bold">{tr("কোন ব্যাচে ভর্তি হবে?", "Which batch is it for?")}</h2>
          <p className="m-0 text-[14px] text-[#6B6880]">
            {tr(`ব্যাচে ক্লিক করুন · ${num(batches.length, lang)}টা চালু ব্যাচ`, `Tap a batch · ${batches.length} open batches`)}
          </p>
        </div>
        <label className="flex h-[48px] w-full items-center gap-2.5 rounded-[16px] bg-[#F7F5FC] px-4 sm:w-[340px] focus-within:shadow-[inset_0_0_0_2px_#C9B3FF]">
          <Search className="size-[18px] text-[#8A86A0]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr("ব্যাচ খুঁজুন", "Search batches")} className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#9E9BAD]" />
        </label>
      </div>
      {classes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[null, ...classes].map((c) => (
            <button
              key={c ?? "all"}
              type="button"
              aria-pressed={cls === c}
              onClick={() => setCls(c)}
              className={clsx("rounded-[14px] px-4 py-2.5 text-[14px] font-semibold", cls === c ? "bg-[#5B21B6] text-white" : "bg-[#F3F1FA] text-[#4A4760] hover:bg-[#EFEBF8]")}
            >
              {c ?? tr("সব", "All")}
            </button>
          ))}
        </div>
      )}
      <div className="mt-4 grid gap-3.5 md:grid-cols-2">
        {shown.map((b) => (
          <SeatBatchCard key={b.id} batch={b} selected={b.id === selected} onPick={() => onPick(b.id)} />
        ))}
      </div>
      {shown.length === 0 && <Empty title={tr("কোনো ব্যাচ মেলেনি", "No batch matches")} />}
    </div>
  );
}
