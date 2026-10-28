import clsx from "clsx";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { BatchMember } from "@/lib/types";
import { owes } from "../../use-batch-detail";

/** "ফি নিন" while something is due (and the user may take fees), otherwise "প্রোফাইল". */
export function RowAction({ member: m, canCollect, className }: { member: BatchMember; canCollect: boolean; className?: string }) {
  const { tr } = useLang();
  const to = usePortalPath();
  const collect = canCollect && owes(m);
  return (
    <Link
      href={collect ? to(`/fees?student=${m.student_id}`) : to(`/students/${m.student_id}`)}
      className={clsx(
        "inline-block rounded-[10px] px-[11px] py-[5px] text-[12.5px] whitespace-nowrap",
        collect
          ? "bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] font-bold text-white hover:text-white hover:brightness-110"
          : "bg-[#F7F5FC] font-semibold text-[#6B6880] hover:bg-[#EFEBF8] hover:text-[#17161F]",
        className,
      )}
    >
      {collect ? tr("ফি নিন", "Collect") : tr("প্রোফাইল", "Profile")}
    </Link>
  );
}
