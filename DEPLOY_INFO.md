# SolarStoragePro 项目部署信息

> 创建日期：2026-06-02
> 最后更新：2026-06-02

---

## 1. 线上网站

| 项目 | 地址 |
|------|------|
| **正式域名** | https://solarstoragepro.com/ |
| **部署平台** | Vercel（通过 GitHub 自动部署） |
| **部署机制** | push 到 GitHub main 分支 → Vercel 自动构建并部署 |

---

## 2. GitHub 仓库

| 项目 | 地址 |
|------|------|
| **仓库地址** | https://github.com/shi0417/solarstroragepro |
| **主分支** | main |
| **可见性** | Public |
| **仓库所有者** | shi0417 |

> 注意：仓库名拼写为 `solarstroragepro`（中间多了一个 o），不是 `solarstoragepro`

### 一键同步脚本

双击项目根目录的 `sync_github.bat` 即可完成 git add → commit → push 到 GitHub。

---

## 3. 数据库（Supabase）

| 项目 | 地址 |
|------|------|
| **Supabase 项目 URL** | https://qujcrmbzuzlgjrexbzga.supabase.co |
| **Supabase Dashboard** | https://supabase.com/dashboard/project/qujcrmbzuzlgjrexbzga |

### 数据库用途

- **product_knowledge 表**：产品知识库，供网站在线客服 AI 读取
  - 表结构：`id`, `topic`, `keywords[]`, `content`, `sort_order`, `created_at`
  - 迁移脚本位置：`supabase/migrations/001_product_knowledge.sql`
  - 访问策略：公开只读（anon + authenticated 均可 SELECT）

### 环境变量（.env.local）

```env
NEXT_PUBLIC_SUPABASE_URL=https://qujcrmbzuzlgjrexbzga.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k
```

> 同样的环境变量需要在 Vercel 后台（Settings → Environment Variables）中配置，部署后才能生效。

---

## 4. Vercel 部署管理

| 项目 | 地址 |
|------|------|
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **项目标识** | 连接到 GitHub 仓库 `shi0417/solarstroragepro` |

### 部署流程

```
本地修改代码
    ↓
双击 sync_github.bat（或手动 git push）
    ↓
GitHub 收到 main 分支新提交
    ↓
Vercel 自动检测 → 触发构建（next build）
    ↓
构建成功 → 自动部署到 solarstoragepro.com
    ↓
网站更新完成（通常 1-3 分钟）
```

---

## 5. 联系信息（硬编码默认值）

| 项目 | 值 | 来源 |
|------|----|------|
| 电话 | +86 13967483968 | `src/lib/site-config.ts` |
| 邮箱 | sales@solarstoragepro.com | `src/lib/site-config.ts` |
| WhatsApp | 8615372996680 | `src/lib/site-config.ts` |
| Skype | your-skype-id | `src/lib/site-config.ts`（待配置） |

> 以上值可通过环境变量 `NEXT_PUBLIC_CONTACT_PHONE` 等覆盖。

---

## 6. Meta Pixel（Facebook 广告追踪）

| 项目 | 说明 |
|------|------|
| **Pixel ID** | 在 `.env.local` 中配置 `NEXT_PUBLIC_META_PIXEL_ID=你的ID` |
| **Pixel 管理页面** | https://business.facebook.com/settings/pixel/ |
| **广告策略文档** | `FACEBOOK_ADS_STRATEGY.md`（完整三层漏斗方案） |

### 追踪的事件

| 事件 | 触发时机 | 价值 |
|------|---------|------|
| PageView | 每次页面加载 | 自动（Pixel 基础功能） |
| ViewContent (Deep Read) | 页面滚动超过 50% | $5 |
| ViewContent (Long Stay) | 页面停留超过 30 秒 | $3 |
| Contact (WhatsApp) | 点击 WhatsApp 按钮 | $20 |
| Contact (Email) | 点击 Email CTA 按钮 | $20 |

### 代码位置

- Pixel 加载器：`src/components/site/MetaPixel.tsx`
- 深度互动追踪：`src/components/site/MetaPixelEvents.tsx`
- WhatsApp 事件：`src/components/site/WhatsAppFloat.tsx`
- CTA 事件：`src/components/site/Cta.tsx`

### Vercel 部署提醒

在 Vercel Dashboard → Settings → Environment Variables 中也要添加 `NEXT_PUBLIC_META_PIXEL_ID`，否则线上不生效。

---

## 7. 技术栈概览

| 技术 | 用途 |
|------|------|
| Next.js 15.5 | 前端框架（Turbopack） |
| React 19 | UI 库 |
| TypeScript | 编程语言 |
| Tailwind CSS 3.4 | 样式框架 |
| Supabase | 数据库 + 实时功能 |
| @supabase/ssr | 服务端/客户端 Supabase 集成 |
| OpenAI API | 在线客服 AI（可选，需配置 API Key） |
| Lucide React | 图标库 |
