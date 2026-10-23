import { BellIcon } from "../../../components/icons";
import { MotionAvatar } from "./motion-avatar";
import { MotionCard } from "./motion-card";

const DUE: { letter: string; bg: string; fg: string; delay: number }[] = [
  { letter: "আ", bg: "#FFD75E", fg: "#3B1782", delay: 0.3 },
  { letter: "র", bg: "#C9B3FF", fg: "#3B1782", delay: 0.65 },
  { letter: "ম", bg: "#BFF0D6", fg: "#05603A", delay: 1.0 },
  { letter: "জ", bg: "#FECDCA", fg: "#B42318", delay: 1.35 },
  { letter: "ফ", bg: "#F4EEFF", fg: "#5B21B6", delay: 1.7 },
];

/** Bell rings, the students who owe pop in, the send bar fills, then "✓ sent to 54". */
export function ReminderCard() {
  return (
    <MotionCard
      left={395}
      top={425}
      label="বকেয়া রিমাইন্ডার"
      labelColor="#D92D20"
      labelIcon={<BellIcon size={12} strokeWidth={2.4} />}
      bodyClassName="flex items-center gap-2.5"
      under={
        <>
          <span className="hm-sending">রিমাইন্ডার পাঠানো হচ্ছে…</span>
          <span className="hm-done">✓ ৫৪ জনকে গেছে</span>
        </>
      }
    >
      <span className="hm-bell">
        <BellIcon size={18} />
      </span>
      <div className="flex-1">
        <div className="flex items-center">
          {DUE.map((d, i) => (
            <span key={d.letter} className="hm-pop" style={{ animationDelay: `${d.delay}s`, marginLeft: i === 0 ? 0 : -7 }}>
              <MotionAvatar letter={d.letter} bg={d.bg} fg={d.fg} />
            </span>
          ))}
          <span className="hm-pop text-[11px] font-bold text-[#6B6880]" style={{ animationDelay: "2.1s", marginLeft: 4 }}>
            +৪৯
          </span>
        </div>
        <div className="hm-bar mt-[7px]">
          <i />
        </div>
      </div>
    </MotionCard>
  );
}
