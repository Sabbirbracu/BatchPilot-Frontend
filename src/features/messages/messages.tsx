"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Megaphone } from "lucide-react";
import { useState } from "react";
import { Button, Card, Empty, ErrorBox, Field, PageHeader, PageLoader, Segmented, Select, StatusBadge, Textarea, Toggle } from "@/components/ui";
import { api } from "@/lib/api";
import { can, useMe } from "@/lib/auth";
import { dateLabel, num, phoneLabel, timeLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Batch, Message, Template } from "@/lib/types";

type Tab = "log" | "notice" | "templates";

export default function MessagesPage() {
  const { tr } = useLang();
  const { data: me } = useMe();
  const [tab, setTab] = useState<Tab>("log");
  const options: { value: Tab; label: string }[] = [
    { value: "log", label: tr("মেসেজ লগ", "Log") },
    { value: "notice", label: tr("নোটিশ পাঠান", "Send notice") },
  ];
  if (can(me, "message.edit_templates")) options.push({ value: "templates", label: tr("টেমপ্লেট", "Templates") });

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={tr("মেসেজ ও নোটিশ", "Messages")}
        subtitle={tr("SMS গেটওয়ে এখনো যুক্ত হয়নি — মেসেজগুলো সারিতে জমা থাকছে।", "SMS gateway not connected yet — messages are queued.")}
      />
      <div className="mb-4">
        <Segmented value={tab} onChange={setTab} options={options} />
      </div>
      {tab === "log" && <Log />}
      {tab === "notice" && <Notice />}
      {tab === "templates" && <Templates />}
    </div>
  );
}

const TEMPLATE_NAMES: Record<string, [string, string]> = {
  receipt: ["পেমেন্টের রসিদ", "Payment receipt"],
  absent: ["অনুপস্থিতি", "Absence"],
  reminder_1: ["বকেয়া রিমাইন্ডার ১", "Due reminder 1"],
  reminder_2: ["বকেয়া রিমাইন্ডার ২", "Due reminder 2"],
  reminder_3: ["বকেয়া রিমাইন্ডার ৩", "Due reminder 3"],
  welcome: ["স্বাগত SMS", "Welcome"],
  notice: ["নোটিশ", "Notice"],
  summary: ["রাতের সারাংশ (মালিক)", "Nightly summary (owner)"],
};

