import clsx from "clsx";
import Link from "next/link";

/**
 * White rounded button on the page background (`.btnw`: "এডিট", "Excel", "রিপোর্ট"). `href` makes it a
 * link; `outlined` adds the lavender ring used inside white cards.
 */
export function HeaderButton({
  children,
  onClick,
  href,
  disabled,
  outlined,
  title,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  outlined?: boolean;
  title?: string;
  className?: string;
}) {
  const cls = clsx(
    "flex h-[42px] flex-none items-center justify-center gap-[7px] rounded-[14px] bg-white px-3.5 text-[14px] font-semibold whitespace-nowrap text-[#17161F]",
    outlined && "shadow-[inset_0_0_0_1.5px_#E4DDF5]",
    disabled ? "cursor-default" : "hover:bg-[#FAF9FD] hover:text-[#17161F]",
    className,
  );
  if (href) {
    return (
      <Link href={href} title={title} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title} className={cls}>
      {children}
    </button>
  );
}
