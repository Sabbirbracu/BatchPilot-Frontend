import { useLang } from "@/lib/i18n";
import type { BatchDraft } from "../../lib/draft";
import { DayPicker } from "../fields/day-picker";
import { TextField } from "../fields/text-field";
import { TimeField } from "../fields/time-field";
import { StepCard } from "./step-card";

/** ধাপ ১ · ব্যাচ ও সময় — name, subject, class, days, start/end time and room. */
export function BatchTimeStep({
  draft: d,
  set,
  suggestions,
}: {
  draft: BatchDraft;
  set: (p: Partial<BatchDraft>) => void;
  suggestions: { subjects: string[]; classes: string[] };
}) {
  const { tr } = useLang();
  return (
    <StepCard
      step={tr("ধাপ ১", "Step 1")}
      title={tr("ব্যাচ ও সময়", "Batch & time")}
      hint={tr("নাম, বিষয়, দিন আর সময়", "Name, subject, days and time")}
      tone={{ bg: "#F4EEFF", fg: "#5B21B6" }}
      icon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="5" width="18" height="15" rx="3" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      }
    >
      <div className="grid gap-3 sm:grid-cols-[1.3fr_1fr_1fr]">
        <TextField id="nb-name" label={tr("ব্যাচের নাম", "Batch name")} value={d.name} onChange={(name) => set({ name })} placeholder="SSC 2027 - A" required autoFocus />
        <div className="grid grid-cols-2 gap-3 sm:contents">
          <TextField id="nb-subject" label={tr("বিষয়", "Subject")} value={d.subject} onChange={(subject) => set({ subject })} placeholder="Biology" options={suggestions.subjects} />
          <TextField id="nb-class" label={tr("ক্লাস", "Class")} value={d.class_level} onChange={(class_level) => set({ class_level })} placeholder="SSC 2027" options={suggestions.classes} />
        </div>
      </div>
      <div className="mt-3">
        <DayPicker value={d.days} onChange={(days) => set({ days })} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <TimeField label={tr("শুরু", "Starts")} value={d.start_time} onChange={(start_time) => set({ start_time })} />
        <TimeField label={tr("শেষ", "Ends")} value={d.end_time} onChange={(end_time) => set({ end_time })} align="right" />
        <div className="col-span-2 sm:col-span-1">
          <TextField
            id="nb-room"
            label={tr("রুম", "Room")}
            optional={tr("(ঐচ্ছিক)", "(optional)")}
            value={d.location}
            onChange={(location) => set({ location })}
            placeholder={tr("যেমন: রুম ১", "e.g. Room 1")}
            look="soft"
          />
        </div>
      </div>
    </StepCard>
  );
}
