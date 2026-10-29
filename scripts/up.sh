#!/usr/bin/env bash
# 启动本地 Ghost 站点（在 WSL 或 Linux 中运行）
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
    echo "缺少 .env，请先执行：cp .env.example .env，并填写数据库密码。" >&2
    exit 1
fi

docker compose up -d
echo
echo "Ghost 正在启动，首次启动需要初始化数据库，大约 30-90 秒。"
echo "  前台：http://localhost:${GHOST_PORT:-2368}"
echo "  后台：http://localhost:${GHOST_PORT:-2368}/ghost/"
echo
echo "查看状态：docker compose ps"
echo "查看日志：docker compose logs -f ghost"
