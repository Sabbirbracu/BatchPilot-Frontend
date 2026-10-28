import clsx from "clsx";

const LOOK = {
  page: "rounded-[14px] bg-white px-3.5 py-[9px] text-[14px]", // on the page background, in headers
  panel: "rounded-[12px] bg-[#F7F5FC] px-3 py-2 text-[14px]", // inside a white panel
  compact: "rounded-[11px] bg-[#F7F5FC] px-3 py-1.5 text-[13px]", // small, next to filter chips
};

/** Search input with a magnifier icon. */
export function SearchField({
  value,
  onChange,
  placeholder,
  look = "page",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  look?: keyof typeof LOOK;
  className?: string;
}) {
  const icon = look === "compact" ? 15 : 16;
  return (
    <label className={clsx("flex items-center gap-2 text-[#9E9BAD]", LOOK[look], className)}>
      <svg width={icon} height={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[#17161F] outline-none placeholder:text-[#9E9BAD]"
      />
    </label>
  );
}
