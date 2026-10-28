"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ErrorBox, PageLoader } from "@/components/ui";
import { api } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { useHydrated, useTodayISO } from "@/lib/clock";
import { usePortalPath } from "@/lib/portal";
import type { Student } from "@/lib/types";
import { CollectPanel } from "./components/collect/collect-panel";
import { FeesHeader } from "./components/header/fees-header";
import { ReminderCard } from "./components/side/reminder-card";
import { TodayPayments } from "./components/side/today-payments";
import { FeeSummary } from "./components/summary/fee-summary";
import { monthOf } from "./lib/dates";
import { useFeeDesk } from "./use-fee-desk";

// Fees (ফি) — the month at a glance, the collect form, today's payments and due reminders.
// This file only lays sections out; each is its own component under ./components.
export default function FeesPage() {
  // useSearchParams needs a Suspense boundary under cacheComponents.
  return (
    <Suspense fallback={<PageLoader />}>
      <FeeDesk />
    </Suspense>
  );
}

function FeeDesk() {
  const params = useSearchParams();
  const router = useRouter();
  const to = usePortalPath();
  const { data: me } = useMe();
  const today = useTodayISO();
  const current = today ? monthOf(today) : null;
  const [month, setMonth] = useState<string | null>(null);
  const shown = month ?? current;
  const desk = useFeeDesk(shown, today);
  // ?student=… (from a profile or batch page) opens the form on that student.
  const preselected = params.get("student");
  const pre = useQuery({ queryKey: ["student", preselected], queryFn: () => api<Student>(`/students/${preselected}`), enabled: !!preselected });
  const [picked, setPicked] = useState<Student | null | undefined>(undefined);
  const hydrated = useHydrated();
  if (!hydrated || !current || !shown) return <PageLoader />;

  const student = picked === undefined ? (pre.data ?? null) : picked;
  const remindersOn = !!me?.institution?.settings.reminders_enabled;
  function pick(s: Student | null) {
    setPicked(s);
    if (preselected) router.replace(to("/fees"));
  }

  return (
    <div className="space-y-3 text-[#17161F] [line-height:normal]">
      <FeesHeader month={shown} current={current} onMonth={setMonth} dueStudents={desk.overview?.due_students ?? null} />
      {desk.error && <ErrorBox error={desk.error} />}
      {desk.overview && <FeeSummary data={desk.overview} remindersOn={remindersOn} />}
      <div className="grid items-start gap-3.5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <CollectPanel student={student} onStudent={pick} currentMonth={current} canDiscount={can(me, "due.discount")} />
        <aside className="grid gap-3 md:grid-cols-2 xl:flex xl:flex-col">
          <TodayPayments payments={desk.payments} total={desk.overview?.today_amount ?? 0} />
          <ReminderCard dueStudents={desk.overview?.due_students ?? 0} remindersOn={remindersOn} canSend={can(me, "payment.record")} />
        </aside>
      </div>
    </div>
  );
}
