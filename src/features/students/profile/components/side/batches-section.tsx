"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ErrorBox } from "@/components/ui";
import { batchTone } from "@/features/shared/batch-tone";
import { api } from "@/lib/api";
import { monthLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Batch, Enrollment } from "@/lib/types";
import { SideCard } from "./side-card";

/** The batches the student is in, each with its fee; add one or take the student out. */
export function BatchesSection({ studentId, enrollments, canEdit }: { studentId: string; enrollments: Enrollment[]; canEdit: boolean }) {
  const { tr, lang } = useLang();
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [batchId, setBatchId] = useState("");
  const batches = useQuery({ queryKey: ["batches"], queryFn: () => api<Batch[]>("/batches"), enabled: adding });
  const refresh = () => {
    for (const k of ["enrollments", "student", "ledger"]) qc.invalidateQueries({ queryKey: [k, studentId] });
    qc.invalidateQueries({ queryKey: ["students"] });
  };
  const add = useMutation({
    mutationFn: () => api(`/students/${studentId}/enrollments`, { body: { batch_id: batchId } }),
    onSuccess: () => {
      setAdding(false);
      setBatchId("");
      refresh();
    },
  });
  const remove = useMutation({
    mutationFn: (bid: string) => api(`/students/${studentId}/enrollments/${bid}`, { method: "DELETE" }),
    onSuccess: refresh,
  });
  const available = (batches.data ?? []).filter((b) => !b.archived_at && !enrollments.some((e) => e.batch_id === b.id));

  return (
    <SideCard
      title={tr("ব্যাচ", "Batches")}
      action={
        canEdit &&
        !adding && (
          <button type="button" onClick={() => setAdding(true)} className="text-[13.5px] font-bold text-[#5B21B6] hover:text-[#4C1D95]">
            + {tr("ব্যাচ যোগ", "Add batch")}
          </button>
        )
      }
    >
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {enrollments.map((e) => {
          const tone = batchTone({ name: e.batch_name, subject: null, class_level: null });
          return (
            <li key={e.id} className="flex items-center gap-2.5 rounded-[14px] bg-[#F7F5FC] px-3 py-2.5">
              <span className="h-8 w-1.5 flex-none rounded-full" style={{ background: tone.fg }} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="m-0 truncate text-[14px] font-semibold">{e.batch_name}</p>
                <p className="num m-0 truncate text-[12px] text-[#6B6880]">
                  {taka(e.monthly_fee, lang)}/{tr("মাস", "mo")}
                  {e.discount_note && <span className="text-[#B07C00]"> · {e.discount_note}</span>}
                  {` · ${tr("শুরু", "from")} ${monthLabel(e.start_month, lang)}`}
                </p>
              </div>
              {canEdit && (
                <button
                  type="button"
                  onClick={() => confirm(tr("এই ব্যাচ থেকে বাদ দেবেন? আগের বকেয়া থাকবে।", "Remove from this batch? Past dues stay.")) && remove.mutate(e.batch_id)}
                  aria-label={tr(`${e.batch_name} থেকে বাদ দিন`, `Remove from ${e.batch_name}`)}
                  className="flex size-8 flex-none items-center justify-center rounded-[10px] text-[#9E9BAD] hover:bg-[#FEF0EF] hover:text-[#D92D20]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              )}
            </li>
          );
        })}
        {enrollments.length === 0 && <li className="py-1 text-[13px] text-[#9E9BAD]">{tr("কোনো ব্যাচে নেই", "Not in any batch")}</li>}
      </ul>
      {adding && (
        <div className="mt-3 flex gap-2">
          <select
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            aria-label={tr("ব্যাচ বাছুন", "Choose batch")}
            className="h-[42px] min-w-0 flex-1 rounded-[12px] bg-white px-3 text-[14px] shadow-[inset_0_0_0_1.5px_#E4DDF5] outline-none focus:shadow-[inset_0_0_0_2px_#8B5CF6]"
          >
            <option value="">{batches.isLoading ? tr("লোড হচ্ছে…", "Loading…") : tr("ব্যাচ বাছুন", "Choose batch")}</option>
            {available.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} · {taka(b.monthly_fee, lang)}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!batchId || add.isPending}
            onClick={() => add.mutate()}
            className="h-[42px] rounded-[12px] bg-[#5B21B6] px-4 text-[14px] font-bold text-white hover:bg-[#4C1D95] disabled:opacity-50"
          >
            {tr("যোগ", "Add")}
          </button>
          <button type="button" onClick={() => setAdding(false)} className="h-[42px] rounded-[12px] bg-[#F3F1FA] px-3 text-[14px] font-semibold text-[#6B6880]">
            {tr("না", "Cancel")}
          </button>
        </div>
      )}
      <div className="mt-2 empty:hidden">
        <ErrorBox error={add.error || remove.error} />
      </div>
    </SideCard>
  );
}
