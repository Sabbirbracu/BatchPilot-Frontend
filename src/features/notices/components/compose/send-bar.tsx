import { HeaderButton, PrimaryButton } from "@/components/ui";
import { SendIcon } from "@/features/shared/messages/icons";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** Dashed footer: SMS cost, "save as template" and the send button with the head count. */
export function SendBar({
  guardians,
  parts,
  scheduled,
  canSaveTemplate,
  onSaveTemplate,
  onSend,
  sending,
  disabled,
}: {
  guardians: number;
  parts: number;
  scheduled: boolean;
  canSaveTemplate: boolean;
  onSaveTemplate: () => void;
  onSend: () => void;
  sending: boolean;
  disabled: boolean;
}) {
  const { tr, lang } = useLang();
  return (
    <div className="mt-auto flex flex-wrap items-center gap-3.5 border-t border-dashed border-[#E4DDF5] pt-3.5">
      <div className="min-w-[160px] flex-1">
        <p className="m-0 text-[12.5px] text-[#6B6880]">{tr("খরচ হবে", "Will use")}</p>
        <p className="num m-0 text-[22px] font-extrabold">
          {num(guardians * parts, lang)} SMS{" "}
          <span className="text-[13px] font-medium text-[#6B6880]">
            · {tr(`${num(guardians, lang)} জন × ${num(parts, lang)}টা`, `${guardians} × ${parts}`)}
          </span>
        </p>
      </div>
      {canSaveTemplate && (
        <HeaderButton outlined onClick={onSaveTemplate} disabled={disabled}>
          {tr("টেমপ্লেট হিসেবে রাখুন", "Save as template")}
        </HeaderButton>
      )}
      <PrimaryButton size="lg" onClick={onSend} loading={sending} disabled={disabled || guardians === 0} className="max-sm:w-full">
        {!sending && <SendIcon size={18} />}
        {scheduled
          ? tr(`${num(guardians, lang)} জনের জন্য রাখুন`, `Schedule for ${guardians}`)
          : tr(`${num(guardians, lang)} জনকে পাঠান`, `Send to ${guardians}`)}
      </PrimaryButton>
    </div>
  );
}
