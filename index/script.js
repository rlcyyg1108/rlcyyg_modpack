/* ============ 常量 ============ */
const CX = 280, CY = 280;
const R_IN = 130, R_OUT = 252, R_MID = 192;
const HOVER_OUT = 262, SEL_OUT = 272;
const N = 4, GAP = 360 / N;

/* ============ 板块定义（从项目开始顺时针编号） ============
 * i=0 顶部: 喜好(04)
 * i=1 右侧: 项目(01)
 * i=2 底部: 记忆(02)
 * i=3 左侧: 链接(03)
 */
const SECTORS = [
  { id: 'interests', name: '喜好', idx: 4 },
  { id: 'projects', name: '项目', idx: 1 },
  { id: 'artists', name: '记忆', idx: 2 },
  { id: 'links', name: '链接', idx: 3 },
];

/* ============ 刻度环转速 ============ */
const AUTO_SPEED = 12;                // deg/s 常驻自转（60s/圈）
const KICK_V0 = 420;                 // deg/s 切换板块时的冲量初速度
const KICK_TAU = 0.40;               // s    衰减时间常数（越大减速越慢）
/* 每个板块一档收尾速度：同样的冲量，衰减常数不同 ⇒ 「利落」与「沉」分得开。
   项目最短（爽快）、记忆最长（沉得住），这是入场里最便宜的一处性格差异。 */
const KICK_TAU_BY = { projects: .32, links: .38, interests: .40, core: .45, artists: .50 };
const KICK_STOP = AUTO_SPEED;        // deg/s 低于此值归零，与常驻自转无缝衔接

/* ============ 背景亮带 ============ */
const BG_SPIN = 12;                  // deg/s 被动自转（30s/圈，沿用用户调过的速度）
const BG_TURN = 1.0;                 // s    切换板块时主动转到目标角度的时长
const BG_BREATH = 26;                // s    亮带亮度呼吸的周期（与 8s / 30s 互质）
/* 亮带是一条穿过圆心的线，必然同时指向一对相反的扇区，所以两个板块共用一档：
   左(links) + 右(projects) → 横着(0°)；上(interests) + 下(artists) → 竖着(90°) */
const BG_ANGLE = { projects: 0, links: 0, interests: 90, artists: 90 };

/* ============ 状态 ============ */
const state = { angle: 0, autoAngle: 0, selectedId: 'core', kickV: 0 };
let autoRotating = true;
const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
const hoverMQ = matchMedia('(hover: hover) and (pointer: fine)');
const NS = 'http://www.w3.org/2000/svg';
const $ = s => document.querySelector(s);

/* ============ 几何 ============ */
function polar(cx, cy, r, deg) {
  const t = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
}
function sectorPath(a0, a1, rOut) {
  const p1 = polar(CX, CY, rOut, a0), p2 = polar(CX, CY, rOut, a1);
  const p3 = polar(CX, CY, R_IN, a1), p4 = polar(CX, CY, R_IN, a0);
  return 'M ' + p1[0].toFixed(2) + ' ' + p1[1].toFixed(2) +
    ' A ' + rOut + ' ' + rOut + ' 0 0 1 ' + p2[0].toFixed(2) + ' ' + p2[1].toFixed(2) +
    ' L ' + p3[0].toFixed(2) + ' ' + p3[1].toFixed(2) +
    ' A ' + R_IN + ' ' + R_IN + ' 0 0 0 ' + p4[0].toFixed(2) + ' ' + p4[1].toFixed(2) + ' Z';
}
function sectorA0(i) { return i * GAP - 135; }
function sectorCenter(i) { return i * GAP - 90; }

/* ============ 构建板块 ============ */
const sectorsG = $('#sectors'), labelsG = $('#labels'), linesG = $('#lines'), decorG = $('#decor');
const geo = {};

SECTORS.forEach((s, i) => {
  geo[s.id] = { cur: R_OUT, target: R_OUT };
  const a0 = sectorA0(i);
  const p = document.createElementNS(NS, 'path');
  p.setAttribute('d', sectorPath(a0, a0 + GAP, R_OUT));
  p.setAttribute('data-sid', s.id);
  p.setAttribute('fill', '#e8e8e8');
  p.classList.add('sector');
  /* 键盘可达：SVG 元素上加 tabindex 就能进 Tab 序列（Chrome/FF/Safari 都支持） */
  p.setAttribute('tabindex', '0');
  p.setAttribute('role', 'button');
  p.setAttribute('aria-label', s.name);
  p.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault(); markInteracted(); select(s.id);
    }
  });
  p.addEventListener('pointerenter', () => {
    if (state.selectedId !== s.id) geo[s.id].target = HOVER_OUT;
  });
  p.addEventListener('pointerleave', () => {
    if (state.selectedId !== s.id) geo[s.id].target = R_OUT;
  });
  sectorsG.appendChild(p);

  const g = document.createElementNS(NS, 'g');
  g.classList.add('s-label'); g.setAttribute('data-lid', s.id);
  const num = String(s.idx).padStart(2, '0');
  g.innerHTML = '<text text-anchor="middle">' +
    '<tspan x="0" dy="-2" class="s-name">' + s.name + '</tspan>' +
    '<tspan x="0" dy="17" class="s-idx">' + num + '</tspan></text>';
  labelsG.appendChild(g);
});

/* ============ 线稿层 ============ */
const innerCircle = document.createElementNS(NS, 'circle');
innerCircle.setAttribute('cx', CX); innerCircle.setAttribute('cy', CY); innerCircle.setAttribute('r', R_IN);
innerCircle.setAttribute('class', 'ring-line');
linesG.appendChild(innerCircle);

const dividers = [];
for (let i = 0; i < N; i++) {
  const line = document.createElementNS(NS, 'line');
  line.setAttribute('class', 'ring-line');
  linesG.appendChild(line);
  dividers.push(line);
}

const outerArcs = [];
for (let i = 0; i < N; i++) {
  const arc = document.createElementNS(NS, 'path');
  arc.setAttribute('class', 'ring-line');
  linesG.appendChild(arc);
  outerArcs.push(arc);
}

function updateLines() {
  for (let i = 0; i < N; i++) {
    const a = sectorA0(i);
    const curA = geo[SECTORS[i].id].cur;
    const curB = geo[SECTORS[(i + N - 1) % N].id].cur;
    const rOut = Math.max(curA, curB);
    const p1 = polar(CX, CY, R_IN, a), p2 = polar(CX, CY, rOut, a);
    dividers[i].setAttribute('x1', p1[0].toFixed(2));
    dividers[i].setAttribute('y1', p1[1].toFixed(2));
    dividers[i].setAttribute('x2', p2[0].toFixed(2));
    dividers[i].setAttribute('y2', p2[1].toFixed(2));
  }
  SECTORS.forEach((s, i) => {
    const a0 = sectorA0(i), a1 = a0 + GAP;
    const r = geo[s.id].cur;
    const p1 = polar(CX, CY, r, a0), p2 = polar(CX, CY, r, a1);
    outerArcs[i].setAttribute('d',
      'M ' + p1[0].toFixed(2) + ' ' + p1[1].toFixed(2) +
      ' A ' + r + ' ' + r + ' 0 0 1 ' + p2[0].toFixed(2) + ' ' + p2[1].toFixed(2));
  });
}

/* ============ 装饰层 ============ */
[R_IN + (R_OUT - R_IN) / 3, R_IN + 2 * (R_OUT - R_IN) / 3].forEach(r => {
  const c = document.createElementNS(NS, 'circle');
  c.setAttribute('cx', CX); c.setAttribute('cy', CY); c.setAttribute('r', r);
  c.setAttribute('class', 'faint-circle');
  decorG.appendChild(c);
});
const TICK_R_OUT = 285;
for (let deg = 0; deg < 360; deg += 5) {
  const isMajor = deg % 30 === 0;
  const len = isMajor ? 8 : 3;
  const cls = isMajor ? 'tick-major' : 'tick';
  const p1 = polar(CX, CY, TICK_R_OUT, deg), p2 = polar(CX, CY, TICK_R_OUT - len, deg);
  const line = document.createElementNS(NS, 'line');
  line.setAttribute('x1', p1[0].toFixed(2)); line.setAttribute('y1', p1[1].toFixed(2));
  line.setAttribute('x2', p2[0].toFixed(2)); line.setAttribute('y2', p2[1].toFixed(2));
  line.setAttribute('class', cls);
  decorG.appendChild(line);
}

/* ============ 背景亮带 ============
 * 渐变是 linear-gradient(0deg,…)，等值线水平 ⇒ rotate(0) 亮带横着、rotate(90) 竖着。
 * core 态被动自转；板块态 1s 内顺时针转到该板块的档位后停住。
 * bg.angle 只累加不取模 —— 取模会在归零那一帧造成反向回跳。 */
const bgField = document.getElementById('bgField');
const bg = { angle: 0, mode: 'spin', from: 0, to: 0, t: 0, bt: 0, bo: -1 };
function renderBg() {
  bgField.style.transform = 'rotate(' + bg.angle.toFixed(2) + 'deg)';
}
function bgTurnTo(id) {
  const want = BG_ANGLE[id];
  if (want === undefined) { bg.mode = 'spin'; return; }
  /* 顺时针（角度递增）转到下一个 want + 180k 档位 */
  let to = want + Math.ceil((bg.angle - want) / 180) * 180;
  if (to - bg.angle < 1) to += 180;   /* 已经在该档位时也完整转半圈，保证每次切换都有动作 */
  bg.from = bg.angle; bg.to = to; bg.t = 0; bg.mode = 'turn';
}

