import { HeaderButton, Switch } from "@/components/ui";
import { KindBadge, kindLook } from "@/features/shared/messages/kinds";
import { useLang } from "@/lib/i18n";
import type { Template } from "@/lib/types";
import { templateName, templateWhen } from "../../lib/template-meta";

/** Icon, name and "● চালু · when it goes"; automatic ones get an on/off switch, notice ones a delete. */
export function EditorHead({
  template: t,
  canEdit,
  onToggle,
  onDelete,
}: {
  template: Template;
  canEdit: boolean;
  onToggle: (on: boolean) => void;
  onDelete: () => void;
}) {
  const { tr, lang } = useLang();
  const when = templateWhen(t, lang);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <KindBadge look={kindLook(t.key)} size={44} icon={22} radius={14} />
      <div className="min-w-0 flex-1">
        <h2 className="m-0 text-[20px] font-bold">{templateName(t, lang)}</h2>
        {t.kind === "auto" ? (
          <p className="m-0 text-[13px] font-semibold" style={{ color: t.is_enabled ? "#039855" : "#6B6880" }}>
            ● {t.is_enabled ? tr("চালু", "On") : tr("বন্ধ", "Off")}
            {when && ` · ${when}`}
          </p>
        ) : (
          <p className="m-0 text-[13px] text-[#6B6880]">{tr("নোটিশ পাঠানোর সময় বেছে নেবেন", "Pick it when sending a notice")}</p>
        )}
      </div>
      {t.kind === "auto" ? (
        <label className="flex h-[42px] cursor-pointer items-center gap-2 rounded-[14px] bg-white px-3.5 text-[14px] font-semibold shadow-[inset_0_0_0_1.5px_#E4DDF5]">
          {tr("অটো সেটিং", "Auto send")}
          <Switch checked={t.is_enabled} onChange={onToggle} disabled={!canEdit} label={tr("অটো সেটিং", "Auto send")} />
        </label>
      ) : (
        canEdit && (
          <HeaderButton outlined onClick={onDelete} className="text-[#D92D20] hover:text-[#D92D20]">
            {tr("মুছুন", "Delete")}
          </HeaderButton>
        )
      )}
    </div>
  );
}
