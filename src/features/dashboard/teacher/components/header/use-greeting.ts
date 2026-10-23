"use client";

import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { greeting, longDate } from "../../lib/greeting";

/** Greeting, display name and the date line, shared by the phone and desktop headers. */
export function useGreeting(name: string | null, date: string, classCount: number, minutes: number | null) {
  const { tr, lang } = useLang();
  // Names are often saved with the honorific already ("রাফি স্যার"), so add it only when missing.
  const who = name && lang === "bn" && !/(স্যার|ম্যাডাম|আপা)$/.test(name.trim()) ? `${name} স্যার` : name;
  const batches =
    classCount > 0
      ? tr(`${num(classCount, lang)}টা ব্যাচ`, `${classCount} batch${classCount === 1 ? "" : "es"}`)
      : tr("আজ ব্যাচ নেই", "no batches");
  return { hello: greeting(minutes, lang), who, dateLine: longDate(date, lang), batches };
}
