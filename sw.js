const CACHE_NAME = 'smartmail-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/android/android-chrome-192x192.png',
  '/assets/android/android-chrome-512x512.png',
  '/assets/ios/apple-touch-icon.png'
];

// Installation Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );  // Fixed: Added missing closing parenthesis
});

// Fetch Event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );  // Fixed: Added missing closing parenthesis
});