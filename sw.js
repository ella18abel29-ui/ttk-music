const C='ttk-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith('http'))return;
  e.respondWith(caches.open(C).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(e.request,r.clone());return r}).catch(()=>hit);
    return hit||net;
  }));
});
