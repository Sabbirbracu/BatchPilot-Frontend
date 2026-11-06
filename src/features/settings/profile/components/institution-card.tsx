"use client";

import { useState } from "react";
import { Button, Card, ErrorBox, Field, Input } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { useSaveInstitution } from "@/lib/institution";
import type { Institution } from "@/lib/types";

/** Institution name, subject, city, fee due day and the bKash number used in reminders. */
export function InstitutionCard({ inst }: { inst: Institution }) {
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
