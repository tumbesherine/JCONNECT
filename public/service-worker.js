// Simple service worker for offline caching
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("jconnect-cache-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/vercel.svg",
        "/window.svg",
        "/file.svg",
        "/globe.svg",
      ]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
