import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";
import esMessages from "@/messages/es.json";
import trMessages from "@/messages/tr.json";
import ptMessages from "@/messages/pt.json";
import deMessages from "@/messages/de.json";
import frMessages from "@/messages/fr.json";
import thMessages from "@/messages/th.json";
import arMessages from "@/messages/ar.json";
import jaMessages from "@/messages/ja.json";
import koMessages from "@/messages/ko.json";
import idMessages from "@/messages/id.json";
import ukMessages from "@/messages/uk.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messagesMap: Record<string, any> = {
  en: enMessages,
  zh: zhMessages,
  es: esMessages,
  tr: trMessages,
  pt: ptMessages,
  de: deMessages,
  fr: frMessages,
  th: thMessages,
  ar: arMessages,
  ja: jaMessages,
  ko: koMessages,
  id: idMessages,
  uk: ukMessages,
};

export function loadMessages(locale: string) {
  return messagesMap[locale] || enMessages;
}
