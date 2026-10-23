import { WhatsAppIcon } from "../components/icons";
import { whatsappHref } from "../content/contact";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref}
      aria-label="WhatsApp-এ কথা বলুন"
      className="fixed right-4 bottom-4 z-30 flex size-[54px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_14px_28px_-10px_rgba(37,211,102,.8)] transition-transform hover:scale-105 sm:right-7 sm:bottom-7 sm:size-[60px]"
    >
      <WhatsAppIcon size={30} color="#FFFFFF" />
    </a>
  );
}
