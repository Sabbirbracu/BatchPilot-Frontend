"use client";

import { Check, Minus } from "lucide-react";
import { Card } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { Role } from "@/lib/types";
import { PERMISSION_LABELS, ROLE_PERMISSIONS } from "../permissions";

const ROLES: { role: Role; bn: string; en: string }[] = [
  { role: "owner", bn: "মালিক", en: "Owner" },
  { role: "assistant", bn: "অ্যাসিস্ট্যান্ট", en: "Assistant" },
  { role: "teacher", bn: "শিক্ষক", en: "Teacher" },
];

/** What each role can do — the same rules the server enforces. */
export function RoleMatrix() {
  const { tr, lang } = useLang();
  return (
    <Card className="overflow-hidden">
      <div className="p-5 pb-3">
        <h2 className="m-0 font-bold">{tr("কে কী করতে পারে", "Who can do what")}</h2>
        <p className="m-0 mt-0.5 text-sm text-muted">{tr("ভূমিকা অনুযায়ী পারমিশন ঠিক করা থাকে", "Permissions come with each role")}</p>
      </div>
      <table className="w-full table-fixed text-[13.5px]">
        <thead>
          <tr className="border-y border-line bg-canvas/60 text-[11.5px] text-muted sm:text-[12px]">
            <th className="w-[36%] px-5 py-2 text-left font-semibold sm:w-[46%]">{tr("কাজ", "Action")}</th>
            {ROLES.map((r) => (
              <th key={r.role} className="px-1 py-2 text-center font-semibold">
                <span className="block truncate">{lang === "bn" ? r.bn : r.en}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {PERMISSION_LABELS.map((p) => (
            <tr key={p.key}>
              <td className="px-5 py-2.5">{lang === "bn" ? p.bn : p.en}</td>
              {ROLES.map((r) => {
                const yes = ROLE_PERMISSIONS[r.role].includes(p.key);
                return (
                  <td key={r.role} className="text-center">
                    {yes ? (
                      <Check className="mx-auto size-[18px] text-ok" strokeWidth={2.6} aria-label={tr("পারবে", "Allowed")} />
                    ) : (
                      <Minus className="mx-auto size-4 text-[#C9C5DA]" aria-label={tr("পারবে না", "Not allowed")} />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
