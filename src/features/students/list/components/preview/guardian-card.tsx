import { phoneLabel } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Student } from "@/lib/types";

/** Guardian name and number with call and WhatsApp buttons. */
export function GuardianCard({ student: s }: { student: Student }) {
  const { tr } = useLang();
  const phone = s.guardian_phone;
  const local = phone?.replace(/^\+?88/, "") ?? "";
  return (
    <div className="flex items-center gap-[9px] rounded-[14px] bg-[#F7F5FC] px-[11px] py-[9px]">
      <div className="min-w-0 flex-1">
        <p className="m-0 text-[11px] text-[#6B6880]">{tr("অভিভাবক", "Guardian")}</p>
        <p className="m-0 truncate text-[13.5px] font-semibold">{s.guardian_name || tr("নাম দেওয়া নেই", "No name")}</p>
        <p className="num m-0 text-[11.5px] text-[#6B6880]">
          {phone ? phoneLabel(phone) : tr("নম্বর নেই", "No number")}
          {phone && s.guardian_verified_at && ` · ✓ ${tr("যাচাই", "verified")}`}
        </p>
      </div>
      {phone && (
        <>
          <a
            href={`tel:${local}`}
            aria-label={tr("কল করুন", "Call")}
            className="flex size-[34px] items-center justify-center rounded-[11px] bg-[#F4EEFF] text-[#5B21B6] hover:bg-[#EBE1FF]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
            </svg>
          </a>
          <a
            href={`https://wa.me/88${local}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex size-[34px] items-center justify-center rounded-[11px] bg-[#ECFDF3] hover:bg-[#DDF8E8]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.8-.1 1.4z" />
            </svg>
          </a>
        </>
      )}
    </div>
  );
}
