"use client";

import clsx from "clsx";
import { Archive, ChevronDown, GraduationCap, LayoutGrid, SlidersHorizontal } from "lucide-react";
import { type SelectOption, SelectMenu, SelectTile } from "@/components/ui";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** "open" = every open batch, "closed" = closed batches, "g:<class>" = open batches of one class. */
export type BatchFilterValue = "open" | "closed" | `g:${string}`;

/**
 * The batch page's one filter: a header pill that opens the same pick-one menu as the হাজিরা
 * batch picker (dropdown on desktop, bottom sheet on phones).
 */
export function BatchFilter({
  value,
  onChange,
  counts,
  groups,
  className,
}: {
  value: BatchFilterValue;
  onChange: (v: BatchFilterValue) => void;
  counts: { active: number | null; archived: number | null };
  groups: { name: string; count: number }[];
  className?: string;
}) {
  const { tr, lang } = useLang();
  const many = (n: number | null) => (n == null ? "" : tr(`${num(n, lang)}টা ব্যাচ`, `${n} batches`));
  const hint = (text: string) => <span className="font-medium text-[#6B6880]">{text}</span>;
  const tile = (Icon: typeof LayoutGrid) =>
    function Tile(selected: boolean) {
      return (
        <SelectTile selected={selected}>
          <Icon className="size-5" />
        </SelectTile>
      );
    };

  const options: SelectOption<BatchFilterValue>[] = [
    { value: "open", label: tr("সব চালু ব্যাচ", "All open batches"), hint: hint(many(counts.active)), leading: tile(LayoutGrid) },
    ...groups.map((g) => ({
      value: `g:${g.name}` as const,
      label: g.name,
      hint: hint(many(g.count)),
      leading: tile(GraduationCap),
    })),
    {
      value: "closed",
      label: tr("বন্ধ ব্যাচ", "Closed batches"),
      hint: hint([many(counts.archived), tr("ডেটা রাখা আছে", "data kept")].filter(Boolean).join(" · ")),
      leading: tile(Archive),
    },
  ];
  const current = options.find((o) => o.value === value) ?? options[0];
  const filtered = value !== "open";

  return (
    <SelectMenu
      value={current.value}
      options={options}
      onChange={onChange}
      title={tr("ব্যাচ ফিল্টার", "Filter batches")}
      subtitle={tr("কোন ব্যাচগুলো দেখবেন", "Which batches to show")}
      className={className}
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`${tr("ফিল্টার", "Filter")}: ${current.label}`}
          className={clsx(
            "flex w-full items-center gap-2 rounded-[14px] bg-white px-3.5 py-[9px] text-[14px] font-semibold whitespace-nowrap text-[#17161F] transition-shadow hover:text-[#5B21B6]",
            open && "ring-2 ring-[#5B21B6]/25",
          )}
        >
          <SlidersHorizontal className={clsx("size-4 flex-none", filtered ? "text-[#5B21B6]" : "text-[#9E9BAD]")} strokeWidth={2.2} />
          <span className="min-w-0 flex-1 truncate text-left">{current.label}</span>
          <ChevronDown className={clsx("size-4 flex-none text-[#9E9BAD] transition-transform duration-200", open && "rotate-180")} strokeWidth={2.5} />
        </button>
      )}
    />
  );
}
