const CACHE_NAME = 'doloya-v10-promos-final';
const urlsToCache = ['index.html','logo-inicio.png','manifest.json'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(names=>Promise.all(names.map(n=>{ if(n!==CACHE_NAME) return caches.delete(n); })))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const url = e.request.url;
  if(url.includes('inicio.html') || url.includes('aliado.html') || url.includes('admin-')){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
