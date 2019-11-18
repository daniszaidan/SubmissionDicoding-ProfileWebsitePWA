const CACHE_NAME = "daniszaidan-v2";
var urlsToCache = [
    "/",
    "/css/materialize.min.css",
    "/css/style.css",
    "/images/altamusicc.jpg",
    "/images/danis.jpg",
    "/images/DisClass.jpg",
    "/images/email.png",
    "/images/EndlessCode.jpg",
    "/images/github.png",
    "/images/icon.png",
    "/images/instagram.png",
    "/images/linkedin.png",
    "/images/ZeitPlan.jpg",
    "/images/zerocss.jpg",
    "/images/zerolist.jpg",
    "/js/materialize.min.js",
    "/js/script.js",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/home.html",
    "/pages/portfolio.html",
    "/index.html",
    "/manifest.json",
    "/navigation.html",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});