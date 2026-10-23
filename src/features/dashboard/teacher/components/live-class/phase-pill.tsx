import clsx from "clsx";
import type { ClassPhase } from "@/lib/class-schedule";

export function PhasePill({ phase, children }: { phase: ClassPhase; children: React.ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur xl:text-[13px]">
      <span className="relative flex size-2 shrink-0">
        {phase === "live" && <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-75" />}
        <span className={clsx("relative size-2 rounded-full", phase === "done" ? "bg-white/60" : "bg-gold")} />
      </span>
      <span className="truncate">{children}</span>
    </span>
  );
}
