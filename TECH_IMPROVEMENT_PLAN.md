# SolarStoragePro 团队技术能力提升方案

> 诊断日期：2026-06-02
> 项目：solarstoragepro.com（Next.js 15 + React 19 + TypeScript + Tailwind + Supabase）
> 诊断范围：全部源代码（~45 个文件，约 17,000 行）

---

## 一、项目现状诊断

### 总体评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 类型安全 | 7/10 | strict 模式已开启，但有 6 处 `any` 绕过 |
| 代码组织 | 8/10 | App Router 结构规范，组件拆分清晰 |
| 可维护性 | 7/10 | 配置分层好，缺 .env.example 和测试 |
| 性能 | 7/10 | 无大问题，缺 rate limiting |
| 安全性 | 6/10 | API 无频率限制，假号码硬编码 |
| 测试覆盖 | 0/10 | 零测试 |
| 代码复用 | 3/10 | 产品页 60% 代码重复（约 10,000+ 行） |

**综合：中等偏上，核心业务代码质量不错，但工程化基础薄弱，代码重复严重。**

---

## 二、核心问题清单（按严重程度排序）

### 🔴 P0 — 必须立即修复

#### 1. 硬编码假 WhatsApp 号码（3 处）
- `src/app/case-center/page.tsx:144` → `https://wa.me/8613800000000`
- `src/app/case-center/[id]/page.tsx:266` → `https://wa.me/8613800000000`
- `src/app/technology/page.tsx:732,741` → 硬编码 WhatsApp 链接
- **影响**：客户点击后联系不到人，直接损失商机
- **修复**：统一使用 `site-config.ts` 中的 `whatsappUrl()` 函数

#### 2. API 路由无频率限制
- `src/app/api/chat/route.ts` 直接调用 OpenAI API，无 rate limiting
- **影响**：恶意用户可无限调用，消耗 API 额度，造成费用风险
- **修复**：添加基于 IP 的简单频率限制（如 10 次/分钟）

#### 3. 缺少 `.env.example` 模板
- 新开发者不知道需要配置哪些环境变量
- **修复**：创建 `.env.example`，列出所有必需变量（不含真实值）

---

### 🟡 P1 — 应尽快完成

#### 4. 消除 6 处 `any` 类型
- 全部集中在 Meta Pixel 相关的 4 个文件
- `(window as any).fbq(...)` 模式重复 6 次
- **修复**：创建 `src/types/global.d.ts` 扩展 Window 类型，创建 `src/lib/tracking.ts` 统一封装

#### 5. 产品详情页 60% 代码重复（约 10,000+ 行）
- 9 个产品页几乎完全相同的结构
- 双语文案直接内嵌组件，未使用 i18n messages
- **修复**：创建通用 `ProductDetailLayout` 模板 + `src/data/products/` 数据文件

#### 6. technology/page.tsx 过大（36KB）
- 单文件包含 6 个板块的所有逻辑和样式
- **修复**：拆分为独立 Section 组件

#### 7. 缺少 Prettier 配置
- 团队成员代码格式不统一
- **修复**：添加 `.prettierrc` + `lint-staged` + `husky` pre-commit hook

---

### 🟢 P2 — 中期规划

#### 8. 组件目录重组
- 当前 23 个文件平铺在 `components/site/`
- 建议按功能分：`layout/` `marketing/` `analytics/` `shared/` `navigation/`

#### 9. 产品路由动态化
- 当前 9 个独立目录的路由应改为 `products/[type]` 动态路由

#### 10. 引入测试框架
- 优先为核心逻辑添加测试：`locale.ts` `site-config.ts` `utils.ts` `i18n`
- 推荐 Vitest + React Testing Library

#### 11. 统一日志策略
- 替换 `console.error` 为结构化日志

---

## 三、团队能力提升路线图

### 阶段一：夯实基础（1-2 周）

**目标**：让代码达到"专业水准"的基线

| 任务 | 优先级 | 预计工时 | 负责人建议 |
|------|--------|---------|-----------|
| 修复 3 处假 WhatsApp 号码 | P0 | 0.5h | 任意成员 |
| 创建 `.env.example` | P0 | 0.5h | 任意成员 |
| 创建 `global.d.ts` 消除 `any` | P1 | 1h | 资深成员指导 |
| 创建 `tracking.ts` 统一封装 | P1 | 2h | 资深成员 |
| 添加 API rate limiting | P0 | 2h | 资深成员 |
| 配置 Prettier + lint-staged | P1 | 1h | 任意成员 |

