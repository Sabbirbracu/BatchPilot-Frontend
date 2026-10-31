import { FilterChip, SearchField } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";

export type MemberFilter = "all" | "owing" | "low";

/** সবাই / ফি বাকি / কম উপস্থিতি chips and the search box. */
export function StudentFilters({
  value,
  onChange,
  owing,
  low,
  q,
  onQ,
}: {
  value: MemberFilter;
  onChange: (f: MemberFilter) => void;
  owing: number;
  low: number;
  q: string;
  onQ: (q: string) => void;
}) {
  const { tr, lang } = useLang();
  return (
    <div className="mb-1.5 flex flex-wrap items-center gap-2">
      <div className="-mx-4 flex min-w-0 flex-1 gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0">
        <FilterChip active={value === "all"} onClick={() => onChange("all")}>
          {tr("সবাই", "All")}
        </FilterChip>
        <FilterChip active={value === "owing"} danger onClick={() => onChange("owing")}>
          {tr("ফি বাকি", "Fee due")} {num(owing, lang)}
        </FilterChip>
        <FilterChip active={value === "low"} onClick={() => onChange("low")}>
          {tr("কম উপস্থিতি", "Low attendance")} {num(low, lang)}
        </FilterChip>
      </div>
      <SearchField look="compact" value={q} onChange={onQ} placeholder={tr("নাম, আইডি বা ফোন", "Name, ID or phone")} className="w-full md:w-[200px]" />
    </div>
  );
}
