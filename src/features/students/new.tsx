"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button, Card, ErrorBox, Field, Input, PageHeader, PageLoader } from "@/components/ui";
import { api, ApiError } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { taka, toPoisha } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch, Student } from "@/lib/types";

export default function NewStudentPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <NewStudent />
    </Suspense>
  );
}

function NewStudent() {
  const to = usePortalPath();
  const { tr, lang } = useLang();
  const router = useRouter();
  const qc = useQueryClient();
  const { data: me } = useMe();
  const isOwner = can(me, "due.discount");
  const pre = useSearchParams().get("batch");
  const batches = useQuery({ queryKey: ["batches"], queryFn: () => api<Batch[]>("/batches") });

  const [form, setForm] = useState({ name: "", guardian_name: "", guardian_phone: "", phone: "", school: "", class_level: "", note: "" });
  const [picked, setPicked] = useState<Record<string, { custom: string }>>(pre ? { [pre]: { custom: "" } } : {});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [dupWarning, setDupWarning] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent, force = false) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const s = await api<Student>("/students", {
        body: {
          ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim() || null])),
          name: form.name.trim(),
          enrollments: Object.entries(picked).map(([batch_id, v]) => ({
            batch_id,
            custom_fee: v.custom !== "" ? toPoisha(v.custom) : null,
          })),
          force,
        },
      });
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["batches"] });
      router.replace(to(`/students/${s.id}`));
    } catch (err) {
      if (err instanceof ApiError && err.code === "possible_duplicate") setDupWarning(true);
      setError(err);
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader back={to("/students")} title={tr("নতুন স্টুডেন্ট", "New student")} />
      <form onSubmit={(e) => submit(e)} className="space-y-5">
        <Card className="space-y-4 p-5">
          <Field label={tr("নাম", "Name")}>
            <Input value={form.name} onChange={set("name")} required autoFocus />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={tr("অভিভাবকের নাম", "Guardian name")}>
              <Input value={form.guardian_name} onChange={set("guardian_name")} />
            </Field>
            <Field label={tr("অভিভাবকের ফোন", "Guardian phone")} hint={tr("SMS এই নম্বরে যাবে", "SMS goes here")}>
              <Input inputMode="tel" placeholder="01XXXXXXXXX" value={form.guardian_phone} onChange={set("guardian_phone")} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label={tr("স্টুডেন্টের ফোন", "Student phone")}>
              <Input inputMode="tel" value={form.phone} onChange={set("phone")} />
            </Field>
            <Field label={tr("ক্লাস", "Class")}>
              <Input value={form.class_level} onChange={set("class_level")} placeholder="SSC 2027" />
            </Field>
          </div>
          <Field label={tr("স্কুল / কলেজ", "School / college")}>
            <Input value={form.school} onChange={set("school")} />
          </Field>
        </Card>

        <Card className="p-5">
          <h2 className="mb-1 font-bold">{tr("ব্যাচ", "Batches")}</h2>
          <p className="mb-3 text-sm text-muted">{tr("একাধিক ব্যাচে দেওয়া যায়, প্রতিটার ফি আলাদা।", "Can join several batches, each with its own fee.")}</p>
          <div className="space-y-2">
            {batches.data?.map((b) => {
              const on = b.id in picked;
              return (
                <div key={b.id} className={clsx("rounded-xl border p-3", on ? "border-purple bg-lavender/50" : "border-line")}>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="size-5 accent-[#5B21B6]"
                      checked={on}
                      onChange={() => {
                        const next = { ...picked };
                        if (on) delete next[b.id];
                        else next[b.id] = { custom: "" };
                        setPicked(next);
                      }}
                    />
                    <span className="flex-1 font-medium">{b.name}</span>
                    <span className="num text-sm text-muted">{taka(b.monthly_fee, lang)}</span>
                  </label>
                  {on && isOwner && (
                    <div className="mt-2 flex items-center gap-2 pl-8">
                      <span className="text-sm text-muted">{tr("বিশেষ ফি (৳)", "Special fee (৳)")}</span>
                      <Input
                        className="num h-10 w-28"
                        inputMode="numeric"
                        placeholder={String(b.monthly_fee / 100)}
                        value={picked[b.id].custom}
                        onChange={(e) => setPicked({ ...picked, [b.id]: { custom: e.target.value.replace(/[^0-9]/g, "") } })}
                      />
                      <span className="text-xs text-muted">{tr("০ = ফ্রি", "0 = free")}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <ErrorBox error={error} />
        {dupWarning ? (
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" onClick={() => router.push(to(`/students?q=${encodeURIComponent(form.name)}`))}>
              {tr("আগেরটা দেখুন", "See existing")}
            </Button>
            <Button type="button" loading={busy} onClick={(e) => submit(e as unknown as React.FormEvent, true)}>
              {tr("তবুও যোগ করুন", "Add anyway")}
            </Button>
          </div>
        ) : (
          <Button type="submit" block size="lg" loading={busy}>
            {tr("সেভ করুন", "Save")}
          </Button>
        )}
      </form>
    </div>
  );
}
