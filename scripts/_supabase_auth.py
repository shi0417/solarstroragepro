"""
Shared Supabase auth module.

All scripts that need to call the Supabase Management API should import from here:
    from _supabase_auth import SUPABASE_LOGIN_TOKEN as TOKEN

This keeps the token in one place and out of version control (add to .gitignore).
Set SUPABASE_LOGIN_TOKEN in .env.local or as an environment variable.
"""
import os

# Priority: env var > .env.local
SUPABASE_LOGIN_TOKEN = os.environ.get("SUPABASE_LOGIN_TOKEN", "")

if not SUPABASE_LOGIN_TOKEN:
    # Try reading from .env.local
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("SUPABASE_LOGIN_TOKEN="):
                    SUPABASE_LOGIN_TOKEN = line.strip().split("=", 1)[1]
                    break

if not SUPABASE_LOGIN_TOKEN:
    raise ValueError(
        "SUPABASE_LOGIN_TOKEN not found. "
        "Set it in .env.local or as an environment variable."
    )
