import { PageLoader, SegmentTabs, Surface } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Message, MessageKind } from "@/lib/types";
import { MessageListItem } from "./message-list-item";
import { MessageRow } from "./message-row";

export type LogTab = MessageKind | "all";

/** "মেসেজ লগ" with the kind tabs, then a table (tablet up) or a list (phone). */
export function MessageLog({
  tab,
  onTab,
  failed,
  messages,
  loading,
}: {
  tab: LogTab;
  onTab: (t: LogTab) => void;
  failed: number;
  messages: Message[];
  loading: boolean;
}) {
  const { tr, lang } = useLang();
  const th = "px-2 py-[5px] font-medium";
  return (
    <Surface className="flex min-w-0 flex-col px-3.5 pt-3 pb-1">
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <h2 className="m-0 flex-1 text-[16px] font-bold">{tr("মেসেজ লগ", "Message log")}</h2>
        <div className="-mx-3.5 max-w-[calc(100%+28px)] overflow-x-auto px-3.5 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <SegmentTabs<LogTab>
            label={tr("মেসেজের ধরন", "Message kind")}
            value={tab}
            onChange={onTab}
            className="w-max"
            options={[
              { value: "all", label: tr("সব", "All") },
              { value: "attendance", label: tr("হাজিরা", "Attendance") },
              { value: "receipt", label: tr("রশিদ", "Receipts") },
              { value: "reminder", label: tr("বকেয়া", "Dues") },
              { value: "notice", label: tr("নোটিশ", "Notices") },
              { value: "failed", label: `${tr("ব্যর্থ", "Failed")} ${num(failed, lang)}`, danger: true },
            ]}
          />
        </div>
      </div>
      {loading ? (
        <PageLoader />
      ) : messages.length === 0 ? (
        <p className="py-10 text-center text-[14px] text-[#6B6880]">{tr("এখানে কোনো মেসেজ নেই", "No messages here")}</p>
      ) : (
        <>
          <table className="hidden w-full table-fixed border-collapse md:table">
            <colgroup>
              <col className="w-[72px]" />
              <col className="w-[170px]" />
              <col className="w-[96px]" />
              <col />
              <col className="w-[130px]" />
            </colgroup>
            <thead>
              <tr className="text-left text-[12px] text-[#9E9BAD]">
                <th className={th}>{tr("সময়", "Time")}</th>
                <th className={th}>{tr("কাকে", "To")}</th>
                <th className={th}>{tr("ধরন", "Kind")}</th>
                <th className={th}>{tr("মেসেজ", "Message")}</th>
                <th className={`${th} text-right`}>{tr("অবস্থা", "Status")}</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <MessageRow key={m.id} message={m} />
              ))}
            </tbody>
          </table>
          <ul className="m-0 list-none p-0 md:hidden">
            {messages.map((m) => (
              <MessageListItem key={m.id} message={m} />
            ))}
          </ul>
        </>
      )}
    </Surface>
  );
}
