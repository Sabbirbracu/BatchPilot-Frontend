import type { Lang } from "@/lib/format";
import { AlertIcon, BellIcon, DocIcon, FingerIcon, MegaphoneIcon, PeopleIcon, ReceiptIcon, SunIcon, TrophyIcon } from "./icons";

export type KindLook = { bn: string; en: string; bg: string; fg: string; Icon: (p: { size?: number }) => React.ReactNode };

const RED = { bg: "#FEF0EF", fg: "#D92D20" };
const GREEN = { bg: "#ECFDF3", fg: "#039855" };
const PURPLE = { bg: "#F4EEFF", fg: "#5B21B6" };
const AMBER = { bg: "#FFF7DB", fg: "#B07C00" };
const BLUE = { bg: "#EEF4FF", fg: "#3E63DD" };
const GREY = { bg: "#F3F1FA", fg: "#6B6880" };

/** How each SMS template looks across the SMS log, template list and auto-rule rows. */
const LOOKS: Record<string, KindLook> = {
  absent: { bn: "অনুপস্থিত", en: "Absent", ...RED, Icon: AlertIcon },
  present: { bn: "হাজিরা", en: "Attendance", ...GREEN, Icon: FingerIcon },
  receipt: { bn: "রশিদ", en: "Receipt", ...PURPLE, Icon: ReceiptIcon },
  reminder_1: { bn: "বকেয়া", en: "Due", ...AMBER, Icon: BellIcon },
  reminder_2: { bn: "বকেয়া", en: "Due", ...AMBER, Icon: BellIcon },
  reminder_3: { bn: "বকেয়া", en: "Due", ...AMBER, Icon: BellIcon },
  welcome: { bn: "স্বাগতম", en: "Welcome", ...GREEN, Icon: PeopleIcon },
  notice: { bn: "নোটিশ", en: "Notice", ...BLUE, Icon: MegaphoneIcon },
  summary: { bn: "সারাংশ", en: "Summary", ...GREY, Icon: DocIcon },
  result: { bn: "রেজাল্ট", en: "Result", ...BLUE, Icon: TrophyIcon },
  n_holiday: { bn: "ছুটি", en: "Holiday", ...AMBER, Icon: SunIcon },
  n_exam: { bn: "পরীক্ষা", en: "Exam", ...BLUE, Icon: DocIcon },
  n_meeting: { bn: "সভা", en: "Meeting", ...PURPLE, Icon: PeopleIcon },
};

const NOTICE_FALLBACK: KindLook = { bn: "নোটিশ", en: "Notice", ...BLUE, Icon: MegaphoneIcon };

export function kindLook(key: string): KindLook {
  return LOOKS[key] ?? NOTICE_FALLBACK;
}

/** Notice history has no key, so its icon is guessed from the title. */
export function noticeLook(title: string | null): KindLook {
  const t = title ?? "";
  if (/ছুটি|বন্ধ|holiday/i.test(t)) return LOOKS.n_holiday;
  if (/পরীক্ষা|টেস্ট|exam|test/i.test(t)) return LOOKS.n_exam;
  if (/সভা|meeting/i.test(t)) return LOOKS.n_meeting;
  return NOTICE_FALLBACK;
}

export function kindLabel(key: string, lang: Lang): string {
  const l = kindLook(key);
  return lang === "bn" ? l.bn : l.en;
}

/** Rounded-square icon badge in a kind's colours. */
export function KindBadge({ look, size = 36, icon = 17, radius = 11 }: { look: KindLook; size?: number; icon?: number; radius?: number }) {
  return (
    <span className="flex flex-none items-center justify-center" style={{ width: size, height: size, borderRadius: radius, background: look.bg, color: look.fg }}>
      <look.Icon size={icon} />
    </span>
  );
}
