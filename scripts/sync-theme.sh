#!/usr/bin/env bash
# 重新加载主题：修改 .hbs / CSS / JS 后执行，无需重建容器
set -euo pipefail

cd "$(dirname "$0")/.."

docker compose restart ghost
echo "Ghost 已重启，刷新页面即可看到主题改动。"
