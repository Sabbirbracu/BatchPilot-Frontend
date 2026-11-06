"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, ErrorBox, Select } from "@/components/ui";
import { api } from "@/lib/api";
import { useTodayISO } from "@/lib/clock";
import { monthLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** Run the monthly fee generation by hand (it also runs by itself on the 1st). */
export function FeesCard() {
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
