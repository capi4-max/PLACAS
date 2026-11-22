const C='placas-v2',F=['./','index.html','manifest.json','icon-192.png','icon-512.png'],X=['https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'];
const put=(r,n)=>{const k=n.clone();caches.open(C).then(c=>c.put(r,k))};
const net=r=>{const a=new AbortController(),t=setTimeout(()=>a.abort(),3000);return fetch(r,{cache:'no-cache',signal:a.signal}).finally(()=>clearTimeout(t))};
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(async c=>{await c.addAll(F.map(u=>new Request(u,{cache:'reload'})));for(const u of X)try{await c.put(u,await fetch(u,{mode:'no-cors'}))}catch(_){}}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;
 if(new URL(r.url).origin==location.origin)e.respondWith(net(r).then(n=>{put(r,n);return n}).catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('index.html'))));
 else e.respondWith(caches.match(r).then(x=>x||fetch(r).then(n=>{put(r,n);return n})))});
