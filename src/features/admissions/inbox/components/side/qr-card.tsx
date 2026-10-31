import Link from "next/link";
import { useToast } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { usePortalPath } from "@/lib/portal";
import type { AdmissionLink } from "@/lib/types";
import { joinUrl, qrSrc } from "../../../links/lib/join-url";

/** ভর্তির QR — the newest open QR, big, with poster/QR and copy. Links to all QRs when there are more. */
export function QrCard({ links, canManage }: { links: AdmissionLink[] | undefined; canManage: boolean }) {
  const { tr } = useLang();
  const to = usePortalPath();
  const toast = useToast();
  const link = links?.find((l) => l.is_active);
  const url = link ? joinUrl(link.code) : "";
  return (
    <section className="rounded-[28px] bg-[linear-gradient(160deg,#6D28D9,#4C1D95)] px-5 py-6 text-center text-white">
      <div className="flex items-center justify-between gap-2">
        <span className="w-12" />
        <p className="m-0 text-[15px] font-bold text-[#F5B800]">{tr("ভর্তির QR", "Admission QR")}</p>
        {canManage ? (
          <Link href={to("/admissions/qr")} className="w-12 text-right text-[12.5px] font-semibold text-white/80 hover:text-white">
            {tr("সব QR", "All")}
          </Link>
        ) : (
          <span className="w-12" />
        )}
      </div>
      <h2 className="m-0 mt-1 text-[19px] leading-snug font-bold">{tr("দেয়ালে লাগান, ফোনে স্ক্যান করলেই ফর্ম", "Put it on the wall — scan and the form opens")}</h2>
      {link ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG from our API */}
          <img src={qrSrc(url, 6)} alt={link.title} className="mx-auto mt-5 size-[200px] rounded-[20px] bg-white p-3" />
          <p className="m-0 mt-2 text-[13px] font-semibold text-white/90">{link.title}</p>
          <p className="m-0 mt-1 truncate text-[14px] text-white/80">{url.replace(/^https?:\/\//, "")}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link href={`/poster/${link.code}`} target="_blank" className="rounded-[16px] bg-[#F5B800] py-3.5 text-[15px] font-bold text-[#2E1065] hover:brightness-105">
              {tr("পোস্টার / QR", "Poster / QR")}
            </Link>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(url).then(() => toast(tr("লিংক কপি হয়েছে", "Link copied")))}
              className="rounded-[16px] bg-white/15 py-3.5 text-[15px] font-bold text-white hover:bg-white/25"
            >
              {tr("লিংক কপি", "Copy link")}
            </button>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-[20px] bg-white/10 px-4 py-6">
          <p className="m-0 text-[14px] text-white/85">{tr("এখনো কোনো চালু QR নেই", "No open QR yet")}</p>
          {canManage && (
            <Link href={to("/admissions/qr")} className="mt-3 inline-block rounded-[14px] bg-[#F5B800] px-5 py-2.5 text-[14px] font-bold text-[#2E1065]">
              {tr("QR বানান", "Make a QR")}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
