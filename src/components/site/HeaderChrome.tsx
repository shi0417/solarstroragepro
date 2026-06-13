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
  const { messages, localizePath } = useLocaleContext();

  if (props.field === "tagline") {
    return <p className={props.className}>{messages.header.tagline}</p>;
  }

  return (
    <a href={localizePath(props.href)} className={props.className}>
      {messages.header.contactCta}
    </a>
  );
}
