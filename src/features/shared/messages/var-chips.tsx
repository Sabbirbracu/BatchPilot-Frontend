import { useLang } from "@/lib/i18n";
import type { SmsVar } from "./vars";

/** "+ নাম", "+ ব্যাচ" … buttons that drop a placeholder into the editor at the caret. */
export function VarChips({ vars, onPick, disabled }: { vars: SmsVar[]; onPick: (key: string) => void; disabled?: boolean }) {
  const { lang } = useLang();
  return (
    <div className="flex flex-wrap gap-[7px]">
      {vars.map((v) => (
        <button
          key={v.key}
          type="button"
          disabled={disabled}
          // Keep the editor's caret: insert on mousedown before focus moves.
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onPick(v.key)}
          className="inline-flex items-center gap-1 rounded-[10px] bg-white px-[11px] py-1.5 text-[13px] font-semibold text-[#5B21B6] shadow-[inset_0_0_0_1.5px_#E4DDF5] hover:bg-[#F4EEFF] disabled:opacity-50"
        >
          + {lang === "bn" ? v.bn : v.en}
        </button>
      ))}
    </div>
  );
}
