import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));

const SETS = [
  {
    id: 'architect',
    name: 'Architect',
    preset: 'Sharp',
    strokeWidth: 1.5,
    cap: 'square',
    join: 'miter',
    radius: 0,
    recommended: true,
    description:
      '精确、克制、建筑感。方头端点与斜接角对应页面的全方角体系，和黑白建筑照片同一种语言。',
  },
  {
    id: 'precision',
    name: 'Precision',
    preset: 'Clean',
    strokeWidth: 1.5,
    cap: 'round',
    join: 'round',
    radius: 2,
    recommended: false,
    description:
      '同一套几何，换成圆头和 2px 转角。更常规、更柔和，接近成熟产品型的商业界面。',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    preset: 'Minimal',
    strokeWidth: 1.25,
    cap: 'round',
    join: 'round',
    radius: 0,
    recommended: false,
    description:
      '更细的 1.25px 线宽，保持 0 圆角。最轻、最像编辑排版；24/32px 最佳，16px 在普通屏上会偏淡。',
  },
];

const chatBody = (s) =>
  s.radius > 0
    ? `<path d="M5 5H19C20.1 5 21 5.9 21 7V14.5C21 15.6 20.1 16.5 19 16.5H9L5 20.5V16.5H5C3.9 16.5 3 15.6 3 14.5V7C3 5.9 3.9 5 5 5Z"/>
<line x1="7" y1="9.5" x2="17" y2="9.5"/>
<line x1="7" y1="12.5" x2="14" y2="12.5"/>`
    : `<path d="M3 5H21V16.5H9L5 20.5V16.5H3Z"/>
<line x1="7" y1="9.5" x2="17" y2="9.5"/>
<line x1="7" y1="12.5" x2="14" y2="12.5"/>`;

const ICONS = [
  {
    id: 'code',
    group: 'Services',
    zh: '开发',
    en: 'Code',
    body: () => `<path d="M9 7L4.5 12L9 17"/>
<path d="M15 7L19.5 12L15 17"/>
<path d="M13.5 6.5L10.5 17.5"/>`,
  },
  {
    id: 'browser',
    group: 'Services',
    zh: '网站',
    en: 'Browser',
    body: (s) => `<rect x="3" y="4.5" width="18" height="15" rx="${s.radius}"/>
<line x1="3" y1="9" x2="21" y2="9"/>
<circle cx="6.5" cy="6.75" r="1.25" fill="currentColor" stroke="none"/>`,
  },
  {
    id: 'layers',
    group: 'Services',
    zh: '产品',
    en: 'Layers',
    body: () => `<path d="M12 3.5L20.5 8L12 12.5L3.5 8Z"/>
<path d="M3.5 12L12 16.5L20.5 12"/>
<path d="M3.5 16L12 20.5L20.5 16"/>`,
  },
  {
    id: 'compass',
    group: 'Services',
    zh: '咨询',
    en: 'Compass',
    body: () => `<circle cx="12" cy="12" r="9"/>
<path d="M12 6.5L15 12L12 17.5L9 12Z"/>
<circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/>`,
  },
  {
    id: 'gauge',
    group: 'Services',
    zh: '性能',
    en: 'Gauge',
    body: () => `<path d="M4 16A8 8 0 0 1 20 16"/>
<path d="M12 16L15.5 10.5"/>
<circle cx="12" cy="16" r="1.25" fill="currentColor" stroke="none"/>`,
  },
  {
    id: 'chat',
    group: 'Services',
    zh: '沟通',
    en: 'Chat',
    body: chatBody,
  },
  {
    id: 'user-check',
    group: 'Services',
    zh: '辅导',
    en: 'User check',
    body: () => `<circle cx="10" cy="8" r="3.25"/>
<path d="M3.5 20C3.5 16.4 6.2 14 10 14C11.3 14 12.6 14.3 13.7 14.9"/>
<path d="M15.5 18.5L17.5 20.5L21 16"/>`,
  },
  {
    id: 'mail',
    group: 'Contact',
    zh: '邮件',
    en: 'Mail',
    body: (s) => `<rect x="3" y="5.5" width="18" height="13" rx="${s.radius}"/>
<path d="M3.5 6.5L12 13L20.5 6.5"/>`,
  },
  {
    id: 'arrow-right',
    group: 'Actions',
    zh: '行动',
    en: 'Arrow right',
    body: () => `<line x1="3.5" y1="12" x2="20.5" y2="12"/>
<path d="M14.5 6L20.5 12L14.5 18"/>`,
  },
  {
    id: 'arrow-up-right',
    group: 'Actions',
    zh: '外链',
    en: 'Arrow up right',
    body: () => `<line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/>
<path d="M8.5 6.5H17.5V15.5"/>`,
  },
  {
    id: 'check',
    group: 'Actions',
    zh: '完成',
    en: 'Check',
    body: () => `<path d="M4 12.5L9.5 18L20 6.5"/>`,
  },
  {
    id: 'copy',
    group: 'Actions',
    zh: '复制',
    en: 'Copy',
    body: (s) => `<rect x="8.5" y="3.5" width="12" height="12" rx="${s.radius}"/>
<rect x="3.5" y="8.5" width="12" height="12" rx="${s.radius}"/>`,
  },
  {
    id: 'menu',
    group: 'Utilities',
    zh: '菜单',
    en: 'Menu',
    body: () => `<line x1="4" y1="7" x2="20" y2="7"/>
<line x1="4" y1="12" x2="20" y2="12"/>
<line x1="4" y1="17" x2="20" y2="17"/>`,
  },
  {
    id: 'close',
    group: 'Utilities',
    zh: '关闭',
    en: 'Close',
    body: () => `<circle cx="12" cy="12" r="8.5"/>
<line x1="9" y1="9" x2="15" y2="15"/>
<line x1="15" y1="9" x2="9" y2="15"/>`,
  },
];

