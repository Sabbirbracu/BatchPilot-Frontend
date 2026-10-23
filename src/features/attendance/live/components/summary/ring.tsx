import { ProgressRing } from "@/components/ui";

/** Gold-on-purple ring with the design's proportions (r 50, stroke 14 in a 114 box). */
export function SummaryRing({ value, className, children }: { value: number; className: string; children: React.ReactNode }) {
  return (
    <ProgressRing value={value} size={114} stroke={14} className={className} trackClassName="text-white/[0.18]" barClassName="text-[#F5B800]">
      {children}
    </ProgressRing>
  );
}
