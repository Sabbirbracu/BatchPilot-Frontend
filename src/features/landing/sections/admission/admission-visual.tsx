import { PhoneFrame } from "../../components/phone-frame";
import { QrArt } from "../../components/qr-art";

const BATCHES = [
  { name: "সকালের ব্যাচ", when: "শনি, সোম, বুধ · সকাল ৭:০০", place: "স্টেশন রোড শাখা", seats: "১২টি সিট খালি", tone: "bg-[#ECFDF3] text-[#039855]", picked: true },
  { name: "বিকালের ব্যাচ", when: "রবি, মঙ্গল, বৃহঃ · বিকাল ৪:৩০", place: "কলেজ রোড শাখা", seats: "৩টি সিট খালি", tone: "bg-[#FFFAEB] text-[#B54708]", picked: false },
];

/** A leaflet with the QR, and the phone page it opens: the course, the offer and its batches. */
export function AdmissionVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center py-6">
      <div className="absolute top-2 left-0 hidden w-[190px] -rotate-6 rounded-[22px] bg-white p-4 text-center shadow-[0_24px_50px_-26px_rgba(46,16,101,.55)] sm:block">
        <p className="m-0 text-[13px] font-bold text-[#5B21B6]">রফিক স্যারের কোচিং</p>
        <p className="m-0 text-[17px] leading-tight font-extrabold">HSC ICT ২০২৭</p>
        <p className="m-0 mt-1 inline-block rounded-[8px] border-2 border-[#F79009] px-2 text-[12px] font-extrabold text-[#B54708]">ভর্তি ফিতে ২০% ছাড়</p>
        <QrArt size={118} className="mx-auto mt-2" />
        <p className="m-0 mt-1 text-[12px] font-bold">স্ক্যান করে ভর্তি হও</p>
      </div>
      <PhoneFrame className="sm:ml-[150px]">
        <div className="rounded-[18px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] p-3 text-white">
          <p className="m-0 text-[10.5px] text-white/80">রফিক স্যারের কোচিং · বগুড়া</p>
          <p className="m-0 text-[16px] font-extrabold">HSC ICT ব্যাচ ২০২৭</p>
          <span className="mt-1.5 inline-block rounded-[8px] bg-white px-2 py-0.5 text-[10.5px] font-bold text-[#B54708]">১৫ নভে পর্যন্ত ভর্তি ফিতে ২০% ছাড়</span>
        </div>
        <p className="m-0 mt-3 mb-1.5 text-[11.5px] font-bold">আপনার সুবিধামতো ব্যাচ বেছে নিন</p>
        <div className="space-y-2">
          {BATCHES.map((b) => (
            <div key={b.name} className={`rounded-[14px] bg-white p-2.5 ${b.picked ? "shadow-[inset_0_0_0_2px_#5B21B6]" : ""}`}>
              <div className="flex items-start justify-between gap-1">
                <p className="m-0 text-[12.5px] font-bold">{b.name}</p>
                <span className={`rounded-[7px] px-1.5 py-px text-[9.5px] font-bold ${b.tone}`}>{b.seats}</span>
              </div>
              <p className="m-0 text-[10.5px] text-[#6B6880]">{b.when}</p>
              <p className="m-0 text-[10.5px] text-[#6B6880]">{b.place}</p>
              <p className="m-0 mt-0.5 text-[11px] font-bold">৳১,২০০/মাস · ভর্তি ৳১,০০০</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-[12px] bg-[linear-gradient(135deg,#7C3AED,#5B21B6)] py-2 text-center text-[12px] font-bold text-white">ভর্তির আবেদন পাঠান</div>
      </PhoneFrame>
    </div>
  );
}
