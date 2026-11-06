"use client";

import { BookOpen, ChartLine, Plus, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { PrimaryButton, SegmentTabs } from "@/components/ui";
import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { OnlinePage } from "../shared/online-page";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { useSoon } from "@/features/shared/preview/use-soon";
import { CourseCard } from "./components/course-card";
import { COURSES, type Course } from "./sample";

type Tab = "all" | Course["status"];

// অনলাইন কোর্স — recorded, self-paced courses students buy once and finish at their own speed.
export default function OnlineCoursesPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [tab, setTab] = useState<Tab>("all");
  const published = COURSES.filter((c) => c.status === "published");
  const enrolled = COURSES.reduce((s, c) => s + c.enrolled, 0);
  const sold = COURSES.reduce((s, c) => s + c.soldThisMonth, 0);
  const paid = published.filter((c) => c.enrolled);
  const avg = Math.round(paid.reduce((s, c) => s + c.completion, 0) / Math.max(1, paid.length));
  const shown = tab === "all" ? COURSES : COURSES.filter((c) => c.status === tab);

  return (
    <OnlinePage
      header={
        <AppHeader
          title={tr("অনলাইন কোর্স", "Online courses")}
          subtitle={tr(`${num(published.length, lang)}টা প্রকাশিত · ${num(enrolled, lang)} এনরোলমেন্ট`, `${published.length} published · ${enrolled} enrolments`)}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Plus className="size-[18px]" strokeWidth={2.2} />
              {tr("নতুন কোর্স", "New course")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <BookOpen className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("প্রকাশিত কোর্স", "Published"), value: num(published.length, lang) },
          { icon: <Users className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("মোট এনরোলমেন্ট", "Enrolments"), value: num(enrolled, lang) },
          { icon: <ShoppingBag className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("এই মাসে বিক্রি", "Sold this month"), value: num(sold, lang) },
          { icon: <ChartLine className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("গড় সম্পন্ন", "Avg. completed"), value: `${digits(avg, lang)}%` },
        ]}
      />
      <SegmentTabs<Tab>
        value={tab}
        onChange={setTab}
        fill
        label={tr("কোর্সের ধরন", "Course status")}
        className="md:max-w-sm"
        options={[
          { value: "all", label: tr("সব", "All") },
          { value: "published", label: tr("প্রকাশিত", "Published") },
          { value: "draft", label: tr("ড্রাফট", "Drafts") },
        ]}
      />
      <section aria-label={tr("কোর্সের তালিকা", "Course list")} className="grid gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {shown.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </section>
    </OnlinePage>
  );
}
