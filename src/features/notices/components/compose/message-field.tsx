import { SmsEditor, type SmsEditorHandle } from "@/features/shared/messages/sms-editor";
import { smsParts, VARS } from "@/features/shared/messages/vars";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";

const INSERTS = ["student", "batch", "date"];

/** "মেসেজ" with quick inserts, the editor, and the length / SMS-per-guardian line. */
export function MessageField({
  value,
  onChange,
  measured,
  editorRef,
}: {
  value: string;
  onChange: (v: string) => void;
  measured: string; // the text as one guardian would get it, for counting
  editorRef: React.RefObject<SmsEditorHandle | null>;
}) {
  const { tr, lang } = useLang();
  const { chars, parts } = smsParts(measured);
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <p className="m-0 flex-1 text-[13px] font-bold">{tr("মেসেজ", "Message")}</p>
        <span className="text-[12px] text-[#6B6880]">{tr("ঢোকান:", "Insert:")}</span>
        {INSERTS.map((k) => (
          <button
            key={k}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.insertVar(k)}
            className="rounded-[6px] bg-[#F4EEFF] px-[5px] text-[12px] font-bold text-[#5B21B6] hover:bg-[#EBE1FF]"
          >
            {`{${VARS[k].long ?? VARS[k].bn}}`}
          </button>
        ))}
      </div>
      <SmsEditor
        ref={editorRef}
        value={value}
        onChange={onChange}
        look="notice"
        braces
        label={tr("নোটিশের লেখা", "Notice text")}
        placeholder={tr("যেমন: আগামী শনিবার ক্লাস বন্ধ থাকবে।", "e.g. No class this Saturday.")}
      />
      <div className="mt-1.5 flex flex-wrap justify-between gap-2 text-[12px] text-[#6B6880]">
        <span>{tr("বাংলায় ১টা SMS = ৭০ অক্ষর", "One Bangla SMS = 70 characters")}</span>
        <span>
          <b className="text-[#17161F]">{num(chars, lang)}</b> {tr("অক্ষর", "chars")} ·{" "}
          <b style={{ color: parts > 1 ? "#B07C00" : "#039855" }}>{tr(`${num(parts, lang)}টা SMS`, `${parts} SMS`)}</b> {tr("প্রতি জন", "each")}
        </span>
      </div>
    </div>
  );
}
