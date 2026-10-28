"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button, ErrorBox, errorText, PageLoader, useToast } from "@/components/ui";
import { can, useMe } from "@/lib/auth";
import { useHydrated, useTodayISO } from "@/lib/clock";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Student } from "@/lib/types";
import { StudentsHeader } from "./components/header/students-header";
import { StudentPreview } from "./components/preview/student-preview";
import { SummaryTiles } from "./components/summary/summary-tiles";
import { StudentListItem } from "./components/table/student-list-item";
import { StudentTable } from "./components/table/student-table";
import { StudentToolbar } from "./components/table/student-toolbar";
import { exportStudentsCsv } from "./lib/export-csv";
import { isNew } from "./lib/student-meta";
import { type StudentFilter, useStudentList } from "./use-student-list";

// Students (স্টুডেন্ট) — counts, the filterable table and, on desktop, a profile preview of
// the picked student. This file only lays sections out; each is its own component.
export default function StudentsPage() {
  // useSearchParams needs a Suspense boundary under cacheComponents.
  return (
    <Suspense fallback={<PageLoader />}>
      <Students />
    </Suspense>
  );
}

/** The preview panel only exists from xl up; smaller screens open the full profile instead. */
const hasPreview = () => window.matchMedia("(min-width: 1280px)").matches;

function Students() {
  const sp = useSearchParams();
  const router = useRouter();
  const to = usePortalPath();
  const { tr, lang } = useLang();
  const toast = useToast();
  const { data: me } = useMe();
  const today = useTodayISO();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [batchId, setBatchId] = useState(sp.get("batch") ?? "");
  const [filter, setFilter] = useState<StudentFilter>("all");
  const [picked, setPicked] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const list = useStudentList({ q, batchId, filter });
  const hydrated = useHydrated();
  if (!hydrated) return <PageLoader />;

  const selected = list.students.find((s) => s.id === picked) ?? list.students[0] ?? null;
  const newToday = (s: Student) => isNew(s, today);
  const subtitle = [
    list.summary && tr(`${num(list.summary.active, lang)} জন চালু`, `${list.summary.active} active`),
    tr(`${num(list.batches.length, lang)}টা ব্যাচে`, `in ${list.batches.length} batches`),
  ]
    .filter(Boolean)
    .join(" · ");

  function select(s: Student) {
    if (hasPreview()) setPicked(s.id);
    else router.push(to(`/students/${s.id}`));
  }

  async function exportCsv() {
    setExporting(true);
    try {
      await exportStudentsCsv(list.params);
    } catch (e) {
      toast(errorText(e, lang) ?? "");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-3 text-[#17161F] [line-height:normal]">
      <StudentsHeader subtitle={subtitle} canAdd={can(me, "student.manage")} onExport={exportCsv} exporting={exporting} />
      <SummaryTiles summary={list.summary} onFilter={setFilter} />

      <div className="grid items-start gap-3.5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="flex min-w-0 flex-col rounded-[24px] bg-white px-3.5 pt-3 pb-1">
          <StudentToolbar q={q} onQ={setQ} batches={list.batches} batchId={batchId} onBatch={setBatchId} filter={filter} onFilter={setFilter} />
          {list.isLoading ? (
            <PageLoader />
          ) : list.error ? (
            <ErrorBox error={list.error} />
          ) : list.students.length === 0 ? (
            <p className="py-10 text-center text-[14px] text-[#6B6880]">{tr("কোনো স্টুডেন্ট পাওয়া যায়নি", "No students found")}</p>
          ) : (
            <>
              <div className="hidden md:block">
                <StudentTable students={list.students} selectedId={selected?.id ?? null} onSelect={select} isNew={newToday} />
              </div>
              <ul className="m-0 list-none p-0 md:hidden">
                {list.students.map((s) => (
                  <StudentListItem key={s.id} student={s} isNew={newToday(s)} />
                ))}
              </ul>
            </>
          )}
          {list.more && (
            <div className="flex justify-center border-t border-[#F3F1FA] py-3">
              <Button variant="outline" size="sm" loading={list.more.loading} onClick={list.more.load}>
                {tr(`আরও দেখুন (${num(list.total - list.students.length, lang)} জন বাকি)`, `Load more (${list.total - list.students.length} left)`)}
              </Button>
            </div>
          )}
        </section>
        <div className="hidden xl:sticky xl:top-6 xl:block">
          {selected && (
            <StudentPreview
              key={selected.id}
              student={selected}
              today={today}
              canEdit={can(me, "student.manage")}
              canCollect={can(me, "payment.record")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
