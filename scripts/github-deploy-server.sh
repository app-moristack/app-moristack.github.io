#!/usr/bin/env bash
# Administrator installs this as /usr/local/sbin/github-deploy-moristack.
set -Eeuo pipefail
umask 077
command=${1:-}
[[ "$command" =~ ^deploy\ ([0-9a-f]{40})$ ]] || { echo 'Only deploy <commit SHA> is allowed' >&2; exit 2; }
sha=${BASH_REMATCH[1]}
root=/srv/apps/moristack
exec 9>/var/lock/moristack-production-deploy.lock
flock -w 1800 9
latest=$(git ls-remote https://github.com/app-moristack/app-moristack.github.io.git refs/heads/master | cut -f1)
[[ "$latest" == "$sha" ]] || { echo 'Refusing a commit that is no longer master' >&2; exit 3; }
work=$(mktemp -d /var/tmp/moristack-deploy.XXXXXX)
previous=''
changed=0
compose=(docker compose --project-directory "$root" -f "$root/compose.production.yaml")
export IMAGE_TAG=production
finish() {
  result=$?
  trap - EXIT
  if (( result != 0 && changed == 1 )) && [[ -n "$previous" ]]; then
    docker tag "$previous" moristack:production
    "${compose[@]}" up -d --no-build --wait --wait-timeout 120 </dev/null || true
  fi
  rm -rf -- "$work"
  exit "$result"
}
trap finish EXIT
head -c 536870913 > "$work/image.tar.gz"
[[ $(stat -c %s "$work/image.tar.gz") -le 536870912 ]] || { echo 'Image exceeds 512 MB limit' >&2; exit 2; }
python3 - "$work/image.tar.gz" "$sha" <<'PY'
import json,sys,tarfile
with tarfile.open(sys.argv[1], 'r:gz') as archive:
    manifest=json.load(archive.extractfile('manifest.json'))
    assert len(manifest)==1 and manifest[0].get('RepoTags')==['moristack:'+sys.argv[2]], 'Unexpected image tags'
    config=json.load(archive.extractfile(manifest[0]['Config']))
    assert config['config']['Labels']['org.opencontainers.image.revision']==sys.argv[2], 'Image revision mismatch'
PY
docker load < "$work/image.tar.gz"
previous=$(docker image inspect moristack:production --format '{{.Id}}' 2>/dev/null || true)
if [[ -n "$previous" ]]; then docker tag "$previous" moristack:rollback; fi
docker tag "moristack:$sha" moristack:production
"${compose[@]}" config --quiet
changed=1
"${compose[@]}" up -d --no-build --wait --wait-timeout 120 </dev/null
curl --fail --silent --show-error --retry 5 --retry-delay 5 --max-time 30 https://moristack.duckdns.org/up >/dev/null
printf '%s\n' "$sha" > "$root/.last-deployed-sha"
changed=0
docker image rm "moristack:$sha" >/dev/null
printf 'Deployed MoriStack at %s\n' "$sha"
