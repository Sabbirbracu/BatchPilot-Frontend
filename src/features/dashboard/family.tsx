"use client";

import { useQuery } from "@tanstack/react-query";
import { CalendarCheck, Wallet } from "lucide-react";
import { Card, Empty, ErrorBox, PageLoader, StatusBadge } from "@/components/ui";
import { api } from "@/lib/api";
import { useMe } from "@/lib/auth";
import { dateLabel, digits, monthLabel, num, phoneLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortal } from "@/lib/portal";
import type { ChildSummary, FamilyDashboardData } from "@/lib/types";

// Guardian portal (Blueprint F15) and student portal: read-only view of their own fees and attendance.
export default function FamilyDashboard() {
  const portal = usePortal();
  const { tr } = useLang();
  const { data: me } = useMe();
  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboard", portal],
    queryFn: () => api<FamilyDashboardData>(`/dashboard/${portal}`),
  });

  if (isLoading) return <PageLoader />;
  if (error || !data) return <ErrorBox error={error} />;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">
          {portal === "guardian" ? tr("অভিভাবক প্যানেল", "Guardian portal") : tr("স্টুডেন্ট প্যানেল", "Student portal")}
        </h1>
        <p className="text-sm text-muted">
          {data.institution_name} · {phoneLabel(me?.user.phone)}
        </p>
      </div>
      {data.children.length === 0 ? (
        <Card>
          <Empty title={tr("এই নম্বরে কোনো চালু স্টুডেন্ট পাওয়া যায়নি", "No active student found for this number")} />
        </Card>
      ) : (
        data.children.map((c) => <ChildCard key={c.student_id} child={c} bkash={data.bkash_number} />)
      )}
      <p className="text-center text-xs text-muted">
        {tr("পরীক্ষার নম্বর, নোটিশ ও অনলাইন পেমেন্ট শীঘ্রই আসছে।", "Exam results, notices and online payment are coming soon.")}
      </p>
    </div>
  );
}

function ChildCard({ child: c, bkash }: { child: ChildSummary; bkash: string | null }) {
  const { tr, lang } = useLang();
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line p-4">
        <div className="text-lg font-bold">{c.name}</div>
        <div className="text-sm text-muted">
          {tr("রোল", "Roll")} {digits(c.roll_no, lang)} · {c.batch_names.join(", ")}
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-line border-b border-line">
        <div className="p-4">
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <Wallet className="size-4" /> {tr("বকেয়া", "Due")}
          </div>
          <div className={`num mt-1 text-2xl font-bold ${c.outstanding > 0 ? "text-due" : "text-purple"}`}>{taka(c.outstanding, lang)}</div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <CalendarCheck className="size-4" /> {tr("উপস্থিতি", "Attendance")}
          </div>
          <div className="num mt-1 text-2xl font-bold">{c.attendance_rate != null ? `${num(Math.round(c.attendance_rate), lang)}%` : "—"}</div>
          <div className="text-xs text-muted">
            {tr(`${num(c.present, lang)} দিন উপস্থিত · ${num(c.absent, lang)} দিন অনুপস্থিত`, `${c.present} present · ${c.absent} absent`)}
          </div>
        </div>
      </div>

      {c.open_dues.length > 0 && (
        <div className="space-y-2 border-b border-line p-4">
          {c.open_dues.map((d) => (
            <div key={`${d.month}-${d.batch_name}`} className="flex items-center justify-between text-sm">
              <span>
                {monthLabel(d.month, lang, true)} <span className="text-muted">· {d.batch_name}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="num font-semibold text-due">{taka(d.outstanding, lang)}</span>
                <StatusBadge status={d.status} />
              </span>
            </div>
          ))}
          {bkash && (
            <p className="rounded-lg bg-lavender px-3 py-2 text-sm text-purple-deep">
              {tr(
                `বিকাশে পাঠাতে পারেন: ${phoneLabel(bkash, lang)} — রেফারেন্সে রোল ${digits(c.roll_no, lang)} লিখুন।`,
                `You can pay by bKash: ${phoneLabel(bkash)} — use roll ${c.roll_no} as reference.`,
              )}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-muted">{tr("সাম্প্রতিক হাজিরা", "Recent attendance")}</h3>
          {c.recent_attendance.length === 0 ? (
            <p className="text-sm text-muted">—</p>
          ) : (
            <ul className="space-y-1.5">
              {c.recent_attendance.map((a, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span>{dateLabel(a.date, lang)}</span>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-muted">{tr("সাম্প্রতিক পেমেন্ট", "Recent payments")}</h3>
          {c.recent_payments.length === 0 ? (
            <p className="text-sm text-muted">—</p>
          ) : (
            <ul className="space-y-1.5">
              {c.recent_payments.map((p, i) => (
                <li key={i} className={`flex items-center justify-between text-sm ${p.reversed ? "text-muted line-through" : ""}`}>
                  <span>{dateLabel(p.received_at, lang)}</span>
                  <span className="num font-semibold">{taka(p.amount, lang)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}
