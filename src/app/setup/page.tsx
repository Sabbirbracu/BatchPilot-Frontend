"use client";

import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Check, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BatchForm } from "@/components/batch-form";
import { Logo } from "@/components/logo";
import { Button, Card, ErrorBox, Field, Input, PageLoader } from "@/components/ui";
import { api } from "@/lib/api";
import { ME_KEY, useRequireMe } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import type { Batch, Me } from "@/lib/types";

// Blueprint F1: 3-step setup — institution → first batch → students.
export default function SetupPage() {
  const { data: me, isLoading } = useRequireMe({ needInstitution: false });
  const { tr } = useLang();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [batch, setBatch] = useState<Batch | null>(null);
  const qc = useQueryClient();
  const router = useRouter();

  if (isLoading || !me) return <PageLoader />;
  const current = me.institution ? Math.max(step, 2) : step;

  const steps = [tr("প্রতিষ্ঠান", "Institution"), tr("প্রথম ব্যাচ", "First batch"), tr("স্টুডেন্ট", "Students")];

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-lg px-4 py-8">
        <div className="mb-6 flex justify-center">
          <Logo small />
        </div>
        <ol className="mb-6 grid grid-cols-3 gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-col items-center gap-1.5 text-center text-xs font-medium">
              <span
                className={clsx(
                  "flex size-8 items-center justify-center rounded-full border-2",
                  i + 1 < current && "border-purple bg-purple text-white",
                  i + 1 === current && "border-purple text-purple",
                  i + 1 > current && "border-line text-muted",
                )}
              >
                {i + 1 < current ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={i + 1 === current ? "text-ink" : "text-muted"}>{s}</span>
            </li>
          ))}
        </ol>
        <Card className="p-5">
          {current === 1 && (
            <InstitutionStep
              onDone={(m) => {
                qc.setQueryData(ME_KEY, m);
                setStep(2);
              }}
            />
          )}
          {current === 2 && (
            <>
              <h2 className="mb-1 text-lg font-bold">{tr("প্রথম ব্যাচ যোগ করুন", "Add your first batch")}</h2>
              <p className="mb-5 text-sm text-muted">{tr("পরে আরও ব্যাচ যোগ করা যাবে।", "You can add more batches later.")}</p>
              <BatchForm
                submitLabel={tr("পরের ধাপ", "Next")}
                onSubmit={async (data) => {
                  const b = await api<Batch>("/batches", { body: data });
                  setBatch(b);
                  setStep(3);
                }}
              />
            </>
          )}
          {current === 3 && batch && <StudentsStep batch={batch} onDone={() => router.replace("/teacher")} />}
          {current === 3 && !batch && (
            <div className="space-y-4 text-center">
              <p>{tr("সেটআপ প্রায় শেষ!", "Almost done!")}</p>
              <Button block onClick={() => router.replace("/teacher")}>
                {tr("ড্যাশবোর্ডে যান", "Go to dashboard")}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function InstitutionStep({ onDone }: { onDone: (me: Me) => void }) {
  const { tr } = useLang();
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("বগুড়া");
  const [dueDay, setDueDay] = useState("10");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      onDone(
        await api<Me>("/institutions", {
          body: { name, owner_name: owner || null, subject: subject || null, city: city || null, fee_due_day: Number(dueDay) || 10 },
        }),
      );
    } catch (err) {
      setError(err);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">{tr("আপনার প্রতিষ্ঠান", "Your institution")}</h2>
        <p className="text-sm text-muted">{tr("রসিদ আর SMS-এ এই নাম যাবে।", "This name appears on receipts and SMS.")}</p>
      </div>
      <Field label={tr("প্রতিষ্ঠানের নাম", "Institution name")}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={tr("যেমন: রাফি বায়োলজি কেয়ার", "e.g. Rafi Biology Care")} required />
      </Field>
      <Field label={tr("আপনার নাম", "Your name")}>
        <Input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder={tr("রাফি স্যার", "Rafi Sir")} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={tr("বিষয়", "Subject")}>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={tr("জীববিজ্ঞান", "Biology")} />
        </Field>
        <Field label={tr("শহর", "City")}>
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </Field>
      </div>
      <Field
        label={tr("প্রতি মাসের কত তারিখের পর বকেয়া ধরা হবে?", "Fee is due after day of month")}
        hint={tr("সাধারণত ১০ তারিখ", "Usually the 10th")}
      >
        <Input className="num" inputMode="numeric" value={dueDay} onChange={(e) => setDueDay(e.target.value)} />
      </Field>
      <ErrorBox error={error} />
      <Button type="submit" block size="lg" loading={busy}>
        {tr("পরের ধাপ", "Next")}
      </Button>
    </form>
  );
}

type Row = { name: string; guardian_phone: string };

function StudentsStep({ batch, onDone }: { batch: Batch; onDone: () => void }) {
  const { tr } = useLang();
  const [rows, setRows] = useState<Row[]>([{ name: "", guardian_phone: "" }]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [saved, setSaved] = useState(0);

  async function save() {
    setBusy(true);
    setError(null);
    const todo = rows.filter((r) => r.name.trim());
    try {
      for (const [i, r] of todo.entries()) {
        await api("/students", {
          body: { name: r.name, guardian_phone: r.guardian_phone || null, enrollments: [{ batch_id: batch.id }] },
        });
        setSaved(i + 1);
      }
      onDone();
    } catch (err) {
      setError(err);
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">{tr("স্টুডেন্ট যোগ করুন", "Add students")}</h2>
        <p className="text-sm text-muted">
          {tr(
            `"${batch.name}" ব্যাচে। ডায়রির ছবি বা Excel থেকে ইমপোর্ট শীঘ্রই আসছে — এখন কয়েকজন হাতে লিখুন, বা পরে করুন।`,
            `Into "${batch.name}". Diary-photo / Excel import is coming soon — add a few by hand now, or later.`,
          )}
        </p>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="flex items-end gap-2">
          <Field label={i === 0 ? tr("নাম", "Name") : ""} className="flex-1">
            <Input value={r.name} onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
          </Field>
          <Field label={i === 0 ? tr("অভিভাবকের ফোন", "Guardian phone") : ""} className="flex-1">
            <Input
              inputMode="tel"
              placeholder="01XXXXXXXXX"
              value={r.guardian_phone}
              onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, guardian_phone: e.target.value } : x)))}
            />
          </Field>
          <button
            type="button"
            onClick={() => setRows(rows.length > 1 ? rows.filter((_, j) => j !== i) : rows)}
            className="mb-1 rounded-lg p-2.5 text-muted hover:bg-canvas"
            aria-label="Remove"
          >
            <Trash2 className="size-5" />
          </button>
        </div>
      ))}
      <Button variant="ghost" onClick={() => setRows([...rows, { name: "", guardian_phone: "" }])}>
        <Plus className="size-4" /> {tr("আরেকজন", "Add another")}
      </Button>
      <ErrorBox error={error} />
      {busy && saved > 0 && <p className="text-sm text-muted">{tr(`${saved} জন সেভ হয়েছে…`, `${saved} saved…`)}</p>}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={onDone} disabled={busy}>
          {tr("পরে করব", "Later")}
        </Button>
        <Button onClick={save} loading={busy}>
          {tr("সেভ ও শেষ", "Save & finish")}
        </Button>
      </div>
    </div>
  );
}
