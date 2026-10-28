import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";
import { HeaderButton, type MenuItem, MoreMenu, PrimaryLink } from "@/components/ui";
import { batchTitle } from "@/features/shared/batch-tone";

const whiteBtn = "flex h-[42px] flex-none items-center justify-center rounded-[14px] bg-white text-[#17161F] hover:bg-[#FAF9FD]";

/** Back button, breadcrumb, title with চালু/বন্ধ, then এডিট · ⋯ · স্টুডেন্ট যোগ. */
export function DetailHeader({
  batch: b,
  canEdit,
  canAddStudent,
  menu,
  onEdit,
}: {
  batch: Batch;
  canEdit: boolean;
  canAddStudent: boolean;
  menu: MenuItem[];
  onEdit: () => void;
}) {
  const { tr } = useLang();
  const to = usePortalPath();
  const closed = !!b.archived_at;
  return (
    <header className="flex flex-wrap items-center gap-3">
      <Link href={to("/batches")} aria-label={tr("ব্যাচ তালিকায় ফিরুন", "Back to batches")} className={`${whiteBtn} w-[42px] text-[#3B3850]`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-[13px] text-[#9E9BAD]">
          <Link href={to("/batches")} className="text-[#6B6880]">
            {tr("ব্যাচ", "Batches")}
          </Link>
          {" / "}
          {b.class_level || b.name}
        </p>
        <h1 className="m-0 flex flex-wrap items-center gap-x-2.5 text-[20px] font-bold md:text-[24px]">
          {batchTitle(b)}
          <span
            className="rounded-[9px] px-[9px] py-0.5 text-[12px] font-bold"
            style={closed ? { background: "#F3F1FA", color: "#6B6880" } : { background: "#ECFDF3", color: "#039855" }}
          >
            {closed ? tr("বন্ধ", "Closed") : tr("চালু", "Open")}
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-3 max-md:w-full max-md:justify-end">
        {canEdit && (
          <HeaderButton onClick={onEdit}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
            </svg>
            {tr("এডিট", "Edit")}
          </HeaderButton>
        )}
        {menu.length > 0 && (
          <MoreMenu items={menu} label={tr("আরো অপশন", "More options")} placement="down" className={`${whiteBtn} w-[42px] text-[18px] font-bold text-[#6B6880]`} />
        )}
        {canAddStudent && !closed && (
          <PrimaryLink href={to(`/students/new?batch=${b.id}`)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <circle cx="10" cy="8" r="3.5" />
              <path d="M4 20a6 6 0 0 1 12 0M19 8v6M16 11h6" />
            </svg>
            {tr("স্টুডেন্ট যোগ", "Add student")}
          </PrimaryLink>
        )}
      </div>
    </header>
  );
}
