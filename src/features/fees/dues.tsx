"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { BellRing, Phone } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useDebounced } from "@/components/student-search";
import { Button, Card, Empty, ErrorBox, Input, PageHeader, PageLoader, Select } from "@/components/ui";
import { api } from "@/lib/api";
import { dateLabel, digits, monthLabel, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch, DuesPage } from "@/lib/types";

export default function DuesListPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Dues />
    </Suspense>
  );
}

function Dues() {
  const to = usePortalPath();
  const { tr, lang } = useLang();
  const sp = useSearchParams();
  const [batchId, setBatchId] = useState(sp.get("batch") ?? "");
  const [minMonths, setMinMonths] = useState(sp.get("min_months") ?? "");
  const [q, setQ] = useState("");
  const dq = useDebounced(q.trim());
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const batches = useQuery({ queryKey: ["batches"], queryFn: () => api<Batch[]>("/batches") });
  const dues = useQuery({
    queryKey: ["dues", batchId, minMonths, dq],
    queryFn: () => api<DuesPage>("/fees/dues", { params: { batch_id: batchId, min_months: minMonths, q: dq, limit: 300 } }),
  });

  const remind = useMutation({
    mutationFn: (studentIds: string[] | null) =>
      api<{ queued: number; skipped: number }>("/fees/reminders", {
        body: { student_ids: studentIds, batch_id: studentIds ? null : batchId || null },
      }),
    onSuccess: () => setSelected(new Set()),
  });

  const items = dues.data?.items ?? [];
  const allChecked = items.length > 0 && items.every((i) => selected.has(i.student_id));

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  return (
    <div>
      <PageHeader
        title={tr("বকেয়া তালিকা", "Dues")}
        subtitle={
          dues.data && (
            <>
              {tr(`${num(dues.data.total_students, lang)} জন · মোট `, `${dues.data.total_students} students · total `)}
              <span className="num font-semibold text-due">{taka(dues.data.total_outstanding, lang)}</span>
            </>
          )
        }
      />

      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        <Input placeholder={tr("নাম বা রোল খুঁজুন", "Search name or roll")} value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={batchId} onChange={(e) => setBatchId(e.target.value)}>
          <option value="">{tr("সব ব্যাচ", "All batches")}</option>
          {batches.data?.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>
        <Select value={minMonths} onChange={(e) => setMinMonths(e.target.value)}>
          <option value="">{tr("যেকোনো বকেয়া", "Any due")}</option>
          <option value="2">{tr("২ মাস বা বেশি", "2+ months")}</option>
          <option value="3">{tr("৩ মাস বা বেশি", "3+ months")}</option>
        </Select>
      </div>

      {remind.data && (
        <div className="mb-4 rounded-xl bg-lavender px-4 py-3 text-sm text-purple-deep">
          {tr(
            `${num(remind.data.queued, lang)} জন অভিভাবকের কাছে রিমাইন্ডার যাচ্ছে।`,
            `Reminders queued for ${remind.data.queued} guardians.`,
          )}
          {remind.data.skipped > 0 && tr(` ${num(remind.data.skipped, lang)} জনকে আজ আগেই পাঠানো হয়েছে বা নম্বর নেই।`, ` ${remind.data.skipped} skipped (already sent today or no number).`)}
        </div>
      )}
      <ErrorBox error={remind.error} />

      <div className="sticky top-14 z-10 -mx-4 mb-3 flex items-center justify-between gap-2 border-b border-line bg-canvas/95 px-4 py-2 backdrop-blur md:mx-0 md:rounded-xl md:border md:bg-card md:px-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-5 accent-[#5B21B6]"
            checked={allChecked}
            onChange={() => setSelected(allChecked ? new Set() : new Set(items.map((i) => i.student_id)))}
          />
          {selected.size ? tr(`${num(selected.size, lang)} জন বাছাই`, `${selected.size} selected`) : tr("সব বাছাই", "Select all")}
        </label>
        <Button
          size="sm"
          loading={remind.isPending}
          disabled={!selected.size && !items.length}
          onClick={() => remind.mutate(selected.size ? [...selected] : items.map((i) => i.student_id))}
        >
          <BellRing className="size-4" />
          {selected.size ? tr("রিমাইন্ডার পাঠান", "Send reminder") : tr("সবাইকে রিমাইন্ডার", "Remind all")}
        </Button>
      </div>

      {dues.isLoading ? (
        <PageLoader />
      ) : items.length === 0 ? (
        <Empty title={tr("কোনো বকেয়া নেই 🎉", "No dues 🎉")} />
      ) : (
        <Card className="divide-y divide-line">
          {items.map((s) => (
            <div key={s.student_id} className="flex items-center gap-3 px-4 py-3">
              <input
                type="checkbox"
                className="size-5 shrink-0 accent-[#5B21B6]"
                checked={selected.has(s.student_id)}
                onChange={() => toggle(s.student_id)}
              />
              <Link href={to(`/students/${s.student_id}`)} className="min-w-0 flex-1">
                <div className="truncate font-semibold">{s.name}</div>
                <div className="truncate text-xs text-muted">
                  {tr("রোল", "Roll")} {digits(s.roll_no, lang)} · {s.batch_names.join(", ")} ·{" "}
                  {tr(`${monthLabel(s.oldest_month, lang)} থেকে`, `since ${monthLabel(s.oldest_month, lang)}`)}
                  {s.last_payment_at && ` · ${tr("শেষ পেমেন্ট", "last paid")} ${dateLabel(s.last_payment_at, lang)}`}
                </div>
              </Link>
              <div className="shrink-0 text-right">
                <div className="num font-bold text-due">{taka(s.outstanding, lang)}</div>
                <div className={`text-xs ${s.months >= 2 ? "font-semibold text-due" : "text-muted"}`}>{tr(`${num(s.months, lang)} মাস`, `${s.months} mo`)}</div>
              </div>
              <div className="flex shrink-0 gap-1">
                {s.guardian_phone && (
                  <a href={`tel:${s.guardian_phone}`} className="rounded-lg p-2 text-purple hover:bg-lavender" aria-label="Call">
                    <Phone className="size-5" />
                  </a>
                )}
                <Link href={to(`/fees?student=${s.student_id}`)} className="rounded-lg bg-purple px-3 py-2 text-sm font-semibold text-white">
                  {tr("ফি নিন", "Collect")}
                </Link>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
