"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Button, Card, ErrorBox, Input, PageHeader, PageLoader } from "@/components/ui";
import { api } from "@/lib/api";
import { digits, num, timeLabel } from "@/lib/format";
import { useTodayISO } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Roster } from "@/lib/types";

type Status = "present" | "absent";

export default function RosterPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RosterPageInner />
    </Suspense>
  );
}

function RosterPageInner() {
  const to = usePortalPath();
  const { batchId } = useParams<{ batchId: string }>();
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const today = useTodayISO();
  const [picked, setDay] = useState<string | null>(null);
  const day = picked ?? today;
  const roster = useQuery({
    queryKey: ["roster", batchId, day],
    queryFn: () => api<Roster>(`/attendance/batches/${batchId}`, { params: { date: day } }),
    enabled: !!day,
  });

  // Local edits on top of what the server has; everyone defaults to present.
  const [marks, setMarks] = useState<Record<string, Status>>({});
  const sessionId = useRef<string>(""); // set when the roster loads
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [result, setResult] = useState<{ present: number; absent: number; sms_queued: number } | null>(null);

  useEffect(() => {
    if (!roster.data) return;
    // A new roster (other batch/day) replaces local edits.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarks(Object.fromEntries(roster.data.items.map((i) => [i.student_id, i.status === "absent" ? "absent" : "present"])));
    sessionId.current = roster.data.session_id ?? crypto.randomUUID();
  }, [roster.data]);

  if (roster.isLoading || !roster.data) return roster.error ? <ErrorBox error={roster.error} /> : <PageLoader />;
  const r = roster.data;
  const absent = Object.values(marks).filter((s) => s === "absent").length;
  const present = r.items.length - absent;

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await api<{ present: number; absent: number; sms_queued: number }>("/attendance/sync", {
        body: {
          id: sessionId.current,
          batch_id: batchId,
          date: day,
          method: "tap",
          records: r.items.map((i) => ({ student_id: i.student_id, status: marks[i.student_id] ?? "present" })),
        },
      });
      setResult(res);
      qc.invalidateQueries({ queryKey: ["attendance-today"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["roster", batchId, day] });
    } catch (err) {
      setError(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl pb-24 md:pb-0">
      <PageHeader
        back={to("/attendance")}
        title={r.batch_name}
        subtitle={
          r.session_id
            ? tr(`নেওয়া হয়েছে${r.taken_by_name ? ` — ${r.taken_by_name}` : ""}, ${r.taken_at ? timeLabel(r.taken_at, lang) : ""}`, `Taken${r.taken_by_name ? ` by ${r.taken_by_name}` : ""}`)
            : tr("সবাই উপস্থিত ধরা আছে — শুধু অনুপস্থিতদের ট্যাপ করুন", "Everyone is present by default — tap only the absent")
        }
        action={
          <Input
            type="date"
            className="h-10 w-40 text-sm"
            value={day ?? ""}
            max={today ?? undefined}
            onChange={(e) => {
              setResult(null);
              setDay(e.target.value);
            }}
          />
        }
      />

      {result && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-lavender px-4 py-3 text-sm text-purple-deep">
          <CheckCircle2 className="size-5 shrink-0" />
          {tr(
            `সেভ হয়েছে — উপস্থিত ${num(result.present, lang)}, অনুপস্থিত ${num(result.absent, lang)}। ${num(result.sms_queued, lang)} জন অভিভাবকের কাছে SMS যাচ্ছে।`,
            `Saved — ${result.present} present, ${result.absent} absent. ${result.sms_queued} guardian SMS queued.`,
          )}
        </div>
      )}

      <Card className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
        {r.items.map((s) => {
          const isAbsent = marks[s.student_id] === "absent";
          return (
            <button
              key={s.student_id}
              onClick={() => setMarks({ ...marks, [s.student_id]: isAbsent ? "present" : "absent" })}
              className={clsx(
                "flex min-h-14 items-center gap-3 px-4 py-2.5 text-left transition-colors sm:border-b sm:border-line",
                isAbsent ? "bg-due-soft" : "hover:bg-canvas",
              )}
            >
              <span
                className={clsx(
                  "num flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  isAbsent ? "bg-due text-white" : "bg-lavender text-purple-deep",
                )}
              >
                {digits(s.student_code, lang)}
              </span>
              <span className="min-w-0 flex-1">
                <span className={clsx("block truncate font-medium", isAbsent && "text-due")}>{s.name}</span>
                {s.due_months >= 2 && <span className="text-xs text-due">{tr(`${num(s.due_months, lang)} মাস বকেয়া`, `${s.due_months} mo due`)}</span>}
              </span>
              <span className={clsx("shrink-0 text-xs font-semibold", isAbsent ? "text-due" : "text-purple")}>
                {isAbsent ? tr("অনুপস্থিত", "Absent") : tr("উপস্থিত", "Present")}
              </span>
            </button>
          );
        })}
      </Card>

      <div className="fixed inset-x-0 bottom-16 z-20 border-t border-line bg-card p-3 md:static md:mt-4 md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <div className="text-sm">
            <span className="text-purple">{tr("উপস্থিত", "Present")} <b className="num">{num(present, lang)}</b></span>
            <span className="mx-2 text-line">|</span>
            <span className="text-due">{tr("অনুপস্থিত", "Absent")} <b className="num">{num(absent, lang)}</b></span>
          </div>
          <Button className="ml-auto min-w-36" size="lg" loading={saving} onClick={save}>
            {tr("সেভ", "Save")}
          </Button>
        </div>
        <div className="mx-auto mt-2 max-w-2xl">
          <ErrorBox error={error} />
        </div>
      </div>
    </div>
  );
}
