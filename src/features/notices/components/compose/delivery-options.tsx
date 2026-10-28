import { SegmentTabs } from "@/components/ui";
import { useLang } from "@/lib/i18n";

export type When = "now" | "later";

/** "কীভাবে যাবে" (SMS now; app delivery comes with the guardian app) and "কখন" (now or a set time). */
export function DeliveryOptions({ when, onWhen, at, onAt, minAt }: { when: When; onWhen: (w: When) => void; at: string; onAt: (v: string) => void; minAt: string }) {
  const { tr } = useLang();
  const soon = tr("শীঘ্রই আসছে", "Coming soon");
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      <div>
        <p className="m-0 mb-2 text-[13px] font-bold">{tr("কীভাবে যাবে", "How it goes")}</p>
        <SegmentTabs
          fill
          label={tr("কীভাবে যাবে", "How it goes")}
          value="sms"
          onChange={() => {}}
          options={[
            { value: "sms", label: "SMS" },
            { value: "app", label: tr("অ্যাপে", "In app"), disabled: true, title: soon },
            { value: "both", label: tr("দুটোই", "Both"), disabled: true, title: soon },
          ]}
        />
      </div>
      <div>
        <p className="m-0 mb-2 text-[13px] font-bold">{tr("কখন", "When")}</p>
        <SegmentTabs<When>
          fill
          label={tr("কখন", "When")}
          value={when}
          onChange={onWhen}
          options={[
            { value: "now", label: tr("এখনই", "Now") },
            { value: "later", label: tr("সময় ঠিক করুন", "Pick a time") },
          ]}
        />
        {when === "later" && (
          <input
            type="datetime-local"
            value={at}
            min={minAt}
            onChange={(e) => onAt(e.target.value)}
            aria-label={tr("পাঠানোর সময়", "Send at")}
            className="num mt-2 w-full rounded-[12px] bg-[#F7F5FC] px-3 py-2 text-[13px] outline-none focus:shadow-[inset_0_0_0_1.5px_#C9B3FF]"
          />
        )}
      </div>
    </div>
  );
}
