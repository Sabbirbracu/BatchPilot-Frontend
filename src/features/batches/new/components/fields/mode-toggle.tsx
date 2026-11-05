import clsx from "clsx";
import { MapPin, Wifi } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { BatchMode } from "@/lib/types";
import { Labeled } from "./labeled";

/** "ব্যাচের ধরন" — offline (in a room) or online. Same 46px look as the fee-plan toggle. */
export function ModeToggle({ value, onChange }: { value: BatchMode; onChange: (v: BatchMode) => void }) {
  const { tr } = useLang();
  const options = [
    { value: "offline" as const, label: tr("অফলাইন", "Offline"), Icon: MapPin },
    { value: "online" as const, label: tr("অনলাইন", "Online"), Icon: Wifi },
  ];
  return (
    <Labeled label={tr("ব্যাচের ধরন", "Batch type")}>
      <div className="flex h-[46px] rounded-[13px] bg-[#F3F1FA] p-1 text-[13.5px]" role="radiogroup" aria-label={tr("ব্যাচের ধরন", "Batch type")}>
        {options.map(({ value: v, label, Icon }) => {
          const on = v === value;
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(v)}
              className={clsx(
                "flex flex-1 items-center justify-center gap-1.5 rounded-[10px] transition-colors",
                on ? "bg-white font-bold text-[#5B21B6] shadow-[0_1px_2px_rgba(23,22,31,.08)]" : "text-[#6B6880] hover:text-[#17161F]",
              )}
            >
              <Icon className="hidden size-4 sm:block" strokeWidth={on ? 2.4 : 2} />
              {label}
            </button>
          );
        })}
      </div>
    </Labeled>
  );
}
