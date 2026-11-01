---
name: index站点三项调整：删波纹、入场×1.5、中心图延迟加载
overview: "在 index 目录主站（test.html + style.css + script.js）上完成三项改动：移除空闲时循环的外环波纹 #rimHint、把入场动画的延迟与时长整体 ×1.5（含装饰延伸线生长，总入场 2.4s→3.6s）、让中心图片 #hubImg 不再随 HTML 解析请求，改为第 3 秒由 JS 注入 src 并淡入。"
todos:
  - id: remove-idle-ripple
    content: "删除两份 HTML 的 #rimHint、style.css 波纹段落与 script.js 的 markInteracted 及 7 处调用"
    status: completed
  - id: scale-boot-timing
    content: "入场 delay/duration 与 #decoLines 过渡整体乘 1.5，同步 script.js 的 1875/3600/2550 计时器"
    status: completed
  - id: defer-hub-image
    content: 中心图改 data-src+pending 占位，新增幂等加载函数与独立 3000ms 计时器
    status: completed
  - id: verify-in-browser
    content: 用 [skill:playwright-cli] 打开本地 test.html 分时截图，核对波纹、时序与图片淡入
    status: completed
    dependencies:
      - remove-idle-ripple
      - scale-boot-timing
      - defer-hub-image
---

## 产品概述

个人主页（`index` 目录这套静态单页）的入场体验微调，不改变任何信息结构、排版与交互方式。

## 核心功能

- **移除静置波纹**：删掉「进入网站后不进行任何操作时，外环一圈细线反复向外扩散」的提示特效，以及配套的「首次交互后停止」逻辑。删除后静置时只保留背景亮带缓慢转动、外圈刻度环自转、中心头像 8s 光晕呼吸这三样常驻动效。
- **入场动画整体放慢到 1.5 倍**：圆盘由 0.9 倍放大淡入 → 刻度环浮现 → 板块文字浮现 → 左右信息面板与四角面板上浮 → 装饰延伸线与弧线生长 → 角落版权署名出现，先后顺序与曲线保持不变，只把每一段的延迟与时长同时乘 1.5；总入场时长由约 2.4 秒变为约 3.6 秒。装饰延伸线的「生长/消散」也同步放慢，保证来回对称。
- **中心图片第 3 秒加载**：进入页面后的前 3 秒，圆盘中心位置保持空白（不出现发光边框、不出现裂图）；第 3 秒起才开始请求中心头像，加载完成后约 0.25 秒淡入。加载失败则保持隐藏。若用户在前 3 秒内点击或按键提前结束入场，图片仍在第 3 秒开始加载，不提前、不丢失。
- **其余行为不变**：四个板块切换、圆盘拖拽旋转、链接板块的卡片轮盘、移动端重排与滚动等全部保持现状。

## 视觉结果

页面打开后先是「空环」静置约 3 秒（圆盘已长好、文字与面板依次到位），随后中心头像淡入补齐；全程看不到外环那圈周期性扩散的波纹。

## 技术栈

- 纯静态站点：HTML + CSS + 原生 JS，无框架、无构建、无依赖。沿用现有 ES6 写法（`const`/箭头函数/`querySelector`）。
- 复用现有机制：`body.boot` / `body.anim-in` 类驱动入场；`bootTimers` 数组统一管理入场计时器；`#hubImg` 已自带 `transition: ... opacity .25s ease`，只需摘类即可淡入。

## 关键前提（必须注意）

线上真正的入口是**父目录**的 `d:/AAAmp/rlcyyg_modpack/index.html`（第 19 行引 `./index/style.css`、第 379 行引 `./index/script.js`、图片走 `./index/photo/*`）。`index/test.html` 是同一页面的本地预览副本（引 `./style.css`、`./photo/*`）。

因此：**CSS 与 JS 只改 `index/` 下的一份（两处入口共用）；HTML 层的改动必须两份同步**，否则会出现「本地改好了、线上仍有波纹、图片仍早加载」的假成功。

## 实现方案

### 1. 删除静置波纹（三处联动，彻底清干净）