function Log() {
  const { tr, lang } = useLang();
  const [status, setStatus] = useState("");
  const q = useQuery({ queryKey: ["messages", "log", status], queryFn: () => api<Message[]>("/messages", { params: { status, limit: 200 } }) });
  const stats = useQuery({ queryKey: ["messages", "stats"], queryFn: () => api<Record<string, number>>("/messages/stats") });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Select className="h-10 max-w-48 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">{tr("সব", "All")}</option>
          {["queued", "held", "sent", "delivered", "failed", "cancelled"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        {stats.data &&
          Object.entries(stats.data).map(([s, n]) => (
            <span key={s} className="flex items-center gap-1 text-xs text-muted">
              <StatusBadge status={s} /> {num(n, lang)}
            </span>
          ))}
      </div>
      {q.isLoading ? (
        <PageLoader />
      ) : !q.data?.length ? (
        <Empty title={tr("কোনো মেসেজ নেই", "No messages")} />
      ) : (
        <Card className="divide-y divide-line">
          {q.data.map((m) => (
            <div key={m.id} className="space-y-1 px-4 py-3">
              <div className="flex items-center justify-between gap-2 text-xs text-muted">
                <span className="truncate">
                  {m.student_name ?? "—"} · {phoneLabel(m.to_phone, lang)} · {dateLabel(m.created_at, lang)} {timeLabel(m.created_at, lang)}
                </span>
                <StatusBadge status={m.status} />
              </div>
              <p className="text-sm">{m.body}</p>
              <p className="text-xs text-muted">
                {(TEMPLATE_NAMES[m.template_key] ?? [m.template_key, m.template_key])[lang === "bn" ? 0 : 1]} · {num(m.segments, lang)} SMS
              </p>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

function Notice() {
  const { tr, lang } = useLang();
  const [message, setMessage] = useState("");
  const [batchId, setBatchId] = useState("");
  const batches = useQuery({ queryKey: ["batches"], queryFn: () => api<Batch[]>("/batches") });
  const qc = useQueryClient();
  const send = useMutation({
    mutationFn: () => api<{ queued: number; recipients: number }>("/messages/notice", { body: { message, batch_id: batchId || null } }),
    onSuccess: () => {
      setMessage("");
      qc.invalidateQueries({ queryKey: ["messages"] });
    },
  });
  const unicode = /[^\x00-\x7F]/.test(message);
  const perSms = unicode ? 70 : 160;

  return (
    <Card className="space-y-4 p-5">
      <Field label={tr("কাদের কাছে", "To")}>
        <Select value={batchId} onChange={(e) => setBatchId(e.target.value)}>
          <option value="">{tr("সব অভিভাবক", "All guardians")}</option>
          {batches.data?.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label={tr("নোটিশ", "Notice")}
        hint={tr(`${num(message.length, lang)} অক্ষর · বাংলা SMS-এ ${num(perSms, lang)} অক্ষরে ১টি SMS`, `${message.length} chars · ${perSms} chars per SMS`)}
      >
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={tr("আগামীকাল ক্লাস বন্ধ থাকবে।", "No class tomorrow.")} maxLength={300} />
      </Field>
      {send.data && (
        <div className="rounded-xl bg-lavender px-4 py-3 text-sm text-purple-deep">
          {tr(`${num(send.data.queued, lang)} জন অভিভাবকের কাছে নোটিশ যাচ্ছে।`, `Notice queued for ${send.data.queued} guardians.`)}
        </div>
      )}
      <ErrorBox error={send.error} />
      <Button block loading={send.isPending} disabled={message.trim().length < 3} onClick={() => send.mutate()}>
        <Megaphone className="size-4" /> {tr("নোটিশ পাঠান", "Send notice")}
      </Button>
    </Card>
  );
}

function Templates() {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["templates"], queryFn: () => api<Template[]>("/messages/templates") });
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const save = useMutation({
    mutationFn: ({ key, body }: { key: string; body: Partial<Template> }) => api<Template>(`/messages/templates/${key}`, { method: "PATCH", body }),
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["templates"] });
      setDrafts((d) => {
        const next = { ...d };
        delete next[v.key];
        return next;
      });
    },
  });

  if (!q.data) return <PageLoader />;
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        {tr("{student}, {amount}, {months}, {institution} এর মতো শব্দ নিজে থেকে বসবে।", "Words like {student}, {amount}, {months}, {institution} are filled in automatically.")}
      </p>
      {q.data.map((t) => {
        const draft = drafts[t.key];
        return (
          <Card key={t.key} className="space-y-2 p-4">
            <Toggle
              checked={t.is_enabled}
              onChange={(v) => save.mutate({ key: t.key, body: { is_enabled: v } })}
              label={(TEMPLATE_NAMES[t.key] ?? [t.key, t.key])[lang === "bn" ? 0 : 1]}
              description={tr(`${num(t.segments, lang)}টি SMS`, `${t.segments} SMS part(s)`)}
            />
            <Textarea value={draft ?? t.body_bn} onChange={(e) => setDrafts({ ...drafts, [t.key]: e.target.value })} />
            {draft !== undefined && draft !== t.body_bn && (
              <Button size="sm" loading={save.isPending} onClick={() => save.mutate({ key: t.key, body: { body_bn: draft } })}>
                {tr("সেভ", "Save")}
              </Button>
            )}
          </Card>
        );
      })}
      <ErrorBox error={save.error} />
    </div>
  );
}
