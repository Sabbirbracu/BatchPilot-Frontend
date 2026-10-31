import { StatusBadge } from "@/components/ui";
import { dateLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { ChildSummary } from "@/lib/types";

/** Notices from the teacher, recent attendance and recent payments. */
export function RecentLists({ child: c }: { child: ChildSummary }) {
  const { tr, lang } = useLang();
  return (
    <div className="space-y-4">
      {c.notices.length > 0 && (
        <section>
          <h3 className="m-0 mb-1.5 text-[13px] font-bold text-[#6B6880]">{tr("নোটিশ", "Notices")}</h3>
          <ul className="m-0 space-y-1.5 p-0">
            {c.notices.map((n, i) => (
              <li key={i} className="list-none rounded-[12px] bg-[#FFFAEB] px-3 py-2 text-[13px] text-[#7A2E0E]">
                {n.body}
                <span className="mt-0.5 block text-[11.5px] text-[#B54708]">{dateLabel(n.created_at, lang)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <section>
          <h3 className="m-0 mb-1.5 text-[13px] font-bold text-[#6B6880]">{tr("সাম্প্রতিক হাজিরা", "Recent attendance")}</h3>
          {c.recent_attendance.length === 0 ? (
            <p className="m-0 text-[13px] text-[#8A86A0]">—</p>
          ) : (
            <ul className="m-0 space-y-1 p-0">
              {c.recent_attendance.map((a, i) => (
                <li key={i} className="flex list-none items-center justify-between text-[13px]">
                  <span>{dateLabel(a.date, lang)}</span>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3 className="m-0 mb-1.5 text-[13px] font-bold text-[#6B6880]">{tr("সাম্প্রতিক পেমেন্ট", "Recent payments")}</h3>
          {c.recent_payments.length === 0 ? (
            <p className="m-0 text-[13px] text-[#8A86A0]">—</p>
          ) : (
            <ul className="m-0 space-y-1 p-0">
              {c.recent_payments.map((p, i) => (
                <li key={i} className={`flex list-none items-center justify-between text-[13px] ${p.reversed ? "text-[#8A86A0] line-through" : ""}`}>
                  <span>{dateLabel(p.received_at, lang)}</span>
                  <span className="num font-bold">{taka(p.amount, lang)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
