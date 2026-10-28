import { digits, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { smsParts } from "./vars";

/** Bar + "৬০/৭০ অক্ষর · ১টা SMS": green within one SMS, gold for two, red beyond. */
export function CharMeter({ text }: { text: string }) {
  const { tr, lang } = useLang();
  const { chars, parts, perSms } = smsParts(text);
  const color = parts === 1 ? "#12B76A" : parts === 2 ? "#F5B800" : "#E5484D";
  const ink = parts === 1 ? "#039855" : parts === 2 ? "#B07C00" : "#D92D20";
  const count = parts === 1 ? `${digits(chars, lang)}/${digits(perSms, lang)}` : num(chars, lang);
  return (
    <div className="mt-2.5 flex items-center gap-2.5">
      <div className="h-1.5 flex-1 rounded-[4px] bg-[#F1EEF8]">
        <div className="h-1.5 rounded-[4px]" style={{ width: `${Math.min(100, (chars / (perSms * Math.max(1, parts))) * 100)}%`, background: color }} />
      </div>
      <span className="text-[12.5px] font-semibold whitespace-nowrap" style={{ color: ink }}>
        {tr(`${count} অক্ষর · ${num(parts, lang)}টা SMS`, `${count} chars · ${parts} SMS`)}
      </span>
    </div>
  );
}
