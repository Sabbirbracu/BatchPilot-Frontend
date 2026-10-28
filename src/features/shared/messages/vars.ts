// SMS placeholders. The API stores English keys ({student}); people read and type Bangla ones ({নাম}).

export type SmsVar = { key: string; bn: string; en: string; sample: string; long?: string }; // long: wording used on the notice page

export const VARS: Record<string, SmsVar> = {
  student: { key: "student", bn: "নাম", en: "name", sample: "তানভীর", long: "স্টুডেন্টের নাম" },
  batch: { key: "batch", bn: "ব্যাচ", en: "batch", sample: "SSC গণিত A" },
  date: { key: "date", bn: "তারিখ", en: "date", sample: "২৮ অক্টোবর" },
  amount: { key: "amount", bn: "টাকা", en: "amount", sample: "৮০০" },
  months: { key: "months", bn: "মাস", en: "months", sample: "অক্টোবর" },
  roll: { key: "roll", bn: "রোল", en: "roll", sample: "০৩" },
  bkash: { key: "bkash", bn: "বিকাশ নম্বর", en: "bKash no.", sample: "01711-000000" },
  institution: { key: "institution", bn: "প্রতিষ্ঠান", en: "institution", sample: "" },
  message: { key: "message", bn: "নোটিশ", en: "notice", sample: "" },
  today: { key: "today", bn: "আজ আদায়", en: "today", sample: "৳১৪,৪০০" },
  today_count: { key: "today_count", bn: "আজ জন", en: "today count", sample: "১২" },
  month: { key: "month", bn: "মাসে আদায়", en: "month", sample: "৳১,৮২,৪০০" },
  due: { key: "due", bn: "বকেয়া", en: "due", sample: "৳৫৭,৬০০" },
  due_count: { key: "due_count", bn: "বকেয়া জন", en: "due count", sample: "৫৪" },
  absent: { key: "absent", bn: "অনুপস্থিত", en: "absent", sample: "৭" },
};

/** Which placeholders each template can use (what the backend fills in for it). */
export function varsFor(templateKey: string): SmsVar[] {
  const keys: Record<string, string[]> = {
    absent: ["student", "date", "batch"],
    receipt: ["student", "amount", "months"],
    reminder_1: ["student", "amount", "months"],
    reminder_2: ["student", "amount", "bkash", "roll"],
    reminder_3: ["student", "amount", "months"],
    welcome: ["student"],
    summary: ["today", "today_count", "month", "due", "due_count", "absent"],
  };
  return (keys[templateKey] ?? ["student", "batch", "date"]).map((k) => VARS[k]);
}

const byBn = Object.fromEntries(
  Object.values(VARS).flatMap((v) => [[v.bn, v.key], ...(v.long ? [[v.long, v.key]] : [])]),
);

/** "{student} এসেছে" → "{নাম} এসেছে" */
export function toDisplay(body: string, lang: "bn" | "en" = "bn"): string {
  return body.replace(/\{([a-z_]+)\}/g, (m, k) => (VARS[k] ? `{${lang === "bn" ? VARS[k].bn : VARS[k].en}}` : m));
}

/** "{নাম} এসেছে" → "{student} এসেছে" (the reverse of toDisplay; English labels work too). */
export function toStored(text: string): string {
  const byEn = Object.fromEntries(Object.values(VARS).map((v) => [v.en, v.key]));
  return text.replace(/\{([^{}]+)\}/g, (m, label) => {
    const k = byBn[label] ?? byEn[label];
    return k ? `{${k}}` : m;
  });
}

/** Fill placeholders for the phone preview. */
export function fillSample(stored: string, values: Record<string, string>): string {
  return stored.replace(/\{([a-z_]+)\}/g, (m, k) => values[k] ?? VARS[k]?.sample ?? m);
}

/** Bangla (UCS-2) SMS: 70 chars, 67 per part when split; plain English 160/153. Matches the backend. */
export function smsParts(text: string): { chars: number; parts: number; perSms: number } {
  const unicode = /[^\x00-\x7F]/.test(text);
  const [single, multi] = unicode ? [70, 67] : [160, 153];
  const chars = text.length;
  return { chars, parts: chars <= single ? 1 : Math.ceil(chars / multi), perSms: single };
}
