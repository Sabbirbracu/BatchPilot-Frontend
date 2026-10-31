import clsx from "clsx";
import { Loader2 } from "lucide-react";

const SIZE = {
  md: "rounded-[14px] px-4 py-2.5 text-[14px]",
  lg: "rounded-[16px] px-[22px] py-[13px] text-[15px]",
  xl: "rounded-[16px] px-[26px] py-3.5 text-[16px]",
};

/** Purple gradient button (`.btnp`). */
export function PrimaryButton({
  children,
  onClick,
  type = "button",
  form,
  disabled,
  loading,
  size = "md",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  form?: string; // submit a form elsewhere on the page (header buttons)
  disabled?: boolean;
  loading?: boolean;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] font-bold whitespace-nowrap text-white shadow-[0_6px_16px_-6px_rgba(91,33,182,.55)] hover:brightness-110 disabled:opacity-60 disabled:hover:brightness-100",
        SIZE[size],
        className,
      )}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}
