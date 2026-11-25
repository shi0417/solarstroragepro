# -*- coding: utf-8 -*-
"""Push a local commit to GitHub via REST API when github.com:443 is blocked."""
import base64
import json
import socket
import subprocess
import urllib.error
import urllib.request

OWNER = "shi0417"
REPO = "solarstroragepro"
BRANCH = "main"

# local DNS returns unusable answers for api.github.com; pin to a verified IP
# while keeping TLS SNI/verification on the real hostname.
API_IP = "20.205.243.168"
_orig_getaddrinfo = socket.getaddrinfo


def _pinned(host, port, *args, **kwargs):
    if host == "api.github.com":
        return _orig_getaddrinfo(API_IP, port, *args, **kwargs)
    return _orig_getaddrinfo(host, port, *args, **kwargs)


socket.getaddrinfo = _pinned


def token():
    out = subprocess.run(
        ["git", "credential", "fill"],
        input="protocol=https\nhost=github.com\n\n",
        capture_output=True, text=True, check=True,
    ).stdout
    for line in out.splitlines():
        if line.startswith("password="):
            return line.split("=", 1)[1].strip()
    raise RuntimeError("no token")


TOKEN = token()


def api(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(
        "https://api.github.com" + path, data=data, method=method,
        headers={
            "Authorization": "Bearer " + TOKEN,
            "Accept": "application/vnd.github+json",
            "User-Agent": "wb-publisher",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(r, timeout=60) as resp:
            raw = resp.read().decode()
            return resp.status, (json.loads(raw) if raw.strip() else None)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


def main():
    commit = subprocess.run(
        ["git", "rev-parse", "HEAD"], capture_output=True, text=True, check=True
    ).stdout.strip()
    parent = subprocess.run(
        ["git", "rev-parse", "HEAD~1"], capture_output=True, text=True, check=True
    ).stdout.strip()
    msg = subprocess.run(
        ["git", "log", "-1", "--pretty=%B"], capture_output=True, text=True, check=True
    ).stdout.strip()

    st, ref = api("GET", "/repos/%s/%s/git/ref/heads/%s" % (OWNER, REPO, BRANCH))
    print("remote ref:", st, (ref or {}).get("object", {}).get("sha"))
    if st != 200:
        raise SystemExit(str(ref)[:400])
    remote_sha = ref["object"]["sha"]
    if remote_sha == commit:
        print("already up to date"); return

    # base the new tree on the REMOTE head's tree, so this also works when the
    # remote already contains a content-identical commit created by this script.
    st, rcommit = api("GET", "/repos/%s/%s/git/commits/%s" % (OWNER, REPO, remote_sha))
    if st != 200:
        raise SystemExit("cannot read remote commit %s: %s" % (st, str(rcommit)[:300]))
    base_tree = rcommit["tree"]["sha"]
    if remote_sha != parent:
        print("note: remote head != local parent (local %s, remote %s) - "
              "applying file-level diff on top of remote" % (parent[:8], remote_sha[:8]))

    changed = subprocess.run(
        ["git", "diff", "--name-only", parent, commit],
        capture_output=True, text=True, check=True,
    ).stdout.split()
    print("changed files:", changed)

    entries = []
    for path in changed:
        blob = subprocess.run(["git", "show", "%s:%s" % (commit, path)],
                              capture_output=True, check=True).stdout
        st, b = api("POST", "/repos/%s/%s/git/blobs" % (OWNER, REPO), {
            "content": base64.b64encode(blob).decode(),
            "encoding": "base64",
        })
        if st not in (200, 201):
            raise SystemExit("blob failed %s %s" % (st, b))
        entries.append({"path": path, "mode": "100644", "type": "blob", "sha": b["sha"]})
        print("blob", path, b["sha"][:10])

    st, tree = api("POST", "/repos/%s/%s/git/trees" % (OWNER, REPO),
                   {"base_tree": base_tree, "tree": entries})
    if st not in (200, 201):
        raise SystemExit("tree failed %s %s" % (st, tree))
    print("tree", tree["sha"][:10])
    if tree["sha"] == base_tree:
        print("content already identical on remote - nothing to push"); return

    st, nc = api("POST", "/repos/%s/%s/git/commits" % (OWNER, REPO), {
        "message": msg, "tree": tree["sha"], "parents": [remote_sha],
    })
    if st not in (200, 201):
        raise SystemExit("commit failed %s %s" % (st, nc))
    print("new commit", nc["sha"])

    st, upd = api("PATCH", "/repos/%s/%s/git/refs/heads/%s" % (OWNER, REPO, BRANCH),
                  {"sha": nc["sha"], "force": False})
    print("ref update:", st, (upd or {}).get("object", {}).get("sha"))


if __name__ == "__main__":
    main()
