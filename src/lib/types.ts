// Mirrors the FastAPI schemas. Money is always integer poisha (৳800 = 80000).

export type Role = "owner" | "assistant" | "teacher";
export type Portal = "teacher" | "staff" | "guardian" | "student";

export type Institution = {
  id: string;
  name: string;
  subject: string | null;
  city: string | null;
  slug: string | null;
  fee_due_day: number;
  plan: string;
  plan_status: string;
  trial_ends_at: string | null;
  settings: {
    receipt_sms?: boolean;
    absent_sms?: boolean;
    reminders_enabled?: boolean;
    daily_summary?: boolean;
    summary_time?: string;
    bkash_number?: string | null;
  };
};

export type Me = {
  user: { id: string; phone: string; name: string | null; language: "bn" | "en" };
  memberships: { institution_id: string; institution_name: string; role: Role }[];
  institution: Institution | null;
  role: Role | null;
  portal: Portal | null;
  home: string; // /teacher, /staff, /guardian, /student or /setup
  permissions: string[];
};

export type Batch = {
  id: string;
  name: string;
  subject: string | null;
  class_level: string | null;
  days: string[];
  start_time: string | null;
  end_time: string | null;
  monthly_fee: number;
  admission_fee: number | null;
  capacity: number | null;
  archived_at: string | null;
  version: number;
  student_count: number;
  month_collected: number;
  month_due: number;
  today_present: number | null;
  today_absent: number | null;
  due_students: number;
  month_attendance: number | null;
  last_month_attendance: number | null;
};

export type Student = {
  id: string;
  roll_no: string;
  name: string;
  phone: string | null;
  guardian_name: string | null;
  guardian_phone: string | null;
  guardian_verified_at: string | null;
  school: string | null;
  class_level: string | null;
  status: "active" | "left";
  joined_at: string;
  left_at: string | null;
  qr_token: string;
  note: string | null;
  version: number;
  outstanding: number;
  due_months: number;
  partial: boolean;
  batch_names: string[];
  month_attendance: number | null;
};

export type StudentSummary = { active: number; joined_this_month: number; with_due: number; left: number };

export type StudentPage = { items: Student[]; next_cursor: string | null; total: number };

export type Enrollment = {
  id: string;
  batch_id: string;
  batch_name: string;
  monthly_fee: number;
  custom_fee: number | null;
  discount_note: string | null;
  start_month: string;
  end_month: string | null;
};

export type Due = {
  id: string;
  month: string;
  batch_id: string;
  batch_name: string;
  amount: number;
  discount: number;
  discount_reason: string | null;
  paid_amount: number;
  outstanding: number;
  status: "due" | "partial" | "paid" | "waived";
  due_date: string;
};

export type PaymentMethod = "cash" | "bkash" | "nagad" | "bank";

export type Payment = {
  id: string;
  student_id: string;
  student_name: string;
  roll_no: string;
  kind: "payment" | "reversal";
  amount: number;
  method: PaymentMethod;
  trx_id: string | null;
  note: string | null;
  received_by: string;
  received_by_name: string | null;
  received_at: string;
  reversed: boolean;
  reversal_reason: string | null;
  months: string[];
  batch_names: string[];
};

export type FeeOverview = {
  month: string;
  collected: number;
  billed: number;
  today_amount: number;
  today_count: number;
  today_receipts: number;
  total_due: number;
  due_students: number;
  by_method: Partial<Record<PaymentMethod, number>>;
};

export type Ledger = { student_id: string; outstanding: number; advance: number; dues: Due[]; payments: Payment[] };

export type Receipt = {
  payment_id: string;
  student_id: string;
  student_name: string;
  roll_no: string;
  amount: number;
  method: PaymentMethod;
  trx_id: string | null;
  received_at: string;
  received_by_name: string | null;
  allocations: { fee_due_id: string; month: string; batch_id: string; amount: number; due_status: string }[];
  outstanding_after: number;
  sms_status: string | null;
  replayed: boolean;
};

export type DueRow = {
  student_id: string;
  name: string;
  roll_no: string;
  guardian_phone: string | null;
  batch_names: string[];
  outstanding: number;
  months: number;
  oldest_month: string;
  last_payment_at: string | null;
};

export type DuesPage = { items: DueRow[]; total_students: number; total_outstanding: number };

