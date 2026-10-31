import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { ChildSummary } from "@/lib/types";
import { ChildStats } from "./child-stats";
import { ClassTimes } from "./class-times";
import { OpenDues } from "./open-dues";
import { RecentLists } from "./recent-lists";

/** One child at one teacher: due and attendance, class times, what is owed, notices and history. */
export function ChildCard({ child: c, bkash }: { child: ChildSummary; bkash: string | null }) {
  const { tr, lang } = useLang();
  return (
    <article className="space-y-3.5 rounded-[22px] bg-white p-4">
      <div>
        <p className="m-0 text-[18px] font-extrabold">{c.name}</p>
        <p className="m-0 text-[13px] text-[#6B6880]">
          {tr("আইডি", "ID")} {digits(c.student_code, lang)}
          {c.class_level && ` · ${c.class_level}`}
        </p>
      </div>
      <ChildStats child={c} />
      {c.batches.length > 0 && <ClassTimes batches={c.batches} />}
      <OpenDues child={c} bkash={bkash} />
      <RecentLists child={c} />
    </article>
  );
}
