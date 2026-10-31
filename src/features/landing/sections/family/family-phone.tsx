import { PhoneFrame } from "../../components/phone-frame";

/** The shared student/guardian app: child switcher, due and attendance, class time, a notice. */
export function FamilyPhone() {
  return (
    <PhoneFrame className="mx-auto">
      <p className="m-0 text-[16px] font-extrabold">আমার পড়াশোনা</p>
      <p className="m-0 text-[10.5px] text-[#6B6880]">০১৭১১-৪৫৬৭৮৯</p>
      <div className="mt-2.5 flex gap-1.5 text-[10.5px] font-bold">
        <span className="rounded-full bg-[#5B21B6] px-2.5 py-1 text-white">সবাই</span>
        <span className="rounded-full bg-white px-2.5 py-1 text-[#4A4760]">নুসরাত</span>
        <span className="rounded-full bg-white px-2.5 py-1 text-[#4A4760]">নাবিল</span>
      </div>
      <p className="m-0 mt-3 text-[10.5px] font-bold text-[#5B21B6]">রফিক স্যারের কোচিং</p>
      <div className="mt-1.5 rounded-[16px] bg-white p-2.5">
        <p className="m-0 text-[13px] font-extrabold">নুসরাত জাহান</p>
        <p className="m-0 text-[10px] text-[#6B6880]">আইডি ১০০৪০১ · HSC 2026</p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <div className="rounded-[10px] bg-[#FAF9FD] p-2">
            <p className="m-0 text-[9.5px] text-[#6B6880]">বকেয়া</p>
            <p className="m-0 text-[15px] font-extrabold text-[#039855]">৳০</p>
          </div>
          <div className="rounded-[10px] bg-[#FAF9FD] p-2">
            <p className="m-0 text-[9.5px] text-[#6B6880]">উপস্থিতি</p>
            <p className="m-0 text-[15px] font-extrabold">৯৬%</p>
          </div>
        </div>
        <p className="m-0 mt-2 rounded-[9px] bg-[#F7F5FC] px-2 py-1.5 text-[10px]">
          <b>HSC ২০২৬ ফাইনাল</b> · রবি, মঙ্গল · সকাল ৯:০০
        </p>
        <p className="m-0 mt-1.5 rounded-[9px] bg-[#FFFAEB] px-2 py-1.5 text-[10px] text-[#7A2E0E]">নোটিশ: শুক্রবার মডেল টেস্ট, সময়মতো আসবে।</p>
      </div>
      <div className="mt-2 rounded-[16px] bg-white p-2.5">
        <p className="m-0 text-[13px] font-extrabold">নাবিল হাসান</p>
        <div className="mt-1 flex items-center justify-between text-[10.5px]">
          <span className="text-[#6B6880]">নভেম্বর মাসের ফি</span>
          <b className="text-[#D92D20]">৳১,২০০ বাকি</b>
        </div>
      </div>
    </PhoneFrame>
  );
}
