import clsx from "clsx";
import { useLang } from "@/lib/i18n";

/** Chips for families with more than one child; "সবাই" shows everyone. */
export function ChildSwitcher({ names, value, onChange }: { names: { key: string; name: string }[]; value: string | null; onChange: (k: string | null) => void }) {
  const { tr } = useLang();
  if (names.length < 2) return null;
  const chips = [{ key: null, name: tr("সবাই", "All") }, ...names];
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {chips.map((c) => (
        <button
          key={c.key ?? "all"}
          type="button"
          aria-pressed={value === c.key}
          onClick={() => onChange(c.key)}
          className={clsx(
            "flex-none rounded-full px-4 py-2 text-[13.5px] font-bold",
            value === c.key ? "bg-[#5B21B6] text-white" : "bg-white text-[#4A4760] shadow-[inset_0_0_0_1.5px_#E4DDF5]",
          )}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
