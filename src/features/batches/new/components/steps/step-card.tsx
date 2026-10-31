/** A white step section: tinted icon, "ধাপ ১", the title and a short hint on the right. */
export function StepCard({
  step,
  title,
  hint,
  icon,
  tone,
  children,
  className,
}: {
  step: string;
  title: string;
  hint: string;
  icon: React.ReactNode;
  tone: { bg: string; fg: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[22px] bg-white px-4 py-4 sm:px-5 ${className ?? ""}`}>
      <div className="mb-3.5 flex items-center gap-3">
        <span className="flex size-10 flex-none items-center justify-center rounded-[13px]" style={{ background: tone.bg, color: tone.fg }}>
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[12px] font-bold tracking-[.3px] text-[#8B5CF6]">{step}</p>
          <h2 className="m-0 text-[19px] leading-[1.2] font-bold">{title}</h2>
        </div>
        <span className="hidden text-right text-[12px] text-[#6B6880] sm:block">{hint}</span>
      </div>
      {children}
    </section>
  );
}
