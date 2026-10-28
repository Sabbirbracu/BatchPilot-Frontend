import { Banknote, CalendarDays, Ellipsis, FileText, FingerprintPattern, LayoutGrid, LayoutTemplate, Megaphone, MessageSquareText, Users, type LucideIcon } from "lucide-react";

export type NavItem = {
  href?: string; // relative to the portal root ("" = home); missing = feature not built yet
  bn: string;
  en: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: "dues"; // live count shown on the item
};

// Tablet/desktop rail. Payments and settings live in the account menu.
export const RAIL_ITEMS: NavItem[] = [
  { href: "", bn: "হোম", en: "Home", icon: LayoutGrid, exact: true },
  { href: "/attendance", bn: "হাজিরা", en: "Attend.", icon: FingerprintPattern },
  { href: "/batches", bn: "ব্যাচ", en: "Batches", icon: CalendarDays },
  { href: "/students", bn: "স্টুডেন্ট", en: "Students", icon: Users },
  { href: "/fees", bn: "ফি", en: "Fees", icon: Banknote, badge: "dues" },
  { bn: "পরীক্ষা", en: "Exams", icon: FileText },
  { href: "/messages", bn: "SMS", en: "SMS", icon: MessageSquareText, exact: true }, // so it stays off on /messages/templates
  { href: "/messages/templates", bn: "টেমপ্লেট", en: "Templates", icon: LayoutTemplate },
  { href: "/notices", bn: "নোটিশ", en: "Notices", icon: Megaphone },
];

/** Phone tab bar; the raised "+" in the middle opens the action sheet. */
export const TAB_ITEMS: { left: NavItem[]; right: NavItem[] } = {
  left: [
    { href: "", bn: "হোম", en: "Home", icon: LayoutGrid, exact: true },
    { href: "/attendance", bn: "হাজিরা", en: "Attend.", icon: FingerprintPattern },
  ],
  right: [
    { href: "/fees", bn: "ফি", en: "Fees", icon: Banknote, badge: "dues" },
    { href: "/more", bn: "আরো", en: "More", icon: Ellipsis },
  ],
};

export function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}
