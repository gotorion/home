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

## 待替换

- GitHub / X / 抖音 / 公众号的实际链接
- 头像与建筑照片（建议换成自己的项目或工作环境照片）
- 服务文案
