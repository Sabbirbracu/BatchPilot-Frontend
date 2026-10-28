import type { Due, Ledger, Payment } from "@/lib/types";

export type MonthFee = {
  month: string; // "2026-10-01"
  amount: number; // after discounts, all batches
  outstanding: number;
  paid: boolean;
  waived: boolean;
  payment: Payment | null; // the latest payment that covered this month
};

/** The ledger folded into one line per month (newest first), as the profile panel lists it. */
export function monthFees(ledger: Ledger, limit = 3): MonthFee[] {
  const byMonth = new Map<string, Due[]>();
  for (const d of ledger.dues) byMonth.set(d.month, [...(byMonth.get(d.month) ?? []), d]);
  const live = ledger.payments.filter((p) => p.kind === "payment" && !p.reversed);
  return [...byMonth.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, limit)
    .map(([month, dues]) => {
      const amount = dues.reduce((s, d) => s + d.amount - d.discount, 0);
      const outstanding = dues.reduce((s, d) => s + d.outstanding, 0);
      const covering = live.filter((p) => p.months.some((m) => m.slice(0, 7) === month.slice(0, 7)));
      return {
        month,
        amount,
        outstanding,
        paid: outstanding <= 0 && amount > 0,
        waived: dues.every((d) => d.status === "waived"),
        payment: covering.sort((a, b) => b.received_at.localeCompare(a.received_at))[0] ?? null,
      };
    });
}
