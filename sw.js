const CACHE = 'trade-school-b4894ab49d';
const FILES = ["./",".nojekyll","_expo/static/js/web/index-7a58f496853712e5120642520a076557.js","favicon.ico","icon.png","index.html","manifest.json","metadata.json"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(
      (hit) => hit || fetch(e.request).catch(() => (e.request.mode === 'navigate' ? caches.match('./') : Response.error()))
    )
  );
});
