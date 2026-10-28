import { MessageCardPreview } from "@/features/shared/messages/sms-preview";
import { useLang } from "@/lib/i18n";

/** Lavender card: the notice as it lands on a guardian's phone. */
export function NoticePreview({ sender, text }: { sender: string; text: string }) {
  const { tr } = useLang();
  return (
    <section className="rounded-[22px] bg-[linear-gradient(160deg,#EFE6FF,#FFFFFF)] p-4">
      <p className="m-0 mb-2.5 text-[12.5px] font-bold text-[#5B21B6]">{tr("অভিভাবকের ফোনে যেভাবে যাবে", "How it reaches the guardian's phone")}</p>
      <MessageCardPreview sender={sender} time={tr("এখন", "now")} text={text} />
    </section>
  );
}
