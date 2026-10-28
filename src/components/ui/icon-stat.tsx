import clsx from "clsx";

const LOOK = {
  // Students page tiles: a touch smaller, no third line.
  compact: { box: "gap-[11px] rounded-[18px] px-3.5 py-[11px]", icon: "size-9" },
  // Fee and SMS pages.
  regular: { box: "gap-[11px] rounded-[22px] px-3.5 py-3", icon: "size-[38px]" },
};

/** White tile: tinted icon square, label, big number, optional note. A button when it filters something. */
export function IconStat({
  icon,
  iconBg,
  iconFg,
  label,
  value,
  valueColor,
  note,
  look = "regular",
  onClick,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconFg: string;
  label: string;
  value: React.ReactNode;
  valueColor?: string;
  note?: React.ReactNode;
  look?: keyof typeof LOOK;
  onClick?: () => void;
}) {
  const l = LOOK[look];
  const body = (
    <>
      <span className={clsx("flex flex-none items-center justify-center rounded-[12px] font-bold", l.icon)} style={{ background: iconBg, color: iconFg }}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="m-0 truncate text-[12px] text-[#6B6880]">{label}</p>
        <p className="num m-0 truncate text-[19px] leading-[1.25] font-bold" style={{ color: valueColor ?? "#17161F" }}>
          {value}
        </p>
        {note != null && <p className="m-0 truncate text-[11.5px] text-[#6B6880]">{note}</p>}
      </div>
    </>
  );
  const cls = clsx("flex min-w-0 items-center bg-white text-left text-[#17161F]", l.box);
  return onClick ? (
    <button type="button" onClick={onClick} className={clsx(cls, "hover:bg-[#FAF9FD]")}>
      {body}
    </button>
  ) : (
    <div className={cls}>{body}</div>
  );
}
