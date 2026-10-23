"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useDebounced } from "@/components/student-search";
import { Button, ButtonLink, Card, Empty, Input, PageHeader, PageLoader, Select } from "@/components/ui";
import { api } from "@/lib/api";
import { digits, num, phoneLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch, StudentPage } from "@/lib/types";

export default function StudentsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Students />
    </Suspense>
  );
}

function Students() {
  const to = usePortalPath();
  const { tr, lang } = useLang();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const dq = useDebounced(q.trim());
  const [batchId, setBatchId] = useState(sp.get("batch") ?? "");
  const [due, setDue] = useState("");
  const [status, setStatus] = useState("active");

  const batches = useQuery({ queryKey: ["batches"], queryFn: () => api<Batch[]>("/batches") });
  const list = useInfiniteQuery({
    queryKey: ["students", "list", dq, batchId, due, status],
    queryFn: ({ pageParam }) =>
      api<StudentPage>("/students", {
        params: { q: dq, batch_id: batchId, has_due: due || undefined, status, cursor: pageParam, limit: 50 },
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.next_cursor ?? undefined,
  });
  const items = list.data?.pages.flatMap((p) => p.items) ?? [];
  const total = list.data?.pages[0]?.total ?? 0;

  return (
    <div>
      <PageHeader
        title={tr("স্টুডেন্ট", "Students")}
        subtitle={tr(`${num(total, lang)} জন`, `${total} students`)}
        action={
          <ButtonLink href={to("/students/new")} size="sm">
            <Plus className="size-4" /> {tr("নতুন", "Add")}
          </ButtonLink>
        }
      />
      <div className="mb-4 grid gap-2 sm:grid-cols-4">
        <Input className="sm:col-span-2" placeholder={tr("নাম, রোল বা ফোন", "Name, roll or phone")} value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={batchId} onChange={(e) => setBatchId(e.target.value)}>
          <option value="">{tr("সব ব্যাচ", "All batches")}</option>
          {batches.data?.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>
        <div className="grid grid-cols-2 gap-2">
          <Select value={due} onChange={(e) => setDue(e.target.value)}>
            <option value="">{tr("সবাই", "All")}</option>
            <option value="true">{tr("বকেয়া আছে", "Has due")}</option>
            <option value="false">{tr("বকেয়া নেই", "No due")}</option>
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">{tr("চালু", "Active")}</option>
            <option value="left">{tr("ছেড়ে দিয়েছে", "Left")}</option>
            <option value="all">{tr("সব", "All")}</option>
          </Select>
        </div>
      </div>

      {list.isLoading ? (
        <PageLoader />
      ) : items.length === 0 ? (
        <Empty title={tr("কোনো স্টুডেন্ট পাওয়া যায়নি", "No students found")} />
      ) : (
        <Card className="divide-y divide-line">
          {items.map((s) => (
            <Link key={s.id} href={to(`/students/${s.id}`)} className="flex items-center gap-3 px-4 py-3 hover:bg-canvas">
              <span className="num flex size-10 shrink-0 items-center justify-center rounded-full bg-lavender text-sm font-semibold text-purple-deep">
                {digits(s.roll_no, lang)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">
                  {s.name}
                  {s.status === "left" && <span className="ml-2 text-xs font-normal text-muted">({tr("ছেড়ে দিয়েছে", "left")})</span>}
                </span>
                <span className="block truncate text-xs text-muted">
                  {s.batch_names.join(", ") || "—"}
                  {s.guardian_phone && ` · ${phoneLabel(s.guardian_phone, lang)}`}
                </span>
              </span>
              {s.outstanding > 0 ? (
                <span className="num shrink-0 text-sm font-semibold text-due">{taka(s.outstanding, lang)}</span>
              ) : (
                <span className="shrink-0 rounded-full bg-lavender px-2 py-0.5 text-xs font-semibold text-purple-deep">{tr("পরিশোধিত", "Paid")}</span>
              )}
            </Link>
          ))}
        </Card>
      )}
      {list.hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" loading={list.isFetchingNextPage} onClick={() => list.fetchNextPage()}>
            {tr("আরও দেখুন", "Load more")}
          </Button>
        </div>
      )}
    </div>
  );
}
