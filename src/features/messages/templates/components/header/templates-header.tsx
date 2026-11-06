import { AppHeader } from "@/components/layout/app-header";
import { PrimaryButton, SearchField } from "@/components/ui";
import { PlusIcon } from "@/features/shared/messages/icons";
import { useLang } from "@/lib/i18n";

/** Title, search and "নতুন টেমপ্লেট". */
export function TemplatesHeader({ q, onQ, onNew, canEdit }: { q: string; onQ: (v: string) => void; onNew: () => void; canEdit: boolean }) {
  const { tr } = useLang();
  return (
    <AppHeader
      title={tr("টেমপ্লেট", "Templates")}
      subtitle={<span className="hidden md:inline">{tr("যে মেসেজ বারবার পাঠান, এখানে একবার লিখে রাখুন", "Write the messages you send again and again once, here")}</span>}
      toolbar={
        <>
      <SearchField value={q} onChange={onQ} placeholder={tr("খুঁজুন", "Search")} className="min-w-0 flex-1 md:w-[220px] md:flex-none" />
      {canEdit && (
        <PrimaryButton onClick={onNew}>
          <PlusIcon size={18} />
          {tr("নতুন টেমপ্লেট", "New template")}
        </PrimaryButton>
      )}
        </>
      }
    />
  );
}
