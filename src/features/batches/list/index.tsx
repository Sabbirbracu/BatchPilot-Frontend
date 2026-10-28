"use client";

import { useState } from "react";
import { Empty, ErrorBox, errorText, PageLoader, useToast } from "@/components/ui";
import { can, useMe } from "@/lib/auth";
import { weekdayCode } from "@/lib/class-schedule";
import { useDhakaMinutes, useHydrated, useTodayISO } from "@/lib/clock";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { BatchCard } from "./components/card/batch-card";
import { NewBatchCard } from "./components/card/new-batch-card";
import { FilterBar } from "./components/filters/filter-bar";
import { MonthTotals } from "./components/filters/month-totals";
import { BatchesHeader } from "./components/header/batches-header";
import type { ListView } from "./components/header/view-toggle";
import { WeekRoutine } from "./components/routine/week-routine";
import { useBatchList } from "./use-batch-list";
import { fullDay, nextClass } from "../shared/schedule";
import { useArchiveBatch } from "../shared/use-archive-batch";

// Batches (ব্যাচ) — every batch as a card, or the week as a routine.
// This file only lays sections out; each section is its own component under ./components.
export default function BatchesPage() {
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const toast = useToast();
  const today = useTodayISO();
  const now = useDhakaMinutes();
  const [view, setView] = useState<ListView>("cards");
  const [archived, setArchived] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const list = useBatchList({ archived, group, q });
  const archive = useArchiveBatch();
  const canManage = can(me, "batch.manage");
  const todayCode = today ? weekdayCode(today) : null;
  const hydrated = useHydrated();
  if (!hydrated) return <PageLoader />;

  const subtitle = [
    list.counts.active != null && tr(`${num(list.counts.active, lang)}টা চালু ব্যাচ`, `${list.counts.active} open batches`),
    tr(`${num(list.totals.students, lang)} জন স্টুডেন্ট`, `${list.totals.students} students`),
    todayCode && tr(`আজ ${fullDay(todayCode, lang)}`, `Today is ${fullDay(todayCode, lang)}`),
  ]
    .filter(Boolean)
    .join(" · ");

  function toggleArchive(id: string, restore: boolean) {
    archive.mutate(
      { id, restore },
      {
        onSuccess: () => toast(restore ? tr("ব্যাচ আবার চালু হয়েছে", "Batch re-opened") : tr("ব্যাচ বন্ধ হয়েছে, ডেটা থাকবে", "Batch closed, data kept")),
        onError: (e) => toast(errorText(e, lang) ?? ""),
      },
    );
  }

  return (
    <div className="space-y-3 text-[#17161F] [line-height:normal]">
      <BatchesHeader subtitle={subtitle} q={q} onQ={setQ} view={view} onView={setView} canCreate={canManage} />
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
        <FilterBar
          archived={archived}
          onArchived={(v) => {
            setArchived(v);
            setGroup(null);
          }}
          counts={list.counts}
          groups={list.groups}
          group={group}
          onGroup={setGroup}
        />
        {!archived && <MonthTotals {...list.totals} className="lg:ml-auto lg:flex-none" />}
      </div>

      {list.isLoading ? (
        <PageLoader />
      ) : list.error ? (
        <ErrorBox error={list.error} />
      ) : view === "routine" ? (
        <WeekRoutine batches={list.batches} todayCode={todayCode} />
      ) : list.batches.length === 0 && (archived || !canManage || q || group) ? (
        <Empty title={q || group ? tr("এমন কোনো ব্যাচ নেই", "No matching batches") : tr("কোনো ব্যাচ নেই", "No batches")} />
      ) : (
        <section aria-label={tr("ব্যাচের তালিকা", "Batch list")} className="grid gap-3.5 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
          {list.batches.map((b) => (
            <BatchCard
              key={b.id}
              batch={b}
              next={nextClass(b, today, now)}
              canManage={canManage}
              onArchive={() => toggleArchive(b.id, !!b.archived_at)}
            />
          ))}
          {canManage && !archived && !q && !group && <NewBatchCard />}
        </section>
      )}
    </div>
  );
}
