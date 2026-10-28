import Link from "next/link";
import { BatchChip } from "@/features/shared/batch-chip";
import { usePortalPath } from "@/lib/portal";
import type { Student } from "@/lib/types";
import { FeeStatus } from "./fee-status";
import { StudentCell } from "./student-cell";

/** Phone row: opens the full profile (there is no side preview on small screens). */
export function StudentListItem({ student: s, isNew }: { student: Student; isNew: boolean }) {
  const to = usePortalPath();
  return (
    <li className="border-t border-[#F3F1FA] first:border-t-0">
      <Link href={to(`/students/${s.id}`)} className="flex items-center gap-3 py-2.5 text-[#17161F] hover:text-[#17161F]">
        <div className="min-w-0 flex-1">
          <StudentCell student={s} isNew={isNew} avatarClass="size-10" />
          {s.batch_names.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1 pl-[49px]">
              {s.batch_names.map((n) => (
                <BatchChip key={n} name={n} />
              ))}
            </div>
          )}
        </div>
        <FeeStatus student={s} />
      </Link>
    </li>
  );
}
