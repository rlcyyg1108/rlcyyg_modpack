---
name: 亮带收窄（A 档色标）+ 配色回退纯黑白 + 删常驻 will-change
overview: "把背景亮带的渐变色标从 24/40/60/76 收到 38/45/55/62（A 档），使\"由亮到暗\"的变化区间落进屏幕内、光带宽度减半；同时把上一轮引入的冷灰/冷白全部回退为纯中性灰（底色 #0d0d10、峰值 #34343e、文字光晕纯白、theme-color 同步），并去掉 .bg-band 上的常驻 will-change。"
todos:
  - id: restyle-band
    content: 重写 style.css 的 .bg-band 渐变为 38/45/55/62 纯中性灰，删 will-change 并同步段首注释
    status: completed
  - id: revert-cold
    content: "body 与 #bgField 底色回 #0d0d10，10 处文字光晕回纯白，两份 HTML theme-color 同步"
    status: completed
    dependencies:
      - restyle-band
  - id: verify-visual
    content: 用本机 Edge 逐像素测带子宽度与对比、截图核对纯黑白与 X 形态，并列出临时文件路径
    status: completed
    dependencies:
      - revert-cold
---

## 产品概述
个人主页（`index/test.html`）的「项目」板块重构：原结构是「左栏 3 段文字 + 右下角贡献面板」，项目变多后放不下。改为**左右两列的项目条目列表**，每列最多 5 条，本期先左 1 条、右 3 条，左右都有内容可看。

## 核心功能
- **删标题**：「项目」大字与 `PROJECTS` 英文小标都删除，项目列表直接从第一条开始。
- **删贡献**：右下角「贡献 / CONTRIBUTION」面板的汉化语言包内容整段删除，原位改为右列项目。
- **条目结构**（左右共用一套）：
  1. 32px 标题（纯文本，不可点击）
  2. 一行英文副标题（14px，字距 .4em）
  3. 一行纯图标链接：GitHub、MC百科、CurseForge，20px 灰度图标，悬停提亮并上移；缺链接不占位
  4. 两行 20px 正文，手动断行，不截断
  5. 每条**上方**一条 1px 细分隔线（第一条也有）
- **两列布局**：左右两列上下边距相同、可用高度相等，条目在高度内均匀分布；右列文字整体右对齐、图标顺序镜像，与左列围绕圆盘形成左右对称。
- **自适应压缩**：视口变矮时字号不缩，只自动压缩正文行高与条目间距，尽量保证两列都排得下。
- **移动端**：两列合并为一列纵向堆叠，顺序为「硬盘拯救者 → 三个模组」；全部左对齐，分隔线更淡。
- **数据**：硬盘拯救者仅 GitHub；三个 MC 模组的 MC百科 / CurseForge 链接暂用占位，后续补填。

## 视觉要点
保持站点既有语言：纯黑白、无边框卡片、靠留白与 1px 细线分块；标题最重、英文副标题最轻、图标行最淡；右列与左列严格镜像。


## 技术栈
沿用现有原生技术，不引入构建或框架：`index/test.html`（结构）+ `index/style.css`（样式），`index/script.js` 不改（仅验证其移动端重排与板块切换不受影响）。

## 实现方案

### 1. 结构（`index/test.html`）
删除贡献面板内部三个节点（`.p-desc`、`.p-en`、`.p-name`），保留容器 `.corner-panel.br[data-corner="projects"]` 作为右列（它的显示/隐藏、入场动画、移动端搬运都靠这个容器）。左列删除 `.p-name` / `.p-en`，只留 1 条。

每条统一用新语义类，左右完全同构：

```html
<div class="proj">
  <div class="proj-title">简单信息展示</div>
  <div class="proj-en">SIMPLE INFO</div>
  <div class="proj-links">
    <a href="https://github.com/rlcyyg1108/SimpleInfo" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><img src="./photo/github-s.png" alt=""></a>
    <a href="#" aria-label="MC百科"><img src="./photo/mcmod-s.png" alt=""></a><!-- TODO: 补 mcmod 链接 -->
    <a href="#" aria-label="CurseForge"><img src="./photo/curseforge-s.png" alt=""></a><!-- TODO: 补 curseforge 链接 -->
  </div>
  <div class="proj-body">一个简单的信息展示模组<br>方便查看TPS、MSPT等常用信息</div>
</div>
```

- 左列：硬盘拯救者（仅 GitHub 图标，正文里的 `GTL` / `Kubejs` 内联链接保留）。
- 右列：简单信息展示、全能饰品、移除效果显示。
- 右列末尾留注释，标明「再补 2 条即满 5 条」。

### 2. 两列等宽（关键）
`main` 是 `grid-template-columns: minmax(0,1fr) auto minmax(0,1fr)`，圆盘宽 `min(72vh, 44vw, 620px)`。要让两列正好填满圆盘两侧的空档且等宽，**两列共用同一个宽度公式**：

```css
width: calc((100vw - min(72vh, 44vw, 620px)) / 2 - clamp(18px, 4.5vw, 54px));
```

