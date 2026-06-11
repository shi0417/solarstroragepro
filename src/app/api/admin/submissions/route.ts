import { NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USER || "s1";
const ADMIN_PASS = process.env.ADMIN_PASS || "123456";
const SUPABASE_REF = "qujcrmbzuzlgjrexbzga";
const SUPABASE_TOKEN = process.env.SUPABASE_LOGIN_TOKEN || "";

function checkAuth(request: Request): boolean {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;
  try {
    const decoded = Buffer.from(auth.slice(6), "base64").toString();
    const [user, pass] = decoded.split(":");
    return user === ADMIN_USER && pass === ADMIN_PASS;
  } catch {
    return false;
  }
}

async function querySupabase(sql: string) {
  const resp = await fetch(
    `https://api.supabase.com/v1/projects/${SUPABASE_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    }
  );
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Supabase API error: ${text}`);
  }
  return resp.json();
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const search = url.searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    let whereClause = "";
    if (search) {
      const escaped = search.replace(/'/g, "''");
      whereClause = `WHERE name ILIKE '%${escaped}%' OR company ILIKE '%${escaped}%' OR email ILIKE '%${escaped}%' OR project_type ILIKE '%${escaped}%' OR message ILIKE '%${escaped}%'`;
    }

    const data = await querySupabase(
      `SELECT * FROM public.contact_submissions ${whereClause} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`
    );

    const countResult = await querySupabase(
      `SELECT count(*)::int AS total FROM public.contact_submissions ${whereClause};`
    );

    return NextResponse.json({
      data,
      total: countResult[0]?.total || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
