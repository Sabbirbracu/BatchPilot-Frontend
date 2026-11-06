"use client";

import { Field, Input, SegmentTabs, Select, Surface, Switch } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { PaperSettings } from "../paper";

/** Everything printed on the paper besides the questions: title, time, marks, layout. */
export function PaperSettingsCard({ value: s, onChange }: { value: PaperSettings; onChange: (s: PaperSettings) => void }) {
  const { tr } = useLang();
  const set = <K extends keyof PaperSettings>(k: K, v: PaperSettings[K]) => onChange({ ...s, [k]: v });
  return (
    <Surface className="space-y-3.5 p-4 md:p-5">
      <h2 className="m-0 text-[16px] font-bold">{tr("প্রশ্নপত্রের সেটিং", "Paper settings")}</h2>
      <Field label={tr("পরীক্ষার নাম", "Exam title")}>
        <Input value={s.title} onChange={(e) => set("title", e.target.value)} />
      </Field>
      <Field label={tr("বিষয় / ব্যাচ", "Subject / batch")}>
        <Input value={s.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={tr("সময় (মিনিট)", "Time (minutes)")}>
          <Input inputMode="numeric" className="num" value={String(s.minutes)} onChange={(e) => set("minutes", Number(e.target.value.replace(/\D/g, "")) || 0)} />
        </Field>
        <Field label={tr("প্রতি প্রশ্নে নম্বর", "Marks each")}>
          <Select value={String(s.markEach)} onChange={(e) => set("markEach", Number(e.target.value))}>
            {[1, 2, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label={tr("ভুল উত্তরে কাটা যাবে", "Negative marking")}>
        <Select value={String(s.negative)} onChange={(e) => set("negative", Number(e.target.value))}>
          <option value="0">{tr("কাটা যাবে না", "None")}</option>
          {[0.25, 0.5, 1].map((n) => (
            <option key={n} value={n}>
              −{n}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="m-0 mb-1.5 text-[13px] font-medium text-[#3B3850]">{tr("কলাম", "Columns")}</p>
          <SegmentTabs<"1" | "2">
            value={String(s.columns) as "1" | "2"}
            onChange={(v) => set("columns", Number(v) as 1 | 2)}
            fill
            label={tr("কলাম", "Columns")}
            options={[
              { value: "1", label: tr("১টা", "One") },
              { value: "2", label: tr("২টা", "Two") },
            ]}
          />
        </div>
        <div>
          <p className="m-0 mb-1.5 text-[13px] font-medium text-[#3B3850]">{tr("অপশন", "Options")}</p>
          <SegmentTabs<"bn" | "en">
            value={s.letters}
            onChange={(v) => set("letters", v)}
            fill
            label={tr("অপশনের অক্ষর", "Option letters")}
            options={[
              { value: "bn", label: "ক খ" },
              { value: "en", label: "A B" },
            ]}
          />
        </div>
      </div>
      <div>
        <p className="m-0 mb-1.5 text-[13px] font-medium text-[#3B3850]">{tr("লেখার মাপ", "Text size")}</p>
        <SegmentTabs<PaperSettings["size"]>
          value={s.size}
          onChange={(v) => set("size", v)}
          fill
          label={tr("লেখার মাপ", "Text size")}
          options={[
            { value: "sm", label: tr("ছোট", "Small") },
            { value: "md", label: tr("মাঝারি", "Medium") },
            { value: "lg", label: tr("বড়", "Large") },
          ]}
        />
      </div>
      <div className="flex items-center justify-between gap-3 rounded-[14px] bg-[#FAF9FD] px-3.5 py-2.5">
        <span className="text-[14px] font-medium">{tr("শেষে উত্তরমালা", "Answer key at the end")}</span>
        <Switch checked={s.answerKey} onChange={(v) => set("answerKey", v)} label={tr("শেষে উত্তরমালা", "Answer key at the end")} />
      </div>
    </Surface>
  );
}
