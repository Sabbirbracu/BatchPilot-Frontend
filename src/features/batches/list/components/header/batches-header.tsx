import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import { PrimaryLink, SearchField } from "@/components/ui";
import { type ListView, ViewToggle } from "./view-toggle";

/** Title + summary line, then search · filter · view switch and "নতুন ব্যাচ". Phones: search on its own row, filter + view below. */
export function BatchesHeader({
  subtitle,
  q,
  onQ,
  view,
  onView,
  canCreate,
  filter,
}: {
  subtitle: string;
  q: string;
  onQ: (v: string) => void;
  view: ListView;
  onView: (v: ListView) => void;
  canCreate: boolean;
  filter: React.ReactNode;
}) {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <header className="flex flex-wrap items-center gap-3">
      <div className="min-w-[180px] flex-1">
        <h1 className="m-0 text-[25px] font-bold">{tr("ব্যাচ", "Batches")}</h1>
        <p className="m-0 text-[14px] text-[#6B6880]">{subtitle}</p>
      </div>
      {canCreate && (
        <PrimaryLink href={to("/batches/new")} className="lg:order-last">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          {tr("নতুন ব্যাচ", "New batch")}
        </PrimaryLink>
      )}
      <div className="flex w-full flex-wrap items-center gap-3 md:flex-nowrap lg:w-auto">
        <SearchField
          value={q}
          onChange={onQ}
          placeholder={tr("ব্যাচ খুঁজুন", "Search batches")}
          className="min-w-0 basis-full md:flex-1 md:basis-auto lg:w-[220px] lg:flex-none"
        />
        <div className="min-w-0 flex-1 md:w-[210px] md:flex-none">{filter}</div>
        <ViewToggle value={view} onChange={onView} />
      </div>
    </header>
  );
}
