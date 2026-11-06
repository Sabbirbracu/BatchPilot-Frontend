import { AppHeader } from "@/components/layout/app-header";
import { HeaderButton, PrimaryLink } from "@/components/ui";
import { MegaphoneIcon, TemplateIcon } from "@/features/shared/messages/icons";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/** Title, link to templates and the "নোটিশ পাঠান" call-to-action. */
export function SmsHeader({ canNotice, canTemplates }: { canNotice: boolean; canTemplates: boolean }) {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <AppHeader
      title="SMS"
      subtitle={<span className="hidden md:inline">{tr("অভিভাবকের ফোনে যাওয়া সব মেসেজ এক জায়গায়", "Every message sent to guardians, in one place")}</span>}
      toolbar={
        (canTemplates || canNotice) && (
        <>
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
        </>
        )
      }
    />
  );
}
