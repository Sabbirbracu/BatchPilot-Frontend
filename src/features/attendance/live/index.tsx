"use client";

import { useState } from "react";
import { ErrorBox, PageLoader } from "@/components/ui";
import { AutoSmsCard } from "./components/auto-sms/auto-sms-card";
import { BatchSheetPicker } from "./components/batch-picker/batch-sheet-picker";
import { AttendanceHeader } from "./components/header/attendance-header";
import { LiveFeed } from "./components/live/live-feed";
import { RosterPanel } from "./components/roster/roster-panel";
import { BatchHero } from "./components/summary/batch-hero";
import { SummaryStrip } from "./components/summary/summary-strip";
import { WeekChart } from "./components/week/week-chart";
import { useAttendanceView } from "./use-attendance-view";
import "./attendance.css";

// Attendance (হাজিরা) — live view of today's batches as the fingerprint device marks students.
// This file only lays sections out; each section is its own component under ./components.
// Text uses the font's natural line height (as in the design), so sizes are px values.
export default function AttendancePage() {
  const [picked, setPicked] = useState<string | null>(null);
  const { view, selectedId, isLoading, error } = useAttendanceView(picked);
  if (isLoading) return <PageLoader />;
  if (error) return <ErrorBox error={error} />;

  const batch = view.batches.find((b) => b.id === selectedId) ?? null;
  const detail = batch ? view.detail(batch.id) : null;
  const notStarted = batch?.state === "upcoming" || batch?.state === "exam";
  const smsAt = view.autoSms?.at ?? null;

  return (
    <div className="space-y-5 text-[#17161F] [line-height:normal] md:space-y-6">
      <AttendanceHeader date={view.date} batchId={selectedId} demo={view.demo} batches={view.batches} onSelectBatch={setPicked} />
      {view.batches.length > 0 ? (
        <BatchSheetPicker batches={view.batches} selectedId={selectedId} onSelect={setPicked} className="md:hidden" />
      ) : (
        <p className="rounded-[24px] bg-white py-10 text-center text-[15px] text-[#6B6880]">আজ কোনো ব্যাচ নেই।</p>
      )}

      {batch && (
        <div className="grid gap-5 md:gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-5 md:space-y-6">
            {detail ? (
              <>
                <BatchHero batch={batch} detail={detail} className="md:hidden" />
                <SummaryStrip batch={batch} detail={detail} className="hidden md:grid" />
                {smsAt && detail.absent > 0 && <AutoSmsCard at={smsAt} absent={detail.absent} variant="banner" className="lg:hidden" />}
                <RosterPanel key={batch.id} detail={detail} smsAt={smsAt} notStarted={notStarted} />
              </>
            ) : (
              <PageLoader />
            )}
          </div>
          <aside className="grid content-start gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-1">
            <LiveFeed events={view.live} />
            {smsAt && detail && detail.absent > 0 && <AutoSmsCard at={smsAt} absent={detail.absent} variant="panel" className="hidden lg:block" />}
            {view.week && <WeekChart days={view.week} />}
          </aside>
        </div>
      )}
    </div>
  );
}
