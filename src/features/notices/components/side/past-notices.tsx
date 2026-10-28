import Link from "next/link";
import { Surface } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { NoticeRecord } from "@/lib/types";
import { PastNoticeRow } from "./past-notice-row";

/** "আগের নোটিশ" with a link to every notice SMS in the log. */
export function PastNotices({ notices }: { notices: NoticeRecord[] }) {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <Surface className="min-h-0 flex-1 px-4 py-3">
      <div className="flex items-center">
        <h2 className="m-0 flex-1 text-[16px] font-bold">{tr("আগের নোটিশ", "Earlier notices")}</h2>
        <Link href={to("/messages?kind=notice")} className="text-[12.5px] font-bold">
          {tr("সব →", "All →")}
        </Link>
      </div>
      {notices.length === 0 ? (
        <p className="m-0 py-6 text-center text-[13px] text-[#9E9BAD]">{tr("এখনো কোনো নোটিশ পাঠানো হয়নি", "No notices sent yet")}</p>
      ) : (
        notices.map((n) => <PastNoticeRow key={n.id} notice={n} />)
      )}
    </Surface>
  );
}
