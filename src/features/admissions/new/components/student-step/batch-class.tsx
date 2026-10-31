import { Lock } from "lucide-react";

/** The class, read-only: it is the batch's class, so nobody types it. Same frame as IconInput. */
export function BatchClass({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="min-w-0">
      <p className="m-0 mb-1.5 text-[13px] font-bold text-[#3B3850]">{label}</p>
      <div className="flex h-[46px] items-center gap-2.5 rounded-[14px] bg-[#F7F5FC] px-3.5">
        <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-[#17161F]">{value}</span>
        <span className="flex flex-none items-center gap-1 text-[12px] text-[#8A86A0]">
          <Lock className="size-3.5" aria-hidden />
          {note}
        </span>
      </div>
    </div>
  );
}
