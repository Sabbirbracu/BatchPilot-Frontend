import clsx from "clsx";

/**
 * Rounded filter button on a white panel. Active is lavender/purple; `danger` paints the idle
 * label red (used for "বকেয়া আছে" / "ফি বাকি").
 */
export function FilterChip({
  active,
  danger,
  onClick,
  children,
  className,
}: {
  active: boolean;
  danger?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={clsx(
        "flex-none rounded-[11px] px-3 text-[13px] whitespace-nowrap",
        active ? "bg-[#F4EEFF] font-bold text-[#5B21B6]" : clsx("bg-[#F7F5FC] hover:bg-[#EFEBF8]", danger ? "font-semibold text-[#D92D20]" : "text-[#6B6880]"),
        className ?? "py-[5px]",
      )}
    >
      {children}
    </button>
  );
}
