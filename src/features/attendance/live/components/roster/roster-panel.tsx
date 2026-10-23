"use client";

import { useMemo, useState } from "react";
import type { BatchDetail } from "../../types";
import { byPriority } from "../../lib/marks";
import { RosterListItem } from "./roster-list-item";
import { RosterSearch } from "./roster-search";
import { RosterTable } from "./roster-table";
import { StatusTabs, type RosterFilter } from "./status-tabs";

/** Filter tabs + search over the batch's students: a table on laptops, a list on phones. */
export function RosterPanel({ detail, smsAt, notStarted }: { detail: BatchDetail; smsAt: string | null; notStarted: boolean }) {
  const [filter, setFilter] = useState<RosterFilter>("all");
  const [query, setQuery] = useState("");

  const marks = useMemo(() => {
    const q = query.trim();
    return detail.marks.filter((m) => (filter === "all" || m.status === filter) && (!q || m.name.includes(q) || m.roll.includes(q)));
  }, [detail.marks, filter, query]);
  const counts = { all: detail.total, present: detail.onTime, late: detail.late, absent: detail.absent };

  const empty = (
    <p className="py-10 text-center text-[14px] text-[#6B6880]">
      {notStarted ? "ক্লাস এখনো শুরু হয়নি — ডিভাইসে আঙুল দিলেই এখানে দেখা যাবে।" : "এই তালিকায় কেউ নেই।"}
    </p>
  );

  return (
    <section aria-label="স্টুডেন্টদের হাজিরা" className="space-y-3 lg:space-y-0 lg:rounded-[24px] lg:bg-white lg:px-4 lg:pt-3.5 lg:pb-1">
      <div className="flex items-center gap-2.5 rounded-[22px] bg-white p-1.5 md:rounded-[20px] md:p-3 lg:mb-2 lg:rounded-none lg:p-0">
        <StatusTabs value={filter} onChange={setFilter} counts={counts} />
        <span className="hidden flex-1 md:block" />
        <span className="hidden md:flex">
          <RosterSearch value={query} onChange={setQuery} />
        </span>
      </div>
      <div className="rounded-[24px] bg-white px-4 py-1 lg:hidden">{marks.length ? <ul>{[...marks].sort(byPriority).map((m) => <RosterListItem key={m.id} mark={m} />)}</ul> : empty}</div>
      <div className="hidden lg:block">{marks.length ? <RosterTable marks={marks} smsAt={smsAt} /> : empty}</div>
    </section>
  );
}
