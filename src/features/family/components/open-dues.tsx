import { StatusBadge } from "@/components/ui";
import { digits, dueLabel, phoneLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { ChildSummary } from "@/lib/types";

/** What is owed, by month or fee name ("ভর্তি ফি", "কিস্তি ১/৩"), and how to pay by bKash. */
export function OpenDues({ child: c, bkash }: { child: ChildSummary; bkash: string | null }) {
  const { tr, lang } = useLang();
  if (c.open_dues.length === 0) return null;
  return (
    <div className="space-y-2">
      {c.open_dues.map((d, i) => (
        <div key={`${d.month}-${d.kind}-${d.batch_name}-${i}`} className="flex items-center justify-between gap-2 text-[13.5px]">
          <span className="min-w-0 truncate">
            {dueLabel(d, lang, d.kind === "monthly")} <span className="text-[#6B6880]">· {d.batch_name}</span>
          </span>
          <span className="flex flex-none items-center gap-2">
            <span className="num font-bold text-[#D92D20]">{taka(d.outstanding, lang)}</span>
            <StatusBadge status={d.status} />
          </span>
        </div>
      ))}
      {bkash && (
        <p className="m-0 rounded-[12px] bg-[#F4EEFF] px-3 py-2 text-[12.5px] text-[#3B1A86]">
          {tr(
            `বিকাশে পাঠাতে পারেন: ${phoneLabel(bkash, lang)} — রেফারেন্সে আইডি ${digits(c.student_code, lang)} লিখুন।`,
            `You can pay by bKash: ${phoneLabel(bkash)} — use ID ${c.student_code} as reference.`,
          )}
        </p>
      )}
    </div>
  );
}
