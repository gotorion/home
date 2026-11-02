# Icon Set — 李俊辉个人主页

**14 个线框图标 × 3 个视觉方向 + 4 个社交品牌标记。** 全部为独立 SVG，24 × 24 viewBox，使用 `currentColor`，可缩放到 16 / 20 / 24 / 32px。

先打开 [`preview.html`](./preview.html) 看完整对比。

## 业务与视觉分析

- **业务定位**：独立开发者 / 顾问，面向小团队提供网站与产品开发、技术咨询、一对一辅导，最终行动是发邮件。
- **页面语言**：单屏左右分区，黑白建筑摄影，浅灰底 `#eeeeee`，酒红强调 `#7d0c14`，全部方角，无阴影、无渐变、无细线。
- **字体**：Archivo（拉丁）+ 阿里巴巴普惠体 3.0（中文）。
- **图标判断**：界面图标需要精确、克制、低装饰的单线形态；16px 仍然要能读。社交入口使用可识别的填充品牌标记。

## 三个方向（线框图标）

| 方向 | 线宽 | 端点 / 连接 | 圆角 | 适合 |
|---|---|---|---|---|
| **Architect**（推荐） | 1.5px | square / miter | 0 | 与当前全方角页面一致，最像建筑图纸 |
| **Precision** | 1.5px | round / round | 2px | 更常规、更柔和，标准商业产品感 |
| **Editorial** | 1.25px | round / round | 0 | 更细、更编辑排版；24/32px 最佳 |

三套共用同一套 24px 网格、2px 内边距和图标几何，只改变线宽、端点、连接和矩形圆角。

## 线框图标清单

**Services**：`code`、`browser`、`layers`、`compass`、`gauge`、`chat`、`user-check`

**Contact / Actions**：`mail`、`arrow-right`、`arrow-up-right`、`check`、`copy`

**Utilities**：`menu`、`close`

## 社交品牌标记

`brand/` 目录：

- `github.svg` — GitHub 小章鱼
- `x.svg` — X
- `douyin.svg` — 抖音（Simple Icons 没有 Douyin，使用同源的 TikTok 音符标记）
- `wechat.svg` — 微信

这些是填充形态，独立于线框图标，三套方向共用。路径来自 [Simple Icons](https://simpleicons.org/)（CC0）；品牌商标归各自所有者，仅用于对应社交链接。

## 使用

- 直接修改 `width` / `height` 为 16、20、24 或 32；`viewBox` 保持 `0 0 24 24`。
- `currentColor` 需要内联 SVG 才能继承父级颜色；用 `<img>` 引入时无法继承。
- 页面通过 Vite 的 `?raw` 导入 SVG 并内联，线框图标放在 `icons/architect/`，品牌标记放在 `icons/brand/`。

## 当前页面使用

- 服务标题：`code`、`compass`、`user-check`（20px）
- 邮件按钮：`mail`（20px）
- 社交链接：`github`、`x`、`douyin`、`wechat`（16px）

## 重新生成

```sh
node icons/generate.mjs
```

脚本会重新生成 46 个 SVG（14 × 3 + 4）、`style-spec.json` 和 `preview.html`。
