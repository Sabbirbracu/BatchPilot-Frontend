// Where the landing page's buttons go. Fill in the WhatsApp number when it is ready
// (international format, no "+": "8801XXXXXXXXX"); until then WhatsApp buttons scroll to the demo form.
export const WHATSAPP_NUMBER: string | null = null;

export const whatsappHref = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "#book";
export const DEMO_HREF = "#book";
