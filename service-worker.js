const CACHE_NAME = "employee-portal-v3";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./mission-vision.html",
  "./manifest.json",
  "./service-worker.js",
  "./banner.jpg",
  "./logo.png",
  "./hpi.png",
  "./hasi.jpg",
  "./hrh.png",
  "./epi.png",
  "./video-cover.jpg"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
self.addEventListener("message", event => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
self.addEventListener("fetch", event => {
  if (event.request.url.includes("youtube.com") ||
      event.request.url.includes("googlevideo.com")) {
    return;
  }
});


