"use client";

import { useQuery } from "@tanstack/react-query";
import { KindPill } from "@/features/shared/messages/kind-pill";
import { KindBadge, kindLook } from "@/features/shared/messages/kinds";
import { SmsStatusPill } from "@/features/shared/messages/sms-status-pill";
import { api } from "@/lib/api";
import { dateLabel, phoneLabel, timeLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Message } from "@/lib/types";
import { EmptyLine } from "../panel-section";

/** মেসেজ: every SMS sent about this student, as a timeline with what it was and whether it arrived. */
export function MessagesTab({ studentId }: { studentId: string }) {
  const { tr, lang } = useLang();
  const q = useQuery({ queryKey: ["messages", studentId], queryFn: () => api<Message[]>("/messages", { params: { student_id: studentId } }) });
  if (!q.data) return <EmptyLine>{tr("লোড হচ্ছে…", "Loading…")}</EmptyLine>;
  if (q.data.length === 0) return <EmptyLine>{tr("এই স্টুডেন্টের জন্য এখনো কোনো SMS যায়নি", "No SMS sent about this student yet")}</EmptyLine>;
  return (
    <ol className="m-0 flex list-none flex-col gap-0 p-0">
      {q.data.map((m, i) => (
        <li key={m.id} className="relative flex gap-3 pb-4 last:pb-0">
          {i < q.data.length - 1 && <span className="absolute top-10 bottom-0 left-[17px] w-[2px] bg-[#F1EEF8]" aria-hidden />}
          <KindBadge look={kindLook(m.template_key)} />
          <div className="min-w-0 flex-1 rounded-[16px] bg-[#FAF9FD] px-3.5 py-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <KindPill templateKey={m.template_key} />
              <span className="num min-w-0 flex-1 truncate text-[12px] text-[#6B6880]">
                {dateLabel(m.created_at, lang)} {timeLabel(m.created_at, lang)} · {phoneLabel(m.to_phone, lang)}
              </span>
              <SmsStatusPill status={m.status} />
            </div>
            <p className="m-0 mt-1.5 text-[13.5px] leading-[1.55] text-[#3B3850]">{m.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
