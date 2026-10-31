"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Dialog, ErrorBox, Field, Input } from "@/components/ui";
import { api } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";

/** Name, guardian, phones, school and class. Sends the version so two people editing at once get a clear error. */
export function EditDialog({ student, onClose }: { student: Student; onClose: () => void }) {
  const { tr } = useLang();
  const qc = useQueryClient();
  const [form, setForm] = useState({
    name: student.name,
    guardian_name: student.guardian_name ?? "",
    guardian_phone: student.guardian_phone?.replace(/^\+88/, "") ?? "",
    phone: student.phone?.replace(/^\+88/, "") ?? "",
    school: student.school ?? "",
    class_level: student.class_level ?? "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });
  const m = useMutation({
    mutationFn: () =>
      api<Student>(`/students/${student.id}`, {
        method: "PATCH",
        body: { ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim() || null])), name: form.name.trim(), version: student.version },
      }),
    onSuccess: (s) => {
      qc.setQueryData(["student", student.id], s);
      qc.invalidateQueries({ queryKey: ["students"] });
      onClose();
    },
  });
  return (
    <Dialog open onClose={onClose} title={tr("তথ্য বদলান", "Edit student")}>
      <div className="space-y-3">
        <Field label={tr("নাম", "Name")}>
          <Input value={form.name} onChange={set("name")} />
        </Field>
        <Field label={tr("অভিভাবকের নাম", "Guardian name")}>
          <Input value={form.guardian_name} onChange={set("guardian_name")} />
        </Field>
        <Field label={tr("অভিভাবকের ফোন", "Guardian phone")}>
          <Input inputMode="tel" value={form.guardian_phone} onChange={set("guardian_phone")} />
        </Field>
        <Field label={tr("স্টুডেন্টের ফোন", "Student phone")}>
          <Input inputMode="tel" value={form.phone} onChange={set("phone")} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={tr("স্কুল", "School")}>
            <Input value={form.school} onChange={set("school")} />
          </Field>
          <Field label={tr("ক্লাস", "Class")}>
            <Input value={form.class_level} onChange={set("class_level")} />
          </Field>
        </div>
        <ErrorBox error={m.error} />
        <Button block loading={m.isPending} onClick={() => m.mutate()}>
          {tr("সেভ", "Save")}
        </Button>
      </div>
    </Dialog>
  );
}