/* ============ 动画 ============ */
function syncTargets() {
  SECTORS.forEach(s => {
    const el = sectorsG.querySelector('[data-sid="' + s.id + '"]');
    const hovered = hoverMQ.matches && el.matches(':hover');
    geo[s.id].target = s.id === state.selectedId ? SEL_OUT : (hovered ? HOVER_OUT : R_OUT);
  });
}
let lastT = performance.now();
function animLoop(t) {
  /* dt 上下都要钳：上限防切后台回来跳变，下限防首帧 performance.now()
     基准晚于 t 造成的负值——那会让刻度环和背景亮带先倒转一下 */
  const dt = Math.max(0, Math.min((t - lastT) / 1000, 0.12)); lastT = t;
  let dirty = false;

  /* 外圈刻度：常驻缓慢自转 + 切换板块时的冲量（拖拽时整体暂停） */
  if (mode !== 'rot') {
    let v = autoRotating ? AUTO_SPEED : 0;
    if (state.kickV > KICK_STOP) {
      v += state.kickV;
      state.kickV *= Math.exp(-dt / (KICK_TAU_BY[state.selectedId] || KICK_TAU));
      if (state.kickV < KICK_STOP) state.kickV = 0;
    } else {
      state.kickV = 0;
    }
    if (v) {
      state.autoAngle = (state.autoAngle + v * dt) % 360;
      renderDecor();
    }
  }

  SECTORS.forEach(s => {
    const g = geo[s.id];
    const next = Math.abs(g.cur - g.target) < 0.05 ? g.target : g.cur + (g.target - g.cur) * Math.min(1, dt * 14);
    if (Math.abs(next - g.cur) > 0.01) { g.cur = next; dirty = true; }
    else if (g.cur !== g.target) { g.cur = g.target; dirty = true; }
  });
  if (dirty) {
    SECTORS.forEach((s, i) => {
      sectorsG.querySelector('[data-sid="' + s.id + '"]')
        .setAttribute('d', sectorPath(sectorA0(i), sectorA0(i) + GAP, geo[s.id].cur));
    });
    updateLines();
  }

  /* 背景亮带：被动自转 / 主动转向（1s 内顺时针转到位） */
  if (!reduceMQ.matches) {
    if (bg.mode === 'spin') {
      bg.angle += BG_SPIN * dt;
      renderBg();
    } else if (bg.mode === 'turn') {
      bg.t += dt;
      const p = Math.min(1, bg.t / BG_TURN);
      const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;   /* easeInOutCubic */
      bg.angle = bg.from + (bg.to - bg.from) * e;
      renderBg();
      if (p >= 1) bg.mode = 'idle';
    }
    /* 亮度呼吸：26s 一个来回，与 hub 的 8s、刻度环常驻自转的 30s 互质 ——
       几样常驻动画绝不能打同一个拍子，同步是廉价感的主要来源。
       只改 opacity 不改渐变：这是全站面积最大的一块，动它最「活」又最不吵。 */
    bg.bt += dt;
    const bo = 0.86 + 0.14 * (0.5 + 0.5 * Math.sin(bg.bt / BG_BREATH * Math.PI * 2));
    if (Math.abs(bo - (bg.bo < 0 ? -9 : bg.bo)) > 0.002) {
      bg.bo = bo;
      bgField.style.opacity = bo.toFixed(3);
    }
  }

  /* 卡片轮盘：一格一格地转。easeOutCubic —— 起步快、收尾有一小段减速。
     每格时长恒定（不随卡片数变），所以卡片越多转得越密，但手感不变。 */
  if (deck.dur > 0) {
    deck.t += dt;
    const p = Math.min(1, deck.t / deck.dur);
    /* pow 默认 3（平时切一格）；入场那一下用 4，尾段的减速拖得更长更明显。
       back = 点击 / 滚轮 / 方向键切卡：换成 easeOutBack，到位前冲过去一点点再弹回来
       （c1 = 1.1，过冲约 6.5%，只够看出「咔哒」一下，不至于甩出去）。
       拖动松手的吸附【不用】过冲 —— 手刚离开就回弹一下会显得打滑。 */
    const e = deck.back
      ? 1 + 2.1 * Math.pow(p - 1, 3) + 1.1 * Math.pow(p - 1, 2)
      : 1 - Math.pow(1 - p, deck.pow);
    deck.pos = deck.from + (deck.to - deck.from) * e;
    if (p >= 1) deckSettle();
    else layoutDeck();
  }
  requestAnimationFrame(animLoop);
}

/* ============ 旋转 ============ */
const ringGroup = $('#ringGroup');
/* 只重画刻度环，供动画循环单独调用 */
function renderDecor() {
  decorG.setAttribute('transform', 'rotate(' + state.autoAngle.toFixed(2) + ' ' + CX + ' ' + CY + ')');
}
function renderRotation() {
  /* 用户拖拽只转板块+线稿+标签 */
  ringGroup.setAttribute('transform', 'rotate(' + state.angle + ' ' + CX + ' ' + CY + ')');
  SECTORS.forEach((s, i) => {
    const [x, y] = polar(CX, CY, R_MID, sectorCenter(i) + state.angle);
    labelsG.querySelector('[data-lid="' + s.id + '"]')
      .setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ')');
  });
  /* 外圈刻度独自缓慢自转 */
  renderDecor();
}

/* ============ 中心图片 ============ */
const svg = $('#ring'), hubImg = $('#hubImg'), hubEl = document.querySelector('[data-sid="core"]');
hubEl.setAttribute('tabindex', '0');
hubEl.setAttribute('role', 'button');
hubEl.setAttribute('aria-label', '关于我');
hubEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
    e.preventDefault(); markInteracted(); select('core');
  }
});
function sizeHubImg() {
  const rw = svg.getBoundingClientRect().width;
  hubImg.style.width = (rw * 176 / 560) + 'px';
  hubImg.style.height = (rw * 176 / 560) + 'px';
}
window.addEventListener('resize', sizeHubImg);
hubEl.addEventListener('pointerenter', () => hubImg.classList.add('on'));
hubEl.addEventListener('pointerleave', () => hubImg.classList.remove('on'));

/* ============ 收藏站数据 ============
 * 占位版本，等浏览器书签导入后整份替换（格式不变）。
 *   cat 分类中文名 / en 分类英文 / items[]：n 站名、u 网址、d 注解（可空）
 * 图标按域名取 ./photo/fav/{域名}.png，抓不到的回退成首字母方块。
 * 分类最多 4 个——四角只有 4 个槽位，多出来的长尾要合并。
 */
