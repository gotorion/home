#!/usr/bin/env bash
# 备份 MySQL 数据库和 Ghost 上传内容（图片、主题、会员数据等）
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
    echo "缺少 .env" >&2
    exit 1
fi

# shellcheck disable=SC1091
set -a
. ./.env
set +a

mkdir -p backups
stamp="$(date +%Y%m%d-%H%M%S)"

echo "→ 备份数据库…"
docker compose exec -T \
    -e MYSQL_PWD="${DATABASE_ROOT_PASSWORD}" \
    db mysqldump -uroot --single-transaction --routines --triggers ghost \
    | gzip > "backups/db-${stamp}.sql.gz"

echo "→ 备份上传内容…"
docker compose cp ghost:/var/lib/ghost/content "./backups/content-${stamp}"
tar -C "backups" -czf "backups/content-${stamp}.tar.gz" "content-${stamp}"
rm -rf "backups/content-${stamp}"

echo "✓ 完成："
ls -lh backups/db-"${stamp}".sql.gz backups/content-"${stamp}".tar.gz
