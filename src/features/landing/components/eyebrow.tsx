import clsx from "clsx";

export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-[30px] px-3.5 py-1.5 text-[14px] font-semibold sm:text-[15px]",
        className ?? "bg-[#F4EEFF] text-[#5B21B6]",
      )}
    >
      {children}
    </span>
  );
}
