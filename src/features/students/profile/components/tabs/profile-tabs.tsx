import { SegmentTabs } from "@/components/ui";
import { useLang } from "@/lib/i18n";

export type ProfileTab = "fees" | "attendance" | "messages";

/** ফি ও পেমেন্ট · হাজিরা · মেসেজ, on the white panel that holds the chosen tab. */
export function ProfileTabs({ value, onChange, children }: { value: ProfileTab; onChange: (t: ProfileTab) => void; children: React.ReactNode }) {
  const { tr } = useLang();
  return (
    <section className="rounded-[24px] bg-white p-4 sm:p-5">
      <SegmentTabs<ProfileTab>
        value={value}
        onChange={onChange}
        fill
        label={tr("প্রোফাইলের অংশ", "Profile sections")}
        className="mb-4 text-[14px]"
        options={[
          { value: "fees", label: tr("ফি ও পেমেন্ট", "Fees & payments") },
          { value: "attendance", label: tr("হাজিরা", "Attendance") },
          { value: "messages", label: tr("মেসেজ", "Messages") },
        ]}
      />
      <div role="tabpanel">{children}</div>
    </section>
  );
}
