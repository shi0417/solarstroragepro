"""
Batch translate blog articles to Japanese and update Supabase.
"""
import json
import os
import sys

SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co"
SUPABASE_from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN, API_BASE, MGMT_BASE
ANON_KEY = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k"

# Japanese translations for all 7 articles (title + description)
JA_TRANSLATIONS = {
    "grid-frequency-regulation-bess-revenue": {
        "title": "BESSを用いたグリッド周波数調整：収益モデル、市場アクセス、実績データ（2026年版ガイド）",
        "description": "蓄電池エネルギー貯蔵システムが世界中のグリッド周波数調整市場から収益を得る方法を包括的に分析。PJM RegD、英国Dynamic Containment、オーストラリアFCAS、中国のアンシラリーサービスを、実際の収益データとシステム要件とともに解説します。"
    },
    "lfp-vs-nmc-battery-energy-storage": {
        "title": "エネルギー貯蔵用LFP vs NMCバッテリー：安全性、コスト、サイクル寿命を比較",
        "description": "定置型エネルギー貯蔵向けLFP（リン酸鉄リチウム）とNMC（ニッケルマンガンコバルト）バッテリー化学の包括的比較。安全性分析、サイクル寿命データ、コスト動向、BESSプロジェクト向けの適用ガイダンスを含みます。"
    },
    "commercial-battery-storage-roi": {
        "title": "商業用蓄電池ストレージのROI：投資回収期間と収益ストリームの完全ガイド",
        "description": "商業用蓄電池エネルギー貯蔵システムがピークカット、デマンドチャージ削減、周波数調整、エネルギー裁定取引を通じてROIを生み出す方法を解説。実際の投資回収計算を含みます。"
    },
    "ci-solar-storage-installation-guide": {
        "title": "C&I太陽光蓄電池設置ガイド：サイト準備からコミッショニングまで",
        "description": "商業・産業用蓄電池エネルギー貯蔵システムの設置手順を段階的に解説。サイト評価、電気設計、許認可、据付、コミッショニングのベストプラクティスを網羅します。"
    },
    "lithium-battery-cabinet-vs-rack-mount": {
        "title": "リチウムバッテリーキャビネット vs ラックマウント：C&I蓄電プロジェクトに最適なのは？",
        "description": "商業用途向けキャビネット型とラックマウント型のリチウムバッテリーエネルギー貯蔵システムの詳細比較。コスト、設置、メンテナンス、拡張性におけるトレードオフを解説します。"
    },
    "solar-storage-certification-guide": {
        "title": "太陽光蓄電システム認証ガイド：IEC、UL、CE、UN38.3を解説",
        "description": "蓄電池エネルギー貯蔵認証の複雑な状況を整理。IEC 62619、UL 9540A、CEマーキング、UN38.3、その他BESSをグローバルに展開するための重要な規格を解説します。"
    },
    "how-to-choose-energy-storage-supplier": {
        "title": "エネルギー貯蔵サプライヤーの選び方：15項目の評価フレームワーク",
        "description": "製造能力や認証からアフターサポート、財務安定性まで、蓄電池エネルギー貯蔵サプライヤーを評価する15の重要な基準を学びます。"
    },
}


def get_translation_id(article_id, locale):
    """Get the translation record ID for an article+locale pair."""
    import urllib.request
    url = f"{SUPABASE_URL}/rest/v1/blog_article_translations?select=id&article_id=eq.{article_id}&locale=eq.{locale}"
    req = urllib.request.Request(url, headers={
        "apikey": ANON_KEY,
        "Authorization": f"Bearer {ANON_KEY}",
    })
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read())
    return data[0]["id"] if data else None


def update_translation(translation_id, fields):
    """Update a translation record via Supabase REST API."""
    import urllib.request
    url = f"{SUPABASE_URL}/rest/v1/blog_article_translations?id=eq.{translation_id}"
    body = json.dumps(fields).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="PATCH",
        headers={
            "apikey": ANON_KEY,
            "Authorization": f"Bearer {ANON_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        })
    with urllib.request.urlopen(req) as resp:
        return resp.status


def main():
    # Step 1: Read English articles data
    with open(r"C:\Users\lenovo\AppData\Local\Temp\en_articles.json", encoding="utf-8") as f:
        articles = json.load(f)

    target_locale = sys.argv[1] if len(sys.argv) > 1 else "ja"
    
    # Build slug → article mapping
    slug_map = {a["slug"]: a for a in articles}
    
    # Load translations
    translations = JA_TRANSLATIONS
    
    print(f"Processing {len(translations)} articles for locale: {target_locale}")
    
    for slug, trans in translations.items():
        article = slug_map.get(slug)
        if not article:
            print(f"  SKIP {slug}: not found in English articles")
            continue
        
        tid = get_translation_id(article["id"], target_locale)
        if not tid:
            print(f"  SKIP {slug}: no translation record found")
            continue
        
        fields = {"title": trans["title"], "description": trans["description"]}
        status = update_translation(tid, fields)
        print(f"  OK {slug}: status={status}")
    
    print("Done!")


if __name__ == "__main__":
    main()
