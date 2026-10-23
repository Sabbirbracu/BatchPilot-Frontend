import Link from "next/link";

export function HeaderIconLink({ href, label, dot, children }: { href: string; label: string; dot?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-card text-ink shadow-soft transition-colors hover:text-purple [&>svg]:size-[18px]"
    >
      {children}
      {dot && <span className="absolute top-2 right-2.5 size-2 rounded-full bg-gold ring-2 ring-card" />}
    </Link>
  );
}
