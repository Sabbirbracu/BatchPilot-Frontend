// What the attendance page renders, whether it comes from the API or the demo data.

export type ChipState = "done" | "live" | "upcoming" | "exam";
export type MarkStatus = "present" | "late" | "absent";

export type BatchChipData = {
  id: string;
  start: string; // "10:00"
  end: string | null;
  label: string; // desktop: "SSC গণিত (A)"
  short: string; // phone: "SSC (A)"
  name: string; // hero title: "HSC ২৭"
  subject: string | null;
  state: ChipState;
  present: number;
  total: number;
};

export type StudentMark = {
  id: string;
  roll: string;
  name: string;
  status: MarkStatus;
  time: string | null; // "09:58"
  lateMinutes?: number;
  sms: "sent" | "scheduled" | null;
  manual?: boolean; // marked by hand instead of the fingerprint device
  streak?: number; // consecutive absences
  monthRate: number | null; // % present this month
  phone: string | null;
  tone?: { bg: string; fg: string };
  initial?: string; // avatar letter(s), when the default rule does not fit
};

export type LiveEvent =
  | { kind: "late"; name: string; minutes: number; time: string }
  | { kind: "present"; name: string; time: string }
  | { kind: "manual"; name: string; by: string; time: string }
  | { kind: "unknown" };

export type BatchDetail = {
  onTime: number;
  late: number;
  absent: number;
  total: number;
  marks: StudentMark[];
};

export type AttendanceView = {
  date: string;
  now: number | null; // minutes since midnight (Dhaka)
  device: { room: string; online: boolean };
  batches: BatchChipData[];
  defaultBatchId: string | null;
  detail: (batchId: string) => BatchDetail | null; // null while loading
  live: LiveEvent[];
  autoSms: { at: string } | null;
  week: { label: string; rate: number; today?: boolean }[] | null;
  demo: boolean;
};
