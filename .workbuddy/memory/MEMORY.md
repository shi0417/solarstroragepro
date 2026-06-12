# SolarStoragePro 项目长期记忆

## 技术栈
- Next.js 15 + React 19 + TypeScript + Tailwind CSS + Supabase + Vercel
- 通过 GitHub 自动部署（但已遗忘服务器和数据库 URL）
- PostCSS + Tailwind CSS 处理样式
- i18n: 基于 x-locale header 的中英文切换（非 URL 前缀方式）
- FB Pixel 已集成

## 项目结构约定
- 产品页位于 `src/app/products/[slug]/page.tsx`
- 解决方案页位于 `src/app/solutions/[slug]/page.tsx`
- 博客页位于 `src/app/blog/page.tsx`（列表）和 `src/app/blog/[slug]/page.tsx`（详情）
- 博客文章数据集中在 `src/app/blog/blog-data.ts`（ARTICLES 数组，中英双语）
- 共享组件在 `src/components/site/`
- i18n 消息集中在 `src/lib/i18n/messages.ts`（en + zh 两个 locale）
- API 路由在 `src/app/api/`
- Supabase 迁移在 `supabase/migrations/`
- 组件使用 `useLocaleContext()` 获取 locale 和 messages

## 设计风格
- 产品页使用深色主题（slate-950 背景）
- 首页使用浅色主题 + 深色 CTA 区
- 品牌色：brand (amber/orange) + solar + emerald
- CSS 变量定义在 globals.css

## Supabase 管理信息
- Project ref: qujcrmbzuzlgjrexbzga
- Region: us-west-2, PostgreSQL 17
- Supabase URL: https://qujcrmbzuzlgjrexbzga.supabase.co
- Management API: POST https://api.supabase.com/v1/projects/{ref}/database/query
- Login Token 在 .env.local: SUPABASE_LOGIN_TOKEN=sbp_...
- CLI 安装在项目 devDependency 但无法执行（sandbox 限制）
- 执行 SQL 的方式：curl + Management API（最可靠）

## 已完成的重大更新
- 2026-06-11: 三大致命问题修复（联系表单、产品独立页、资料下载）
  - ContactForm 组件 + /api/contact 路由
  - C&I Battery Cabinets 独立产品页 /products/ci-battery-cabinets
  - ResourceDownload 组件 + /api/resource-download 路由
  - CTA 区改版（双栏布局：表单+快捷按钮+资料下载）
  - Supabase contact_submissions 和 resource_downloads 表
- 2026-06-12: SEO 博客系统上线
  - /blog 列表页 + /blog/[slug] 详情页
  - 5 篇初始 SEO 长尾关键词文章（ROI分析、安装指南、产品对比、认证指南、采购指南）
  - 导航栏 + 页脚添加 Blog/Resources 链接
  - 每篇文章包含中英双语、目录、相关文章、联系表单 CTA
  - 创建了每日自动写文定时任务（PAUSED 状态，需用户激活）

## 待办
- 上传实际的 PDF 资源文件到 public/resources/
- 替换 C&I 产品页占位图片为实际产品图
- 激活每日博客写作自动化（automation: SEO博客文章日更，当前 PAUSED）
