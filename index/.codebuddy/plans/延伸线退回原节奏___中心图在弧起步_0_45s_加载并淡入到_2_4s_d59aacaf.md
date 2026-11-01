---
name: 延伸线退回原节奏 + 中心图在弧起步（0.45s）加载并淡入到 2.4s
overview: 把上一轮对延伸线（线/弧）的延时改动全部回退到原始节奏（线 0s 起步 .5s 走完、弧延后 .45s 用 .55s 铺开）；中心图改为在弧起步的第 0.45 秒开始加载，淡入时长改为 1.95s，使其在 2.4s 入场结束时恰好完全不透明。
todos:
  - id: revert-deco-timing
    content: 把 style.css 中延伸线的线与弧生长延时恢复为 0s 与 .45s，并还原段首注释、补注 .45s 锚点
    status: completed
  - id: sync-hub-loader
    content: 中心图加载计时改为 450ms，淡入时长改为 1950ms，同步 style.css 与 script.js 的相关注释
    status: completed
    dependencies:
      - revert-deco-timing
  - id: verify-sync
    content: 用无头浏览器逐帧采样，验证弧起步与 src 注入同帧、线 0~0.5s、弧 0.45~1.0s、淡入 2.4s 收尾
    status: completed
    dependencies:
      - sync-hub-loader
---

## 需求概述

把上一轮对「装饰延伸线」（线 + 弧）的延时改动全部撤销，恢复原始节奏；中心图的加载时机改为「弧开始延伸的那一刻」，并让淡入一直持续到入场结束的 2.4 秒。信息结构、排版、其余动效完全不变。

## 核心功能

- **线弧恢复原节奏**：线从 0s 立刻出发、0.5s 走到弧的起点；弧延后 0.45s 起步、用 0.55s 向两侧铺开，1.0s 结束。
- **中心图在弧起步那一帧开始加载**：即第 0.45 秒开始请求头像，之前（0~0.45s）中心保持空白，且不出现发光空框或裂图。
- **淡入持续到 2.4s**：图片就绪后，不透明度从 0 匀速升到 1，用时 1.95 秒（0.45 + 1.95 = 2.4），与入场摘掉 `boot` 同时收尾。
- **其余行为不变**：入场各段（圆盘、刻度、文字、左右栏、四角、版权）仍为 2.4s；静置无波纹；板块切换、圆盘拖拽、链接卡片轮盘、移动端重排均不受影响。

## 视觉结果

打开页面：圆盘淡入的同时，四条延伸线立即向圆心长；到 0.45 秒时线已接近弧的起点，弧开始向两侧铺开，**同一时刻**圆心的头像开始请求并缓慢浮现；约 2.4 秒时弧早已铺完、头像刚好完全显形，入场整体收尾。

## 技术栈

纯静态站点，沿用现有 HTML + CSS + 原生 JS（ES6）。本轮只改 `index/style.css` 与 `index/script.js`；`index.html`、`index/test.html` 共用同一套 CSS/JS，结构不动。

## 实现方案

### 1. 回退延伸线时序（style.css）

- `.show-h/.show-v .dline` 的 `transition: transform .5s cubic-bezier(.3,.05,.2,1) .5s` → 延时改回 **`0s`**（两处：水平、垂直）。
- `.show-h/.show-v .arc` 的 `transition: … .55s ease-in-out 1s` → 延时改回 **`.45s`**（`stroke-dasharray` 与 `stroke-dashoffset` 两条）。
- 弧的隐藏态（消散）保持 `.55s … 0s` 不动，保证「生长/消散」仍严格互为倒放。
- 段首注释恢复原始 4 行版本，并补一句：「弧起步的 .45s 是全站锚点，中心图在这一刻开始加载，两处成对调整」。

### 2. 中心图：0.45s 开始加载、1.95s 淡入（script.js）

- `setTimeout(loadHubImg, 1000)` → **`setTimeout(loadHubImg, 450)`**；该计时器仍**不进** `bootTimers`，交互提前打断入场也不会取消。
- `revealHubImg()` 中 `hubImg.animate(...)` 的 `duration: 1400` → **`1950`**，`easing: 'linear'` 保持（匀速，每 100ms 约涨 .051）。
- 注释同步：`loadHubImg` 段「第 1 秒」→「第 0.45 秒（= 弧起步那一刻）」；`revealHubImg` 段「1.4s / 1400ms / 每 100ms .071」→「1.95s / 1950ms / 每 100ms 约 .051」。
- `style.css` 的 `#hubImg.pending` 注释同步为「第 0.45 秒 / 1.95s」。

### 3. 时序校验

| 时刻 | 事件 |
| --- | --- |
| 0s | 线开始向圆心延伸；圆盘入场 |
| 0.45s | **弧起步 + 中心图注入 src，opacity 从 0 开始上升** |
| 0.5s | 线到位 |
| 1.0s | 弧铺完 |
| 2.4s | 头像 opacity = 1；同一帧摘 `boot` |


`setTimeout` 在 `select('core', true)` 触发过渡之后数毫秒才注册，实测 src 会比弧起步晚约 5~12ms（不足一帧），肉眼无差别；若需严格对齐可将 450 调为 440。

### 4. 性能与可靠性

- 不新增任何逐帧 JS 逻辑：线弧仍是 CSS transition，头像仍是单条 WAAPI opacity 动画（只跑一次、无 `fill`，结束后自动回收）。
- `prefers-reduced-motion` 下保持既有行为：跳过淡入直接显示，不改动全局规则。
- 失败兜底不变：加载出错则保持 `.pending`（opacity:0）并 `visibility:hidden`，不留裂图与空发光框。

## 目录结构

```
d:/AAAmp/rlcyyg_modpack/index/
├── style.css   [MODIFY] ①延伸线段首注释恢复原节奏并注明 .45s 锚点；②.show-h/.show-v .dline 的生长延时 .5s → 0s（两处）；③.show-* .arc 的生长延时 1s → .45s（两条属性）；④#hubImg.pending 注释改为「第 0.45 秒 / 1.95s」。隐藏态（消散）与其它入场时序一律不动。
└── script.js   [MODIFY] ①setTimeout(loadHubImg, 1000) → 450，并改注释；②revealHubImg 中 duration 1400 → 1950，注释同步（1.95s、每 100ms 约 .051，0.45s 起、2.4s 与入场同时收尾）。loadHubImg 上方注释里的「第 1 秒」同步改为「第 0.45 秒」。
```