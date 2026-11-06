"use client";

import { Banknote, CalendarClock, MonitorPlay, Plus, Users } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { FilterChip, PrimaryButton } from "@/components/ui";
import { clockLabel, num, takaCompact } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { OnlinePage } from "../shared/online-page";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { OnlineBatchCard } from "./components/online-batch-card";
import { ONLINE_BATCHES, type OnlineBatch } from "./sample";

type Filter = "all" | OnlineBatch["status"];

// অনলাইন ব্যাচ — batches taught live over Zoom / Meet / BatchPilot Live, with seats, fee and the next class.
export default function OnlineBatchesPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [filter, setFilter] = useState<Filter>("all");
  const all = ONLINE_BATCHES;
  const running = all.filter((b) => b.status === "running");
  const shown = filter === "all" ? all : all.filter((b) => b.status === filter);
  const students = running.reduce((s, b) => s + b.enrolled, 0);
  const income = running.reduce((s, b) => s + b.enrolled * b.fee, 0);
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: tr(`সব · ${num(all.length, lang)}`, `All · ${all.length}`) },
    { value: "running", label: tr("চলছে", "Running") },
    { value: "upcoming", label: tr("শুরু হবে", "Starting") },
    { value: "ended", label: tr("শেষ", "Ended") },
  ];

  return (
    <OnlinePage
      header={
        <AppHeader
          title={tr("অনলাইন ব্যাচ", "Online batches")}
          subtitle={tr(`${num(running.length, lang)}টা চালু · ${num(students, lang)} জন স্টুডেন্ট`, `${running.length} running · ${students} students`)}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Plus className="size-[18px]" strokeWidth={2.2} />
              {tr("নতুন অনলাইন ব্যাচ", "New online batch")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <MonitorPlay className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("চালু ব্যাচ", "Running batches"), value: num(running.length, lang) },
          { icon: <Users className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("অনলাইন স্টুডেন্ট", "Online students"), value: num(students, lang) },
          { icon: <Banknote className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("মাসিক আয়", "Monthly income"), value: takaCompact(income * 100, lang) },
          { icon: <CalendarClock className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("পরের লাইভ", "Next live"), value: clockLabel(running[0].start, lang), note: `${tr("আজ", "Today")} · ${pick(running[0].name, lang)}` },
        ]}
      />
      <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-[16px] bg-white p-2">
        {filters.map((f) => (
          <FilterChip key={f.value} active={filter === f.value} onClick={() => setFilter(f.value)} className="py-2">
            {f.label}
          </FilterChip>
        ))}
      </div>
      <section aria-label={tr("অনলাইন ব্যাচের তালিকা", "Online batch list")} className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {shown.map((b) => (
          <OnlineBatchCard key={b.id} batch={b} />
        ))}
      </section>
    </OnlinePage>
  );
}
