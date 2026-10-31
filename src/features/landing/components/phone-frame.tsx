import clsx from "clsx";

/** A dark phone outline around a mini screen, for the admission and family-app mockups. */
export function PhoneFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("relative w-[280px] max-w-full rounded-[40px] bg-[#1E1B2E] p-2.5 shadow-[0_40px_70px_-30px_rgba(46,16,101,.55)]", className)}>
      <span aria-hidden className="absolute top-[18px] left-1/2 h-[6px] w-[70px] -translate-x-1/2 rounded-full bg-[#33304A]" />
      <div className="overflow-hidden rounded-[32px] bg-[#F6F4FB] px-3 pt-8 pb-4">{children}</div>
    </div>
  );
}
