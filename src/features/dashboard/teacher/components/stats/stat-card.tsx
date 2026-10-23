import clsx from "clsx";
import Link from "next/link";
import { IconTile, type Tone } from "@/components/ui";

/**
 * A KPI tile: tinted icon + label, one big number, and a footer line or bar.
 * Phones stack the icon above the label; wider screens put them side by side.
 */
export function StatCard({
  href,
  onClick,
  icon,
  tone,
  label,
  value,
  valueClassName,
  footer,
  className,
}: {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  tone: Tone;
  label: string;
  value: string;
  valueClassName?: string;
  footer?: React.ReactNode;
  className?: string;
}) {
  const cls = clsx(
    "flex min-w-0 flex-col rounded-[22px] p-4 text-left shadow-soft transition-transform hover:-translate-y-0.5 active:scale-[0.98] xl:p-5",
    className ?? "bg-card",
  );
  const body = (
    <>
      <div className="flex min-w-0 flex-col gap-2.5 md:flex-row md:items-center md:gap-3">
        <IconTile tone={tone} size="md" className="md:size-9 md:rounded-xl md:[&>svg]:size-[18px]">
          {icon}
        </IconTile>
        <span className="truncate text-[13px] text-muted md:text-sm">{label}</span>
      </div>
      <div className={clsx("num mt-1.5 truncate text-[24px] leading-tight font-bold md:mt-3 xl:text-[26px]", valueClassName ?? "text-ink")}>{value}</div>
      {footer && <div className="mt-auto pt-2 text-xs">{footer}</div>}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {body}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {body}
    </button>
  );
}
