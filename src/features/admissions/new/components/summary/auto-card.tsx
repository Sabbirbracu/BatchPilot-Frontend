import { useLang } from "@/lib/i18n";

/** ভর্তি হলেই নিজে নিজে — what happens on its own once the student is admitted. */
export function AutoCard() {
  const { tr } = useLang();
  const items = [
    tr("অভিভাবকের ফোনে স্বাগতম SMS", "Welcome SMS to the guardian"),
    tr("স্টুডেন্ট আইডি তৈরি হবে", "Student ID is created"),
    tr("হাজিরা ও ফির খবর অভিভাবক পাবেন", "Guardian gets attendance and fee updates"),
  ];
  return (
    <section className="rounded-[24px] bg-[linear-gradient(170deg,#EFE6FF,#F7F5FC)] px-5 py-5">
      <h3 className="m-0 mb-2 text-[16px] font-bold text-[#5B21B6]">{tr("ভর্তি হলেই নিজে নিজে", "Once admitted, automatically")}</h3>
      <ul className="m-0 list-none space-y-1.5 p-0 text-[14px] text-[#3B3850]">
        {items.map((x) => (
          <li key={x}>✓ {x}</li>
        ))}
      </ul>
    </section>
  );
}
