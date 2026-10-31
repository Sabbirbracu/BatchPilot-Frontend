import clsx from "clsx";
import { Check } from "lucide-react";
import { Fragment } from "react";
import { digits } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Step } from "../../use-new-admission";

const STEPS: { id: Step; bn: string; en: string }[] = [
  { id: "batch", bn: "ব্যাচ বাছুন", en: "Pick batch" },
  { id: "student", bn: "স্টুডেন্টের তথ্য", en: "Student details" },
  { id: "fee", bn: "ফি নিন", en: "Take fee" },
];

/** ১ ব্যাচ বাছুন —— ২ স্টুডেন্টের তথ্য —— ৩ ফি নিন: done steps turn green with a tick. */
export function StepBar({ step }: { step: Step }) {
  const { lang } = useLang();
  const at = step === "done" ? STEPS.length : STEPS.findIndex((s) => s.id === step);
  return (
    <ol className="m-0 flex items-center gap-3 rounded-[22px] bg-white px-4 py-3.5 sm:px-6">
      {STEPS.map((s, i) => {
        const done = i < at;
        const now = i === at;
        return (
          <Fragment key={s.id}>
            <li className="flex flex-none list-none items-center gap-2.5">
              {done ? (
                <span className="flex size-[30px] items-center justify-center rounded-full bg-[#12B76A] text-white">
                  <Check className="size-4" strokeWidth={3} />
                </span>
              ) : now ? (
                <span className="num flex size-[30px] items-center justify-center rounded-full bg-[#5B21B6] text-[14px] font-bold text-white shadow-[0_0_0_5px_#F1EAFF]">
                  {digits(i + 1, lang)}
                </span>
              ) : (
                <span className="num border-r border-[#E4DDF5] pr-2.5 text-[14px] text-[#6B6880]">{digits(i + 1, lang)}</span>
              )}
              <span className={clsx("text-[14px] sm:text-[15px]", now || done ? "font-bold text-[#17161F]" : "text-[#6B6880]", !now && "max-sm:hidden")}>
                {lang === "bn" ? s.bn : s.en}
              </span>
            </li>
            {i < STEPS.length - 1 && <li aria-hidden className={clsx("h-[3px] flex-1 list-none rounded-full", done ? "bg-[#12B76A]" : "bg-[#ECE8F5]")} />}
          </Fragment>
        );
      })}
    </ol>
  );
}
