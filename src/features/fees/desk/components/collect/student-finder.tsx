"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LetterAvatar, Pill } from "@/components/ui";
import { useDebounced } from "@/components/student-search";
import { api } from "@/lib/api";
import { digits, num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Student, StudentPage } from "@/lib/types";

/** The big ringed search box: type a name, roll or phone; results drop down; picking one fills the form. */
export function StudentFinder({ onPick, initial, autoFocus }: { onPick: (s: Student) => void; initial?: string; autoFocus?: boolean }) {
  const { tr, lang } = useLang();
  const [q, setQ] = useState(initial ?? "");
  const [open, setOpen] = useState(false);
  const dq = useDebounced(q.trim());
  const { data } = useQuery({
    queryKey: ["students", "search", dq],
    queryFn: () => api<StudentPage>("/students", { params: { q: dq, limit: 8 } }),
    enabled: dq.length > 0,
  });
  const count = dq && data ? data.total : null;

  return (
    <div className="relative">
      <label className="flex items-center gap-2.5 rounded-[16px] bg-white px-3.5 py-3 shadow-[0_0_0_2px_#8B5CF6,0_0_0_6px_#F1EAFF]">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        <input
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={tr("নাম, রোল বা ফোন", "Name, roll or phone")}
          aria-label={tr("স্টুডেন্ট খুঁজুন", "Find a student")}
          className="min-w-0 flex-1 bg-transparent text-[16px] font-semibold text-[#17161F] caret-[#5B21B6] outline-none placeholder:font-normal placeholder:text-[#9E9BAD]"
        />
        {count != null && (
          <Pill bg="#F3F1FA" fg="#6B6880">
            {tr(`${num(count, lang)}টা মিলেছে`, `${count} found`)}
          </Pill>
        )}
      </label>
      {open && dq && data && (
        <ul className="absolute inset-x-0 top-full z-20 mt-3 max-h-[320px] overflow-y-auto rounded-[16px] bg-white p-1.5 shadow-[0_18px_40px_-14px_rgba(46,16,101,.35)] ring-1 ring-[#ECEAF4]">
          {data.items.length === 0 && <li className="px-3 py-3 text-[13px] text-[#6B6880]">{tr("কাউকে পাওয়া যায়নি", "No match")}</li>}
          {data.items.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => {
                  onPick(s);
                  setQ(s.name);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-left hover:bg-[#F7F5FC]"
              >
                <LetterAvatar name={s.name} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold">{s.name}</span>
                  <span className="num block truncate text-[11.5px] text-[#6B6880]">
                    {tr("রোল", "Roll")} {digits(s.roll_no, lang)} · {s.batch_names.join(", ")}
                  </span>
                </span>
                <span className="num text-[13px] font-bold" style={{ color: s.outstanding > 0 ? "#D92D20" : "#039855" }}>
                  {s.outstanding > 0 ? taka(s.outstanding, lang) : tr("বাকি নেই", "No dues")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