const DECK = [
  {
    cat: "收藏夹栏", items: [
      { n: "青柠起始页", u: "https://limestart.cn/" },
      { n: "哔哩哔哩", u: "https://www.bilibili.com/" },
      { n: "MC百科", u: "https://www.mcmod.cn/" },
      { n: "WZGuides", u: "https://wzguides.cn/wz2/gunsmith" },
      { n: "百度翻译", u: "https://fanyi.baidu.com/mtpe-individual/transText#/" },
      { n: "Wormhole", u: "https://wormhole.app/" },
      { n: "萌娘百科", u: "https://mzh.moegirl.org.cn/Mainpage#/flow" },
      { n: "github", u: "https://github.com/" },
      { n: "菜鸟教程", u: "https://www.runoob.com/" },
      { n: "rlcyyg1108", u: "https://rlcyyg1108.github.io/rlcyyg_modpack/" },
    ]
  },
  {
    cat: "视频", items: [
      { n: "LIBVIO · link3", u: "https://link3.cc/libvio", d: "Link3" },
      { n: "LIBVIO · 发布页", u: "https://www.libvio.app/" },
      { n: "LIBVIO · libvios", u: "https://www.libvios.com/", d: "画质还行 · 超稳定超快" },
      { n: "短剧喵", u: "https://www.duanjumiao.org/" },
      { n: "韩剧网", u: "https://hanju.wang/" },
      { n: "咕咕番", u: "https://www.gugu3.com/", d: "画质高资源多 · 不稳定" },
      { n: "girigiri爱", u: "https://bgm.girigirilove.com/" },
      { n: "omofun主页", u: "https://www.233dm.com/app/" },
      { n: "omofun", u: "https://www.agekk.com/", d: "西瓜" },
      { n: "omofun-233", u: "https://cn.233dm.com/" },
      { n: "ACG动漫", u: "https://www.acgbibi.com/", d: "ACG动画世界" },
      { n: "皮皮贼", u: "https://www.pipizei.cc/" },
      { n: "星空影院", u: "https://ixkw5.cc/" },
      { n: "动漫巴士", u: "https://dm84.net/" },
      { n: "视频首页", u: "https://www.dandanju.tv/", d: "蛋蛋剧" },
      { n: "【新提醒】4K世界", u: "https://www.4ksj.com/" },
    ]
  },
  {
    cat: "图片", items: [
      { n: "搜图Bot酱", u: "https://soutubot.moe/" },
      { n: "SauceNAO 以图搜图", u: "https://www.saucenao.cn/" },
      { n: "多业务镜像搜索", u: "https://3d.iqdb.org/" },
      { n: "二次元画像詳細検索", u: "https://ascii2d.net/" },
      { n: "Yandex", u: "https://yandex.com/", d: "国内版" },
      { n: "yandex", u: "https://yandex.ru/", d: "俄罗斯版" },
      { n: "AnimeTrace", u: "https://ai.animedb.cn/" },
      { n: "Image Resizer", u: "https://imageresizer.com/", d: "在线图片批处理" },
      { n: "photopea", u: "https://www.photopea.com/", d: "网站版ps" },
      { n: "p站", u: "https://www.vilipix.com/", d: "pixiv · 插画世界" },
      { n: "Imgur Upload", u: "https://imgur.la/", d: "图床" },
      { n: "iLoveIMG修改图像", u: "https://www.iloveimg.com/" },
      { n: "Unsplash素材", u: "https://unsplash.com/" },
      { n: "免费在线图片压缩工具", u: "https://docsmall.com/image-compress", d: "docsmall" },
    ]
  },
  {
    cat: "音乐", items: [
      { n: "GD音乐台", u: "https://music.gdstudio.xyz/", d: "首选" },
      { n: "歌曲宝", u: "https://www.gequbao.com/music/" },
      { n: "MyFreeMP3", u: "https://tools.liumingye.cn/music/#/", d: "曾经的神 · 谨此以纪念" },
      { n: "音乐解锁", u: "http://unlock.music.hi.cn/" },
      { n: "歌词搜索", u: "https://www.gecifang.com/", d: "吉他谱 · 钢琴谱 · 歌词坊" },
      { n: "CoverBox", u: "https://coverbox.henry-hu.com/index.html", d: "专辑封面" },
    ]
  },
  {
    cat: "其他工具", items: [
      { n: "idm破解", u: "https://github.com/tytsxai/IDM-Activation-Script-Chinese" },
      { n: "鸠摩搜索", u: "https://www.jiumodiary.com/", d: "文档搜索" },
      { n: "刘明野的工具箱", u: "https://tools.liumingye.cn/" },
      { n: "藏经阁", u: "https://www.cangjggame.com/", d: "AI搜索" },
      { n: "大数计算器", u: "https://www.util.cn/tools/big-number-calculator/", d: "超大整数精确计算 · Util工具箱" },
      { n: "Penint", u: "https://seoi.net/penint/", d: "画画变成屌" },
      { n: "Base64 解码与编码", u: "https://www.base64decode.org/", d: "在线" },
      { n: "One Last Image", u: "https://lab.magiconch.com/one-last-image/" },
      { n: "考试酷(examcoo)", u: "https://www.examcoo.com/index/ku", d: "永久免费的电子作业与在线考试系统云平台" },
    ]
  },
  {
    cat: "信息", items: [
      { n: "SteamDB", u: "https://steamdb.info/", d: "Steam上所有内容的数据库" },
      { n: "食用手册", u: "https://cook.yunyoujun.cn/?continueFlag=4892de72dccce80188d1048025a8a114" },
      { n: "《刺客信条》全系列高清精美游戏图标", u: "https://bbs.3dmgame.com/thread-4096714-1-1.html" },
      { n: "集英社大开源", u: "https://mangamillion.shueisha.co.jp/zh-CN/manga-list" },
      { n: "银河系", u: "https://galaxy.click/", d: "增量游戏收录" },
      { n: "人类科技树 · 3D 世界", u: "https://secwind7.github.io/polytech-tree/" },
      { n: "wallpaper毒狗信息收集站", u: "https://zzz.0d000721.cc/" },
      { n: "AcFun弹幕视频网", u: "https://www.acfun.cn/" },
      { n: "rubisama新作", u: "https://rubisama.com/dreaming-quintet/", d: "ゆめうつつクインテット" },
      { n: "にじGAME(旧にじよめ)", u: "https://www.nijiyome.com/", d: "オンラインゲーム" },
      { n: "扫雷游戏网页版", u: "https://www.minesweeper.cn/", d: "Minesweeper" },
      { n: "反物质维度", u: "https://g1tyx.github.io/antimatter-dimensions/" },
      { n: "Universal Paperclips", u: "https://www.decisionproblem.com/paperclips/index2.html" },
    ]
  },
  {
    cat: "前端", items: [
      { n: "JIEJOE", u: "https://www.jiejoe.com/home", d: "视觉设计者" },
      { n: "动效", u: "https://www.landing.love/" },
      { n: "审美", u: "https://land-book.com/" },
      { n: "创意", u: "https://www.awwwards.com/" },
      { n: "精致", u: "https://onepagelove.com/" },
      { n: "炫酷", u: "https://www.lapa.ninja/" },
      { n: "现成", u: "https://21st.dev/" },
      { n: "设计", u: "https://www.siteinspire.com/" },
    ]
  },
  {
    cat: "科技", items: [
      { n: "硬盘拯救者", u: "https://github.com/rlcyyg1108/Disk-Savior" },
      { n: "rlcyyg_modpack", u: "https://github.com/rlcyyg1108/rlcyyg_modpack/" },
      { n: "DSP极简网络", u: "https://dsponline.cn/" },
      { n: "n网", u: "https://www.nexusmods.com/" },
      { n: "CdkeyNoGap", u: "https://www.cdkeynogap.com/", d: "CDK合集" },
      { n: "DLsite", u: "https://www.dlsite.com/index.html?locale=zh_CN", d: "DLsite综合首页" },
      { n: "月幕Galgame", u: "https://www.ymgal.games/index", d: "Galgame论坛" },
      { n: "convert.io", u: "https://convert.io/cn/", d: "文件转换器" },
      { n: "视觉小说数据库", u: "https://vndb.org/", d: "VNDB" },
      { n: "Sketchfab 3D模型", u: "https://sketchfab.com/" },
      { n: "点击速度测试10秒", u: "https://cps-check.com/cn/", d: "CPS Check" },
      { n: "Steam 社区 :: 指南 :: METAL GEAR", u: "https://steamcommunity.com/sharedfiles/filedetails/?id=3136010615" },
    ]
  },
  {
    cat: "我的世界", items: [
      { n: "Lumen", u: "https://lumenplatform.net/weaver/", d: "AI生成皮肤" },
      { n: "公共蓝图库", u: "https://www.mcschematic.top/home/home" },
      { n: "AE 2", u: "https://appliedenergistics.org/" },
      { n: "Kitolus Community", u: "https://kitolus.top/" },
      { n: "GTNH中文维基", u: "https://gtnh.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5" },
      { n: "CurseForge", u: "https://www.curseforge.com/minecraft" },
      { n: "Modrinth", u: "https://modrinth.com/mods" },
      { n: "整合汉化补丁下载界面", u: "https://modpack.cfpa.team/" },
      { n: "普洛兹模型选择", u: "https://www.plotz.co.uk/" },
      { n: "LittleSkin", u: "https://littleskin.cn/?lang=zh_CN", d: "快速、可靠的公益 Minecraft 皮肤站" },
      { n: "NameMC: Nama Minecraft & Lih", u: "https://ms.namemc.com/" },
      { n: "块基础", u: "https://www.chunkbase.com/", d: "我的世界应用程序,模组和教程" },
      { n: "Minecraft(我的世界)中文论坛", u: "https://www.mcbbs.net/" },
      { n: "格雷量子跃迁", u: "https://gtqtr.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5", d: "灰机wiki · 北京嘉闻杰诺网络科技有限公司" },
      { n: "GTO官方中文wiki", u: "https://gtodyssey.com/zh-hans/" },
      { n: "Minecraft汉化补丁分享站", u: "https://www.ningnana.top/" },
      { n: "MC模组包汉化补丁大集合表格", u: "https://docs.qingque.cn/s/home/eZQBu-tNI83sfDKp5LyCzUQSP", d: "轻雀文档" },
      { n: "BT的实用链接", u: "https://busituteng.github.io/ul.html" },
      { n: "KubeJS 维基", u: "https://kubejs.com/wiki" },
      { n: "大型反应堆模拟器", u: "https://br.sidoh.org/#reactor-prompt" },
      { n: "CreativeMode", u: "https://www.creativemode.net/" },
      { n: "GregTech: New Horizons", u: "https://www.gtnewhorizons.com//", d: "Home" },
      { n: "CryChic文档", u: "https://docs.mihono.cn/zh/" },
    ]
  },
  {
    cat: "泰拉瑞亚", items: [
      { n: "泰拉瑞亚官方-中文维基", u: "https://terraria.wiki.gg/zh/wiki/Terraria_Wiki" },
      { n: "瑟银模组官方-中文维基", u: "https://thoriummod.wiki.gg/zh/wiki/Thorium_Mod_Wiki" },
      { n: "Fargo's Mods Wiki", u: "https://fargosmods.wiki.gg/zh/" },
      { n: "魂灵中文维基", u: "https://terrariamods.wiki.gg/wiki/Spooky_Mod" },
      { n: "魂灵", u: "https://terraria-mods.fandom.com/zh/wiki/%E9%AD%82%E7%81%B5" },
      { n: "Spirit Mod 维基百科", u: "https://spiritmod.wiki.gg/" },
      { n: "Stardew Valley 中文维基", u: "https://xinglugu.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5", d: "星露谷物语攻略资料站 · 灰机wiki" },
      { n: "泰拉瑞亚-中文维基", u: "https://terraria.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5", d: "灰机wiki" },
      { n: "穹月天纱-英文维基", u: "https://terrariamods.wiki.gg/wiki/Lunar_Veil" },
      { n: "旅人归途-维基", u: "https://homewardjourney.wiki.gg/zh/" },
      { n: "灾厄中文-维基", u: "https://calamity.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5" },
      { n: "灾厄大修-维基", u: "https://calamity-overhaul.cc/" },
      { n: "灾厄虚荣-中文维基", u: "https://calamity.huijiwiki.com/wiki/%E7%81%BE%E5%8E%84%E8%99%9A%E8%8D%A3" },
      { n: "灾劫官方-中文维基", u: "https://calamity.huijiwiki.com/wiki/%E7%81%BE%E5%8A%AB" },
      { n: "旧神之猎-中文维基", u: "https://calamity.huijiwiki.com/wiki/%E6%97%A7%E7%A5%9E%E4%B9%8B%E7%8C%8E" },
      { n: "众神之怒-中文维基", u: "https://calamity.huijiwiki.com/wiki/%E4%BC%97%E7%A5%9E%E4%B9%8B%E6%80%92" },
      { n: "灾厄炼狱-中文维基", u: "https://calamity.huijiwiki.com/wiki/%E7%82%BC%E7%8B%B1%E6%A8%A1%E5%BC%8F" },
      { n: "灾厄官方-维基", u: "https://calamitymod.wiki.gg/" },
      { n: "灾厄:寓言-维基", u: "https://calamityfables.wiki.gg/" },
      { n: "灾厄:熵-中文维基", u: "https://calentropy.miraheze.org/wiki/%E9%A6%96%E9%A1%B5" },
    ]
  },
  {
    cat: "岛", items: [
      { n: "死亡搁浅", u: "https://www.nexusmods.com/games/deathstranding/mods", d: "模组网" },
      { n: "元祖合金装备 1&2", u: "https://www.nexusmods.com/games/metalgearandmetalgear2mc", d: "模组网" },
      { n: "合金装备:索利德", u: "https://www.nexusmods.com/games/metalgearsolidmc", d: "模组网" },
      { n: "合金装备 2:自由之子", u: "https://www.nexusmods.com/games/metalgearsolid2mc", d: "模组网" },
      { n: "合金装备 3:食蛇者", u: "https://www.nexusmods.com/games/metalgearsolid3mc", d: "模组网" },
      { n: "合金装备 5:原爆点", u: "https://www.nexusmods.com/games/metalgearsolidvgz/mods", d: "模组网" },
      { n: "合金装备 5:幻痛", u: "https://www.nexusmods.com/games/metalgearsolidvtpp/mods", d: "模组网" },
      { n: "合金装备Δ:食蛇者", u: "https://www.nexusmods.com/games/metalgearsoliddeltasnakeeater/mods", d: "模组网" },
      { n: "合金装备崛起:复仇", u: "https://www.nexusmods.com/games/metalgearrisingrevengeance/mods", d: "模组网" },
      { n: "蛇咬wiki", u: "https://mgsvmoddingwiki.github.io/SnakeBite_Mod_Manager/" },
    ]
  },
  {
    cat: "星露谷", items: [
      { n: "星露谷物语官方中文wiki", u: "https://zh.stardewvalleywiki.com/" },
      { n: "星露谷物语bilibili中文维基", u: "https://wiki.biligame.com/stardewvalley/%E6%98%9F%E9%9C%B2%E8%B0%B7%E7%89%A9%E8%AF%AD%E7%BB%B4%E5%9F%BA" },
      { n: "星露谷物语", u: "https://www.nexusmods.com/stardewvalley/mods/", d: "模组网" },
      { n: "SVE · wiki", u: "https://wiki.biligame.com/stardewvalley/SVE:%E6%98%9F%E9%9C%B2%E8%B0%B7%E7%89%A9%E8%AF%AD%E6%89%A9%E5%B1%95%E7%BB%B4%E5%9F%BA", d: "中文维基" },
      { n: "SVE · stardew-valley-expanded", u: "https://stardew-valley-expanded.fandom.com/wiki/Stardew_Valley_Expanded_Wiki", d: "英文维基" },
      { n: "里奇赛德", u: "https://ridgeside.fandom.com/wiki/Ridgeside_Village_Wiki", d: "英文维基" },
      { n: "东斯卡普 · eastscarp", u: "https://eastscarp.wiki.gg/", d: "英文维基" },
      { n: "东斯卡普 · eastscarp", u: "https://eastscarp.fandom.com/wiki/East_Scarp_Wiki", d: "英文维基 · fandom" },
      { n: "小火星露谷社区", u: "https://svmbbs.smallfire.cn/" },
    ]
  },
  {
    cat: "异星工厂", items: [
      { n: "异星工厂 Wiki", u: "https://wiki.factorio.com/Main_Page/zh" },
      { n: "异星工厂 Mod", u: "https://mods.factorio.com/" },
      { n: "异星工厂 · factorio", u: "https://www.factorio.com/" },
      { n: "异星工厂 · factorio", u: "https://www.factorio.school/top", d: "蓝图网" },
      { n: "majoro", u: "https://web.majoro.cn/", d: "异星工厂工具箱" },
    ]
  },
  {
    cat: "幸福工厂", items: [
      { n: "幸福工厂 · ficsit", u: "https://ficsit.app/", d: "模组网" },
      { n: "幸福工厂 · satisfactory-calculator", u: "https://satisfactory-calculator.com/zh/interactive-map#3;50440;-347|gameLayer|limestonePure;ironPure;copperPure;cateriumPure;coalPure;oilPure;hardDrives", d: "交互式地图" },
      { n: "幸福工厂游戏工具", u: "https://www.my-satisfactory.cn/dashboard" },
      { n: "幸福工厂 · satisfactorytools", u: "https://www.satisfactorytools.com/1.0/", d: "量化工具" },
    ]
  },
  {
    cat: "米", items: [
      { n: "原神社区", u: "https://www.miyoushe.com/ys/", d: "米游社" },
      { n: "崩坏:星穹铁道社区", u: "https://www.miyoushe.com/sr", d: "米游社" },
      { n: "绝区零社区", u: "https://www.miyoushe.com/zzz", d: "米游社" },
      { n: "玉衡杯数据库", u: "https://homdgcat.wiki/gi/ach?lang=CH" },
      { n: "Hakush.in", u: "https://hsr20.hakush.in/" },
      { n: "BetterGI·更好的原神", u: "https://bettergi.com/" },
      { n: "雷电将军文本收录", u: "http://ei.raiden.ink/" },
      { n: "Huroka", u: "https://www.huroka.com/", d: "Honkai: Star Rail Database" },
      { n: "SRTools", u: "https://srtools.neonteam.dev/1001/detail" },
      { n: "玉衡杯数据库 备份", u: "https://homdgcatwiki.hasban.cn/" },
      { n: "卢纳里斯", u: "https://lunaris.moe/" },
      { n: "你的一站式抽卡基地", u: "https://gachabase.net/" },
      { n: "nanoka.cc", u: "https://nanoka.cc/" },
      { n: "崩坏:星穹铁道WIKI_BWIKI_哔哩哔哩", u: "https://wiki.biligame.com/sr/%E9%A6%96%E9%A1%B5" },
    ]
  },
  {
    cat: "蝙蝠侠", items: [
      { n: "蝙蝠侠:阿卡姆起源", u: "https://www.nexusmods.com/games/batmanarkhamorigins", d: "模组网" },
      { n: "蝙蝠侠:阿卡姆疯人院", u: "https://www.nexusmods.com/games/batmanarkhamasylum", d: "模组网" },
      { n: "蝙蝠侠:阿卡姆之城", u: "https://www.nexusmods.com/games/batmanarkhamcity", d: "模组网" },
      { n: "蝙蝠侠:阿卡姆骑士", u: "https://www.nexusmods.com/games/batmanarkhamknight", d: "模组网" },
      { n: "蝙蝠侠:故事版系列", u: "https://www.nexusmods.com/games/batmanthetelltaleseries", d: "模组网" },
    ]
  },
  {
    cat: "增量", items: [
      { n: "梅尔沃放置b站wiki", u: "https://wiki.biligame.com/melvoridle/%E9%A6%96%E9%A1%B5" },
      { n: "梅尔沃放置中文wiki", u: "https://melvor-idle.fandom.com/zh-tw/wiki/Melvor_Idle_%E4%B8%AD%E6%96%87_Wiki" },
      { n: "梅尔沃放置官方英文wiki", u: "https://wiki.melvoridle.com/w/Main_Page" },
      { n: "(the) Gnorp Apologue Wiki", u: "https://gnorp.wiki.gg/" },
      { n: "反物质维度wiki", u: "https://antimatter-dimensions.fandom.com/wiki/Antimatter_Dimensions_Wiki", d: "Fandom" },
      { n: "反物质维度 存档解码器", u: "https://spotky1004.com/AD-save-decoder/" },
      { n: "Antimatter-dimensions · 指南", u: "https://antimatter-dimensions.fandom.com/wiki/Guide#1e140-1e308_IP:_Replicanti_Era_(1_day_and_12_hours_to_12_days,_with_timewalls)", d: "反物质维度维基 · 粉丝圈" },
      { n: "反物质维度现实前保姆级攻略", u: "https://tieba.baidu.com/p/9208783971", d: "百度贴吧" },
      { n: "反物质维度现实后并非保姆级攻略", u: "https://tieba.baidu.com/p/9312920735" },
      { n: "Official Revolution Idle Wik", u: "https://revolutionidle.wiki.gg/" },
      { n: "指南:试炼", u: "https://revolutionidle.wiki.gg/wiki/Guide:Trials#Full_Unity_Macro_tutorial,_only_works_after_Hard_Trial_6", d: "官方革命闲置维基" },
      { n: "指南:矿物", u: "https://revolutionidle.wiki.gg/wiki/Guide:Minerals", d: "官方革命闲置维基" },
      { n: "Guide:Refinement", u: "https://revolutionidle.wiki.gg/wiki/Guide:Refinement" },
      { n: "指南:疯狂试炼", u: "https://revolutionidle.wiki.gg/wiki/Guide:Insane_Trials", d: "官方革命闲置维基" },
      { n: "Guide:Elements", u: "https://revolutionidle.wiki.gg/wiki/Guide:Elements" },
      { n: "Steam 社区 :: 指南 :: Revolution", u: "https://steamcommunity.com/sharedfiles/filedetails/?id=3408307617" },
    ]
  },
  {
    cat: "查资料", items: [
      { n: "Assassin's Creed: Brotherhoo", u: "https://www.nexusmods.com/games/assassinscreedbrotherhood", d: "Nexus Mods" },
      { n: "《刺客信条2》真相解密", u: "https://www.gamersky.com/handbook/201606/767771_9.shtml", d: "游民星空 GamerSky.com" },
      { n: "星界边境", u: "https://starbound.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5", d: "中文维基" },
      { n: "环世界", u: "https://rimworld.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5", d: "中文维基" },
      { n: "星际战甲 · warframe", u: "https://www.warframe.com/zh-hans", d: "官网" },
      { n: "星际战甲 · warframe", u: "https://warframe.huijiwiki.com/wiki/Mainpage", d: "中文维基" },
      { n: "史莱姆农场", u: "https://www.nexusmods.com/slimerancher/mods/latest/?nav=1&page_size=15&page=2", d: "模组网" },
      { n: "异形工厂", u: "https://mod.io/g/shapez", d: "模组网" },
      { n: "像素工厂 · mindustrygame", u: "https://mindustrygame.github.io/wiki/", d: "官方英文维基" },
      { n: "像素工厂 · github", u: "https://github.com/topics/mindustry-mod", d: "模组列表" },
      { n: "戴森球计划 · wiki", u: "https://wiki.biligame.com/dsp/%E9%A6%96%E9%A1%B5", d: "中文维基" },
      { n: "戴森球计划 · dsp", u: "https://dsp.thunderstore.io/", d: "模组网" },
      { n: "锑星百科", u: "https://superscience.miraheze.org/wiki/%E9%A6%96%E9%A1%B5", d: "超理资料" },
    ]
  },
];

