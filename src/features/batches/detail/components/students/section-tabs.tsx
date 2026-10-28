import Link from "next/link";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/**
 * Tabs across the top of the panel. Students are shown here; the other tabs open the
 * batch's page in the matching module. পরীক্ষা waits for the exams module.
 */
export function SectionTabs({ batchId, count }: { batchId: string; count: number }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const tab = "flex-none px-3 pt-1.5 pb-2.5 text-[14px] whitespace-nowrap";
  const others: { label: string; href: string | null }[] = [
    { label: tr("হাজিরা", "Attendance"), href: to(`/attendance/${batchId}`) },
    { label: tr("ফি ও বকেয়া", "Fees & dues"), href: to(`/fees/dues?batch=${batchId}`) },
    { label: tr("পরীক্ষা", "Exams"), href: null },
    { label: tr("নোটিশ", "Notices"), href: to("/notices") },
  ];
  return (
    <div className="-mx-4 mb-2.5 flex items-center gap-1 overflow-x-auto border-b border-[#F1EEF8] px-4 [scrollbar-width:none]">
      <span aria-current="page" className={`${tab} font-bold text-[#5B21B6] shadow-[inset_0_-2.5px_0_#5B21B6]`}>
        {tr("স্টুডেন্ট", "Students")} {num(count, lang)}
      </span>
      {others.map((o) =>
        o.href ? (
          <Link key={o.label} href={o.href} className={`${tab} text-[#6B6880] hover:text-[#17161F]`}>
            {o.label}
          </Link>
        ) : (
          <span key={o.label} className={`${tab} cursor-default text-[#B9B5CC]`} title={tr("শীঘ্রই আসছে", "Coming soon")}>
            {o.label}
          </span>
        ),
      )}
    </div>
  );
}
