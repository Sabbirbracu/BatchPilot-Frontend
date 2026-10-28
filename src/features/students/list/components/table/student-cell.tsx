import clsx from "clsx";
import { LetterAvatar } from "@/components/ui";
import { phoneLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";
import { avatarTone, contactPhone } from "../../lib/student-meta";

/** Avatar, name (+ "নতুন" badge) and the guardian's number. */
export function StudentCell({ student: s, isNew, selected, avatarClass }: { student: Student; isNew: boolean; selected?: boolean; avatarClass?: string }) {
  const { tr } = useLang();
  const phone = contactPhone(s);
  return (
    <div className="flex min-w-0 items-center gap-[9px]">
      <LetterAvatar name={s.name} tone={avatarTone(s)} className={clsx("rounded-full text-[13px]", avatarClass ?? "size-[34px]")} />
      <div className="min-w-0">
        <p className={clsx("m-0 truncate text-[14px] font-semibold", selected && "xl:font-bold")}>
          {s.name}
          {isNew && (
            <span className="ml-1.5 rounded-[7px] bg-[#12B76A] px-1.5 py-px align-[1px] text-[10.5px] font-bold text-white">{tr("নতুন", "New")}</span>
          )}
        </p>
        {phone && <p className="num m-0 text-[11px] text-[#9E9BAD]">{phoneLabel(phone)}</p>}
      </div>
    </div>
  );
}
