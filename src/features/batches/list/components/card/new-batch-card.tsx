import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";

/** Dashed last tile of the grid: "নতুন ব্যাচ খুলুন". */
export function NewBatchCard() {
  const { tr } = useLang();
  const to = usePortalPath();
  return (
    <Link
      href={to("/batches/new")}
      className="flex min-h-[240px] flex-col items-center justify-center gap-2.5 rounded-[22px] border-2 border-dashed border-[#D9CCF7] bg-[rgba(244,238,255,.4)] p-6 text-[#5B21B6] hover:bg-[rgba(244,238,255,.8)]"
    >
      <span className="flex size-[54px] items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] text-white shadow-[0_10px_20px_-8px_rgba(91,33,182,.6)]">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
      <b className="text-[16px]">{tr("নতুন ব্যাচ খুলুন", "Open a new batch")}</b>
      <span className="max-w-[220px] text-center text-[13px] text-[#6B6880]">
        {tr("নাম, দিন, সময় আর ফি দিলেই ব্যাচ তৈরি — ১ মিনিটের কাজ", "Name, days, time and fee — done in a minute")}
      </span>
    </Link>
  );
}
