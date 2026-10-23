import { FingerprintIcon } from "../../../components/icons";
import { MotionCard } from "./motion-card";
import { TickerRow, type TickerEntry } from "./ticker-row";

const SCANS: (TickerEntry & { time: string })[] = [
  { letter: "ত", bg: "#FFD75E", fg: "#3B1782", name: "তানিয়া", time: "১০:০৪" },
  { letter: "স", bg: "#C9B3FF", fg: "#3B1782", name: "সাকিব", time: "১০:০৫" },
  { letter: "ন", bg: "#BFF0D6", fg: "#05603A", name: "নুসরাত", time: "১০:০৬" },
];

/** Fingerprint being scanned while students check in one after another. */
export function AttendanceCard() {
  return (
    <MotionCard
      left={5}
      top={61}
      label="হাজিরা"
      labelColor="#039855"
      labelIcon={<FingerprintIcon size={12} strokeWidth={2.4} />}
      bodyClassName="flex items-center gap-2.5"
    >
      <div className="hm-fp">
        <FingerprintIcon size={22} strokeWidth={1.9} />
        <i className="hm-scan" />
      </div>
      <div className="relative h-[30px] flex-1">
        {SCANS.map((s, i) => (
          <TickerRow key={s.name} entry={s} delay={i * 2} trailing={<span className="hm-time">{s.time}</span>} />
        ))}
      </div>
    </MotionCard>
  );
}
