# varnum-api

Accounts, saved-letter sync and private usage counts for Varnum. Runs on Jarvis (Node + PostgreSQL), port 8103,
served at https://varnum-api.alvvintechnology.com. The website itself is static and runs on Friday.

- `scripts/setup-db.sh` (once, with sudo on Jarvis): creates the `varnum` database and role and writes
  `/srv/sites/VarnumApi/.env` (`PORT`, `HOST`, `DATABASE_URL`, `ADMIN_USER`, `ADMIN_PASSWORD`).
  Optional: `ORIGINS` (comma separated) if the site moves; default is the Varnum site and the Android app.
- Backups: the nightly `jarvis-backup` job dumps every PostgreSQL database, this one included.
- Admin page: https://varnum-api.alvvintechnology.com/ (HTTP basic auth) shows accounts and daily usage.

What is stored: name, email, a scrypt password hash, letterhead details, saved letters (only when the user
presses Save letter), and per-day counts of which features were used. Letter text is never counted or logged.
