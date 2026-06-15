"""Shared Supabase auth helper — reads token from env or .env.local"""
import os

def get_token():
    token = os.environ.get("SUPABASE_LOGIN_TOKEN", "")
    if token:
        return token

    # Fallback: try reading from project root .env.local
    import re
    env_paths = [
        os.path.join(os.path.dirname(__file__), '..', '.env.local'),
        os.path.join(os.getcwd(), '.env.local'),
    ]
    for fp in env_paths:
        try:
            with open(fp, 'r', encoding='utf-8') as f:
                for line in f:
                    m = re.match(r'^SUPABASE_LOGIN_TOKEN\s*=\s*(.+)$', line.strip())
                    if m:
                        return m.group(1).strip()
        except FileNotFoundError:
            continue
    raise RuntimeError("SUPABASE_LOGIN_TOKEN not found in env or .env.local")

# Export as constant for convenience
SUPABASE_LOGIN_TOKEN = get_token()
SUPABASE_URL = "https://qujcrmbzuzlgjrexbzga.supabase.co"
API_BASE = f"{SUPABASE_URL}/rest/v1"
MGMT_BASE = f"https://api.supabase.com/v1/projects/qujcrmbzuzlgjrexbzga/database/query"
