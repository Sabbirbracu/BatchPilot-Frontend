"use client";

import { Clock, Eye, Film, Loader, Upload } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Empty, FilterChip, PrimaryButton, SearchField } from "@/components/ui";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { OnlinePage } from "../shared/online-page";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { LessonCard } from "./components/lesson-card";
import { LESSONS, SHELVES } from "./sample";

// রেকর্ডেড ক্লাস — the video library: past live classes and uploaded lessons, by batch or course.
export default function RecordedLessonsPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [shelf, setShelf] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = LESSONS.filter((l) => (!shelf || l.shelf === shelf) && (!needle || `${l.title.bn} ${l.title.en}`.toLowerCase().includes(needle)));
  const hours = Math.round(LESSONS.reduce((s, l) => s + l.minutes, 0) / 60);
  const views = LESSONS.reduce((s, l) => s + l.views, 0);
  const processing = LESSONS.filter((l) => l.status === "processing").length;

  return (
    <OnlinePage
      header={
        <AppHeader
          title={tr("রেকর্ডেড ক্লাস", "Recorded lessons")}
          subtitle={tr(`${num(LESSONS.length, lang)}টা ভিডিও · ${num(hours, lang)} ঘণ্টা`, `${LESSONS.length} videos · ${hours} hours`)}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Upload className="size-[18px]" />
              {tr("ভিডিও আপলোড", "Upload video")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <Film className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("মোট ভিডিও", "Videos"), value: num(LESSONS.length, lang) },
          { icon: <Clock className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("মোট সময়", "Total length"), value: tr(`${digits(hours, lang)} ঘণ্টা`, `${hours} h`) },
          { icon: <Eye className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("মোট ভিউ", "Views"), value: num(views, lang) },
          { icon: <Loader className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("প্রসেস হচ্ছে", "Processing"), value: num(processing, lang) },
        ]}
      />
      <div className="flex flex-col gap-2 rounded-[16px] bg-white p-2 md:flex-row md:items-center">
        <SearchField value={q} onChange={setQ} placeholder={tr("ভিডিও খুঁজুন", "Search videos")} look="panel" className="md:w-[240px]" />
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          <FilterChip active={!shelf} onClick={() => setShelf(null)} className="py-2">
            {tr("সব", "All")}
          </FilterChip>
          {SHELVES.map((s) => (
            <FilterChip key={s.key} active={shelf === s.key} onClick={() => setShelf(s.key)} className="py-2">
              {pick(s.name, lang)}
            </FilterChip>
          ))}
        </div>
      </div>
      {shown.length ? (
        <section aria-label={tr("ভিডিওর তালিকা", "Video list")} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
          {shown.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </section>
      ) : (
        <Empty title={tr("এমন কোনো ভিডিও নেই", "No matching videos")} />
      )}
    </OnlinePage>
  );
}
