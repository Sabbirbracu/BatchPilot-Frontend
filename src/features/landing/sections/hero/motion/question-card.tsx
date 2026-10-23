import clsx from "clsx";
import { SparkleIcon } from "../../../components/icons";
import { MotionCard } from "./motion-card";

const OPTIONS = [
  { text: "ক) ০", delay: 0 },
  { text: "খ) ১", delay: 0.15, correct: true },
  { text: "গ) ২", delay: 0.3 },
  { text: "ঘ) θ", delay: 0.45 },
];

/** AI writes a question letter by letter, options appear, the right one turns green. */
export function QuestionCard() {
  return (
    <MotionCard
      left={5}
      top={425}
      delayed
      label="AI প্রশ্নব্যাংক"
      labelColor="#B07C00"
      labelIcon={<SparkleIcon size={12} strokeWidth={2.4} />}
      under={<b className="hm-generated">✓ ২০টা প্রশ্ন তৈরি</b>}
    >
      <p className="hm-question">
        <span>প্রশ্ন ১৪: sin²θ + cos²θ = ?</span>
      </p>
      <div className="hm-options">
        {OPTIONS.map((o) => (
          <span key={o.text} className={clsx("hm-option", o.correct && "hm-correct")} style={{ animationDelay: `${o.delay.toFixed(2)}s` }}>
            {o.text}
          </span>
        ))}
      </div>
    </MotionCard>
  );
}
