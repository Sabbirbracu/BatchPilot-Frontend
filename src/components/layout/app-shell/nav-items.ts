import {
  AtSign,
  Banknote,
  Bell,
  Blocks,
  BookOpen,
  CalendarDays,
  ChartColumn,
  CirclePlay,
  CircleUserRound,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  Ellipsis,
  FilePenLine,
  FileText,
  FingerprintPattern,
  Globe,
  GraduationCap,
  LayoutGrid,
  LayoutTemplate,
  Laptop,
  Library,
  Link,
  Megaphone,
  MessageSquareText,
  MessagesSquare,
  MonitorPlay,
  Palette,
  PanelTop,
  QrCode,
  Rocket,
  ScanLine,
  Settings,
  ShieldCheck,
  Target,
  UserRoundPlus,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href?: string; // relative to the portal root ("" = home); missing = feature not built yet
  bn: string;
  en: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: "dues" | "admissions"; // live count shown on the item
  teacherOnly?: boolean; // the staff portal has no such screen
};

/** A rail entry that turns the rail into its items. `bn`/`en` is the short rail label, `title` the heading over them. */
export type NavGroup = {
  key: string;
  bn: string;
  en: string;
  title: { bn: string; en: string };
  icon: LucideIcon;
  items: NavItem[];
  teacherOnly?: boolean;
};

export type RailEntry = { kind: "link"; item: NavItem } | { kind: "group"; group: NavGroup };

// Tablet/desktop rail: home, then one icon per group; tapping a group shows its screens in the rail, with a back button.
export const RAIL: RailEntry[] = [
  { kind: "link", item: { href: "", bn: "হোম", en: "Home", icon: LayoutGrid, exact: true } },
  {
    kind: "group",
    group: {
      key: "academic",
      bn: "একাডেমিক",
      en: "Academic",
      title: { bn: "একাডেমিক ম্যানেজমেন্ট", en: "Academic management" },
      icon: GraduationCap,
      items: [
        { href: "/batches", bn: "ব্যাচ", en: "Batches", icon: CalendarDays },
        { href: "/students", bn: "স্টুডেন্ট", en: "Students", icon: Users },
        { href: "/admissions", bn: "ভর্তি", en: "Admissions", icon: UserRoundPlus, badge: "admissions" },
        { href: "/attendance", bn: "হাজিরা", en: "Attendance", icon: FingerprintPattern },
        { href: "/fees", bn: "ফি", en: "Fees", icon: Banknote, badge: "dues" },
      ],
    },
  },
  {
    kind: "group",
    group: {
      key: "exams",
      bn: "পরীক্ষা",
      en: "Exams",
      title: { bn: "পরীক্ষা ও মূল্যায়ন", en: "Examination & assessment" },
      icon: ClipboardCheck,
      items: [
        { href: "/exams", bn: "পরীক্ষা", en: "Exams", icon: FileText },
        { href: "/exams/bank", bn: "প্রশ্ন ব্যাংক", en: "Question bank", icon: Library },
        { href: "/exams/creator", bn: "প্রশ্ন তৈরি", en: "Question creator", icon: FilePenLine },
        { href: "/exams/omr", bn: "OMR স্ক্যানার", en: "OMR scanner", icon: ScanLine },
        { href: "/exams/results", bn: "রেজাল্ট ও বিশ্লেষণ", en: "Results & analysis", icon: ChartColumn },
      ],
    },
  },
  {
    kind: "group",
    group: {
      key: "online",
      bn: "অনলাইন",
      en: "Online",
      title: { bn: "অনলাইন লার্নিং", en: "Online learning" },
      icon: MonitorPlay,
      items: [
        { href: "/online/batches", bn: "অনলাইন ব্যাচ", en: "Online batches", icon: Laptop },
        { href: "/online/courses", bn: "অনলাইন কোর্স", en: "Online courses", icon: BookOpen },
        { href: "/online/live", bn: "লাইভ ক্লাস", en: "Live classes", icon: Video },
        { href: "/online/recorded", bn: "রেকর্ডেড ক্লাস", en: "Recorded lessons", icon: CirclePlay },
        { href: "/online/assignments", bn: "অ্যাসাইনমেন্ট", en: "Assignments", icon: ClipboardList },
      ],
    },
  },
  {
    kind: "group",
    group: {
      key: "marketing",
      bn: "মার্কেটিং",
      en: "Marketing",
      title: { bn: "মার্কেটিং", en: "Marketing" },
      icon: Rocket,
      teacherOnly: true,
      items: [
        { href: "/marketing/website", bn: "আমার ওয়েবসাইট", en: "My website", icon: Globe },
        { href: "/marketing/landing", bn: "ল্যান্ডিং পেজ", en: "Landing page", icon: PanelTop },
        { href: "/marketing/domain", bn: "ডোমেইন", en: "Domain", icon: AtSign },
        // Each admission QR already prints as a poster from this screen.
        { href: "/admissions/qr", bn: "QR ও পোস্টার", en: "QR codes & posters", icon: QrCode },
        { href: "/marketing/posters", bn: "পোস্টার ডিজাইন", en: "Poster design", icon: Palette },
        { href: "/marketing/campaigns", bn: "ভর্তি ক্যাম্পেইন", en: "Admission campaign", icon: Target },
        { href: "/marketing/links", bn: "রেজিস্ট্রেশন লিংক", en: "Registration links", icon: Link },
      ],
    },
  },
  {
    kind: "group",
    group: {
      key: "communication",
      bn: "যোগাযোগ",
      en: "Comms",
      title: { bn: "যোগাযোগ", en: "Communication" },
      icon: MessagesSquare,
      items: [
        { href: "/messages", bn: "SMS", en: "SMS", icon: MessageSquareText, exact: true }, // so it stays off on /messages/templates
        { href: "/notices", bn: "নোটিশ", en: "Notices", icon: Megaphone },
        { href: "/messages/templates", bn: "টেমপ্লেট", en: "Templates", icon: LayoutTemplate },
        { bn: "নোটিফিকেশন", en: "Notifications", icon: Bell },
      ],
    },
  },
  {
    kind: "group",
    group: {
      key: "settings",
      bn: "সেটিংস",
      en: "Settings",
      title: { bn: "সেটিংস", en: "Settings" },
      icon: Settings,
      teacherOnly: true,
      items: [
        { href: "/settings", bn: "প্রোফাইল", en: "Profile", icon: CircleUserRound, exact: true },
        { href: "/settings/staff", bn: "স্টাফ ও পারমিশন", en: "Staff & permissions", icon: ShieldCheck },
        { href: "/settings/subscription", bn: "সাবস্ক্রিপশন", en: "Subscription", icon: CreditCard },
        { href: "/settings/integrations", bn: "ইন্টিগ্রেশন", en: "Integrations", icon: Blocks },
      ],
    },
  },
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
