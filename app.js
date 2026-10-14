const CARE=window.CARE||[],HEALTH=window.HEALTH||[],app=document.getElementById('app'),sheet=document.getElementById('sheet');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CATS=['面膜','精华水','精华','面霜乳液','洗护发','眼部','手部','洁面','身体'],IC={'面膜':'mask','精华水':'toner','精华':'serum','面霜乳液':'cream','洗护发':'hair','眼部':'eye','手部':'hand','洁面':'cleanser','身体':'body'},CN={'面霜乳液':'面霜'};
const EFF=['保湿','清洁','提亮','舒缓','紧致','控油','去角质','修护','柔顺','护甲'],FREQ=['可每日','每周几次','按需'];
const grp=p=>p.intakeGroup==='未安排'?'每日':p.intakeGroup;
const st={care:{mode:'category',sel:'面膜',eff:null,q:''},health:{mode:'timing',sel:'每日',q:''},q:''};
let today={};
const byId=id=>HEALTH.find(p=>p.id===id)||CARE.find(p=>p.id===id);
const uniq=a=>[...new Set(a)];
const img=(p,cls='')=>`<img class="${cls}" src="${esc(p.img)}" alt="" loading="lazy" decoding="async" width="300" height="300"${p.clip?` style="clip-path:${esc(p.clip)}"`:''}>`;
const careCard=p=>`<article class="card"><div class="ph">${img(p)}</div><div class="brand">${esc(p.brand)} · ${esc(p.form)}</div><h3 class="name">${esc(p.name)}</h3><div class="trow">${uniq(p.tags||[]).slice(0,3).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="more info"><span>${p.use?`⏱ ${esc(p.use)}`:esc(CN[p.category]||p.category)}</span></div></article>`;
const healthCard=p=>`<button type="button" class="card tap" data-open="${esc(p.id)}" aria-haspopup="dialog"><div class="ph">${img(p)}${(p.safetyChips||[]).length?`<span class="warnbadge">⚠ ${esc(p.safetyChips[0])}</span>`:''}</div><div class="brand">${esc(p.brand)}</div><h3 class="name">${esc(p.name)}</h3><div class="trow">${uniq(p.benefits||p.tags||[]).slice(0,3).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="trow">${(p.doseChips||[]).slice(0,1).map(t=>`<span class="tag t">💊 ${esc(t)}</span>`).join('')}</div><div class="more"><span>详细介绍</span><span aria-hidden="true">›</span></div></button>`;
const searchBox=(id,ph,v)=>`<label class="search">🔍<input id="${id}" type="search" placeholder="${ph}" value="${esc(v)}" enterkeyhint="search" autocomplete="off"></label>`;
const seg=(opts,cur,key)=>`<div class="seg" role="group">${opts.map(([k,n])=>`<button type="button" data-${key}="${k}" aria-pressed="${k===cur}">${n}</button>`).join('')}</div>`;
const match=(p,q)=>!q||[p.brand,p.name,p.form,p.category,...(p.tags||[]),...(p.benefits||[]),...(p.purposes||[]),...(p.effects||[]),p.strength].join(' ').toLowerCase().includes(q.toLowerCase());
const fmtDate=d=>{const x=new Date(d+'T00:00');return isNaN(x)?d:`${x.getMonth()+1}月${x.getDate()}日 · 周${'日一二三四五六'[x.getDay()]}`};

