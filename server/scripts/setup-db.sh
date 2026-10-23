#!/usr/bin/env bash
# One-time on Jarvis (run with sudo): install PostgreSQL if missing, create role + database for the Varnum API,
# and write /srv/sites/VarnumApi/.env (keeping any existing values). Backups come from the nightly jarvis-backup job.
set -euo pipefail
[ "$(id -u)" = 0 ] || { echo "run with sudo" >&2; exit 2; }
SITE_USER="${SITE_USER:-stark}"; DIR=/srv/sites/VarnumApi; ENV="$DIR/.env"
DB=varnum; ROLE=varnum

if ! command -v psql >/dev/null; then
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq postgresql >/dev/null
fi
systemctl enable --now postgresql >/dev/null
install -d -o "$SITE_USER" -g "$SITE_USER" -m 0755 "$DIR"

# password: reuse the one already in .env, else generate
PW=""
[ -f "$ENV" ] && PW=$(grep -oE '^DATABASE_URL=postgres://[^:]+:[^@]+@' "$ENV" | sed -E 's|.*:([^@]+)@|\1|' || true)
# (openssl output is finite, so no SIGPIPE under pipefail, unlike `tr </dev/urandom | head`)
[ -n "$PW" ] || PW=$(openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | cut -c1-32)

sudo -u postgres psql -v ON_ERROR_STOP=1 -q <<SQL
DO \$\$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='$ROLE') THEN CREATE ROLE $ROLE LOGIN PASSWORD '$PW';
  ELSE ALTER ROLE $ROLE WITH LOGIN PASSWORD '$PW'; END IF;
END \$\$;
SQL
sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB'" | grep -q 1 || sudo -u postgres createdb -O "$ROLE" "$DB"

# .env: create or update only the keys we own
touch "$ENV"; chown "$SITE_USER:$SITE_USER" "$ENV"; chmod 600 "$ENV"
setkv() { if grep -q "^$1=" "$ENV"; then sed -i "s|^$1=.*|$1=$2|" "$ENV"; else echo "$1=$2" >> "$ENV"; fi; }
setkv PORT 8103
setkv HOST 127.0.0.1
setkv DATABASE_URL "postgres://$ROLE:$PW@127.0.0.1:5432/$DB"
grep -q '^ADMIN_USER=' "$ENV" || setkv ADMIN_USER admin
grep -q '^ADMIN_PASSWORD=.\+' "$ENV" || setkv ADMIN_PASSWORD "$(openssl rand -base64 30 | tr -dc 'A-Za-z0-9' | cut -c1-20)"

# Backups: NOT here. Jarvis has one nightly job, `jarvis-backup` (03:30 IST, /srv/data/backups), that dumps
# every PostgreSQL database it finds, this one included (owner rule 2026-10-13: one backup job, never several).
echo "db '$DB' role '$ROLE' ready; env in $ENV; backups via the nightly jarvis-backup job"
echo "admin login: $(grep '^ADMIN_USER=' "$ENV" | cut -d= -f2) / (password in $ENV)"
