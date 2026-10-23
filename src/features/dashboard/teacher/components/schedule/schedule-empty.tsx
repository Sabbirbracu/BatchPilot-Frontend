import { CalendarDays } from "lucide-react";

export function ScheduleEmpty({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-canvas px-6 py-10 text-center">
      <CalendarDays className="size-8 text-muted/60" />
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}
