import { digits } from "@/lib/format";
import type { Batch } from "@/lib/types";

// Each batch is coloured by what kind of class it is, as in the design:
// SSC purple, HSC blue, school classes green, exam / model-test batches amber.

export type BatchTone = { fg: string; soft: string };

const TONES = {
  purple: { fg: "#5B21B6", soft: "#F4EEFF" },
  blue: { fg: "#3E63DD", soft: "#EEF4FF" },
  green: { fg: "#039855", soft: "#ECFDF3" },
  amber: { fg: "#B07C00", soft: "#FFF7DB" },
} satisfies Record<string, BatchTone>;

type Kindable = Pick<Batch, "name" | "subject" | "class_level">;

const text = (b: Kindable) => `${b.name} ${b.subject ?? ""} ${b.class_level ?? ""}`;

export function batchTone(b: Kindable): BatchTone {
  const t = text(b);
  if (/মডেল|টেস্ট|পরীক্ষা|test|exam/i.test(t)) return TONES.amber;
  if (/HSC|এইচএসসি/i.test(t)) return TONES.blue;
  if (/SSC|এসএসসি/i.test(t)) return TONES.purple;
  return TONES.green;
}

/** Short label for the square badge: "SSC", "HSC", "৯ম". */
export function classBadge(b: Kindable): string {
  const t = text(b);
  if (/HSC|এইচএসসি/i.test(t)) return "HSC";
  if (/SSC|এসএসসি/i.test(t)) return "SSC";
  const n = (b.class_level ?? b.name).match(/[0-9০-৯]+/)?.[0];
  if (n) return `${digits(n, "bn")}ম`;
  return Array.from(b.name.trim()).slice(0, 3).join("");
}

/** Title as the design writes it: "SSC ২০২৭ · গণিত (A)". */
export function batchTitle(b: Pick<Batch, "name" | "subject">): string {
  return b.subject ? `${b.name} · ${b.subject}` : b.name;
}

/** Group used by the class filter chips. */
export function classGroup(b: Kindable): string {
  return b.class_level?.trim() || classBadge(b);
}
