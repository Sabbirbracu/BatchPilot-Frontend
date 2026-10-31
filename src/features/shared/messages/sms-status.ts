/** How each outbox status reads in the SMS log and on a student's message list. */
export const STATUS: Record<string, { bn: string; en: string; bg: string; fg: string }> = {
  queued: { bn: "◷ সারিতে", en: "◷ Queued", bg: "#FFF7DB", fg: "#B07C00" },
  held: { bn: "◷ সারিতে", en: "◷ Queued", bg: "#FFF7DB", fg: "#B07C00" },
  sending: { bn: "◷ যাচ্ছে", en: "◷ Sending", bg: "#FFF7DB", fg: "#B07C00" },
  sent: { bn: "✓ গেছে", en: "✓ Sent", bg: "#ECFDF3", fg: "#039855" },
  delivered: { bn: "✓ পৌঁছেছে", en: "✓ Delivered", bg: "#ECFDF3", fg: "#039855" },
  failed: { bn: "✕ ব্যর্থ", en: "✕ Failed", bg: "#FEF0EF", fg: "#D92D20" },
  cancelled: { bn: "বাতিল", en: "Cancelled", bg: "#F3F1FA", fg: "#6B6880" },
};
