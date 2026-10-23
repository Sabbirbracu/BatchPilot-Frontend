import type { Batch, TeacherDashboardData } from "@/lib/types";

// Two kinds of made-up data live here, and nowhere else:
//
// 1. MOCK — numbers for features the backend does not have yet (fingerprint device,
//    admission requests, exams, automation log, plans). Replace each as the feature ships.
// 2. DEMO — a complete dashboard that matches the design mockup, shown while DEMO_MODE is
//    on. Turn DEMO_MODE off to show the live API data instead.

export const DEMO_MODE = true;

export const MOCK = {
  device: { online: true, room: ["রুম ২", "Room 2"] as const },
  admissions: { pending: 6 },
  reminderTime: ["কাল ৯টায়", "tomorrow 9am"] as const,
  automation: { attendanceSms: 136 },
  plan: { name: "Basic", studentLimit: 300 },
  exams: [{ id: "mock-exam-1", start: "17:00", title: "SSC ২৬ · মডেল টেস্ট ৪", students: 28 }],
  marksDrops: [{ id: "mock-marks-1", name: "নুসরাত", dropPct: 25 }],
  unknownFinger: true,
};

const id = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const at = (hhmm: string) => `2026-10-23T${hhmm}:00+06:00`;

type DemoRoutine = Pick<Batch, "id" | "name" | "subject" | "start_time" | "days" | "student_count">;

export const DEMO = {
  ownerName: "রফিক",
  /** Wall-clock the demo pretends it is (10:20 am), so the HSC class shows as running. */
  now: 10 * 60 + 20,
  remindersOn: true,
  data: {
    date: "2026-10-23",
    month: "2026-10-01",
    today_collected: 1_440_000,
    today_count: 12,
    month_collected: 18_200_000,
    total_due: 5_760_000,
    due_students: 54,
    overdue_2m_students: 5,
    month_rate: 76,
    last_month_rate: 71,
    absent_today: 18,
    active_students: 286,
    batches: [],
    top_dues: [
      { student_id: id(31), name: "আরিফ", roll_no: "22", outstanding: 240_000, months: 2 },
      { student_id: id(32), name: "সুমাইয়া", roll_no: "09", outstanding: 240_000, months: 2 },
    ],
    collectors_today: [],
    attendance_rate_today: 89,
    attendance_rate_last_week: 86,
    today_classes: [
      { batch_id: id(1), name: "SSC ২৬", subject: "গণিত (A)", room: "রুম ৬", start_time: "07:00", end_time: "08:30", scheduled_today: true, student_count: 45, taken: true, present: 42, absent: 3, absent_names: [] },
      { batch_id: id(2), name: "SSC ২৬", subject: "গণিত (B)", room: "রুম ৬", start_time: "08:30", end_time: "10:00", scheduled_today: true, student_count: 40, taken: true, present: 38, absent: 2, absent_names: [] },
      { batch_id: id(3), name: "HSC ২৭", subject: "উচ্চতর গণিত", room: "রুম ২", start_time: "10:00", end_time: "11:30", scheduled_today: true, student_count: 58, taken: true, present: 51, absent: 7, absent_names: ["তানভীর", "মাহি", "ফাহিম"] },
      { batch_id: id(4), name: "Class ৯", subject: "গণিত", room: "রুম ৬", start_time: "15:00", end_time: "16:30", scheduled_today: true, student_count: 35, taken: false, present: 0, absent: 0, absent_names: [] },
    ],
    live_marks: [
      { student_id: id(11), name: "তানিয়া আক্তার", roll_no: "14", batch_name: "HSC ২৭", status: "present", at: at("10:04"), sms_sent: true },
      { student_id: id(12), name: "সাকিব হোসেন", roll_no: "27", batch_name: "HSC ২৭", status: "late", at: at("10:14"), late_minutes: 14 },
    ],
    absent_streaks: [{ student_id: id(21), name: "তানভীর", days: 3 }],
  } satisfies TeacherDashboardData,
  routine: [
    { id: id(1), name: "SSC ২৬ · গণিত (A)", subject: null, start_time: "07:00", days: ["sat", "mon", "wed", "fri"], student_count: 45 },
    { id: id(2), name: "SSC ২৬ · গণিত (B)", subject: null, start_time: "08:30", days: ["sat", "mon", "wed", "fri"], student_count: 40 },
    { id: id(3), name: "HSC ২৭ · উচ্চতর গণিত", subject: null, start_time: "10:00", days: ["sun", "tue", "thu", "fri"], student_count: 58 },
    { id: id(4), name: "Class ৯ · গণিত", subject: null, start_time: "15:00", days: ["sat", "sun", "tue", "fri"], student_count: 35 },
    { id: id(5), name: "HSC ২৬ · পদার্থবিজ্ঞান", subject: null, start_time: "17:30", days: ["sat", "mon", "wed"], student_count: 52 },
  ] satisfies DemoRoutine[],
};

export type { DemoRoutine };
