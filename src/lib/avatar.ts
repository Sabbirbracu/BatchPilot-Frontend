// Letter avatars for students: a stable colour per name and the design's initials rule.

export type AvatarTone = { bg: string; fg: string };

const TONES: AvatarTone[] = [
  { bg: "#FFD75E", fg: "#3B1782" },
  { bg: "#C9B3FF", fg: "#3B1782" },
  { bg: "#BFF0D6", fg: "#05603A" },
  { bg: "#F4EEFF", fg: "#5B21B6" },
  { bg: "#EEF4FF", fg: "#3E63DD" },
  { bg: "#FFF7DB", fg: "#7A5800" },
];

/** Students who need attention (absent, fee due) are drawn red everywhere. */
export const ALERT_TONE: AvatarTone = { bg: "#FECDCA", fg: "#B42318" };

export function nameTone(name: string): AvatarTone {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

/** First letter, keeping a following vowel sign ("রা", "মি") like the design. */
export function initials(name: string): string {
  const chars = Array.from(name.trim());
  return chars[1] && /[া-ৌ]/.test(chars[1]) ? chars[0] + chars[1] : (chars[0] ?? "?");
}
