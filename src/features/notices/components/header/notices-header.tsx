import { AppHeader } from "@/components/layout/app-header";
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
    <AppHeader
      title={tr("নোটিশ", "Notices")}
      subtitle={<span className="hidden md:inline">{tr("একসাথে অনেক অভিভাবককে জানান — ছুটি, পরীক্ষা, সভা", "Tell many guardians at once — holidays, exams, meetings")}</span>}
      toolbar={
      <HeaderButton href={to("/messages?kind=notice")}>
        <span className="text-[#5B21B6]">
          <ClockIcon />
        </span>
        {tr("নির্ধারিত", "Scheduled")} · {num(scheduled, lang)}
      </HeaderButton>
      }
    />
  );
}
