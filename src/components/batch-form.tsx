"use client";

import clsx from "clsx";
import { useState } from "react";
import { Button, ErrorBox, Field, Input } from "@/components/ui";
import { WEEKDAYS, toPoisha } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";

export type BatchPayload = {
  name: string;
  subject: string | null;
  class_level: string | null;
  days: string[];
  start_time: string | null;
  end_time: string | null;
  monthly_fee: number;
  admission_fee: number | null;
  capacity: number | null;
  version?: number;
};

export function BatchForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: Batch;
  submitLabel: string;
  onSubmit: (data: BatchPayload) => Promise<void>;
}) {
  const { tr, lang } = useLang();
  const [name, setName] = useState(initial?.name ?? "");
  const [subject, setSubject] = useState(initial?.subject ?? "");
  const [classLevel, setClassLevel] = useState(initial?.class_level ?? "");
  const [days, setDays] = useState<string[]>(initial?.days ?? []);
  const [start, setStart] = useState(initial?.start_time?.slice(0, 5) ?? "");
  const [end, setEnd] = useState(initial?.end_time?.slice(0, 5) ?? "");
  const [fee, setFee] = useState(initial ? String(initial.monthly_fee / 100) : "");
  const [admission, setAdmission] = useState(initial?.admission_fee ? String(initial.admission_fee / 100) : "");
  const [capacity, setCapacity] = useState(initial?.capacity ? String(initial.capacity) : "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await onSubmit({
        name: name.trim(),
        subject: subject.trim() || null,
        class_level: classLevel.trim() || null,
        days,
        start_time: start || null,
        end_time: end || null,
        monthly_fee: toPoisha(fee),
        admission_fee: admission ? toPoisha(admission) : null,
        capacity: capacity ? Number(capacity) : null,
        ...(initial ? { version: initial.version } : {}),
      });
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label={tr("ব্যাচের নাম", "Batch name")}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={tr("যেমন: SSC ২০২৭ — ক", "e.g. SSC 2027 — A")} required />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={tr("বিষয়", "Subject")}>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={tr("জীববিজ্ঞান", "Biology")} />
        </Field>
        <Field label={tr("ক্লাস", "Class")}>
          <Input value={classLevel} onChange={(e) => setClassLevel(e.target.value)} placeholder="SSC 2027" />
        </Field>
      </div>
      <Field label={tr("সপ্তাহের দিন", "Days")}>
        <div className="grid grid-cols-7 gap-1.5">
          {WEEKDAYS.map((d) => {
            const on = days.includes(d.code);
            return (
              <button
                key={d.code}
                type="button"
                onClick={() => setDays(on ? days.filter((x) => x !== d.code) : [...days, d.code])}
                className={clsx(
                  "h-11 rounded-lg border text-sm font-semibold",
                  on ? "border-purple bg-purple text-white" : "border-line bg-card text-ink",
                )}
              >
                {lang === "bn" ? d.bn : d.en}
              </button>
            );
          })}
        </div>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={tr("শুরু", "Starts")}>
          <Input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
        <Field label={tr("শেষ", "Ends")}>
          <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Field label={tr("মাসিক ফি (৳)", "Monthly fee (৳)")}>
          <Input className="num" inputMode="numeric" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="800" required />
        </Field>
        <Field label={tr("ভর্তি ফি (৳)", "Admission (৳)")}>
          <Input className="num" inputMode="numeric" value={admission} onChange={(e) => setAdmission(e.target.value)} />
        </Field>
        <Field label={tr("সর্বোচ্চ", "Capacity")}>
          <Input className="num" inputMode="numeric" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="90" />
        </Field>
      </div>
      <ErrorBox error={error} />
      <Button type="submit" block size="lg" loading={busy}>
        {submitLabel}
      </Button>
    </form>
  );
}
