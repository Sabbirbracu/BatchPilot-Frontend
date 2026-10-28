import clsx from "clsx";
import { type AvatarTone, initials, nameTone } from "@/lib/avatar";

/** Round (or rounded-square) initials avatar in the name's stable colour, unless `tone` overrides it. */
export function LetterAvatar({ name, tone, className, style }: { name: string; tone?: AvatarTone; className?: string; style?: React.CSSProperties }) {
  const t = tone ?? nameTone(name);
  return (
    <span
      aria-hidden
      className={clsx("flex flex-none items-center justify-center font-bold", className ?? "size-8 rounded-full text-[13px]")}
      style={{ background: t.bg, color: t.fg, ...style }}
    >
      {initials(name)}
    </span>
  );
}
