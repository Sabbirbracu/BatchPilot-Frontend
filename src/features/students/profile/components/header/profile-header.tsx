import Link from "next/link";
import { HeaderButton, type MenuItem, MoreMenu, PrimaryLink } from "@/components/ui";
import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Student } from "@/lib/types";

const whiteBtn = "flex h-[42px] flex-none items-center justify-center rounded-[14px] bg-white text-[#17161F] hover:bg-[#FAF9FD]";

/** Back, "স্টুডেন্ট / আইডি ১০০০০১", the name with চালু/ছেড়ে দিয়েছে, then এডিট · ⋯ · ফি নিন. */
export function ProfileHeader({
  student: s,
  canEdit,
  canCollect,
  menu,
  onEdit,
}: {
  student: Student;
  canEdit: boolean;
  canCollect: boolean;
  menu: MenuItem[];
  onEdit: () => void;
}) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const left = s.status === "left";
  return (
    <header className="flex flex-wrap items-center gap-3">
      <Link href={to("/students")} aria-label={tr("স্টুডেন্ট তালিকায় ফিরুন", "Back to students")} className={`${whiteBtn} w-[42px] text-[#3B3850]`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-[13px] text-[#9E9BAD]">
          <Link href={to("/students")} className="text-[#6B6880]">
            {tr("স্টুডেন্ট", "Students")}
          </Link>
          <span className="num">
            {" / "}
            {tr("আইডি", "ID")} {digits(s.student_code, lang)}
          </span>
        </p>
        <h1 className="m-0 flex flex-wrap items-center gap-x-2.5 text-[20px] font-bold md:text-[24px]">
          <span className="min-w-0 truncate">{s.name}</span>
          <span
            className="rounded-[9px] px-[9px] py-0.5 text-[12px] font-bold"
            style={left ? { background: "#F3F1FA", color: "#6B6880" } : { background: "#ECFDF3", color: "#039855" }}
          >
            {left ? tr("ছেড়ে দিয়েছে", "Left") : tr("চালু", "Active")}
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
        {canCollect && !left && (
          <PrimaryLink href={to(`/fees?student=${s.id}`)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2.5" y="6" width="19" height="13" rx="3" />
              <circle cx="12" cy="12.5" r="2.5" />
            </svg>
            {tr("ফি নিন", "Collect fee")}
          </PrimaryLink>
        )}
      </div>
    </header>
  );
}
