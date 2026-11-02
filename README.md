# 李俊辉 · 个人主页

单屏个人主页。左侧是固定的建筑照片与身份卡，右侧是服务说明和邮件联系方式，桌面端不需要滚动。

## 开发

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
npm run preview  # 预览生产构建
```

## 结构

```text
public/
  images/        4 张建筑氛围图（Liam Andrew 等 / Unsplash）
  fonts/         阿里巴巴普惠体 3.0 子集
  avatar.svg     占位头像
icons/
  architect/     页面使用的线框图标
  brand/         社交品牌标记
  preview.html   三套方向 + 品牌标记预览
src/
  pages/index.astro  页面、样式、交互
```

内容都集中在 `src/pages/index.astro` 顶部的 `profile`、`socials`、`services` 数组里，改完重新构建即可。

## 字体

- 拉丁字符：Archivo（`@fontsource-variable/archivo`，自托管）
- 中文：阿里巴巴普惠体 3.0（55 Regular / 75 SemiBold 的 WOFF2 子集）
- 子集覆盖 GB2312 与页面用字；生僻字会回退到系统字体
- 授权与来源见 `public/fonts/LICENSE.txt`

## 部署

`npm run build` 生成纯静态的 `dist/`，可直接交给 Caddy、Nginx 或任意静态托管。

### Cloudflare Pages

- 连接 GitHub 仓库 `gotorion/home`
- Framework preset：`Astro`
- Build command：`npm run build`
- Build output directory：`dist`
- Node 版本：Astro 7 要求 **Node >= 22.23.4**。仓库里的 `.nvmrc` 已指定 `22.23.4`；Cloudflare 的默认 Node 22 可能是 22.16.0，会构建失败，请在 Pages → Settings → Environment variables 里增加 `NODE_VERSION=22.23.4`
- 自定义域名：Pages → Custom domains → 添加域名并按提示配置 DNS

`public/_headers` 会被复制到 `dist/`，Cloudflare Pages 会自动应用安全响应头和静态资源缓存策略。

## 待替换

- GitHub / X / 抖音 / 公众号的实际链接
- 头像与建筑照片（建议换成自己的项目或工作环境照片）
- 服务文案
