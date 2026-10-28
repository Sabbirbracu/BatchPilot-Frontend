import clsx from "clsx";

export type SegmentOption<T extends string> = { value: T; label: React.ReactNode; disabled?: boolean; danger?: boolean; title?: string };

/** Grey track with a white "on" pill (`.seg`). `fill` stretches options to equal widths. */
export function SegmentTabs<T extends string>({
  value,
  onChange,
  options,
  fill,
  label,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: SegmentOption<T>[];
  fill?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={clsx("flex rounded-[12px] bg-[#F3F1FA] p-[3px] text-[13px]", className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={on}
            disabled={o.disabled}
            title={o.title}
            onClick={() => onChange(o.value)}
            className={clsx(
              "rounded-[10px] px-3 py-1.5 whitespace-nowrap disabled:cursor-default disabled:opacity-50",
              fill && "flex-1 text-center",
              on ? "bg-white font-bold text-[#5B21B6] shadow-[0_1px_2px_rgba(23,22,31,.08)]" : o.danger ? "text-[#D92D20]" : "text-[#6B6880]",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
