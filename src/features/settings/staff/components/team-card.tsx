"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, ErrorBox, Input } from "@/components/ui";
import { api } from "@/lib/api";
import { phoneLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Member } from "@/lib/types";

/** Everyone on the team, with add (assistants log in with OTP) and remove / restore. */
export function TeamCard() {
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
