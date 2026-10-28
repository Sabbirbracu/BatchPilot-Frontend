import { Pill } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { STATUS } from "../../lib/message-meta";

/** ◷ সারিতে / ✓ পৌঁছেছে / ✕ ব্যর্থ … */
export function StatusPill({ status }: { status: string }) {
  const { lang } = useLang();
  const s = STATUS[status] ?? STATUS.queued;
  return (
    <Pill bg={s.bg} fg={s.fg}>
      {lang === "bn" ? s.bn : s.en}
    </Pill>
  );
}
