import { BN_MONTHS, digits, type Lang } from "@/lib/format";

const BN_WEEKDAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const EN_WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function greeting(minutes: number | null, lang: Lang): string {
  const h = minutes == null ? 9 : Math.floor(minutes / 60);
  if (lang === "en") return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return h < 12 ? "শুভ সকাল" : h < 16 ? "শুভ দুপুর" : h < 18 ? "শুভ বিকাল" : "শুভ সন্ধ্যা";
}

/** "শুক্রবার, ২৩ অক্টোবর" */
export function longDate(isoDate: string, lang: Lang): string {
  const d = new Date(isoDate + "T00:00:00");
  if (lang === "en") return `${EN_WEEKDAYS[d.getDay()]}, ${d.getDate()} ${EN_MONTHS[d.getMonth()]}`;
  return `${BN_WEEKDAYS[d.getDay()]}, ${digits(d.getDate(), lang)} ${BN_MONTHS[d.getMonth()]}`;
}

const BN_MONTHS_IN = [
  "জানুয়ারিতে", "ফেব্রুয়ারিতে", "মার্চে", "এপ্রিলে", "মে মাসে", "জুনে",
  "জুলাইয়ে", "আগস্টে", "সেপ্টেম্বরে", "অক্টোবরে", "নভেম্বরে", "ডিসেম্বরে",
];

/** "অক্টোবরে" — Bangla months take different locative endings, so they are listed. */
export function monthIn(isoDate: string, lang: Lang): string {
  const m = Number(isoDate.split("-")[1]) - 1;
  return lang === "bn" ? BN_MONTHS_IN[m] : `in ${EN_MONTHS[m].slice(0, 3)}`;
}
