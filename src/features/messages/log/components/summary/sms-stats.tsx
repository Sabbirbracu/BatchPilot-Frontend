import { IconStat } from "@/components/ui";
import { AlertIcon, CheckIcon, ClockIcon, SendIcon } from "@/features/shared/messages/icons";
import { digits, monthCase, monthLabel, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { MessageOverview } from "@/lib/types";

/** Sent this month · delivered share · waiting in queue · failed (the last one opens the failed tab). */
export function SmsStats({ data, onFailed }: { data: MessageOverview; onFailed: () => void }) {
  const { tr, lang } = useLang();
  const month = monthLabel(data.month, lang);
  const share = data.sent ? Math.round((data.reached / data.sent) * 1000) / 10 : null;
  return (
    <section className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      <IconStat
        label={lang === "bn" ? `${monthCase(month, "in")} পাঠানো` : `Sent in ${month}`}
        iconBg="#F4EEFF"
        iconFg="#5B21B6"
        icon={<SendIcon size={18} />}
        value={num(data.sent, lang)}
        note={tr(`অভিভাবক ${num(data.guardians, lang)} জন`, `${data.guardians} guardians`)}
      />
      <IconStat
        label={tr("পৌঁছেছে", "Delivered")}
        iconBg="#ECFDF3"
        iconFg="#039855"
        valueColor="#039855"
        icon={<CheckIcon size={18} />}
        value={share == null ? "—" : `${digits(share, lang)}%`}
        note={tr(`${num(data.reached, lang)}টা`, `${data.reached}`)}
      />
      <IconStat
        label={tr("সারিতে আছে", "In queue")}
        iconBg="#FFF7DB"
        iconFg="#B07C00"
        valueColor="#B07C00"
        icon={<ClockIcon size={18} />}
        value={num(data.queued, lang)}
        note={data.gateway_connected ? tr("শীঘ্রই যাবে", "going out shortly") : tr("গেটওয়ে যুক্ত হলে যাবে", "go out once a gateway is connected")}
      />
      <IconStat
        label={tr("ব্যর্থ", "Failed")}
        iconBg="#FEF0EF"
        iconFg="#D92D20"
        valueColor="#D92D20"
        icon={<AlertIcon size={18} />}
        value={num(data.failed, lang)}
        note={data.failed ? tr("ভুল নম্বর · ঠিক করুন", "wrong numbers · fix them") : tr("সব ঠিক আছে", "all good")}
        onClick={data.failed ? onFailed : undefined}
      />
    </section>
  );
}
