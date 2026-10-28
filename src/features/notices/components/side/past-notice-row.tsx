import { KindBadge, noticeLook } from "@/features/shared/messages/kinds";
import { toDisplay } from "@/features/shared/messages/vars";
import { dateShort, num, timeShort } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { NoticeRecord } from "@/lib/types";

/** One earlier notice: icon, title and date, first line of the text, who got it. */
export function PastNoticeRow({ notice: n }: { notice: NoticeRecord }) {
  const { tr, lang } = useLang();
  return (
    <div className="flex gap-2.5 border-t border-[#F3F1FA] py-[9px] first-of-type:border-t-0">
      <KindBadge look={noticeLook(n.title)} size={34} radius={11} />
      <div className="min-w-0 flex-1">
        <div className="flex gap-2">
          <p className="m-0 flex-1 truncate text-[13.5px] font-bold">{n.title || tr("নোটিশ", "Notice")}</p>
          <span className="num flex-none text-[11.5px] text-[#6B6880]">{dateShort(n.created_at, lang)}</span>
        </div>
        <p className="m-0 truncate text-[12px] text-[#3B3850]">{toDisplay(n.message, lang)}</p>
        <p className="num m-0 mt-0.5 text-[11.5px] font-semibold" style={{ color: n.pending ? "#B07C00" : "#039855" }}>
          {n.pending ? `◷ ${dateShort(n.send_at!, lang)} ${timeShort(n.send_at!, lang)} · ` : "✓ "}
          {n.targets.join(", ") || tr("সব ব্যাচ", "All batches")} · {tr(`${num(n.queued, lang)} জন`, `${n.queued}`)}
        </p>
      </div>
    </div>
  );
}
