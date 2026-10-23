"use client";

import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input, Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import { digits, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Student, StudentPage } from "@/lib/types";

export function useDebounced<T>(value: T, ms = 250): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

/** Search by name, roll or phone. Tapping a result picks the student. */
export function StudentSearch({ onPick, autoFocus }: { onPick: (s: Student) => void; autoFocus?: boolean }) {
  const { tr, lang } = useLang();
  const [q, setQ] = useState("");
  const dq = useDebounced(q.trim());
  const { data, isFetching } = useQuery({
    queryKey: ["students", "search", dq],
    queryFn: () => api<StudentPage>("/students", { params: { q: dq, limit: 12 } }),
    enabled: dq.length > 0,
  });

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted" />
        <Input
          className="h-14 pl-11 text-lg"
          placeholder={tr("নাম, রোল বা ফোন নম্বর", "Name, roll or phone")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus={autoFocus}
        />
        {isFetching && <Spinner className="absolute top-1/2 right-3.5 size-5 -translate-y-1/2" />}
      </div>
      {dq && data && (
        <ul className="mt-2 divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
          {data.items.length === 0 && <li className="px-4 py-4 text-sm text-muted">{tr("কাউকে পাওয়া যায়নি", "No match")}</li>}
          {data.items.map((s) => (
            <li key={s.id}>
              <button onClick={() => onPick(s)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-canvas">
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{s.name}</span>
                  <span className="block truncate text-xs text-muted">
                    {tr("রোল", "Roll")} {digits(s.roll_no, lang)} · {s.batch_names.join(", ")}
                  </span>
                </span>
                {s.outstanding > 0 ? (
                  <span className="num shrink-0 text-sm font-semibold text-due">{taka(s.outstanding, lang)}</span>
                ) : (
                  <span className="shrink-0 text-xs font-semibold text-purple">{tr("বকেয়া নেই", "No dues")}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
