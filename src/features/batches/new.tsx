"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BatchForm } from "@/components/batch-form";
import { Card, PageHeader } from "@/components/ui";
import { api } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { Batch } from "@/lib/types";

export default function NewBatchPage() {
  const to = usePortalPath();
  const { tr } = useLang();
  const router = useRouter();
  const qc = useQueryClient();
  return (
    <div className="mx-auto max-w-xl">
      <PageHeader back={to("/batches")} title={tr("নতুন ব্যাচ", "New batch")} />
      <Card className="p-5">
        <BatchForm
          submitLabel={tr("ব্যাচ তৈরি করুন", "Create batch")}
          onSubmit={async (data) => {
            const b = await api<Batch>("/batches", { body: data });
            qc.invalidateQueries({ queryKey: ["batches"] });
            router.replace(to(`/batches/${b.id}`));
          }}
        />
      </Card>
    </div>
  );
}
