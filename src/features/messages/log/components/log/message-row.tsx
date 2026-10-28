import { useLang } from "@/lib/i18n";
import type { Message } from "@/lib/types";
import { recipient, whenLabel } from "../../lib/message-meta";
import { KindPill } from "./kind-pill";
import { StatusPill } from "./status-pill";

/** Table row: time, who, kind, the text (one line), status. */
export function MessageRow({ message: m }: { message: Message }) {
  const { lang } = useLang();
  const who = recipient(m, lang);
  return (
    <tr className="border-t border-[#F3F1FA]">
      <td className="num p-2 text-[12.5px] whitespace-nowrap text-[#6B6880]">{whenLabel(m.created_at, lang)}</td>
      <td className="p-2">
        <p className="m-0 truncate text-[13.5px] font-semibold">{who.name}</p>
        <p className="m-0 truncate text-[11.5px] text-[#6B6880]">{who.sub}</p>
      </td>
      <td className="p-2">
        <KindPill templateKey={m.template_key} />
      </td>
      <td className="max-w-[300px] p-2 text-[12.5px] text-[#3B3850]">
        <div className="truncate" title={m.body}>
          {m.body}
        </div>
      </td>
      <td className="p-2 text-right">
        <StatusPill status={m.status} />
      </td>
    </tr>
  );
}