/* ============ 链接板块：卡片环 + 中心展示区 ============
 * 一张卡 = book.html 的一个文件夹；卡片尺寸恒定 100×58（当前卡略放大到 118×68），
 * 不随条目数变、也不随纵深缩放。
 * 卡片沿「竖起来的椭圆」排布，卡位由 buildRing 解出，目标是
 *   【看上去的间隙处处相等】—— 不是弧长相等（见 buildRing 的注释）。
 * 最左端 = 最近点 = 当前选中的卡；它的内容不塞进卡片，而是展开在椭圆中心的方块里。
 * 卡片多了必然重叠，重叠是【链式】的：沿环一个方向 z 单调递减，
 *   于是我叠你、你叠他、他叠我，唯一的断口落在最远端那张（最不显眼）。
 * 空间不够（窄屏 / 移动端）时退化成「左侧一列卡片 + 右侧展示区」，不再走椭圆。 */
const CARD_W = 100, CARD_H = 58;              // 卡片基准尺寸
/* 当前卡略放大（×1.18）。只放大选中那一张，位置仍以中心对齐，
   所以椭圆的两端要按放大后的尺寸留边，否则它会顶出 limL。 */
const CUR_W = 118, CUR_H = 68;
const CARD_GAP = 6;                           // 列模式下卡片之间的间隙
const ELLIPSE_MIN_VW = 1500;                  // 视口窄于此一律走「一列」模式
const ELLIPSE_MIN_PANEL = 220;                // 椭圆模式要求中心至少留这么宽给展示区
const SCROLL_MIN = 10;                        // 展示区站点数 ≥ 此值才显示滚动条

