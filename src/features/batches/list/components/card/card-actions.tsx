import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";
import { type MenuItem, MoreMenu } from "@/components/ui";

const btn = "flex-1 rounded-[11px] py-[7px] text-center text-[13px] font-bold";

/** Card footer: হাজিরা · স্টুডেন্ট · ফি · ⋯ */
export function CardActions({ batch: b, canManage, onArchive }: { batch: Batch; canManage: boolean; onArchive: () => void }) {
  const { tr } = useLang();
  const to = usePortalPath();
  const items: MenuItem[] = [{ label: tr("ব্যাচের বিস্তারিত", "Batch details"), href: to(`/batches/${b.id}`) }];
  if (canManage) {
    items.push({ label: tr("এডিট করুন", "Edit"), href: to(`/batches/${b.id}?edit=1`) });
    items.push(
      b.archived_at
        ? { label: tr("আবার চালু করুন", "Re-open"), onClick: onArchive }
        : { label: tr("ব্যাচ বন্ধ করুন", "Close batch"), onClick: onArchive, danger: true },
    );
  }
  return (
    <div className="mt-auto flex gap-2 border-t border-[#F3F1FA] pt-2.5">
      <Link href={to(`/attendance/${b.id}`)} className={`${btn} bg-[#F4EEFF] text-[#5B21B6] hover:bg-[#EBE1FF]`}>
        {tr("হাজিরা", "Attendance")}
      </Link>
      <Link href={to(`/batches/${b.id}`)} className={`${btn} bg-[#F7F5FC] text-[#17161F] hover:bg-[#EFEBF8] hover:text-[#17161F]`}>
        {tr("স্টুডেন্ট", "Students")}
      </Link>
      <Link href={to(`/fees/dues?batch=${b.id}`)} className={`${btn} bg-[#F7F5FC] text-[#17161F] hover:bg-[#EFEBF8] hover:text-[#17161F]`}>
        {tr("ফি", "Fees")}
      </Link>
      <MoreMenu
        items={items}
        label={tr("আরো অপশন", "More options")}
        className="w-9 rounded-[11px] bg-[#F7F5FC] py-1.5 text-center text-[15px] font-bold text-[#6B6880] hover:bg-[#EFEBF8]"
      />
    </div>
  );
}
