"use client";

import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ButtonLink, Card, Empty, PageHeader, PageLoader, Segmented } from "@/components/ui";
import { api } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { clockLabel, daysLabel, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";

export default function BatchesPage() {
  const to = usePortalPath();
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const [view, setView] = useState<"active" | "archived">("active");
  const q = useQuery({
    queryKey: ["batches", view],
    queryFn: () => api<Batch[]>("/batches", { params: { archived: view === "archived" } }),
  });

  return (
    <div>
      <PageHeader
        title={tr("ব্যাচ", "Batches")}
        action={
          can(me, "batch.manage") && (
            <ButtonLink href={to("/batches/new")} size="sm">
              <Plus className="size-4" /> {tr("নতুন ব্যাচ", "New batch")}
            </ButtonLink>
          )
        }
      />
      <div className="mb-4 max-w-xs">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: "active", label: tr("চালু", "Active") },
            { value: "archived", label: tr("বন্ধ", "Closed") },
          ]}
        />
      </div>
      {q.isLoading ? (
        <PageLoader />
      ) : !q.data?.length ? (
        <Empty title={tr("কোনো ব্যাচ নেই", "No batches")} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {q.data.map((b) => {
            const total = b.month_collected + b.month_due;
            const pct = total ? (b.month_collected / total) * 100 : 0;
            return (
              <Link key={b.id} href={to(`/batches/${b.id}`)}>
                <Card className="h-full p-4 transition-colors hover:border-purple/40">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-bold">{b.name}</div>
                      <div className="truncate text-xs text-muted">
                        {daysLabel(b.days, lang)}
                        {b.start_time && ` · ${clockLabel(b.start_time, lang)}`}
                      </div>
                    </div>
                    <span className="num shrink-0 rounded-full bg-lavender px-2.5 py-0.5 text-sm font-semibold text-purple-deep">
                      {tr(`${num(b.student_count, lang)} জন`, `${b.student_count}`)}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-muted">{tr("এই মাস আদায়", "Collected")}</span>
                    <span className="num font-semibold">{taka(b.month_collected, lang)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{tr("বাকি", "Due")}</span>
                    <span className="num font-semibold text-due">{taka(b.month_due, lang)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-due-soft">
                    <div className="h-full bg-purple" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-muted">
                    <span>{taka(b.monthly_fee, lang)}/{tr("মাস", "mo")}</span>
                    {b.today_present != null && (
                      <span>
                        {tr("আজ", "Today")}: {num(b.today_present, lang)} ✓ · <span className="text-due">{num(b.today_absent ?? 0, lang)} ✗</span>
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
