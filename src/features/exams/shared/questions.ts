import type { T } from "@/features/shared/preview/text";

export type Level = "SSC" | "HSC" | "Admission";
export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: string;
  level: Level;
  subject: T;
  chapter: T;
  text: T;
  options: T[];
  answer: number;
  difficulty: Difficulty;
  used: number; // times used in papers
};

export const SUBJECTS: { key: string; name: T; level: Level }[] = [
  { key: "phy", name: { bn: "পদার্থবিজ্ঞান", en: "Physics" }, level: "HSC" },
  { key: "bio", name: { bn: "জীববিজ্ঞান", en: "Biology" }, level: "HSC" },
  { key: "math", name: { bn: "গণিত", en: "Math" }, level: "SSC" },
];

const phy = SUBJECTS[0].name;
const bio = SUBJECTS[1].name;
const math = SUBJECTS[2].name;
const vec = { bn: "ভেক্টর", en: "Vectors" };
const motion = { bn: "গতিবিদ্যা", en: "Motion" };
const cell = { bn: "কোষ বিভাজন", en: "Cell division" };
const gen = { bn: "জিনতত্ত্ব", en: "Genetics" };
const alg = { bn: "বীজগাণিতিক রাশি", en: "Algebraic expressions" };
const tri = { bn: "ত্রিকোণমিতি", en: "Trigonometry" };

const o = (...xs: [string, string][]) => xs.map(([bn, en]) => ({ bn, en }));

// Our own sample questions (question content must be ours or licensed — never copied from another bank).
export const QUESTIONS: Question[] = [
  { id: "q1", level: "HSC", subject: phy, chapter: vec, text: { bn: "দুটি ভেক্টরের লব্ধি সর্বোচ্চ হয় যখন তাদের মধ্যবর্তী কোণ —", en: "The resultant of two vectors is largest when the angle between them is —" }, options: o(["০°", "0°"], ["৪৫°", "45°"], ["৯০°", "90°"], ["১৮০°", "180°"]), answer: 0, difficulty: "easy", used: 6 },
  { id: "q2", level: "HSC", subject: phy, chapter: vec, text: { bn: "একক ভেক্টরের মান কত?", en: "What is the magnitude of a unit vector?" }, options: o(["০", "0"], ["১", "1"], ["২", "2"], ["অসীম", "Infinite"]), answer: 1, difficulty: "easy", used: 9 },
  { id: "q3", level: "HSC", subject: phy, chapter: vec, text: { bn: "A·B = 0 হলে ভেক্টর দুটি পরস্পর —", en: "If A·B = 0, the two vectors are —" }, options: o(["সমান্তরাল", "Parallel"], ["লম্ব", "Perpendicular"], ["সমান", "Equal"], ["বিপরীত", "Opposite"]), answer: 1, difficulty: "medium", used: 4 },
  { id: "q4", level: "HSC", subject: phy, chapter: motion, text: { bn: "স্থির অবস্থান থেকে পড়ন্ত বস্তুর ২ সেকেন্ড পর বেগ কত? (g = 9.8 m/s²)", en: "Velocity of a body falling from rest after 2 s? (g = 9.8 m/s²)" }, options: o(["৪.৯ m/s", "4.9 m/s"], ["৯.৮ m/s", "9.8 m/s"], ["১৯.৬ m/s", "19.6 m/s"], ["৩৯.২ m/s", "39.2 m/s"]), answer: 2, difficulty: "medium", used: 3 },
  { id: "q5", level: "HSC", subject: phy, chapter: motion, text: { bn: "নিউটনের প্রথম সূত্র থেকে কোন রাশির ধারণা পাওয়া যায়?", en: "Newton's first law gives the idea of —" }, options: o(["বল", "Force"], ["ভর", "Mass"], ["জড়তা", "Inertia"], ["ত্বরণ", "Acceleration"]), answer: 2, difficulty: "easy", used: 7 },
  { id: "q6", level: "HSC", subject: bio, chapter: cell, text: { bn: "মাইটোসিসের কোন দশায় ক্রোমোসোম বিষুবীয় অঞ্চলে সারিবদ্ধ হয়?", en: "In which mitosis stage do chromosomes line up at the equator?" }, options: o(["প্রোফেজ", "Prophase"], ["মেটাফেজ", "Metaphase"], ["অ্যানাফেজ", "Anaphase"], ["টেলোফেজ", "Telophase"]), answer: 1, difficulty: "easy", used: 11 },
  { id: "q7", level: "HSC", subject: bio, chapter: cell, text: { bn: "ক্রসিং ওভার ঘটে মিয়োসিসের কোন উপদশায়?", en: "Crossing over happens in which sub-stage of meiosis?" }, options: o(["লেপ্টোটিন", "Leptotene"], ["জাইগোটিন", "Zygotene"], ["প্যাকাইটিন", "Pachytene"], ["ডিপ্লোটিন", "Diplotene"]), answer: 2, difficulty: "hard", used: 5 },
  { id: "q8", level: "HSC", subject: bio, chapter: gen, text: { bn: "মেন্ডেলের একসংকর ক্রসে F₂ জনুতে ফিনোটাইপের অনুপাত —", en: "Phenotype ratio in F₂ of Mendel's monohybrid cross —" }, options: o(["১:১", "1:1"], ["৩:১", "3:1"], ["১:২:১", "1:2:1"], ["৯:৩:৩:১", "9:3:3:1"]), answer: 1, difficulty: "medium", used: 8 },
  { id: "q9", level: "SSC", subject: math, chapter: alg, text: { bn: "(a + b)² এর বিস্তৃতি কোনটি?", en: "Which is the expansion of (a + b)²?" }, options: o(["a² + b²", "a² + b²"], ["a² + 2ab + b²", "a² + 2ab + b²"], ["a² − 2ab + b²", "a² − 2ab + b²"], ["2a + 2b", "2a + 2b"]), answer: 1, difficulty: "easy", used: 12 },
  { id: "q10", level: "SSC", subject: math, chapter: alg, text: { bn: "x + 1/x = 3 হলে x² + 1/x² = কত?", en: "If x + 1/x = 3, then x² + 1/x² = ?" }, options: o(["৭", "7"], ["৯", "9"], ["১১", "11"], ["৫", "5"]), answer: 0, difficulty: "medium", used: 6 },
  { id: "q11", level: "SSC", subject: math, chapter: tri, text: { bn: "sin 30° এর মান কত?", en: "What is sin 30°?" }, options: o(["০", "0"], ["১/২", "1/2"], ["√৩/২", "√3/2"], ["১", "1"]), answer: 1, difficulty: "easy", used: 10 },
  { id: "q12", level: "SSC", subject: math, chapter: tri, text: { bn: "tan θ = 1 হলে θ এর মান —", en: "If tan θ = 1, then θ is —" }, options: o(["৩০°", "30°"], ["৪৫°", "45°"], ["৬০°", "60°"], ["৯০°", "90°"]), answer: 1, difficulty: "easy", used: 5 },
];