- HTML：删掉 `#ring` 内的 `circle#rimHint`（根 `index.html` 第 368 行、`index/test.html` 第 365 行）。**保留**其后的 `#rimHit`（拖拽命中环，游标 grab/grabbing 依赖它）。
- CSS：整段删除 `style.css` 第 739–769 行，含 `#rimHint` 规则、`body.interacted #rimHint` 规则与 `@keyframes rimHint`。
- JS：删除 `script.js` 第 1461–1467 行的 `interacted` 变量与 `markInteracted()`，并清理 7 处调用：第 86 行、第 304 行（去掉调用但保留 `select(...)`）、第 1226 行（整行）、第 1373 行与第 1396 行（整行，保留其后的 `endBoot()`）、第 1538 行（整行）。
- 已全量检索确认：JS 中除上述位置外无 `rimHint` / `interacted` 引用，删除后无残留、无未定义变量。

### 2. 入场时序 ×1.5（delay 与 duration 同乘；含装饰延伸线）

CSS 改动（`style.css` 第 1327–1358 行、第 807–814 行）：

| 选择器 | 动画 | 现 delay / duration | 改为 |
| --- | --- | --- | --- |
| `body.boot #ringWrap` / `body.anim-in #ringWrap` | bootRing | .05s / 1s | .075s / 1.5s |
| `body.boot #decor` / `anim-in #decor` | bootFade | .45s / .9s | .675s / 1.35s |
| `body.boot #labels` / `anim-in #labels` | bootFade | .85s / .7s | 1.275s / 1.05s |
| `body.boot .panel-left` / `.panel-right` | bootPanel | 1s / .8s | 1.5s / 1.2s |
| `body.boot .corner-deco` | bootFade | 1.4s / .8s | 2.1s / 1.2s |
| `body.boot .corner-panel.visible` | fadeIn | 1s / .8s | 1.5s / 1.2s |
| `body.boot #deck/#linkPanel/#linkHead/#linkBadges` | fadeIn | 1s / .8s | 1.5s / 1.2s |


`#decoLines` 过渡（第 630–705 行，「隐藏态 = 消散、`.show-*` = 生长」是成对结构，四组值必须同步乘）：

- `.dline` 隐藏态 `transform .5s cubic-bezier(.5,0,.7,.4) .5s` → `.75s ... .75s`
- `.show-h/.show-v .dline` `transform .5s cubic-bezier(.3,.05,.2,1) 0s` → `.75s ... 0s`
- `.arc` 隐藏态 `stroke-dasharray .55s ease-in-out 0s, stroke-dashoffset .55s ease-in-out 0s` → `.825s ... 0s`
- `.show-* .arc` 两条 `.55s ease-in-out .45s` → `.825s ease-in-out .675s`

JS 计时器（`script.js` 第 1485、1529、1532–1537 行）：`1250 → 1875`、`2400 → 3600`、`endBoot()` 内 `1700 → 2550`；同步更新注释里的「1s / 2.4s / ~1.6s」等描述。`body.boot-skipped` 的 `.25s` 淡入与 `300ms` 清理保持原值（属打断补偿，不是入场本体）。

时序校验：最后到位的是 `.corner-deco`（2.1 + 1.2 = 3.3s）< 摘 `boot` 的 3.6s，不会出现「类已摘、动画还没跑完」的截断。

### 3. 中心图片第 3 秒加载

- HTML（两份同步）：`img#hubImg` 去掉 `src`，改为 `class="pending"` + `data-src` 承载真实路径。**不要留空 `src=""`**（部分浏览器会把它当页面自身地址再请求一次）。两份的 `data-src` 相对路径不同：根 `index.html` 用 `./index/photo/rlcyyg1108圆.png`，`test.html` 用 `./photo/rlcyyg1108圆.png`。
- CSS：新增 `#hubImg.pending { opacity: 0 }`。必须加，因为无 src 时 `border` 与 `box-shadow` 仍会画出一个发光圆框；`opacity:0` 只隐藏不塌陷（宽高由 JS 的 `sizeHubImg()` 写在 style 上，布局不受影响）。
- JS：在启动段新增幂等加载函数 + **独立** `setTimeout(loadHubImg, 3000)`（**不要 push 进 `bootTimers`**，否则 `endBoot()` 会 `clearTimeout` 掉，用户提前点击后图片永不加载）。
- `load` → 摘 `.pending`，由既有 `opacity .25s ease` 自然淡入；
- `error` → 摘 `.pending` 并 `visibility: hidden`，不留裂图；
- `sizeHubImg()` 只按 SVG 宽度算尺寸、不依赖图片解码结果，无需改调用时机（1250→1875 那个补算照常工作）；
- `.on` / `.sel` 只改 `transform`、`box-shadow`、`animation`，不碰 `opacity`，与 `.pending` 不冲突。

