"use client";

import { useQueryClient } from "@tanstack/react-query";
import { BatchForm } from "@/components/batch-form";
import { Dialog } from "@/components/ui";
import { api } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";

/** Edit name, days, time, fee and seats in a dialog. */
export function EditDialog({ batch, open, onClose }: { batch: Batch; open: boolean; onClose: () => void }) {
  const { tr } = useLang();
  const qc = useQueryClient();
  return (
    <Dialog open={open} onClose={onClose} title={tr("ব্যাচ এডিট", "Edit batch")}>
      {open && (
        <BatchForm
          initial={batch}
          submitLabel={tr("সেভ", "Save")}
          onSubmit={async (data) => {
            const updated = await api<Batch>(`/batches/${batch.id}`, { method: "PATCH", body: data });
            qc.setQueryData(["batch", batch.id], updated);
            qc.invalidateQueries({ queryKey: ["batches"] });
            onClose();
          }}
        />
      )}
    </Dialog>
  );
}
