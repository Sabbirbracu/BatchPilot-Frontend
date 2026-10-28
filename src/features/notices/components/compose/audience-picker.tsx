"use client";

import { useState } from "react";
import { batchTitle } from "@/features/shared/batch-tone";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { AudienceCount, Batch, NoticeAudience, Student } from "@/lib/types";
import { ChoiceChip } from "./choice-chip";
import { StudentPickerDialog } from "./student-picker-dialog";

/** "কাকে পাঠাবেন?": everyone, any batches, and hand-picked students, with the reach underneath. */
export function AudiencePicker({
  batches,
  value,
  onChange,
  students,
  onStudents,
  count,
}: {
  batches: Batch[];
  value: NoticeAudience;
  onChange: (a: NoticeAudience) => void;
  students: Student[];
  onStudents: (s: Student[]) => void;
  count: AudienceCount | undefined;
}) {
  const { tr, lang } = useLang();
  const [picking, setPicking] = useState(false);
  const toggleBatch = (id: string) => {
    const has = value.batch_ids.includes(id);
    onChange({ ...value, all: false, batch_ids: has ? value.batch_ids.filter((b) => b !== id) : [...value.batch_ids, id] });
  };
  const anyPicked = value.all || value.batch_ids.length > 0 || students.length > 0;

  return (
    <div>
      <p className="m-0 mb-2 text-[13px] font-bold">{tr("কাকে পাঠাবেন?", "Who gets it?")}</p>
      <div className="flex flex-wrap gap-[7px]">
        <ChoiceChip on={value.all} onClick={() => onChange({ all: !value.all, batch_ids: [], student_ids: value.student_ids })}>
          {tr("সব ব্যাচ", "All batches")}
        </ChoiceChip>
        {batches.map((b) => (
          <ChoiceChip key={b.id} on={value.batch_ids.includes(b.id)} onClick={() => toggleBatch(b.id)}>
            {batchTitle(b)}
          </ChoiceChip>
        ))}
        {students.map((s) => (
          <ChoiceChip
            key={s.id}
            on
            onClick={() => {
              const next = students.filter((x) => x.id !== s.id);
              onStudents(next);
              onChange({ ...value, student_ids: next.map((x) => x.id) });
            }}
          >
            {s.name} ✕
          </ChoiceChip>
        ))}
        <ChoiceChip on={false} muted onClick={() => setPicking(true)}>
          + {tr("নির্দিষ্ট স্টুডেন্ট", "A specific student")}
        </ChoiceChip>
      </div>
      <p className="m-0 mt-2 text-[12.5px] font-semibold" style={{ color: anyPicked ? "#039855" : "#6B6880" }}>
        {!anyPicked
          ? tr("কাদের পাঠাবেন বেছে নিন", "Choose who to send it to")
          : count
            ? `✓ ${tr(`${num(count.guardians, lang)} জন অভিভাবক পাবেন`, `${count.guardians} guardians will get it`)}${
                count.missing_phone ? ` · ${tr(`${num(count.missing_phone, lang)} জনের নম্বর নেই`, `${count.missing_phone} have no number`)}` : ""
              }`
            : tr("গুনছি…", "Counting…")}
      </p>
      <StudentPickerDialog
        open={picking}
        onClose={() => setPicking(false)}
        onPick={(s) => {
          if (students.some((x) => x.id === s.id)) return;
          const next = [...students, s];
          onStudents(next);
          onChange({ ...value, student_ids: next.map((x) => x.id) });
        }}
      />
    </div>
  );
}