## 执行要点（防回归）

- 只做局部替换：不重写整文件、不动轮盘几何、卡片轮盘、莫比乌斯带与移动端重排逻辑。
- `prefers-reduced-motion: reduce` 下动画被全局 `animation:none / transition:none` 关掉，改动后仅表现为「直接显示 + 图片瞬显」，不引入新的硬等待。
- 注意既有行为：`body.boot .corner-panel.visible a { pointer-events: none }` 会让角面板链接在入场期间不可点，入场变长后这段窗口从 2.4s 延到 3.6s（按要求如此，不是缺陷）。
- `endBoot()` 路径逐项核对：摘 `boot` → 加 `boot-skipped`（.25s 淡入）→ 2550ms 后摘 `anim-in` → 300ms 后摘 `boot-skipped`；中心图计时不受影响。
- 新增/修改的注释保持项目现有中文风格，说明「为什么」而不是「做了什么」。

## 目录结构

```
d:/AAAmp/rlcyyg_modpack/
├── index.html                    # [MODIFY] 线上入口。删除 circle#rimHint；img#hubImg 改为 class="pending" + data-src="./index/photo/rlcyyg1108圆.png"，去掉 src。
└── index/
    ├── test.html                 # [MODIFY] 本地预览副本。同样删除 #rimHint；#hubImg 改 pending + data-src="./photo/rlcyyg1108圆.png"。与根 index.html 保持逐项一致，仅路径前缀不同。
    ├── style.css                 # [MODIFY] ①删除第 739–769 行 #rimHint 整段（含 keyframes 与 body.interacted 规则）；②第 630–705 行 #decoLines 四组 transition 乘 1.5；③第 807–814 / 1327–1358 行 boot 入场的 delay 与 duration 乘 1.5；④新增 #hubImg.pending { opacity: 0 }（建议紧挨 #hubImg 主体规则放置，便于对照）。
    └── script.js                 # [MODIFY] ①删除第 1461–1467 行 markInteracted 及 7 处调用；②第 1250/2400/1700 改为 1875/3600/2550 并更新注释；③启动段新增 hubLoaded 标志、loadHubImg() 与独立 setTimeout(loadHubImg, 3000)。
```

## 关键代码结构

```js
/* 中心图延后到第 3 秒再请求：幂等，只取一次；独立于 bootTimers，交互打断也不取消 */
let hubLoaded = false;
function loadHubImg() { /* 读 hubImg.dataset.src；load → 摘 .pending；error → 摘 .pending + visibility:hidden */ }
setTimeout(loadHubImg, 3000);
```

## 验收

用浏览器打开 `index/test.html`：(a) 静置 10 秒无任何外环扩散波纹；(b) 入场明显变慢、顺序不变，约 3.3s 全部到位；(c) 前 3 秒中心为空、无边框光晕，3 秒后头像淡入；(d) 1 秒内点击板块，入场立即收尾，但 3 秒时头像仍出现；(e) 切四个板块、拖拽圆盘、链接卡片轮盘、缩窄窗口进移动端布局均正常。

## Skill

- **playwright-cli**
- Purpose: 用无头浏览器打开本地 `index/test.html`，在 1.5s / 3.4s / 4.5s 等时间点截图，客观核对「无波纹、入场变慢、中心图第 3 秒淡入」。
- Expected outcome: 得到分时截图，确认三项改动生效且无白屏、无裂图、无元素错位。