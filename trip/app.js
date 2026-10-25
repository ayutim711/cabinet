const tabs = {
  today: renderToday,
  tomorrow: renderTomorrow,
  bags: renderBags,
};

let tab = "today";

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content;
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(el(`
    <div class="top">
      <p class="hello">小鱼 · 出行</p>
      <h1 class="title">10/25–26 出行表</h1>
      <div class="seg" role="tablist">
        <button type="button" data-tab="today" class="${tab==="today"?"on":""}">今天 25</button>
        <button type="button" data-tab="tomorrow" class="${tab==="tomorrow"?"on":""}">明天 26</button>
        <button type="button" data-tab="bags" class="${tab==="bags"?"on":""}">行李</button>
      </div>
    </div>
  `));
  app.appendChild(tabs[tab]());
  app.appendChild(el(`<p class="fine">奶油绿皮肤 · 同护理柜</p>`));
  app.querySelectorAll(".seg button").forEach((b) => {
    b.onclick = () => { tab = b.dataset.tab; render(); };
  });
}

function card(brand, name, tags, more) {
  const tagHtml = tags.map((t) => {
    const [txt, kind] = Array.isArray(t) ? t : [t, ""];
    return `<span class="tag ${kind}">${txt}</span>`;
  }).join("");
  return `<article class="card">
    <div class="brand">${brand}</div>
    <div class="name">${name}</div>
    <div class="tags">${tagHtml}</div>
    ${more ? `<div class="more">${more}</div>` : ""}
  </article>`;
}

function list(items) {
  return `<div class="list">${items.map(([title, tm, detail]) => `
    <div class="li">
      <div class="tx">${title}${detail?`<small>${detail}</small>`:""}</div>
      <div class="tm">${tm||""}</div>
    </div>`).join("")}</div>`;
}

function renderToday() {
  const frag = document.createDocumentFragment();
  frag.appendChild(el(`<div class="cab">
    <button type="button" class="cb" data-jump="shoot">
      <h3>拍摄</h3><p>小米口播 + 龙井 · ikko 回店</p><span class="dot"></span>
    </button>
    <button type="button" class="cb" data-jump="shanghai">
      <h3>去上海</h3><p>直播后顺风车 · 明早赶 T2</p><span class="dot"></span>
    </button>
  </div>`));
  frag.appendChild(el(`<div class="sec">时间轴 <span>今天</span></div>`));
  frag.appendChild(el(list([
    ["起床化妆", "10:00"],
    ["小米口播", "11:30", "~1.5h · 干信息 + 人设半脸"],
    ["出发龙井", "13:00"],
    ["龙井外拍", "14:00", "不拍桂花 · 雨大改廊下 · 尽量 4K60"],
    ["返程赶店", "17:30"],
    ["ikko + 合影", "18:45", "是条小小鱼 · 整机+包装"],
    ["整理 + 收行李", "20:00"],
    ["对象直播", "21:00"],
    ["顺风车去上海", "播完", "明早约 4:30–5:00 出门赶 T2"],
  ])));
  frag.appendChild(el(`<div class="sec" id="shoot">卡点 <span>别踩点</span></div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("13:00", "出门", [["家里口播做完再走","t"]])}
    ${card("18:45", "回店截止", [["ikko 必须拍完","w"]])}
    ${card("21:00", "直播", [["对象开播","t"]])}
    ${card("播完", "去浦东", [["顺风车过夜","t"]], "过夜 → 明早 T2")}
  </div>`));
  frag.appendChild(el(`<div class="sec">拍摄 <span>两场</span></div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("小米", "口播 + 龙井", ["口播干信息","人设短句半脸","龙井不拍桂花","雨大改廊下",["尽量 4K60","t"]])}
    ${card("ikko", "是条小小鱼", ["整机+包装到店","档期明天发","可与客人合影"])}
  </div>`));
  frag.appendChild(el(`<div class="sec">脚本</div>`));
  frag.appendChild(el(`<div class="grid">
    <a class="card" href="https://o1yhfuyizgp.feishu.cn/wiki/ZqHXwshkPi1UGmk20jzcWFZJnMd" target="_blank" rel="noopener">
      <div class="brand">飞书</div><div class="name">小米｜杭州找秋天</div>
      <div class="more">打开脚本</div>
    </a>
    <a class="card" href="https://o1yhfuyizgp.feishu.cn/docx/PWl7di33loDUVDxRTtsckScZnLe" target="_blank" rel="noopener">
      <div class="brand">飞书</div><div class="name">ikko 开箱</div>
      <div class="more">打开脚本</div>
    </a>
  </div>`));
  frag.appendChild(el(`<div class="sec">档期</div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("ikko", "10/26 发", [["小号","t"]])}
    ${card("小米", "10/29 发", [["美酱","t"]])}
    ${card("华为", "10/31 发", [["摘星阁","t"]])}
    ${card("尼康", "已交", [["完成",""]])}
  </div>`));
  frag.appendChild(el(`<div class="banner" id="shanghai">国际航班：08:00 起飞 → 至少 5:30 到 T2（提前 ≥2.5h）</div>`));
  return frag;
}