// Filled brand marks. Simple Icons (CC0); trademarks belong to their owners.
// Douyin has no Simple Icons entry, so the TikTok note mark is used for the Douyin link.
const BRANDS = [
  {
    id: 'github',
    zh: 'GitHub',
    en: 'GitHub',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    id: 'x',
    zh: 'X',
    en: 'X',
    path: 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z',
  },
  {
    id: 'douyin',
    zh: '抖音',
    en: 'Douyin (TikTok mark)',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    id: 'wechat',
    zh: '微信',
    en: 'WeChat',
    path: 'M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z',
  },
];

const svg = (body, set, size = 24) => {
  const indented = body.trim().split('\n').map((line) => `  ${line}`).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${set.strokeWidth}" stroke-linecap="${set.cap}" stroke-linejoin="${set.join}">
${indented}
</svg>`;
};

const brandSvg = (path, size = 24) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor">
  <path d="${path}"/>
</svg>`;

for (const set of SETS) {
  const dir = join(root, set.id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const icon of ICONS) {
    writeFileSync(join(dir, `${icon.id}.svg`), `${svg(icon.body(set), set)}\n`);
  }
}

const brandDir = join(root, 'brand');
rmSync(brandDir, { recursive: true, force: true });
mkdirSync(brandDir, { recursive: true });
for (const brand of BRANDS) {
  writeFileSync(join(brandDir, `${brand.id}.svg`), `${brandSvg(brand.path)}\n`);
}

const spec = {
  project: '李俊辉 homepage',
  grid: 24,
  padding: 2,
  sizes: [16, 20, 24, 32],
  iconCount: ICONS.length + BRANDS.length,
  icons: [
    ...ICONS.map(({ id, group, zh, en }) => ({ id, group, zh, en })),
    ...BRANDS.map(({ id, zh, en }) => ({ id, group: 'Brand', zh, en })),
  ],
  sets: SETS.map(({ id, name, preset, strokeWidth, cap, join, radius, recommended }) => ({
    id,
    name,
    preset,
    recommended,
    strokeWidth,
    strokeLinecap: cap,
    strokeLinejoin: join,
    cornerRadius: radius,
  })),
  brands: BRANDS.map(({ id, zh, en }) => ({ id, zh, en, file: `brand/${id}.svg` })),
  generated: '2026-11-02',
};

writeFileSync(join(root, 'style-spec.json'), `${JSON.stringify(spec, null, 2)}\n`);

const compareIds = ['code', 'compass', 'user-check', 'mail', 'check', 'close'];
const compareIcons = compareIds.map((id) => ICONS.find((icon) => icon.id === id));

const iconCard = (icon, set) => {
  const sizes = [16, 20, 24, 32]
    .map(
      (size) => `<figure class="size">
        ${svg(icon.body(set), set, size)}
        <figcaption>${size}</figcaption>
      </figure>`
    )
    .join('');
  return `<article class="icon-card">
    <div class="sizes">${sizes}</div>
    <div class="meta">
      <span class="icon-name">${icon.id}</span>
      <span class="icon-label">${icon.zh} · ${icon.en}</span>
      <span class="icon-file">${set.id}/${icon.id}.svg</span>
    </div>
  </article>`;
};

const setSection = (set) => `<section class="set" id="${set.id}">
  <div class="set-head">
    <div>
      <h2>${set.name}${set.recommended ? '<span class="badge">推荐</span>' : ''}</h2>
      <p>${set.description}</p>
    </div>
    <div class="chips">
      <span>24px grid</span>
      <span>${set.strokeWidth}px stroke</span>
      <span>${set.cap} caps</span>
      <span>${set.join} joins</span>
      <span>${set.radius}px corners</span>
      <span>2px padding</span>
    </div>
  </div>
  <div class="grid">${ICONS.map((icon) => iconCard(icon, set)).join('')}</div>
  <div class="dark-band">
    <div class="dark-head"><span>深色背景检查</span><span>24px</span></div>
    <div class="dark-grid">${ICONS.map(
      (icon) => `<div class="dark-icon">${svg(icon.body(set), set, 24)}<span>${icon.id}</span></div>`
    ).join('')}</div>
  </div>
</section>`;

const compareTable = `<table class="compare">
  <thead>
    <tr><th>Direction</th>${compareIcons.map((icon) => `<th>${icon.id}</th>`).join('')}</tr>
  </thead>
  <tbody>
    ${SETS.map(
      (set) => `<tr><th>${set.name}</th>${compareIcons
        .map((icon) => `<td>${svg(icon.body(set), set, 32)}</td>`)
        .join('')}</tr>`
    ).join('')}
  </tbody>
</table>`;

const brandCard = (brand) => {
  const sizes = [16, 20, 24, 32]
    .map(
      (size) => `<figure class="size">
        ${brandSvg(brand.path, size)}
        <figcaption>${size}</figcaption>
      </figure>`
    )
    .join('');
  return `<article class="icon-card">
    <div class="sizes">${sizes}</div>
    <div class="meta">
      <span class="icon-name">${brand.id}</span>
      <span class="icon-label">${brand.zh} · ${brand.en}</span>
      <span class="icon-file">brand/${brand.id}.svg</span>
    </div>
  </article>`;
};

const brandGlance = `<div class="brand-glance">
  <span class="brand-glance-label">Social brand marks</span>
  ${BRANDS.map(
    (brand) => `<span class="brand-glance-item">${brandSvg(brand.path, 32)}<em>${brand.zh}</em></span>`
  ).join('')}
</div>`;

const brandSection = `<section class="set brand-set" id="brand">
  <div class="set-head">
    <div>
      <h2>Social brand marks</h2>
      <p>社交入口使用可识别的品牌标记：GitHub 小章鱼、X、抖音、微信。它们是填充形态，作为独立于线框图标的品牌层，三套方向共用。</p>
    </div>
    <div class="chips">
      <span>24px grid</span>
      <span>filled</span>
      <span>currentColor</span>
      <span>shared</span>
    </div>
  </div>
  <div class="grid">${BRANDS.map(brandCard).join('')}</div>
  <div class="dark-band">
    <div class="dark-head"><span>深色背景检查</span><span>24px</span></div>
    <div class="dark-grid">${BRANDS.map(
      (brand) => `<div class="dark-icon">${brandSvg(brand.path, 24)}<span>${brand.id}</span></div>`
    ).join('')}</div>
  </div>
</section>`;

const preview = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>李俊辉 · Icon Set Preview</title>
<style>
  :root {
    --bg: #eeeeee;
    --surface: #f6f6f6;
    --ink: #161616;
    --muted: #6b6b6b;
    --line: #d6d6d6;
    --accent: #7d0c14;
    --dark: #161616;
    --dark-ink: #eeeeee;
  }
  * { box-sizing: border-box; }
  html { color-scheme: light; }
  body {
    margin: 0 auto;
    max-width: 1280px;
    padding: 48px 32px 72px;
    background: var(--bg);
    color: var(--ink);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 16px;
    line-height: 1.55;
  }
  h1 { margin: 0 0 4px; font-size: 2rem; font-weight: 600; letter-spacing: -0.03em; }
  h2 { margin: 0; font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; }
  p { margin: 0; }
  .subtitle { color: var(--muted); font-size: 0.875rem; }
  .brief {
    margin: 28px 0 32px;
    padding: 20px 24px;
    background: var(--surface);
    font-size: 0.9375rem;
    color: var(--muted);
  }
  .brief strong { color: var(--ink); }
  .note { margin: 16px 0 0; font-size: 0.9375rem; }
  .note strong { color: var(--accent); }
  .compare {
    width: 100%;
    margin: 32px 0 16px;
    border-collapse: collapse;
    background: var(--surface);
  }
  .compare th, .compare td {
    padding: 12px 16px;
    text-align: center;
    border-bottom: 1px solid var(--line);
    font-size: 0.8125rem;
    font-weight: 400;
    color: var(--muted);
  }
  .compare th { font-weight: 600; color: var(--ink); text-align: left; }
  .compare thead th { color: var(--muted); }
  .compare tbody tr:last-child th, .compare tbody tr:last-child td { border-bottom: 0; }
  .compare td svg { display: block; margin: 0 auto; color: var(--ink); }
  .set { margin-top: 56px; }
  .set-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line);
  }
  .set-head p { max-width: 52ch; margin-top: 6px; font-size: 0.9375rem; color: var(--muted); }
  .badge {
    display: inline-block;
    margin-left: 10px;
    padding: 2px 8px;
    background: var(--accent);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    vertical-align: middle;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 6px;
    max-width: 380px;
  }
  .chips span {
    padding: 3px 8px;
    background: var(--surface);
    color: var(--muted);
    font-size: 0.75rem;
    white-space: nowrap;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 12px;
  }
  .icon-card {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px;
    background: var(--surface);
  }
  .sizes {
    display: flex;
    align-items: center;
    gap: 11px;
    height: 52px;
  }
  .size { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .size svg { display: block; color: var(--ink); }
  .size figcaption { font-size: 0.625rem; color: var(--muted); font-variant-numeric: tabular-nums; }
  .meta { display: flex; flex-direction: column; gap: 2px; }
  .icon-name { font-size: 0.875rem; font-weight: 600; }
  .icon-label { font-size: 0.75rem; color: var(--muted); }
  .icon-file { font-size: 0.6875rem; color: var(--muted); font-variant-numeric: tabular-nums; }
  .dark-band {
    margin-top: 12px;
    padding: 18px 20px 20px;
    background: var(--dark);
    color: var(--dark-ink);
  }
  .dark-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
    font-size: 0.75rem;
    color: #999999;
  }
  .dark-grid { display: flex; flex-wrap: wrap; gap: 18px 22px; }
  .dark-icon { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 56px; }
  .dark-icon svg { display: block; color: var(--dark-ink); }
  .dark-icon span { font-size: 0.625rem; color: #999999; }
  .brand-glance {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin-top: 16px;
    padding: 16px 20px;
    background: var(--surface);
  }
  .brand-glance-label { font-size: 0.8125rem; color: var(--muted); }
  .brand-glance-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .brand-glance-item svg { display: block; color: var(--ink); }
  .brand-glance-item em { font-style: normal; font-size: 0.625rem; color: var(--muted); }
  footer { margin-top: 64px; padding-top: 20px; border-top: 1px solid var(--line); font-size: 0.8125rem; color: var(--muted); }
  @media (max-width: 760px) {
    body { padding: 32px 18px 56px; }
    .set-head { flex-direction: column; }
    .chips { justify-content: flex-start; }
    .grid { grid-template-columns: 1fr; }
    .compare { display: block; overflow-x: auto; white-space: nowrap; }
  }
</style>
</head>
<body>
  <h1>李俊辉 · Icon Set</h1>
  <p class="subtitle">18 marks · 14 line icons × 3 directions + 4 brand marks · 24px grid · 16 / 20 / 24 / 32px · 2026-11-02</p>

  <div class="brief">
    <strong>Brief.</strong> 独立开发者个人主页：网站与产品开发、技术咨询、一对一辅导；全方角、黑白建筑摄影、灰底与酒红强调。界面图标精确、克制；社交入口使用可识别的品牌标记。不依赖 Emoji。
  </div>

  <p class="note">推荐 <strong>Architect</strong>：1.5px 方头、斜接角、0 圆角，与页面现有的全方角体系一致。Precision 更常规，Editorial 更轻、更适合 24–32px。社交图标为填充品牌标记，三套方向共用。</p>

  ${compareTable}
  ${brandGlance}

  ${SETS.map(setSection).join('\n')}
  ${brandSection}

  <footer>
    所有 SVG 使用 currentColor，24 × 24 viewBox，直接设置 width/height 即可缩放到 16 / 20 / 24 / 32px。界面图标位于 icons/&lt;direction&gt;/&lt;name&gt;.svg，品牌标记位于 icons/brand/&lt;name&gt;.svg；运行 <code>node icons/generate.mjs</code> 可重新生成。
  </footer>
</body>
</html>
`;

writeFileSync(join(root, 'preview.html'), preview);
console.log(`Generated ${ICONS.length * SETS.length + BRANDS.length} SVGs, style-spec.json and preview.html`);
