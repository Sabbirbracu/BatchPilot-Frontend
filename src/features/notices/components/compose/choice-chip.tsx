import clsx from "clsx";

/** Pick-one-or-many chip on the composer ("✓ SSC গণিত A"). */
export function ChoiceChip({ on, onClick, children, muted }: { on: boolean; onClick: () => void; children: React.ReactNode; muted?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={clsx(
        "rounded-[11px] px-3 py-[7px] text-[13px] whitespace-nowrap",
        on ? "bg-[#F4EEFF] font-bold text-[#5B21B6] shadow-[inset_0_0_0_2px_#5B21B6]" : clsx("bg-[#F7F5FC] text-[#6B6880] hover:bg-[#EFEBF8]", !muted && "font-medium"),
      )}
    >
      {on && "✓ "}
      {children}
    </button>
  );
}
