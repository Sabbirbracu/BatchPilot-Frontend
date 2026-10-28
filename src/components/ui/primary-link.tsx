import clsx from "clsx";
import Link from "next/link";

const SIZE = {
  // Header call-to-action ("নতুন ব্যাচ", "স্টুডেন্ট যোগ").
  header: "flex-none gap-2 rounded-[14px] px-4 py-2.5 text-[14px] shadow-[0_6px_16px_-6px_rgba(91,33,182,.55)]",
  // Full-width button inside a card ("ফি নিন" on the profile panel).
  block: "flex-1 justify-center rounded-[12px] py-[9px] text-[13.5px]",
};

/** Purple gradient call-to-action link. */
export function PrimaryLink({
  href,
  children,
  size = "header",
  className,
}: {
  href: string;
  children: React.ReactNode;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] font-bold whitespace-nowrap text-white hover:text-white hover:brightness-110",
        SIZE[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
