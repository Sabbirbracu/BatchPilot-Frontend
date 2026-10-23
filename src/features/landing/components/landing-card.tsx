import clsx from "clsx";

/** The design's `.card`: 26px radius, 28px padding, hairline + soft purple shadow. */
export function LandingCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("rounded-[26px] p-6 sm:p-7", className ?? "bg-white shadow-[0_1px_0_#EEEBF6,0_18px_40px_-28px_rgba(46,16,101,.35)]")}>
      {children}
    </div>
  );
}