const deckEl = $('#deck');
const linkHead = $('#linkHead');
const linkPanel = $('#linkPanel');
const pnTitle = linkPanel.querySelector('.pn-title');
const pnCount = linkPanel.querySelector('.pn-count');
const pnList = linkPanel.querySelector('.pn-list');
const linkBadges = $('#linkBadges');
const linkMeta = $('#linkMeta');

const cards = [];
const deck = { pos: 0, from: 0, to: 0, t: 0, dur: 0, pow: 3, back: false, drag: null };
let G = null;

const normIdx = v => { const n = DECK.length; return ((v % n) + n) % n; };
const curIdx = () => normIdx(Math.round(deck.pos));

/* 一条站点：第一行站名（即超链接），第二行一句简介 */
/* 逐条错峰：第 i 条延后 i×10ms。封顶 12 条（120ms），
   否则站多的分类（有的 30+ 站）最后几条要等半秒才出来，反而拖沓。 */
const STAGGER_MS = 10, STAGGER_MAX = 12;
function mkRow(it, i) {
  const a = document.createElement('a');
  a.className = 'pn-item';
  a.href = it.u;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.style.animationDelay = (Math.min(i || 0, STAGGER_MAX) * STAGGER_MS) + 'ms';
  const nm = document.createElement('span');
  nm.className = 'pn-iname';
  nm.textContent = it.n;
  a.appendChild(nm);
  const nt = document.createElement('span');
  nt.className = 'pn-inote';
  /* 简介为空时也要占住第二行，否则行高从 38 掉到 22、一大一小很难看。
     必须用不换行空格：普通空格是可折叠空白，块里只剩它时高度直接归零。 */
  nt.textContent = it.d || '\u00a0';
  a.appendChild(nt);
  return a;
}

function buildDeck() {
  DECK.forEach((c, k) => {
    const el = document.createElement('div');
    el.className = 'dcard';
    el.dataset.k = String(k);
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', c.cat + '，' + c.items.length + ' 站');
    const nm = document.createElement('span');
    nm.className = 'dc-name';
    nm.textContent = c.cat;
    const ct = document.createElement('span');
    ct.className = 'dc-count';
    ct.textContent = c.items.length;
    el.appendChild(nm); el.appendChild(ct);
    el.style.width = CARD_W + 'px';
    el.style.height = CARD_H + 'px';
    deckEl.appendChild(el);
    cards.push(el);
  });
  linkMeta.textContent = DECK.length + ' 类 · ' +
    DECK.reduce((s, c) => s + c.items.length, 0) + ' 站';
}

/* 几何：先量出可用的矩形带（桌面端 = 圆环左侧的空白带，移动端 = 圆盘下方、徽章上方），
   再决定走椭圆还是走一列，最后定下展示区的位置和尺寸。
   必须在 body.deck-on 已经生效之后量，否则 getBoundingClientRect 全是 0。 */
function measure() {
  const vw = window.innerWidth, vh = window.innerHeight;
  const rr = svg.getBoundingClientRect();
  const isM = document.body.classList.contains('is-mobile');

  if (isM) linkHead.style.top = Math.round(rr.bottom + 6) + 'px';
  else linkHead.style.top = '';

  const headR = linkHead.getBoundingClientRect();
  const badgeR = linkBadges.getBoundingClientRect();

  let limL, limR, topLim, botLim;
  if (isM) {
    limL = 14;
    limR = vw - 14;
    /* 上下界：圆盘下方的标题 ↔ 屏幕底部的徽章。量不出来（0）就退回到按屏高估 */
    if (badgeR.top - headR.bottom > 200) { topLim = headR.bottom + 8; botLim = badgeR.top - 8; }
    else { topLim = vh * 0.36; botLim = vh * 0.94; }
  } else {
    /* rr.left 取不到（圆盘还没布局）时按「圆环居中、占 44vw」估一个，
       免得算出负的边界把所有卡片挤到最左边 */
    limL = Math.min(54, Math.max(18, vw * 0.045));
    limR = Math.max(240, (rr.left || vw * 0.28) - 14);
    topLim = Math.min(54, Math.max(18, vh * 0.045));
    botLim = vh - topLim;
  }
  const bandW = Math.max(140, limR - limL), bandH = Math.max(140, botLim - topLim);
  const cy = (topLim + botLim) / 2;

  /* 椭圆模式：带宽要同时容下「两张卡 + 中间至少 ELLIPSE_MIN_PANEL 的展示区」，
     否则退化为「左侧一列 + 右侧展示区」（窄屏唯一的活路）。 */
  const ellipse = !isM && vw >= ELLIPSE_MIN_VW && bandW >= 2 * CARD_W + ELLIPSE_MIN_PANEL;
  let cx = 0, rx = 0, ry = 0, arc = null, P = 0, colX = 0, ring = null, step = null;
  if (ellipse) {
    /* 水平两端按普通卡留边：当前卡现在钉在【上顶点】，左右两个顶点上是普通卡
       （或者干脆没有卡），不用再按放大后的尺寸缩一圈。竖直方向反过来 ——
       上顶点那张是放大的当前卡，它是纵向最紧的一处，所以 ry 按 CUR_H 留。 */
    const nearX = limL + CARD_W / 2, farX = limR - CARD_W / 2;
    cx = (nearX + farX) / 2;
    rx = Math.max(40, (farX - nearX) / 2);
    ry = Math.max(60, (bandH - CUR_H) / 2 - 8);
    arc = buildArc(cx, cy, rx, ry);
    P = arc.P;
    ring = buildRing(arc, DECK.length);        // 卡位：上/下各一张，左右镜像
    step = buildStep(ring);                    // 每格的弧长步距（拖动时当速度用）
  } else {
    colX = limL + CUR_W / 2;
  }

  /* 展示区：椭圆模式塞进环中间空出的洞，一列模式贴在卡片右边。
     尺寸不再用解析式硬推（顶点位置一换、当前卡一放大，公式就得重写），
     直接拿【真实卡位】试：把每张卡的矩形（含放大的当前卡 + 6px 余量）算出来，
     从洞里挑面积最大的那块不给任何卡片相交的矩形。
     扫高度、每个高度上二分最宽，屏幕多大、卡片排布怎么变都自动收敛。 */
  let pw, ph, px, py;
  if (ellipse) {
    const pts = [];
    for (let k = 0; k < DECK.length; k++) {
      const c0 = arcAt(arc, ring[k]);
      const hw = ((k === 0 ? CUR_W : CARD_W) / 2 + 6), hh = ((k === 0 ? CUR_H : CARD_H) / 2 + 6);
      pts.push([c0.x - hw, c0.y - hh, c0.x + hw, c0.y + hh]);
    }
    const fits = (w, h) => {
      const l = cx - w / 2, r = cx + w / 2, t = cy - h / 2, b = cy + h / 2;
      for (let i = 0; i < pts.length; i++) {
        const q = pts[i];
        if (q[0] < r && q[2] > l && q[1] < b && q[3] > t) return false;
      }
      return true;
    };
    const maxPH = Math.min(bandH - 12, 2 * ry - 24);
    const wMax = Math.min(420, bandW - 16);
    let best = null;
    for (let h = 160; h <= maxPH; h += 8) {
      if (!fits(170, h)) continue;            // 连最窄都放不下，这个高度作废
      let lo = 170, hi = wMax, bw = 170;
      for (let i = 0; i < 12; i++) {
        const mid = (lo + hi) / 2;
        if (fits(mid, h)) { bw = mid; lo = mid; } else hi = mid;
      }
      if (!best || bw * h > best.w * best.h) best = { w: bw, h: h };
    }
    if (best) { pw = best.w; ph = best.h; }
    else { pw = 170; ph = Math.max(160, Math.min(maxPH, 320)); }
    px = cx - pw / 2;
    py = cy - ph / 2;
  } else {
    pw = Math.max(150, Math.min(420, bandW - CUR_W - 14));
    ph = bandH;
    px = limR - pw;
    py = topLim;
  }
  linkPanel.style.left = Math.round(px) + 'px';
  linkPanel.style.top = Math.round(py) + 'px';
  linkPanel.style.width = Math.round(pw) + 'px';
  linkPanel.style.height = Math.round(ph) + 'px';

  /* 一列模式：列表比可视区长，两端各有卡片被排到带外（上面压着标题、
     下面压着徽章）。给容器加一条按【视口坐标】算的上下渐隐遮罩，
     越界的卡片化在边缘上，看起来才是个滚动窗口而不是穿帮。
     椭圆模式的卡片本来就全在带内，不需要遮罩。 */
  if (ellipse) {
    deckEl.style.maskImage = '';
    deckEl.style.webkitMaskImage = '';
  } else {
    const fade = Math.round(CUR_H * 0.7);
    const a = Math.max(0, Math.round(topLim)), b = Math.round(botLim);
    const g = b - fade > a + fade
      ? 'linear-gradient(to bottom, transparent 0, transparent ' + a + 'px, #000 ' +
      (a + fade) + 'px, #000 ' + (b - fade) + 'px, transparent ' + b + 'px, transparent 100%)'
      : 'none';
    deckEl.style.maskImage = g;
    deckEl.style.webkitMaskImage = g;
  }

  G = {
    ellipse: ellipse, arc: arc, P: P, ring: ring, step: step, cx: cx, cy: cy, rx: rx, ry: ry,
    colX: colX, pitch: CUR_H + CARD_GAP,     // 步距按放大后的当前卡算，列里也不会叠
    limL: limL, limR: limR, topLim: topLim, botLim: botLim,
    bandW: bandW, bandH: bandH, vw: vw, vh: vh, isM: isM
  };
  return G;
}

