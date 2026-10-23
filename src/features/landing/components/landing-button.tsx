import clsx from "clsx";

const variants = {
  gold: "bg-[#F5B800] text-[#2E1065] shadow-[0_12px_26px_-12px_rgba(245,184,0,.9)] hover:bg-[#FFC61A]",
  ghost: "bg-white text-[#2E1065] shadow-[inset_0_0_0_1.5px_#E4DDF5] hover:shadow-[inset_0_0_0_1.5px_#C9B3FF]",
  purple: "bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] text-white shadow-[0_12px_26px_-12px_rgba(91,33,182,.8)] hover:brightness-110",
  glass: "bg-white/[0.12] text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.3)] hover:bg-white/20",
};

/** The design's `.btn`: 16px radius, bold, icon gap 10px. Size comes from `className`. */
export function LandingButton({
  href,
  variant,
  className,
  children,
}: {
  href: string;
  variant: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={clsx(
        "inline-flex items-center justify-center gap-2.5 rounded-2xl font-bold transition-[background,box-shadow,filter] active:scale-[0.98]",
        variants[variant],
        className ?? "px-[26px] py-4 text-[18px]",
      )}
    >
      {children}
    </a>
  );
}
