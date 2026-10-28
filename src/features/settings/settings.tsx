"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, ErrorBox, Field, Input, PageHeader, PageLoader, Select, Toggle } from "@/components/ui";
import { api } from "@/lib/api";
import { useMe } from "@/lib/auth";
import { monthLabel, phoneLabel } from "@/lib/format";
import { useTodayISO } from "@/lib/clock";
import { useLang } from "@/lib/i18n";
import { useSaveInstitution } from "@/lib/institution";
import type { Institution, Member } from "@/lib/types";

export default function SettingsPage() {
  const { tr } = useLang();
  const { data: me } = useMe();
  if (!me?.institution) return <PageLoader />;
  if (me.role !== "owner") return <p className="text-muted">{tr("শুধু মালিক সেটিংস দেখতে পারবেন।", "Only the owner can see settings.")}</p>;
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <PageHeader title={tr("সেটিংস", "Settings")} />
      <InstitutionCard inst={me.institution} />
      <AutomationCard inst={me.institution} />
      <TeamCard />
      <FeesCard />
    </div>
  );
}


function InstitutionCard({ inst }: { inst: Institution }) {
  const { tr } = useLang();
  const save = useSaveInstitution();
  const [name, setName] = useState(inst.name);
  const [subject, setSubject] = useState(inst.subject ?? "");
  const [city, setCity] = useState(inst.city ?? "");
  const [dueDay, setDueDay] = useState(String(inst.fee_due_day));
  const [bkash, setBkash] = useState(inst.settings.bkash_number ?? "");

  return (
    <Card className="space-y-4 p-5">
      <h2 className="font-bold">{tr("প্রতিষ্ঠান", "Institution")}</h2>
      <Field label={tr("নাম (রসিদ ও SMS-এ যাবে)", "Name (shown on receipts & SMS)")}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={tr("বিষয়", "Subject")}>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
        </Field>
        <Field label={tr("শহর", "City")}>
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label={tr("বকেয়া ধরার তারিখ", "Fee due day")}>
          <Input className="num" inputMode="numeric" value={dueDay} onChange={(e) => setDueDay(e.target.value)} />
        </Field>
        <Field label={tr("বিকাশ নম্বর (রিমাইন্ডারে)", "bKash number (in reminders)")}>
          <Input inputMode="tel" value={bkash} onChange={(e) => setBkash(e.target.value)} />
        </Field>
      </div>
      <ErrorBox error={save.error} />
      <Button
        loading={save.isPending}
        onClick={() =>
          save.mutate({
            name,
            subject: subject || null,
            city: city || null,
            fee_due_day: Number(dueDay) || 10,
            settings: { bkash_number: bkash || null },
          })
        }
      >
        {save.isSuccess ? "✓ " : ""}
        {tr("সেভ", "Save")}
      </Button>
    </Card>
  );
}

function AutomationCard({ inst }: { inst: Institution }) {
  const { tr } = useLang();
  const save = useSaveInstitution();
  const s = inst.settings;
  const toggle = (key: string) => (v: boolean) => save.mutate({ settings: { [key]: v } });
  return (
    <Card className="divide-y divide-line px-5 py-2">
      <h2 className="py-3 font-bold">{tr("অটোমেশন", "Automations")}</h2>
      <Toggle checked={s.receipt_sms ?? true} onChange={toggle("receipt_sms")} disabled={save.isPending}
        label={tr("পেমেন্টের রসিদ SMS", "Payment receipt SMS")} description={tr("ফি নিলেই অভিভাবকের ফোনে", "Sent to the guardian on every payment")} />
      <Toggle checked={s.absent_sms ?? true} onChange={toggle("absent_sms")} disabled={save.isPending}
        label={tr("অনুপস্থিতির SMS", "Absence SMS")} description={tr("হাজিরা সেভ করলেই", "When attendance is saved")} />
      <Toggle checked={s.reminders_enabled ?? true} onChange={toggle("reminders_enabled")} disabled={save.isPending}
        label={tr("অটো বকেয়া রিমাইন্ডার (৩ ধাপ)", "Auto due reminders (3 steps)")} description={tr("শীঘ্রই চালু হচ্ছে", "Coming in the next module")} />
      <Toggle checked={s.daily_summary ?? true} onChange={toggle("daily_summary")} disabled={save.isPending}
        label={tr("রাত ৯টায় দিনের সারাংশ", "Nightly summary at 9 pm")} description={tr("শীঘ্রই চালু হচ্ছে", "Coming in the next module")} />
      <p className="py-3 text-xs text-muted">
        {tr("রাত ৯টা থেকে সকাল ৮টা পর্যন্ত অভিভাবকের কাছে কোনো SMS যায় না; একজন অভিভাবক দিনে সর্বোচ্চ ২টি অটো SMS পান।", "No guardian SMS between 9 pm and 8 am; at most 2 automatic SMS per guardian per day.")}
      </p>
      <ErrorBox error={save.error} />
    </Card>
  );
}

