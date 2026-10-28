import clsx from "clsx";

/** Green on/off switch (`.tg`, 38×22). */
export function Switch({ checked, onChange, disabled, label }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative h-[22px] w-[38px] flex-none rounded-[12px] transition-colors disabled:cursor-default disabled:opacity-60",
        checked ? "bg-[#12B76A]" : "bg-[#D0CDE0]",
      )}
    >
      <span className={clsx("absolute top-[3px] size-4 rounded-full bg-white transition-[left]", checked ? "left-[19px]" : "left-[3px]")} />
    </button>
  );
}
