import clsx from "clsx";
import { FingerprintPattern } from "lucide-react";
import { clockShort, num } from "@/lib/format";
import type { BatchChipData, BatchDetail } from "../../types";
import { SummaryRing } from "./ring";

const PHASE = { live: "চলছে", done: "শেষ হয়েছে", upcoming: "আসন্ন", exam: "পরীক্ষা" };

/** Phone summary: big ring, batch name, and three glass tiles (on time / late / absent). */
export function BatchHero({ batch, detail, className }: { batch: BatchChipData; detail: BatchDetail; className?: string }) {
  const present = detail.onTime + detail.late;
  const tiles = [
    { label: "সময়মতো", value: detail.onTime, color: "text-white" },
    { label: "দেরিতে", value: detail.late, color: "text-[#FFD75E]" },
    { label: "আসেনি", value: detail.absent, color: "text-[#FFB4AE]" },
  ];
  return (
    <section className={clsx("relative isolate overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#6D28D9,#3B1782)] p-4 text-white shadow-[0_24px_48px_-24px_rgba(76,29,149,.55)]", className)}>
      <FingerprintPattern aria-hidden strokeWidth={1} className="pointer-events-none absolute -top-6 -right-10 -z-10 size-48 text-white/[0.08]" />
      <div className="flex items-center gap-4">
        <SummaryRing value={batch.total ? present / batch.total : 0} className="size-[76px]">
          <span className="num text-[22px] leading-none font-bold">{num(present, "bn")}</span>
          <span className="mt-0.5 text-[11px] text-white/75">/ {num(batch.total, "bn")}</span>
        </SummaryRing>
        <div className="min-w-0 flex-1">
          <p className="m-0 flex items-center gap-1.5 text-[12px] font-bold text-[#FFD75E]">
            <span className="size-1.5 rounded-full bg-[#FFD75E]" />
            {PHASE[batch.state]} · {clockShort(batch.start, "bn")}
            {batch.end && `–${clockShort(batch.end, "bn")}`}
          </p>
          <h2 className="m-0 mt-0.5 truncate text-[19px] font-bold">
            {batch.name}
            {batch.subject && ` · ${batch.subject}`}
          </h2>
          <p className="m-0 text-[13px] text-white/80">{batch.state === "live" ? "ফিঙ্গারপ্রিন্টে হাজিরা চলছে" : batch.state === "done" ? "হাজিরা শেষ" : "ক্লাস এখনো শুরু হয়নি"}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-2xl bg-white/[0.12] px-3 py-2.5">
            <p className="m-0 text-[12px] text-white/80">{t.label}</p>
            <p className={clsx("num m-0 text-[20px] font-bold", t.color)}>{num(t.value, "bn")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