/* 椭圆采样表：把周长离散成 M 段，供「弧长 → 坐标」查表用。
   t = 0 落在最左端（= 最近点 = 当前选中的卡）。 */
function buildArc(cx, cy, rx, ry) {
  const M = 512;
  const xs = new Float64Array(M + 1), ys = new Float64Array(M + 1), cum = new Float64Array(M + 1);
  for (let i = 0; i <= M; i++) {
    const t = i / M * 2 * Math.PI;
    xs[i] = cx - rx * Math.cos(t);
    ys[i] = cy + ry * Math.sin(t);
    if (i) cum[i] = cum[i - 1] + Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]);
  }
  return { M: M, xs: xs, ys: ys, cum: cum, P: cum[M] };
}

/* 相邻两张卡的「方框间隙」：正数 = 分离，负数 = 重叠深度。
   必须用方框距离而不是圆心距：卡片是 100×58 的矩形，椭圆靠近上下两端时
   弧近乎水平，卡片的横向宽度会把间隙吃掉一大块 —— 这正是旧版「间距不均匀」
   的根源（只按弧长均分，两端间隙 0~16、两侧却有 73）。 */
/* w/h 是这一对卡片的「有效尺寸」= 两张半宽（半高）之和。默认都是普通卡，
   只有「放大的当前卡 ↔ 普通卡」那一对要传 (CUR_W+CARD_W)/2。 */
function boxGap(p, q, w, h) {
  const dx = Math.abs(p.x - q.x) - (w || CARD_W), dy = Math.abs(p.y - q.y) - (h || CARD_H);
  if (dx > 0 || dy > 0) return Math.hypot(Math.max(0, dx), Math.max(0, dy));
  return -Math.min(-dx, -dy);
}

/* ---- 环上卡位 ----
   用户要的三条：最上方正好一张（就是当前选中的那张）、最下方正好一张、
   左右两半卡片数相等。做法：
     ① slot 0 钉在【上顶点】（t = 3π/2）。椭圆四个象限弧长严格相等，
        所以上顶点的弧长正好是 3P/4，不用查表。
     ② 只解【左半圈】（上顶点 → 左顶点 → 下顶点，弧长 P/2）：从最上面那张
        一步步走，每一步的方框间隙都等于 c，c 由「走满 N/2 步正好落在 P/2」
        二分定下。
     ③ 右半圈直接把左半圈【镜像】过来（关于竖直轴）。镜像下弧长偏移翻号，
        所以右半 = A − d[..]，补一圈折回正区间。
        左右张数、间隙由此【必然】相等，不是凑出来的 —— 上一版是整圈一起走，
        N 不是 4 的倍数时顶点钉卡会把多出来的一张全甩到左半，于是「左边多俩」。
   放大的当前卡就在上顶点，左右两张邻居是横向贴过来的，所以第一格要按
   (CUR_W+CARD_W)/2 算，否则选中的卡会跟左右邻居挤在一起。
   N 为奇数时「上下各一张 + 左右相等」无解（总数会变成偶数），
   这里保上顶点一张 + 左右相等，让下顶点变成一对对称卡。 */
function buildRing(arc, N) {
  const P = arc.P;
  const pos = new Float64Array(N + 1);
  const A = 3 * P / 4;                        // 上顶点（当前卡）的弧长
  if (N < 2) { pos[0] = A; pos[1] = A + P; return pos; }
  const half = P / 2;
  const W0 = (CUR_W + CARD_W) / 2, H0 = (CUR_H + CARD_H) / 2;
  /* 从弧长 s 出发，走多远才能让下一张卡与当前卡的方框间隙正好是 c。
     间隙随 d 单调递增、斜率≈1，直接当牛顿步用，几轮就收敛。 */
  const stepAt = (s, c, w, h) => {
    let d = h + c;
    for (let i = 0; i < 40; i++) {
      const e = c - boxGap(arcAt(arc, s), arcAt(arc, s + d), w, h);
      if (Math.abs(e) < 0.005) break;
      d += e;
    }
    return Math.max(1, d);
  };
  const even = N % 2 === 0;
  const m = even ? N / 2 : (N - 1) / 2;       // 左半圈的【步数】
  const d = new Float64Array(m + 1);          // 左半各卡相对上顶点的弧长偏移
  const fill = c => {
    let s = A;
    d[0] = 0;
    for (let j = 0; j < m; j++) {
      s += stepAt(s, c, j === 0 ? W0 : CARD_W, j === 0 ? H0 : CARD_H);
      d[j + 1] = s - A;
    }
  };
  /* 二分 c。偶数张：走满 m 步要正好是半圈；奇数张：走满 m 步之后，
     从最后一张跨过下顶点到它的镜像也要【正好算一格】。 */
  let lo = -CARD_H, hi = P;
  for (let i = 0; i < 44; i++) {
    const mid = (lo + hi) / 2;
    fill(mid);
    const over = even
      ? d[m] > half
      : stepAt(A + d[m], mid, CARD_W, CARD_H) > P - 2 * d[m];
    if (over) hi = mid; else lo = mid;
  }
  const c = (lo + hi) / 2;
  fill(c);
  for (let j = 0; j <= m; j++) pos[j] = A + d[j];
  /* 右半 = 左半的镜像。d[0] 就是上顶点自己（镜像等于自己），
     偶数张时 d[m] 在下顶点上、镜像也是自己，都要跳过。 */
  const upto = even ? m - 1 : m;
  for (let j = 1; j <= upto; j++) pos[m + j] = A - d[m - j + (even ? 0 : 1)] + P;
  pos[N] = A + P;
  return pos;
}

/* 每格要走多少弧长。slotAt 拿它当速度序列用，所以必须逐格存下来。 */
function buildStep(ring) {
  const N = ring.length - 1;
  const st = new Float64Array(N);
  for (let k = 0; k < N; k++) st[k] = ring[k + 1] - ring[k];
  return st;
}

/* 第 u 个卡位相对「左顶点」的弧长。u 允许是小数（拖动时在两格之间），
   也不要求落在 [0,N)，正负都行。
   注意【不能】在弧长上线性插值：等间隙解出来的每格步距本身是不等的
   （过上下顶点时一格要走 ~150、过左右顶点只要 ~107），线性插值会让
   速度变成台阶 —— 每跨过一个卡位速度就突跳一次，实测相邻小步位移能差
   1.4×，拖起来就是一跳一跳的。
   这里把「每格步距」当速度序列，用周期 Catmull-Rom 插成连续速度 v(u)
   再积分出弧长：位置 C² 连续；而且 Hermite 在每格上的积分
   = (a+b)/2 + (m0-m1)/12，绕一圈求和后切线项全部抵消、正好等于 Σ步距 = P，
   所以闭合依然是精确的，一格都不差。 */
function slotAt(u) {
  const N = DECK.length, P = G.arc.P;
  const i = Math.floor(u), f = u - i;
  const st = G.step;
  const k = ((i % N) + N) % N;
  const a = st[k], b = st[(k + 1) % N], pv = st[(k - 1 + N) % N];
  /* 节点切线取左右两格步距的调和平均（单调三次插值 PCHIP）：
     调和平均一定落在两格步距之间 ⇒ 曲线严格单调，卡片绝不会「倒回去」；
     切线只由相邻两格决定 ⇒ 跨节点一阶连续，速度不再台阶式突跳。 */
  const m0 = 2 * pv * a / (pv + a), m1 = 2 * a * b / (a + b);
  const f2 = f * f, f3 = f2 * f;
  /* 区间局部坐标：左端 0、右端 a（这一格要走多远） */
  const s = a * (3 * f2 - 2 * f3) + m0 * (f - 2 * f2 + f3) + m1 * (f3 - f2);
  return G.ring[k] + Math.floor(i / N) * P + s;
}

/* 弧长 s（可正可负）→ 坐标：先折回 [0,P)，再二分查表、线性插值 */
function arcAt(a, s) {
  const P = a.P;
  let u = s % P;
  if (u < 0) u += P;
  let lo = 0, hi = a.M;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (a.cum[mid] < u) lo = mid + 1; else hi = mid; }
  const i = Math.max(1, lo);
  const seg = (a.cum[i] - a.cum[i - 1]) || 1;
  const f = (u - a.cum[i - 1]) / seg;
  return {
    x: a.xs[i - 1] + (a.xs[i] - a.xs[i - 1]) * f,
    y: a.ys[i - 1] + (a.ys[i] - a.ys[i - 1]) * f
  };
}

