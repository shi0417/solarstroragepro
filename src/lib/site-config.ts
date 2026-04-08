/** 外贸站联系与社交链接，可通过环境变量覆盖 */

export const siteContact = {
  phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+86 13967483968",
  phoneTel: process.env.NEXT_PUBLIC_CONTACT_PHONE_TEL ?? "+86 13967483968",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sales@solarstoragepro.com",
  /** WhatsApp：仅数字，国家码在前，无 + 号 */
  whatsappDigits: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "8615372996680",
  skypeId: process.env.NEXT_PUBLIC_SKYPE_ID ?? "your-skype-id",
};

export function whatsappUrl() {
  return `https://wa.me/${siteContact.whatsappDigits.replace(/\D/g, "")}`;
}

export function skypeChatUrl() {
  return `skype:${encodeURIComponent(siteContact.skypeId)}?chat`;
}
