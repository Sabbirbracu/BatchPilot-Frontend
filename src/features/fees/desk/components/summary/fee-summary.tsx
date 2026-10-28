import { IconStat } from "@/components/ui";
import { num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { FeeOverview } from "@/lib/types";
import { CollectionCard } from "./collection-card";
import { MethodSplit } from "./method-split";

/** Month collection ring · today · dues · payment-method split. */
export function FeeSummary({ data, remindersOn }: { data: FeeOverview; remindersOn: boolean }) {
  const { tr, lang } = useLang();
  return (
    <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1fr_1fr]">
      <CollectionCard month={data.month} collected={data.collected} billed={data.billed} />
      <IconStat
        label={tr("আজ আদায়", "Collected today")}
        iconBg="#FFF7DB"
        iconFg="#B07C00"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
          </svg>
        }
        value={taka(data.today_amount, lang)}
        note={tr(
          `${num(data.today_count, lang)} জন · ${num(data.today_receipts, lang)}টা রশিদ গেছে`,
          `${data.today_count} students · ${data.today_receipts} receipts sent`,
        )}
      />
      <IconStat
        label={tr("বকেয়া", "Dues")}
        iconBg="#FEF0EF"
        iconFg="#D92D20"
        valueColor="#D92D20"
        icon={<b className="text-[17px]">৳</b>}
        value={taka(data.total_due, lang)}
        note={`${tr(`${num(data.due_students, lang)} জন`, `${data.due_students} students`)} · ${remindersOn ? tr("অটো রিমাইন্ডার চালু", "auto reminders on") : tr("অটো রিমাইন্ডার বন্ধ", "auto reminders off")}`}
      />
      <MethodSplit byMethod={data.by_method} />
    </section>
  );
}
