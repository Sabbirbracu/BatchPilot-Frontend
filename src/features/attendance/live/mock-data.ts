import type { BatchChipData, BatchDetail, LiveEvent, StudentMark } from "./types";

// Demo attendance that matches the design mockups. Shown while DEMO_MODE is on; turn it off
// to use the API (fingerprint times, SMS state, streaks and the weekly chart need backend
// support that does not exist yet, so those parts stay empty with live data).
export const DEMO_MODE = true;

const id = (n: number) => `00000000-0000-4000-9000-${String(n).padStart(12, "0")}`;

const BATCHES: BatchChipData[] = [
  { id: id(1), start: "07:00", end: "08:30", label: "SSC গণিত (A)", short: "SSC (A)", name: "SSC ২৬", subject: "গণিত (A)", state: "done", present: 42, total: 45 },
  { id: id(2), start: "08:30", end: "10:00", label: "SSC গণিত (B)", short: "SSC (B)", name: "SSC ২৬", subject: "গণিত (B)", state: "done", present: 38, total: 40 },
  { id: id(3), start: "10:00", end: "11:30", label: "HSC উচ্চতর গণিত", short: "HSC উচ্চতর", name: "HSC ২৭", subject: "উচ্চতর গণিত", state: "live", present: 51, total: 58 },
  { id: id(4), start: "15:00", end: "16:30", label: "Class ৯", short: "Class ৯", name: "Class ৯", subject: "গণিত", state: "upcoming", present: 0, total: 35 },
  { id: id(5), start: "17:00", end: null, label: "মডেল টেস্ট", short: "মডেল টেস্ট", name: "SSC ২৬", subject: "মডেল টেস্ট ৪", state: "exam", present: 0, total: 28 },
];

const RED = { bg: "#FECDCA", fg: "#B42318" };

const HSC_MARKS: StudentMark[] = [
  { id: id(103), code: "১০০১০৩", name: "তানভীর হাসান", initial: "ত", status: "absent", time: null, sms: "scheduled", streak: 3, monthRate: 62, phone: null, tone: RED },
  { id: id(107), code: "১০০১০৭", name: "তানিয়া আক্তার", initial: "ত", status: "present", time: "09:58", sms: "sent", monthRate: 96, phone: null, tone: { bg: "#FFD75E", fg: "#3B1782" } },
  { id: id(111), code: "১০০১১১", name: "সাকিব হোসেন", initial: "স", status: "late", time: "10:14", lateMinutes: 14, sms: "sent", monthRate: 84, phone: null, tone: { bg: "#C9B3FF", fg: "#3B1782" } },
  { id: id(114), code: "১০০১১৪", name: "নুসরাত জাহান", initial: "ন", status: "present", time: "09:55", sms: "sent", monthRate: 92, phone: null, tone: { bg: "#BFF0D6", fg: "#05603A" } },
  { id: id(119), code: "১০০১১৯", name: "রাফি আহমেদ", status: "absent", time: null, sms: "scheduled", monthRate: 78, phone: null, tone: RED },
  { id: id(122), code: "১০০১২২", name: "মিম আক্তার", status: "present", time: "09:59", sms: "sent", monthRate: 100, phone: null, tone: { bg: "#F4EEFF", fg: "#5B21B6" } },
  { id: id(125), code: "১০০১২৫", name: "আরিফ রহমান", initial: "আ", status: "present", time: "10:01", sms: "sent", monthRate: 88, phone: null, tone: { bg: "#EEF4FF", fg: "#3E63DD" } },
  { id: id(128), code: "১০০১২৮", name: "সাদিয়া ইসলাম", status: "present", time: "10:08", sms: "sent", manual: true, monthRate: 90, phone: null, tone: { bg: "#FFF7DB", fg: "#7A5800" } },
];

/** Finished morning batches get a short generated roster so every chip has something to show. */
const POOL = ["আয়েশা সিদ্দিকা", "ইমরান হোসেন", "জান্নাতুল ফেরদৌস", "মাহমুদুল হাসান", "সুমাইয়া আক্তার", "রিয়াদ হোসেন", "ফারিহা ইসলাম", "নাঈম আহমেদ"];
const BN = "০১২৩৪৫৬৭৮৯";
const bn = (n: number) => String(n).padStart(2, "0").replace(/\d/g, (d) => BN[Number(d)]);

function generated(b: BatchChipData): BatchDetail {
  const absent = b.total - b.present;
  const marks: StudentMark[] = POOL.map((name, i) => {
    const status = i < absent ? "absent" : "present";
    return {
      id: `${b.id}-${i}`,
      code: bn(100000 + i * 4 + 2),
      name,
      status,
      time: status === "absent" ? null : `${b.start.slice(0, 2)}:${String(i * 3).padStart(2, "0")}`,
      sms: "sent",
      monthRate: 80 + ((i * 7) % 20),
      phone: null,
    };
  });
  return { onTime: b.present, late: 0, absent, total: b.total, marks };
}

const DETAILS: Record<string, BatchDetail> = {
  [id(3)]: { onTime: 49, late: 2, absent: 7, total: 58, marks: HSC_MARKS },
  [id(1)]: generated(BATCHES[0]),
  [id(2)]: generated(BATCHES[1]),
  [id(4)]: { onTime: 0, late: 0, absent: 0, total: 35, marks: [] },
  [id(5)]: { onTime: 0, late: 0, absent: 0, total: 28, marks: [] },
};

const LIVE: LiveEvent[] = [
  { kind: "late", name: "সাকিব হোসেন", minutes: 14, time: "10:14" },
  { kind: "manual", name: "সাদিয়া ইসলাম", by: "মামুন (সহকারী)", time: "10:08" },
  { kind: "unknown" },
];

export const DEMO = {
  date: "2026-10-23",
  now: 10 * 60 + 20, // 10:20 am, so the HSC class is running
  device: { room: "রুম ২", online: true },
  batches: BATCHES,
  defaultBatchId: id(3),
  details: DETAILS,
  live: LIVE,
  autoSms: { at: "10:30" },
  week: [
    { label: "শনি", rate: 84 },
    { label: "রবি", rate: 88 },
    { label: "সোম", rate: 82 },
    { label: "মঙ্গল", rate: 90 },
    { label: "বুধ", rate: 86 },
    { label: "বৃহঃ", rate: 91 },
    { label: "আজ", rate: 88, today: true },
  ],
};

/** Device status for live data too: devices don't report in yet. */
export const MOCK_DEVICE = DEMO.device;
