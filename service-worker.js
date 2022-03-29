const FILES_TO_CACHE = [
  "./index.html",
  "./events.html",
  "./tickets.html",
  "./schedule.html",
  "./assets/css/style.css",
  "./assets/css/bootstrap.css",
  "./assets/css/tickets.css",
  "./dist/app.bundle.js",
  "./dist/events.bundle.js",
  "./dist/tickets.bundle.js",
  "./dist/schedule.bundle.js",
];
// we use relative paths so that they will work in both development and production

const APP_PREFIX = "FoodFest-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION; // set this up as a global constant to keep track of which cache to use
// We are not including images here because every cache has a limit and we must prioritize the JavaScript and HTML files

self.addEventListener("install", function (e) {
  e.waitUntil(
    // wait until the work is complete before terminating the service worker
    caches.open(CACHE_NAME).then(function (cache) {
      // open cache
      console.log("installing cache : " + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
      // add all files in FILES_TO_CACHE array into the cache
    })
  );
});
// service workers run before the window object is even loaded, so we do not use window.addEventListener.
// Instead, we use the self keyword, which in this context refers to the service worker object

// Add an event listener to the activate event
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // returns an array of all key names
      let cacheKeepList = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheKeepList.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeepList.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (e) {
  console.log("fetch request :" + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (e) {
      if (request) {
        console.log("responding with cache : " + e.request.url);
        return request;
      } else {
        console.log("file is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }
    })
  );
});

/* 
Add event listener to service worker object using "self"
include event parameter in callback function
Respond to event parameter with code that matches the event request in the cache. 
If request is defined, return request; else, fetch the event request from the server
*/

// The service worker is the first code that runs in the application, even before index.html is loaded
