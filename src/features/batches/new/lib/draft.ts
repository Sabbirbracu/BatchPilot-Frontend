import type { Batch, FeePlan } from "@/lib/types";

export type BatchDraft = {
  name: string;
  subject: string;
  class_level: string;
  days: string[];
  start_time: string | null; // "18:00"
  end_time: string | null;
  location: string;
  fee_plan: FeePlan;
  monthly_fee: string; // taka, as typed
  course_fee: string;
  installments: number;
  takes_admission: boolean;
  admission_fee: string;
  capacity: number | null;
  starts_on: string | null; // YYYY-MM-DD
};

export const EMPTY_DRAFT: BatchDraft = {
  name: "",
  subject: "",
  class_level: "",
  days: [],
  start_time: null,
  end_time: null,
  location: "",
  fee_plan: "monthly",
  monthly_fee: "",
  course_fee: "",
  installments: 1,
  takes_admission: false,
  admission_fee: "",
  capacity: 40,
  starts_on: null,
};

const poisha = (taka: string) => Math.round((Number(taka.replace(/[^0-9.]/g, "")) || 0) * 100);

/** The POST /batches body. */
export function toPayload(d: BatchDraft) {
  const course = d.fee_plan === "course";
  return {
    name: d.name.trim(),
    subject: d.subject.trim() || null,
    class_level: d.class_level.trim() || null,
    days: d.days,
    start_time: d.start_time,
    end_time: d.end_time,
    location: d.location.trim() || null,
    fee_plan: d.fee_plan,
    monthly_fee: course ? 0 : poisha(d.monthly_fee),
    course_fee: course ? poisha(d.course_fee) : null,
    installments: course ? d.installments : 1,
    admission_fee: d.takes_admission && d.admission_fee ? poisha(d.admission_fee) : null,
    capacity: d.capacity,
    starts_on: d.starts_on,
  };
}

/** The draft as a brand-new Batch, so the preview can use the batch list's own card pieces. */
export function previewBatch(d: BatchDraft): Batch {
  const p = toPayload(d);
  return {
    ...p,
    id: "preview",
    name: p.name || "নতুন ব্যাচ",
    archived_at: null,
    version: 1,
    student_count: 0,
    month_collected: 0,
    month_due: 0,
    today_present: null,
    today_absent: null,
    due_students: 0,
    month_attendance: null,
    last_month_attendance: null,
  };
}
