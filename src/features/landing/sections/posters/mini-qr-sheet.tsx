import { QrArt } from "../../components/qr-art";
import { COURSE as C } from "./sample-course";

/** "শুধু QR": the course name, one big QR and a one-line hint — to stick on a wall or put in your own design. */
export function MiniQrSheet() {
  return (
    <div className="flex h-[481px] w-[340px] flex-col items-center justify-center rounded-[6px] bg-white px-8 text-center text-[#17161F] shadow-[0_30px_60px_-28px_rgba(23,22,31,.55)]">
      <p className="m-0 text-[11px] font-semibold text-[#6B6880]">{C.institution}</p>
      <p className="m-0 mt-1 text-[21px] leading-tight font-extrabold">{C.title}</p>
      <QrArt size={210} className="mt-6" />
      <p className="m-0 mt-5 text-[15px] font-extrabold">স্ক্যান করে ভর্তির আবেদন করুন</p>
      <p className="m-0 mt-1 text-[10px] text-[#6B6880]">{C.url}</p>
    </div>
  );
}
