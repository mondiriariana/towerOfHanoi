
/**
 * @type {Window & typeof globalThis}
 */
var self = self || {};
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [ 
'index.html',
'App.js',
'index.js',
'styles/App.css',
'players/index.js',
'players/OnlyPlayPauseButton.js',
'components/Button.js',
'components/SourceLink.js',
'public/theme.wav',
'sw.js',
  ];

self.addEventListener('install',function(event){
  event.waitUntil(
    caches.open(PRECACHE).then(function(cache){
      return cache.addAll(PRECACHE_URLS);
    })
    );
});

self.addEventListener('activate',event => {
  console.log('Service worker activating . . . ');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
    );
});

