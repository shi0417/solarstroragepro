import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { siteContact } from "@/lib/site-config";
import { getSupabaseEnv } from "@/lib/supabase/env";

type KnowledgeRow = {
  topic: string;
  keywords: string[] | null;
  content: string;
  sort_order: number | null;
};

function scoreMessage(message: string, row: KnowledgeRow): number {
  const lower = message.toLowerCase();
  let score = 0;
  for (const kw of row.keywords ?? []) {
    if (lower.includes(kw.toLowerCase())) score += 3;
  }
  if (row.topic === "solar_efficiency") {
    if (/效率|光伏|太阳能|组件|mppt|发电|solar|panel|efficiency/i.test(message))
      score += 4;
  }
  if (row.topic === "battery_lifespan") {
    if (/寿命|循环|储能|电池|lfp|磷酸铁锂|衰减|soh|battery|cycle|life/i.test(message))
      score += 4;
  }
  return score;
}

function fallbackFromKnowledge(message: string, rows: KnowledgeRow[]): string {
  if (!rows.length) {
    return (
      "知识库尚未配置。请在 Supabase 中执行 `supabase/migrations/001_product_knowledge.sql` 创建表并写入条目，或稍后再试。"
    );
  }

  const scored = rows
    .map((row) => ({ row, score: scoreMessage(message, row) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    const merged = rows.map((r) => `【${r.topic}】${r.content}`).join("\n\n");
    return (
      `根据您的问题，可先参考以下产品知识摘要；如需更精确答复，请联系 ${siteContact.email} 或说明具体应用场景。\n\n${merged}`
    );
  }

  const top = scored[0].row;
  const extra = scored[1]?.row;
  let out = top.content;
  if (extra && extra.topic !== top.topic) {
    out += `\n\n补充说明：${extra.content}`;
  }
  return out;
}

async function openAiReply(message: string, context: string): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const model = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.25,
      max_tokens: 900,
      messages: [
        {
          role: "system",
          content: `你是新能源（光伏 + 储能）外贸站点的专业客服助理。请仅依据下列「产品知识库」回答客户关于太阳能板/组件效率与储能电池寿命等问题；不要编造具体数字若知识库未给出。若知识库不足以回答，请礼貌说明并建议发邮件至 ${siteContact.email} 或电话联系。\n\n知识库：\n${context}`,
        },
        { role: "user", content: message },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("OpenAI error", res.status, err);
    return null;
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  return text ?? null;
}

export async function POST(request: Request) {
  let body: { message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  if (!message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const env = getSupabaseEnv();
  if (!env) {
    return NextResponse.json(
      {
        reply:
          "服务器未配置 Supabase 环境变量（NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY），暂无法读取知识库。",
      },
      { status: 503 }
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    env.url,
    env.publishableKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            /* Server Component boundary */
          }
        },
      },
    }
  );

  const { data: rows, error } = await supabase
    .from("product_knowledge")
    .select("topic,keywords,content,sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json(
      {
        reply:
          "暂时无法从数据库读取知识库。请确认已在 Supabase 创建表 `product_knowledge` 并开放匿名 SELECT（见项目内 SQL 迁移）。",
        detail: error.message,
      },
      { status: 503 }
    );
  }

  const knowledge = (rows ?? []) as KnowledgeRow[];
  const context = knowledge
    .map((k) => `[${k.topic}] ${k.content}`)
    .join("\n\n");

  const ai = await openAiReply(message, context || "（知识库为空）");
  const reply = ai ?? fallbackFromKnowledge(message, knowledge);

  return NextResponse.json({ reply, usedOpenAI: Boolean(ai) });
}
