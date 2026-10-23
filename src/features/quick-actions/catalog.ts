import {
  Banknote,
  Camera,
  FileText,
  FingerprintPattern,
  MessageSquareWarning,
  UserRoundPlus,
  Volume1,
  type LucideIcon,
} from "lucide-react";
import type { Tone } from "@/components/ui";

type Label = readonly [bn: string, en: string];

export type QuickAction = {
  id: ActionId;
  icon: LucideIcon;
  tone: Tone;
  label: Label;
  short?: Label; // phone tiles
  long?: Label; // desktop list
  hint?: Label;
  href?: string; // portal-relative; missing = feature not built yet
};

export type ActionId = "fee" | "finger" | "student" | "diary" | "marks" | "notice" | "reminder";

// Every quick action in one place; each screen picks the ones it shows.
export const ACTIONS: Record<ActionId, QuickAction> = {
  fee: {
    id: "fee",
    icon: Banknote,
    tone: "purple",
    label: ["ফি জমা নিন", "Collect fee"],
    short: ["ফি নিন", "Fee"],
    hint: ["রশিদ অভিভাবকের কাছে SMS-এ যাবে", "Receipt goes to the guardian by SMS"],
    href: "/fees",
  },
  finger: { id: "finger", icon: FingerprintPattern, tone: "green", label: ["আঙুল নিবন্ধন", "Fingerprint"] },
  student: { id: "student", icon: UserRoundPlus, tone: "purple", label: ["নতুন স্টুডেন্ট", "New student"], href: "/students/new" },
  diary: {
    id: "diary",
    icon: Camera,
    tone: "gold",
    label: ["ডায়েরি ইমপোর্ট", "Diary import"],
    short: ["ডায়েরি", "Diary"],
    long: ["ডায়েরির ছবি ইমপোর্ট", "Import diary photo"],
  },
  marks: { id: "marks", icon: FileText, tone: "purple", label: ["পরীক্ষার নম্বর", "Exam marks"], short: ["নম্বর তুলুন", "Marks"] },
  notice: { id: "notice", icon: Volume1, tone: "blue", label: ["নোটিশ পাঠান", "Send notice"], href: "/messages" },
  reminder: { id: "reminder", icon: MessageSquareWarning, tone: "red", label: ["বকেয়া রিমাইন্ডার", "Due reminder"], href: "/fees/dues" },
};

export const DESKTOP_ACTIONS: ActionId[] = ["fee", "finger", "diary", "marks", "notice"];
export const PHONE_TILES: ActionId[] = ["fee", "finger", "diary", "marks"];
export const SHEET_GRID: ActionId[] = ["finger", "student", "diary", "marks", "notice", "reminder"];
