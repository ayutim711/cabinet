const V='cab-v16';
const CORE=['./','index.html','style.css?v=16','app.js?v=16','data/care.js?v=16','data/health.js?v=16','today.json'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
const put=(req,res)=>{if(res.ok){const c=res.clone();caches.open(V).then(x=>x.put(req,c))}return res};
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 const img=/\.(webp|png|jpe?g|svg)$/i.test(u.pathname);
 // 图片：缓存优先；HTML/CSS/JS/JSON：网络优先（离线时回退缓存）
 e.respondWith(img?caches.match(e.request).then(m=>m||fetch(e.request).then(r=>put(e.request,r)))
   :fetch(e.request,{cache:'no-store'}).then(r=>put(e.request,r)).catch(()=>caches.match(e.request,{ignoreSearch:true})));});
