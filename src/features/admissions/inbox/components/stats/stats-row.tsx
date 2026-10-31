import { Check, QrCode, UserRoundPlus } from "lucide-react";
import { IconStat } from "@/components/ui";
import { num, taka } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { AdmissionOverview } from "@/lib/types";

/** নতুন আবেদন · এ মাসে ভর্তি · খালি সিট · QR স্ক্যান */
export function StatsRow({ data: o }: { data: AdmissionOverview | undefined }) {
  const { tr, lang } = useLang();
  const n = (v: number | undefined) => (v == null ? "—" : num(v, lang));
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <IconStat
        icon={<UserRoundPlus className="size-5" />}
        iconBg="#F4EEFF"
        iconFg="#5B21B6"
        label={tr("নতুন আবেদন", "New requests")}
        value={n(o?.pending)}
        valueColor="#5B21B6"
        note={tr("কল করে কনফার্ম করুন", "Call to confirm")}
      />
      <IconStat
        icon={<Check className="size-5" strokeWidth={2.6} />}
        iconBg="#ECFDF3"
        iconFg="#039855"
        label={tr("এ মাসে ভর্তি", "Admitted this month")}
        value={n(o?.admitted_month)}
        valueColor="#039855"
        note={o ? tr(`${taka(o.admission_fees_month, lang)} ভর্তি ফি`, `${taka(o.admission_fees_month, lang)} admission fees`) : null}
      />
      <IconStat
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="5" width="18" height="15" rx="3" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
        }
        iconBg="#FFF7DB"
        iconFg="#B07C00"
        label={tr("খালি সিট", "Free seats")}
        value={n(o?.free_seats)}
        note={o ? tr(`${num(o.seat_batches, lang)}টা ব্যাচে`, `in ${o.seat_batches} batches`) : null}
      />
      <IconStat
        icon={<QrCode className="size-5" />}
        iconBg="#EEF4FF"
        iconFg="#3E63DD"
        label={tr("QR স্ক্যান", "QR scans")}
        value={n(o?.scans)}
        note={tr("সব মিলিয়ে", "In total")}
      />
    </div>
  );
}
