"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { errorText, useToast } from "@/components/ui";
import { api } from "@/lib/api";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/** Gold card about due reminders: whether they run automatically, plus "send now" and the sent messages. */
export function ReminderCard({ dueStudents, remindersOn, canSend }: { dueStudents: number; remindersOn: boolean; canSend: boolean }) {
  const { tr, lang } = useLang();
  const to = usePortalPath();
  const toast = useToast();
  const send = useMutation({
    mutationFn: () => api<{ queued: number; skipped: number }>("/fees/reminders", { body: {} }),
    onSuccess: (r) => toast(tr(`${num(r.queued, lang)} জন অভিভাবকের কাছে রিমাইন্ডার যাচ্ছে`, `Reminders going to ${r.queued} guardians`)),
    onError: (e) => toast(errorText(e, lang) ?? ""),
  });
  return (
    <section className="rounded-[22px] bg-[#FFF7DB] px-4 py-3.5">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 flex-none items-center justify-center rounded-[12px] bg-[#F5B800] text-[#2E1065]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
            <path d="M10 20a2 2 0 0 0 4 0" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[14px] font-bold text-[#2E1065]">{remindersOn ? tr("অটো রিমাইন্ডার চালু", "Auto reminders on") : tr("অটো রিমাইন্ডার বন্ধ", "Auto reminders off")}</p>
          <p className="m-0 text-[12px] text-[#7A5800]">{tr(`${num(dueStudents, lang)} জন অভিভাবক · ভদ্র ভাষায়`, `${dueStudents} guardians · politely worded`)}</p>
        </div>
      </div>
      <div className="mt-2.5 flex gap-2">
        {canSend && (
          <button
            type="button"
            onClick={() => send.mutate()}
            disabled={send.isPending || dueStudents === 0}
            className="flex-1 rounded-[12px] bg-[#2E1065] p-2 text-[13px] font-bold text-white hover:bg-[#3B1782] disabled:opacity-60"
          >
            {send.isPending ? tr("পাঠানো হচ্ছে…", "Sending…") : tr("এখনই পাঠান", "Send now")}
          </button>
        )}
        <Link
          href={to("/messages?kind=reminder")}
          className="rounded-[12px] bg-white px-3 py-2 text-center text-[13px] font-semibold text-[#7A5800] hover:text-[#7A5800] max-[360px]:flex-1"
        >
          {tr("মেসেজ দেখুন", "See messages")}
        </Link>
      </div>
    </section>
  );
}