function renderTomorrow() {
  const frag = document.createDocumentFragment();
  frag.appendChild(el(`<div class="cab">
    <button type="button" class="cb" data-tab="bags">
      <h3>行李</h3><p>护照 · 充电 · 伞</p><span class="dot"></span>
    </button>
    <a class="cb" href="https://cursor.com/canvas/store-50ef6fe9-2b07-41e0-85ef-31d80baeaeea/9e9f32f1-ac2e-4568-abe6-09751d37e83b" target="_blank" rel="noopener">
      <h3>旅食</h3><p>天神 / 中洲杂志</p><span class="dot"></span>
    </a>
  </div>`));
  frag.appendChild(el(`<div class="sec">出门 <span>提前 ≥2.5h</span></div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("到 T2", "约 5:30", [["起飞前 ≥2.5h","w"]], "08:00 起飞")}
    ${card("已在上海", "4:30–5:00 出门", [["顺风车过夜后","t"]])}
    ${card("若从杭州", "约 3:00 出门", [["开车约 2.5h","t"]])}
    ${card("航班", "9C6609", [["浦东 T2","t"]], "08:00 → FUK")}
  </div>`));
  frag.appendChild(el(`<div class="sec">航班 9C6609</div>`));
  frag.appendChild(el(list([
    ["起飞", "08:00", "浦东 T2"],
    ["到达", "约 10:55", "福冈 I"],
    ["值机", "J/K", "护照机场办"],
    ["登机口", "G174", "以现场为准"],
    ["乘客", "", "LYU/ANDONG · YU/NINGWEI"],
  ])));
  frag.appendChild(el(`<div class="sec">到酒店 <span>约 40–60 分</span></div>`));
  frag.appendChild(el(`<div class="steps">
    <div class="st"><div class="n">1</div><div><b>接驳</b><span>国际航站免费接驳到国内航站</span></div></div>
    <div class="st"><div class="n">2</div><div><b>地铁</b><span>机场线 → 中洲川端</span></div></div>
    <div class="st"><div class="n">3</div><div><b>步行</b><span>约 12 分钟到 LOF；或打车 15–20 分</span></div></div>
  </div>`));
  frag.appendChild(el(`<div class="sec">酒店 / 当天</div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("LOF 天神南", "10/26–29 · 2 人", ["春吉 3-16-27-1","+81 92-401-3178","Agoda 1789931208","住客 Ningwei Yu"])}
    ${card("当天（雨）", "先近后远", ["先入住放行李","下午雨弱再短走","天神 / 中洲","屋台或西中洲牛杂锅",["糸岛/海中道别排今天","w"]])}
  </div>`));
  frag.appendChild(el(`<div class="sec">天气</div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("蔷琵", "已减弱变性", ["白天仍可能大雨","上午最湿"])}
    ${card("怎么走", "近酒店", ["带伞",["暂勿海边","w"]])}
  </div>`));
  frag.appendChild(el(`<div class="sec">回程备忘</div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("9C6538", "10/29 18:00", [["FUK→PVG","t"]])}
    ${card("选座", "约 10/27 开", [["飞猪","t"]])}
  </div>`));
  frag.querySelectorAll("[data-tab]").forEach((b) => {
    b.onclick = (e) => { e.preventDefault(); tab = b.dataset.tab; render(); };
  });
  return frag;
}

function renderBags() {
  const shoot = [
    "ikko 整机 + 包装",
    "小米样机 + 充电 + 对比机",
    "ZV-E10 II + 11mm F1.8",
    "ZV-E1 + 24-50mm F2.8",
    "三脚架 + 麦克风",
    "伞 / 擦镜布",
  ];
  const fukuoka = [
    "护照（两人）",
    "机票 / 酒店确认截图",
    "卡 + 少量日元",
    "充电器 / 充电宝",
    "Type A 转接",
    "薄外套 + 长袖",
    "走路鞋",
    "稍体面一件",
    "药 / 防晒 / 润唇",
    "洗护小样",
    "耳机 / 墨镜",
    "伞或轻雨衣",
  ];
  const frag = document.createDocumentFragment();
  frag.appendChild(el(`<div class="sec">今天拍摄带出门</div>`));
  frag.appendChild(el(`<div class="check">${shoot.map((t)=>`<div class="ck"><i></i><div>${t}</div></div>`).join("")}</div>`));
  frag.appendChild(el(`<div class="sec">福冈带走</div>`));
  frag.appendChild(el(`<div class="check">${fukuoka.map((t)=>`<div class="ck"><i></i><div>${t}</div></div>`).join("")}</div>`));
  frag.appendChild(el(`<div class="banner">店拍相机用完先放回 · 不需要过检的拍摄器材别塞福冈包</div>`));
  return frag;
}

render();
