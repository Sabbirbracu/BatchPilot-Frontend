import clsx from "clsx";
import { Eyebrow } from "./eyebrow";

/** Eyebrow pill + big heading (+ optional lead), as every section opens with. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  center,
  dark,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx(center && "mx-auto text-center", className)}>
      <Eyebrow className={dark ? "bg-white/[0.08] text-[#FFD75E]" : undefined}>{eyebrow}</Eyebrow>
      <h2
        className={clsx(
          "mt-3.5 text-[30px] leading-[1.25] font-bold tracking-[-0.3px] sm:text-[38px] lg:text-[44px]",
          dark ? "text-white" : "text-[#17161F]",
        )}
      >
        {title}
      </h2>
      {lead && <p className="mt-3.5 text-[17px] leading-[1.6] text-[#5E5B6E] sm:text-[20px]">{lead}</p>}
    </div>
  );
}
