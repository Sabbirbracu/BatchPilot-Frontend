import type { Role } from "@/lib/types";

// Mirrors backend/app/core/permissions.py (the backend enforces it; this only shows it). Keep the two in step.
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  owner: ["reports.view_all", "batch.manage", "student.manage", "payment.record", "payment.reverse_any", "due.discount", "fees.generate", "attendance.take", "message.send_notice", "message.edit_templates", "members.manage", "settings.manage", "audit.view"],
  assistant: ["student.manage", "payment.record", "attendance.take", "message.send_notice"],
  teacher: ["attendance.take"],
};

export const PERMISSION_LABELS: { key: string; bn: string; en: string }[] = [
  { key: "attendance.take", bn: "হাজিরা নেওয়া", en: "Take attendance" },
  { key: "student.manage", bn: "স্টুডেন্ট ভর্তি ও এডিট", en: "Admit and edit students" },
  { key: "payment.record", bn: "ফি নেওয়া", en: "Collect fees" },
  { key: "message.send_notice", bn: "নোটিশ পাঠানো", en: "Send notices" },
  { key: "batch.manage", bn: "ব্যাচ খোলা ও বদলানো", en: "Create and change batches" },
  { key: "due.discount", bn: "বকেয়ায় ছাড় দেওয়া", en: "Discount dues" },
  { key: "payment.reverse_any", bn: "যেকোনো পেমেন্ট বাতিল", en: "Reverse any payment" },
  { key: "fees.generate", bn: "মাসিক ফি তৈরি", en: "Generate monthly fees" },
  { key: "message.edit_templates", bn: "SMS টেমপ্লেট বদলানো", en: "Edit SMS templates" },
  { key: "reports.view_all", bn: "সব রিপোর্ট দেখা", en: "See all reports" },
  { key: "members.manage", bn: "টিম সামলানো", en: "Manage the team" },
  { key: "settings.manage", bn: "সেটিংস বদলানো", en: "Change settings" },
  { key: "audit.view", bn: "কাজের লগ দেখা", en: "See the activity log" },
];
