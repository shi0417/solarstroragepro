import Link from "next/link";
import { localizeHref } from "@/lib/utils";

type Props = {
  locale: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function LocalizedLink({ locale, href, children, className }: Props) {
  return (
    <Link href={localizeHref(locale, href)} className={className}>
      {children}
    </Link>
  );
}
