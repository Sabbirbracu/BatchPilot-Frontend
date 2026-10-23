
export function MotionAvatar({ letter, bg, fg }: { letter: string; bg: string; fg: string }) {
  return (
    <span className="hm-avatar" style={{ background: bg, color: fg }}>
      {letter}
    </span>
  );
}