function layoutDeck() {
  if (!G) measure();
  const N = cards.length;
  const cur = curIdx();
  const half = N / 2;

  /* 列模式：一串卡片纵向滚动，选中卡尽量居中，两端夹住不许滚出可视区 */
  let shift = 0;
  if (!G.ellipse) {
    const contentH = N * G.pitch, winH = G.bandH;
    const base = G.topLim + winH / 2;
    const firstY = base - deck.pos * G.pitch;
    if (contentH <= winH) {
      shift = (G.topLim + (winH - contentH) / 2 + G.pitch / 2) - firstY;
    } else {
      const minFirst = G.topLim + G.pitch / 2, maxLast = G.botLim - G.pitch / 2;
      if (firstY > minFirst) shift = minFirst - firstY;
      else if (firstY + (N - 1) * G.pitch < maxLast) shift = maxLast - (firstY + (N - 1) * G.pitch);
    }
  }

  for (let k = 0; k < N; k++) {
    let f = k - deck.pos;
    if (G.ellipse) {
      /* 椭圆是闭合的环：取最短的一侧，跨过 0 时不绕远路 */
      f = ((f % N) + N) % N;
      if (f > half) f -= N;
    }
    /* 一列模式是线性列表，不能绕回 —— 否则滚到末尾时第一张会「接」在最后一张下面 */
    const el = cards[k];
    const isCur = k === cur;

    let x, y;
    if (G.ellipse) {
      /* 卡位由 buildRing 给出（四顶点各一张），拖动时按卡位插值，全程连续 */
      const p = arcAt(G.arc, slotAt(k - deck.pos));
      x = p.x; y = p.y;
    } else {
      x = G.colX;
      y = G.topLim + G.bandH / 2 + f * G.pitch + shift;
    }

    /* 纵深【不再调亮度】：用户要「去掉右侧的阴暗效果」，所以除当前卡外
       所有卡片用同一档底色与同一个字色，不再按远近压暗。
       远近关系只由 z 序表达（下面那条链式叠压）。 */

    /* 当前卡略放大。只改尺寸、不改中心，所以它还是正落在卡位上；
       椭圆两端已经按 CARD_W 留过边，不会顶出 limL。 */
    el.style.width = (isCur ? CUR_W : CARD_W) + 'px';
    el.style.height = (isCur ? CUR_H : CARD_H) + 'px';
    el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%)';
    /* 链式叠压：沿环的【一个方向】z 单调递减 ⇒ 我叠你、你叠他、他叠我，
       环是闭合的，严格循环做不到，唯一的断口落在离当前卡最远的那一张
       （最右端、最不显眼的地方）。
       上一版按 |f| 排序，等效于在上下顶点各断一次：环的上下半各排各的，
       顶点那两张 z 相差只有 1、还会随小数位置来回翻转，所以「叠压方向不准」。
       现在用 (f + N/2) mod N 当序号，一个方向一条链，不会跳。 */
    const ord = ((f + half) % N + N) % N;
    el.style.zIndex = String(isCur ? 3000 : 2000 - Math.round(ord / N * 1200));
    /* 卡片底色写在 --fill 上（::after 拿它铺满内层，边缘那圈留给本体背景 = 描边）。
       选中那张不用改底色：::before 的灰白渐变自己会淡进来、::after 会滑走，
       全在 CSS 里做，JS 只管字色（灰白底必须配深色字）。 */
    el.style.color = isCur ? '#17171b' : 'rgba(255,255,255,.92)';
    el.classList.toggle('cur', isCur);
  }
}

/* 展示区：只渲染当前选中卡的内容 */
let panelIdx = -1;
function renderPanel(force) {
  const i = curIdx();
  if (!force && i === panelIdx) return;
  panelIdx = i;
  const c = DECK[i];
  pnTitle.textContent = c.cat;
  pnCount.textContent = c.items.length + ' 站';
  pnList.textContent = '';
  c.items.forEach((it, i) => pnList.appendChild(mkRow(it, i)));
  /* 站点少的分类不给滚动条：一条竖线挂在那里只会碍眼 */
  pnList.classList.toggle('scrolly', c.items.length >= SCROLL_MIN);
  pnList.scrollTop = 0;
}

/* 列模式的位置是线性的，不能绕回；椭圆模式原样返回 */
function clampV(v) {
  const N = DECK.length;
  if (G && !G.ellipse) return Math.max(0, Math.min(N - 1, v));
  return v;
}

function deckTo(v) {
  deck.from = deck.pos; deck.to = clampV(v); deck.t = 0; deck.dur = 0.42; deck.pow = 3;
  deck.back = false;
}

/* 进入链接板块：轮盘先转约 1 秒、末尾明显减速收住。
   转多少按【角度】折算成格数：固定约 100°，所以卡片越多转过的格数越多、
   角速度却一致，N 从 2 到 100+ 观感都一样。
   【方向】卡位序号随弧长增大走 上顶点 → 左 → 下 → 右（= 逆时针），
   而卡片 k 落在第 (k − deck.pos) 个卡位上，所以 deck.pos 变小 = 逆时针。
   这里 from = to + spin（pos 递减）—— 顺时针的话是 to − spin。
   一列模式（窄屏）位置是线性的、转不起来，直接不转。 */
function deckEnter() {
  if (!G || !G.ellipse || reduceMQ.matches || deck.drag) return;
  const N = DECK.length;
  const spin = Math.max(0.6, Math.min(9, N * 0.28));   // 约 100°，卡片少时不要再放大
  const to = Math.round(deck.pos);
  deck.from = to + spin;                                /* 递减 ⇒ 逆时针 */
  deck.to = to;
  deck.pos = deck.from;
  deck.t = 0;
  deck.dur = 1.05;
  deck.pow = 4;
  deck.back = false;
  layoutDeck();
}
/* 连着滚时把目标累加起来，而不是每次从当前位置只走一格 */
function deckStep(d) {
  deckTo((deck.dur > 0 ? deck.to : Math.round(deck.pos)) + d);
  deck.back = true;                           /* 滚轮 / 方向键：带一点回弹 */
}
function deckPick(k) {
  const N = DECK.length;
  let d = k - deck.pos;
  d = ((d % N) + N) % N;
  if (d > N / 2) d -= N;
  deckTo(deck.pos + d);
  /* 过冲是按距离比例算的，跨太多格时冲出去的量会大到难看，所以只给近距离点选 */
  deck.back = Math.abs(d) <= 2;
}

function deckSettle() {
  const N = DECK.length;
  deck.pos = G && !G.ellipse
    ? Math.max(0, Math.min(N - 1, Math.round(deck.to)))
    : normIdx(deck.to);
  deck.dur = 0;
  renderPanel();
  layoutDeck();
}

/* ---- 交互：滚轮 / 拖拽 / 点击 / 键盘 ---- */
window.addEventListener('wheel', e => {
  if (state.selectedId !== 'links' || deck.drag) return;
  /* 展示区里的列表自己滚，别被轮盘抢走 */
  if (e.target && e.target.closest && e.target.closest('#linkPanel')) return;
  e.preventDefault();
  deckStep(e.deltaY > 0 ? 1 : -1);
}, { passive: false });

deckEl.addEventListener('pointerdown', e => {
  const card = e.target.closest ? e.target.closest('.dcard') : null;
  if (!card) return;
  markInteracted();
  deck.dur = 0;
  deck.drag = { y: e.clientY, pos: deck.pos, k: +card.dataset.k, moved: 0 };
  /* 这里【绝对不能】setPointerCapture：捕获会把 pointerup 重定向到卡片，
     于是 click 的目标变成卡片而不是里面的 <a>，链接就永远点不开。
     移动与抬起改挂在 window 上，指针滑出卡片也照样收得到。 */
});
window.addEventListener('pointermove', e => {
  if (!deck.drag) return;
  const dy = e.clientY - deck.drag.y;
  if (Math.abs(dy) > deck.drag.moved) deck.drag.moved = Math.abs(dy);
  const unit = G && G.ellipse ? Math.max(24, G.P / DECK.length) : (G ? G.pitch : 64);
  deck.pos = clampV(deck.drag.pos - dy / unit);
  layoutDeck();
});
function endDrag() {
  if (!deck.drag) return;
  const d = deck.drag;
  deck.drag = null;
  if (d.moved < 6) { deckPick(d.k); return; }          /* 没怎么动 = 点选 */
  deck.from = deck.pos; deck.to = clampV(Math.round(deck.pos));
  deck.t = 0; deck.dur = 0.34; deck.pow = 3;             /* 松手后的吸附，收尾更短 */
  deck.back = false;                          /* 拖动松手不要回弹，会显得打滑 */
}
window.addEventListener('pointerup', endDrag);
window.addEventListener('pointercancel', endDrag);

/* ============ 选中与面板 ============ */
const panes = document.querySelectorAll('.pane');
const cornerEls = document.querySelectorAll('.corner-panel');
const main = document.querySelector('main');
function select(id, silent) {
  state.selectedId = id;
  document.querySelectorAll('.sector').forEach(p => p.classList.toggle('selected', p.dataset.sid === id));
  /* 选中反馈三层：对应扇区的外弧加粗提亮（主）+ 标签提亮 + 扇区填充加强 */
  const selIdx = SECTORS.findIndex(s => s.id === id);
  outerArcs.forEach((a, i) => a.classList.toggle('sel', i === selIdx));
  labelsG.querySelectorAll('.s-label').forEach(g => g.classList.toggle('sel', g.dataset.lid === id));
  hubImg.classList.toggle('sel', id === 'core');
  syncTargets();
  panes.forEach(p => p.classList.toggle('show', p.dataset.pane === id));
  cornerEls.forEach(el => el.classList.toggle('visible', el.dataset.corner === id));
  /* 移动端切板块后回到内容顶部，否则会停在上一板块的滚动位置 */
  if (mStack) mStack.scrollTop = 0;
  /* 卡片轮盘是 fixed 层：必须先让它显形，再量尺寸、排布、刷新右侧长条 */
  const onDeck = (id === 'links');
  document.body.classList.toggle('deck-on', onDeck);
  if (onDeck) { measure(); layoutDeck(); renderPanel(true); if (!silent) deckEnter(); }
  /* deco lines: 智能切换——只动需要变的方向 */
  const dl = document.getElementById('decoLines');
  const wantH = (id === 'interests' || id === 'artists' || id === 'core');
  const wantV = (id === 'projects' || id === 'links' || id === 'core');
  const hasH = dl.classList.contains('show-h');
  const hasV = dl.classList.contains('show-v');
  if (wantH && !hasH) dl.classList.add('show-h');
  else if (!wantH && hasH) dl.classList.remove('show-h');
  if (wantV && !hasV) dl.classList.add('show-v');
  else if (!wantV && hasV) dl.classList.remove('show-v');

  /* 背景亮带：回到中心恢复被动自转，切到板块则 1s 内顺时针转到该板块的档位 */
  if (id === 'core') bg.mode = 'spin';
  else if (!silent) bgTurnTo(id);

  if (!silent) {
    panes.forEach(p => { if (p.classList.contains('show')) { p.style.animation = 'none'; void p.offsetWidth; p.style.animation = ''; } });
    /* 切换板块：给刻度环一记冲量，高速转约 .5s 后缓慢减速
       （衰减常数按板块走 KICK_TAU_BY，收尾快慢就是各板块的性格之一） */
    if (!reduceMQ.matches) state.kickV = KICK_V0;
    startEntry(id);
  }
}

