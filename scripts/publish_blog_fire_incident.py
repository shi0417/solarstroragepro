# -*- coding: utf-8 -*-
"""Idempotent publisher: REST-first (with --ssl-no-revoke), verify at end."""
import json, os, subprocess, sys, tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import blog_fire_incident_content as C

ENV = 'D:/project/solarstoragepro/.env.local'
BASE = 'https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1'


def anon_key():
    for line in open(ENV, encoding='utf-8'):
        if line.startswith('NEXT_PUBLIC_SUPABASE_ANON_KEY='):
            return line.split('=', 1)[1].strip()
    raise SystemExit('no anon key')


KEY = anon_key()


def req(method, path, payload=None):
    cmd = ['curl', '-sS', '-m', '60', '--ssl-no-revoke', '-X', method, BASE + path,
           '-H', f'apikey: {KEY}', '-H', f'Authorization: Bearer {KEY}',
           '-H', 'Content-Type: application/json']
    if payload is not None:
        cmd.append('-H')
        cmd.append('Prefer: return=representation')
        f = tempfile.NamedTemporaryFile('w', suffix='.json', delete=False, encoding='utf-8')
        json.dump(payload, f, ensure_ascii=False)
        f.close()
        cmd += ['-d', '@' + f.name]
    out = subprocess.run(cmd, capture_output=True, text=True)
    txt = (out.stdout or '').strip()
    if txt:
        try:
            return json.loads(txt)
        except json.JSONDecodeError:
            return txt  # empty-body-success pitfall: non-JSON = real content
    return []  # empty body from 201 = success


def existing_article():
    rows = req('GET', f'/blog_articles?slug=eq.{C.SLUG}&select=id,slug,date,read_time,tags')
    return rows[0] if isinstance(rows, list) and rows else None


def existing_locales(article_id):
    rows = req('GET', f'/blog_article_translations?article_id=eq.{article_id}&select=locale')
    return {r['locale'] for r in rows} if isinstance(rows, list) else set()


def main():
    art = existing_article()
    if art is None:
        res = req('POST', '/blog_articles', {
            'slug': C.SLUG, 'date': C.DATE, 'read_time': C.READ_TIME, 'tags': C.TAGS})
        if isinstance(res, list) and res:
            art = res[0]
        elif isinstance(res, dict):
            art = res
        else:
            raise SystemExit(f'article insert failed: {res}')
    aid = art['id']
    print('ARTICLE', aid, art.get('date'), art.get('slug'))

    have = existing_locales(aid)
    print('EXISTING LOCALES:', have)

    for loc, cat, title, desc, body in [
        ('en', C.EN_CATEGORY, C.EN_TITLE, C.EN_DESCRIPTION, C.EN_BODY),
        ('zh', C.ZH_CATEGORY, C.ZH_TITLE, C.ZH_DESCRIPTION, C.ZH_BODY),
    ]:
        if loc in have:
            print(f'{loc}: already present, skip')
            continue
        r = req('POST', '/blog_article_translations', {
            'article_id': aid, 'locale': loc, 'category': cat,
            'title': title, 'description': desc, 'body': body})
        ok = (isinstance(r, list) and r) or r == [] or isinstance(r, str)
        print(f'{loc}: inserted = {ok}, en_words={len(body.split()) if loc == "en" else "-"}'
              if loc == 'en' else f'{loc}: inserted = {ok}, zh_chars={len(body)}')

    # final verify via join
    v = req('GET', f'/blog_article_translations?article_id=eq.{aid}&select=locale,category,title,body')
    if isinstance(v, list):
        for r in v:
            print('VERIFY', r['locale'], '|', r['title'][:60], '| body_len', len(r['body']))
    else:
        print('VERIFY FAILED:', v)


if __name__ == '__main__':
    main()
