import { TickIcon } from "../../../components/icons";
import { MotionAvatar } from "./motion-avatar";

export type TickerEntry = { letter: string; bg: string; fg: string; name: string };

/**
 * One of three rows that take turns (2s apart, 6s loop): slides in, gets a green tick, slides out.
 * `trailing` is what sits before the tick — a time or an amount.
 */
export function TickerRow({ entry, delay, trailing }: { entry: TickerEntry; delay: number; trailing: React.ReactNode }) {
  const animationDelay = `${delay}s`;
  return (
    <div className="hm-row" style={{ animationDelay }}>
      <MotionAvatar letter={entry.letter} bg={entry.bg} fg={entry.fg} />
      <span className="hm-name">{entry.name}</span>
      {trailing}
      <span className="hm-ok-wrap" style={{ animationDelay }}>
        <span className="hm-ok">
          <TickIcon size={11} strokeWidth={3.4} />
        </span>
      </span>
    </div>
  );
}
