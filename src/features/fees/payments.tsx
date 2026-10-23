"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PaymentList } from "@/components/payment-list";
import { Card, Empty, Input, PageHeader, PageLoader } from "@/components/ui";
import { api } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { num, taka } from "@/lib/format";
import { useTodayISO } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import type { Payment } from "@/lib/types";

export default function PaymentsPage() {
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const today = useTodayISO();
  const [picked, setDay] = useState<string | null>(null);
  const day = picked ?? today;
  const isOwner = can(me, "reports.view_all");
  const q = useQuery({
    queryKey: ["payments", day],
    queryFn: () => api<Payment[]>("/fees/payments", { params: { date_from: day, date_to: day, limit: 500 } }),
    enabled: !!day,
  });
  const list = q.data ?? [];
  const total = list.reduce((s, p) => s + p.amount, 0);
  const count = list.filter((p) => p.kind === "payment" && !p.reversed).length;

  return (
    <div>
      <PageHeader
        title={tr("আদায়ের হিসাব", "Payments")}
        subtitle={isOwner ? undefined : tr("শুধু আপনার আজকের এন্ট্রি", "Only your entries today")}
      />
      <div className="mb-4 flex items-center gap-3">
        {isOwner && <Input type="date" className="max-w-48" value={day ?? ""} max={today ?? undefined} onChange={(e) => setDay(e.target.value)} />}
        <div className="text-sm text-muted">
          {tr(`${num(count, lang)} টি পেমেন্ট · মোট `, `${count} payments · total `)}
          <span className="num font-bold text-ink">{taka(total, lang)}</span>
        </div>
      </div>
      {q.isLoading ? (
        <PageLoader />
      ) : list.length === 0 ? (
        <Empty title={tr("এই দিনে কোনো আদায় নেই", "No payments on this day")} />
      ) : (
        <Card>
          <PaymentList payments={list} />
        </Card>
      )}
    </div>
  );
}
