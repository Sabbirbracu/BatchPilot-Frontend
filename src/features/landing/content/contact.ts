// Where the landing page's buttons go. Fill in the WhatsApp number when it is ready
// (international format, no "+": "8801XXXXXXXXX"). Until then the demo form can't send and says so,
// and WhatsApp buttons scroll to the demo form.
export const WHATSAPP_NUMBER: string | null = null;

export const whatsappHref = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "#book";
export const DEMO_HREF = "#book";

/** A WhatsApp link that opens a chat with this message already typed (the visitor still presses send). */
export const whatsappWith = (text: string) => (WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}` : null);

// Office and phone, shown in the footer.
export const OFFICE = {
  address: ["মেরুল বাড্ডা, প্রগতি সরণি", "ঢাকা ১২১২"],
  phone: "০১৩০৪-৮৬৭৫৪২",
  phoneHref: "tel:+8801304867542",
};

export const MAKER = { name: "AGENTIQ BD", href: "https://agentiqbd.com" };

// Social pages in the footer. Put the real page addresses here; "#" means not set yet.
export const SOCIAL = {
  facebook: "#",
  instagram: "#",
  youtube: "#",
};
