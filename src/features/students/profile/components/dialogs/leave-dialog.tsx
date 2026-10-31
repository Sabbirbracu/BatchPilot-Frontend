"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Dialog, ErrorBox, Field, Input } from "@/components/ui";
import { api } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";

/** ছেড়ে দিয়েছে: no new fees from next month; old dues and records stay. */
export function LeaveDialog({ student, onClose }: { student: Student; onClose: () => void }) {
  const { tr } = useLang();
  const qc = useQueryClient();
  const [reason, setReason] = useState("");
  const m = useMutation({
    mutationFn: () => api<Student>(`/students/${student.id}/leave`, { body: { reason: reason || null } }),
    onSuccess: (s) => {
      qc.setQueryData(["student", student.id], s);
      qc.invalidateQueries({ queryKey: ["enrollments", student.id] });
      qc.invalidateQueries({ queryKey: ["students"] });
      onClose();
    },
  });
  return (
    <Dialog open onClose={onClose} title={tr("স্টুডেন্ট ছেড়ে দিয়েছে", "Student left")}>
      <div className="space-y-4">
        <p className="text-sm text-muted">
          {tr("পরের মাস থেকে আর ফি তৈরি হবে না। আগের বকেয়া থাকবে, সব তথ্য রাখা হবে।", "No new fees from next month. Old dues and all records stay.")}
        </p>
        <Field label={tr("কারণ (ঐচ্ছিক)", "Reason (optional)")}>
          <Input value={reason} onChange={(e) => setReason(e.target.value)} />
        </Field>
        <ErrorBox error={m.error} />
        <Button variant="danger" block loading={m.isPending} onClick={() => m.mutate()}>
          {tr("নিশ্চিত করুন", "Confirm")}
        </Button>
      </div>
    </Dialog>
  );
}
