"use client";

import { useState } from "react";
import { PageLoader } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { BatchMember } from "@/lib/types";
import { LOW_ATTENDANCE } from "@/features/shared/attendance";
import { owes } from "../../use-batch-detail";
import { SectionTabs } from "./section-tabs";
import { type MemberFilter, StudentFilters } from "./student-filters";
import { StudentListItem } from "./student-list-item";
import { StudentTable } from "./student-table";

/** White panel: tabs, filters, then the students as a table (tablet up) or a list (phone). */
export function StudentsPanel({
  batchId,
  members,
  loading,
  feeHeading,
  canCollect,
}: {
  batchId: string;
  members: BatchMember[];
  loading: boolean;
  feeHeading: string;
  canCollect: boolean;
}) {
  const { tr } = useLang();
  const [filter, setFilter] = useState<MemberFilter>("all");
  const [q, setQ] = useState("");

  const owing = members.filter(owes);
  const low = members.filter((m) => m.attendance != null && m.attendance < LOW_ATTENDANCE);
  const term = q.trim().toLowerCase();
  const digitsOnly = term.replace(/\D/g, "");
  const shown = (filter === "owing" ? owing : filter === "low" ? low : members).filter(
    (m) =>
      !term ||
      m.name.toLowerCase().includes(term) ||
      m.student_code === term ||
      (digitsOnly.length >= 3 && (m.guardian_phone ?? "").includes(digitsOnly)),
  );

  return (
    <section className="flex min-w-0 flex-col rounded-[24px] bg-white px-4 pt-3 pb-1">
      <SectionTabs batchId={batchId} count={members.length} />
      <StudentFilters value={filter} onChange={setFilter} owing={owing.length} low={low.length} q={q} onQ={setQ} />
      {loading ? (
        <PageLoader />
      ) : shown.length === 0 ? (
        <p className="py-10 text-center text-[14px] text-[#6B6880]">
          {members.length === 0 ? tr("এই ব্যাচে এখনো কোনো স্টুডেন্ট নেই", "No students in this batch yet") : tr("কাউকে পাওয়া যায়নি", "No one found")}
        </p>
      ) : (
        <>
          <div className="hidden md:block">
            <StudentTable members={shown} feeHeading={feeHeading} canCollect={canCollect} />
          </div>
          <ul className="m-0 list-none p-0 md:hidden">
            {shown.map((m) => (
              <StudentListItem key={m.student_id} member={m} canCollect={canCollect} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
