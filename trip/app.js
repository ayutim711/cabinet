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
      <p class="hello">待填写</p>
      <h1 class="title">待填写</h1>
      <div class="seg" role="tablist">
        <button type="button" data-tab="today" class="${tab==="today"?"on":""}">待填写</button>
        <button type="button" data-tab="tomorrow" class="${tab==="tomorrow"?"on":""}">待填写</button>
        <button type="button" data-tab="bags" class="${tab==="bags"?"on":""}">待填写</button>
      </div>
    </div>
  `));
  app.appendChild(tabs[tab]());
  app.appendChild(el(`<p class="fine">待填写</p>`));
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
      <h3>待填写</h3><p>待填写</p><span class="dot"></span>
    </button>
    <button type="button" class="cb" data-jump="shanghai">
      <h3>待填写</h3><p>待填写</p><span class="dot"></span>
    </button>
  </div>`));
  frag.appendChild(el(`<div class="sec">待填写<span>待填写</span></div>`));
  frag.appendChild(el(list([])));
  frag.appendChild(el(`<div class="sec" id="shoot">待填写<span>待填写</span></div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("待填写", "待填写", [["待填写","待填写"]])}
    ${card("待填写", "待填写", [["待填写","待填写"]])}
    ${card("待填写", "待填写", [["待填写","待填写"]])}
    ${card("待填写", "待填写", [["待填写","待填写"]], "待填写")}
  </div>`));
  frag.appendChild(el(`<div class="sec">待填写<span>待填写</span></div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("待填写", "待填写", ["待填写","待填写","待填写","待填写",["待填写","待填写"]])}
    ${card("待填写", "待填写", ["待填写","待填写","待填写"])}
  </div>`));
  frag.appendChild(el(`<div class="sec">待填写</div>`));
  frag.appendChild(el(`<div class="grid">
    <a class="card" href="#" target="_blank" rel="noopener">
      <div class="brand">待填写</div><div class="name">待填写</div>
      <div class="more">待填写</div>
    </a>
    <a class="card" href="#" target="_blank" rel="noopener">
      <div class="brand">待填写</div><div class="name">待填写</div>
      <div class="more">待填写</div>
    </a>
  </div>`));
  frag.appendChild(el(`<div class="sec">待填写</div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("待填写", "待填写", [["待填写","待填写"]])}
    ${card("待填写", "待填写", [["待填写","待填写"]])}
    ${card("待填写", "待填写", [["待填写","待填写"]])}
    ${card("待填写", "待填写", [["待填写","待填写"]])}
  </div>`));
  frag.appendChild(el(`<div class="banner" id="shanghai">待填写</div>`));
  return frag;
}

function renderTomorrow() {
  const frag = document.createDocumentFragment();
  frag.appendChild(el(`<div class="cab">
    <button type="button" class="cb" data-tab="bags">
      <h3>待填写</h3><p>待填写</p><span class="dot"></span>
    </button>
    <a class="cb" href="#" target="_blank" rel="noopener">
      <h3>待填写</h3><p>待填写</p><span class="dot"></span>
    </a>
  </div>`));
  frag.appendChild(el(`<div class="sec">待填写<span>待填写</span></div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("待填写", "待填写", [["待填写","待填写"]], "待填写")}
    ${card("待填写", "待填写", [["待填写","待填写"]])}
    ${card("待填写", "待填写", [["待填写","待填写"]])}
    ${card("待填写", "待填写", [["待填写","待填写"]], "待填写")}
  </div>`));
  frag.appendChild(el(`<div class="sec">待填写</div>`));
  frag.appendChild(el(list([])));
  frag.appendChild(el(`<div class="sec">待填写<span>待填写</span></div>`));
  frag.appendChild(el(`<div class="steps">
    <div class="st"><div class="n">待填写</div><div><b>待填写</b><span>待填写</span></div></div>
    <div class="st"><div class="n">待填写</div><div><b>待填写</b><span>待填写</span></div></div>
    <div class="st"><div class="n">待填写</div><div><b>待填写</b><span>待填写</span></div></div>
  </div>`));
  frag.appendChild(el(`<div class="sec">待填写</div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("待填写", "待填写", ["待填写","待填写","待填写","待填写"])}
    ${card("待填写", "待填写", ["待填写","待填写","待填写","待填写",["待填写","待填写"]])}
  </div>`));
  frag.appendChild(el(`<div class="sec">待填写</div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("待填写", "待填写", ["待填写","待填写"])}
    ${card("待填写", "待填写", ["待填写",["待填写","待填写"]])}
  </div>`));
  frag.appendChild(el(`<div class="sec">待填写</div>`));
  frag.appendChild(el(`<div class="grid">
    ${card("待填写", "待填写", [["待填写","待填写"]])}
    ${card("待填写", "待填写", [["待填写","待填写"]])}
  </div>`));
  frag.querySelectorAll("[data-tab]").forEach((b) => {
    b.onclick = (e) => { e.preventDefault(); tab = b.dataset.tab; render(); };
  });
  return frag;
}

function renderBags() {
  const shoot = [];
  const fukuoka = [];
  const frag = document.createDocumentFragment();
  frag.appendChild(el(`<div class="sec">待填写</div>`));
  frag.appendChild(el(`<div class="check">${shoot.map((t)=>`<div class="ck"><i></i><div>${t}</div></div>`).join("")}</div>`));
  frag.appendChild(el(`<div class="sec">待填写</div>`));
  frag.appendChild(el(`<div class="check">${fukuoka.map((t)=>`<div class="ck"><i></i><div>${t}</div></div>`).join("")}</div>`));
  frag.appendChild(el(`<div class="banner">待填写</div>`));
  return frag;
}

render();
