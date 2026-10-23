import clsx from "clsx";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// Tap targets are at least 48px (Blueprint UI rules: cheap tablets, big thumbs).

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "md" | "lg" | "sm";
  loading?: boolean;
  block?: boolean;
};

const variants = {
  primary: "bg-purple text-white hover:bg-purple-deep active:bg-purple-deep disabled:bg-purple/50",
  secondary: "bg-lavender text-purple-deep hover:bg-[#ebe1ff] disabled:opacity-60",
  outline: "border border-line bg-card text-ink hover:bg-canvas disabled:opacity-60",
  ghost: "text-purple hover:bg-lavender disabled:opacity-60",
  danger: "bg-due text-white hover:bg-[#be123c] disabled:opacity-60",
};
const sizes = { sm: "h-9 px-3 text-sm", md: "h-12 px-4", lg: "h-14 px-5 text-lg" };

export function Button({ variant = "primary", size = "md", loading, block, className, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        block && "w-full",
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors",
        variants[variant ?? "primary"],
        sizes[size ?? "md"],
        className,
      )}
    >
      {children}
    </Link>
  );
}
