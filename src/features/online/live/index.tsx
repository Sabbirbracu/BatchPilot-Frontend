"use client";

import { CalendarDays, Clapperboard, Radio, UserCheck, Video } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { PrimaryButton } from "@/components/ui";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { OnlinePage } from "../shared/online-page";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { useSoon } from "@/features/shared/preview/use-soon";
import { ClassList } from "./components/class-list";
import { LiveNowCard } from "./components/live-now-card";
import { LIVE_NOW, PAST, THIS_WEEK, TODAY } from "./sample";

// লাইভ ক্লাস — what is live now, the rest of today, this week, and recent classes with their recordings.
export default function LiveClassesPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const done = [...TODAY, ...PAST].filter((c) => c.status === "ended" && c.joined != null);
  const avg = Math.round(done.reduce((s, c) => s + (c.joined! / c.enrolled) * 100, 0) / Math.max(1, done.length));
  const recordings = [...TODAY, ...PAST].filter((c) => c.recorded).length;

  return (
    <OnlinePage
      header={
        <AppHeader
          title={tr("লাইভ ক্লাস", "Live classes")}
          subtitle={tr(`আজ ${num(TODAY.length, lang)}টা ক্লাস · এই সপ্তাহে আরও ${num(THIS_WEEK.length, lang)}টা`, `${TODAY.length} today · ${THIS_WEEK.length} more this week`)}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <CalendarDays className="size-[18px]" />
              {tr("ক্লাস শিডিউল করুন", "Schedule a class")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <Radio className="size-5" />, iconBg: "#FEE4E2", iconFg: "#D92D20", label: tr("আজকের ক্লাস", "Today"), value: num(TODAY.length, lang) },
          { icon: <Video className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("এই সপ্তাহে", "This week"), value: num(TODAY.length + THIS_WEEK.length, lang) },
          { icon: <UserCheck className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("গড় উপস্থিতি", "Avg. attendance"), value: `${digits(avg, lang)}%` },
          { icon: <Clapperboard className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("রেকর্ডিং হয়েছে", "Recorded"), value: num(recordings, lang) },
        ]}
      />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-5">
        <div className="min-w-0 space-y-4 lg:space-y-5">
          <LiveNowCard cls={LIVE_NOW} />
          <ClassList title={tr("আজকের ক্লাস", "Today's classes")} classes={TODAY} />
        </div>
        <div className="min-w-0 space-y-4 lg:space-y-5">
          <ClassList title={tr("এই সপ্তাহে", "Later this week")} classes={THIS_WEEK} />
          <ClassList title={tr("আগের ক্লাস", "Recent classes")} classes={PAST} />
        </div>
      </div>
    </OnlinePage>
  );
}
