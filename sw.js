const CACHE_NAME = 'MMKI-KD-pwa-v2'; // ← naikkan versi
const urlsToCache = [ '/', '/index.html', '/manifest.json' ];

// 1. Install: simpan file baru ke cache baru
self.addEventListener('install', event => {
  self.skipWaiting(); // ← paksa SW baru langsung aktif
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 2. Activate: HAPUS cache lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)  // hapus semua cache selain v2
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // ← langsung ambil kontrol halaman
});

// 3. Fetch: sama seperti sebelumnya
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
