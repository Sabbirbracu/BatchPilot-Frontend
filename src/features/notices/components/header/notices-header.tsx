import { HeaderButton } from "@/components/ui";
import { ClockIcon } from "@/features/shared/messages/icons";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/** Title and the count of notices waiting for their scheduled time. */
export function NoticesHeader({ scheduled }: { scheduled: number }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  return (
    <header className="flex flex-wrap items-center gap-2.5">
      <div className="min-w-0 flex-1 basis-[240px]">
        <h1 className="m-0 text-[25px] font-bold">{tr("নোটিশ", "Notices")}</h1>
        <p className="m-0 text-[14px] text-[#6B6880]">{tr("একসাথে অনেক অভিভাবককে জানান — ছুটি, পরীক্ষা, সভা", "Tell many guardians at once — holidays, exams, meetings")}</p>
      </div>
      <HeaderButton href={to("/messages?kind=notice")}>
        <span className="text-[#5B21B6]">
          <ClockIcon />
        </span>
        {tr("নির্ধারিত", "Scheduled")} · {num(scheduled, lang)}
      </HeaderButton>
    </header>
  );
}
