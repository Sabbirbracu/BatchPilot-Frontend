"use client";

import clsx from "clsx";
import { Surface } from "@/components/ui";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { ResultSet } from "../sample";

const MEDAL = ["bg-[#F5B800] text-[#2E1065]", "bg-[#D0CDE0] text-[#3B3850]", "bg-[#F7B27A] text-[#7A2E0E]"];

/** The five highest scores. */
export function TopStudents({ r }: { r: ResultSet }) {
  const { tr, lang } = useLang();
  return (
    <Surface className="px-4 pt-4 pb-1 md:px-5">
      <h2 className="m-0 text-[16px] font-bold">{tr("সেরা ৫ জন", "Top five")}</h2>
      <ol className="m-0 list-none divide-y divide-[#F1EEF8] p-0">
        {r.top.map((s, i) => (
          <li key={s.code} className="flex items-center gap-3 py-2.5">
            <span className={clsx("num flex size-7 flex-none items-center justify-center rounded-full text-[13px] font-bold", MEDAL[i] ?? "bg-[#F4EEFF] text-[#5B21B6]")}>{num(i + 1, lang)}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14.5px] font-semibold">{s.name}</span>
              <span className="num block text-[12px] text-[#9E9BAD]">
                {tr("আইডি", "ID")} {digits(s.code, lang)}
              </span>
            </span>
            <span className="num text-[16px] font-bold">
              {num(s.marks, lang)}
              <span className="text-[12px] font-medium text-[#9E9BAD]">/{num(r.marks, lang)}</span>
            </span>
          </li>
        ))}
      </ol>
    </Surface>
  );
}
