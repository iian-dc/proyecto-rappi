const CACHE_NAME = 'doloya-v10-promos-final';
const urlsToCache = [
  'index.html',
  'logo-inicio.png',
  'manifest.json'
];

// Instalación
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activación - borra todos los cachés viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Borrando caché viejo:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Para HTML siempre red, para lo demás caché
self.addEventListener('fetch', event => {
  const url = event.request.url;
  
  // Si es inicio.html, aliado.html o admin, NUNCA usar caché
  if (url.includes('inicio.html') || url.includes('aliado.html') || url.includes('admin-')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
