import { Check, GraduationCap, MessageSquare, Phone, Smartphone, UsersRound } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { GuardianLookup, SeatBatch } from "@/lib/types";
import { phoneDigits, type StudentFields } from "../../use-new-admission";
import { BatchBanner } from "./batch-banner";
import { BatchClass } from "./batch-class";
import { IconInput } from "./icon-input";
import { RelationPicker } from "./relation-picker";
import { SiblingHint } from "./sibling-hint";

/** ধাপ ২ — the student's fields on the card, then the guardian's in a green box. No section titles: each label says whose field it is. */
export function StudentStep({
  batch,
  value: v,
  onChange,
  lookup,
  classes,
  onChangeBatch,
  onNext,
}: {
  batch: SeatBatch;
  value: StudentFields;
  onChange: (v: StudentFields) => void;
  lookup: GuardianLookup | undefined;
  classes: string[];
  onChangeBatch: () => void;
  onNext: () => void;
}) {
  const { tr } = useLang();
  const set = (k: keyof StudentFields) => (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...v, [k]: e.target.value });
  const phoneOk = phoneDigits(v.guardian_phone).length === 11;
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <BatchBanner batch={batch} onChange={onChangeBatch} />

      {/* The student: plain fields on the white card. */}
      <div className="grid gap-3 md:grid-cols-2">
        <IconInput id="ad-name" label={tr("স্টুডেন্টের নাম", "Student's name")} required icon={<UsersRound className="size-[18px]" />} value={v.name} onChange={set("name")} placeholder={tr("যেমন: রাফিক আহমেদ", "e.g. Rafiq Ahmed")} autoFocus />
        <IconInput
          id="ad-phone"
          label={tr("স্টুডেন্টের মোবাইল", "Student's mobile")}
          optional={tr("(ঐচ্ছিক)", "(optional)")}
          icon={<Smartphone className="size-[18px] text-[#8A86A0]" />}
          value={v.phone}
          onChange={set("phone")}
          inputMode="tel"
          placeholder="01XXXXXXXXX"
          className="num"
        />
        <IconInput id="ad-school" label={tr("স্কুল / কলেজ", "School / college")} icon={<GraduationCap className="size-[18px] text-[#8A86A0]" />} value={v.school} onChange={set("school")} placeholder={tr("যেমন: জিলা স্কুল", "e.g. Zilla School")} />
        {batch.class_level ? (
          <BatchClass label={tr("ক্লাস", "Class")} value={batch.class_level} note={tr("ব্যাচ থেকে", "from batch")} />
        ) : (
          <IconInput
            id="ad-class"
            label={tr("ক্লাস", "Class")}
            value={v.class_level}
            onChange={set("class_level")}
            list={classes}
            end={<span className="pointer-events-none text-[12px] text-[#8A86A0]">▾</span>}
          />
        )}
      </div>

      {/* The guardian: a green box, because every SMS goes to this number. */}
      <div className="flex flex-col gap-3 rounded-[18px] bg-[#F3FBF6] p-3.5 shadow-[inset_0_0_0_1.5px_#D1F2DF]">
        <div className="grid gap-3 md:grid-cols-2">
          <IconInput
            id="ad-guardian-phone"
            label={tr("অভিভাবকের মোবাইল", "Guardian's mobile")}
            required
            icon={<Phone className="size-[18px] text-[#039855]" />}
            value={v.guardian_phone}
            onChange={set("guardian_phone")}
            inputMode="tel"
            placeholder="01XXXXXXXXX"
            className="num text-[16px]"
            end={phoneOk ? <Check className="size-5 text-[#039855]" strokeWidth={2.6} /> : null}
          />
          <IconInput id="ad-guardian-name" label={tr("অভিভাবকের নাম", "Guardian's name")} icon={<UsersRound className="size-[18px] text-[#8A86A0]" />} value={v.guardian_name} onChange={set("guardian_name")} placeholder={tr("যেমন: মোস্তফা কামাল", "e.g. Mostafa Kamal")} />
        </div>
        {lookup && (
          <SiblingHint
            lookup={lookup}
            onFill={() => onChange({ ...v, guardian_name: v.guardian_name || lookup.guardian_name || "", school: v.school || lookup.school || "" })}
          />
        )}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <RelationPicker value={v.guardian_relation} onChange={(guardian_relation) => onChange({ ...v, guardian_relation })} />
          <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#039855]">
            <MessageSquare className="size-4" />
            {tr("সব SMS এই নম্বরে যাবে", "All SMS go to this number")}
          </span>
        </div>
      </div>
      <button type="submit" hidden />
    </form>
  );
}
