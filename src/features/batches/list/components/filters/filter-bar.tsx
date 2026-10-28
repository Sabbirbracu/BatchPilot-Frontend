import clsx from "clsx";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** চালু / বন্ধ tabs, then one chip per class group. Scrolls sideways on phones. */
export function FilterBar({
  archived,
  onArchived,
  counts,
  groups,
  group,
  onGroup,
}: {
  archived: boolean;
  onArchived: (v: boolean) => void;
  counts: { active: number | null; archived: number | null };
  groups: string[];
  group: string | null;
  onGroup: (g: string | null) => void;
}) {
  const { tr, lang } = useLang();
  const tab = (on: boolean) => clsx("rounded-[10px] px-4 py-1.5 whitespace-nowrap", on ? "bg-[#5B21B6] font-bold text-white" : "text-[#6B6880] hover:text-[#17161F]");
  const chip = (on: boolean) =>
    clsx(
      "rounded-[12px] bg-white px-3 py-1.5 text-[13px] whitespace-nowrap",
      on ? "font-bold text-[#17161F] shadow-[inset_0_0_0_1.5px_#C9B3FF]" : "text-[#6B6880] hover:text-[#17161F]",
    );
  const count = (n: number | null) => (n == null ? "" : ` ${num(n, lang)}`);

  return (
    <div className="-mx-4 flex items-center gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0">
      <div role="tablist" className="flex flex-none rounded-[14px] bg-white p-1 text-[14px]">
        <button type="button" role="tab" aria-selected={!archived} onClick={() => onArchived(false)} className={tab(!archived)}>
          {tr("চালু", "Open")}
          {count(counts.active)}
        </button>
        <button type="button" role="tab" aria-selected={archived} onClick={() => onArchived(true)} className={tab(archived)}>
          {tr("বন্ধ", "Closed")}
          {count(counts.archived)}
        </button>
      </div>
      {groups.length > 1 && (
        <>
          <span className="h-6 w-px flex-none bg-[#E4DFF0]" />
          <button type="button" onClick={() => onGroup(null)} className={chip(group == null)}>
            {tr("সব শ্রেণি", "All classes")}
          </button>
          {groups.map((g) => (
            <button key={g} type="button" onClick={() => onGroup(g === group ? null : g)} className={chip(g === group)}>
              {g}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
