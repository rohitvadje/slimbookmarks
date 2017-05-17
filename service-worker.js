const PRECACHE = 'slimbookmarks';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
  'index.html',
  'images/Green.png',
  'images/Red.png',
  'images/White.png',
  'js/controllers/myctrl',
  'js/lib/angular.min.js',
  'js/lib/jquery.min.js',
  'js/lib/bootstrap.min.js',
  'css/bootstrap.min.css',
  'css/div_top_spacing.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        })
        .then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        })
        .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return caches.open(RUNTIME)
                    .then(cache => {
                        return fetch(event.request)
                            .then(response => {
                                return cache.put(event.request, response.clone())
                                    .then(() => {
                                        return response;
                                    });
                            });
                    });
            })
        );
    }
});