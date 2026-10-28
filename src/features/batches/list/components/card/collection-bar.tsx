import { digits, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";
import { collectionColor, collectionPct } from "../../../shared/stats";

/** "৳২৯,৬০০ আদায় · ৳৪,০০০ বাকি  ৮৮%" with the month's collection bar. */
export function CollectionBar({ batch: b }: { batch: Batch }) {
  const { tr, lang } = useLang();
  const pct = collectionPct(b);
  const behind = pct != null && pct < 70;
  const line =
    pct == null
      ? tr("এ মাসের ফি এখনো তৈরি হয়নি", "No fees for this month yet")
      : `${taka(b.month_collected, lang)} ${tr("আদায়", "collected")} · ${b.month_due > 0 ? `${taka(b.month_due, lang)} ${tr("বাকি", "due")}` : tr("বাকি নেই", "nothing due")}`;
  return (
    <div>
      <div className="mb-1 flex justify-between gap-2 text-[12px]">
        <span className="truncate" style={behind ? { color: "#D92D20", fontWeight: 600 } : { color: "#6B6880" }}>
          {line}
        </span>
        {pct != null && <b className="num">{digits(pct, lang)}%</b>}
      </div>
      <div className="h-[7px] rounded-[5px] bg-[#F1EEF8]">
        {pct != null && <div className="h-[7px] rounded-[5px]" style={{ width: `${pct}%`, background: collectionColor(pct) }} />}
      </div>
    </div>
  );
}
