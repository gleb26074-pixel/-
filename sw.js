const CACHE_NAME = "music-app-v3";
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon.png",
  "./tracks/track1.mp3",
  "./tracks/track2.mp3",
  "./tracks/track3.mp3",
  "./tracks/cover1.jpg",
  "./tracks/cover2.jpg",
  "./tracks/cover3.jpg"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
