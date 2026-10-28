import { PhonePreview } from "@/features/shared/messages/sms-preview";
import { useLang } from "@/lib/i18n";

/** "৩. অভিভাবক যা দেখবেন": the phone mock-up with the text filled in for a real student. */
export function TemplatePreview({ sender, time, text, example }: { sender: string; time: string; text: string; example: string | null }) {
  const { tr } = useLang();
  return (
    <div className="flex flex-col items-center rounded-[24px] bg-[linear-gradient(170deg,#F4EEFF,#FAF9FD)] p-4">
      <p className="m-0 mb-3 self-start text-[13px] font-bold text-[#5B21B6]">{tr("৩. অভিভাবক যা দেখবেন", "3. What the guardian sees")}</p>
      <PhonePreview sender={sender} time={tr(`আজ ${time}`, `Today ${time}`)} text={text} />
      {example && (
        <p className="m-0 mt-2.5 text-center text-[11.5px] text-[#6B6880]">
          {tr("উদাহরণ", "Example")}: {example}
        </p>
      )}
    </div>
  );
}
