"use client";

import { BookOpen, FolderTree, Library, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Empty, FilterChip, PrimaryButton, SearchField, SegmentTabs } from "@/components/ui";
import { StatStrip } from "@/features/shared/preview/stat-strip";
import { pick } from "@/features/shared/preview/text";
import { useSoon } from "@/features/shared/preview/use-soon";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { ExamPage } from "../shared/exam-page";
import { type Difficulty, type Level, QUESTIONS, SUBJECTS } from "../shared/questions";
import { QuestionCard } from "./components/question-card";
import { SelectionBar } from "./components/selection-bar";

// প্রশ্ন ব্যাংক — class → subject → chapter, filter by difficulty, pick questions, then build a paper from them.
export default function QuestionBankPage() {
  const { tr, lang } = useLang();
  const soon = useSoon();
  const [level, setLevel] = useState<Level | "all">("all");
  const [subject, setSubject] = useState<string | null>(null);
  const [chapter, setChapter] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  const subjects = SUBJECTS.filter((s) => level === "all" || s.level === level);
  const subjectName = SUBJECTS.find((s) => s.key === subject)?.name.en;
  const inSubject = QUESTIONS.filter((x) => (level === "all" || x.level === level) && (!subjectName || x.subject.en === subjectName));
  const chapters = [...new Map(inSubject.map((x) => [x.chapter.en, x.chapter])).values()];
  const needle = q.trim().toLowerCase();
  const shown = inSubject.filter(
    (x) => (!chapter || x.chapter.en === chapter) && (!difficulty || x.difficulty === difficulty) && (!needle || `${x.text.bn} ${x.text.en}`.toLowerCase().includes(needle)),
  );
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const chapterCount = new Set(QUESTIONS.map((x) => x.chapter.en)).size;

  return (
    <ExamPage
      header={
        <AppHeader
          title={tr("প্রশ্ন ব্যাংক", "Question bank")}
          subtitle={tr("বাছাই করুন, তারপর এক ক্লিকে প্রশ্নপত্র", "Pick questions, then build a paper in one go")}
          toolbar={
            <PrimaryButton onClick={soon} className="max-md:flex-1">
              <Plus className="size-[18px]" strokeWidth={2.2} />
              {tr("নতুন প্রশ্ন", "New question")}
            </PrimaryButton>
          }
        />
      }
    >
      <StatStrip
        items={[
          { icon: <Library className="size-5" />, iconBg: "#F4EEFF", iconFg: "#5B21B6", label: tr("মোট প্রশ্ন", "Questions"), value: num(QUESTIONS.length, lang) },
          { icon: <BookOpen className="size-5" />, iconBg: "#EFF8FF", iconFg: "#1570EF", label: tr("বিষয়", "Subjects"), value: num(SUBJECTS.length, lang) },
          { icon: <FolderTree className="size-5" />, iconBg: "#ECFDF3", iconFg: "#039855", label: tr("অধ্যায়", "Chapters"), value: num(chapterCount, lang) },
          { icon: <Sparkles className="size-5" />, iconBg: "#FFF7DB", iconFg: "#B07C00", label: tr("আমার বানানো", "Written by you"), value: num(4, lang) },
        ]}
      />
      <div className="space-y-2.5 rounded-[20px] bg-white p-3">
        <div className="flex flex-col gap-2.5 md:flex-row md:items-center">
          <SegmentTabs<Level | "all">
            value={level}
            onChange={(v) => {
              setLevel(v);
              setSubject(null);
              setChapter(null);
            }}
            fill
            label={tr("শ্রেণি", "Class")}
            className="md:w-[320px]"
            options={[
              { value: "all", label: tr("সব", "All") },
              { value: "SSC", label: "SSC" },
              { value: "HSC", label: "HSC" },
              { value: "Admission", label: tr("ভর্তি", "Admission") },
            ]}
          />
          <SearchField value={q} onChange={setQ} placeholder={tr("প্রশ্ন খুঁজুন", "Search questions")} look="panel" className="md:flex-1" />
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          <FilterChip active={!subject} onClick={() => (setSubject(null), setChapter(null))} className="py-2">
            {tr("সব বিষয়", "All subjects")}
          </FilterChip>
          {subjects.map((s) => (
            <FilterChip key={s.key} active={subject === s.key} onClick={() => (setSubject(s.key), setChapter(null))} className="py-2">
              {pick(s.name, lang)}
            </FilterChip>
          ))}
          <span className="mx-1 w-px flex-none bg-[#ECEAF4]" aria-hidden />
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
            <FilterChip key={d} active={difficulty === d} onClick={() => setDifficulty(difficulty === d ? null : d)} className="py-2">
              {d === "easy" ? tr("সহজ", "Easy") : d === "medium" ? tr("মাঝারি", "Medium") : tr("কঠিন", "Hard")}
            </FilterChip>
          ))}
        </div>
        {subject && chapters.length > 0 && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            <FilterChip active={!chapter} onClick={() => setChapter(null)} className="py-2">
              {tr("সব অধ্যায়", "All chapters")}
            </FilterChip>
            {chapters.map((c) => (
              <FilterChip key={c.en} active={chapter === c.en} onClick={() => setChapter(c.en)} className="py-2">
                {pick(c, lang)}
              </FilterChip>
            ))}
          </div>
        )}
      </div>
      {shown.length ? (
        <section aria-label={tr("প্রশ্নের তালিকা", "Question list")} className="grid grid-cols-[minmax(0,1fr)] gap-3 xl:grid-cols-2">
          {shown.map((x, i) => (
            <QuestionCard key={x.id} q={x} n={i + 1} selected={picked.includes(x.id)} onToggle={() => toggle(x.id)} />
          ))}
        </section>
      ) : (
        <Empty title={tr("এমন কোনো প্রশ্ন নেই", "No matching questions")} />
      )}
      <SelectionBar ids={picked} onClear={() => setPicked([])} />
    </ExamPage>
  );
}
