import { Switch } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { Labeled } from "./labeled";

/** "ভর্তি ফি নেবেন?" — a switch box the same height as the admission fee field beside it. */
export function AdmissionToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  const { tr } = useLang();
  return (
    <Labeled label={tr("ভর্তি ফি নেবেন?", "Charge admission?")}>
      <div className="flex h-[46px] items-center gap-3 rounded-[13px] bg-[#F7F5FC] px-[13px]">
        <span className="flex-1 text-[13px] text-[#6B6880]">{value ? tr("হ্যাঁ, ভর্তির সময় একবার", "Yes, once on joining") : tr("না, ভর্তি ফি নেই", "No admission fee")}</span>
        <Switch checked={value} onChange={onChange} label={tr("ভর্তি ফি নেবেন?", "Charge admission?")} />
      </div>
    </Labeled>
  );
}