/* ============ 板块入场 ============
   把 data-enter 写到 body 上，CSS 里每个板块挂一条不同名字的动画。
   注意【只改值、不摘除】：摘掉会让动画名从 entXxx 退回 fadeIn，
   浏览器当成一条新动画从头播一遍，整块闪一下。
   boot 的 delay 规则和入场抢时序（boot 期间改动画名才闪），所以先收掉 boot。 */
function startEntry(id) {
  const b = document.body;
  if (reduceMQ.matches) { b.removeAttribute('data-enter'); return; }
  if (b.classList.contains('boot')) endBoot();
  /* 值相同时动画不会重播，所以先摘 → 强制重排 → 再挂上，连点同一板块也能重来 */
  b.removeAttribute('data-enter');
  void b.offsetWidth;
  b.setAttribute('data-enter', id);
}

/* ============ 移动端重排：圆盘在上，内容在下可滚 ============
 * 四角面板是 position:fixed 的 body 子元素，纯 CSS 无法让它们进入下方内容流，
 * 所以由 JS 在断点切换时把它们和左右两栏一起搬进 #mStack。
 * 每条元素都记下原父节点与后继节点，切回桌面端时原样还原。
 */
const MQ_MOBILE = '(max-width: 768px), (max-height: 560px) and (orientation: landscape)';
const mqMobile = matchMedia(MQ_MOBILE);
const ringWrapEl = document.getElementById('ringWrap');
const panelLeft = document.querySelector('.panel-left');
const panelRight = document.querySelector('.panel-right');

/* markup 修正：「影像」原本被错嵌在「乐队」面板内部，先提到 body 层 */
const nestedPanel = document.querySelector('.corner-panel .corner-panel');
const projPanel = document.querySelector('.corner-panel.br[data-corner="projects"]');
if (nestedPanel && projPanel) document.body.insertBefore(nestedPanel, projPanel);

const cornerList = Array.prototype.slice.call(document.querySelectorAll('.corner-panel'));
cornerList.forEach(el => { el._home = el.parentNode; el._next = el.nextElementSibling; });

let mStack = null;
function toMobile() {
  if (!mStack) { mStack = document.createElement('div'); mStack.id = 'mStack'; }
  /* 右栏先放：core 态右栏为空，links 态则是「链接」标题排在徽章之前 */
  mStack.appendChild(panelRight);
  mStack.appendChild(panelLeft);
  cornerList.forEach(el => mStack.appendChild(el));
  document.body.appendChild(mStack);
}
function toDesktop() {
  if (!mStack) return;
  main.insertBefore(panelLeft, ringWrapEl);
  main.appendChild(panelRight);
  cornerList.forEach(el => {
    if (el._next && el._next.parentNode === el._home) el._home.insertBefore(el, el._next);
    else el._home.appendChild(el);
  });
  mStack.remove();
}
let mobile = null;
function applyLayout() {
  const on = mqMobile.matches;
  if (on === mobile) return;
  mobile = on;
  document.body.classList.toggle('is-mobile', on);
  if (on) toMobile(); else toDesktop();
  /* 圆盘尺寸与装饰线位置都依赖布局，重排后要重算 */
  sizeHubImg();
  positionDeco();
  /* 断点一换，轮盘的可用区域也换了（移动端要躲开圆盘和徽章） */
  if (state.selectedId === 'links') { measure(); layoutDeck(); }
}
if (mqMobile.addEventListener) mqMobile.addEventListener('change', applyLayout);
else mqMobile.addListener(applyLayout);

/* ============ 指针交互 ============ */
let mode = null, rotStart = null;
function angleFromEvent(e) {
  const r = svg.getBoundingClientRect();
  return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
}
svg.addEventListener('pointerdown', e => {
  markInteracted();
  endBoot();
  const rim = e.target.closest ? e.target.closest('#rimHit') : null;
  if (rim) {
    mode = 'rot';
    rotStart = { a: angleFromEvent(e), base: state.angle };
    document.body.classList.add('rotating');
    svg.setPointerCapture(e.pointerId);
    e.preventDefault(); return;
  }
  const sec = e.target.closest ? e.target.closest('[data-sid]') : null;
  if (sec) { select(sec.dataset.sid); e.preventDefault(); }
});
svg.addEventListener('pointermove', e => {
  if (mode === 'rot' && rotStart) {
    state.angle = rotStart.base + (angleFromEvent(e) - rotStart.a);
    renderRotation();
  }
});
svg.addEventListener('pointerup', () => { mode = null; rotStart = null; document.body.classList.remove('rotating'); });
svg.addEventListener('pointercancel', () => { mode = null; rotStart = null; document.body.classList.remove('rotating'); });

window.addEventListener('keydown', e => {
  markInteracted();
  endBoot();
  /* 链接板块：上下键转轮盘（左右键留给圆盘本身） */
  if (state.selectedId === 'links') {
    if (e.key === 'ArrowUp') { e.preventDefault(); deckStep(-1); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); deckStep(1); return; }
  }
  /* 卡片是 div[role=button]，没有原生激活行为，回车/空格要自己接 */
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
    const t = e.target;
    const card = t && t.closest ? t.closest('.dcard') : null;
    if (card) { e.preventDefault(); deckPick(+card.dataset.k); return; }
  }
  if (e.key === 'ArrowLeft') { state.angle -= GAP; renderRotation(); }
  else if (e.key === 'ArrowRight') { state.angle += GAP; renderRotation(); }
});


/* ============ 装饰线定位 ============ */
const decoLines = document.getElementById('decoLines');
const decoSvg = document.getElementById('decoSvg');
function polarXY(cx, cy, r, deg) {
  const t = deg * Math.PI / 180;
  return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
}
function positionDeco() {
  const r = svg.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const tickR = r.width * 285 / 560;
  const gap = 12;
  const arcR = tickR + gap;
  const halfSpan = 22;
  const m = window.innerWidth < 1024 ? 20 : Math.min(54, Math.max(18, window.innerWidth * 0.045));
  const mv = window.innerHeight < 800 ? 20 : Math.min(54, Math.max(18, window.innerHeight * 0.045));

  /* 这一块害我上头晚睡两小时😡 */
  /* 线端点 = 弧中点 */
  decoLines.querySelector('.dline.left').style.width = (cx - arcR - m) + 'px';
  decoLines.querySelector('.dline.right').style.width = ((window.innerWidth - m) - (cx + arcR)) + 'px';
  decoLines.querySelector('.dline.top').style.height = (cy - arcR - mv) + 'px';
  decoLines.querySelector('.dline.bottom').style.height = ((window.innerHeight - mv) - (cy + arcR)) + 'px';

  /* 弧：与刻度环同心，半径 arcR */
  const arcs = {
    left: [180 - halfSpan, 180 + halfSpan],
    right: [0 - halfSpan, 0 + halfSpan],
    top: [270 - halfSpan, 270 + halfSpan],
    bottom: [90 - halfSpan, 90 + halfSpan]
  };
  for (const key in arcs) {
    const [a0, a1] = arcs[key];
    const [x0, y0] = polarXY(cx, cy, arcR, a0);
    const [x1, y1] = polarXY(cx, cy, arcR, a1);
    const p = decoSvg.querySelector('.arc.' + key);
    p.setAttribute('d', `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${arcR} ${arcR} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`);
    p.setAttribute('pathLength', '1');
  }
}
window.addEventListener('resize', () => {
  positionDeco();
  /* 轮盘的几何是量出来的，视口一变就得重量；量完立刻重排，否则会停在上一次的半径上 */
  if (state.selectedId === 'links') { measure(); layoutDeck(); }
});

/* ============ 可发现性：外环波纹，首次交互后消失 ============ */
let interacted = false;
function markInteracted() {
  if (interacted) return;
  interacted = true;
  document.body.classList.add('interacted');
}

/* ============ 入场 ============ */
let booting = false;
const bootTimers = [];
/* 入场没跑完就点了板块：boot 还在，新出现的面板会被 boot 的 1s 延迟套住，
   表现就是「点了没反应，字要等一秒多才浮出来」。一旦交互就立即结束入场，
   再用一段 .25s 淡入把还卡在延迟里的元素送到终态，避免硬跳。 */
function endBoot() {
  if (!booting) return;
  booting = false;
  bootTimers.forEach(clearTimeout);
  bootTimers.length = 0;
  document.body.classList.remove('boot');
  document.body.classList.add('boot-skipped');
  /* ringWrap 可能还停在 scale(.9)，摘掉 boot 后按真实尺寸重算 */
  sizeHubImg();
  positionDeco();
  setTimeout(() => document.body.classList.remove('boot-skipped'), 300);
}

/* ============ 启动 ============ */
applyLayout();
renderRotation();
sizeHubImg();
updateLines();
positionDeco();
select('core', true);
buildDeck();
renderBg();
booting = true;
document.body.classList.add('boot');
requestAnimationFrame(animLoop);
/* 入场期间 #ringWrap 处于 scale(.9)，结束后按真实尺寸重算 */
bootTimers.push(setTimeout(() => { if (booting) { sizeHubImg(); positionDeco(); } }, 1250));
/* 入场是一次性的：跑完就摘掉 boot，避免后续切换被入场延迟拖慢 */
bootTimers.push(setTimeout(() => {
  if (!booting) return;
  booting = false;
  document.body.classList.remove('boot');
}, 2400));
if (reduceMQ.matches) markInteracted();

