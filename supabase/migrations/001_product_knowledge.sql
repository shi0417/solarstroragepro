-- 在 Supabase SQL Editor 中执行，或通过 CLI 迁移
-- 产品知识库：供 /api/chat 读取；公开只读

create table if not exists public.product_knowledge (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  keywords text[] not null default '{}',
  content text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.product_knowledge enable row level security;

drop policy if exists "Allow public read product_knowledge" on public.product_knowledge;
create policy "Allow public read product_knowledge"
  on public.product_knowledge
  for select
  to anon, authenticated
  using (true);

insert into public.product_knowledge (topic, keywords, content, sort_order)
select * from (values
(
  'solar_efficiency'::text,
  array['光伏', '太阳能', '效率', '组件', 'solar', 'panel', 'efficiency', 'mppt', '发电量']::text[],
  '工商业级单晶组件实验室效率可达 22–23%，实际系统效率受倾角、遮挡、温度与逆变器 MPPT 跟踪影响。优质组串式逆变器 MPPT 效率通常 >99%，建议按当地辐照与温度系数做发电量仿真；我们可提供组件温度系数、弱光表现与逆变器匹配清单，帮助客户预估年发电量（kWh/kWp）。'::text,
  10
),
(
  'battery_lifespan'::text,
  array['储能', '电池', '寿命', '循环', '日历', 'lfp', '磷酸铁锂', 'battery', 'cycle', 'life', 'soh']::text[],
  '磷酸铁锂（LFP）储能电芯在 0.5C–1C 工况下常见标称循环 6000+ 次（容量保持率 80% 条件因厂商而异）。日历寿命通常约 10–15 年，受运行温度、SOC 窗口与 BMS 策略影响。建议日常运行 SOC 窗口 10–90%，避免长期满充存放；我们可依据应用场景给出质保条款与衰减曲线说明。'::text,
  20
)) as v(topic, keywords, content, sort_order)
where not exists (select 1 from public.product_knowledge limit 1);
