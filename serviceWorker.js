var cacheName = 'PWA PIERWSZA APLIKACJA';
var filesToCache = [
'/',
'/index.html',
'/cssy/styl.css',
'/skrypty/util.js'
];
self.addEventListener('install', function(e) {

e.waitUntil(

caches.open(cacheName).then(function(cache) {

return cache.addAll(filesToCache);

})

);

});
self.addEventListener('activate', function(e) {

e.waitUntil(

// Pobieranie wszystkich dostępnych cache'y

caches.keys().then((keyList) => {

return Promise.all(keyList.map((key) => {

// Usunięcie starych cache'y

if (cacheName.indexOf(key) === -1) {

return caches.delete(key);

}

}));

})

);

});

 

    self.addEventListener('fetch', function(e) {​​​​​​​
  e.respondWith(
    caches.match(e.request).then(function(r) {​​​​​​​
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {​​​​​​​
        return caches.open(cacheName).then(function(cache) {​​​​​​​
          cache.put(e.request, response.clone());
          return response;
        }​​​​​​​);
      }​​​​​​​);
    }​​​​​​​)
  );
}​​​​​​​);

