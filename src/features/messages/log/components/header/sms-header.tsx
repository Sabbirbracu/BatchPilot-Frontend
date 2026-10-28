import { HeaderButton, PrimaryLink } from "@/components/ui";
import { MegaphoneIcon, TemplateIcon } from "@/features/shared/messages/icons";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/** Title, link to templates and the "নোটিশ পাঠান" call-to-action. */
export function SmsHeader({ canNotice, canTemplates }: { canNotice: boolean; canTemplates: boolean }) {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <header className="flex flex-wrap items-center gap-2.5">
      <div className="min-w-0 flex-1 basis-[240px]">
        <h1 className="m-0 text-[25px] font-bold">SMS</h1>
        <p className="m-0 text-[14px] text-[#6B6880]">{tr("অভিভাবকের ফোনে যাওয়া সব মেসেজ এক জায়গায়", "Every message sent to guardians, in one place")}</p>
      </div>
      {canTemplates && (
        <HeaderButton href={to("/messages/templates")}>
          <span className="text-[#5B21B6]">
            <TemplateIcon />
          </span>
          {tr("টেমপ্লেট", "Templates")}
        </HeaderButton>
      )}
      {canNotice && (
        <PrimaryLink href={to("/notices")}>
          <MegaphoneIcon size={18} />
          {tr("নোটিশ পাঠান", "Send notice")}
        </PrimaryLink>
      )}
    </header>
  );
}
