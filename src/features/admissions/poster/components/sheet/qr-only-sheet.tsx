import { useLang } from "@/lib/i18n";
import type { JoinPage } from "@/lib/types";
import { qrSrc } from "../../../links/lib/join-url";

/** "শুধু QR" printed on A4: the course name, one big QR and a one-line hint — to cut out or stick on a wall. */
export function QrOnlySheet({ page: p, url }: { page: JoinPage; url: string }) {
  const { tr } = useLang();
  return (
    <div className="flex h-full flex-col items-center justify-center px-16 text-center text-[#17161F] [line-height:normal]">
      <p className="m-0 text-[22px] font-semibold text-[#6B6880]">{p.institution_name}</p>
      <h1 className="m-0 mt-2 text-[44px] font-extrabold [line-height:1.2]">{p.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG from our API */}
      <img src={qrSrc(url, 10)} alt="QR" className="mt-10 block size-[480px]" />
      <p className="m-0 mt-8 text-[30px] font-extrabold">{tr("স্ক্যান করে ভর্তির আবেদন করুন", "Scan to apply for admission")}</p>
      <p className="m-0 mt-2 text-[18px] text-[#6B6880]">{url.replace(/^https?:\/\//, "")}</p>
    </div>
  );
}