export type TeacherDashboardData = {
  date: string;
  month: string;
  today_collected: number;
  today_count: number;
  month_collected: number;
  total_due: number;
  due_students: number;
  overdue_2m_students: number;
  month_rate: number | null;
  last_month_rate: number | null;
  absent_today: number;
  active_students: number;
  batches: { batch_id: string; name: string; collected: number; due: number; rate: number | null }[];
  top_dues: { student_id: string; name: string; roll_no: string; outstanding: number; months: number }[];
  collectors_today: { user_id: string; name: string | null; amount: number; count: number }[];
  attendance_rate_today: number | null;
  attendance_rate_last_week: number | null;
  today_classes: TodayClass[];
  live_marks: LiveMark[];
  absent_streaks: { student_id: string; name: string; days: number }[];
};

export type TodayClass = TodayBatch & { absent_names: string[]; room?: string | null };

export type LiveMark = {
  student_id: string;
  name: string;
  roll_no: string;
  batch_name: string;
  status: "present" | "absent" | "late";
  at: string;
  sms_sent?: boolean; // guardian was told (fingerprint devices report this)
  late_minutes?: number;
};

export type CashSummary = {
  date: string;
  cash: number;
  bkash: number;
  nagad: number;
  bank: number;
  count: number;
  unhanded_cash: number;
};

export type TodayBatch = {
  batch_id: string;
  name: string;
  subject?: string | null;
  start_time: string | null;
  end_time?: string | null;
  scheduled_today: boolean;
  student_count: number;
  taken: boolean;
  present: number;
  absent: number;
};

export type Roster = {
  batch_id: string;
  batch_name: string;
  date: string;
  session_id: string | null;
  taken_by_name: string | null;
  taken_at: string | null;
  present: number;
  absent: number;
  items: {
    student_id: string;
    name: string;
    roll_no: string;
    status: "present" | "absent" | "late";
    guardian_phone: string | null;
    due_months: number;
  }[];
};

export type StudentAttendance = {
  sessions: number;
  present: number;
  absent: number;
  rate: number | null;
  recent: { date: string; batch_name: string; status: string }[];
};

export type Message = {
  id: string;
  student_id: string | null;
  student_name: string | null;
  guardian_name: string | null;
  to_phone: string;
  template_key: string;
  body: string;
  segments: number;
  status: string;
  send_after: string;
  sent_at: string | null;
  created_at: string;
};

export type Template = {
  key: string;
  name: string | null;
  kind: "auto" | "notice";
  body_bn: string;
  body_en: string | null;
  default_bn: string | null;
  is_enabled: boolean;
  segments: number;
};

export type MessageKind = "attendance" | "receipt" | "reminder" | "notice" | "welcome" | "failed";

export type MessageOverview = {
  month: string;
  sent: number;
  guardians: number;
  segments: number;
  reached: number;
  queued: number;
  failed: number;
  gateway_connected: boolean;
  scheduled_notices: number;
  counts: Record<MessageKind, number>;
};

export type NoticeAudience = { all: boolean; batch_ids: string[]; student_ids: string[] };
export type AudienceCount = { students: number; guardians: number; missing_phone: number };

export type NoticeRecord = {
  id: string;
  title: string | null;
  message: string;
  targets: string[];
  students: number;
  queued: number;
  created_at: string;
  send_at: string | null;
  pending: boolean;
};

export type Member = {
  id: string;
  user_id: string;
  name: string | null;
  phone: string;
  role: Role;
  is_active: boolean;
  created_at: string;
};

export type StaffDashboardData = {
  date: string;
  cash: CashSummary;
  today_batches: TodayBatch[];
  call_list: DueRow[];
};

export type ChildSummary = {
  student_id: string;
  name: string;
  roll_no: string;
  batch_names: string[];
  outstanding: number;
  open_dues: { month: string; batch_name: string; outstanding: number; status: string }[];
  attendance_rate: number | null;
  present: number;
  absent: number;
  recent_attendance: { date: string; batch_name: string; status: string }[];
  recent_payments: { received_at: string; amount: number; method: PaymentMethod; reversed: boolean }[];
};

export type FamilyDashboardData = { institution_name: string; bkash_number: string | null; children: ChildSummary[] };

export type BatchMember = {
  student_id: string;
  roll_no: string;
  name: string;
  guardian_phone: string | null;
  month_amount: number;
  month_paid: number;
  month_status: "due" | "partial" | "paid" | "waived" | null;
  outstanding: number;
  attendance: number | null;
};
