"use client";

import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { Empty, ErrorBox, PageLoader } from "@/components/ui";
import { useMe } from "@/lib/auth";
import { phoneLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { RequestStatus } from "@/features/admissions/join/components/request-status";
import { ChildCard } from "./components/child-card";
import { ChildSwitcher } from "./components/child-switcher";
import { childKey, useFamily } from "./use-family";

// Student and guardian share this one dashboard: every child on this phone, grouped by teacher,
// with fees, attendance, class times and notices, plus admission requests still waiting.
export default function FamilyDashboard() {
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const { data, error, isLoading } = useFamily();
  const [child, setChild] = useState<string | null>(null);
  if (isLoading) return <PageLoader />;
  if (error || !data) return <ErrorBox error={error} />;

  const names = new Map<string, string>();
  for (const p of data.places) for (const c of p.children) names.set(childKey(c.name), c.name);
  const requests = data.places.flatMap((p) => p.requests);
  const nothing = names.size === 0 && requests.length === 0;
  return (
    <div className="space-y-4 text-[#17161F] [line-height:normal]">
      <div>
        <h1 className="m-0 text-[22px] font-bold">{tr("আমার পড়াশোনা", "My classes")}</h1>
        <p className="num m-0 text-[13px] text-[#6B6880]">{phoneLabel(me?.user.phone, lang)}</p>
      </div>
      <ChildSwitcher names={[...names].map(([key, name]) => ({ key, name }))} value={child} onChange={setChild} />
      {requests.map((r) => (
        <RequestStatus key={r.id} request={r} />
      ))}
      {nothing && (
        <div className="rounded-[22px] bg-white">
          <Empty title={tr("এই নম্বরে কোনো স্টুডেন্ট নেই", "No student on this number")}>
            <p className="m-0 max-w-xs text-[13px] text-[#6B6880]">
              {tr("শিক্ষকের দেওয়া QR স্ক্যান করে ভর্তির আবেদন করুন।", "Scan your teacher's QR code to apply for admission.")}
            </p>
          </Empty>
        </div>
      )}
      {data.places.map((p) => {
        const kids = p.children.filter((c) => !child || childKey(c.name) === child);
        if (kids.length === 0) return null;
        return (
          <section key={p.institution_id} className="space-y-2.5">
            <h2 className="m-0 flex items-center gap-2 text-[14px] font-bold text-[#5B21B6]">
              <GraduationCap className="size-4" />
              {p.institution_name}
              {p.teacher_name && <span className="font-semibold text-[#6B6880]">· {p.teacher_name}</span>}
            </h2>
            {kids.map((c) => (
              <ChildCard key={c.student_id} child={c} bkash={p.bkash_number} />
            ))}
          </section>
        );
      })}
    </div>
  );
}
