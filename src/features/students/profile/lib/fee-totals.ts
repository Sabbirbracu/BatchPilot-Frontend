import type { Enrollment, Ledger, Payment } from "@/lib/types";

/** Payments that still count: not reversed, and not the reversal entries themselves. */
export function livePayments(ledger: Ledger | undefined): Payment[] {
  return (ledger?.payments ?? []).filter((p) => p.kind === "payment" && !p.reversed);
}

/** All money received from this student so far, in poisha. */
export function totalPaid(ledger: Ledger | undefined): number {
  return livePayments(ledger).reduce((s, p) => s + p.amount, 0);
}

/** What the student pays each month across their batches (effective fee after any special fee). */
export function monthlyTotal(enrollments: Enrollment[]): number {
  return enrollments.filter((e) => !e.end_month).reduce((s, e) => s + e.monthly_fee, 0);
}
