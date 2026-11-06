"use client";

import { Surface } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { ResultSet } from "../sample";

const COLOR: Record<string, string> = { "A+": "#12B76A", A: "#32D583", "A-": "#7C3AED", B: "#9E77ED", C: "#F5B800", D: "#F79009", F: "#F04438" };

/** How many students got each grade, as columns. */
export function GradeChart({ r }: { r: ResultSet }) {
  const { tr, lang } = useLang();
  const max = Math.max(...r.grades.map((g) => g.count), 1);
  return (
    <Surface className="p-4 md:p-5">
      <h2 className="m-0 text-[16px] font-bold">{tr("গ্রেড অনুযায়ী", "By grade")}</h2>
      <div className="mt-4 flex h-44 items-end gap-2 md:gap-3" role="img" aria-label={r.grades.map((g) => `${g.grade}: ${g.count}`).join(", ")}>
        {r.grades.map((g) => (
          <div key={g.grade} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
            <span className="num text-[12.5px] font-bold">{num(g.count, lang)}</span>
            <div className="w-full max-w-[44px] rounded-t-[10px]" style={{ height: `${Math.max(3, (g.count / max) * 100)}%`, background: COLOR[g.grade] }} />
            <span className="text-[12.5px] font-semibold text-[#6B6880]">{g.grade}</span>
          </div>
        ))}
      </div>
    </Surface>
  );
}
