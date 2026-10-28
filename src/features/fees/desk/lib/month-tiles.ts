import { addMonthsISO } from "./dates";
import type { Due, Ledger } from "@/lib/types";

export type MonthTile =
  | { kind: "open"; month: string; amount: number; dues: Due[]; current: boolean }
  | { kind: "advance"; month: string; amount: number }
  | { kind: "paid"; month: string; amount: number };

/**
 * The month cards of the collect form: every month still owed (oldest first, the current one
 * marked), the next month as an advance, and the latest fully paid month for reference.
 */
export function monthTiles(ledger: Ledger, monthly: number, currentMonth: string): MonthTile[] {
  const byMonth = new Map<string, Due[]>();
  for (const d of ledger.dues) byMonth.set(d.month, [...(byMonth.get(d.month) ?? []), d]);
  const months = [...byMonth.keys()].sort();
  const open = months
    .map((m) => ({ m, dues: byMonth.get(m)!.filter((d) => d.status === "due" || d.status === "partial") }))
    .filter((x) => x.dues.length > 0)
    .map((x): MonthTile => ({ kind: "open", month: x.m, dues: x.dues, amount: x.dues.reduce((s, d) => s + d.outstanding, 0), current: x.m === currentMonth }));
  const paid = months.filter((m) => byMonth.get(m)!.every((d) => d.status === "paid" || d.status === "waived")).at(-1);
  const last = [currentMonth, ...open.map((t) => t.month), ...months].sort().at(-1)!;
  const tiles = [...open];
  if (monthly > 0) tiles.push({ kind: "advance", month: addMonthsISO(last, 1), amount: monthly });
  if (paid) tiles.push({ kind: "paid", month: paid, amount: byMonth.get(paid)!.reduce((s, d) => s + d.amount - d.discount, 0) });
  return tiles;
}

/** Months are taken oldest first: picking one also picks every older open month. */
export function pickUpTo(tiles: MonthTile[], index: number, selected: number): number {
  const openCount = tiles.filter((t) => t.kind === "open").length;
  if (index >= openCount) return selected;
  return selected === index + 1 ? index : index + 1;
}
