"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card, ErrorBox, PageLoader } from "@/components/ui";
import { api } from "@/lib/api";
import { useMe } from "@/lib/auth";
import { num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { StaffDashboardData } from "@/lib/types";
import { QuickActions } from "./quick-actions";

// Staff (assistant) home — Blueprint screen 4: two big buttons, my cash, today's batches, call list.
export default function StaffDashboard() {
  const to = usePortalPath();
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const { data: d, error, isLoading } = useQuery({
    queryKey: ["dashboard", "staff"],
    queryFn: () => api<StaffDashboardData>("/dashboard/staff"),
    refetchInterval: 60_000,
  });
  const name = me?.user.name ?? "";

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">{tr(`শুভেচ্ছা, ${name}`, `Hello, ${name}`)}</h1>
      <QuickActions />
      {isLoading ? (
        <PageLoader />
      ) : error || !d ? (
        <ErrorBox error={error} />
      ) : (
        <>
          <Card className="p-5">
            <div className="text-sm text-muted">{tr("আজ আমার হাতে নগদ", "My cash today")}</div>
            <div className="num mt-1 text-3xl font-bold">{taka(d.cash.cash, lang)}</div>
            <div className="mt-2 text-sm text-muted">
              {tr("বিকাশ", "bKash")} {taka(d.cash.bkash, lang)} · Nagad {taka(d.cash.nagad, lang)} ·{" "}
              {tr(`${num(d.cash.count, lang)} টি পেমেন্ট`, `${d.cash.count} payments`)}
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="mb-3 font-bold">{tr("আজকের ব্যাচ", "Today's batches")}</h2>
            {d.today_batches.length === 0 && <p className="text-sm text-muted">{tr("আজ কোনো ব্যাচ নেই", "No batches today")}</p>}
            <ul className="divide-y divide-line">
              {d.today_batches.map((b) => (
                <li key={b.batch_id}>
                  <Link href={to(`/attendance/${b.batch_id}`)} className="flex items-center justify-between py-2.5">
                    <span className="font-medium">{b.name}</span>
                    <span className="text-sm">
                      {b.taken ? (
                        <span className="text-purple">✓ {tr("নেওয়া হয়েছে", "Taken")}</span>
                      ) : (
                        <span className="text-muted">{tr("বাকি", "Pending")}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="mb-1 font-bold">{tr("আজ যাদের ফোন করতে হবে", "Call today")}</h2>
            <p className="mb-3 text-sm text-muted">{tr("২ মাস বা বেশি বকেয়া", "2+ months due")}</p>
            <ul className="divide-y divide-line">
              {d.call_list.map((s) => (
                <li key={s.student_id} className="flex items-center justify-between gap-3 py-2.5">
                  <Link href={to(`/students/${s.student_id}`)} className="min-w-0">
                    <span className="block truncate font-medium">{s.name}</span>
                    <span className="num text-xs text-due">{taka(s.outstanding, lang)}</span>
                  </Link>
                  {s.guardian_phone && (
                    <a href={`tel:${s.guardian_phone}`} className="shrink-0 rounded-lg bg-lavender px-3 py-2 text-sm font-semibold text-purple-deep">
                      {tr("ফোন", "Call")}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  );
}
