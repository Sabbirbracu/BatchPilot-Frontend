import { useNow } from "@/lib/clock";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** "সিট ধরা ২ দিন" / "৫ ঘণ্টা বাকি" — how long a pending request keeps its seat. */
export function HoldLeft({ until }: { until: string }) {
  const { tr, lang } = useLang();
  const now = useNow();
  if (now == null) return null;
  const hours = (new Date(until).getTime() - now) / 3_600_000;
  if (hours <= 0) return <span className="font-bold text-[#D92D20]">{tr("সময় শেষ", "Hold expired")}</span>;
  if (hours < 24) return <span className="font-bold text-[#B54708]">{tr(`${num(Math.ceil(hours), lang)} ঘণ্টা বাকি`, `${Math.ceil(hours)} h left`)}</span>;
  const days = Math.floor(hours / 24);
  return <span className="text-[#039855]">{tr(`সিট ধরা আছে আরও ${num(days, lang)} দিন`, `Seat held ${days} more day${days > 1 ? "s" : ""}`)}</span>;
}
