const CACHE = 'jogo-cache-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './js/app.js',
  './js/auth.js',
  './js/dashboard.js',
  './js/map.js',
  './js/leagues.js',
  './js/profile.js',
  './js/chat.js',
  './js/reservation.js',
  './js/i18n.js',
  './js/pwa.js',
  './js/utils.js',
  './i18n/en.json',
  './i18n/fr.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
