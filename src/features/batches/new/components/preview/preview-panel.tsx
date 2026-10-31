import { taka, num } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Batch } from "@/lib/types";
import { DraftCard } from "./draft-card";

/**
 * Right column: the live preview, what a full batch brings in, and what happens on its own.
 * The last card stretches so the column ends level with the form.
 */
export function PreviewPanel({ batch: b }: { batch: Batch }) {
  const { tr, lang } = useLang();
  const course = b.fee_plan === "course";
  const per = course ? (b.course_fee ?? 0) : b.monthly_fee;
  const seats = b.capacity ?? 0;
  return (
    <aside className="flex min-w-0 flex-col gap-3">
      <section className="rounded-[24px] bg-[linear-gradient(170deg,#EFE6FF,#F7F5FC)] p-4">
        <p className="m-0 mb-3 flex items-center gap-1.5 text-[13px] font-bold text-[#5B21B6]">
          <span className="size-[7px] rounded-full bg-[#12B76A]" />
          {tr("প্রিভিউ · ব্যাচ তালিকায় এভাবে দেখাবে", "Preview · how it shows in the batch list")}
        </p>
        <DraftCard batch={b} />
      </section>
      {seats > 0 && per > 0 && (
        <section className="flex items-center gap-2.5 rounded-[20px] bg-[#ECFDF3] px-4 py-3.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#039855" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
          </svg>
          <p className="m-0 flex-1 text-[13px] text-[#05603A]">
            {course
              ? tr(`${num(seats, lang)} জন হলে পুরো কোর্সে আনুমানিক`, `With ${seats} students, the course brings about`)
              : tr(`${num(seats, lang)} জন হলে মাসে আনুমানিক`, `With ${seats} students, about`)}
          </p>
          <b className="num text-[16px] text-[#05603A]">{taka(per * seats, lang)}</b>
        </section>
      )}
      <section className="flex-1 rounded-[22px] bg-white px-4 py-3">
        <p className="m-0 mb-1.5 text-[13px] font-bold">{tr("তৈরি হলে নিজে নিজে", "Once it is created")}</p>
        <ul className="m-0 list-none space-y-1 p-0 text-[12.5px] leading-[1.6] text-[#6B6880]">
          <li>✓ {tr("ভর্তির QR বানিয়ে লিফলেটে দিতে পারবেন", "You can make an admission QR for leaflets")}</li>
          <li>
            ✓{" "}
            {course
              ? tr("ভর্তির সময় কোর্স ফি / কিস্তি তৈরি হবে", "Course fee or instalments are set up on admission")
              : tr("প্রতি মাসের ১ তারিখে ফি তৈরি হবে", "Fees are created on the 1st of every month")}
          </li>
          <li>✓ {tr("ক্লাসের দিনে হাজিরা নেওয়া যাবে", "Attendance opens on class days")}</li>
        </ul>
      </section>
    </aside>
  );
}
