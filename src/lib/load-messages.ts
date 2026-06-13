import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";
import esMessages from "@/messages/es.json";
import trMessages from "@/messages/tr.json";
import ptMessages from "@/messages/pt.json";
import deMessages from "@/messages/de.json";
import frMessages from "@/messages/fr.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messagesMap: Record<string, any> = {
  en: enMessages,
  zh: zhMessages,
  es: esMessages,
  tr: trMessages,
  pt: ptMessages,
  de: deMessages,
  fr: frMessages,
};

export function loadMessages(locale: string) {
  return messagesMap[locale] || enMessages;
}