function TeamCard() {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const members = useQuery({ queryKey: ["members"], queryFn: () => api<Member[]>("/members") });
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const add = useMutation({
    mutationFn: () => api<Member[]>("/members", { body: { phone, name: name || null, role: "assistant" } }),
    onSuccess: (list) => {
      qc.setQueryData(["members"], list);
      setPhone("");
      setName("");
    },
  });
  const update = useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) => api<Member[]>(`/members/${id}`, { method: "PATCH", body: { is_active } }),
    onSuccess: (list) => qc.setQueryData(["members"], list),
  });

  return (
    <Card className="p-5">
      <h2 className="mb-1 font-bold">{tr("টিম", "Team")}</h2>
      <p className="mb-3 text-sm text-muted">{tr("অ্যাসিস্ট্যান্টের নম্বর দিন — সে OTP দিয়ে লগইন করবে।", "Add an assistant's number — they log in with OTP.")}</p>
      <ul className="mb-4 divide-y divide-line">
        {members.data?.map((m) => (
          <li key={m.id} className="flex items-center justify-between gap-3 py-2.5">
            <span className={m.is_active ? "" : "text-muted line-through"}>
              <span className="font-medium">{m.name ?? "—"}</span>
              <span className="block text-xs text-muted">
                {phoneLabel(m.phone, lang)} · {m.role === "owner" ? tr("মালিক", "Owner") : m.role === "assistant" ? tr("অ্যাসিস্ট্যান্ট", "Assistant") : tr("শিক্ষক", "Teacher")}
              </span>
            </span>
            {m.role !== "owner" && (
              <Button size="sm" variant="outline" onClick={() => update.mutate({ id: m.id, is_active: !m.is_active })}>
                {m.is_active ? tr("বাদ দিন", "Remove") : tr("আবার যোগ", "Restore")}
              </Button>
            )}
          </li>
        ))}
      </ul>
      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <Input placeholder={tr("নাম", "Name")} value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="01XXXXXXXXX" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Button loading={add.isPending} disabled={phone.length < 11} onClick={() => add.mutate()}>
          {tr("যোগ করুন", "Add")}
        </Button>
      </div>
      <ErrorBox error={add.error || update.error} />
    </Card>
  );
}

function FeesCard() {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const today = useTodayISO() ?? "2026-01-01";
  const [picked, setMonth] = useState<string | null>(null);
  const month = picked ?? today.slice(0, 7);
  const gen = useMutation({
    mutationFn: () => api<{ created: number; enrollments: number }>("/fees/generate", { body: { month } }),
    onSuccess: () => qc.invalidateQueries(),
  });
  const options = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today + "T00:00:00");
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  return (
    <Card className="space-y-3 p-5">
      <h2 className="font-bold">{tr("মাসিক ফি তৈরি", "Generate monthly fees")}</h2>
      <p className="text-sm text-muted">
        {tr("প্রতি মাসের ১ তারিখে নিজে থেকেই হবে। দরকার হলে এখানে হাতে চালানো যায় — দুবার চালালেও ডুপ্লিকেট হবে না।", "Runs by itself on the 1st. You can run it by hand — running twice never duplicates.")}
      </p>
      <div className="flex gap-2">
        <Select value={month} onChange={(e) => setMonth(e.target.value)}>
          {options.map((m) => (
            <option key={m} value={m}>
              {monthLabel(m + "-01", lang, true)}
            </option>
          ))}
        </Select>
        <Button loading={gen.isPending} onClick={() => gen.mutate()}>
          {tr("চালান", "Run")}
        </Button>
      </div>
      {gen.data && (
        <p className="text-sm text-purple">
          {tr(`${gen.data.created}টি নতুন ফি তৈরি হয়েছে।`, `${gen.data.created} new dues created.`)}
        </p>
      )}
      <ErrorBox error={gen.error} />
    </Card>
  );
}
