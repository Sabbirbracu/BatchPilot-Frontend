import { Switch } from "@/components/ui";
import { KindBadge, type KindLook } from "@/features/shared/messages/kinds";

/** One automatic SMS: icon, name, when it goes, on/off. */
export function RuleRow({
  look,
  name,
  when,
  on,
  onChange,
  disabled,
}: {
  look: KindLook;
  name: string;
  when: string;
  on: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 border-t border-[#F3F1FA] py-2 first-of-type:border-t-0">
      <KindBadge look={look} size={32} icon={16} radius={10} />
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-[13.5px] font-semibold">{name}</p>
        <p className="m-0 truncate text-[11.5px] text-[#6B6880]">{when}</p>
      </div>
      <Switch checked={on} onChange={onChange} disabled={disabled} label={name} />
    </div>
  );
}
