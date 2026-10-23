import clsx from "clsx";
import Link from "next/link";

const tones = {
  red: "bg-due-soft text-due hover:bg-due/10",
  gold: "bg-gold-cream text-gold-ink hover:bg-gold/20",
  purple: "bg-lavender text-purple hover:bg-purple/10",
};

export function AttentionChip({ href, tone, children }: { href?: string; tone: keyof typeof tones; children: React.ReactNode }) {
  const className = clsx(
    "inline-flex h-9 max-w-full items-center rounded-full px-3.5 text-[13px] font-semibold transition-colors xl:h-10 xl:text-sm",
    tones[tone],
  );
  return href ? (
    <Link href={href} className={className}>
      <span className="truncate">{children}</span>
    </Link>
  ) : (
    <span className={className}>
      <span className="truncate">{children}</span>
    </span>
  );
}
