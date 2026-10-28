import { HeaderButton, PrimaryLink } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/** Title + count line, diary import (coming), Excel export and "নতুন স্টুডেন্ট". */
export function StudentsHeader({
  subtitle,
  canAdd,
  onExport,
  exporting,
}: {
  subtitle: string;
  canAdd: boolean;
  onExport: () => void;
  exporting: boolean;
}) {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <header className="flex flex-wrap items-center gap-3">
      <div className="min-w-0 flex-1">
        <h1 className="m-0 text-[25px] font-bold">{tr("স্টুডেন্ট", "Students")}</h1>
        <p className="m-0 text-[14px] text-[#6B6880]">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 max-md:w-full">
        <HeaderButton disabled title={tr("শীঘ্রই আসছে", "Coming soon")} className="max-md:hidden">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#B07C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="6" width="18" height="14" rx="3" />
            <circle cx="12" cy="13" r="3.5" />
            <path d="M8 6l1.5-2.5h5L16 6" />
          </svg>
          {tr("ডায়েরি থেকে ইমপোর্ট", "Import from diary")}
          <span className="rounded-[7px] bg-[#F4EEFF] px-1.5 py-px text-[10.5px] font-bold text-[#5B21B6]">{tr("শীঘ্রই", "Soon")}</span>
        </HeaderButton>
        <HeaderButton onClick={onExport} disabled={exporting} className="max-md:flex-1">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
          </svg>
          {exporting ? tr("তৈরি হচ্ছে…", "Preparing…") : "Excel"}
        </HeaderButton>
        {canAdd && (
          <PrimaryLink href={to("/students/new")} className="max-md:flex-1 max-md:justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
            {tr("নতুন স্টুডেন্ট", "New student")}
          </PrimaryLink>
        )}
      </div>
    </header>
  );
}
