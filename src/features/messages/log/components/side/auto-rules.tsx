"use client";

import { Pill, Surface } from "@/components/ui";
import { kindLook } from "@/features/shared/messages/kinds";
import { can, useMe } from "@/lib/auth";
import { num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { useSaveInstitution } from "@/lib/institution";
import { RuleRow } from "./rule-row";

type Setting = "absent_sms" | "receipt_sms" | "reminders_enabled";

/**
 * "অটো SMS নিয়ম": the institution switches for automatic SMS. Arrival SMS needs the fingerprint
 * device and result SMS the exams module, so those two stay off until then.
 */
export function AutoRules() {
  const { tr, lang } = useLang();
  const { data: me } = useMe();
  const save = useSaveInstitution();
  const s = me?.institution?.settings ?? {};
  const canEdit = can(me, "settings.manage") && !save.isPending;
  const value = (k: Setting) => s[k] ?? true;
  const set = (k: Setting) => (v: boolean) => save.mutate({ settings: { [k]: v } });
  const live: Setting[] = ["absent_sms", "receipt_sms", "reminders_enabled"];
  const onCount = live.filter(value).length;

  return (
    <Surface className="px-4 py-3">
      <div className="mb-0.5 flex items-center">
        <h2 className="m-0 flex-1 text-[16px] font-bold">{tr("অটো SMS নিয়ম", "Automatic SMS")}</h2>
        <Pill bg="#ECFDF3" fg="#039855">
          {tr(`${num(onCount, lang)}টা চালু`, `${onCount} on`)}
        </Pill>
      </div>
      <RuleRow
        look={kindLook("present")}
        name={tr("হাজিরার SMS", "Arrival SMS")}
        when={tr("আঙুলের ডিভাইস যুক্ত হলে চালু হবে", "Starts with the fingerprint device")}
        on={false}
        onChange={() => {}}
        disabled
      />
      <RuleRow
        look={kindLook("absent")}
        name={tr("অনুপস্থিত SMS", "Absence SMS")}
        when={tr("হাজিরা নেওয়ার পর, যারা আসেনি", "After attendance, for those absent")}
        on={value("absent_sms")}
        onChange={set("absent_sms")}
        disabled={!canEdit}
      />
      <RuleRow
        look={kindLook("receipt")}
        name={tr("ফি-র রশিদ", "Fee receipt")}
        when={tr("টাকা জমা নিলেই", "As soon as money is taken")}
        on={value("receipt_sms")}
        onChange={set("receipt_sms")}
        disabled={!canEdit}
      />
      <RuleRow
        look={kindLook("reminder_1")}
        name={tr("বকেয়া রিমাইন্ডার", "Due reminders")}
        when={tr("৩ ধাপে, ভদ্র ভাষায়", "In 3 polite steps")}
        on={value("reminders_enabled")}
        onChange={set("reminders_enabled")}
        disabled={!canEdit}
      />
      <RuleRow
        look={kindLook("result")}
        name={tr("রেজাল্ট SMS", "Result SMS")}
        when={tr("পরীক্ষা মডিউল এলে চালু হবে", "Starts with the exams module")}
        on={false}
        onChange={() => {}}
        disabled
      />
    </Surface>
  );
}
