import { digits, monthCase, monthLabel, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";


const R = 50;
const C = 2 * Math.PI * R;

/** Purple card: gold progress ring (collected vs billed) and the month's total. */
export function CollectionCard({ month, collected, billed }: { month: string; collected: number; billed: number }) {
  const { tr, lang } = useLang();
  const pct = billed ? Math.min(100, Math.round((collected / billed) * 100)) : 0;
  const name = monthLabel(month, lang);
  return (
    <div className="flex items-center gap-3.5 rounded-[22px] bg-[linear-gradient(135deg,#6D28D9,#3B1782)] px-4 py-[13px] text-white">
      <div className="relative size-[62px] flex-none">
        <svg viewBox="0 0 120 120" width="62" height="62" role="img" aria-label={tr(`লক্ষ্যের ${digits(pct, lang)}% আদায়`, `${pct}% of target collected`)}>
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="14" />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="#F5B800"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * C} ${C}`}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <span className="num absolute inset-0 flex items-center justify-center text-[15px] font-bold">{digits(pct, lang)}%</span>
      </div>
      <div className="min-w-0">
        <p className="m-0 text-[12px] text-[#DCCFFB]">{lang === "bn" ? `${monthCase(name, "in")} আদায়` : `Collected in ${name}`}</p>
        <p className="num m-0 truncate text-[23px] font-bold">{taka(collected, lang)}</p>
        <p className="m-0 text-[12px] text-[#DCCFFB]">
          {tr("লক্ষ্য", "Target")} {taka(billed, lang)}
        </p>
      </div>
    </div>
  );
}