function home(){
  const t=today||{},h=Array.isArray(t.health)?t.health:[],c=Array.isArray(t.care)?t.care:[];
  const row=e=>{const p=byId(e.id);if(!p)return `<div class="li"><div class="tx">未知产品 ${esc(e.id)}<small>请检查 today.json 里的 id</small></div></div>`;const isH=HEALTH.includes(p);
    const meta=[e.slot,e.amount].filter(Boolean).map(esc).join(' · ');
    return `<${isH?`button type="button" data-open="${esc(p.id)}" aria-haspopup="dialog"`:'div'} class="li">${img(p)}<div class="tx">${esc(p.name)}${meta?`<small class="when">🕒 ${meta}</small>`:''}${e.reason?`<small>${esc(e.reason)}</small>`:''}</div>${isH?`<div class="tm">${(p.safetyChips||[]).length?`<span class="tag w">⚠ ${esc(p.safetyChips[0])}</span><br>`:''}<span aria-hidden="true">›</span></div>`:''}</${isH?'button':'div'}>`};
  const sec=(title,arr)=>`<div class="sec">${title}</div>${arr.length?`<div class="list">${arr.map(row).join('')}</div>`:`<div class="banner">今天的推荐还没更新</div>`}`;
  app.innerHTML=`<div class="hero"><div class="hello">${t.date?fmtDate(t.date):'今天'}</div><h1 class="big">我的柜子</h1><a class="search" href="#search">🔍 <span>搜索 ${CARE.length+HEALTH.length} 件用品、品牌、成分</span></a></div>
  ${today===null?`<div class="banner">未能读取 today.json（直接双击打开本地文件时浏览器会拦截，部署到网页或用本地服务器即可）。</div>`:''}
  <div class="cab"><a class="cb" href="#care" style="background:#f7efd9"><h3>护理柜</h3><img src="img/home-care.webp" alt=""></a><a class="cb" href="#health" style="background:#e6ecdc"><h3>保健柜</h3><img src="img/home-health.webp" alt=""></a></div>
  ${sec('今日推荐 · 护肤',c)}${sec('今日推荐 · 保健品',h)}`;
}
function care(){
  const s=st.care,V=CARE;let opts;
  if(s.mode==='category')opts=CATS.filter(c=>V.some(p=>p.category===c));else if(s.mode==='frequency')opts=FREQ.filter(f=>V.some(p=>(p.frequency||[]).includes(f)));else{const n={};V.forEach(p=>n[p.brand]=(n[p.brand]||0)+1);opts=Object.keys(n).sort((a,b)=>n[b]-n[a])}
  if(!opts.includes(s.sel))s.sel=opts[0];
  let list=s.q?V.filter(p=>match(p,s.q)):V.filter(p=>s.mode==='frequency'?(p.frequency||[]).includes(s.sel):p[s.mode]===s.sel);
  const effs=s.mode==='category'&&!s.q?EFF.filter(e=>list.some(p=>p.effects.includes(e))):[];if(!effs.includes(s.eff))s.eff=null;if(s.eff)list=list.filter(p=>p.effects.includes(s.eff));
  const fl={'可每日':'按日','每周几次':'按周','按需':'按需'};
  app.innerHTML=`<header class="top"><h1 class="title">护理柜</h1>${searchBox('q-care','搜索护理用品',s.q)}${seg([['category','品类'],['frequency','频次'],['brand','品牌']],s.mode,'cmode')}</header>
  ${s.q?'':s.mode==='category'?`<div class="cats">${opts.map(c=>`<button type="button" class="cat" data-csel="${esc(c)}" aria-pressed="${c===s.sel}"><div class="ic"><img src="img/category-${IC[c]}.webp" alt=""></div>${esc(CN[c]||c)} <small style="color:var(--mute)">${V.filter(p=>p.category===c).length}</small></button>`).join('')}</div>`:`<div class="chips">${opts.map(o=>`<button type="button" class="chip" data-csel="${esc(o)}" aria-pressed="${o===s.sel}">${esc(fl[o]||o)}</button>`).join('')}</div>`}
  ${effs.length?`<div class="chips"><button type="button" class="chip" data-ceff="" aria-pressed="${!s.eff}">全部</button>${effs.map(e=>`<button type="button" class="chip" data-ceff="${esc(e)}" aria-pressed="${e===s.eff}">${esc(e)}</button>`).join('')}</div>`:''}
  <div class="meta">${s.q?`搜索「${esc(s.q)}」`:esc(fl[s.sel]&&s.mode==='frequency'?fl[s.sel]:CN[s.sel]||s.sel)} · ${list.length} 件</div><section class="grid">${list.map(careCard).join('')||'<div class="empty">没有找到</div>'}</section>`;
}
function health(){
  const s=st.health,V=HEALTH;let opts;
  if(s.mode==='timing')opts=['每日','随餐','晚餐后'].filter(g=>V.some(p=>grp(p)===g));else if(s.mode==='purpose')opts=uniq(V.flatMap(p=>p.purposes||[]));else{const n={};V.forEach(p=>n[p.brand]=(n[p.brand]||0)+1);opts=Object.keys(n).sort((a,b)=>n[b]-n[a]||a.localeCompare(b,'zh-CN'))}
  if(!opts.includes(s.sel))s.sel=opts[0];
  const f=p=>s.mode==='timing'?grp(p)===s.sel:s.mode==='purpose'?(p.purposes||[]).includes(s.sel):p.brand===s.sel;
  const list=s.q?V.filter(p=>match(p,s.q)):V.filter(f);
  const dup=V.filter(p=>(p.details?.sections||[]).some(x=>x.title.includes('重复'))).length;
  app.innerHTML=`<header class="top"><h1 class="title">保健柜</h1>${searchBox('q-health','搜索成分，如「镁」「维生素D」',s.q)}${seg([['timing','频次'],['purpose','功效'],['brand','品牌']],s.mode,'hmode')}</header>
  ${s.q?'':`<div class="chips">${opts.map(o=>`<button type="button" class="chip" data-hsel="${esc(o)}" aria-pressed="${o===s.sel}">${esc(o)} <small>${V.filter(p=>s.mode==='timing'?grp(p)===o:s.mode==='purpose'?(p.purposes||[]).includes(o):p.brand===o).length}</small></button>`).join('')}</div>`}
  <div class="meta">${s.q?`搜索「${esc(s.q)}」`:esc(s.sel)} · ${list.length} 件</div><section class="grid">${list.map(healthCard).join('')||'<div class="empty">没有找到</div>'}</section>`;
}
function search(){
  const q=st.q,h=HEALTH.filter(p=>match(p,q)),c=CARE.filter(p=>match(p,q));
  app.innerHTML=`<header class="top"><h1 class="title">搜索</h1>${searchBox('q-all','品牌、名称、功效、成分',q)}</header>${q?`<div class="meta">保健品 ${h.length} · 护理 ${c.length}</div><section class="grid">${h.map(healthCard).join('')}${c.map(careCard).join('')}</section>${h.length+c.length?'':'<div class="empty">没有找到</div>'}`:'<div class="empty">输入关键词，如「保湿」「镁」「HFP」</div>'}`;
  const i=document.getElementById('q-all');if(i&&!q)i.focus();
}
function openSheet(id){
  const p=HEALTH.find(x=>x.id===id);if(!p)return;const d=p.details||{sections:[]};
  sheet.innerHTML=`<div class="grab"></div><div class="shd">${img(p)}<div class="t"><div class="brand" style="margin:0">${esc(p.brand)} · ${esc(p.form||'')}</div><h2 id="sh-title">${esc(p.name)}</h2></div><button type="button" class="iconbtn" data-close aria-label="关闭">✕</button></div>
  <div class="tags" style="margin-top:10px">${(p.doseChips||[]).map(t=>`<span class="tag t">💊 ${esc(t)}</span>`).join('')}${(p.safetyChips||[]).map(t=>`<span class="tag w">⚠ ${esc(t)}</span>`).join('')}</div>
  ${p.summary?`<p class="summary">${esc(p.summary)}</p>`:''}${p.safety?`<div class="alert" style="margin:10px 0 0">⚠ ${esc(p.safety)}</div>`:''}
  ${d.sections.map((x,i)=>`<details class="acc"${i<2?' open':''}><summary>${esc(x.title)}</summary><ul class="pts">${x.items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></details>`).join('')}
  ${(d.sources||[]).length?`<details class="acc"><summary>来源</summary>${d.sourceNote?`<p>${esc(d.sourceNote)}</p>`:''}<ul>${d.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join('')}</ul></details>`:''}<p class="fine">仅为整理自标签与公开资料的参考信息，不构成医疗建议。</p>`;
  sheet.showModal();sheet.scrollTop=0;document.body.style.overflow='hidden';
}
sheet.addEventListener('close',()=>document.body.style.overflow='');
sheet.addEventListener('click',e=>{if(e.target===sheet){const r=sheet.getBoundingClientRect();if(e.clientY<r.top||e.clientX<r.left||e.clientX>r.right)sheet.close()}if(e.target.closest('[data-close]'))sheet.close()});
function route(){const r=(location.hash.slice(1)||'home');({home,care,health,search}[r]||home)();document.querySelectorAll('.tab a').forEach(a=>a.classList.toggle('on',a.dataset.r===r)&&a.setAttribute('aria-current','page'));if(!('ontouchstart' in window))0;}
app.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const D=b.dataset,top=()=>window.scrollTo({top:0});
  if(D.open)return openSheet(D.open);
  if(D.cmode){st.care.mode=D.cmode;st.care.eff=null;care();top()}else if(D.csel!==undefined){st.care.sel=D.csel;st.care.eff=null;care()}else if(D.ceff!==undefined){st.care.eff=D.ceff||null;care()}
  else if(D.hmode){st.health.mode=D.hmode;health();top()}else if(D.hsel!==undefined){st.health.sel=D.hsel;health()}});
app.addEventListener('input',e=>{const t=e.target,v=t.value.trim(),pos=t.selectionStart;if(t.id==='q-care'){st.care.q=v;care()}else if(t.id==='q-health'){st.health.q=v;health()}else if(t.id==='q-all'){st.q=v;search()}else return;const n=document.getElementById(t.id);n.focus();try{n.setSelectionRange(pos,pos)}catch(_){}});
document.addEventListener('click',e=>{if(e.target.closest('.li[data-open]'))0});
window.addEventListener('hashchange',()=>{route();window.scrollTo({top:0})});
const getJSON=u=>fetch(u,{cache:'no-store'}).then(r=>{if(!r.ok)throw r.status;return r.json()});
route();
getJSON('today.json').then(v=>today=v,()=>today=null).then(()=>{if((location.hash.slice(1)||'home')==='home')home()});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
