import clsx from "clsx";
import type { Batch } from "@/lib/types";
import { batchTone, classBadge } from "@/features/shared/batch-tone";

/** Rounded square with "SSC" / "HSC" / "৯ম" in the batch's colour. */
export function ClassBadge({
  batch,
  size = "md",
  className,
}: {
  batch: Pick<Batch, "name" | "subject" | "class_level">;
  size?: "md" | "lg"; // lg on the admission batch cards
  className?: string;
}) {
  const tone = batchTone(batch);
  const label = classBadge(batch);
  return (
    <span
      aria-hidden
      className={clsx(
        "flex flex-none items-center justify-center font-bold [font-family:var(--font-sora),var(--font-hind)]",
        size === "md" ? "size-10 rounded-[13px]" : "size-12 rounded-[14px]",
        /^[A-Z]+$/.test(label) ? "text-[11px]" : "text-[13px]",
        className,
      )}
      style={{ background: tone.soft, color: tone.fg }}
    >
      {label}
    </span>
  );
}
