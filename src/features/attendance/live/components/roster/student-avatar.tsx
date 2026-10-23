import clsx from "clsx";
import type { StudentMark } from "../../types";
import { avatarTone, initials } from "../../lib/marks";

export function StudentAvatar({ mark, className }: { mark: StudentMark; className?: string }) {
  const t = avatarTone(mark);
  return (
    <span
      aria-hidden
      className={clsx("flex flex-none items-center justify-center rounded-full font-bold", className)}
      style={{ background: t.bg, color: t.fg }}
    >
      {mark.initial ?? initials(mark.name)}
    </span>
  );
}
