export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/** 导航结构与文案见 `src/lib/i18n/messages.ts`（中英文各一份） */
