import clsx from "clsx";
import type { Batch } from "@/lib/types";
import { batchTone, classBadge } from "@/features/shared/batch-tone";

/** Rounded square with "SSC" / "HSC" / "৯ম" in the batch's colour. */
export function ClassBadge({ batch, className }: { batch: Pick<Batch, "name" | "subject" | "class_level">; className?: string }) {
  const tone = batchTone(batch);
  const label = classBadge(batch);
  return (
    <span
      aria-hidden
      className={clsx(
        "flex size-10 flex-none items-center justify-center rounded-[13px] font-bold [font-family:var(--font-sora),var(--font-hind)]",
        /^[A-Z]+$/.test(label) ? "text-[11px]" : "text-[13px]",
        className,
      )}
      style={{ background: tone.soft, color: tone.fg }}
    >
      {label}
    </span>
  );
}
