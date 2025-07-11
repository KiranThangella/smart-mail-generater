// At the top with other cache files
const ASSETS_TO_CACHE = [
    // ... other files ...
    '/fallback.html'
  ];
  
  // In the fetch handler
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request)
            .catch(() => {
              // Special handling for failed page requests
              if (event.request.headers.get('accept').includes('text/html')) {
                return caches.match('/fallback.html');
              }
              // Fallback for CSS/JS
              if (event.request.url.endsWith('.css')) {
                return new Response('body { visibility: hidden; }', { headers: { 'Content-Type': 'text/css' }});
              }
              if (event.request.url.endsWith('.js')) {
                return new Response('console.log("Offline mode");', { headers: { 'Content-Type': 'text/javascript' }});
              }
            });
        })
    );
  });