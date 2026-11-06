"use client";

import { SampleNote } from "@/features/shared/preview/sample-note";
import { useLang } from "@/lib/i18n";

/** Page frame shared by the exam screens: header, the sample-data note, then the content. */
export function ExamPage({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  const { tr } = useLang();
  return (
    <div className="space-y-4 text-[#17161F] [line-height:normal] md:space-y-5">
      {header}
      <SampleNote>{tr("নমুনা দেখানো হচ্ছে — পরীক্ষা মডিউল চালু হলে এখানে আপনার আসল ডেটা দেখাবে।", "Showing examples. Your own data appears here once the exam module is switched on.")}</SampleNote>
      {children}
    </div>
  );
}
