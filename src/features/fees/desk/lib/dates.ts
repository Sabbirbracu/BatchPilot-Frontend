/** "2026-10-01" + 1 → "2026-11-01" */
export function addMonthsISO(month: string, n: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return d.toISOString().slice(0, 10);
}

/** First day of the month an ISO date falls in. */
export function monthOf(iso: string): string {
  return `${iso.slice(0, 7)}-01`;
}
