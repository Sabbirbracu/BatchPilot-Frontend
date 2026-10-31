import { Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";

/** Round-cornered call button for a guardian's number. */
export function CallButton({ phone }: { phone: string }) {
  const { tr } = useLang();
  return (
    <a href={`tel:${phone}`} aria-label={tr("কল করুন", "Call")} className="flex size-[46px] flex-none items-center justify-center rounded-[15px] bg-[#F7F5FC] text-[#5B21B6] hover:bg-[#F4EEFF]">
      <Phone className="size-5" />
    </a>
  );
}
