# Blog 2026-10-26 — bess-iso-prequalification-process

**Title EN**: BESS ISO Prequalification Guide: How Battery Storage Gets Approved to Bid in ERCOT, CAISO and PJM Markets
**Title ZH**: BESS 参与电力市场准入（ISO 预认证）全流程指南：并网之后，离赚钱还差这一步
**Supabase ID**: b0fccc26-481e-4d36-8e9a-36a3cd452001
**Translations**: en (ac42122b-24d2-4cb0-8394-64995a74dfa2), zh (d5db8fde-e74d-42e3-8d84-087912f1061a)
**Tags**: BESS, ISO Prequalification, Grid Interconnection, Frequency Regulation, ERCOT, CAISO
**Read time**: 10 min

## Outline
- Why prequalification matters more than interconnection (COD = prequalification date for lenders)
- 5-step process: resource registration → model submission → telemetry (DNP3/104) → witnessed commissioning tests → qualification decision
- Market comparison table: ERCOT / CAISO / PJM (incl. 国内两个细则 vs 美国 ISO 对照表)
- 5 common failure points: model-as-built mismatch, telemetry point mapping, AGC signal following, missed witness windows, nameplate definitions
- Pre-apply checklist
- CTA: /products/energy-storage-system + /products/ci-battery-cabinets

## Insert method
Management API SQL via scripts/_sb_sql.py (scripts/insert_blog_2026-10-26.py).
Gotcha: Postgres text[] array literal must use single quotes: array['a','b']::text[], NOT JSON double quotes.
