"""Batch update remaining locale titles and descriptions."""
import json, subprocess, time

API_URL = "https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"
from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE

# Korean translations for all 7 articles
KO = {
    "grid-frequency-regulation-bess-revenue": {
        "title": "그리드 주파수 조정을 위한 BESS: 수익 모델, 시장 접근, 실제 수익 (2026 가이드)",
        "desc": "배터리 에너지 저장 시스템이 전 세계 그리드 주파수 조정 시장에서 수익을 창출하는 방법에 대한 포괄적 분석. PJM RegD, 영국 Dynamic Containment, 호주 FCAS, 중국 보조 서비스를 실제 수익 데이터와 함께 설명합니다."
    },
    "lfp-vs-nmc-battery-energy-storage": {
        "title": "에너지 저장용 LFP vs NMC 배터리: 안전성, 비용, 사이클 수명 비교",
        "desc": "고정형 에너지 저장을 위한 LFP(인산철리튬)와 NMC(니켈망간코발트) 배터리 화학의 포괄적 비교. 안전성 분석, 사이클 수명 데이터, 비용 동향, BESS 프로젝트 적용 지침을 포함합니다."
    },
    "commercial-battery-storage-roi": {
        "title": "상업용 배터리 저장장치 ROI: 투자 회수 기간과 수익 스트림 완벽 가이드",
        "desc": "상업용 배터리 에너지 저장 시스템이 피크 셰이빙, 수요 요금 절감, 주파수 조정, 에너지 차익거래를 통해 ROI를 창출하는 방법을 설명합니다. 실제 투자 회수 계산 포함."
    },
    "ci-solar-storage-installation-guide": {
        "title": "C&I 태양광 저장장치 설치 가이드: 현장 준비부터 시운전까지",
        "desc": "상업 및 산업용 배터리 에너지 저장 시스템 설치를 단계별로 안내합니다. 현장 평가, 전기 설계, 허가, 설치, 시운전 모범 사례를 다룹니다."
    },
    "lithium-battery-cabinet-vs-rack-mount": {
        "title": "리튬 배터리 캐비닛 vs 랙 마운트: C&I 저장 프로젝트에 적합한 것은?",
        "desc": "상업용 캐비닛형과 랙 마운트형 리튬 배터리 에너지 저장 시스템의 상세 비교. 비용, 설치, 유지보수, 확장성 측면의 트레이드오프를 이해하세요."
    },
    "solar-storage-certification-guide": {
        "title": "태양광 저장 시스템 인증 가이드: IEC, UL, CE, UN38.3 해설",
        "desc": "배터리 에너지 저장 인증의 복잡한 환경을 탐색합니다. IEC 62619, UL 9540A, CE 마킹, UN38.3 및 BESS 글로벌 배포를 위한 기타 중요 표준을 이해하세요."
    },
    "how-to-choose-energy-storage-supplier": {
        "title": "에너지 저장 공급업체 선택 방법: 15가지 평가 프레임워크",
        "desc": "제조 능력 및 인증부터 사후 지원 및 재무 안정성까지 배터리 에너지 저장 공급업체를 평가하는 15가지 중요 기준을 알아보세요."
    },
}

# Article ID mapping
SLUG_TO_ID = {
    "grid-frequency-regulation-bess-revenue": "1883da43-1f06-4e92-b910-6da6f836480e",
    "lfp-vs-nmc-battery-energy-storage": "f9c13832-8b11-4db4-9eb1-049c6fb91e98",
    "commercial-battery-storage-roi": "2fb3f6fc-1717-4131-add5-e2709857c3da",
    "ci-solar-storage-installation-guide": "aa7c7fd8-8d65-4534-adab-2e86dfc2211c",
    "lithium-battery-cabinet-vs-rack-mount": "f94e0bb9-bfbb-45bd-a20a-db890785d90d",
    "solar-storage-certification-guide": "04a5a326-abaa-49b2-b520-75975cc001b4",
    "how-to-choose-energy-storage-supplier": "852037bf-52b2-41fe-be11-d30766ab6a57",
}


def upload_sql(sql, label):
    payload = json.dumps({"query": sql}, ensure_ascii=False)
    fname = "D:/project/solarstoragepro/scripts/tmp_batch.json"
    with open(fname, "w", encoding="utf-8") as f:
        f.write(payload)
    r = subprocess.run(
        ["curl", "-s", "-X", "POST", API_URL,
         "-H", f"Authorization: Bearer {TOKEN}",
         "-H", "Content-Type: application/json",
         "-d", f"@{fname}"],
        capture_output=True, text=True, timeout=30
    )
    resp = r.stdout.strip()
    if r.returncode == 0:
        print(f"  OK: {label} -> {resp}")
    else:
        print(f"  FAIL: {label} -> {r.stderr[:200]}")


def main():
    locale = "ko"
    print(f"\n=== Updating {locale} titles ===")
    
    for slug, trans in KO.items():
        aid = SLUG_TO_ID[slug]
        title_esc = trans["title"].replace("'", "''")
        desc_esc = trans["desc"].replace("'", "''")
        sql = f"UPDATE blog_article_translations SET title = '{title_esc}', description = '{desc_esc}' WHERE article_id = '{aid}' AND locale = '{locale}'"
        upload_sql(sql, f"{locale}/{slug[:30]}")
    
    print(f"\n=== {locale} done ===")


if __name__ == "__main__":
    main()
