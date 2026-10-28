"use client";

import { useMutation } from "@tanstack/react-query";
import { errorText, LetterAvatar, useToast } from "@/components/ui";
import { api } from "@/lib/api";
import { ALERT_TONE } from "@/lib/avatar";
import { num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { BatchMember } from "@/lib/types";

/** Gold card: who still owes this month, how much, and a button to SMS them all now. */
export function DuesCard({
  batchId,
  owing,
  total,
  remindersOn,
  canRemind,
}: {
  batchId: string;
  owing: BatchMember[];
  total: number;
  remindersOn: boolean;
  canRemind: boolean;
}) {
  const { tr, lang } = useLang();
  const toast = useToast();
  const remind = useMutation({
    mutationFn: () => api<{ queued: number; skipped: number }>("/fees/reminders", { body: { batch_id: batchId } }),
    onSuccess: (r) => toast(tr(`${num(r.queued, lang)} জনকে রিমাইন্ডার পাঠানো হচ্ছে`, `Sending ${r.queued} reminders`)),
    onError: (e) => toast(errorText(e, lang) ?? ""),
  });

  if (owing.length === 0) {
    return (
      <section className="rounded-[22px] bg-[#ECFDF3] p-3.5">
        <h2 className="m-0 text-[15px] font-bold text-[#05603A]">{tr("এ মাসে কোনো বকেয়া নেই", "No dues this month")}</h2>
        <p className="m-0 mt-1 text-[12.5px] text-[#05603A]">{tr("এই ব্যাচের সবাই ফি দিয়েছে।", "Everyone in this batch has paid.")}</p>
      </section>
    );
  }

  const shown = owing.slice(0, 3);
  const extra = owing.length - shown.length;
  return (
    <section className="rounded-[22px] bg-[#FFF7DB] p-3.5">
      <div className="mb-2 flex items-center">
        <h2 className="m-0 flex-1 text-[15px] font-bold text-[#2E1065]">
          {tr("বকেয়া", "Dues")} · {tr(`${num(owing.length, lang)} জন`, `${owing.length}`)}
        </h2>
        <span className="num text-[14px] font-bold text-[#D92D20]">{taka(total, lang)}</span>
      </div>
      <div className="mb-2.5 flex items-center">
        {shown.map((m, i) => (
          <LetterAvatar
            key={m.student_id}
            name={m.name}
            tone={m.month_paid > 0 ? undefined : ALERT_TONE}
            className="size-7 rounded-full border-2 border-[#FFF7DB] text-[11px]"
            style={{ marginLeft: i ? -7 : 0 }}
          />
        ))}
        {extra > 0 && (
          <span className="-ml-[7px] flex size-7 items-center justify-center rounded-full border-2 border-[#FFF7DB] bg-[#2E1065] text-[10px] font-bold text-white">
            +{num(extra, lang)}
          </span>
        )}
        <span className="ml-2 text-[12px] text-[#7A5800]">
          {remindersOn ? tr("অটো রিমাইন্ডার চালু", "Auto reminders on") : tr("অটো রিমাইন্ডার বন্ধ", "Auto reminders off")}
        </span>
      </div>
      {canRemind && (
        <button
          type="button"
          onClick={() => remind.mutate()}
          disabled={remind.isPending}
          className="w-full rounded-[12px] bg-[#2E1065] p-[9px] text-[13px] font-bold text-white hover:bg-[#3B1782] disabled:opacity-60"
        >
          {remind.isPending ? tr("পাঠানো হচ্ছে…", "Sending…") : tr("এখনই সবাইকে মনে করান", "Remind everyone now")}
        </button>
      )}
    </section>
  );
}
