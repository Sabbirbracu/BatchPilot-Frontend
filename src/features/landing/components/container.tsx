import clsx from "clsx";

/** The design's 1200px content column, with phone/tablet gutters. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("mx-auto w-full max-w-[1232px] px-4 sm:px-6 xl:px-4", className)}>{children}</div>;
}
