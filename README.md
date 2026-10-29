# Home

个人站点，技术栈与 [felixrieseberg.com](https://felixrieseberg.com) 一致：

- **Ghost 6**（CMS / 写作后台）
- **MySQL 8**（数据库）
- **Caddy**（生产环境反向代理，自动 HTTPS）
- **自定义 Ghost 主题**（`themes/home`，暗色优先，支持亮色切换）

主题和内容都保存在仓库里，可以本地开发，也可以原样部署到自己的服务器。

---

## 目录结构

```
.
├── compose.yml              # Ghost + MySQL（本地开发 / 服务器基础服务）
├── compose.prod.yml         # 生产环境追加 Caddy（自动 HTTPS）
├── caddy/Caddyfile          # Caddy 配置
├── .env.example             # 环境变量模板
├── themes/home/             # 自定义主题（本次的核心）
│   ├── package.json
│   ├── default.hbs          # 页面骨架
│   ├── index.hbs            # 首页
│   ├── post.hbs             # 文章页
│   ├── page.hbs             # 独立页面
│   ├── tag.hbs / author.hbs # 标签 / 作者归档
│   ├── error.hbs            # 错误页
│   ├── partials/            # 页头、页脚、文章卡片、订阅区
│   └── assets/              # CSS、JS、自托管字体
└── scripts/                 # 启动、重启、备份脚本
```

---

## 本地运行

当前机器上 Docker 安装在 **WSL2 的 Ubuntu** 里（宿主机无法直连 Docker Hub，WSL 内正常）。在 Windows 终端里执行：

```bash
wsl -d Ubuntu -e bash -lc "cd /mnt/c/Users/lijun/Documents/home && docker compose up -d"
```

或者直接进入 WSL 后操作：

```bash
wsl -d Ubuntu
cd /mnt/c/Users/lijun/Documents/home
docker compose up -d
```

首次启动会拉取镜像并初始化 MySQL，大约需要 1–2 分钟。之后：

- 前台：<http://localhost:2368>
- 后台：<http://localhost:2368/ghost/>

### 首次设置

1. 打开 <http://localhost:2368/ghost/>，创建站长账号（邮箱 + 密码）。
2. 进入 **Settings → Design → Change theme**，选择 **home** 并点击 **Activate**。
3. 在 **Settings → General** 中填写站点标题、描述、语言（建议 `zh-CN`），上传图标。
4. 在 **Settings → Navigation** 中配置顶部导航。
5. 发布第一篇文章，首页会自动出现文章卡片。

> 站点标题和描述会直接出现在首页 Hero 区域，不需要改代码。
>
> Ghost 镜像自带一篇 “Coming soon” 演示文章和一个 About 页面，可在后台直接删除或改写。

### 修改主题

主题目录 `themes/home` 已单独挂载进容器，改完 `.hbs` / CSS / JS 后执行：

```bash
wsl -d Ubuntu -e bash -lc "cd /mnt/c/Users/lijun/Documents/home && docker compose restart ghost"
```

常用入口：

| 想改什么 | 文件 |
| --- | --- |
| 颜色、间距、排版 | `themes/home/assets/css/main.css` |
| 首页 Hero、文章列表 | `themes/home/index.hbs` |
| 文章页布局 | `themes/home/post.hbs` |
| 顶部导航 / 页脚 | `themes/home/partials/header.hbs`、`footer.hbs` |
| 交互（菜单、配色切换） | `themes/home/assets/js/main.js` |

### 常用命令

```bash
docker compose ps                 # 查看服务状态
docker compose logs -f ghost      # 查看 Ghost 日志
docker compose restart ghost      # 改主题后重启
docker compose down               # 停止（数据保留在 Docker volume 中）
docker compose up -d              # 再次启动
bash scripts/backup.sh            # 备份数据库和上传内容
```

### 更新 Ghost

`.env` 中 `GHOST_VERSION=6-alpine` 会跟随 6.x 最新小版本。更新前先备份：

```bash
bash scripts/backup.sh
docker compose pull ghost
docker compose up -d ghost
```

---

## 部署到自己的服务器

### 1. 准备服务器

一台 Linux 服务器（Ubuntu 22.04+ 即可），安装 Docker Engine 和 Compose 插件。然后打开防火墙的 80、443 端口。

把项目传到服务器，例如 `/opt/home-site`：

```bash
rsync -av --exclude backups --exclude .env ./ user@your-server:/opt/home-site/
```

### 2. 配置环境变量

在服务器上：

```bash
cd /opt/home-site
cp .env.example .env
```

编辑 `.env`：

```dotenv
SITE_URL=https://your-domain.com
DOMAIN=your-domain.com
DATABASE_PASSWORD=<新密码>
DATABASE_ROOT_PASSWORD=<新密码>
```

密码用 `openssl rand -hex 16` 重新生成，不要复用本地密码。

### 3. 配置域名

在域名服务商处添加 A 记录（IPv6 则加 AAAA），指向服务器公网 IP。等待解析生效。

### 4. 启动

```bash
docker compose -f compose.yml -f compose.prod.yml up -d
```

Caddy 会自动申请 Let's Encrypt 证书。几十秒后访问 `https://your-domain.com`，后台在 `https://your-domain.com/ghost/`。

> 首次部署同样需要创建站长账号并在后台激活 `home` 主题。

### 5. 备份

```bash
bash scripts/backup.sh
```

会生成两个文件：

- `backups/db-<时间>.sql.gz` —— 数据库（文章、会员、设置）
- `backups/content-<时间>.tar.gz` —— 上传的图片和主题

建议用 cron 每天跑一次，并把 `backups/` 同步到别处（对象存储、另一台机器）。

恢复数据库：

```bash
gunzip -c backups/db-<时间>.sql.gz | \
  docker compose exec -T db sh -c 'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql -uroot ghost'
```

恢复上传内容：

```bash
docker compose cp backups/content-<时间>.tar.gz ghost:/tmp/content.tar.gz
docker compose exec ghost tar -xzf /tmp/content.tar.gz -C /var/lib/ghost/content --strip-components=0
# 具体解压路径按压缩包内的目录结构调整
```

### 6. 邮件（建议配置）

Ghost 的登录、密码重置、员工邀请需要事务邮件；如果要发 Newsletter，还需要配置批量邮件服务（Mailgun、Amazon SES 等）。把以下配置加入 `.env`（本地开发可跳过）：

```dotenv
mail__transport=SMTP
mail__options__host=smtp.example.com
mail__options__port=465
mail__options__secure=true
mail__options__auth__user=no-reply@example.com
mail__options__auth__pass=your-smtp-password
mail__from="Your Name <no-reply@example.com>"
```

修改后重启 Ghost 生效。

---

## 使用 Ghost Pro（不自己运维）

如果以后不想维护服务器，也可以直接用 Ghost Pro 托管：数据迁移到 Ghost Pro 后，把 `themes/home` 打成 zip 上传即可（**Settings → Design → Change theme → Upload theme**）。

```bash
cd themes/home
zip -r ../../home-theme.zip . -x "*.DS_Store" -x "__MACOSX/*"
```

主题本身不依赖 Docker，Ghost Pro 可以直接使用。

---

## 说明

- **Tech stack**：Ghost 6.73 / MySQL 8.0 / Caddy 2，主题为原生 Handlebars，无前端框架依赖。
- **字体**：Archivo（SIL OFL）已自托管在主题内，访客不依赖 Google Fonts。
- **数据**：Docker named volume（`home_ghost_content`、`home_mysql_data`），删除容器不会丢数据；`docker compose down -v` 才会删除，谨慎使用。
- **端口**：Ghost 默认只监听 `127.0.0.1:2368`，生产环境通过 Caddy 对外提供服务。
