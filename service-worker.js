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

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.destination === 'video') {
    return; // let browser handle video normally
  }

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



