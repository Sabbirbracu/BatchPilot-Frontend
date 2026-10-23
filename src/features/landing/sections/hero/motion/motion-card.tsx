import clsx from "clsx";

/** A floating module card: a labelled tab on top, the live content, and an optional caption under it. */
export function MotionCard({
  left,
  top,
  label,
  labelIcon,
  labelColor,
  under,
  delayed,
  bodyClassName,
  children,
}: {
  left: number;
  top: number;
  label: string;
  labelIcon: React.ReactNode;
  labelColor: string;
  under?: React.ReactNode;
  /** Half the cards bob out of phase with the others. */
  delayed?: boolean;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="hm-card" style={{ left, top, animationDelay: delayed ? "-3s" : undefined }}>
      <span className="hm-label">
        <span className="inline-flex" style={{ color: labelColor }}>
          {labelIcon}
        </span>
        {label}
      </span>
      <div className={clsx("hm-card-body", bodyClassName)}>{children}</div>
      {under && <span className="hm-under">{under}</span>}
    </div>
  );
}