左列：`justify-self:start` + `padding-left: clamp(18px,4.5vw,54px)`，宽度正好顶到圆盘左缘。
右列：`position:fixed` + `right: clamp(18px,4.5vw,54px)`，左缘正好落在圆盘右缘。

**必须给右列加 `max-width: none`** —— `.corner-panel` 基础规则带 `max-width:680px`，超宽屏（如 2560）会被它截断而破坏对称。宽度公式再加下限 `max(220px, …)` 防极窄屏算出负值。

### 3. 均分与压缩
- 两列容器：`display:flex; flex-direction:column; justify-content:space-between`（`.corner-panel` 本身就是 flex column，只补 `justify-content`）。
- 左列 pane 保留原有的 `height: calc(100vh - clamp(36px,9vh,108px))`，与右列 `top/bottom: clamp(18px,4.5vh,54px)` 天然等高。
- 删除 `.pane[data-pane='projects'] .p-desc { margin-top:auto }`（已无 `.p-desc`）。
- 压缩策略：字号固定，仅 `line-height: clamp(24px, 3.1vh, 32px)` 与 `padding-top: clamp(6px, 1.4vh, 16px)` 随视口收缩。

### 4. 样式（新增，靠近 `.p-sub` 一节）
`.proj`（border-top + padding）、`.proj-title`（32px/700/1.2/白 + 14px 白光晕）、`.proj-en`（Orbitron 14px/500/字距 .4em/白 55%）、`.proj-links`（flex + gap 8px）、`.proj-links img`（height 20px、`filter: grayscale(1)`）、`.proj-links a`（opacity .75 → hover 1 + `translateY(-1px)`）、`.proj-body`（20px/600，字重与 `.p-desc` 一致）。
右列镜像：`.corner-panel.br[data-corner='projects'] .proj-links { flex-direction: row-reverse }`（右对齐由 `.corner-panel.br` 的 `text-align:right` 继承）。
指针事件：`.corner-panel.visible .proj { pointer-events: auto }`（容器是 `pointer-events:none`，否则正文无法选中）。

### 5. 清理死规则
删除 `.corner-panel.br[data-corner='projects'] .p-en { margin-top:auto }`、`body.is-mobile .corner-panel.br[data-corner='projects'] .p-en`、`body.is-mobile .pane[data-pane='projects'] .p-desc`。

### 6. 移动端
`body.is-mobile` 下：`.proj` 线色 `.08`、`.proj-title` `clamp(24px,7vw,32px)`、`.proj-en` 9px/字距 .3em、`.proj-body` 17px/1.7；左右两列 `width:auto`、`text-align:left`、图标行恢复 `row`。
堆叠顺序由现有 `toMobile()` 决定：`panelRight`(空) → `panelLeft`(左列 1 条) → 各 `.corner-panel`（右列 3 条），即「硬盘拯救者 → 三个模组」。

### 7. 不动的部分
`entWipeYDown` / `entWipeY` 与 130ms 错拍、`.p-sub`/`.sub-en` 原有规则（其他板块仍在用）、圆盘、背景、光带、入场时序、`index.html`（按约定最后统一收口）。

## 目录结构

```
d:/AAAmp/rlcyyg_modpack/index/
├── test.html   # [MODIFY] 项目区块重写：删「项目/PROJECTS」标题与「贡献」内容；
│               #          左列 1 条 + 右列 3 条，统一 .proj 结构；右列末尾留补条目注释
└── style.css   # [MODIFY] 新增 .proj 系列样式与右列镜像；两列等宽公式（右列补 max-width:none）；
                #          左列 pane 改 space-between；删 3 条死规则；补移动端覆盖
```

## 关键风险
1. **无滚动 + 不截断**：某条正文写到 3 行会顶破该列（用户已接受）。
2. **宽度公式与圆盘尺寸强耦合**：`min(72vh,44vw,620px)` 若改动，两列宽度需同步。
3. **`#` 占位链接**：MC百科 / CurseForge 点击会因 `<base target="_blank">` 新开当前页，属预期，待补真实 URL。
4. `.corner-panel` 的 `visibility/pointer-events` 时序不能动，否则会重现「看不见却能点」的热区。

## 验证
1. 1440×900 截项目态：左 1 条、右 3 条；两列顶边 y 一致（误差 ≤2px）；右列右缘与左边距对称；分隔线左右齐平。
2. 量像素：`.proj-links img` 渲染高 20px、gap 8px、`filter: grayscale(1)`；右列图标视觉顺序为 CurseForge←MC百科←GitHub（GitHub 最右）。
3. 2560 宽下右列不被 `max-width:680px` 截断，仍与左列等宽。
4. 390×844 移动端：顺序「硬盘拯救者 → 简单信息 → 全能饰品 → 移除效果」，全左对齐，线色 .08，无横向溢出。
5. 切换四个板块正常，项目板块入场仍为左右对开；控制台无报错。
6. 临时验证产物保留，末尾列出路径。

