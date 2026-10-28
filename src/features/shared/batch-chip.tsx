import { batchTone } from "./batch-tone";

/** Small tag with a batch's name in its colour ("SSC গণিত A", "মডেল টেস্ট"). `size="md"` for profile cards. */
export function BatchChip({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const tone = batchTone({ name, subject: null, class_level: null });
  return (
    <span
      className={size === "sm" ? "rounded-[7px] px-[7px] py-px text-[11px] font-bold whitespace-nowrap" : "rounded-[8px] px-2 py-0.5 text-[12px] font-bold whitespace-nowrap"}
      style={{ background: tone.soft, color: tone.fg }}
    >
      {name}
    </span>
  );
}
