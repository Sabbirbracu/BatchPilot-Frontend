import clsx from "clsx";
import { KindBadge, kindLook } from "@/features/shared/messages/kinds";
import { toDisplay } from "@/features/shared/messages/vars";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Template } from "@/lib/types";
import { templateName } from "../../lib/template-meta";

/** One template in the list: icon, name (+ green dot when on), first line of the text, SMS parts. */
export function TemplateListItem({ template: t, selected, onSelect }: { template: Template; selected: boolean; onSelect: () => void }) {
  const { tr, lang } = useLang();
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected}
      className={clsx(
        "flex w-full items-center gap-[11px] rounded-[14px] px-3 py-2.5 text-left text-[#17161F]",
        selected ? "bg-[#F4EEFF] shadow-[inset_3px_0_0_#5B21B6]" : "hover:bg-[#FAF9FD]",
      )}
    >
      <KindBadge look={kindLook(t.key)} />
      <div className="min-w-0 flex-1">
        <p className={clsx("m-0 flex items-center gap-1.5 text-[14px]", selected ? "font-bold" : "font-semibold")}>
          <span className="truncate">{templateName(t, lang)}</span>
          {t.kind === "auto" && t.is_enabled && <span className="size-[7px] flex-none rounded-full bg-[#12B76A]" title={tr("চালু", "On")} />}
        </p>
        <p className="m-0 truncate text-[12px] text-[#9E9BAD]">{toDisplay(t.body_bn, lang)}</p>
      </div>
      <span className="flex-none text-[11.5px] text-[#9E9BAD]">{tr(`${num(t.segments, lang)} SMS`, `${t.segments} SMS`)}</span>
    </button>
  );
}
