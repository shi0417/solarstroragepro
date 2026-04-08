"use client";

import { useLocaleContext } from "./LocaleProvider";

type TaglineProps = {
  field: "tagline";
  className?: string;
};

type ContactProps = {
  field: "contactCta";
  as: "a";
  href: string;
  className?: string;
};

export function HeaderChrome(props: TaglineProps | ContactProps) {
  const { messages } = useLocaleContext();

  if (props.field === "tagline") {
    return <p className={props.className}>{messages.header.tagline}</p>;
  }

  return (
    <a href={props.href} className={props.className}>
      {messages.header.contactCta}
    </a>
  );
}
