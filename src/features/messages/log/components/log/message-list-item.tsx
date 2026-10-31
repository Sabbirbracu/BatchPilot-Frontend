import { useLang } from "@/lib/i18n";
import type { Message } from "@/lib/types";
import { recipient, whenLabel } from "../../lib/message-meta";
import { KindPill } from "@/features/shared/messages/kind-pill";
import { SmsStatusPill } from "@/features/shared/messages/sms-status-pill";

/** Phone version of a log row. */
export function MessageListItem({ message: m }: { message: Message }) {
  const { lang } = useLang();
  const who = recipient(m, lang);
  return (
    <li className="border-t border-[#F3F1FA] py-2.5 first:border-t-0">
      <div className="flex items-center gap-2">
        <p className="m-0 min-w-0 flex-1 truncate text-[13.5px] font-semibold">
          {who.name} <span className="font-normal text-[#6B6880]">· {who.sub}</span>
        </p>
        <span className="num text-[12px] text-[#6B6880]">{whenLabel(m.created_at, lang)}</span>
      </div>
      <p className="m-0 my-1 line-clamp-2 text-[12.5px] text-[#3B3850]">{m.body}</p>
      <div className="flex items-center justify-between gap-2">
        <KindPill templateKey={m.template_key} />
        <SmsStatusPill status={m.status} />
      </div>
    </li>
  );
}
