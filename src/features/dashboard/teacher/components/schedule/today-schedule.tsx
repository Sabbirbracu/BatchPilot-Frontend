"use client";

import { useState } from "react";
import { Panel, PanelHeader, Segmented } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { TodayClass } from "@/lib/types";
import { RoutineList } from "./routine-list";
import { TodayList } from "./today-list";

type Range = "today" | "tomorrow" | "week";

export function TodaySchedule({
  date,
  classes,
  now,
  className,
}: {
  date: string;
  classes: TodayClass[];
  now: number | null;
  className?: string;
}) {
  const { tr } = useLang();
  const [range, setRange] = useState<Range>("today");
  const title = {
    today: tr("আজকের ব্যাচ", "Today's batches"),
    tomorrow: tr("কালকের ব্যাচ", "Tomorrow"),
    week: tr("সাপ্তাহিক রুটিন", "Weekly routine"),
  }[range];
  return (
    <Panel className={className}>
      <PanelHeader
        title={title}
        action={
          <Segmented<Range>
            size="sm"
            value={range}
            onChange={setRange}
            options={[
              { value: "today", label: tr("আজ", "Today") },
              { value: "tomorrow", label: tr("কাল", "Tmrw") },
              { value: "week", label: tr("সপ্তাহ", "Week") },
            ]}
          />
        }
      />
      {range === "today" ? <TodayList classes={classes} now={now} /> : <RoutineList date={date} range={range} />}
    </Panel>
  );
}
