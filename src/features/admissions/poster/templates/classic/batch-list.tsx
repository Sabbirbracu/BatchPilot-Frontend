import { useLang } from "@/lib/i18n";
import { num } from "@/lib/format";
import type { SeatBatch } from "@/lib/types";
import type { PosterTheme } from "../../lib/themes";
import { BatchTile } from "./batch-tile";

const MAX = 4; // what fits on A4 above the QR; the rest are on the page the QR opens

/** "ব্যাচসমূহ": one wide tile per batch up to three, a two-column grid for four. */
export function BatchList({ batches, theme: t }: { batches: SeatBatch[]; theme: PosterTheme }) {
  const { tr, lang } = useLang();
  const shown = batches.slice(0, MAX);
  const more = batches.length - shown.length;
  const compact = shown.length > 3;
  return (
    <section className="flex min-h-0 flex-1 flex-col justify-center px-14 py-3">
      <p className="m-0 mb-3 flex items-center gap-3 text-[18px] font-bold" style={{ color: t.main }}>
        {batches.length > 1 ? tr(`ব্যাচসমূহ · ${num(batches.length, lang)}টি`, `${batches.length} batches`) : tr("ব্যাচের তথ্য", "Batch details")}
        <span className="h-[2px] flex-1 rounded-full" style={{ background: t.soft }} />
      </p>
      <div className={compact ? "grid grid-cols-2 gap-3" : "space-y-3"}>
        {shown.map((b) => (
          <BatchTile key={b.id} batch={b} theme={t} compact={compact} />
        ))}
      </div>
      {more > 0 && (
        <p className="m-0 mt-3 text-center text-[16px] font-semibold text-[#6B6880]">
          {tr(`+ আরও ${num(more, lang)}টি ব্যাচ — QR স্ক্যান করে দেখুন`, `+ ${more} more — scan the QR to see them`)}
        </p>
      )}
    </section>
  );
}
