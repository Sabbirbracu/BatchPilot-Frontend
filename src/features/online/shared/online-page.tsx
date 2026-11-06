"use client";

import { SampleNote } from "@/features/shared/preview/sample-note";
import { useLang } from "@/lib/i18n";

/** Page frame shared by the online screens: header, the sample-data note, then the content. */
export function OnlinePage({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  const { tr } = useLang();
  return (
    <div className="space-y-4 text-[#17161F] [line-height:normal] md:space-y-5">
      {header}
      <SampleNote>{tr("নমুনা দেখানো হচ্ছে — অনলাইন ক্লাস চালু হলে এখানে আপনার আসল ডেটা দেখাবে।", "Showing examples. Your own data appears here once online classes are switched on.")}</SampleNote>
      {children}
    </div>
  );
}