**阶段产出**：
- 所有 P0 问题解决
- 零 `any` 类型
- 统一代码格式
- API 有安全防护

---

### 阶段二：消除重复（2-3 周）

**目标**：大幅减少重复代码，提升可维护性

| 任务 | 优先级 | 预计工时 | 负责人建议 |
|------|--------|---------|-----------|
| 抽取 `ProductDetailLayout` 通用模板 | P1 | 4h | 资深成员主导 |
| 迁移产品数据到 `src/data/products/` | P1 | 3h | 资深成员 + 普通成员 |
| 将产品文案迁移到 i18n messages | P1 | 3h | 普通成员（资深审核） |
| 拆分 technology/page.tsx | P1 | 2h | 资深成员指导 |
| 重构产品路由为动态路由 | P2 | 3h | 资深成员 |

**阶段产出**：
- 代码量减少约 8,000-10,000 行（从 ~17,000 降至 ~7,000-9,000）
- 新增产品页只需添加数据文件，无需复制模板
- 所有产品文案通过 i18n 管理，支持多语言扩展

---

### 阶段三：工程化升级（3-4 周）

**目标**：建立团队协作和自动化流程

| 任务 | 优先级 | 预计工时 | 负责人建议 |
|------|--------|---------|-----------|
| 引入 Vitest + 第一批单元测试 | P2 | 4h | 资深成员 |
| 组件目录重组 | P2 | 3h | 资深成员指导 |
| 建立代码 Review 流程规范 | P2 | - | 团队统一 |
| 编写项目架构文档 | P2 | 2h | 资深成员 |
| 配置 CI 自动检查（lint + type check + test） | P2 | 2h | 资深成员 |

**阶段产出**：
- 测试覆盖核心逻辑
- CI 自动检查，PR 提交自动验证
- 项目有架构文档，新成员快速上手
- 代码 Review 文化建立

---

### 阶段四：性能与安全深化（持续）

| 任务 | 说明 |
|------|------|
| 图片优化 | WebP/AVIF + 懒加载 + CDN |
| 代码分割 | 动态 import 减少首屏 bundle |
| SEO 优化 | 结构化数据 + sitemap + meta tags |
| 监控告警 | 错误追踪（Sentry）+ 性能监控 |
| 安全审计 | CSP 策略 + 依赖漏洞扫描 |

---

## 四、团队角色分工建议

### 资深开发者（1 人）
- 负责架构设计、代码 Review、技术选型
- 主导阶段二的重构工作（模板抽取、路由重构）
- 编写技术文档和规范
- 指导初中级成员成长

### 中级开发者（1-2 人）
- 独立完成阶段一的 bug 修复和配置任务
- 在指导下参与阶段二的数据迁移工作
- 编写单元测试
- 参与 code Review

### 初级开发者 / 实习生
- 在指导下完成文案迁移、Prettier 配置等标准化工作
- 学习 TypeScript 类型系统和 React 组件设计
- 通过 code Review 学习最佳实践

---

## 五、学习资源推荐

### 必读（团队全员）
1. **TypeScript Handbook** — 类型系统基础
2. **Next.js App Router 文档** — 路由、Server Components、数据获取
3. **React 官方文档（新版）** — Hooks、组件设计模式
4. **Tailwind CSS 文档** — 工具类优先设计理念

### 进阶（资深开发者）
1. **Kent C. Dodds — Epic React** — 组件设计模式
2. **Testing Library 文档** — 测试最佳实践
3. **Vercel 部署最佳实践** — 性能优化、边缘函数

### 代码规范
- Airbnb React/TypeScript Style Guide
- Conventional Commits（Git 提交规范）

---

## 六、成功指标

| 指标 | 当前值 | 目标值（阶段一后） | 目标值（阶段三后） |
|------|--------|------------------|------------------|
| `any` 类型数量 | 6 | 0 | 0 |
| 代码总行数 | ~17,000 | ~16,500 | ~8,000-9,000 |
| 测试覆盖率 | 0% | 0% | 60%+ |
| P0 级问题 | 3 | 0 | 0 |
| 产品页新增成本 | 复制 200 行模板 | 复制 200 行模板 | 添加 30 行数据 |
| PR 自动检查 | 无 | ESLint + TypeScript | ESLint + TS + Test |
| `.env.example` | 无 | ✅ | ✅ |

---

*此方案由资深开发工程师基于实际代码库分析制定，建议与团队讨论后确认优先级和时间安排。*
