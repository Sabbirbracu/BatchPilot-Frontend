import { PrimaryButton, SearchField } from "@/components/ui";
import { PlusIcon } from "@/features/shared/messages/icons";
import { useLang } from "@/lib/i18n";

/** Title, search and "নতুন টেমপ্লেট". */
export function TemplatesHeader({ q, onQ, onNew, canEdit }: { q: string; onQ: (v: string) => void; onNew: () => void; canEdit: boolean }) {
  const { tr } = useLang();
  return (
    <header className="flex flex-wrap items-center gap-2.5">
      <div className="min-w-0 flex-1 basis-[240px]">
        <h1 className="m-0 text-[25px] font-bold">{tr("টেমপ্লেট", "Templates")}</h1>
        <p className="m-0 text-[14px] text-[#6B6880]">{tr("যে মেসেজ বারবার পাঠান, এখানে একবার লিখে রাখুন", "Write the messages you send again and again once, here")}</p>
      </div>
      <SearchField value={q} onChange={onQ} placeholder={tr("খুঁজুন", "Search")} className="min-w-0 basis-full sm:w-[220px] sm:flex-none sm:basis-auto" />
      {canEdit && (
        <PrimaryButton onClick={onNew}>
          <PlusIcon size={18} />
          {tr("নতুন টেমপ্লেট", "New template")}
        </PrimaryButton>
      )}
    </header>
  );
}
