"use client";

import { AlarmClock, ClipboardList, Plus, SearchCheck, Trophy } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { PrimaryButton, SegmentTabs } from "@/components/ui";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { OnlinePage } from "../shared/online-page";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { useSoon } from "@/features/shared/preview/use-soon";
import { AssignmentCard } from "./components/assignment-card";
import { ASSIGNMENTS, type Assignment } from "./sample";

type Tab = "open" | "check" | "done";

// "যাচাই বাকি" is anything with answers left to check, whatever its status.
const inTab = (a: Assignment, tab: Tab) => (tab === "check" ? a.toCheck > 0 : tab === "open" ? a.status === "running" || a.status === "overdue" : a.status === "ended");

// অ্যাসাইনমেন্ট — homework given to online batches: who handed it in, what still needs checking.
export default function AssignmentsPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [tab, setTab] = useState<Tab>("open");
  const running = ASSIGNMENTS.filter((a) => a.status === "running").length;
  const toCheck = ASSIGNMENTS.reduce((s, a) => s + a.toCheck, 0);
  const overdue = ASSIGNMENTS.filter((a) => a.status === "overdue").length;
  const graded = ASSIGNMENTS.filter((a) => a.average != null);
  const avg = graded.length ? Math.round(graded.reduce((s, a) => s + (a.average! / a.marks) * 100, 0) / graded.length) : 0;
  const shown = ASSIGNMENTS.filter((a) => inTab(a, tab));

  return (
    <OnlinePage
      header={
        <AppHeader
          title={tr("অ্যাসাইনমেন্ট", "Assignments")}
          subtitle={tr(`${num(running, lang)}টা চলছে · ${num(toCheck, lang)}টা খাতা যাচাই বাকি`, `${running} open · ${toCheck} answers to check`)}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Plus className="size-[18px]" strokeWidth={2.2} />
              {tr("নতুন অ্যাসাইনমেন্ট", "New assignment")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <ClipboardList className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("চলছে", "Open"), value: num(running, lang) },
          { icon: <SearchCheck className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("যাচাই বাকি", "To check"), value: num(toCheck, lang), valueColor: toCheck ? "#B07C00" : undefined },
          { icon: <AlarmClock className="size-5" />, iconBg: "#FEE4E2", iconFg: "#D92D20", label: tr("সময় পার", "Overdue"), value: num(overdue, lang), valueColor: overdue ? "#D92D20" : undefined },
          { icon: <Trophy className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("গড় নম্বর", "Avg. score"), value: `${digits(avg, lang)}%` },
        ]}
      />
      <SegmentTabs<Tab>
        value={tab}
        onChange={setTab}
        fill
        label={tr("অ্যাসাইনমেন্টের অবস্থা", "Assignment status")}
        className="md:max-w-md"
        options={[
          { value: "open", label: tr("চলমান", "Open") },
          { value: "check", label: tr(`যাচাই বাকি · ${num(ASSIGNMENTS.filter((a) => a.toCheck > 0).length, lang)}`, `To check · ${ASSIGNMENTS.filter((a) => a.toCheck > 0).length}`) },
          { value: "done", label: tr("শেষ", "Done") },
        ]}
      />
      <section aria-label={tr("অ্যাসাইনমেন্টের তালিকা", "Assignment list")} className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {shown.map((a) => (
          <AssignmentCard key={a.id} item={a} />
        ))}
      </section>
    </OnlinePage>
  );
}
