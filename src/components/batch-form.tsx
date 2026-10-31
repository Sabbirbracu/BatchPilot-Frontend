"use client";

import clsx from "clsx";
import { useState } from "react";
import { Button, ErrorBox, Field, Input, Segmented, Switch } from "@/components/ui";
import { WEEKDAYS, toPoisha } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Batch, FeePlan } from "@/lib/types";

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
  fee_plan: FeePlan;
  course_fee: number | null;
  installments: number;
  location: string | null;
  starts_on: string | null;
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
  const [plan, setPlan] = useState<FeePlan>(initial?.fee_plan ?? "monthly");
  const [fee, setFee] = useState(initial?.monthly_fee ? String(initial.monthly_fee / 100) : "");
  const [courseFee, setCourseFee] = useState(initial?.course_fee ? String(initial.course_fee / 100) : "");
  const [installments, setInstallments] = useState(String(initial?.installments ?? 1));
  const [takesAdmission, setTakesAdmission] = useState(Boolean(initial?.admission_fee));
  const [admission, setAdmission] = useState(initial?.admission_fee ? String(initial.admission_fee / 100) : "");
  const [capacity, setCapacity] = useState(initial?.capacity ? String(initial.capacity) : "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [startsOn, setStartsOn] = useState(initial?.starts_on ?? "");
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
        fee_plan: plan,
        monthly_fee: plan === "monthly" ? toPoisha(fee) : 0,
        course_fee: plan === "course" ? toPoisha(courseFee) : null,
        installments: plan === "course" ? Math.max(1, Number(installments) || 1) : 1,
        admission_fee: takesAdmission && admission ? toPoisha(admission) : null,
        capacity: capacity ? Number(capacity) : null,
        location: location.trim() || null,
        starts_on: startsOn || null,
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
      <Field label={tr("ফি কীভাবে নেন?", "How do you charge?")}>
        <Segmented<FeePlan>
          value={plan}
          onChange={setPlan}
          options={[
            { value: "monthly", label: tr("মাসিক ফি", "Monthly fee") },
            { value: "course", label: tr("কোর্স ফি", "Course fee") },
          ]}
        />
      </Field>
      {plan === "monthly" ? (
        <Field label={tr("মাসিক ফি (৳)", "Monthly fee (৳)")}>
          <Input className="num" inputMode="numeric" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="800" required />
        </Field>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <Field label={tr("পুরো কোর্সের ফি (৳)", "Whole course fee (৳)")}>
            <Input className="num" inputMode="numeric" value={courseFee} onChange={(e) => setCourseFee(e.target.value)} placeholder="6000" required />
          </Field>
          <Field
            label={tr("কয় কিস্তিতে?", "Instalments")}
            hint={Number(installments) > 1 ? tr("প্রতি মাসে একটি কিস্তি", "One instalment a month") : tr("১ = একবারে পুরোটা", "1 = all at once")}
          >
            <Input className="num" inputMode="numeric" value={installments} onChange={(e) => setInstallments(e.target.value.replace(/\D/g, ""))} placeholder="1" />
          </Field>
        </div>
      )}
      <div className="rounded-xl border border-line p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">{tr("ভর্তি ফি নেন?", "Charge an admission fee?")}</span>
          <Switch checked={takesAdmission} onChange={setTakesAdmission} label={tr("ভর্তি ফি", "Admission fee")} />
        </div>
        {takesAdmission && (
          <Input
            className="num mt-3"
            inputMode="numeric"
            value={admission}
            onChange={(e) => setAdmission(e.target.value)}
            placeholder={tr("যেমন ১০০০", "e.g. 1000")}
            aria-label={tr("ভর্তি ফি (৳)", "Admission fee (৳)")}
            required
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label={tr("সর্বোচ্চ সিট", "Seats")}>
          <Input className="num" inputMode="numeric" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="40" />
        </Field>
        <Field label={tr("ক্লাস শুরু", "Classes start")}>
          <Input type="date" value={startsOn} onChange={(e) => setStartsOn(e.target.value)} />
        </Field>
      </div>
      <Field label={tr("কোথায় (জায়গা/শাখা)", "Where (place/branch)")}>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder={tr("যেমন: স্টেশন রোড শাখা", "e.g. Station Road branch")} />
      </Field>
      <ErrorBox error={error} />
      <Button type="submit" block size="lg" loading={busy}>
        {submitLabel}
      </Button>
    </form>
  );
}
